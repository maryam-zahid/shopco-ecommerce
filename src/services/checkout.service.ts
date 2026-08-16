import "server-only";

import { prisma } from "@/lib/prisma";

import type {
  CheckoutSelectionInput,
} from "@/validations/checkout.schema";

export async function validateCheckout(
  userId: string,
  input: CheckoutSelectionInput,
) {
  const address =
    await prisma.address.findFirst({
      where: {
        id: input.addressId,
        userId,
      },
    });

  if (!address) {
    throw new Error(
      "Selected shipping address is invalid.",
    );
  }

  const cart =
    await prisma.cart.findUnique({
      where: {
        userId,
      },

      include: {
        coupon: true,

        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

  if (!cart || cart.items.length === 0) {
    throw new Error(
      "Your cart is empty.",
    );
  }

  let subtotal = 0;

  for (const item of cart.items) {
    const variant = item.variant;
    const product = variant.product;

    if (product.status !== "ACTIVE") {
      throw new Error(
        `${product.name} is no longer available.`,
      );
    }

    if (!variant.isActive) {
      throw new Error(
        `${product.name} (${variant.colorName} / ${variant.size}) is unavailable.`,
      );
    }

    if (item.quantity < 1) {
      throw new Error(
        `Invalid quantity for ${product.name}.`,
      );
    }

    if (item.quantity > variant.stock) {
      throw new Error(
        `Only ${variant.stock} item${
          variant.stock === 1 ? "" : "s"
        } of ${product.name} (${variant.colorName} / ${variant.size}) are available.`,
      );
    }

    const basePrice =
      Number(product.price);

    const productPrice =
      product.discountPrice !== null
        ? Number(product.discountPrice)
        : basePrice;

    const unitPrice =
      variant.priceOverride !== null
        ? Number(variant.priceOverride)
        : productPrice;

    subtotal +=
      unitPrice * item.quantity;
  }

  let couponDiscount = 0;

  if (cart.coupon) {
    const coupon = cart.coupon;
    const now = new Date();

    if (!coupon.isActive) {
      throw new Error(
        "The applied coupon is no longer active.",
      );
    }

    if (
      coupon.startsAt &&
      coupon.startsAt > now
    ) {
      throw new Error(
        "The applied coupon is not active yet.",
      );
    }

    if (
      coupon.expiresAt &&
      coupon.expiresAt < now
    ) {
      throw new Error(
        "The applied coupon has expired.",
      );
    }

    if (
      coupon.usageLimit !== null &&
      coupon.usedCount >= coupon.usageLimit
    ) {
      throw new Error(
        "The applied coupon has reached its usage limit.",
      );
    }

    if (
      coupon.minimumOrderAmount !== null &&
      subtotal <
        Number(
          coupon.minimumOrderAmount,
        )
    ) {
      throw new Error(
        `This coupon requires a minimum order of $${Number(
          coupon.minimumOrderAmount,
        ).toFixed(2)}.`,
      );
    }

    if (
      coupon.discountType ===
      "PERCENTAGE"
    ) {
      couponDiscount =
        subtotal *
        (Number(coupon.discountValue) /
          100);
    } else {
      couponDiscount =
        Number(coupon.discountValue);
    }

    couponDiscount = Math.min(
      couponDiscount,
      subtotal,
    );
  }

  const shippingAmount = 15;
  const taxAmount = 0;

  const total =
    subtotal -
    couponDiscount +
    shippingAmount +
    taxAmount;

  return {
    cart,
    address,

    paymentMethod:
      input.paymentMethod,

    subtotal,
    couponDiscount,
    shippingAmount,
    taxAmount,
    total,
  };
}
export async function createCodOrder(
  userId: string,
  input: CheckoutSelectionInput,
) {
  if (input.paymentMethod !== "COD") {
    throw new Error(
      "This checkout flow only supports Cash on Delivery.",
    );
  }

  return prisma.$transaction(
    async (tx) => {
      /*
       * =====================================================
       * 1. VALIDATE SHIPPING ADDRESS
       * =====================================================
       */

      const address =
        await tx.address.findFirst({
          where: {
            id: input.addressId,
            userId,
          },
        });

      if (!address) {
        throw new Error(
          "Selected shipping address is invalid.",
        );
      }

      /*
       * =====================================================
       * 2. LOAD CART FROM DATABASE
       * =====================================================
       */

      const cart =
        await tx.cart.findUnique({
          where: {
            userId,
          },

          include: {
            coupon: true,

            items: {
              include: {
                variant: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        });

      if (
        !cart ||
        cart.items.length === 0
      ) {
        throw new Error(
          "Your cart is empty.",
        );
      }

      /*
       * =====================================================
       * 3. SERVER-SIDE PRICE + STOCK VALIDATION
       * =====================================================
       */

      let subtotal = 0;

      const orderItems: {
        productId: string;
        variantId: string;

        productName: string;
        productImage: string | null;

        colorName: string;
        size: string;

        unitPrice: number;
        quantity: number;
        subtotal: number;
      }[] = [];

      for (const item of cart.items) {
        const variant = item.variant;
        const product = variant.product;

        if (product.status !== "ACTIVE") {
          throw new Error(
            `${product.name} is no longer available.`,
          );
        }

        if (!variant.isActive) {
          throw new Error(
            `${product.name} (${variant.colorName} / ${variant.size}) is unavailable.`,
          );
        }

        if (item.quantity < 1) {
          throw new Error(
            `Invalid quantity for ${product.name}.`,
          );
        }

        /*
         * IMPORTANT:
         *
         * We perform the actual atomic stock check/decrement
         * later using updateMany.
         */

        const basePrice =
          Number(product.price);

        const productPrice =
          product.discountPrice !== null
            ? Number(
                product.discountPrice,
              )
            : basePrice;

        const unitPrice =
          variant.priceOverride !== null
            ? Number(
                variant.priceOverride,
              )
            : productPrice;

        const lineSubtotal =
          unitPrice * item.quantity;

        subtotal += lineSubtotal;

        orderItems.push({
          productId: product.id,
          variantId: variant.id,

          productName: product.name,

          productImage:
            product.images[0] ?? null,

          colorName:
            variant.colorName,

          size: variant.size,

          unitPrice,

          quantity: item.quantity,

          subtotal: lineSubtotal,
        });
      }

      /*
       * =====================================================
       * 4. VALIDATE COUPON AGAIN
       * =====================================================
       */

      let couponDiscount = 0;

      if (cart.coupon) {
        const coupon = cart.coupon;
        const now = new Date();

        if (!coupon.isActive) {
          throw new Error(
            "The applied coupon is no longer active.",
          );
        }

        if (
          coupon.startsAt &&
          coupon.startsAt > now
        ) {
          throw new Error(
            "The applied coupon is not active yet.",
          );
        }

        if (
          coupon.expiresAt &&
          coupon.expiresAt < now
        ) {
          throw new Error(
            "The applied coupon has expired.",
          );
        }

        if (
          coupon.usageLimit !== null &&
          coupon.usedCount >=
            coupon.usageLimit
        ) {
          throw new Error(
            "The applied coupon has reached its usage limit.",
          );
        }

        if (
          coupon.minimumOrderAmount !==
            null &&
          subtotal <
            Number(
              coupon.minimumOrderAmount,
            )
        ) {
          throw new Error(
            `This coupon requires a minimum order of $${Number(
              coupon.minimumOrderAmount,
            ).toFixed(2)}.`,
          );
        }

        if (
          coupon.discountType ===
          "PERCENTAGE"
        ) {
          couponDiscount =
            subtotal *
            (Number(
              coupon.discountValue,
            ) /
              100);
        } else {
          couponDiscount =
            Number(
              coupon.discountValue,
            );
        }

        couponDiscount = Math.min(
          couponDiscount,
          subtotal,
        );
      }

      /*
       * =====================================================
       * 5. AUTHORITATIVE TOTALS
       * =====================================================
       */

      const shippingAmount = 15;
      const taxAmount = 0;

      const total =
        subtotal -
        couponDiscount +
        shippingAmount +
        taxAmount;

      /*
       * =====================================================
       * 6. ATOMIC STOCK REDUCTION
       * =====================================================
       *
       * updateMany only succeeds when:
       *
       * stock >= requested quantity
       * variant is still active
       *
       * This protects against two customers buying the
       * final item at approximately the same time.
       */

      for (const item of cart.items) {
        const result =
          await tx.productVariant.updateMany(
            {
              where: {
                id: item.variantId,

                isActive: true,

                stock: {
                  gte: item.quantity,
                },
              },

              data: {
                stock: {
                  decrement:
                    item.quantity,
                },
              },
            },
          );

        if (result.count !== 1) {
          throw new Error(
            `${item.variant.product.name} (${item.variant.colorName} / ${item.variant.size}) does not have enough stock.`,
          );
        }
      }

      /*
       * =====================================================
       * 7. GENERATE ORDER NUMBER
       * =====================================================
       */

      const orderNumber =
        `SHOP-${Date.now()}-${crypto
          .randomUUID()
          .slice(0, 6)
          .toUpperCase()}`;

      /*
       * =====================================================
       * 8. CREATE ORDER + ORDER ITEM SNAPSHOTS
       * =====================================================
       */

      const order =
        await tx.order.create({
          data: {
            orderNumber,

            userId,

            status: "CONFIRMED",

            paymentStatus: "UNPAID",

            paymentMethod: "COD",

            subtotal,

            productDiscount: 0,

            couponDiscount,

            shippingAmount,

            taxAmount,

            total,

            couponId:
              cart.coupon?.id ?? null,

            couponCodeSnapshot:
              cart.coupon?.code ?? null,

            /*
             * Shipping snapshot.
             *
             * Even if the customer later edits/deletes
             * their Address record, the Order keeps the
             * original delivery information.
             */

            shippingFullName:
              address.fullName,

            shippingPhone:
              address.phone,

            shippingAddressLine1:
              address.addressLine1,

            shippingAddressLine2:
              address.addressLine2,

            shippingCity:
              address.city,

            shippingState:
              address.state,

            shippingPostalCode:
              address.postalCode,

            shippingCountry:
              address.country,

            stockReducedAt:
              new Date(),

            confirmedAt:
              new Date(),

            items: {
              create: orderItems.map(
                (item) => ({
                  productId:
                    item.productId,

                  variantId:
                    item.variantId,

                  productName:
                    item.productName,

                  productImage:
                    item.productImage,

                  colorName:
                    item.colorName,

                  size: item.size,

                  unitPrice:
                    item.unitPrice,

                  quantity:
                    item.quantity,

                  subtotal:
                    item.subtotal,
                }),
              ),
            },
          },

          include: {
            items: true,
          },
        });

      /*
       * =====================================================
       * 9. COUPON USAGE
       * =====================================================
       */

      if (cart.coupon) {
        await tx.coupon.update({
          where: {
            id: cart.coupon.id,
          },

          data: {
            usedCount: {
              increment: 1,
            },
          },
        });
      }

      /*
       * =====================================================
       * 10. CLEAR CART
       * =====================================================
       */

      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      /*
       * Keep the Cart itself for future shopping,
       * but remove the coupon.
       */

      await tx.cart.update({
        where: {
          id: cart.id,
        },

        data: {
          couponId: null,
        },
      });

      return {
        id: order.id,

        orderNumber:
          order.orderNumber,

        total: Number(order.total),

        status: order.status,

        paymentStatus:
          order.paymentStatus,

        paymentMethod:
          order.paymentMethod,
      };
    },
  );
}