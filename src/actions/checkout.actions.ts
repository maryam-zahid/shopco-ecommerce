"use server";

import { auth } from "@/auth";

import {
  createCodOrder,
  validateCheckout,
} from "@/services/checkout.service";

import {
  checkoutSelectionSchema,
} from "@/validations/checkout.schema";

type CheckoutValidationResult =
  | {
      success: true;
      message: string;
      summary: {
        subtotal: number;
        couponDiscount: number;
        shippingAmount: number;
        taxAmount: number;
        total: number;
        paymentMethod:
          | "COD"
          | "CARD";
      };
    }
  | {
      success: false;
      message: string;
    };

export async function validateCheckoutAction(
  input: {
    addressId: string;
    paymentMethod:
      | "COD"
      | "CARD";
  },
): Promise<CheckoutValidationResult> {
  const session = await auth();

  if (
    !session?.user?.id ||
    session.user.role !== "CUSTOMER"
  ) {
    return {
      success: false,
      message:
        "Please login as a customer to continue checkout.",
    };
  }

  const parsed =
    checkoutSelectionSchema.safeParse(
      input,
    );

  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]
          ?.message ??
        "Please check your checkout details.",
    };
  }

  try {
    const checkout =
      await validateCheckout(
        session.user.id,
        parsed.data,
      );

    return {
      success: true,

      message:
        "Checkout details verified successfully.",

      summary: {
        subtotal:
          checkout.subtotal,

        couponDiscount:
          checkout.couponDiscount,

        shippingAmount:
          checkout.shippingAmount,

        taxAmount:
          checkout.taxAmount,

        total:
          checkout.total,

        paymentMethod:
          checkout.paymentMethod,
      },
    };
  } catch (error) {
    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to validate checkout.",
    };
  }
}
type PlaceOrderResult =
  | {
      success: true;
      message: string;

      order: {
        id: string;
        orderNumber: string;
        total: number;
      };
    }
  | {
      success: false;
      message: string;
    };

export async function placeOrderAction(
  input: {
    addressId: string;
    paymentMethod:
      | "COD"
      | "CARD";
  },
): Promise<PlaceOrderResult> {
  const session = await auth();

  if (
    !session?.user?.id ||
    session.user.role !== "CUSTOMER"
  ) {
    return {
      success: false,

      message:
        "Please login as a customer to place your order.",
    };
  }

  const parsed =
    checkoutSelectionSchema.safeParse(
      input,
    );

  if (!parsed.success) {
    return {
      success: false,

      message:
        parsed.error.issues[0]
          ?.message ??
        "Please check your checkout details.",
    };
  }

  /*
   * CARD will use Stripe Checkout later.
   *
   * Do not create an UNPAID card order through
   * the COD flow.
   */

  if (
    parsed.data.paymentMethod ===
    "CARD"
  ) {
    return {
      success: false,

      message:
        "Card payment will be available through Stripe checkout.",
    };
  }

  try {
    const order =
      await createCodOrder(
        session.user.id,
        parsed.data,
      );

    return {
      success: true,

      message:
        "Your order has been placed successfully.",

      order: {
        id: order.id,

        orderNumber:
          order.orderNumber,

        total: order.total,
      },
    };
  } catch (error) {
    console.error(
      "PLACE_ORDER_ERROR:",
      error,
    );

    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to place your order.",
    };
  }
}