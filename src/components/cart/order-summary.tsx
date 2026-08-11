"use client";

import { useState } from "react";

type OrderSummaryProps = {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
};

export default function OrderSummary({
  subtotal,
  discount,
  deliveryFee,
  total,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");

  function handleApplyPromo() {
    if (!promoCode.trim()) return;

    alert(
      `Promo code "${promoCode}" applied for frontend demo.`,
    );
  }

  return (
    <div
      className="
        w-full
        rounded-[20px]
        border
        border-black/10
        bg-white

        px-[20px]
        py-[20px]

        min-[1200px]:px-[24px]
        min-[1200px]:py-[20px]
      "
    >
      {/* TITLE */}
      <h2
        className="
          m-0
          text-[20px]
          leading-[27px]
          text-black

          min-[1200px]:text-[24px]
          min-[1200px]:leading-[32px]
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 700,
        }}
      >
        Order Summary
      </h2>

      {/* SUMMARY ROWS */}
      <div
        className="
          mt-[20px]
          flex
          flex-col
          gap-[20px]
        "
      >
        <SummaryRow
          label="Subtotal"
          value={`$${subtotal}`}
        />

        <SummaryRow
          label="Discount (-20%)"
          value={`-$${discount}`}
          danger
        />

        <SummaryRow
          label="Delivery Fee"
          value={`$${deliveryFee}`}
        />
      </div>

      {/* DIVIDER */}
      <div
        className="
          my-[20px]
          h-px
          w-full
          bg-black/10
        "
      />

      {/* TOTAL */}
      <SummaryRow
        label="Total"
        value={`$${total}`}
        total
      />

      {/* PROMO + CHECKOUT */}
      <div
        className="
          mt-[20px]
          flex
          w-full
          flex-col
          gap-[24px]
        "
      >
        {/* PROMO ROW */}
        <div
          className="
            flex
            h-[48px]
            w-full
            gap-[12px]
          "
        >
          {/* PROMO INPUT */}
          <div
            className="
              flex
              min-w-0
              flex-1
              items-center
              gap-[12px]

              rounded-[62px]
              bg-[#F0F0F0]
              px-[16px]
            "
          >
            <TagIcon />

            <input
              type="text"
              value={promoCode}
              onChange={(event) =>
                setPromoCode(event.target.value)
              }
              placeholder="Add promo code"
              className="
                min-w-0
                flex-1
                border-0
                bg-transparent
                p-0
                outline-none

                text-[14px]
                leading-[19px]
                text-black

                placeholder:text-black/40
              "
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 400,
              }}
            />
          </div>

          {/* APPLY */}
          <button
            type="button"
            onClick={handleApplyPromo}
            className="
              flex
              h-[48px]
              min-w-[108px]
              shrink-0
              items-center
              justify-center

              rounded-[62px]
              border
              border-black
              bg-black

              px-[24px]

              text-[14px]
              leading-[19px]
              text-white
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 500,
              border: "1px solid #000000",
              backgroundColor: "#000000",
              color: "#FFFFFF",
            }}
          >
            Apply
          </button>
        </div>

        {/* CHECKOUT */}
        <button
          type="button"
          className="
            flex
            h-[54px]
            w-full
            items-center
            justify-center
            gap-[12px]

            rounded-[62px]
            border
            border-black
            bg-black

            px-[24px]

            text-[16px]
            leading-[22px]
            text-white
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 500,
            border: "1px solid #000000",
            backgroundColor: "#000000",
            color: "#FFFFFF",
          }}
        >
          <span>Go to Checkout</span>

          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  danger = false,
  total = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
  total?: boolean;
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
      <span
        className={`
          ${
            total
              ? "text-[20px] text-black"
              : "text-[16px] text-black/60 min-[1200px]:text-[20px]"
          }
        `}
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 400,
        }}
      >
        {label}
      </span>

      <span
        className={`
          ${
            total
              ? "text-[24px] leading-[32px]"
              : "text-[20px] leading-[27px]"
          }

          ${
            danger
              ? "text-[#FF3333]"
              : "text-black"
          }
        `}
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 700,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function TagIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-black/40"
    >
      <path
        d="M20 13L13 20L4 11V4H11L20 13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="8.5"
        cy="8.5"
        r="1.5"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}