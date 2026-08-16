import "server-only";

import { Resend } from "resend";

const resendApiKey =
  process.env.RESEND_API_KEY;

const fromEmail =
  process.env.RESEND_FROM_EMAIL;

const resend = resendApiKey
  ? new Resend(resendApiKey)
  : null;

export type OrderConfirmationEmailData = {
  to: string;

  customerName: string;

  orderNumber: string;

  paymentMethod: string;

  subtotal: number;
  couponDiscount: number;
  shippingAmount: number;
  taxAmount: number;
  total: number;

  shippingAddress: {
    fullName: string;
    email?: string | null;
    phone: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    postalCode: string;
    country: string;
  };

  items: {
    productName: string;
    colorName?: string | null;
    size?: string | null;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
};

export async function sendOrderConfirmationEmail(
  data: OrderConfirmationEmailData,
) {
  if (!resend || !fromEmail) {
    console.warn(
      "Order email skipped: RESEND_API_KEY or RESEND_FROM_EMAIL is missing.",
    );

    return {
      sent: false,
      skipped: true,
    };
  }

  const itemRows = data.items
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #eeeeee;">
            <strong>${escapeHtml(
              item.productName,
            )}</strong>
            <div style="margin-top:4px;color:#666666;font-size:13px;">
              ${escapeHtml(
                item.colorName ?? "",
              )}
              ${
                item.colorName && item.size
                  ? " / "
                  : ""
              }
              ${escapeHtml(
                item.size ?? "",
              )}
              × ${item.quantity}
            </div>
          </td>

          <td
            style="
              padding:12px 0;
              border-bottom:1px solid #eeeeee;
              text-align:right;
              white-space:nowrap;
            "
          >
            $${item.subtotal.toFixed(2)}
          </td>
        </tr>
      `,
    )
    .join("");

  const result =
    await resend.emails.send({
      from: fromEmail,

      to: [data.to],

      subject:
        `SHOP.CO Order Confirmation — ${data.orderNumber}`,

      html: `
        <!doctype html>

        <html>
          <body
            style="
              margin:0;
              padding:0;
              background:#f6f6f6;
              font-family:Arial,Helvetica,sans-serif;
              color:#000000;
            "
          >
            <div
              style="
                max-width:640px;
                margin:0 auto;
                padding:32px 16px;
              "
            >
              <div
                style="
                  background:#ffffff;
                  border:1px solid #e6e6e6;
                  border-radius:16px;
                  overflow:hidden;
                "
              >
                <div
                  style="
                    background:#000000;
                    color:#ffffff;
                    padding:24px;
                  "
                >
                  <div
                    style="
                      font-size:26px;
                      font-weight:800;
                    "
                  >
                    SHOP.CO
                  </div>

                  <div
                    style="
                      margin-top:8px;
                      font-size:16px;
                    "
                  >
                    Order confirmed
                  </div>
                </div>

                <div style="padding:28px;">
                  <h1
                    style="
                      margin:0;
                      font-size:24px;
                    "
                  >
                    Thanks for your order,
                    ${escapeHtml(
                      data.customerName,
                    )}.
                  </h1>

                  <p
                    style="
                      color:#666666;
                      line-height:1.6;
                    "
                  >
                    Your order has been placed successfully.
                  </p>

                  <div
                    style="
                      margin:24px 0;
                      padding:16px;
                      background:#f8f8f8;
                      border-radius:10px;
                    "
                  >
                    <div>
                      <strong>Order number:</strong>
                      ${escapeHtml(
                        data.orderNumber,
                      )}
                    </div>

                    <div style="margin-top:6px;">
                      <strong>Payment:</strong>
                      ${escapeHtml(
                        data.paymentMethod,
                      )}
                    </div>
                  </div>

                  <h2 style="font-size:18px;">
                    Items
                  </h2>

                  <table
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    style="
                      border-collapse:collapse;
                    "
                  >
                    ${itemRows}
                  </table>

                  <div
                    style="
                      margin-top:24px;
                      border-top:1px solid #eeeeee;
                      padding-top:16px;
                    "
                  >
                    ${moneyRow(
                      "Subtotal",
                      data.subtotal,
                    )}

                    ${moneyRow(
                      "Coupon Discount",
                      -data.couponDiscount,
                    )}

                    ${moneyRow(
                      "Delivery",
                      data.shippingAmount,
                    )}

                    ${moneyRow(
                      "Tax",
                      data.taxAmount,
                    )}

                    <div
                      style="
                        display:flex;
                        justify-content:space-between;
                        margin-top:12px;
                        font-size:20px;
                        font-weight:700;
                      "
                    >
                      <span>Total</span>
                      <span>
                        $${data.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div
                    style="
                      margin-top:28px;
                      padding-top:20px;
                      border-top:1px solid #eeeeee;
                    "
                  >
                    <h2 style="font-size:18px;">
                      Shipping Address
                    </h2>

                    <div
                      style="
                        color:#555555;
                        line-height:1.6;
                      "
                    >
                      <strong
                        style="color:#000000;"
                      >
                        ${escapeHtml(
                          data.shippingAddress
                            .fullName,
                        )}
                      </strong>

                      <br />

                      ${escapeHtml(
                        data.shippingAddress
                          .addressLine1,
                      )}

                      ${
                        data.shippingAddress
                          .addressLine2
                          ? `<br />${escapeHtml(
                              data
                                .shippingAddress
                                .addressLine2,
                            )}`
                          : ""
                      }

                      <br />

                      ${escapeHtml(
                        data.shippingAddress.city,
                      )}

                      ${
                        data.shippingAddress.state
                          ? `, ${escapeHtml(
                              data.shippingAddress
                                .state,
                            )}`
                          : ""
                      }

                      ${escapeHtml(
                        data.shippingAddress
                          .postalCode,
                      )}

                      <br />

                      ${escapeHtml(
                        data.shippingAddress.country,
                      )}

                      <br />

                      ${escapeHtml(
                        data.shippingAddress.phone,
                      )}
                    </div>
                  </div>

                  <p
                    style="
                      margin-top:28px;
                      color:#666666;
                      line-height:1.6;
                    "
                  >
                    We’ll keep you updated as your order progresses.
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

  if (result.error) {
    throw new Error(
      result.error.message ||
        "Unable to send order confirmation email.",
    );
  }

  return {
    sent: true,
    skipped: false,
    id: result.data?.id,
  };
}

function moneyRow(
  label: string,
  amount: number,
) {
  const negative = amount < 0;

  const formatted = Math.abs(
    amount,
  ).toFixed(2);

  return `
    <div
      style="
        display:flex;
        justify-content:space-between;
        margin:8px 0;
        color:#555555;
      "
    >
      <span>${label}</span>

      <span>
        ${negative ? "-" : ""}$${formatted}
      </span>
    </div>
  `;
}

function escapeHtml(
  value: string,
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}