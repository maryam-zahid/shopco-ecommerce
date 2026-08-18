import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { getStripe } from "@/lib/stripe";

import {
  expireStripeCheckout,
  fulfillStripeCheckout,
} from "@/services/stripe-checkout.service";

export const runtime =
  "nodejs";

export async function POST(
  request: Request,
) {
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error(
      "STRIPE_WEBHOOK_SECRET is missing.",
    );

    return NextResponse.json(
      {
        error:
          "Stripe webhook is not configured.",
      },
      {
        status: 500,
      },
    );
  }

  const signature =
    request.headers.get(
      "stripe-signature",
    );

  if (!signature) {
    return NextResponse.json(
      {
        error:
          "Missing Stripe signature.",
      },
      {
        status: 400,
      },
    );
  }

  const payload =
    await request.text();

  const stripe =
    getStripe();

  let event: Stripe.Event;

  try {
    event =
      stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
  } catch (error) {
    console.error(
      "STRIPE_WEBHOOK_SIGNATURE_ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Invalid Stripe webhook signature.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session =
          event.data
            .object as Stripe.Checkout.Session;

        /*
         * For fulfillment we require the
         * session to actually be paid.
         */

        if (
          session.payment_status ===
          "paid"
        ) {
          const paymentIntentId =
            typeof session.payment_intent ===
            "string"
              ? session.payment_intent
              : session.payment_intent?.id ??
                null;

          await fulfillStripeCheckout(
            session.id,
            paymentIntentId,
          );
        }

        break;
      }

      case "checkout.session.expired": {
        const session =
          event.data
            .object as Stripe.Checkout.Session;

        await expireStripeCheckout(
          session.id,
        );

        break;
      }

      default:
        break;
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "STRIPE_WEBHOOK_HANDLER_ERROR:",
      error,
    );

    /*
     * Non-2xx tells Stripe the webhook
     * was not processed successfully.
     */

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Webhook processing failed.",
      },
      {
        status: 500,
      },
    );
  }
}