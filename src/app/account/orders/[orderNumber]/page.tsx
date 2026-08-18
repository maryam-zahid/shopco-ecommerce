import Image from "next/image";
import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type OrderDetailPageProps = {
  params: Promise<{
    orderNumber: string;
  }>;
};

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(
      "/login?callbackUrl=/account/orders",
    );
  }

  if (session.user.role !== "CUSTOMER") {
    redirect("/");
  }

  const { orderNumber } = await params;

  const order =
    await prisma.order.findFirst({
      where: {
        orderNumber,
        userId: session.user.id,
      },

      include: {
        items: true,
        paymentAttempts: {
          orderBy: {
            attemptNumber: "asc",
          },
        },
      },
    });

  if (!order) {
    notFound();
  }

  return (
    <main className="w-full bg-white">
      <section
        className="
          mx-auto
          w-full

          px-[16px]
          py-[40px]

          min-[800px]:px-[32px]

          min-[1200px]:max-w-[1240px]
          min-[1200px]:px-0
          min-[1200px]:py-[56px]
        "
      >
        {/* BREADCRUMB */}
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-[8px]

            text-[14px]
            text-black/50
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
          }}
        >
          <Link href="/">
            Home
          </Link>

          <span>/</span>

          <Link href="/account/orders">
            Orders
          </Link>

          <span>/</span>

          <span className="text-black">
            {order.orderNumber}
          </span>
        </div>

        {/* HEADER */}
        <div
          className="
            mt-[16px]

            flex
            flex-col
            gap-[14px]

            min-[800px]:flex-row
            min-[800px]:items-end
            min-[800px]:justify-between
          "
        >
          <div>
            <h1
              className="
                text-[30px]
                leading-[36px]
                text-black

                min-[800px]:text-[40px]
                min-[800px]:leading-[46px]
              "
              style={{
                fontFamily:
                  "var(--font-archivo-black)",
              }}
            >
              ORDER DETAILS
            </h1>

            <p
              className="
                mt-[6px]
                text-[14px]
                text-black/50
              "
            >
              {order.orderNumber}
            </p>
          </div>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-[8px]
            "
          >
            <StatusBadge>
              {order.status}
            </StatusBadge>

            <StatusBadge>
              {order.paymentMethod}
            </StatusBadge>

            <StatusBadge>
              {order.paymentStatus}
            </StatusBadge>
          </div>
        </div>

        {/* MAIN GRID */}
        <div
          className="
            mt-[28px]

            grid
            grid-cols-1
            gap-[20px]

            min-[1000px]:grid-cols-[1.4fr_0.8fr]
          "
        >
          {/* LEFT */}
          <div className="space-y-[20px]">
            {/* ITEMS */}
            <section
              className="
                rounded-[16px]
                border
                border-black/10
                bg-white
                p-[18px]

                min-[800px]:p-[22px]
              "
            >
              <h2
                className="
                  text-[18px]
                  font-bold
                  text-black
                "
              >
                Items
              </h2>

              <div className="mt-[16px] space-y-[16px]">
                {order.items.map(
                  (item, index) => (
                    <div
                      key={item.id}
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-[14px]
                        "
                      >
                        <div
                          className="
                            relative
                            h-[82px]
                            w-[82px]
                            shrink-0
                            overflow-hidden
                            rounded-[9px]
                            bg-[#F0EEED]
                          "
                        >
                          {item.productImage && (
                            <Image
                              src={item.productImage}
                              alt={item.productName}
                              fill
                              sizes="82px"
                              className="object-contain"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className="
                              truncate
                              text-[15px]
                              font-semibold
                              text-black
                            "
                          >
                            {item.productName}
                          </p>

                          <p
                            className="
                              mt-[3px]
                              text-[12px]
                              text-black/50
                            "
                          >
                            {item.colorName}
                            {" / "}
                            {item.size}
                          </p>

                          <p
                            className="
                              mt-[3px]
                              text-[12px]
                              text-black/50
                            "
                          >
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[14px] font-semibold text-black">
                            $
                            {Number(
                              item.unitPrice,
                            ).toFixed(2)}
                          </p>

                          <p className="mt-[3px] text-[12px] text-black/50">
                            $
                            {Number(
                              item.subtotal,
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {index <
                        order.items.length -
                          1 && (
                        <div className="my-[16px] h-px bg-black/10" />
                      )}
                    </div>
                  ),
                )}
              </div>
            </section>

            {/* SHIPPING */}
            <section
              className="
                rounded-[16px]
                border
                border-black/10
                bg-white
                p-[18px]

                min-[800px]:p-[22px]
              "
            >
              <h2 className="text-[18px] font-bold text-black">
                Shipping Address
              </h2>

              <div
                className="
                  mt-[14px]
                  text-[14px]
                  leading-[22px]
                  text-black/65
                "
              >
                <p className="font-semibold text-black">
                  {order.shippingFullName}
                </p>

                <p className="mt-[4px]">
                  {order.shippingAddressLine1}

                  {order.shippingAddressLine2
                    ? `, ${order.shippingAddressLine2}`
                    : ""}
                </p>

                <p>
                  {order.shippingCity}

                  {order.shippingState
                    ? `, ${order.shippingState}`
                    : ""}{" "}
                  {order.shippingPostalCode}
                </p>

                <p>
                  {order.shippingCountry}
                </p>

               {order.shippingEmail && (
  <p className="mt-[4px]">
    {order.shippingEmail}
  </p>
)}

<p className="mt-[4px]">
  {order.shippingPhone}
</p>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div className="space-y-[20px]">
            {/* SUMMARY */}
            <section
              className="
                rounded-[16px]
                border
                border-black/10
                bg-white
                p-[18px]

                min-[800px]:p-[22px]
              "
            >
              <h2 className="text-[18px] font-bold text-black">
                Order Summary
              </h2>

              <div className="mt-[18px] space-y-[13px]">
                <SummaryRow
                  label="Subtotal"
                  value={`$${Number(
                    order.subtotal,
                  ).toFixed(2)}`}
                />

                <SummaryRow
                  label="Product Discount"
                  value={`-$${Number(
                    order.productDiscount,
                  ).toFixed(2)}`}
                />

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
              </div>

              <div className="my-[18px] h-px bg-black/10" />

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <span className="text-[17px] font-bold text-black">
                  Total
                </span>

                <span className="text-[22px] font-bold text-black">
                  $
                  {Number(
                    order.total,
                  ).toFixed(2)}
                </span>
              </div>
            </section>

            {/* TIMELINE */}
            <section
              className="
                rounded-[16px]
                border
                border-black/10
                bg-white
                p-[18px]

                min-[800px]:p-[22px]
              "
            >
              <h2 className="text-[18px] font-bold text-black">
                Order Status
              </h2>

              <div className="mt-[16px] space-y-[12px]">
                <DateRow
                  label="Placed"
                  date={order.createdAt}
                />

                <DateRow
                  label="Confirmed"
                  date={order.confirmedAt}
                />

                <DateRow
                  label="Processing"
                  date={order.processingAt}
                />

                <DateRow
                  label="Shipped"
                  date={order.shippedAt}
                />

                <DateRow
                  label="Delivered"
                  date={order.deliveredAt}
                />

                <DateRow
                  label="Cancelled"
                  date={order.cancelledAt}
                />
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatusBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        rounded-full
        border
        border-black/15
        bg-[#F8F8F8]
        px-[10px]
        py-[5px]
        text-[11px]
        font-medium
        text-black
      "
    >
      {children}
    </span>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-[16px]
      "
    >
      <span className="text-[14px] text-black/60">
        {label}
      </span>

      <span className="text-[14px] font-medium text-black">
        {value}
      </span>
    </div>
  );
}

function DateRow({
  label,
  date,
}: {
  label: string;
  date: Date | null;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-[16px]
      "
    >
      <span className="text-[13px] text-black/60">
        {label}
      </span>

      <span
        className={`
          text-[13px]

          ${
            date
              ? "font-medium text-black"
              : "text-black/30"
          }
        `}
      >
        {date
          ? date.toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            )
          : "—"}
      </span>
    </div>
  );
}
