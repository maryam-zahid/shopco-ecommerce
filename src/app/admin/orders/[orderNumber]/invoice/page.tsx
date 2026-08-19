import Image from "next/image";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import PrintInvoiceOnLoad from "@/components/admin/orders/print-invoice-on-load";

type InvoicePageProps = {
  params: Promise<{
    orderNumber: string;
  }>;
};

function formatMoney(
  value: number,
) {
  return `$${value.toFixed(2)}`;
}

function formatDate(
  date: Date,
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  ).format(date);
}

export default async function InvoicePage({
  params,
}: InvoicePageProps) {
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
            name: true,
            email: true,
          },
        },

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
    Number(order.productDiscount);

  const couponDiscount =
    Number(order.couponDiscount);

  const shippingAmount =
    Number(order.shippingAmount);

  const taxAmount =
    Number(order.taxAmount);

  const total =
    Number(order.total);

  return (
    <main
      className="
        min-h-screen
        bg-white
        text-black
      "
    >
      <PrintInvoiceOnLoad />

      <div
        className="
          mx-auto
          w-full
          max-w-[820px]
          px-[32px]
          py-[36px]

          print:max-w-none
          print:px-0
          print:py-0
        "
      >
        {/* HEADER */}

        <div
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
                font-bold
                tracking-[-0.04em]
              "
            >
              SHOP.CO
            </h1>

            <p
              className="
                mt-[6px]
                text-[13px]
                text-black/50
              "
            >
              Official Order Invoice
            </p>
          </div>

          <div
            className="
              text-right
            "
          >
            <h2
              className="
                text-[28px]
                font-semibold
              "
            >
              INVOICE
            </h2>

            <p
              className="
                mt-[6px]
                text-[13px]
                text-black/60
              "
            >
              {order.orderNumber}
            </p>
          </div>
        </div>

        <div
          className="
            my-[26px]
            h-px
            bg-black/10
          "
        />

        {/* META */}

        <div
          className="
            grid
            grid-cols-2
            gap-[18px]

            text-[13px]
          "
        >
          <div>
            <p
              className="
                text-black/50
              "
            >
              Order Date
            </p>

            <p
              className="
                mt-[4px]
                font-medium
              "
            >
              {formatDate(
                order.createdAt,
              )}
            </p>
          </div>

          <div>
            <p
              className="
                text-black/50
              "
            >
              Order Status
            </p>

            <p
              className="
                mt-[4px]
                font-medium
              "
            >
              {order.status}
            </p>
          </div>

          <div>
            <p
              className="
                text-black/50
              "
            >
              Payment Method
            </p>

            <p
              className="
                mt-[4px]
                font-medium
              "
            >
              {order.paymentMethod}
            </p>
          </div>

          <div>
            <p
              className="
                text-black/50
              "
            >
              Payment Status
            </p>

            <p
              className="
                mt-[4px]
                font-medium
              "
            >
              {order.paymentStatus}
            </p>
          </div>
        </div>

        {/* CUSTOMER */}

        <div
          className="
            mt-[30px]
            grid
            grid-cols-1
            gap-[22px]

            min-[700px]:
            grid-cols-2
          "
        >
          <section>
            <h3
              className="
                text-[15px]
                font-semibold
              "
            >
              Customer
            </h3>

            <div
              className="
                mt-[10px]
                text-[13px]
                leading-[1.7]
                text-black/70
              "
            >
              <p
                className="
                  font-medium
                  text-black
                "
              >
                {order.user.name}
              </p>

              <p>
                {order.user.email}
              </p>
            </div>
          </section>

          <section>
            <h3
              className="
                text-[15px]
                font-semibold
              "
            >
              Shipping Address
            </h3>

            <div
              className="
                mt-[10px]
                text-[13px]
                leading-[1.7]
                text-black/70
              "
            >
              <p
                className="
                  font-medium
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

              <p>
                {order.shippingPhone}
              </p>

              <p>
                {
                  order.shippingAddressLine1
                }
              </p>

              {order.shippingAddressLine2 && (
                <p>
                  {
                    order.shippingAddressLine2
                  }
                </p>
              )}

              <p>
                {order.shippingCity}
                {order.shippingState
                  ? `, ${order.shippingState}`
                  : ""}
                {" "}
                {
                  order.shippingPostalCode
                }
              </p>

              <p>
                {
                  order.shippingCountry
                }
              </p>
            </div>
          </section>
        </div>

        {/* ITEMS */}

        <section
          className="
            mt-[34px]
          "
        >
          <h3
            className="
              text-[16px]
              font-semibold
            "
          >
            Order Items
          </h3>

          <div
            className="
              mt-[12px]
              overflow-hidden
              rounded-[10px]
              border
              border-black/10
            "
          >
            <table
              className="
                w-full
                border-collapse
                text-[12px]
              "
            >
              <thead
                className="
                  bg-[#F7F7F7]
                "
              >
                <tr>
                  <th
                    className="
                      px-[12px]
                      py-[10px]
                      text-left
                      font-medium
                    "
                  >
                    Product
                  </th>

                  <th
                    className="
                      px-[12px]
                      py-[10px]
                      text-left
                      font-medium
                    "
                  >
                    Variant
                  </th>

                  <th
                    className="
                      px-[12px]
                      py-[10px]
                      text-center
                      font-medium
                    "
                  >
                    Qty
                  </th>

                  <th
                    className="
                      px-[12px]
                      py-[10px]
                      text-right
                      font-medium
                    "
                  >
                    Unit
                  </th>

                  <th
                    className="
                      px-[12px]
                      py-[10px]
                      text-right
                      font-medium
                    "
                  >
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {order.items.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="
                        border-t
                        border-black/10
                      "
                    >
                      <td
                        className="
                          px-[12px]
                          py-[12px]
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-[10px]
                          "
                        >
                          <div
                            className="
                              relative
                              h-[48px]
                              w-[48px]
                              shrink-0
                              overflow-hidden
                              rounded-[6px]
                              bg-[#F2F2F2]
                            "
                          >
                            {item.productImage && (
                              <Image
                                src={
                                  item.productImage
                                }
                                alt={
                                  item.productName
                                }
                                fill
                                sizes="48px"
                                className="
                                  object-cover
                                "
                              />
                            )}
                          </div>

                          <div>
                            <p
                              className="
                                font-medium
                              "
                            >
                              {
                                item.productName
                              }
                            </p>
                          </div>
                        </div>
                      </td>

                      <td
                        className="
                          px-[12px]
                          py-[12px]
                          text-black/60
                        "
                      >
                        {item.colorName}

                        {item.size
                          ? ` / ${item.size}`
                          : ""}
                      </td>

                      <td
                        className="
                          px-[12px]
                          py-[12px]
                          text-center
                        "
                      >
                        {item.quantity}
                      </td>

                      <td
                        className="
                          px-[12px]
                          py-[12px]
                          text-right
                        "
                      >
                        {formatMoney(
                          Number(
                            item.unitPrice,
                          ),
                        )}
                      </td>

                      <td
                        className="
                          px-[12px]
                          py-[12px]
                          text-right
                          font-medium
                        "
                      >
                        {formatMoney(
                          Number(
                            item.subtotal,
                          ),
                        )}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* TOTALS */}

        <div
          className="
            mt-[26px]
            ml-auto
            w-full
            max-w-[330px]
          "
        >
          <InvoiceRow
            label="Subtotal"
            value={subtotal}
          />

          {productDiscount > 0 && (
            <InvoiceRow
              label="Product Discount"
              value={
                -productDiscount
              }
            />
          )}

          {couponDiscount > 0 && (
            <InvoiceRow
              label={
                order.couponCodeSnapshot
                  ? `Coupon (${order.couponCodeSnapshot})`
                  : "Coupon Discount"
              }
              value={
                -couponDiscount
              }
            />
          )}

          <InvoiceRow
            label="Shipping"
            value={shippingAmount}
          />

          <InvoiceRow
            label="Tax"
            value={taxAmount}
          />

          <div
            className="
              mt-[12px]
              border-t
              border-black/15
              pt-[12px]
            "
          >
            <InvoiceRow
              label="Total"
              value={total}
              strong
            />
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
            mt-[40px]
            border-t
            border-black/10
            pt-[20px]

            text-center
            text-[12px]
            text-black/45
          "
        >
          Thank you for shopping with SHOP.CO.
        </div>
      </div>
    </main>
  );
}

function InvoiceRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-[20px]

        py-[5px]
      "
    >
      <span
        className={
          strong
            ? "text-[15px] font-semibold"
            : "text-[13px] text-black/60"
        }
      >
        {label}
      </span>

      <span
        className={
          strong
            ? "text-[17px] font-bold"
            : "text-[13px]"
        }
      >
        {value < 0 ? "-" : ""}
        $
        {Math.abs(
          value,
        ).toFixed(2)}
      </span>
    </div>
  );
}