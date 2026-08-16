"use client";

import {
  CheckCircle2,
  CreditCard,
  Package,
  Pencil,
  Plus,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
  useTransition,
} from "react";

import {
  placeOrderAction,
  validateCheckoutAction,
} from "@/actions/checkout.actions";
import { useRouter } from "next/navigation";
import CheckoutAddressForm from "@/components/checkout/checkout-address-form";

type AddressOption = {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

type CheckoutOptionsProps = {
  addresses: AddressOption[];
  customerName: string;
};

export default function CheckoutOptions({
  addresses,
  customerName,
}: CheckoutOptionsProps) {
  const defaultAddress =
    addresses.find((address) => address.isDefault) ??
    addresses[0];
    const router = useRouter();

  const [selectedAddressId, setSelectedAddressId] =
    useState(defaultAddress?.id ?? "");

  const [paymentMethod, setPaymentMethod] =
    useState<"COD" | "CARD">("COD");

  const [showAddressForm, setShowAddressForm] =
    useState(addresses.length === 0);

  const [message, setMessage] =
    useState<string | null>(null);

  const [isError, setIsError] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    if (!message) return;

    const timeout = window.setTimeout(() => {
      setMessage(null);
      setIsError(false);
    }, 3000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [message]);

 function handleContinue() {
  if (!selectedAddressId) {
    setIsError(true);
    setMessage(
      "Please select or add a shipping address.",
    );
    return;
  }

  startTransition(async () => {
    setMessage(null);
    setIsError(false);

    if (paymentMethod === "COD") {
      const result =
        await placeOrderAction({
          addressId: selectedAddressId,
          paymentMethod: "COD",
        });

      if (!result.success) {
        setIsError(true);
        setMessage(result.message);
        return;
      }

      setIsError(false);
      setMessage(
        "Your order has been placed successfully.",
      );

      window.setTimeout(() => {
        router.push(
          `/order-success/${result.order.orderNumber}`,
        );
        router.refresh();
      }, 700);

      return;
    }

    const result =
      await validateCheckoutAction({
        addressId: selectedAddressId,
        paymentMethod: "CARD",
      });

    if (!result.success) {
      setIsError(true);
      setMessage(result.message);
      return;
    }

    setIsError(false);
    setMessage(
      "Checkout verified. Ready to continue to secure card payment.",
    );
  });
}

  return (
    <>
      {/* ================================
          TOAST
      ================================= */}
      {message && (
        <div
          className="
            fixed
            right-[24px]
            top-[100px]
            z-[9999]

            w-[calc(100%-32px)]
            max-w-[410px]

            overflow-hidden
            rounded-[12px]

            border
            border-black/10

            bg-white

            shadow-[0_12px_40px_rgba(0,0,0,0.16)]

            max-[799px]:left-[16px]
            max-[799px]:right-[16px]
          "
          style={{
            fontFamily: "var(--font-satoshi)",
          }}
        >
          <div
            className="
              flex
              min-h-[78px]
              items-center
              gap-[12px]

              px-[18px]
              py-[14px]
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

            <div>
              <p className="text-[15px] font-semibold text-black">
                {isError
                  ? "Checkout issue"
                  : "Checkout verified"}
              </p>

              <p className="mt-[2px] text-[13px] leading-[18px] text-black/55">
                {message}
              </p>
            </div>
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

      <div className="space-y-[16px]">
        {/* ================================
            SHIPPING ADDRESS
        ================================= */}
        <section
          className="
            rounded-[14px]

            border-[1.5px]
            border-black/15

            bg-white

            p-[18px]

            shadow-[0_2px_8px_rgba(0,0,0,0.03)]

            min-[800px]:p-[22px]
          "
        >
          <h2
            className="
              text-[17px]
              font-bold
              uppercase
              text-black
            "
            style={{
              fontFamily: "var(--font-satoshi)",
            }}
          >
            Shipping Address
          </h2>

          <p
            className="
              mt-[4px]
              text-[14px]
              text-black/60
            "
            style={{
              fontFamily: "var(--font-satoshi)",
            }}
          >
            Select a saved address or add a new one.
          </p>

          {/* SAVED ADDRESS + ADD NEW */}
          {addresses.length > 0 && (
            <div
              className="
                mt-[20px]

                grid
                grid-cols-1
                gap-[16px]

                min-[800px]:grid-cols-2
              "
            >
              {/* SAVED ADDRESSES */}
              <div className="space-y-[12px]">
                {addresses.map((address) => {
                  const selected =
                    selectedAddressId === address.id;

                  return (
                <button
  key={address.id}
  type="button"
  onClick={() =>
    setSelectedAddressId(address.id)
  }
className="
  relative
  min-h-[188px]
  w-full

  rounded-[10px]

  bg-white

  p-[20px]

  text-left

  transition-all
  duration-150

  hover:bg-[#FCFCFC]
"
  style={{
    border: selected
      ? "1.6px solid rgba(0, 0, 0, 0.58)"
      : "1.3px solid rgba(0, 0, 0, 0.20)",

    boxShadow:
      "0 2px 7px rgba(0, 0, 0, 0.035)",
  }}
>
 {/* TOP ROW */}
<div className="flex items-start gap-[14px]">
  {/* RADIO */}
  <div
    className="
      mt-[2px]

      flex
      h-[20px]
      w-[20px]
      shrink-0
      items-center
      justify-center

      rounded-full
    "
    style={{
      border: selected
        ? "2px solid #000000"
        : "1.5px solid rgba(0,0,0,0.45)",

      backgroundColor: selected
        ? "#000000"
        : "#FFFFFF",
    }}
  >
    {selected && (
      <span
        className="
          h-[7px]
          w-[7px]
          rounded-full
          bg-white
        "
      />
    )}
  </div>

  {/* MAIN CONTENT */}
  <div className="min-w-0 flex-1">
    {/* NAME + DEFAULT */}
    <div
      className="
        flex
        items-start
        justify-between
        gap-[16px]
      "
    >
      <p
        className="
          min-w-0

          text-[15px]
          font-semibold
          leading-[20px]
          text-black
        "
        style={{
          fontFamily:
            "var(--font-satoshi)",
        }}
      >
        {address.fullName}
      </p>

      {address.isDefault && (
        <span
          className="
  flex
  h-[27px]
  shrink-0
  items-center
  justify-center

  rounded-[5px]

  bg-black

  px-[11px]

  text-[11px]
  font-medium
  text-white
"
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
          }}
        >
          Default
        </span>
      )}
    </div>

    {/* ADDRESS */}
    <div
      className="
        mt-[12px]

        pr-[4px]

        text-[13px]
        leading-[20px]
        text-black/70
      "
      style={{
        fontFamily:
          "var(--font-satoshi)",
      }}
    >
      <p>
        {address.addressLine1}
        {address.addressLine2
          ? `, ${address.addressLine2}`
          : ""}
      </p>

      <p>
        {address.city}
        {address.state
          ? `, ${address.state}`
          : ""}{" "}
        {address.postalCode}
      </p>

      <p>{address.country}</p>

      <p className="mt-[2px]">
        {address.phone}
      </p>
    </div>

    {/* EDIT */}
   <div
  className="
    mt-[14px]

    flex
    items-center
    justify-end

    pr-[2px]
    pb-[2px]
  "
>
      <span
  className="
    flex
    items-center
    gap-[7px]

    px-[3px]
    py-[3px]

    text-[13px]
    font-medium
    text-black
  "
  style={{
    fontFamily: "var(--font-satoshi)",
  }}
>
  <Pencil className="size-[15px]" />

  Edit
</span>
    </div>
  </div>
</div>
</button>
                  );
                })}
              </div>

              {/* ADD NEW ADDRESS */}
            <button
  type="button"
  onClick={() =>
    setShowAddressForm(
      (current) => !current,
    )
  }
  className="
    flex
    min-h-[150px]
    w-full
    items-center
    justify-center

    rounded-[10px]

    bg-white

    transition-all
    duration-150

    hover:bg-[#FAFAFA]
  "
  style={{
    border:
      "1.5px dashed rgba(0, 0, 0, 0.24)",
  }}
>
                <div className="text-center">
                  <div
  className="
    mx-auto

    flex
    h-[42px]
    w-[42px]
    items-center
    justify-center

    rounded-full

    bg-white
  "
  style={{
    border:
      "1.5px solid rgba(0, 0, 0, 0.8)",
  }}
>
  <Plus className="size-[21px]" />
</div>

                  <p
                    className="
                      mt-[10px]

                      text-[14px]
                      font-medium
                      text-black
                    "
                  >
                    Add New Address
                  </p>
                </div>
             
              </button>
            </div>
          )}

          {/* OR DIVIDER */}
          {(addresses.length > 0 ||
            showAddressForm) && (
            <div
              className="
                my-[20px]

                flex
                items-center
                gap-[14px]
              "
            >
              <div className="h-px flex-1 bg-black/15" />

              <span
                className="
                  text-[12px]
                  font-medium
                  text-black/55
                "
              >
                OR
              </span>

              <div className="h-px flex-1 bg-black/15" />
            </div>
          )}

          {/* ADDRESS FORM */}
          {(showAddressForm ||
            addresses.length === 0) && (
            <CheckoutAddressForm
              customerName={customerName}
            />
          )}
        </section>

        {/* ================================
            PAYMENT METHOD
        ================================= */}
        <section
          className="
            rounded-[14px]

            border-[1.5px]
            border-black/15

            bg-white

            p-[18px]

            shadow-[0_2px_8px_rgba(0,0,0,0.03)]

            min-[800px]:p-[22px]
          "
        >
          <h2
            className="
              text-[17px]
              font-bold
              uppercase
              text-black
            "
            style={{
              fontFamily: "var(--font-satoshi)",
            }}
          >
            Payment Method
          </h2>

          <p
            className="
              mt-[4px]
              text-[14px]
              text-black/60
            "
          >
            Choose your preferred payment option.
          </p>

          <div
            className="
              mt-[16px]
              space-y-[10px]
            "
          >
            {/* COD */}
            <button
              type="button"
              onClick={() =>
                setPaymentMethod("COD")
              }
              className={`
                flex
                min-h-[66px]
                w-full
                items-center
                gap-[13px]

                rounded-[10px]

                ${
                  paymentMethod === "COD"
                    ? "border-2 border-black"
                    : "border-[1.5px] border-black/20"
                }

                bg-white

                px-[15px]
                py-[11px]

                text-left

                transition-all
                duration-150

                hover:border-black/60
                hover:bg-[#FAFAFA]
              `}
            >
              <RadioSelected
                selected={
                  paymentMethod === "COD"
                }
              />

              <div
                className="
                  flex
                  h-[36px]
                  w-[36px]
                  shrink-0
                  items-center
                  justify-center

                  rounded-[7px]

                  border
                  border-black/15

                  bg-white
                "
              >
                <Package className="size-[20px]" />
              </div>

              <div>
                <p
                  className="
                    text-[14px]
                    font-semibold
                    text-black
                  "
                >
                  Cash on Delivery
                </p>

                <p
                  className="
                    mt-[2px]

                    text-[12px]
                    leading-[17px]
                    text-black/60
                  "
                >
                  Pay when your order arrives at
                  your doorstep.
                </p>
              </div>
            </button>

            {/* CARD */}
            <button
              type="button"
              onClick={() =>
                setPaymentMethod("CARD")
              }
              className={`
                flex
                min-h-[66px]
                w-full
                items-center
                gap-[13px]

                rounded-[10px]

                ${
                  paymentMethod === "CARD"
                    ? "border-2 border-black"
                    : "border-[1.5px] border-black/20"
                }

                bg-white

                px-[15px]
                py-[11px]

                text-left

                transition-all
                duration-150

                hover:border-black/60
                hover:bg-[#FAFAFA]
              `}
            >
              <RadioSelected
                selected={
                  paymentMethod === "CARD"
                }
              />

              <div
                className="
                  flex
                  h-[36px]
                  w-[36px]
                  shrink-0
                  items-center
                  justify-center

                  rounded-[7px]

                  border
                  border-black/15

                  bg-white
                "
              >
                <CreditCard className="size-[20px]" />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[14px]
                    font-semibold
                    text-black
                  "
                >
                  Card / Stripe
                </p>

                <p
                  className="
                    mt-[2px]

                    text-[12px]
                    leading-[17px]
                    text-black/60
                  "
                >
                  Pay securely using your
                  debit/credit card via Stripe.
                </p>
              </div>

              {/* PAYMENT LOGOS */}
              <div
                className="
                  hidden
                  items-center
                  gap-[8px]

                  min-[600px]:flex
                "
              >
                <span
                  className="
                    text-[13px]
                    font-bold
                    text-[#1434CB]
                  "
                >
                  VISA
                </span>

                <div className="flex">
                  <span
                    className="
                      text-[17px]
                      text-[#EB001B]
                    "
                  >
                    ●
                  </span>

                  <span
                    className="
                      -ml-[6px]
                      text-[17px]
                      text-[#F79E1B]
                    "
                  >
                    ●
                  </span>
                </div>

                <span
                  className="
                    rounded-[3px]
                    bg-[#016FD0]

                    px-[5px]
                    py-[3px]

                    text-[8px]
                    font-bold
                    text-white
                  "
                >
                  AMEX
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* ================================
            FINAL BUTTON
        ================================= */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={isPending}
          className="
            flex
            h-[56px]
            w-full
            items-center
            justify-center

            rounded-[8px]

            border
            border-black

            bg-black

            text-[15px]
            font-semibold
            uppercase
            text-white

            transition-all
            duration-150

            hover:bg-[#1A1A1A]

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            borderColor: "#000000",
            fontFamily: "var(--font-satoshi)",
          }}
        >
          {isPending
            ? "Checking..."
            : paymentMethod === "COD"
              ? "Place Order"
              : "Continue to Payment"}
        </button>
      </div>
    </>
  );
}

function RadioSelected({
  selected,
}: {
  selected: boolean;
}) {
  return (
    <div
      className={`
        flex
        h-[20px]
        w-[20px]
        shrink-0
        items-center
        justify-center

        rounded-full

        ${
          selected
            ? "border-2 border-black bg-black"
            : "border-[1.5px] border-black/35 bg-white"
        }
      `}
    >
      {selected && (
        <div
          className="
            h-[7px]
            w-[7px]
            rounded-full
            bg-white
          "
        />
      )}
    </div>
  );
}