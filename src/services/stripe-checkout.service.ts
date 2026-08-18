import "server-only";

import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

function generateOrderNumber() {
  return `SHOP-${Date.now()}-${crypto
    .randomUUID()
    .slice(0, 6)
    .toUpperCase()}`;
}

export async function startStripeCheckout(
  userId: string,
  addressId: string,
) {
  /*
   * ============================================
   * CREATE PENDING CARD ORDER
   * ============================================
   *
   * Important:
   * - prices come from PostgreSQL
   * - stock is checked
   * - stock is NOT reduced yet
   * - cart is NOT cleared yet
   */

  const order =
    await prisma.$transaction(
      async (tx) => {
        const address =
          await tx.address.findFirst({
            where: {
              id: addressId,
              userId,
            },
          });

        if (!address) {
          throw new Error(
            "Selected shipping address is invalid.",
          );
        }

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

          if (
            product.status !== "ACTIVE"
          ) {
            throw new Error(
              `${product.name} is no longer available.`,
            );
          }

          if (!variant.isActive) {
            throw new Error(
              `${product.name} (${variant.colorName} / ${variant.size}) is unavailable.`,
            );
          }

          if (
            item.quantity < 1 ||
            item.quantity > variant.stock
          ) {
            throw new Error(
              `Only ${variant.stock} item${
                variant.stock === 1
                  ? ""
                  : "s"
              } of ${product.name} are currently available.`,
            );
          }

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

          const lineSubtotal =
            unitPrice * item.quantity;

          subtotal += lineSubtotal;

          orderItems.push({
            productId:
              product.id,

            variantId:
              variant.id,

            productName:
              product.name,

            productImage:
              product.images[0] ?? null,

            colorName:
              variant.colorName,

            size:
              variant.size,

            unitPrice,

            quantity:
              item.quantity,

            subtotal:
              lineSubtotal,
          });
        }

        /*
         * ============================================
         * COUPON
         * ============================================
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

        const shippingAmount = 15;
        const taxAmount = 0;

        const total =
          subtotal -
          couponDiscount +
          shippingAmount +
          taxAmount;

        const orderNumber =
          generateOrderNumber();

        return tx.order.create({
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
              cart.coupon?.id ?? null,

            couponCodeSnapshot:
              cart.coupon?.code ?? null,

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
          },

          include: {
            items: true,
          },
        });
      },
    );

  /*
   * ============================================
   * PAYMENT ATTEMPT
   * ============================================
   */

  const attemptCount =
    await prisma.paymentAttempt.count({
      where: {
        orderId: order.id,
      },
    });

  const attempt =
    await prisma.paymentAttempt.create({
      data: {
        orderId:
          order.id,

        customerId:
          userId,

        attemptNumber:
          attemptCount + 1,

        provider:
          "STRIPE",

        amount:
          order.total,

        currency:
          "usd",

        status:
          "PENDING",
      },
    });

  /*
   * ============================================
   * STRIPE CHECKOUT SESSION
   * ============================================
   */

  const stripe = getStripe();

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";

  try {
    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",

        client_reference_id:
          order.id,

        customer_email:
          order.shippingEmail ??
          undefined,

        metadata: {
          orderId:
            order.id,

          orderNumber:
            order.orderNumber,

          customerId:
            userId,

          paymentAttemptId:
            attempt.id,
        },

        payment_intent_data: {
          metadata: {
            orderId:
              order.id,

            orderNumber:
              order.orderNumber,

            customerId:
              userId,

            paymentAttemptId:
              attempt.id,
          },
        },

        /*
         * One authoritative line item using
         * the final server-computed order total.
         *
         * This ensures Stripe receives exactly
         * the same amount stored on Order.total.
         */

        line_items: [
          {
            quantity: 1,

            price_data: {
              currency: "usd",

              unit_amount:
                Math.round(
                  Number(
                    order.total,
                  ) * 100,
                ),

              product_data: {
                name:
                  `SHOP.CO Order ${order.orderNumber}`,

                description:
                  `${order.items.length} order item${
                    order.items.length === 1
                      ? ""
                      : "s"
                  }`,
              },
            },
          },
        ],

        success_url:
          `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${appUrl}/account/orders/${order.orderNumber}`,
      });

    if (!session.url) {
      throw new Error(
        "Stripe did not return a checkout URL.",
      );
    }

    await prisma.paymentAttempt.update({
      where: {
        id: attempt.id,
      },

      data: {
        stripeCheckoutSessionId:
          session.id,
      },
    });

    return {
      orderId:
        order.id,

      orderNumber:
        order.orderNumber,

      paymentAttemptId:
        attempt.id,

      checkoutUrl:
        session.url,
    };
  } catch (error) {
    await prisma.paymentAttempt.update({
      where: {
        id: attempt.id,
      },

      data: {
        status:
          "FAILED",

        failureMessage:
          error instanceof Error
            ? error.message
            : "Unable to create Stripe Checkout Session.",
      },
    });

    throw error;
  }
}

/*
 * ==========================================================
 * STRIPE PAYMENT FULFILLMENT
 * ==========================================================
 */

export async function fulfillStripeCheckout(
  stripeSessionId: string,
  paymentIntentId?: string | null,
) {
  return prisma.$transaction(
    async (tx) => {
      const attempt =
        await tx.paymentAttempt.findUnique({
          where: {
            stripeCheckoutSessionId:
              stripeSessionId,
          },

          include: {
            order: {
              include: {
                items: true,
              },
            },
          },
        });

      if (!attempt) {
        throw new Error(
          "Stripe PaymentAttempt was not found.",
        );
      }

      const order =
        attempt.order;

      /*
       * IDEMPOTENCY
       *
       * Stripe can retry webhooks.
       * If this payment is already fulfilled,
       * simply return the order.
       */

      if (
        attempt.status === "PAID" &&
        order.paymentStatus === "PAID" &&
        order.stockReducedAt !== null
      ) {
        return order;
      }

      /*
       * ============================================
       * ATOMIC STOCK REDUCTION
       * ============================================
       */

      if (!order.stockReducedAt) {
        for (const item of order.items) {
          if (!item.variantId) {
            throw new Error(
              `${item.productName} no longer has a valid variant reference.`,
            );
          }

          const updated =
            await tx.productVariant.updateMany({
              where: {
                id:
                  item.variantId,

                isActive:
                  true,

                stock: {
                  gte:
                    item.quantity,
                },
              },

              data: {
                stock: {
                  decrement:
                    item.quantity,
                },
              },
            });

          if (updated.count !== 1) {
            throw new Error(
              `${item.productName} no longer has enough stock.`,
            );
          }
        }
      }

      const now =
        new Date();

      await tx.paymentAttempt.update({
        where: {
          id:
            attempt.id,
        },

        data: {
          status:
            "PAID",

          paidAt:
            attempt.paidAt ??
            now,

          stripePaymentIntentId:
            paymentIntentId ??
            attempt.stripePaymentIntentId,
        },
      });

      const updatedOrder =
        await tx.order.update({
          where: {
            id:
              order.id,
          },

          data: {
            status:
              "CONFIRMED",

            paymentStatus:
              "PAID",

            stockReducedAt:
              order.stockReducedAt ??
              now,

            confirmedAt:
              order.confirmedAt ??
              now,
          },
        });

      /*
       * Coupon counts only after successful payment.
       */

      if (
        order.couponId &&
        order.paymentStatus !== "PAID"
      ) {
        await tx.coupon.update({
          where: {
            id:
              order.couponId,
          },

          data: {
            usedCount: {
              increment: 1,
            },
          },
        });
      }

      /*
       * Clear ONLY variants that were part of
       * this paid order.
       */

      const customerCart =
        await tx.cart.findUnique({
          where: {
            userId:
              order.userId,
          },
        });

      if (customerCart) {
        const variantIds =
          order.items
            .map(
              (item) =>
                item.variantId,
            )
            .filter(
              (
                value,
              ): value is string =>
                Boolean(value),
            );

        if (variantIds.length > 0) {
          await tx.cartItem.deleteMany({
            where: {
              cartId:
                customerCart.id,

              variantId: {
                in:
                  variantIds,
              },
            },
          });
        }

        await tx.cart.update({
          where: {
            id:
              customerCart.id,
          },

          data: {
            couponId:
              null,
          },
        });
      }

      return updatedOrder;
    },
  );
}

export async function expireStripeCheckout(
  stripeSessionId: string,
) {
  const attempt =
    await prisma.paymentAttempt.findUnique({
      where: {
        stripeCheckoutSessionId:
          stripeSessionId,
      },
    });

  if (!attempt) {
    return;
  }

  if (
    attempt.status === "PAID"
  ) {
    return;
  }

  await prisma.$transaction([
    prisma.paymentAttempt.update({
      where: {
        id:
          attempt.id,
      },

      data: {
        status:
          "EXPIRED",

        expiredAt:
          new Date(),
      },
    }),

    prisma.order.updateMany({
      where: {
        id:
          attempt.orderId,

        paymentStatus: {
          not:
            "PAID",
        },
      },

      data: {
        paymentStatus:
          "EXPIRED",
      },
    }),
  ]);
}