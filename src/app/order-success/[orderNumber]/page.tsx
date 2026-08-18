import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type OrderSuccessPageProps = {
  params: Promise<{
    orderNumber: string;
  }>;
};

export default async function OrderSuccessPage({
  params,
}: OrderSuccessPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { orderNumber } = await params;

  const order = await prisma.order.findFirst({
    where: {
      orderNumber,
      userId: session.user.id,
    },

    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main
      className="
        flex
        min-h-[calc(100vh-120px)]
        w-full
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
          max-w-[620px]

          rounded-[20px]

          border
          border-black/10

          bg-white

          px-[24px]
          py-[36px]

          text-center

          shadow-[0_12px_40px_rgba(0,0,0,0.06)]

          min-[800px]:px-[44px]
          min-[800px]:py-[48px]
        "
      >
        <div
          className="
            mx-auto
            flex
            h-[64px]
            w-[64px]
            items-center
            justify-center

            rounded-full

            bg-black
            text-white
          "
        >
          <CheckCircle2 className="size-[34px]" />
        </div>

        <h1
          className="
            mt-[24px]

            text-[30px]
            leading-[36px]
            text-black

            min-[800px]:text-[36px]
            min-[800px]:leading-[42px]
          "
          style={{
            fontFamily:
              "var(--font-archivo-black)",
          }}
        >
          ORDER CONFIRMED
        </h1>

        <p
          className="
            mt-[12px]

            text-[15px]
            leading-[23px]
            text-black/60
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
          }}
        >
          Thank you for shopping with SHOP.CO.
          Your order has been placed successfully.
        </p>

        <div
          className="
            mt-[28px]

            rounded-[14px]

            border
            border-black/10

            bg-[#F8F8F8]

            p-[18px]

            text-left
          "
        >
          <SummaryRow
            label="Order Number"
            value={order.orderNumber}
          />

          <SummaryRow
            label="Order Status"
            value={order.status}
          />

          <SummaryRow
            label="Payment Method"
            value={order.paymentMethod}
          />

          <SummaryRow
            label="Payment Status"
            value={order.paymentStatus}
          />

         <SummaryRow
  label="Items"
  value={String(order.items.length)}
/>

<SummaryRow
  label="Subtotal"
  value={`$${Number(
    order.subtotal,
  ).toFixed(2)}`}
/>

{Number(order.productDiscount) > 0 && (
  <SummaryRow
    label="Product Discount"
    value={`-$${Number(
      order.productDiscount,
    ).toFixed(2)}`}
  />
)}

{Number(order.couponDiscount) > 0 && (
  <SummaryRow
    label={
      order.couponCodeSnapshot
        ? `Coupon (${order.couponCodeSnapshot})`
        : "Coupon Discount"
    }
    value={`-$${Number(
      order.couponDiscount,
    ).toFixed(2)}`}
  />
)}

<SummaryRow
  label="Shipping"
  value={`$${Number(
    order.shippingAmount,
  ).toFixed(2)}`}
/>

<SummaryRow
  label="Tax"
  value={`$${Number(
    order.taxAmount,
  ).toFixed(2)}`}
/>

<SummaryRow
  label="Total"
  value={`$${Number(
    order.total,
  ).toFixed(2)}`}
  last
/>
        </div>

        <div
          className="
            mt-[28px]

            flex
            flex-col
            gap-[10px]

            min-[600px]:flex-row
          "
        >
          <Link
            href="/"
            className="
              flex
              h-[50px]
              flex-1
              items-center
              justify-center

              rounded-full

              border
              border-black

              bg-black

              px-[20px]

              text-[14px]
              font-medium
              text-white
            "
            style={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
              fontFamily:
                "var(--font-satoshi)",
            }}
          >
            Continue Shopping
          </Link>

          <Link
            href="/account/orders"
            className="
              flex
              h-[50px]
              flex-1
              items-center
              justify-center

              rounded-full

              border
              border-black/20

              bg-white

              px-[20px]

              text-[14px]
              font-medium
              text-black
            "
            style={{
              fontFamily:
                "var(--font-satoshi)",
            }}
          >
            View My Orders
          </Link>
        </div>
      </div>
    </main>
  );
}

function SummaryRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        gap-[16px]

        py-[10px]

        ${
          last
            ? ""
            : "border-b border-black/10"
        }
      `}
    >
      <span
        className="
          text-[13px]
          text-black/55
        "
      >
        {label}
      </span>

      <span
        className="
          text-right
          text-[13px]
          font-semibold
          text-black
        "
      >
        {value}
      </span>
    </div>
  );
}