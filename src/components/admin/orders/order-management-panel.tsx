"use client";

import {
  CheckCircle2,
  CreditCard,
  PackageCheck,
} from "lucide-react";

import {
  useState,
  useTransition,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  updateOrderStatusAction,
  markCodOrderPaidAction,
} from "@/actions/admin-order.actions";

type DeliveryStatus =
  | "PROCESSING"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

type Props = {
  orderId: string;

currentStatus:
  | "PENDING"
  | "CONFIRMED"
  | DeliveryStatus
  | "CANCELLED";

  paymentMethod:
    | "COD"
    | "CARD";

  paymentStatus:
    | "UNPAID"
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "EXPIRED"
    | "REFUNDED";
};

export default function OrderManagementPanel({
  orderId,
  currentStatus,
  paymentMethod,
  paymentStatus,
}: Props) {
  const router = useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [deliveryStatus, setDeliveryStatus] =
    useState<DeliveryStatus>(
      normalizeDeliveryStatus(
        currentStatus,
      ),
    );

  const [message, setMessage] =
    useState<string | null>(
      null,
    );

  const [isError, setIsError] =
    useState(false);

  function updateDeliveryStatus() {
    setMessage(null);
    setIsError(false);

    startTransition(
      async () => {
        const result =
          await updateOrderStatusAction(
            {
              orderId,
              status:
                deliveryStatus,
            },
          );

        setIsError(
          !result.success,
        );

        setMessage(
          result.message,
        );

        if (result.success) {
          router.refresh();
        }
      },
    );
  }

  function markCodPaid() {
    const confirmed =
      window.confirm(
        "Confirm that payment for this Cash on Delivery order has been received?",
      );

    if (!confirmed) {
      return;
    }

    setMessage(null);
    setIsError(false);

    startTransition(
      async () => {
        const result =
          await markCodOrderPaidAction({
            orderId,
          });

        setIsError(
          !result.success,
        );

        setMessage(
          result.message,
        );

        if (result.success) {
          router.refresh();
        }
      },
    );
  }

  return (
    <section
      id="order-management"
      className="
        mt-[18px]

        rounded-[14px]

        bg-white

        px-[22px]
        py-[22px]
      "
      style={{
        border:
          "1px solid #E1E1E5",

        fontFamily:
          "var(--font-satoshi)",
      }}
    >
      <div
        className="
          flex
          flex-col
          gap-[6px]
        "
      >
        <h2
          className="
            text-[18px]
            font-semibold
            text-black
          "
        >
          Order Management
        </h2>

        <p
          className="
            text-[12px]
            text-black/50
          "
        >
          Update delivery and eligible payment status.
        </p>
      </div>

      <div
        className="
          mt-[20px]

          grid
          grid-cols-1
          gap-[16px]

          min-[900px]:
          grid-cols-2
        "
      >
        {/* DELIVERY STATUS */}

        <div
          className="
            rounded-[10px]

            bg-[#FAFAFA]

            p-[16px]
          "
          style={{
            border:
              "1px solid #E4E4E7",
          }}
        >
          <div
            className="
              flex
              items-center
              gap-[8px]
            "
          >
            <PackageCheck
              className="
                size-[17px]
                text-black
              "
            />

            <h3
              className="
                text-[14px]
                font-semibold
                text-black
              "
            >
              Delivery Status
            </h3>
          </div>

          <div
            className="
              mt-[14px]

              flex
              flex-col
              gap-[9px]

              min-[600px]:
              flex-row
            "
          >
            <select
              value={
                deliveryStatus
              }
              disabled={
                currentStatus ===
                  "CANCELLED" ||
                isPending
              }
              onChange={(
                event,
              ) =>
                setDeliveryStatus(
                  event.target
                    .value as DeliveryStatus,
                )
              }
              className="
                h-[44px]
                min-w-0
                flex-1

                rounded-[8px]

                bg-white

                px-[13px]

                text-[13px]
                font-medium
                text-black

                outline-none

                disabled:
                cursor-not-allowed

                disabled:
                opacity-50
              "
              style={{
                border:
                  "1.5px solid #D5D5D9",
              }}
            >
            
              <option value="PROCESSING">
                Processing
              </option>

              <option value="SHIPPED">
                Shipped
              </option>

              <option value="OUT_FOR_DELIVERY">
                Out for Delivery
              </option>

              <option value="DELIVERED">
                Delivered
              </option>
            </select>

            <button
              type="button"
              disabled={
                isPending ||
                currentStatus ===
                  "CANCELLED"
              }
              onClick={
                updateDeliveryStatus
              }
              className="
                inline-flex
                h-[44px]
                shrink-0
                items-center
                justify-center
                gap-[7px]

                rounded-[8px]

                px-[18px]

                text-[13px]
                font-semibold

                whitespace-nowrap

                disabled:
                cursor-not-allowed

                disabled:
                opacity-50
              "
              style={{
                backgroundColor:
                  "#000000",

                border:
                  "1px solid #000000",

                color:
                  "#FFFFFF",
              }}
            >
              <CheckCircle2
                className="size-[16px]"
                style={{
                  color:
                    "#FFFFFF",
                }}
              />

              <span
                style={{
                  color:
                    "#FFFFFF",
                }}
              >
                {isPending
                  ? "Updating..."
                  : "Apply Status"}
              </span>
            </button>
          </div>

          {currentStatus ===
            "CANCELLED" && (
            <p
              className="
                mt-[9px]

                text-[11px]
                text-red-600
              "
            >
              This order is cancelled and its delivery status can no longer be changed.
            </p>
          )}
        </div>

        {/* PAYMENT STATUS */}

        <div
          className="
            rounded-[10px]

            bg-[#FAFAFA]

            p-[16px]
          "
          style={{
            border:
              "1px solid #E4E4E7",
          }}
        >
          <div
            className="
              flex
              items-center
              gap-[8px]
            "
          >
            <CreditCard
              className="
                size-[17px]
                text-black
              "
            />

            <h3
              className="
                text-[14px]
                font-semibold
                text-black
              "
            >
              Payment Status
            </h3>
          </div>

          <div
            className="
              mt-[14px]

              flex
              items-center
              justify-between
              gap-[12px]
            "
          >
            <div>
              <p
                className="
                  text-[13px]
                  font-medium
                  text-black
                "
              >
                {paymentStatus}
              </p>

              <p
                className="
                  mt-[3px]

                  text-[11px]
                  text-black/45
                "
              >
                {paymentMethod ===
                "CARD"
                  ? "Card payment is controlled by Stripe."
                  : "Cash on Delivery payment can be confirmed manually."}
              </p>
            </div>

            {paymentMethod ===
              "COD" &&
              paymentStatus !==
                "PAID" && (
                <button
                  type="button"
                  disabled={
                    isPending
                  }
                  onClick={
                    markCodPaid
                  }
                  className="
                    inline-flex
                    h-[44px]
                    shrink-0
                    items-center
                    justify-center

                    rounded-[8px]

                    px-[18px]

                    text-[13px]
                    font-semibold

                    whitespace-nowrap

                    disabled:
                    cursor-not-allowed

                    disabled:
                    opacity-50
                  "
                  style={{
                    backgroundColor:
                      "#000000",

                    border:
                      "1px solid #000000",

                    color:
                      "#FFFFFF",
                  }}
                >
                  <span
                    style={{
                      color:
                        "#FFFFFF",
                    }}
                  >
                    Mark Paid
                  </span>
                </button>
              )}

            {paymentMethod ===
              "CARD" && (
              <span
                className="
                  rounded-full

                  px-[10px]
                  py-[5px]

                  text-[11px]
                  font-medium
                  text-black/55
                "
                style={{
                  backgroundColor:
                    "#EEEEF0",

                  border:
                    "1px solid #DDDDDF",
                }}
              >
                Stripe managed
              </span>
            )}
          </div>
        </div>
      </div>

      {message && (
        <div
          className="
            mt-[14px]

            rounded-[8px]

            px-[12px]
            py-[10px]

            text-[12px]
          "
          style={{
            backgroundColor:
              isError
                ? "#FEF2F2"
                : "#F0FDF4",

            border: isError
              ? "1px solid #FECACA"
              : "1px solid #BBF7D0",

            color: isError
              ? "#B91C1C"
              : "#15803D",
          }}
        >
          {message}
        </div>
      )}
    </section>
  );
}

function normalizeDeliveryStatus(
  status:
    | "PENDING"
    | "CONFIRMED"
    | DeliveryStatus
    | "CANCELLED",
): DeliveryStatus {
  if (
    status === "PENDING" ||
    status === "CONFIRMED" ||
    status === "CANCELLED"
  ) {
    return "PROCESSING";
  }

  return status;
}