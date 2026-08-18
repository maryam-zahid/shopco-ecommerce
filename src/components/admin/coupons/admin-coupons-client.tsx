"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  createCouponAction,
  toggleCouponAction,
} from "@/actions/admin-coupon.actions";

type CouponRow = {
  id: string;
  code: string;

  discountType:
    | "PERCENTAGE"
    | "FIXED";

  discountValue: number;

  isActive: boolean;

  startsAt:
    | string
    | null;

  expiresAt:
    | string
    | null;

  minimumOrderAmount:
    | number
    | null;

  usageLimit:
    | number
    | null;

  usedCount: number;
};

type Props = {
  initialCoupons: CouponRow[];
};

export default function AdminCouponsClient({
  initialCoupons,
}: Props) {
  const [coupons, setCoupons] =
    useState(initialCoupons);

  const [message, setMessage] =
    useState<string | null>(null);

  const [isError, setIsError] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  function handleCreate(
    formData: FormData,
  ) {
    startTransition(async () => {
      const minimumRaw =
        String(
          formData.get(
            "minimumOrderAmount",
          ) ?? "",
        ).trim();

      const usageRaw =
        String(
          formData.get(
            "usageLimit",
          ) ?? "",
        ).trim();

      const startsRaw =
        String(
          formData.get(
            "startsAt",
          ) ?? "",
        ).trim();

      const expiresRaw =
        String(
          formData.get(
            "expiresAt",
          ) ?? "",
        ).trim();

      const result =
        await createCouponAction({
          code:
            String(
              formData.get(
                "code",
              ) ?? "",
            ),

          discountType:
            String(
              formData.get(
                "discountType",
              ),
            ) as
              | "PERCENTAGE"
              | "FIXED",

          discountValue:
            Number(
              formData.get(
                "discountValue",
              ),
            ),

          minimumOrderAmount:
            minimumRaw
              ? Number(
                  minimumRaw,
                )
              : null,

          usageLimit:
            usageRaw
              ? Number(
                  usageRaw,
                )
              : null,

          startsAt:
            startsRaw ||
            null,

          expiresAt:
            expiresRaw ||
            null,
        });

      setIsError(
        !result.success,
      );

      setMessage(
        result.message,
      );

      if (result.success) {
        window.setTimeout(
          () => {
            window.location.reload();
          },
          500,
        );
      }
    });
  }

  function handleToggle(
    coupon: CouponRow,
  ) {
    startTransition(async () => {
      const result =
        await toggleCouponAction({
          couponId:
            coupon.id,

          isActive:
            !coupon.isActive,
        });

      setIsError(
        !result.success,
      );

      setMessage(
        result.message,
      );

      if (!result.success) {
        return;
      }

      setCoupons((current) =>
        current.map((item) =>
          item.id === coupon.id
            ? {
                ...item,
                isActive:
                  !item.isActive,
              }
            : item,
        ),
      );
    });
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-[18px]

        min-[1150px]:grid-cols-[390px_1fr]
      "
    >
      {/* CREATE */}

      <form
        action={handleCreate}
        className="
          rounded-[14px]

          border
          border-black/10

          bg-white

          p-[20px]
        "
      >
        <h2
          className="
            text-[18px]
            font-semibold
            text-black
          "
        >
          Create Coupon
        </h2>

        {message && (
          <div
            className={`
              mt-[14px]

              rounded-[8px]

              border

              px-[12px]
              py-[10px]

              text-[12px]

              ${
                isError
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-green-200 bg-green-50 text-green-700"
              }
            `}
          >
            {message}
          </div>
        )}

        <div
          className="
            mt-[16px]
            space-y-[14px]
          "
        >
          <Field
            label="Coupon Code"
            name="code"
            placeholder="SUMMER20"
          />

          <label className="block">
            <Label>
              Discount Type
            </Label>

            <select
              name="discountType"
              defaultValue="PERCENTAGE"
              className="
                h-[42px]
                w-full

                rounded-[8px]

                border
                border-black/20

                bg-white

                px-[12px]

                text-[13px]

                outline-none

                focus:border-black
              "
            >
              <option value="PERCENTAGE">
                Percentage
              </option>

              <option value="FIXED">
                Fixed Amount
              </option>
            </select>
          </label>

          <Field
            label="Discount Value"
            name="discountValue"
            type="number"
            step="0.01"
            placeholder="20"
          />

          <Field
            label="Minimum Order Amount"
            name="minimumOrderAmount"
            type="number"
            step="0.01"
            placeholder="Optional"
            required={false}
          />

          <Field
            label="Usage Limit"
            name="usageLimit"
            type="number"
            placeholder="Optional"
            required={false}
          />

          <Field
            label="Starts At"
            name="startsAt"
            type="datetime-local"
            required={false}
          />

          <Field
            label="Expires At"
            name="expiresAt"
            type="datetime-local"
            required={false}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="
            mt-[18px]

            h-[42px]
            w-full

            rounded-[8px]

            bg-black

            text-[13px]
            font-semibold
            text-white

            disabled:opacity-50
          "
          style={{
            backgroundColor:
              "#000000",

            color:
              "#FFFFFF",
          }}
        >
          {isPending
            ? "Creating..."
            : "Create Coupon"}
        </button>
      </form>

      {/* TABLE */}

      <div
        className="
          overflow-x-auto

          rounded-[14px]

          border
          border-black/10

          bg-white
        "
      >
        <table
          className="
            w-full
            min-w-[900px]
            border-collapse
          "
        >
          <thead className="bg-[#F8F8F8]">
            <tr>
              <Header>
                Code
              </Header>

              <Header>
                Discount
              </Header>

              <Header>
                Minimum
              </Header>

              <Header>
                Usage
              </Header>

              <Header>
                Expires
              </Header>

              <Header>
                Status
              </Header>

              <Header>
                Action
              </Header>
            </tr>
          </thead>

          <tbody>
            {coupons.map(
              (coupon) => (
                <tr
                  key={coupon.id}
                  className="
                    border-t
                    border-black/10
                  "
                >
                  <Cell>
                    <span
                      className="
                        font-semibold
                        text-black
                      "
                    >
                      {coupon.code}
                    </span>
                  </Cell>

                  <Cell>
                    {coupon.discountType ===
                    "PERCENTAGE"
                      ? `${coupon.discountValue}%`
                      : `$${coupon.discountValue.toFixed(
                          2,
                        )}`}
                  </Cell>

                  <Cell>
                    {coupon.minimumOrderAmount !==
                    null
                      ? `$${coupon.minimumOrderAmount.toFixed(
                          2,
                        )}`
                      : "—"}
                  </Cell>

                  <Cell>
                    {coupon.usedCount}

                    {coupon.usageLimit !==
                    null
                      ? ` / ${coupon.usageLimit}`
                      : ""}
                  </Cell>

                  <Cell>
                    {coupon.expiresAt
                      ? new Date(
                          coupon.expiresAt,
                        ).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )
                      : "No expiry"}
                  </Cell>

                  <Cell>
                    <span
                      className={`
                        inline-flex

                        rounded-full

                        px-[10px]
                        py-[5px]

                        text-[10px]
                        font-semibold

                        ${
                          coupon.isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-black/5 text-black/45"
                        }
                      `}
                    >
                      {coupon.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </Cell>

                  <Cell>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        handleToggle(
                          coupon,
                        )
                      }
                      className="
                        h-[34px]

                        rounded-[7px]

                        border
                        border-black/20

                        bg-white

                        px-[12px]

                        text-[11px]
                        font-medium
                        text-black

                        disabled:opacity-50
                      "
                    >
                      {coupon.isActive
                        ? "Disable"
                        : "Enable"}
                    </button>
                  </Cell>
                </tr>
            
            ))}

            {coupons.length ===
              0 && (
              <tr>
                <td
                  colSpan={7}
                  className="
                    px-[20px]
                    py-[60px]

                    text-center

                    text-[13px]
                    text-black/45
                  "
                >
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Label({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <span
      className="
        mb-[6px]
        block

        text-[12px]
        font-medium
        text-black
      "
    >
      {children}
    </span>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  step,
  required = true,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  step?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <Label>
        {label}
      </Label>

      <input
        type={type}
        name={name}
        step={step}
        required={required}
        placeholder={placeholder}
        className="
          h-[42px]
          w-full

          rounded-[8px]

          border
          border-black/20

          bg-white

          px-[12px]

          text-[13px]

          outline-none

          focus:border-black
        "
      />
    </label>
  );
}

function Header({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <th
      className="
        px-[15px]
        py-[12px]

        text-left

        text-[11px]
        font-semibold
        uppercase
        text-black/50
      "
    >
      {children}
    </th>
  );
}

function Cell({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <td
      className="
        px-[15px]
        py-[14px]

        text-[13px]
        text-black/60
      "
    >
      {children}
    </td>
  );
}