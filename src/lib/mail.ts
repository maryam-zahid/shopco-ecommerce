import "server-only";

import nodemailer from "nodemailer";

/* =========================================================
   SMTP CONFIGURATION
========================================================= */

const smtpUser =
  process.env.SMTP_USER;

const smtpPass =
  process.env.SMTP_PASS;

const fromEmail =
  process.env.SMTP_FROM;

const transporter =
  smtpUser && smtpPass
    ? nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : null;

/* =========================================================
   ORDER CONFIRMATION TYPES
========================================================= */

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

    productImage?: string | null;

    colorName?: string | null;

    size?: string | null;

    quantity: number;

    unitPrice: number;

    subtotal: number;
  }[];
};

/* =========================================================
   ORDER CONFIRMATION EMAIL
========================================================= */

export async function sendOrderConfirmationEmail(
  data: OrderConfirmationEmailData,
) {
  if (
    !transporter ||
    !fromEmail
  ) {
    console.warn(
      "ORDER_CONFIRMATION_EMAIL_SKIPPED: SMTP_USER, SMTP_PASS or SMTP_FROM is missing.",
    );

    return {
      sent: false,
      skipped: true,
    };
  }

  /* ---------------------------------------------------------
     PRODUCT ROWS
  --------------------------------------------------------- */

  const itemRows = data.items
    .map(
      (item) => `
        <tr>
          <td
            style="
              padding:16px 0;
              border-bottom:1px solid #eeeeee;
            "
          >
            <table
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              style="
                border-collapse:collapse;
              "
            >
              <tr>
                ${
                  item.productImage
                    ? `
                      <td
                        width="82"
                        valign="top"
                        style="
                          width:82px;
                          padding-right:16px;
                        "
                      >
                        <img
                          src="${escapeHtml(
                            item.productImage,
                          )}"
                          alt="${escapeHtml(
                            item.productName,
                          )}"
                          width="70"
                          height="70"
                          style="
                            display:block;
                            width:70px;
                            height:70px;
                            object-fit:cover;
                            border-radius:10px;
                            background:#f4f4f4;
                          "
                        />
                      </td>
                    `
                    : ""
                }

                <td
                  valign="top"
                  style="
                    padding-right:12px;
                  "
                >
                  <div
                    style="
                      font-size:15px;
                      line-height:1.4;
                      font-weight:700;
                      color:#000000;
                    "
                  >
                    ${escapeHtml(
                      item.productName,
                    )}
                  </div>

                  ${
                    item.colorName ||
                    item.size
                      ? `
                        <div
                          style="
                            margin-top:6px;
                            color:#666666;
                            font-size:13px;
                            line-height:1.5;
                          "
                        >
                          ${
                            item.colorName
                              ? `Color: ${escapeHtml(
                                  item.colorName,
                                )}`
                              : ""
                          }

                          ${
                            item.colorName &&
                            item.size
                              ? " &nbsp;&bull;&nbsp; "
                              : ""
                          }

                          ${
                            item.size
                              ? `Size: ${escapeHtml(
                                  item.size,
                                )}`
                              : ""
                          }
                        </div>
                      `
                      : ""
                  }

                  <div
                    style="
                      margin-top:5px;
                      color:#777777;
                      font-size:13px;
                      line-height:1.5;
                    "
                  >
                    Qty: ${item.quantity}

                    &nbsp;&bull;&nbsp;

                    $${item.unitPrice.toFixed(
                      2,
                    )} each
                  </div>
                </td>

                <td
                  valign="top"
                  align="right"
                  style="
                    padding-left:10px;
                    font-size:15px;
                    font-weight:700;
                    white-space:nowrap;
                    color:#000000;
                  "
                >
                  $${item.subtotal.toFixed(
                    2,
                  )}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `,
    )
    .join("");

  /* ---------------------------------------------------------
     SEND EMAIL
  --------------------------------------------------------- */

  const result =
    await transporter.sendMail({
      from: fromEmail,

      to: data.to,

      subject:
        `SHOP.CO Order Confirmation - ${data.orderNumber}`,

      html: `
        <!doctype html>

        <html>
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </head>

          <body
            style="
              margin:0;
              padding:0;
              background:#f5f5f5;
              font-family:Arial,Helvetica,sans-serif;
              color:#000000;
            "
          >
            <div
              style="
                width:100%;
                background:#f5f5f5;
                padding:32px 0;
              "
            >
              <div
                style="
                  max-width:640px;
                  margin:0 auto;
                  padding:0 16px;
                "
              >
                <div
                  style="
                    background:#ffffff;
                    border:1px solid #e8e8e8;
                    border-radius:16px;
                    overflow:hidden;
                  "
                >

                  <!-- HEADER -->

                  <div
                    style="
                      background:#000000;
                      color:#ffffff;
                      padding:26px 28px;
                    "
                  >
                    <div
                      style="
                        font-size:28px;
                        line-height:1;
                        font-weight:800;
                        letter-spacing:-1px;
                      "
                    >
                      SHOP.CO
                    </div>

                    <div
                      style="
                        margin-top:10px;
                        font-size:15px;
                        color:#e5e5e5;
                      "
                    >
                      Order Confirmation
                    </div>
                  </div>

                  <!-- BODY -->

                  <div
                    style="
                      padding:30px 28px;
                    "
                  >

                    <h1
                      style="
                        margin:0;
                        font-size:24px;
                        line-height:1.3;
                        font-weight:700;
                      "
                    >
                      Thanks for your order,
                      ${escapeHtml(
                        data.customerName,
                      )}!
                    </h1>

                    <p
                      style="
                        margin:14px 0 0;
                        color:#666666;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      We've received your order and
                      will keep you updated as it
                      moves through delivery.
                    </p>

                    <!-- ORDER INFORMATION -->

                    <div
                      style="
                        margin-top:24px;
                        padding:18px;
                        background:#f7f7f7;
                        border-radius:10px;
                      "
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tr>
                          <td
                            style="
                              color:#666666;
                              font-size:13px;
                              padding-bottom:5px;
                            "
                          >
                            ORDER NUMBER
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              font-size:16px;
                              font-weight:700;
                              color:#000000;
                            "
                          >
                            ${escapeHtml(
                              data.orderNumber,
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding-top:14px;
                              color:#666666;
                              font-size:13px;
                            "
                          >
                            PAYMENT METHOD
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding-top:5px;
                              font-size:15px;
                              font-weight:600;
                            "
                          >
                            ${formatPaymentMethod(
                              data.paymentMethod,
                            )}
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- ITEMS -->

                    <h2
                      style="
                        margin:30px 0 4px;
                        font-size:19px;
                        font-weight:700;
                      "
                    >
                      Order Summary
                    </h2>

                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        border-collapse:collapse;
                      "
                    >
                      ${itemRows}
                    </table>

                    <!-- TOTALS -->

                    <div
                      style="
                        margin-top:22px;
                        padding-top:4px;
                      "
                    >
                      ${moneyRow(
                        "Subtotal",
                        data.subtotal,
                      )}

                      ${
                        data.couponDiscount >
                        0
                          ? moneyRow(
                              "Coupon Discount",
                              -data.couponDiscount,
                            )
                          : ""
                      }

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
                          margin-top:14px;
                          padding-top:16px;
                          border-top:1px solid #dddddd;
                        "
                      >
                        <table
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                        >
                          <tr>
                            <td
                              style="
                                font-size:19px;
                                font-weight:700;
                              "
                            >
                              Total
                            </td>

                            <td
                              align="right"
                              style="
                                font-size:19px;
                                font-weight:700;
                              "
                            >
                              $${data.total.toFixed(
                                2,
                              )}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>

                    <!-- SHIPPING ADDRESS -->

                    <div
                      style="
                        margin-top:30px;
                        padding-top:24px;
                        border-top:1px solid #eeeeee;
                      "
                    >
                      <h2
                        style="
                          margin:0 0 14px;
                          font-size:18px;
                          font-weight:700;
                        "
                      >
                        Shipping Address
                      </h2>

                      <div
                        style="
                          color:#555555;
                          font-size:14px;
                          line-height:1.7;
                        "
                      >
                        <strong
                          style="
                            color:#000000;
                          "
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
                            ? `
                              <br />

                              ${escapeHtml(
                                data
                                  .shippingAddress
                                  .addressLine2,
                              )}
                            `
                            : ""
                        }

                        <br />

                        ${escapeHtml(
                          data.shippingAddress
                            .city,
                        )}

                        ${
                          data.shippingAddress
                            .state
                            ? `, ${escapeHtml(
                                data
                                  .shippingAddress
                                  .state,
                              )}`
                            : ""
                        }

                        ${" "}

                        ${escapeHtml(
                          data.shippingAddress
                            .postalCode,
                        )}

                        <br />

                        ${escapeHtml(
                          data.shippingAddress
                            .country,
                        )}

                        <br />

                        ${escapeHtml(
                          data.shippingAddress
                            .phone,
                        )}

                        ${
                          data.shippingAddress
                            .email
                            ? `
                              <br />

                              ${escapeHtml(
                                data
                                  .shippingAddress
                                  .email,
                              )}
                            `
                            : ""
                        }
                      </div>
                    </div>

                    <!-- FOOTER MESSAGE -->

                    <p
                      style="
                        margin:30px 0 0;
                        color:#777777;
                        font-size:14px;
                        line-height:1.7;
                      "
                    >
                      We'll send you another email
                      when the status of your order
                      changes.
                    </p>

                    <p
                      style="
                        margin:10px 0 0;
                        color:#777777;
                        font-size:14px;
                        line-height:1.7;
                      "
                    >
                      Thank you for shopping with
                      SHOP.CO.
                    </p>
                  </div>
                </div>

                <div
                  style="
                    padding:22px 10px;
                    text-align:center;
                    color:#999999;
                    font-size:12px;
                  "
                >
                  SHOP.CO Order Notification
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

  console.log(
    "ORDER_CONFIRMATION_EMAIL_SENT:",
    {
      to: data.to,

      orderNumber:
        data.orderNumber,

      emailId:
        result.messageId,
    },
  );

  return {
    sent: true,
    skipped: false,

    id: result.messageId,
  };
}

/* =========================================================
   ORDER STATUS EMAIL TYPES
========================================================= */

export type OrderStatusEmailData = {
  to: string;

  customerName: string;

  orderNumber: string;

  status:
    | "PROCESSING"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";
};

/* =========================================================
   ORDER STATUS EMAIL
========================================================= */

export async function sendOrderStatusEmail(
  data: OrderStatusEmailData,
) {
  if (
    !transporter ||
    !fromEmail
  ) {
    console.warn(
      "ORDER_STATUS_EMAIL_SKIPPED: SMTP_USER, SMTP_PASS or SMTP_FROM is missing.",
    );

    return {
      sent: false,
      skipped: true,
    };
  }

  const content =
    getOrderStatusEmailContent(
      data.status,
    );

  const result =
    await transporter.sendMail({
      from: fromEmail,

      to: data.to,

      subject:
        `${content.subject} - ${data.orderNumber}`,

      html: `
        <!doctype html>

        <html>
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </head>

          <body
            style="
              margin:0;
              padding:0;
              background:#f5f5f5;
              font-family:Arial,Helvetica,sans-serif;
              color:#000000;
            "
          >
            <div
              style="
                width:100%;
                background:#f5f5f5;
                padding:32px 0;
              "
            >
              <div
                style="
                  max-width:640px;
                  margin:0 auto;
                  padding:0 16px;
                "
              >
                <div
                  style="
                    background:#ffffff;
                    border:1px solid #e8e8e8;
                    border-radius:16px;
                    overflow:hidden;
                  "
                >
                  <div
                    style="
                      background:#000000;
                      color:#ffffff;
                      padding:26px 28px;
                    "
                  >
                    <div
                      style="
                        font-size:28px;
                        line-height:1;
                        font-weight:800;
                        letter-spacing:-1px;
                      "
                    >
                      SHOP.CO
                    </div>

                    <div
                      style="
                        margin-top:10px;
                        color:#e5e5e5;
                        font-size:15px;
                      "
                    >
                      ${content.heading}
                    </div>
                  </div>

                  <div
                    style="
                      padding:30px 28px;
                    "
                  >
                    <h1
                      style="
                        margin:0;
                        font-size:24px;
                        line-height:1.3;
                      "
                    >
                      Hi ${escapeHtml(
                        data.customerName,
                      )},
                    </h1>

                    <p
                      style="
                        margin:16px 0 0;
                        color:#555555;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      ${content.message}
                    </p>

                    <div
                      style="
                        margin-top:24px;
                        padding:18px;
                        background:#f7f7f7;
                        border-radius:10px;
                      "
                    >
                      <div
                        style="
                          color:#666666;
                          font-size:12px;
                          font-weight:600;
                        "
                      >
                        ORDER NUMBER
                      </div>

                      <div
                        style="
                          margin-top:6px;
                          font-size:16px;
                          font-weight:700;
                        "
                      >
                        ${escapeHtml(
                          data.orderNumber,
                        )}
                      </div>
                    </div>

                    <div
                      style="
                        margin-top:16px;
                        padding:18px;
                        border:1px solid #e6e6e6;
                        border-radius:10px;
                      "
                    >
                      <div
                        style="
                          color:#666666;
                          font-size:12px;
                          font-weight:600;
                        "
                      >
                        CURRENT STATUS
                      </div>

                      <div
                        style="
                          margin-top:7px;
                          font-size:19px;
                          font-weight:700;
                        "
                      >
                        ${content.statusLabel}
                      </div>
                    </div>

                    <p
                      style="
                        margin:28px 0 0;
                        color:#777777;
                        font-size:14px;
                        line-height:1.7;
                      "
                    >
                      Thank you for shopping with
                      SHOP.CO.
                    </p>
                  </div>
                </div>

                <div
                  style="
                    padding:22px 10px;
                    text-align:center;
                    color:#999999;
                    font-size:12px;
                  "
                >
                  SHOP.CO Order Notification
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

  console.log(
    "ORDER_STATUS_EMAIL_SENT:",
    {
      to: data.to,

      orderNumber:
        data.orderNumber,

      status:
        data.status,

      emailId:
        result.messageId,
    },
  );

  return {
    sent: true,
    skipped: false,

    id: result.messageId,
  };
}

/* =========================================================
   ORDER STATUS CONTENT
========================================================= */

function getOrderStatusEmailContent(
  status: OrderStatusEmailData["status"],
) {
  switch (status) {
    case "PROCESSING":
      return {
        subject:
          "Your SHOP.CO order is being processed",

        heading:
          "We're preparing your order",

        statusLabel:
          "Processing",

        message:
          "Good news! We have started preparing your order. We'll let you know as soon as it has been shipped.",
      };

    case "SHIPPED":
      return {
        subject:
          "Your SHOP.CO order has shipped",

        heading:
          "Your order is on the way",

        statusLabel:
          "Shipped",

        message:
          "Your order has been shipped and is now on its way to you. We'll send you another update when it is out for delivery.",
      };

    case "OUT_FOR_DELIVERY":
      return {
        subject:
          "Your SHOP.CO order is out for delivery",

        heading:
          "Your order is arriving soon",

        statusLabel:
          "Out for Delivery",

        message:
          "Your order is out for delivery. Please make sure someone is available to receive the package.",
      };

    case "DELIVERED":
      return {
        subject:
          "Your SHOP.CO order has been delivered",

        heading:
          "Your order has arrived",

        statusLabel:
          "Delivered",

        message:
          "Your order has been delivered successfully. We hope you enjoy your purchase!",
      };

    case "CANCELLED":
      return {
        subject:
          "Your SHOP.CO order has been cancelled",

        heading:
          "Order cancelled",

        statusLabel:
          "Cancelled",

        message:
          "Your order has been cancelled. If you believe this was a mistake, please contact our support team.",
      };
  }
}

/* =========================================================
   MONEY ROW
========================================================= */

function moneyRow(
  label: string,
  amount: number,
) {
  const negative =
    amount < 0;

  const formatted =
    Math.abs(
      amount,
    ).toFixed(2);

  return `
    <table
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        margin:10px 0;
      "
    >
      <tr>
        <td
          style="
            color:#555555;
            font-size:14px;
          "
        >
          ${escapeHtml(label)}
        </td>

        <td
          align="right"
          style="
            color:#555555;
            font-size:14px;
            white-space:nowrap;
          "
        >
          ${
            negative
              ? "-"
              : ""
          }$${formatted}
        </td>
      </tr>
    </table>
  `;
}

/* =========================================================
   PAYMENT METHOD
========================================================= */

function formatPaymentMethod(
  value: string,
) {
  if (value === "COD") {
    return "Cash on Delivery";
  }

  if (
    value === "CARD" ||
    value === "STRIPE"
  ) {
    return "Card";
  }

  return escapeHtml(value);
}

/* =========================================================
   HTML ESCAPING
========================================================= */

function escapeHtml(
  value: string,
) {
  return value
    .replaceAll(
      "&",
      "&amp;",
    )
    .replaceAll(
      "<",
      "&lt;",
    )
    .replaceAll(
      ">",
      "&gt;",
    )
    .replaceAll(
      '"',
      "&quot;",
    )
    .replaceAll(
      "'",
      "&#039;",
    );
}