"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  useTransition,
} from "react";

import {
  CheckCircle2,
  X,
} from "lucide-react";

import {
  applyCouponAction,
  removeCouponAction,
} from "@/actions/coupon.actions";

type OrderSummaryProps = {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  isEmpty: boolean;

  appliedCouponCode?: string | null;
};

export default function OrderSummary({
  subtotal,
  discount,
  deliveryFee,
  total,
  isEmpty,
  appliedCouponCode = null,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] =
    useState("");

  const [message, setMessage] =
    useState<string | null>(null);

  const [isError, setIsError] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    if (!message) return;

    const timer =
      window.setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 2800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [message]);

  function handleApplyPromo() {
    const code =
      promoCode.trim();

    if (!code) {
      setIsError(true);

      setMessage(
        "Please enter a coupon code.",
      );

      return;
    }

    startTransition(async () => {
      const result =
        await applyCouponAction({
          code,
        });

      setIsError(!result.success);
      setMessage(result.message);

      if (result.success) {
        setPromoCode("");

        window.setTimeout(() => {
          window.location.reload();
        }, 450);
      }
    });
  }

  function handleRemoveCoupon() {
    startTransition(async () => {
      const result =
        await removeCouponAction();

      setIsError(!result.success);
      setMessage(result.message);

      if (result.success) {
        window.setTimeout(() => {
          window.location.reload();
        }, 450);
      }
    });
  }

  return (
    <>
      {/* =====================================
          TOAST
      ====================================== */}

      {message && (
        <div
          className="
            fixed
            right-[24px]
            top-[24px]
            z-[9999]

            w-[390px]
            max-w-[calc(100%_-_32px)]

            overflow-hidden

            rounded-[12px]

            border
            border-black/10

            bg-white

            shadow-[0_12px_40px_rgba(0,0,0,0.16)]

            max-[799px]:left-[16px]
            max-[799px]:right-[16px]
            max-[799px]:w-auto
          "
        >
          <div
            className="
              flex
              min-h-[76px]
              items-center
              gap-[12px]

              px-[18px]
              py-[12px]
            "
          >
            <div
              className={`
                flex
                h-[32px]
                w-[32px]
                shrink-0
                items-center
                justify-center

                rounded-full

                ${
                  isError
                    ? "bg-red-50 text-red-600"
                    : "bg-black text-white"
                }
              `}
            >
              {isError ? (
                <X className="size-[18px]" />
              ) : (
                <CheckCircle2 className="size-[18px]" />
              )}
            </div>

            <p
              className="
                text-[14px]
                font-medium
                leading-[20px]
                text-black
              "
              style={{
                fontFamily:
                  "var(--font-satoshi)",
              }}
            >
              {message}
            </p>
          </div>

          <div
            className={
              isError
                ? "h-[3px] bg-red-600"
                : "h-[3px] bg-black"
            }
          />
        </div>
      )}

      {/* =====================================
          ORDER SUMMARY CARD
      ====================================== */}

      <div
        className="
          w-full

          rounded-[20px]

          border
          border-black/15

          bg-white

          px-[20px]
          py-[20px]

          shadow-[0_2px_8px_rgba(0,0,0,0.035)]

          min-[1200px]:px-[24px]
          min-[1200px]:py-[22px]
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
            fontFamily:
              "var(--font-satoshi)",

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
            gap-[18px]
          "
        >
          <SummaryRow
            label="Subtotal"
            value={`$${subtotal.toFixed(
              2,
            )}`}
          />

          <SummaryRow
            label={
              appliedCouponCode
                ? `Discount (${appliedCouponCode})`
                : "Discount"
            }
            value={`-$${discount.toFixed(
              2,
            )}`}
            danger
          />

          <SummaryRow
            label="Delivery Fee"
            value={`$${deliveryFee.toFixed(
              2,
            )}`}
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
          value={`$${total.toFixed(
            2,
          )}`}
          total
        />

        {/* =====================================
            COUPON SECTION
        ====================================== */}

        <div className="mt-[22px]">
          {appliedCouponCode ? (
            <div
              className="
                flex
                min-h-[56px]
                w-full
                items-center
                justify-between
                gap-[12px]

                rounded-[12px]

                border
                border-green-200

                bg-green-50

                px-[14px]
                py-[10px]
              "
            >
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
                    h-[30px]
                    w-[30px]
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    bg-green-600

                    text-white
                  "
                >
                  <CheckCircle2 className="size-[16px]" />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      truncate
                      text-[13px]
                      font-semibold
                      text-green-800
                    "
                  >
                    {appliedCouponCode}
                  </p>

                  <p
                    className="
                      mt-[2px]
                      text-[11px]
                      text-green-700
                    "
                  >
                    Coupon applied
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleRemoveCoupon
                }
                disabled={isPending}
                className="
                  h-[34px]
                  shrink-0

                  rounded-[7px]

                  border
                  border-green-300

                  bg-white

                  px-[12px]

                  text-[11px]
                  font-semibold
                  text-green-800

                  disabled:opacity-50
                "
              >
                {isPending
                  ? "Removing..."
                  : "Remove"}
              </button>
            </div>
          ) : (
            <div
              className="
                flex
                w-full
                flex-col
                gap-[10px]

                min-[520px]:flex-row
              "
            >
              {/* INPUT */}

              <div
                className="
                  flex
                  h-[48px]
                  min-w-0
                  flex-1
                  items-center
                  gap-[10px]

                  rounded-[62px]

                  bg-[#F0F0F0]

                  px-[16px]
                "
                style={{
                  border:
                    "1.5px solid rgba(0,0,0,0.20)",
                }}
              >
                <TagIcon />

                <input
                  type="text"
                  value={promoCode}
                  disabled={
                    isPending ||
                    isEmpty
                  }
                  onChange={(event) =>
                    setPromoCode(
                      event.target.value.toUpperCase(),
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                      "Enter"
                    ) {
                      event.preventDefault();

                      handleApplyPromo();
                    }
                  }}
                  placeholder="Add promo code"
                  className="
                    min-w-0
                    flex-1

                    border-0

                    bg-transparent

                    p-0

                    text-[14px]
                    leading-[19px]
                    text-black

                    outline-none

                    placeholder:text-black/40

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  style={{
                    fontFamily:
                      "var(--font-satoshi)",
                  }}
                />
              </div>

              {/* APPLY */}

              <button
                type="button"
                onClick={
                  handleApplyPromo
                }
                disabled={
                  isPending ||
                  isEmpty
                }
                className="
                  flex
                  h-[48px]
                  shrink-0
                  items-center
                  justify-center

                  rounded-[62px]

                  px-[26px]

                  text-[14px]
                  leading-[19px]
                  font-medium
                  text-white

                  transition-opacity

                  hover:opacity-90

                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  min-[520px]:min-w-[112px]
                "
                style={{
                  fontFamily:
                    "var(--font-satoshi)",

                  border:
                    "1.5px solid #000000",

                  backgroundColor:
                    "#000000",

                  color:
                    "#FFFFFF",
                }}
              >
                {isPending
                  ? "Applying..."
                  : "Apply"}
              </button>
            </div>
          )}
        </div>

        {/* =====================================
            CHECKOUT
        ====================================== */}

        <div className="mt-[22px]">
          {isEmpty ? (
            <button
              type="button"
              disabled
              className="
                flex
                h-[54px]
                w-full
                items-center
                justify-center
                gap-[12px]

                rounded-[62px]

                px-[24px]

                text-[16px]
                leading-[22px]
                font-medium
                text-white

                cursor-not-allowed
                opacity-50
              "
              style={{
                fontFamily:
                  "var(--font-satoshi)",

                border:
                  "1.5px solid #000000",

                backgroundColor:
                  "#000000",

                color:
                  "#FFFFFF",
              }}
            >
              <span>
                Go to Checkout
              </span>

              <ArrowRightIcon />
            </button>
          ) : (
            <Link
              href="/checkout"
              className="
                flex
                h-[54px]
                w-full
                items-center
                justify-center
                gap-[12px]

                rounded-[62px]

                px-[24px]

                text-[16px]
                leading-[22px]
                font-medium
                text-white
                no-underline

                transition-opacity

                hover:opacity-90
              "
              style={{
                fontFamily:
                  "var(--font-satoshi)",

                border:
                  "1.5px solid #000000",

                backgroundColor:
                  "#000000",

                color:
                  "#FFFFFF",
              }}
            >
              <span>
                Go to Checkout
              </span>

              <ArrowRightIcon />
            </Link>
          )}
        </div>
      </div>
    </>
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
          fontFamily:
            "var(--font-satoshi)",

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
          fontFamily:
            "var(--font-satoshi)",

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
      className="
        shrink-0
        text-black/40
      "
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