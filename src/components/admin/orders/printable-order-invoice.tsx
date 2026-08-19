"use client";

type PrintableOrderInvoiceProps = {
  orderNumber: string;

  createdAt: string;

  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;

  shippingFullName: string | null;
  shippingEmail: string | null;
  shippingPhone: string | null;

  shippingAddressLine1: string | null;
  shippingAddressLine2: string | null;
  shippingCity: string | null;
  shippingState: string | null;
  shippingPostalCode: string | null;
  shippingCountry: string | null;

  subtotal: number;
  productDiscount: number;
  couponDiscount: number;
  couponCode: string | null;
  shippingAmount: number;
  taxAmount: number;
  total: number;

  items: {
    id: string;
    productName: string;
    productImage: string | null;
    colorName: string | null;
    size: string | null;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
};

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

function statusLabel(value: string) {
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

function paymentLabel(value: string) {
  if (value === "COD") {
    return "Cash on Delivery";
  }

  if (value === "CARD") {
    return "Card";
  }

  return statusLabel(value);
}

export default function PrintableOrderInvoice({
  orderNumber,
  createdAt,
  paymentMethod,
  paymentStatus,
  orderStatus,

  shippingFullName,
  shippingEmail,
  shippingPhone,

  shippingAddressLine1,
  shippingAddressLine2,
  shippingCity,
  shippingState,
  shippingPostalCode,
  shippingCountry,

  subtotal,
  productDiscount,
  couponDiscount,
  couponCode,
  shippingAmount,
  taxAmount,
  total,

  items,
}: PrintableOrderInvoiceProps) {
  return (
    <div
      id="printable-order-invoice"
      className="
        hidden

        print:block
        print:w-full
        print:bg-white
        print:text-black
      "
    >
      <div className="w-full px-[10mm] py-[8mm]">
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
                text-[28px]
                font-black
                tracking-[-0.05em]
              "
            >
              SHOP.CO
            </h1>
          </div>

          <div className="text-right">
            <p
              className="
                text-[18px]
                font-bold
                uppercase
              "
            >
              Invoice / Packing Slip
            </p>
          </div>
        </div>

        <div className="mt-[14px] border-t-2 border-black" />

        {/* ORDER INFO */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-[28px]
            gap-y-[6px]

            border-b
            border-black/20

            py-[14px]
          "
        >
          <Info
            label="ORDER NUMBER"
            value={orderNumber}
          />

          <Info
            label="ORDER DATE"
            value={createdAt}
          />

          <Info
            label="PAYMENT METHOD"
            value={paymentLabel(
              paymentMethod,
            )}
          />

          <Info
            label="PAYMENT STATUS"
            value={statusLabel(
              paymentStatus,
            )}
          />

          <Info
            label="ORDER STATUS"
            value={statusLabel(
              orderStatus,
            )}
          />
        </div>

        {/* SHIPPING */}

        <div
          className="
            border-b
            border-black/20
            py-[14px]
          "
        >
          <p className="text-[11px] font-bold uppercase">
            Customer / Shipping Details
          </p>

          <div
            className="
              mt-[7px]
              text-[11px]
              leading-[1.6]
              text-black/75
            "
          >
            <p className="text-[13px] font-bold text-black">
              {shippingFullName ?? "—"}
            </p>

            {shippingEmail && (
              <p>{shippingEmail}</p>
            )}

            {shippingPhone && (
              <p>{shippingPhone}</p>
            )}

            {shippingAddressLine1 && (
              <p>{shippingAddressLine1}</p>
            )}

            {shippingAddressLine2 && (
              <p>{shippingAddressLine2}</p>
            )}

            <p>
              {[
                shippingCity,
                shippingState,
                shippingPostalCode,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>

            {shippingCountry && (
              <p>{shippingCountry}</p>
            )}
          </div>
        </div>

        {/* ITEMS */}

        <div className="mt-[16px]">
          <div
            className="
              grid
              grid-cols-[minmax(0,2.2fr)_1fr_0.4fr_0.75fr_0.8fr]

              bg-black
              px-[10px]
              py-[8px]

              text-[9px]
              font-bold
              uppercase
              text-white
            "
          >
            <span>Product</span>
            <span>Variant</span>
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

          {items.map((item) => (
            <div
              key={item.id}
              className="
                grid
                grid-cols-[minmax(0,2.2fr)_1fr_0.4fr_0.75fr_0.8fr]

                items-center

                border-b
                border-black/15

                px-[8px]
                py-[9px]

                break-inside-avoid
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-[9px]
                "
              >
                <div
                  className="
                    flex
                    h-[44px]
                    w-[44px]
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
                      src={item.productImage}
                      alt={item.productName}
                      className="
                        h-full
                        w-full
                        object-contain
                      "
                    />
                  ) : (
                    <span className="text-[7px] text-black/30">
                      No image
                    </span>
                  )}
                </div>

                <p
                  className="
                    text-[10px]
                    font-bold
                    leading-[1.3]
                  "
                >
                  {item.productName}
                </p>
              </div>

              <p className="text-[9px] text-black/65">
                {item.colorName ?? "—"}
                {item.size
                  ? ` / ${item.size}`
                  : ""}
              </p>

              <p className="text-center text-[9px]">
                {item.quantity}
              </p>

              <p className="text-right text-[9px]">
                {money(
                  item.unitPrice,
                )}
              </p>

              <p className="text-right text-[9px]">
                {money(
                  item.subtotal,
                )}
              </p>
            </div>
          ))}
        </div>

        {/* FULL-WIDTH TOTALS */}

        <div
          className="
            mt-[16px]
            w-full
            border-t
            border-black/20
            pt-[10px]
          "
        >
          <Summary
            label="SUBTOTAL"
            value={subtotal}
          />

          {productDiscount > 0 && (
            <Summary
              label="PRODUCT DISCOUNT"
              value={
                -productDiscount
              }
            />
          )}

          {couponDiscount > 0 && (
            <Summary
              label={
                couponCode
                  ? `COUPON DISCOUNT (${couponCode})`
                  : "COUPON DISCOUNT"
              }
              value={
                -couponDiscount
              }
            />
          )}

          <Summary
            label="SHIPPING"
            value={
              shippingAmount
            }
          />

          <Summary
            label="TAX"
            value={taxAmount}
          />

          <div
            className="
              mt-[8px]

              flex
              w-full
              items-center
              justify-between

              border-y-2
              border-black

              bg-[#F6F6F6]

              px-[10px]
              py-[9px]
            "
          >
            <span className="text-[14px] font-black">
              TOTAL
            </span>

            <span className="text-[15px] font-black">
              {money(total)}
            </span>
          </div>
        </div>

        {/* FULL-WIDTH PAYMENT STRIP */}

        <div
          className="
            mt-[12px]
            grid
            w-full
            grid-cols-3
            gap-[18px]

            border
            border-black/20

            px-[12px]
            py-[10px]
          "
        >
          <SmallInfo
            label="PAYMENT METHOD"
            value={paymentLabel(
              paymentMethod,
            )}
          />

          <SmallInfo
            label="PAYMENT STATUS"
            value={statusLabel(
              paymentStatus,
            )}
          />

          <SmallInfo
            label="DELIVERY STATUS"
            value={statusLabel(
              orderStatus,
            )}
          />
        </div>
      </div>
    </div>
  );
}

function Info({
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
        grid-cols-[125px_minmax(0,1fr)]
        gap-[8px]
        text-[10px]
      "
    >
      <span className="font-bold">
        {label}
      </span>

      <span className="font-normal text-black/70">
        {value}
      </span>
    </div>
  );
}

function Summary({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      className="
        flex
        w-full
        items-center
        justify-between
        py-[3px]
      "
    >
      <span className="text-[10px] font-bold">
        {label}
      </span>

      <span className="text-[10px] font-normal">
        {value < 0 ? "-" : ""}
        $
        {Math.abs(
          value,
        ).toFixed(2)}
      </span>
    </div>
  );
}

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
          text-[8px]
          font-bold
          uppercase
          text-black/45
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[2px]
          text-[10px]
          font-normal
        "
      >
        {value}
      </p>
    </div>
  );
}