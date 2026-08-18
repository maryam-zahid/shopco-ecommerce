"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  updateProductAction,
} from "@/actions/admin-product.actions";

type ProductData = {
  id: string;

  name: string;
  description: string;

  price: number;

  discountPrice:
    | number
    | null;

  categoryId: string;

  dressStyleId:
    | string
    | null;

  status:
    | "DRAFT"
    | "ACTIVE"
    | "ARCHIVED";

  isFeatured: boolean;
  isNewArrival: boolean;
};

type Props = {
  product: ProductData;

  categories: {
    id: string;
    name: string;
  }[];

  dressStyles: {
    id: string;
    name: string;
  }[];
};

export default function EditProductForm({
  product,
  categories,
  dressStyles,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [message, setMessage] =
    useState<string | null>(null);

  const [isError, setIsError] =
    useState(false);

  function handleSubmit(
    formData: FormData,
  ) {
    startTransition(async () => {
      const discountRaw =
        String(
          formData.get(
            "discountPrice",
          ) ?? "",
        ).trim();

      const result =
        await updateProductAction({
          productId:
            product.id,

          name:
            String(
              formData.get(
                "name",
              ) ?? "",
            ),

          description:
            String(
              formData.get(
                "description",
              ) ?? "",
            ),

          price:
            Number(
              formData.get(
                "price",
              ),
            ),

          discountPrice:
            discountRaw
              ? Number(
                  discountRaw,
                )
              : null,

          categoryId:
            String(
              formData.get(
                "categoryId",
              ) ?? "",
            ),

          dressStyleId:
            String(
              formData.get(
                "dressStyleId",
              ) ?? "",
            ) || null,

          status:
            String(
              formData.get(
                "status",
              ),
            ) as
              | "DRAFT"
              | "ACTIVE"
              | "ARCHIVED",

          isFeatured:
            formData.get(
              "isFeatured",
            ) === "on",

          isNewArrival:
            formData.get(
              "isNewArrival",
            ) === "on",
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
            router.push(
              "/admin/products",
            );

            router.refresh();
          },
          600,
        );
      }
    });
  }

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1180px]
      "
    >
      <form
        action={handleSubmit}
        className="
          w-full
          space-y-[18px]
        "
      >
        {/* =====================================
            TOP ACTIONS
        ====================================== */}

        <div
          className="
            flex
            flex-col
            gap-[14px]

            min-[700px]:flex-row
            min-[700px]:items-center
            min-[700px]:justify-between
          "
        >
          <div>
            <p
              className="
                text-[13px]
                text-black/45
              "
            >
              Products / Edit Product
            </p>

            <h2
              className="
                mt-[4px]

                text-[26px]
                font-semibold
                tracking-[-0.02em]
                text-black
              "
            >
              Edit Product
            </h2>

            <p
              className="
                mt-[4px]

                text-[13px]
                text-black/50
              "
            >
              Update product details and manage storefront visibility.
            </p>
          </div>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-[10px]
            "
          >
            <button
              type="button"
              onClick={() =>
                router.back()
              }
              className="
                inline-flex
                h-[42px]
                min-w-[120px]
                items-center
                justify-center

                rounded-[8px]

                bg-white

                px-[18px]

                text-[13px]
                font-semibold
                text-black

                transition-colors

                hover:bg-black/[0.03]
              "
              style={{
                border:
                  "1.5px solid rgba(0,0,0,0.22)",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="
                inline-flex
                h-[42px]
                min-w-[140px]
                items-center
                justify-center

                rounded-[8px]

                px-[20px]

                text-[13px]
                font-semibold
                text-white

                transition-opacity

                hover:opacity-90

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
              style={{
                border:
                  "1.5px solid #000000",

                backgroundColor:
                  "#000000",

                color:
                  "#FFFFFF",
              }}
            >
              {isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>

        {/* MESSAGE */}

        {message && (
          <div
            className={`
              rounded-[10px]

              border

              px-[14px]
              py-[12px]

              text-[13px]

              ${
                isError
                  ? "border-red-300 bg-red-50 text-red-700"
                  : "border-green-300 bg-green-50 text-green-700"
              }
            `}
          >
            {message}
          </div>
        )}

        {/* =====================================
            BASIC INFORMATION
        ====================================== */}

        <FormCard title="Basic Information">
          <div
            className="
              grid
              grid-cols-1
              gap-x-[22px]
              gap-y-[18px]

              min-[800px]:grid-cols-2
            "
          >
            <Field
              label="Product Name"
              name="name"
              defaultValue={
                product.name
              }
            />

            <Field
              label="SKU"
              name="sku"
              defaultValue=""
              required={false}
              disabled
              placeholder="Managed from variants"
            />

            <SelectField
              label="Category"
              name="categoryId"
              defaultValue={
                product.categoryId
              }
            >
              {categories.map(
                (category) => (
                  <option
                    key={
                      category.id
                    }
                    value={
                      category.id
                    }
                  >
                    {
                      category.name
                    }
                  </option>
                ),
              )}
            </SelectField>

            <SelectField
              label="Dress Style"
              name="dressStyleId"
              defaultValue={
                product.dressStyleId ??
                ""
              }
            >
              <option value="">
                None
              </option>

              {dressStyles.map(
                (style) => (
                  <option
                    key={style.id}
                    value={style.id}
                  >
                    {style.name}
                  </option>
                ),
              )}
            </SelectField>

            <div className="min-[800px]:col-span-2">
              <label className="block">
                <Label>
                  Description
                </Label>

                <textarea
                  name="description"
                  defaultValue={
                    product.description
                  }
                  required
                  rows={4}
                  className="
                    w-full
                    resize-y

                    rounded-[8px]

                    bg-white

                    px-[13px]
                    py-[11px]

                    text-[13px]
                    leading-[20px]
                    text-black

                    outline-none

                    transition-colors

                    placeholder:text-black/35

                    focus:border-black
                    focus:ring-1
                    focus:ring-black/10
                  "
                  style={{
                    border:
                      "1.5px solid rgba(0,0,0,0.24)",
                  }}
                />
              </label>
            </div>
          </div>
        </FormCard>

        {/* =====================================
            PRICING
        ====================================== */}

        <FormCard title="Pricing">
          <div
            className="
              grid
              grid-cols-1
              gap-x-[22px]
              gap-y-[18px]

              min-[800px]:grid-cols-2
            "
          >
            <Field
              label="Price ($)"
              name="price"
              type="number"
              step="0.01"
              defaultValue={String(
                product.price,
              )}
            />

            <Field
              label="Discount Price ($)"
              name="discountPrice"
              type="number"
              step="0.01"
              required={false}
              defaultValue={
                product.discountPrice !==
                null
                  ? String(
                      product.discountPrice,
                    )
                  : ""
              }
            />
          </div>
        </FormCard>

        {/* =====================================
            STATUS / VISIBILITY
        ====================================== */}

        <FormCard title="Status & Visibility">
          <div
            className="
              grid
              grid-cols-1
              gap-x-[22px]
              gap-y-[18px]

              min-[800px]:grid-cols-2
            "
          >
            <SelectField
              label="Product Status"
              name="status"
              defaultValue={
                product.status
              }
            >
              <option value="DRAFT">
                Draft
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="ARCHIVED">
                Archived
              </option>
            </SelectField>

            <div
              className="
                rounded-[10px]

                bg-[#FAFAFA]

                p-[14px]
              "
              style={{
                border:
                  "1.5px solid rgba(0,0,0,0.14)",
              }}
            >
              <p
                className="
                  text-[12px]
                  font-semibold
                  text-black
                "
              >
                Storefront Visibility
              </p>

              <div
                className="
                  mt-[12px]
                  space-y-[12px]
                "
              >
                <Checkbox
                  name="isFeatured"
                  defaultChecked={
                    product.isFeatured
                  }
                  label="Featured Product"
                />

                <Checkbox
                  name="isNewArrival"
                  defaultChecked={
                    product.isNewArrival
                  }
                  label="New Arrival"
                />
              </div>
            </div>
          </div>
        </FormCard>

        {/* =====================================
            BOTTOM ACTIONS
        ====================================== */}

        <div
          className="
            flex
            justify-end
            gap-[10px]

            pb-[6px]
            pt-[4px]
          "
        >
          <button
            type="button"
            onClick={() =>
              router.back()
            }
            className="
              inline-flex
              h-[42px]
              min-w-[120px]
              items-center
              justify-center

              rounded-[8px]

              bg-white

              px-[18px]

              text-[13px]
              font-semibold
              text-black
            "
            style={{
              border:
                "1.5px solid rgba(0,0,0,0.22)",
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="
              inline-flex
              h-[42px]
              min-w-[140px]
              items-center
              justify-center

              rounded-[8px]

              px-[20px]

              text-[13px]
              font-semibold
              text-white

              disabled:opacity-50
            "
            style={{
              border:
                "1.5px solid #000000",

              backgroundColor:
                "#000000",

              color:
                "#FFFFFF",
            }}
          >
            {isPending
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        w-full

        rounded-[14px]

        bg-white

        p-[20px]

        shadow-[0_1px_4px_rgba(0,0,0,0.035)]

        min-[800px]:p-[24px]
      "
      style={{
        border:
          "1.5px solid rgba(0,0,0,0.12)",
      }}
    >
      <h3
        className="
          mb-[20px]

          text-[17px]
          font-semibold
          text-black
        "
      >
        {title}
      </h3>

      {children}
    </section>
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
        mb-[7px]
        block

        text-[12px]
        font-semibold
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
  defaultValue,
  placeholder,
  type = "text",
  step,
  required = true,
  disabled = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  step?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <Label>
        {label}
      </Label>

      <input
        type={type}
        step={step}
        name={name}
        defaultValue={
          defaultValue
        }
        placeholder={
          placeholder
        }
        required={required}
        disabled={disabled}
        className="
          h-[46px]
          w-full

          rounded-[8px]

          bg-white

          px-[13px]

          text-[13px]
          text-black

          outline-none

          transition-colors

          placeholder:text-black/35

          focus:border-black
          focus:ring-1
          focus:ring-black/10

          disabled:cursor-not-allowed
          disabled:bg-black/[0.035]
          disabled:text-black/45
        "
        style={{
          border:
            "1.5px solid rgba(0,0,0,0.24)",
        }}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  children,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  children:
    React.ReactNode;
}) {
  return (
    <label className="block">
      <Label>
        {label}
      </Label>

      <select
        name={name}
        defaultValue={
          defaultValue
        }
        className="
          h-[46px]
          w-full

          rounded-[8px]

          bg-white

          px-[13px]

          text-[13px]
          text-black

          outline-none

          transition-colors

          focus:border-black
          focus:ring-1
          focus:ring-black/10
        "
        style={{
          border:
            "1.5px solid rgba(0,0,0,0.24)",
        }}
      >
        {children}
      </select>
    </label>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label
      className="
        flex
        cursor-pointer
        items-center
        gap-[10px]

        text-[13px]
        font-medium
        text-black
      "
    >
      <input
        name={name}
        type="checkbox"
        defaultChecked={
          defaultChecked
        }
        className="
          h-[17px]
          w-[17px]

          cursor-pointer

          accent-black
        "
      />

      {label}
    </label>
  );
}