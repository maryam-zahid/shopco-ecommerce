import "server-only";

import { prisma } from "@/lib/prisma";

import type {
  CheckoutSelectionInput,
} from "@/validations/checkout.schema";
import { stripe } from "@/lib/stripe";
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
export async function createStripeCheckout(
  userId: string,
  input: CheckoutSelectionInput,
) {
  if (input.paymentMethod !== "CARD") {
    throw new Error(
      "This checkout flow only supports card payments.",
    );
  }

  const checkout =
    await validateCheckout(
      userId,
      input,
    );

  const {
    cart,
    address,
    subtotal,
    couponDiscount,
    shippingAmount,
    taxAmount,
    total,
  } = checkout;

  const orderItems =
    cart.items.map((item) => {
      const variant =
        item.variant;

      const product =
        variant.product;

      const basePrice =
        Number(product.price);

      const productPrice =
        product.discountPrice !==
        null
          ? Number(
              product.discountPrice,
            )
          : basePrice;

      const unitPrice =
        variant.priceOverride !==
        null
          ? Number(
              variant.priceOverride,
            )
          : productPrice;

      return {
        productId:
          product.id,

        variantId:
          variant.id,

        productName:
          product.name,

        productImage:
          product.images[0] ??
          null,

        colorName:
          variant.colorName,

        size:
          variant.size,

        unitPrice,

        quantity:
          item.quantity,

        subtotal:
          unitPrice *
          item.quantity,
      };
    });

  const orderNumber =
    `SHOP-${Date.now()}-${crypto
      .randomUUID()
      .slice(0, 6)
      .toUpperCase()}`;

  const order =
    await prisma.order.create({
      data: {
        orderNumber,

        userId,

        status: "PENDING",

        paymentStatus:
          "PENDING",

        paymentMethod:
          "CARD",

        subtotal,

        productDiscount: 0,

        couponDiscount,

        shippingAmount,

        taxAmount,

        total,

        couponId:
          cart.coupon?.id ??
          null,

        couponCodeSnapshot:
          cart.coupon?.code ??
          null,

        shippingFullName:
          address.fullName,

        shippingEmail:
          address.email,

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

        items: {
          create:
            orderItems.map(
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

                size:
                  item.size,

                unitPrice:
                  item.unitPrice,

                quantity:
                  item.quantity,

                subtotal:
                  item.subtotal,
              }),
            ),
        },

        paymentAttempts: {
          create: {
            customerId:
              userId,

            attemptNumber: 1,

            provider:
              "STRIPE",

            amount:
              total,

            currency:
              "usd",

            status:
              "PENDING",
          },
        },
      },

      include: {
        items: true,

        paymentAttempts: true,
      },
    });

  const paymentAttempt =
    order.paymentAttempts[0];

  if (!paymentAttempt) {
    throw new Error(
      "Unable to create payment attempt.",
    );
  }

  const appUrl =
    process.env
      .NEXT_PUBLIC_APP_URL;

  if (!appUrl) {
    throw new Error(
      "NEXT_PUBLIC_APP_URL is missing.",
    );
  }

  try {
    const stripeSession =
      await stripe.checkout.sessions.create(
        {
          mode: "payment",

          success_url:
            `${appUrl}/order-success/${order.orderNumber}` +
            "?session_id={CHECKOUT_SESSION_ID}",

          cancel_url:
            `${appUrl}/checkout?payment=cancelled`,

          customer_email:
            address.email ??
            undefined,

          line_items: [
            {
              price_data: {
                currency: "usd",

                product_data: {
                  name:
                    `SHOP.CO Order ${order.orderNumber}`,
                },

                unit_amount:
                  Math.round(
                    total * 100,
                  ),
              },

              quantity: 1,
            },
          ],

          metadata: {
            orderId:
              order.id,

            orderNumber:
              order.orderNumber,

            paymentAttemptId:
              paymentAttempt.id,

            userId,
          },

          payment_intent_data: {
            metadata: {
              orderId:
                order.id,

              orderNumber:
                order.orderNumber,

              paymentAttemptId:
                paymentAttempt.id,

              userId,
            },
          },
        },
      );

    if (!stripeSession.url) {
      throw new Error(
        "Stripe did not return a checkout URL.",
      );
    }

    await prisma.paymentAttempt.update({
      where: {
        id: paymentAttempt.id,
      },

      data: {
        stripeCheckoutSessionId:
          stripeSession.id,
      },
    });

    return {
      orderId:
        order.id,

      orderNumber:
        order.orderNumber,

      paymentAttemptId:
        paymentAttempt.id,

      checkoutUrl:
        stripeSession.url,
    };
  } catch (error) {
    await prisma.paymentAttempt.update({
      where: {
        id: paymentAttempt.id,
      },

      data: {
        status: "FAILED",

        failureMessage:
          error instanceof Error
            ? error.message
            : "Stripe checkout session creation failed.",
      },
    });

    await prisma.order.update({
      where: {
        id: order.id,
      },

      data: {
        paymentStatus:
          "FAILED",
      },
    });

    throw error;
  }
}
export async function createCodOrder(
  userId: string,
  input: {
    addressId: string;
  },
) {
  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        email: true,
      },
    });

  if (!user) {
    throw new Error(
      "Customer account not found.",
    );
  }

  return prisma.$transaction(
    async (tx) => {
      // your existing COD code continues here
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

shippingEmail:
  address.email,

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

  subtotal:
    Number(order.subtotal),

  couponDiscount:
    Number(
      order.couponDiscount,
    ),

  shippingAmount:
    Number(
      order.shippingAmount,
    ),

  taxAmount:
    Number(order.taxAmount),

  status:
    order.status,

  paymentStatus:
    order.paymentStatus,

  paymentMethod:
    order.paymentMethod,

  shipping: {
    fullName:
      order.shippingFullName,

    email:
      order.shippingEmail,

    phone:
      order.shippingPhone,

    addressLine1:
      order.shippingAddressLine1,

    addressLine2:
      order.shippingAddressLine2,

    city:
      order.shippingCity,

    state:
      order.shippingState,

    postalCode:
      order.shippingPostalCode,

    country:
      order.shippingCountry,
  },

 

     items: order.items.map(
  (item) => ({
    productName:
      item.productName,

    productImage:
      item.productImage,

    colorName:
      item.colorName,

    size:
      item.size,

    quantity:
      item.quantity,

    unitPrice:
      Number(
        item.unitPrice,
      ),

    subtotal:
      Number(
        item.subtotal,
      ),
  }),
),
};
    },
  );
}
