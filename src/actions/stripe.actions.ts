"use server";

import { auth } from "@/auth";

import {
  startStripeCheckout,
} from "@/services/stripe-checkout.service";

type StartStripeCheckoutResult =
  | {
      success: true;
      url: string;
      orderNumber: string;
    }
  | {
      success: false;
      message: string;
    };

export async function startStripeCheckoutAction(
  input: {
    addressId: string;
  },
): Promise<StartStripeCheckoutResult> {
  const session =
    await auth();

  if (
    !session?.user?.id ||
    session.user.role !==
      "CUSTOMER"
  ) {
    return {
      success: false,

      message:
        "Please login as a customer to continue payment.",
    };
  }

  if (!input.addressId) {
    return {
      success: false,

      message:
        "Please select a shipping address.",
    };
  }

  try {
    const result =
      await startStripeCheckout(
        session.user.id,
        input.addressId,
      );

    return {
      success: true,

      url:
        result.checkoutUrl,

      orderNumber:
        result.orderNumber,
    };
  } catch (error) {
    console.error(
      "STRIPE_CHECKOUT_ERROR:",
      error,
    );

    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to start card payment.",
    };
  }
}