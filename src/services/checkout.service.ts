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