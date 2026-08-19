import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Banknote,
  CreditCard,
  Package,
  Truck,
  CheckCircle2,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import OrderDetailActions from "@/components/admin/orders/order-detail-actions";
import PrintableOrderInvoice from "@/components/admin/orders/printable-order-invoice";
import OrderManagementPanel from "@/components/admin/orders/order-management-panel";

type AdminOrderDetailPageProps = {
  params: Promise<{
    orderNumber: string;
  }>;
};

const STATUS_STEPS = [
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
] as const;

type StepStatus =
  (typeof STATUS_STEPS)[number];

function statusIndex(
  status: string,
) {
  if (status === "PENDING") {
    return -1;
  }

  if (status === "CANCELLED") {
    return -1;
  }

  return STATUS_STEPS.indexOf(
    status as StepStatus,
  );
}

function formatDate(
  date: Date,
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ).format(date);
}

function formatMoney(
  value: number,
) {
  return `$${value.toFixed(2)}`;
}

export default async function AdminOrderDetailPage({
  params,
}: AdminOrderDetailPageProps) {
  const { orderNumber } =
    await params;

  const order =
    await prisma.order.findUnique({
      where: {
        orderNumber,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        items: {
          orderBy: {
            createdAt: "asc",
          },
        },

        paymentAttempts: {
          orderBy: {
            attemptNumber: "desc",
          },
        },
      },
    });

  if (!order) {
    notFound();
  }

  const subtotal =
    Number(order.subtotal);

  const productDiscount =
    Number(
      order.productDiscount,
    );

  const couponDiscount =
    Number(
      order.couponDiscount,
    );

  const shippingAmount =
    Number(
      order.shippingAmount,
    );

  const taxAmount =
    Number(order.taxAmount);

  const total =
    Number(order.total);

  const currentStatusIndex =
    statusIndex(order.status);

  const latestPayment =
    order.paymentAttempts[0];

  return (
    <main
      className="
        w-full
        bg-[#F8F8F8]
      "
    >
      <div
        className="
          mx-auto
          w-full

          px-[16px]
          py-[24px]

          min-[800px]:
          px-[28px]

          min-[1200px]:
          max-w-[1320px]

          min-[1200px]:
          px-[32px]

          min-[1200px]:
          py-[30px]
        "
      >
        {/* =====================================
            TOP BAR
        ====================================== */}

        <div
          className="
            mb-[18px]

            flex
            items-center
            justify-between
            gap-[16px]
          "
        >
          <Link
            href="/admin/orders"
            className="
              flex
              h-[40px]
              w-[40px]
              items-center
              justify-center

              rounded-[8px]

              bg-white

              text-black

              transition-colors

              hover:bg-[#F2F2F2]
            "
            style={{
              border:
                "1px solid rgba(0,0,0,0.14)",
            }}
            aria-label="Back to orders"
          >
            <ArrowLeft className="size-[17px]" />
          </Link>

<OrderDetailActions />
        </div>
         {/* =====================================
            ORDER MANAGEMENT
        ====================================== */}

        <OrderManagementPanel
          orderId={order.id}
          currentStatus={order.status}
          paymentMethod={order.paymentMethod}
          paymentStatus={order.paymentStatus}
        />


        {/* =====================================
            TOP GRID
        ====================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-[16px]

            min-[1000px]:
            grid-cols-2
          "
        >
          {/* ORDER / CUSTOMER */}

          <section
            className="
              rounded-[14px]
              bg-white

              p-[22px]

              min-[800px]:
              p-[26px]
            "
            style={{
              border:
                "1px solid rgba(0,0,0,0.12)",
            }}
          >
            <div
              className="
                border-b
                border-black/10

                pb-[20px]
              "
            >
              <h1
                className="
                  m-0

                  text-[22px]
                  font-semibold
                  leading-[30px]
                  text-black

                  min-[800px]:
                  text-[25px]
                "
              >
                Order{" "}
                {order.orderNumber}
              </h1>

              <p
                className="
                  mt-[5px]

                  text-[13px]
                  text-black/55
                "
              >
                Placed on{" "}
                {formatDate(
                  order.createdAt,
                )}
              </p>
            </div>

            {/* CUSTOMER */}

            <div className="pt-[20px]">
              <h2
                className="
                  text-[16px]
                  font-semibold
                  text-black
                "
              >
                Customer Information
              </h2>

              <div
                className="
                  mt-[12px]

                  space-y-[5px]

                  text-[13px]
                  leading-[20px]
                "
              >
                <p className="font-medium text-black">
                  {
                    order
                      .shippingFullName
                  }
                </p>

                <p className="text-black/55">
                  {order.shippingEmail ??
                    order.user.email}
                </p>

                <p className="text-black/55">
                  {
                    order
                      .shippingPhone
                  }
                </p>

                <p className="max-w-[440px] text-black/55">
                  {
                    order
                      .shippingAddressLine1
                  }

                  {order.shippingAddressLine2
                    ? `, ${order.shippingAddressLine2}`
                    : ""}

                  {`, ${order.shippingCity}`}

                  {order.shippingState
                    ? `, ${order.shippingState}`
                    : ""}

                  {` ${order.shippingPostalCode}`}

                  {`, ${order.shippingCountry}`}
                </p>
              </div>
            </div>

            {/* PAYMENT METHOD */}

            <div
              className="
                mt-[20px]

                rounded-[10px]

                bg-[#F8F8F8]

                p-[16px]
              "
              style={{
                border:
                  "1px solid rgba(0,0,0,0.10)",
              }}
            >
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-[16px]
                "
              >
                <div>
                  <p
                    className="
                      text-[14px]
                      font-medium
                      text-black
                    "
                  >
                    Payment Method
                  </p>

                  <div
                    className="
                      mt-[8px]

                      flex
                      items-center
                      gap-[9px]
                    "
                  >
                    {order.paymentMethod ===
                    "CARD" ? (
                      <CreditCard className="size-[17px] text-black/55" />
                    ) : (
                      <Banknote className="size-[17px] text-black/55" />
                    )}

                    <div>
                      <p
                        className="
                          text-[13px]
                          font-medium
                          text-black/70
                        "
                      >
                        {order.paymentMethod ===
                        "CARD"
                          ? "Stripe Card Payment"
                          : "Cash on Delivery"}
                      </p>

                      <p
                        className="
                          mt-[2px]
                          text-[11px]
                          text-black/45
                        "
                      >
                        {
                          order.paymentStatus
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <PaymentBadge
                  status={
                    order.paymentStatus
                  }
                />
              </div>

              {latestPayment && (
                <div
                  className="
                    mt-[14px]

                    border-t
                    border-black/10

                    pt-[12px]

                    text-[11px]
                    text-black/45
                  "
                >
                  <p>
                    Provider:{" "}
                    <span className="font-medium text-black/65">
                      {
                        latestPayment.provider
                      }
                    </span>
                  </p>

                  <p className="mt-[3px]">
                    Attempt:{" "}
                    {
                      latestPayment.attemptNumber
                    }
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* =====================================
              ORDER SUMMARY
          ====================================== */}

          <section
            className="
              rounded-[14px]
              bg-white

              p-[22px]

              min-[800px]:
              p-[26px]
            "
            style={{
              border:
                "1px solid rgba(0,0,0,0.12)",
            }}
          >
            <h2
              className="
                text-[17px]
                font-semibold
                text-black
              "
            >
              Order Summary
            </h2>

            <div
              className="
                mt-[24px]

                space-y-[18px]
              "
            >
              <SummaryRow
                label="Subtotal"
                value={formatMoney(
                  subtotal,
                )}
              />

              {productDiscount >
                0 && (
                <SummaryRow
                  label="Product Discount"
                  value={`-${formatMoney(
                    productDiscount,
                  )}`}
                  discount
                />
              )}

              {couponDiscount >
                0 && (
                <SummaryRow
                  label={
                    order.couponCodeSnapshot
                      ? `Coupon (${order.couponCodeSnapshot})`
                      : "Coupon Discount"
                  }
                  value={`-${formatMoney(
                    couponDiscount,
                  )}`}
                  discount
                />
              )}

              <SummaryRow
                label="Shipping"
                value={formatMoney(
                  shippingAmount,
                )}
              />

              <SummaryRow
                label="Tax"
                value={formatMoney(
                  taxAmount,
                )}
              />
            </div>

            <div
              className="
                my-[20px]
                h-px
                bg-black/10
              "
            />

            <div
              className="
                flex
                items-center
                justify-between
                gap-[20px]
              "
            >
              <span
                className="
                  text-[16px]
                  font-semibold
                  text-black
                "
              >
                Total
              </span>

              <span
                className="
                  text-[21px]
                  font-bold
                  text-black
                "
              >
                {formatMoney(
                  total,
                )}
              </span>
            </div>
          </section>
        </div>

      {/* =====================================
    DELIVERY STATUS
====================================== */}

<section
  id="delivery-status"
  className="
    mt-[16px]

    rounded-[14px]
    bg-white

    px-[24px]
    py-[24px]
  "
  style={{
    border:
      "1px solid rgba(0,0,0,0.12)",
  }}
>
  <h2
    className="
      text-[16px]
      font-semibold
      text-black
    "
  >
    Delivery Status
  </h2>

  {order.status === "CANCELLED" ? (
    <div
      className="
        mt-[22px]

        rounded-[10px]

        bg-red-50

        px-[16px]
        py-[14px]

        text-[13px]
        font-medium
        text-red-700
      "
      style={{
        border:
          "1px solid rgba(220,38,38,0.18)",
      }}
    >
      This order has been cancelled.
    </div>
  ) : (
    <div className="mt-[30px]">
      {/* STATUS ICONS */}

      <div
        className="
          grid
          grid-cols-4
          items-start
        "
      >
        <DeliveryStep
          label="Processing"
          active={
            order.status === "CONFIRMED" ||
            order.status === "PROCESSING" ||
            order.status === "SHIPPED" ||
            order.status === "DELIVERED"
          }
          icon="check"
        />

        <DeliveryStep
          label="Shipped"
          active={
            order.status === "SHIPPED" ||
            order.status === "DELIVERED"
          }
          icon="truck"
        />

        <DeliveryStep
          label="Out for Delivery"
         active={
  order.status === "OUT_FOR_DELIVERY" ||
  order.status === "DELIVERED"
}
          icon="truck"
        />

        <DeliveryStep
          label="Delivered"
          active={
            order.status === "DELIVERED"
          }
          icon="check"
        />
      </div>

      {/* PROGRESS BAR */}

      <div
        className="
          relative

          mt-[10px]

          h-[8px]
          w-full

          overflow-hidden

          rounded-full

          bg-[#D9D9D9]
        "
      >
        <div
          className="
            absolute
            inset-y-0
            left-0

            rounded-full

            bg-black

            transition-all
            duration-500
          "
style={{
  width:
    order.status === "DELIVERED"
      ? "100%"
      : order.status === "OUT_FOR_DELIVERY"
        ? "75%"
        : order.status === "SHIPPED"
          ? "50%"
          : order.status === "CONFIRMED" ||
              order.status === "PROCESSING"
            ? "25%"
            : "0%",
}}
        />
      </div>

      {/* CURRENT STATUS INFO */}

      <div
        className="
          mt-[22px]

          flex
          items-center
          gap-[8px]
        "
      >
        <span
          className="
            inline-flex
            h-[24px]
            items-center
            justify-center

            rounded-[999px]

            px-[10px]

            text-[11px]
            font-medium
          "
          style={{
            backgroundColor:
              "#EFF6FF",
            border:
              "1px solid #60A5FA",
            color:
              "#2563EB",
          }}
        >
          {formatDeliveryLabel(
            order.status,
          )}
        </span>

        <span
          className="
            text-[11px]
            text-black/45
          "
        >
          on{" "}
          {formatDate(
            getDeliveryStatusDate(
              order,
            ),
          )}
        </span>
      </div>
    </div>
  )}
</section>
        {/* =====================================
            ORDER ITEMS
        ====================================== */}

        <section
          className="
            mt-[16px]

            overflow-hidden

            rounded-[14px]

            bg-white
          "
          style={{
            border:
              "1px solid rgba(0,0,0,0.12)",
          }}
        >
          <div
            className="
              px-[22px]
              py-[20px]

              min-[800px]:
              px-[26px]
            "
          >
            <h2
              className="
                text-[17px]
                font-semibold
                text-black
              "
            >
              Order Items
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table
              className="
                w-full
                min-w-[760px]
                border-collapse
              "
            >
              <thead>
                <tr
                  className="
                    border-y
                    border-black/10

                    bg-[#FAFAFA]
                  "
                >
                  <th className="px-[26px] py-[13px] text-left text-[12px] font-medium text-black/55">
                    Product
                  </th>

                  <th className="px-[16px] py-[13px] text-left text-[12px] font-medium text-black/55">
                    Variant
                  </th>

                  <th className="px-[16px] py-[13px] text-center text-[12px] font-medium text-black/55">
                    Quantity
                  </th>

                  <th className="px-[16px] py-[13px] text-right text-[12px] font-medium text-black/55">
                    Price
                  </th>

                  <th className="px-[26px] py-[13px] text-right text-[12px] font-medium text-black/55">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {order.items.map(
                  (item) => {
                    const unitPrice =
                      Number(
                        item.unitPrice,
                      );

                    const itemTotal =
                      Number(
                        item.subtotal,
                      );

                    return (
                      <tr
                        key={item.id}
                        className="
                          border-b
                          border-black/10

                          last:border-b-0
                        "
                      >
                        <td className="px-[26px] py-[16px]">
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

                                h-[64px]
                                w-[64px]
                                shrink-0

                                overflow-hidden

                                rounded-[8px]

                                bg-[#F0EEED]
                              "
                              style={{
                                border:
                                  "1px solid rgba(0,0,0,0.08)",
                              }}
                            >
                              {item.productImage ? (
                                <Image
                                  src={
                                    item.productImage
                                  }
                                  alt={
                                    item.productName
                                  }
                                  fill
                                  sizes="64px"
                                  className="object-contain p-[3px]"
                                />
                              ) : (
                                <div
                                  className="
                                    flex
                                    h-full
                                    w-full
                                    items-center
                                    justify-center

                                    text-[10px]
                                    text-black/35
                                  "
                                >
                                  No image
                                </div>
                              )}
                            </div>

                            <div>
                              <p
                                className="
                                  text-[13px]
                                  font-semibold
                                  text-black
                                "
                              >
                                {
                                  item.productName
                                }
                              </p>

                              {item.productId && (
                                <p
                                  className="
                                    mt-[3px]

                                    text-[10px]
                                    text-black/35
                                  "
                                >
                                  Product ID:{" "}
                                  {
                                    item.productId
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-[16px] py-[16px]">
                          <p className="text-[12px] font-medium text-black/70">
                            {item.colorName ??
                              "—"}
                          </p>

                          <p className="mt-[3px] text-[11px] text-black/45">
                            Size:{" "}
                            {item.size ??
                              "—"}
                          </p>
                        </td>

                        <td className="px-[16px] py-[16px] text-center text-[13px] text-black/70">
                          {
                            item.quantity
                          }
                        </td>

                        <td className="px-[16px] py-[16px] text-right text-[13px] font-medium text-black">
                          {formatMoney(
                            unitPrice,
                          )}
                        </td>

                        <td className="px-[26px] py-[16px] text-right text-[13px] font-semibold text-black">
                          {formatMoney(
                            itemTotal,
                          )}
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
               </section>
      </div>

      <PrintableOrderInvoice
        orderNumber={order.orderNumber}
        createdAt={formatDate(
          order.createdAt,
        )}
        paymentMethod={
          order.paymentMethod
        }
        paymentStatus={
          order.paymentStatus
        }
        orderStatus={
          order.status
        }

        shippingFullName={
          order.shippingFullName
        }
        shippingEmail={
          order.shippingEmail
        }
        shippingPhone={
          order.shippingPhone
        }

        shippingAddressLine1={
          order.shippingAddressLine1
        }
        shippingAddressLine2={
          order.shippingAddressLine2
        }
        shippingCity={
          order.shippingCity
        }
        shippingState={
          order.shippingState
        }
        shippingPostalCode={
          order.shippingPostalCode
        }
        shippingCountry={
          order.shippingCountry
        }

        subtotal={subtotal}
        productDiscount={
          productDiscount
        }
        couponDiscount={
          couponDiscount
        }
        couponCode={
          order.couponCodeSnapshot
        }
        shippingAmount={
          shippingAmount
        }
        taxAmount={
          taxAmount
        }
        total={total}

        items={order.items.map(
          (item) => ({
            id: item.id,

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
        )}
      />

    </main>
  );
}

/* =========================================
   HELPERS
========================================= */

function SummaryRow({
  label,
  value,
  discount = false,
}: {
  label: string;
  value: string;
  discount?: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-[20px]
      "
    >
      <span className="text-[13px] text-black/60">
        {label}
      </span>

      <span
        className={`text-[13px] font-medium ${
          discount
            ? "text-red-600"
            : "text-black"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function StatusStep({
  title,
  icon,
  active,
}: {
  title: string;
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        text-center
      "
    >
      <div
        className={`
          flex
          h-[46px]
          w-[46px]
          items-center
          justify-center

          rounded-full

          ${
            active
              ? "bg-black text-white"
              : "bg-[#F5F5F5] text-black/55"
          }
        `}
        style={{
          border: active
            ? "1px solid #000000"
            : "1px solid rgba(0,0,0,0.12)",
        }}
      >
        {icon}
      </div>

      <p
        className={`
          mt-[7px]

          text-[11px]
          font-medium

          ${
            active
              ? "text-black"
              : "text-black/45"
          }
        `}
      >
        {title}
      </p>
    </div>
  );
}

function PaymentBadge({
  status,
}: {
  status: string;
}) {
  const success =
    status === "PAID";

  return (
    <span
      className={`
        inline-flex
        min-h-[26px]
        items-center

        rounded-full

        px-[10px]

        text-[10px]
        font-semibold

        ${
          success
            ? "bg-green-50 text-green-700"
            : status === "FAILED" ||
                status === "EXPIRED"
              ? "bg-red-50 text-red-700"
              : "bg-[#F3F3F3] text-black/60"
        }
      `}
      style={{
        border: success
          ? "1px solid rgba(21,128,61,0.20)"
          : status === "FAILED" ||
              status === "EXPIRED"
            ? "1px solid rgba(185,28,28,0.18)"
            : "1px solid rgba(0,0,0,0.10)",
      }}
    >
      {status}
    </span>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span
      className="
        inline-flex
        h-[26px]
        items-center

        rounded-full

        bg-black

        px-[10px]

        text-[10px]
        font-semibold
        text-white
      "
    >
      {status}
    </span>
  );
}
function DeliveryStep({
  label,
  active,
  icon,
}: {
  label: string;
  active: boolean;
  icon: "check" | "truck";
}) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        text-center
      "
    >
      <div
        className="
          flex
          h-[40px]
          w-[40px]
          items-center
          justify-center

          rounded-full
        "
        style={{
          backgroundColor: active
            ? "#00C853"
            : "#F5F5F5",

          border: active
            ? "1px solid #00C853"
            : "1px solid rgba(0,0,0,0.10)",

          color: active
            ? "#FFFFFF"
            : "#111111",
        }}
      >
        {icon === "truck" ? (
          <Truck
            className="
              h-[16px]
              w-[16px]
            "
            strokeWidth={1.8}
          />
        ) : (
          <CheckCircle2
            className="
              h-[16px]
              w-[16px]
            "
            strokeWidth={1.8}
          />
        )}
      </div>

      <span
        className="
          mt-[8px]

          text-[11px]
          font-medium
          text-black
        "
      >
        {label}
      </span>
    </div>
  );
}

function formatDeliveryLabel(
  status: string,
) {
  switch (status) {
    case "PENDING":
      return "Pending";

    case "CONFIRMED":
    case "PROCESSING":
      return "Processing";

    case "SHIPPED":
      return "Shipped";

      case "OUT_FOR_DELIVERY":
  return "Out for Delivery";

    case "DELIVERED":
      return "Delivered";

    case "CANCELLED":
      return "Cancelled";

    default:
      return status;
  }
}
function getDeliveryStatusDate(
  order: {
    createdAt: Date;
    confirmedAt: Date | null;
    processingAt: Date | null;
    shippedAt: Date | null;
    outForDeliveryAt: Date | null;
    deliveredAt: Date | null;
    updatedAt: Date;
    status: string;
  },
) {
  switch (order.status) {
    case "DELIVERED":
      return (
        order.deliveredAt ??
        order.updatedAt
      );
case "OUT_FOR_DELIVERY":
  return (
    order.outForDeliveryAt ??
    order.updatedAt
  );
    case "SHIPPED":
      return (
        order.shippedAt ??
        order.updatedAt
      );

    case "PROCESSING":
      return (
        order.processingAt ??
        order.updatedAt
      );

    case "CONFIRMED":
      return (
        order.confirmedAt ??
        order.updatedAt
      );

    default:
      return order.createdAt;
  }
}