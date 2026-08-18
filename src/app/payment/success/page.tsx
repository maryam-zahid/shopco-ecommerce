import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
} from "lucide-react";
import {
  redirect,
} from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type PaymentSuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const session =
    await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const {
    session_id: stripeSessionId,
  } = await searchParams;

  if (!stripeSessionId) {
    redirect("/account/orders");
  }

  const attempt =
    await prisma.paymentAttempt.findFirst({
      where: {
        stripeCheckoutSessionId:
          stripeSessionId,

        customerId:
          session.user.id,
      },

      include: {
        order: true,
      },
    });

  if (!attempt) {
    redirect("/account/orders");
  }

  const paid =
    attempt.status === "PAID" &&
    attempt.order.paymentStatus ===
      "PAID";

  return (
    <main
      className="
        flex
        min-h-[600px]
        items-center
        justify-center

        bg-white

        px-[16px]
        py-[60px]
      "
    >
      <div
        className="
          w-full
          max-w-[580px]

          rounded-[18px]

          border
          border-black/10

          bg-white

          p-[30px]

          text-center
        "
      >
        <div
          className="
            mx-auto

            flex
            h-[62px]
            w-[62px]
            items-center
            justify-center

            rounded-full

            bg-black
            text-white
          "
        >
          {paid ? (
            <CheckCircle2 className="size-[32px]" />
          ) : (
            <Clock3 className="size-[30px]" />
          )}
        </div>

        <h1
          className="
            mt-[22px]

            text-[30px]
            text-black
          "
          style={{
            fontFamily:
              "var(--font-archivo-black)",
          }}
        >
          {paid
            ? "PAYMENT SUCCESSFUL"
            : "PAYMENT PROCESSING"}
        </h1>

        <p
          className="
            mt-[10px]

            text-[14px]
            leading-[22px]
            text-black/60
          "
        >
          {paid
            ? "Your payment has been confirmed and your order is now confirmed."
            : "Stripe has returned you to SHOP.CO. We are waiting for payment confirmation."}
        </p>

        <div
          className="
            mt-[24px]

            rounded-[12px]

            bg-[#F8F8F8]

            p-[16px]
          "
        >
          <p className="text-[12px] text-black/50">
            Order Number
          </p>

          <p className="mt-[4px] text-[15px] font-semibold text-black">
            {
              attempt.order
                .orderNumber
            }
          </p>

          <p className="mt-[14px] text-[12px] text-black/50">
            Total
          </p>

          <p className="mt-[4px] text-[18px] font-bold text-black">
            $
            {Number(
              attempt.order.total,
            ).toFixed(2)}
          </p>
        </div>

        <Link
          href={`/account/orders/${attempt.order.orderNumber}`}
          className="
            mt-[24px]

            flex
            h-[48px]
            w-full
            items-center
            justify-center

            rounded-full

            bg-black

            text-[14px]
            font-medium
            text-white
          "
          style={{
            backgroundColor:
              "#000000",
            color:
              "#FFFFFF",
          }}
        >
          View Order
        </Link>
      </div>
    </main>
  );
}