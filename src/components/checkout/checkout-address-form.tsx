"use client";

import {
  CheckCircle2,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
  useTransition,
} from "react";

import { createAddressAction } from "@/actions/address.actions";

type CheckoutAddressFormProps = {
  customerName: string;
};

export default function CheckoutAddressForm({
  customerName,
}: CheckoutAddressFormProps) {
  const [isPending, startTransition] =
    useTransition();

  const [message, setMessage] =
    useState<string | null>(null);

  const [isError, setIsError] =
    useState(false);

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

  function handleSubmit(
    formData: FormData,
  ) {
    startTransition(async () => {
      setMessage(null);
      setIsError(false);

      const result =
        await createAddressAction({
          fullName: String(
            formData.get("fullName") ?? "",
          ),

          phone: String(
            formData.get("phone") ?? "",
          ),

          addressLine1: String(
            formData.get("addressLine1") ?? "",
          ),

          addressLine2: String(
            formData.get("addressLine2") ?? "",
          ),

          city: String(
            formData.get("city") ?? "",
          ),

          state: String(
            formData.get("state") ?? "",
          ),

          postalCode: String(
            formData.get("postalCode") ?? "",
          ),

          country: String(
            formData.get("country") ?? "",
          ),

          isDefault:
            formData.get("isDefault") === "on",
        });

      setIsError(!result.success);
      setMessage(result.message);

      if (result.success) {
        window.setTimeout(() => {
          window.location.reload();
        }, 700);
      }
    });
  }

  return (
    <>
      {/* TOAST */}
      {message && (
        <div
          className="
            fixed
            right-[24px]
            top-[100px]
            z-[9999]

            w-[calc(100%_-_32px)]
            max-w-[390px]

            overflow-hidden
            rounded-[12px]

            border
            border-black/10
            bg-white

            shadow-[0_12px_40px_rgba(0,0,0,0.16)]

            max-[799px]:left-[16px]
            max-[799px]:right-[16px]
          "
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
                  ? "Address not saved"
                  : "Address saved"}
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

      <form action={handleSubmit}>
        <h3
          className="
            text-[17px]
            font-bold
            uppercase
            text-black
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
          }}
        >
          Add New Shipping Address
        </h3>

        <div
          className="
            mt-[18px]

            grid
            grid-cols-1

            gap-x-[22px]
            gap-y-[16px]

            min-[800px]:grid-cols-2
          "
        >
          <Field
            label="Full Name"
            name="fullName"
            defaultValue={customerName}
            placeholder="Enter your full name"
            required
          />

          <Field
            label="Phone Number"
            name="phone"
            placeholder="Enter your phone number"
            required
          />

          <div className="min-[800px]:col-span-2">
            <Field
              label="Address Line 1"
              name="addressLine1"
              placeholder="House no., Street, Area"
              required
            />
          </div>

          <div className="min-[800px]:col-span-2">
            <Field
              label="Address Line 2 (Optional)"
              name="addressLine2"
              placeholder="Apartment, suite, unit, landmark"
            />
          </div>

          <Field
            label="City"
            name="city"
            placeholder="Enter city"
            required
          />

          <Field
            label="State / Province (Optional)"
            name="state"
            placeholder="Enter state or province"
          />

          <Field
            label="Postal Code"
            name="postalCode"
            placeholder="Enter postal code"
            required
          />

          {/* COUNTRY */}
          <label className="block">
            <span
              className="
                mb-[7px]
                block

                text-[13px]
                font-medium
                text-black
              "
              style={{
                fontFamily:
                  "var(--font-satoshi)",
              }}
            >
              Country{" "}
              <span className="text-[#FF3333]">
                *
              </span>
            </span>

            <select
              name="country"
              defaultValue="Pakistan"
              required
              className="
                h-[48px]
                w-full

                rounded-[8px]

                bg-white

                px-[14px]

                text-[14px]
                text-black

                outline-none

                transition-all
                duration-150

                focus:ring-[3px]
                focus:ring-black/[0.06]
              "
              style={{
                fontFamily:
                  "var(--font-satoshi)",

                border:
                  "1.5px solid rgba(0, 0, 0, 0.22)",

                boxShadow:
                  "0 1px 2px rgba(0, 0, 0, 0.025)",
              }}
              onFocus={(event) => {
                event.currentTarget.style.borderColor =
                  "#000000";
              }}
              onBlur={(event) => {
                event.currentTarget.style.borderColor =
                  "rgba(0, 0, 0, 0.22)";
              }}
            >
              <option value="Pakistan">
                Pakistan
              </option>

              <option value="United Arab Emirates">
                United Arab Emirates
              </option>

              <option value="United Kingdom">
                United Kingdom
              </option>

              <option value="United States">
                United States
              </option>
            </select>
          </label>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-[20px]

            flex
            flex-col
            gap-[14px]

            min-[600px]:flex-row
            min-[600px]:items-center
            min-[600px]:justify-between
          "
        >
          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-[8px]

              text-[13px]
              text-black
            "
            style={{
              fontFamily:
                "var(--font-satoshi)",
            }}
          >
            <input
              type="checkbox"
              name="isDefault"
              className="
                h-[16px]
                w-[16px]
                accent-black
              "
            />

            Save as default address
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="
              flex
              h-[44px]
              items-center
              justify-center

              rounded-[8px]

              px-[22px]

              text-[13px]
              font-semibold
              text-white

              transition-all

              hover:opacity-90

              disabled:cursor-not-allowed
              disabled:opacity-50

              max-[599px]:w-full
            "
            style={{
              fontFamily:
                "var(--font-satoshi)",

              backgroundColor: "#000000",

              color: "#FFFFFF",

              border:
                "1.5px solid #000000",
            }}
          >
            {isPending
              ? "Saving..."
              : "Save Address"}
          </button>
        </div>
      </form>
    </>
  );
}

function Field({
  label,
  name,
  placeholder,
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block w-full">
      <span
        className="
          mb-[7px]
          block

          text-[13px]
          font-medium
          text-black
        "
        style={{
          fontFamily:
            "var(--font-satoshi)",
        }}
      >
        {label}

        {required && (
          <span className="text-[#FF3333]">
            {" "}*
          </span>
        )}
      </span>

      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="
          h-[48px]
          w-full

          rounded-[8px]

          bg-white

          px-[14px]

          text-[14px]
          text-black

          outline-none

          placeholder:text-black/35

          transition-all
          duration-150

          focus:ring-[3px]
          focus:ring-black/[0.06]
        "
        style={{
          fontFamily:
            "var(--font-satoshi)",

          border:
            "1.5px solid rgba(0, 0, 0, 0.22)",

          boxShadow:
            "0 1px 2px rgba(0, 0, 0, 0.025)",
        }}
        onFocus={(event) => {
          event.currentTarget.style.borderColor =
            "#000000";
        }}
        onBlur={(event) => {
          event.currentTarget.style.borderColor =
            "rgba(0, 0, 0, 0.22)";
        }}
      />
    </label>
  );
}