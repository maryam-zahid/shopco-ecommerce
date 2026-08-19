import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/permissions";

import InvoiceAutoPrint from "@/components/admin/orders/invoice-auto-print";

type InvoicePageProps = {
  params: Promise<{
    orderNumber: string;
  }>;
};

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  ).format(value);
}

function formatStatus(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

function formatPaymentMethod(
  value: string,
) {
  if (value === "COD") {
    return "Cash on Delivery";
  }

  if (value === "CARD") {
    return "Card";
  }

  return formatStatus(value);
}

export default async function InvoicePage({
  params,
}: InvoicePageProps) {
  /*
   * Invoice is outside /admin so it does not
   * inherit the admin navbar/sidebar.
   *
   * We still protect it so only an admin can
   * access/print the parcel slip.
   */
  await requireAdmin();

  const { orderNumber } =
    await params;

  const order =
    await prisma.order.findUnique({
      where: {
        orderNumber,
      },

      include: {
        items: {
          orderBy: {
            createdAt: "asc",
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

  return (
    <>
      <InvoiceAutoPrint />

      {/* PRINT-SPECIFIC RULES */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @page {
              size: A4;
              margin: 10mm;
            }

            @media print {
              html,
              body {
                margin: 0 !important;
                padding: 0 !important;
                background: #ffffff !important;
              }

              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              .parcel-slip-page {
                width: 100% !important;
                max-width: none !important;
                min-height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                border: 0 !important;
                box-shadow: none !important;
              }

              .parcel-item-row {
                break-inside: avoid;
                page-break-inside: avoid;
              }

              .parcel-summary {
                break-inside: avoid;
                page-break-inside: avoid;
              }
            }
          `,
        }}
      />

      <main
        className="
          min-h-screen
          bg-[#EEEEEE]
          px-[16px]
          py-[28px]
          text-[#111111]

          print:min-h-0
          print:bg-white
          print:p-0
        "
      >
        <article
          className="
            parcel-slip-page

            mx-auto
            w-full
            max-w-[820px]

            bg-white

            px-[32px]
            py-[30px]

            shadow-[0_4px_24px_rgba(0,0,0,0.08)]

            min-[800px]:px-[42px]
            min-[800px]:py-[36px]

            print:max-w-none
            print:shadow-none
          "
        >
          {/* =====================================
              SHOP.CO + DOCUMENT TYPE
          ====================================== */}

          <header
            className="
              flex
              items-start
              justify-between
              gap-[24px]
            "
          >
            <div>
              <h1
                className="
                  text-[30px]
                  font-black
                  leading-none
                  tracking-[-0.05em]
                "
              >
                SHOP.CO
              </h1>
            </div>

            <div className="text-right">
              <h2
                className="
                  text-[18px]
                  font-bold
                  uppercase
                  tracking-[0.02em]
                "
              >
                Invoice / Packing Slip
              </h2>
            </div>
          </header>

          <div
            className="
              mt-[20px]
              border-t-2
              border-black
            "
          />

          {/* =====================================
              ORDER INFORMATION
          ====================================== */}

          <section
            className="
              grid
              grid-cols-1
              gap-x-[32px]
              gap-y-[8px]

              border-b
              border-black/20

              py-[18px]

              min-[650px]:
              grid-cols-2
            "
          >
            <InfoRow
              label="ORDER NUMBER"
              value={
                order.orderNumber
              }
            />

            <InfoRow
              label="ORDER DATE"
              value={formatDate(
                order.createdAt,
              )}
            />

            <InfoRow
              label="PAYMENT METHOD"
              value={formatPaymentMethod(
                order.paymentMethod,
              )}
            />

            <InfoRow
              label="PAYMENT STATUS"
              value={formatStatus(
                order.paymentStatus,
              )}
            />

            <InfoRow
              label="ORDER STATUS"
              value={formatStatus(
                order.status,
              )}
            />
          </section>

          {/* =====================================
              CUSTOMER / DELIVERY INFORMATION
          ====================================== */}

          <section
            className="
              border-b
              border-black/20
              py-[18px]
            "
          >
            <h3
              className="
                text-[12px]
                font-bold
                uppercase
                tracking-[0.04em]
              "
            >
              Customer / Shipping Details
            </h3>

            <div
              className="
                mt-[10px]
                text-[12px]
                font-normal
                leading-[1.65]
                text-black/75
              "
            >
              <p
                className="
                  text-[14px]
                  font-bold
                  text-black
                "
              >
                {order.shippingFullName}
              </p>

              {order.shippingEmail && (
                <p>
                  {order.shippingEmail}
                </p>
              )}

              {order.shippingPhone && (
                <p>
                  {order.shippingPhone}
                </p>
              )}

              {order.shippingAddressLine1 && (
                <p>
                  {
                    order.shippingAddressLine1
                  }
                </p>
              )}

              {order.shippingAddressLine2 && (
                <p>
                  {
                    order.shippingAddressLine2
                  }
                </p>
              )}

              <p>
                {[
                  order.shippingCity,
                  order.shippingState,
                  order.shippingPostalCode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>

              {order.shippingCountry && (
                <p>
                  {
                    order.shippingCountry
                  }
                </p>
              )}
            </div>
          </section>

          {/* =====================================
              ORDER ITEMS
          ====================================== */}

          <section className="mt-[20px]">
            <h3
              className="
                mb-[10px]
                text-[13px]
                font-bold
                uppercase
              "
            >
              Order Items
            </h3>

            {/* TABLE HEADER */}

            <div
              className="
                grid
                grid-cols-[minmax(0,2.2fr)_1fr_0.4fr_0.75fr_0.8fr]

                items-center

                bg-black

                px-[12px]
                py-[9px]

                text-[9px]
                font-bold
                uppercase
                tracking-[0.03em]
                text-white
              "
            >
              <span>
                Product
              </span>

              <span>
                Variant
              </span>

              <span className="text-center">
                Qty
              </span>

              <span className="text-right">
                Price
              </span>

              <span className="text-right">
                Total
              </span>
            </div>

            {/* PRODUCTS */}

            {order.items.map(
              (item) => (
                <div
                  key={item.id}
                  className="
                    parcel-item-row

                    grid
                    grid-cols-[minmax(0,2.2fr)_1fr_0.4fr_0.75fr_0.8fr]

                    items-center

                    border-b
                    border-black/15

                    px-[8px]
                    py-[10px]
                  "
                >
                  {/* PRODUCT */}

                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-[10px]
                    "
                  >
                    <div
                      className="
                        flex
                        h-[50px]
                        w-[50px]
                        shrink-0

                        items-center
                        justify-center

                        overflow-hidden
                        rounded-[5px]

                        bg-[#F4F4F4]
                      "
                    >
                      {item.productImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={
                            item.productImage
                          }
                          alt={
                            item.productName
                          }
                          className="
                            h-full
                            w-full
                            object-contain
                          "
                        />
                      ) : (
                        <span
                          className="
                            text-[8px]
                            text-black/30
                          "
                        >
                          No image
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[11px]
                          font-bold
                          leading-[1.35]
                        "
                      >
                        {
                          item.productName
                        }
                      </p>
                    </div>
                  </div>

                  {/* VARIANT */}

                  <p
                    className="
                      text-[10px]
                      font-normal
                      text-black/65
                    "
                  >
                    {item.colorName ??
                      "—"}

                    {item.size
                      ? ` / ${item.size}`
                      : ""}
                  </p>

                  {/* QUANTITY */}

                  <p
                    className="
                      text-center
                      text-[10px]
                      font-normal
                    "
                  >
                    {item.quantity}
                  </p>

                  {/* UNIT PRICE */}

                  <p
                    className="
                      text-right
                      text-[10px]
                      font-normal
                    "
                  >
                    {formatMoney(
                      Number(
                        item.unitPrice,
                      ),
                    )}
                  </p>

                  {/* ITEM TOTAL */}

                  <p
                    className="
                      text-right
                      text-[10px]
                      font-normal
                    "
                  >
                    {formatMoney(
                      Number(
                        item.subtotal,
                      ),
                    )}
                  </p>
                </div>
              ),
            )}
          </section>

          {/* =====================================
              TOTAL SUMMARY
          ====================================== */}

          <section
  className="
    parcel-summary

    mt-[18px]
    w-full
  "
>
  <div
    className="
      border-t
      border-black/20
      pt-[12px]
    "
  >
    <SummaryRow
      label="SUBTOTAL"
      value={subtotal}
    />

    {productDiscount > 0 && (
      <SummaryRow
        label="PRODUCT DISCOUNT"
        value={
          -productDiscount
        }
      />
    )}

    {couponDiscount > 0 && (
      <SummaryRow
        label={
          order.couponCodeSnapshot
            ? `COUPON DISCOUNT (${order.couponCodeSnapshot})`
            : "COUPON DISCOUNT"
        }
        value={
          -couponDiscount
        }
      />
    )}

    <SummaryRow
      label="SHIPPING"
      value={
        shippingAmount
      }
    />

    <SummaryRow
      label="TAX"
      value={taxAmount}
    />
  </div>

  <div
    className="
      mt-[10px]

      flex
      w-full
      items-center
      justify-between

      border-y-2
      border-black

      bg-[#F7F7F7]

      px-[12px]
      py-[11px]
    "
  >
    <span
      className="
        text-[15px]
        font-black
      "
    >
      TOTAL
    </span>

    <span
      className="
        text-[17px]
        font-black
      "
    >
      {formatMoney(total)}
    </span>
  </div>
</section>
          {/* =====================================
              PARCEL PAYMENT INFORMATION
          ====================================== */}

          <section
  className="
    parcel-summary

    mt-[16px]
    w-full

    border
    border-black/25

    px-[14px]
    py-[11px]
  "
>
  <div
    className="
      grid
      grid-cols-3
      gap-[20px]
    "
  >
    <SmallInfo
      label="PAYMENT METHOD"
      value={formatPaymentMethod(
        order.paymentMethod,
      )}
    />

    <SmallInfo
      label="PAYMENT STATUS"
      value={formatStatus(
        order.paymentStatus,
      )}
    />

    <SmallInfo
      label="DELIVERY STATUS"
      value={formatStatus(
        order.status,
      )}
    />
  </div>
</section>
        
        </article>
      </main>
    </>
  );
}

/* =========================================
   ORDER INFO ROW

   Label = bold
   Actual value = normal
========================================= */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        grid
        grid-cols-[130px_minmax(0,1fr)]
        gap-[10px]
        text-[11px]
      "
    >
      <span
        className="
          font-bold
          text-black
        "
      >
        {label}
      </span>

      <span
        className="
          break-words
          font-normal
          text-black/70
        "
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================
   SUMMARY ROW

   Heading = bold
   Amount = normal
========================================= */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const negative =
    value < 0;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-[20px]
        py-[4px]
      "
    >
      <span
        className="
          text-[10px]
          font-bold
        "
      >
        {label}
      </span>

      <span
        className="
          text-[10px]
          font-normal
        "
      >
        {negative ? "-" : ""}
        $
        {Math.abs(
          value,
        ).toFixed(2)}
      </span>
    </div>
  );
}

/* =========================================
   SMALL PARCEL INFO
========================================= */

function SmallInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        className="
          text-[9px]
          font-bold
          uppercase
          text-black/50
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[3px]
          text-[11px]
          font-normal
          text-black
        "
      >
        {value}
      </p>
    </div>
  );
}