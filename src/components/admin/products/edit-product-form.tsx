"use client";

import {
  useState,
  useTransition,
} from "react";
import {
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import {
  useRouter,
} from "next/navigation";

import {
  createProductVariantAction,
  deleteProductVariantAction,
  updateProductAction,
  updateProductVariantAction,
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
  images: string[];

variants: {
  id: string;

  sku: string;

  colorName: string;

  colorValue:
    | string
    | null;

  size: string;

  stock: number;

  priceOverride:
    | number
    | null;

  isActive: boolean;
}[];
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

    const [variants, setVariants] =
  useState(product.variants);

const [newVariantOpen, setNewVariantOpen] =
  useState(false);

const [newColorValue, setNewColorValue] =
  useState("#000000");

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
<FormCard title="Variants & Inventory">
  <div className="space-y-[14px]">
    {variants.map((variant) => (
      <VariantEditor
        key={variant.id}
        variant={variant}
        onUpdated={(updated) => {
          setVariants((current) =>
            current.map((item) =>
              item.id === updated.id
                ? updated
                : item,
            ),
          );
        }}
        onDeleted={(variantId) => {
          setVariants((current) =>
            current.filter(
              (item) =>
                item.id !== variantId,
            ),
          );
        }}
        setMessage={setMessage}
        setIsError={setIsError}
      />
    ))}

    {variants.length === 0 && (
      <div
        className="
          rounded-[10px]
          bg-[#FAFAFA]
          px-[16px]
          py-[22px]
          text-center
          text-[13px]
          text-black/45
        "
        style={{
          border:
            "1.5px solid rgba(0,0,0,0.14)",
        }}
      >
        No variants added yet.
      </div>
    )}

    <div className="pt-[4px]">
     <button
  type="button"
  onClick={() =>
    setNewVariantOpen(
      (current) => !current,
    )
  }
  className="
    flex
    min-h-[64px]
    w-full

    items-center
    justify-start
    gap-[9px]

    rounded-[10px]

    border
    border-dashed
    border-black/20

    bg-white

    px-[18px]

    text-left
    text-[14px]
    font-semibold
    text-black

    transition-all
    duration-150

    hover:border-black/35
    hover:bg-[#FAFAFA]

    active:bg-[#F5F5F5]
  "
>
  <Plus
    className="
      h-[18px]
      w-[18px]
      shrink-0
    "
    strokeWidth={1.8}
  />

  <span>
    Add Variant
  </span>
</button>
    </div>

    {newVariantOpen && (
      <div
        className="
          rounded-[12px]
          bg-[#FAFAFA]
          p-[16px]

          min-[800px]:p-[18px]
        "
        style={{
          border:
            "1.5px solid rgba(0,0,0,0.14)",
        }}
      >
        <div
          className="
            grid
            grid-cols-1
            gap-[16px]

            min-[800px]:grid-cols-2
          "
        >
          <label className="block">
            <Label>
              SKU
            </Label>

            <input
              id="new-variant-sku"
              className={inputClassName}
              style={inputStyle}
              placeholder="SKU-001-BLK-M"
            />
          </label>

         
          <label className="block">
            <Label>
              Color Name
            </Label>

            <input
              id="new-variant-color-name"
              className={inputClassName}
              style={inputStyle}
              placeholder="Black"
            />
          </label>

          <div>
            <Label>
              Color
            </Label>

            <div
              className="
                flex
                h-[46px]
                items-center
                gap-[12px]

                rounded-[8px]

                bg-white

                px-[10px]
              "
              style={inputStyle}
            >
              <div
                className="
                  h-[28px]
                  w-[28px]
                  shrink-0
                  rounded-[6px]

                  border
                  border-black/15
                "
                style={{
                  backgroundColor:
                    newColorValue,
                }}
              />

              <input
  type="color"
  value={newColorValue}
  onChange={(event) => {
    const hex =
      event.target.value;

    setNewColorValue(hex);

    const colorName =
      getClosestColorName(
        hex,
      );

    const colorNameInput =
      document.getElementById(
        "new-variant-color-name",
      ) as HTMLInputElement | null;

    if (colorNameInput) {
      colorNameInput.value =
        colorName;
    }
  }}
  className="
    h-[30px]
    w-[42px]
    cursor-pointer
    border-0
    bg-transparent
    p-0
  "
/>
              <span
                className="
                  text-[12px]
                  font-medium
                  uppercase
                  text-black/55
                "
              >
                {newColorValue}
              </span>
            </div>
          </div>


          <label className="block">
            <Label>
              Size
            </Label>

            <input
              id="new-variant-size"
              className={inputClassName}
              style={inputStyle}
              placeholder="M"
            />
          </label>

          <label className="block">
            <Label>
              Stock
            </Label>

            <input
              id="new-variant-stock"
              type="number"
              min="0"
              step="1"
              defaultValue="0"
              className={inputClassName}
              style={inputStyle}
            />
          </label>

          <label className="block">
            <Label>
              Price Override ($)
            </Label>

            <input
              id="new-variant-price"
              type="number"
              min="0"
              step="0.01"
              className={inputClassName}
              style={inputStyle}
              placeholder="Optional"
            />
          </label>
        </div>

        <div
          className="
            mt-[16px]
            flex
            justify-end
            gap-[10px]
          "
        >
          <button
            type="button"
            onClick={() =>
              setNewVariantOpen(false)
            }
            className="
              inline-flex
              h-[40px]
              items-center
              justify-center

              rounded-[8px]

              bg-white

              px-[16px]

              text-[12px]
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
            type="button"
            disabled={isPending}
            onClick={() => {
              const sku =
                (
                  document.getElementById(
                    "new-variant-sku",
                  ) as HTMLInputElement | null
                )?.value ?? "";

              const colorName =
                (
                  document.getElementById(
                    "new-variant-color-name",
                  ) as HTMLInputElement | null
                )?.value ?? "";

              const size =
                (
                  document.getElementById(
                    "new-variant-size",
                  ) as HTMLInputElement | null
                )?.value ?? "";

              const stock =
                Number(
                  (
                    document.getElementById(
                      "new-variant-stock",
                    ) as HTMLInputElement | null
                  )?.value ?? 0,
                );

              const priceRaw =
                (
                  document.getElementById(
                    "new-variant-price",
                  ) as HTMLInputElement | null
                )?.value ?? "";

              startTransition(async () => {
                const result =
                  await createProductVariantAction({
                    productId:
                      product.id,

                    sku,

                    colorName,

                    colorValue:
                      newColorValue,

                    size,

                    stock,

                    priceOverride:
                      priceRaw
                        ? Number(
                            priceRaw,
                          )
                        : null,
                  });

                setIsError(
                  !result.success,
                );

                setMessage(
                  result.message,
                );

                if (
                  result.success
                ) {
                  setNewVariantOpen(
                    false,
                  );

                  router.refresh();
                }
              });
            }}
            className="
              inline-flex
              h-[40px]
              items-center
              justify-center

              rounded-[8px]

              bg-black

              px-[18px]

              text-[12px]
              font-semibold
              text-white

              disabled:opacity-50
            "
          >
            Add Variant
          </button>
        </div>
      </div>
    )}
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
const inputClassName = `
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
`;

const inputStyle = {
  border:
    "1.5px solid rgba(0,0,0,0.24)",
};
const COLOR_NAMES = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#808080" },
  { name: "Silver", hex: "#C0C0C0" },

  { name: "Red", hex: "#FF0000" },
  { name: "Maroon", hex: "#800000" },
  { name: "Burgundy", hex: "#800020" },

  { name: "Orange", hex: "#FFA500" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Gold", hex: "#FFD700" },

  { name: "Green", hex: "#008000" },
  { name: "Olive", hex: "#808000" },
  { name: "Lime", hex: "#00FF00" },
  { name: "Teal", hex: "#008080" },

  { name: "Blue", hex: "#0000FF" },
  { name: "Navy", hex: "#000080" },
  { name: "Sky Blue", hex: "#87CEEB" },

  { name: "Purple", hex: "#800080" },
  { name: "Violet", hex: "#8F00FF" },

  { name: "Pink", hex: "#FFC0CB" },
  { name: "Hot Pink", hex: "#FF69B4" },

  { name: "Brown", hex: "#A52A2A" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Cream", hex: "#FFFDD0" },
  { name: "Khaki", hex: "#F0E68C" },
];

function hexToRgb(hex: string) {
  const normalized =
    hex.replace("#", "");

  return {
    r: parseInt(
      normalized.substring(0, 2),
      16,
    ),

    g: parseInt(
      normalized.substring(2, 4),
      16,
    ),

    b: parseInt(
      normalized.substring(4, 6),
      16,
    ),
  };
}

function getClosestColorName(
  selectedHex: string,
) {
  const selected =
    hexToRgb(selectedHex);

  let closestName =
    "Custom Color";

  let closestDistance =
    Number.POSITIVE_INFINITY;

  for (const color of COLOR_NAMES) {
    const rgb =
      hexToRgb(color.hex);

    const distance =
      Math.sqrt(
        Math.pow(
          selected.r - rgb.r,
          2,
        ) +
          Math.pow(
            selected.g - rgb.g,
            2,
          ) +
          Math.pow(
            selected.b - rgb.b,
            2,
          ),
      );

    if (
      distance <
      closestDistance
    ) {
      closestDistance =
        distance;

      closestName =
        color.name;
    }
  }

  return closestName;
}
type VariantData =
  ProductData["variants"][number];

function VariantEditor({
  variant,
  onUpdated,
  onDeleted,
  setMessage,
  setIsError,
}: {
  variant: VariantData;

  onUpdated: (
    variant: VariantData,
  ) => void;

  onDeleted: (
    variantId: string,
  ) => void;

  setMessage: (
    message: string | null,
  ) => void;

  setIsError: (
    value: boolean,
  ) => void;
}) {
  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [sku, setSku] =
    useState(variant.sku);

  const [
    colorName,
    setColorName,
  ] = useState(
    variant.colorName,
  );

  const [
    colorValue,
    setColorValue,
  ] = useState(
    variant.colorValue ??
      "#000000",
  );

  const [size, setSize] =
    useState(variant.size);

  const [stock, setStock] =
    useState(variant.stock);

  const [
    priceOverride,
    setPriceOverride,
  ] = useState(
    variant.priceOverride !==
      null
      ? String(
          variant.priceOverride,
        )
      : "",
  );

  const [
    isActive,
    setIsActive,
  ] = useState(
    variant.isActive,
  );

  function saveVariant() {
    startTransition(async () => {
      const result =
        await updateProductVariantAction({
          variantId:
            variant.id,

          sku,

          colorName,

          colorValue,

          size,

          stock,

          priceOverride:
            priceOverride.trim()
              ? Number(
                  priceOverride,
                )
              : null,

          isActive,
        });

      setIsError(
        !result.success,
      );

      setMessage(
        result.message,
      );

      if (result.success) {
        onUpdated({
          ...variant,

          sku,
          colorName,
          colorValue,
          size,
          stock,

          priceOverride:
            priceOverride.trim()
              ? Number(
                  priceOverride,
                )
              : null,

          isActive,
        });
      }
    });
  }

  function deleteVariant() {
    if (
      !window.confirm(
        "Remove this variant?",
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result =
        await deleteProductVariantAction({
          variantId:
            variant.id,
        });

      setIsError(
        !result.success,
      );

      setMessage(
        result.message,
      );

      if (result.success) {
        onDeleted(
          variant.id,
        );
      }
    });
  }

return (
  <div
    className="
      overflow-hidden
      rounded-[12px]
      border
      border-black/10
      bg-white
    "
  >
    {/* =====================================
        VARIANT CONTENT
    ====================================== */}

    <div
      className="
        px-[18px]
        py-[18px]

        min-[800px]:px-[22px]
        min-[800px]:py-[20px]
      "
    >
      {/* ACTIVE VARIANT */}

      <label
        className="
          mb-[20px]
          flex
          cursor-pointer
          items-start
          gap-[12px]
        "
      >
        <input
          type="checkbox"
          checked={isActive}
          onChange={(event) =>
            setIsActive(
              event.target.checked,
            )
          }
          className="
            mt-[2px]
            h-[18px]
            w-[18px]
            shrink-0
            cursor-pointer
            accent-black
          "
        />

        <div>
          <p
            className="
              m-0
              text-[15px]
              font-semibold
              leading-[20px]
              text-black
            "
          >
            Active Variant
          </p>

          <p
            className="
              mt-[2px]
              mb-0
              text-[12px]
              leading-[18px]
              text-black/50
            "
          >
            Allow customers to purchase
            this variant.
          </p>
        </div>
      </label>

      {/* =====================================
          FIELDS
      ====================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-x-[20px]
          gap-y-[16px]

          min-[800px]:grid-cols-2
        "
      >
        {/* SKU */}

        <label className="block">
          <Label>
            SKU
          </Label>

          <input
            value={sku}
            onChange={(event) =>
              setSku(
                event.target.value,
              )
            }
            className={inputClassName}
            style={inputStyle}
            placeholder="SKU-001-BLK-M"
          />
        </label>


          {/* COLOR */}

<div>
  <Label>
    Color
  </Label>

  <label
    className="
      flex
      h-[46px]
      w-full

      cursor-pointer
      items-center
      gap-[11px]

      rounded-[8px]

      bg-white

      px-[11px]

      transition-colors

      hover:bg-[#FAFAFA]
    "
    style={inputStyle}
  >
    {/* COLOR PREVIEW */}

    <span
      className="
        h-[26px]
        w-[26px]
        shrink-0

        rounded-[6px]

        border
        border-black/15
      "
      style={{
        backgroundColor:
          colorValue,
      }}
    />

    {/* AUTOMATIC COLOR NAME */}

    <span
      className="
        min-w-0
        flex-1

        truncate

        text-[13px]
        font-medium
        text-black
      "
    >
      {colorName}
    </span>

    {/* HIDDEN COLOR PICKER */}

    <input
      type="color"
      value={colorValue}
      onChange={(event) => {
        const hex =
          event.target.value;

        setColorValue(hex);

        setColorName(
          getClosestColorName(
            hex,
          ),
        );
      }}
      className="
        absolute
        h-0
        w-0
        opacity-0
      "
    />
  </label>
</div>

        {/* SIZE */}

        <label className="block">
          <Label>
            Size
          </Label>

          <input
            value={size}
            onChange={(event) =>
              setSize(
                event.target.value,
              )
            }
            className={inputClassName}
            style={inputStyle}
            placeholder="Medium"
          />
        </label>

        {/* STOCK */}

        <div>
          <Label>
            Stock
          </Label>

          <div
            className="
              flex
              h-[46px]
              w-full

              overflow-hidden

              rounded-[8px]
              border
              border-black/20
              bg-white
            "
          >
            <button
              type="button"
              onClick={() =>
                setStock(
                  Math.max(
                    0,
                    stock - 1,
                  ),
                )
              }
              className="
                flex
                h-full
                w-[52px]
                shrink-0

                items-center
                justify-center

                border-r
                border-black/10
                bg-[#FAFAFA]

                text-center
                text-[20px]
                font-medium
                leading-none
                text-black

                transition-colors

                hover:bg-[#F1F1F1]
                active:bg-[#EAEAEA]
              "
            >
              −
            </button>

            <input
              type="number"
              min="0"
              step="1"
              value={stock}
              onChange={(event) =>
                setStock(
                  Math.max(
                    0,
                    Number(
                      event.target.value,
                    ),
                  ),
                )
              }
              className="
                h-full
                min-w-0
                flex-1

                border-0
                bg-white

                px-[12px]

                text-center
                text-[14px]
                font-medium
                text-black

                outline-none
              "
            />

            <button
              type="button"
              onClick={() =>
                setStock(
                  stock + 1,
                )
              }
              className="
                flex
                h-full
                w-[52px]
                shrink-0

                items-center
                justify-center

                border-l
                border-black/10
                bg-[#FAFAFA]

                text-center
                text-[20px]
                font-medium
                leading-none
                text-black

                transition-colors

                hover:bg-[#F1F1F1]
                active:bg-[#EAEAEA]
              "
            >
              +
            </button>
          </div>
        </div>

        {/* PRICE OVERRIDE */}

        <label className="block">
          <Label>
            Price Override ($)
          </Label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={priceOverride}
            onChange={(event) =>
              setPriceOverride(
                event.target.value,
              )
            }
            placeholder="Optional"
            className={inputClassName}
            style={inputStyle}
          />
        </label>
      </div>
    </div>

    {/* =====================================
        VARIANT ACTION BAR
    ====================================== */}

    <div
      className="
        flex
        flex-col
        gap-[12px]

        border-t
        border-black/10

        px-[18px]
        py-[16px]

        min-[600px]:
        flex-row

        min-[600px]:
        items-center

        min-[600px]:
        justify-between

        min-[800px]:
        px-[22px]
      "
    >
      {/* REMOVE */}

  <div
  className="
    mt-[24px]
    flex
    w-full
    flex-col
    gap-[14px]

    border-t
    border-black/10

    pt-[20px]

    min-[600px]:
    flex-row

    min-[600px]:
    items-center

    min-[600px]:
    justify-between
  "
>
  {/* REMOVE */}

  <button
    type="button"
    disabled={isPending}
    onClick={deleteVariant}
    className="
      inline-flex
      h-[44px]
      min-w-[118px]

      items-center
      justify-center
      gap-[8px]

      rounded-[8px]

      px-[17px]

      text-[13px]
      font-semibold
      leading-none

      transition-all
      duration-150

      hover:bg-[#FFF1F1]

      active:scale-[0.98]

      disabled:cursor-not-allowed
      disabled:opacity-50
    "
    style={{
      backgroundColor: "#FFF7F7",
      border: "1.5px solid #F3A6A6",
      color: "#DC2626",
      boxShadow:
        "0 1px 2px rgba(0,0,0,0.03)",
    }}
  >
    <Trash2
      className="
        h-[16px]
        w-[16px]
        shrink-0
      "
      strokeWidth={2}
      style={{
        color: "#DC2626",
      }}
    />

    <span
      className="
        flex
        items-center
        justify-center
        whitespace-nowrap
      "
      style={{
        color: "#DC2626",
      }}
    >
      Remove
    </span>
  </button>

  {/* RIGHT SIDE */}

  <div
    className="
      flex
      items-center
      justify-end
      gap-[10px]
    "
  >
    {/* CANCEL */}

    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        setSku(variant.sku);

        setColorName(
          variant.colorName,
        );

        setColorValue(
          variant.colorValue ??
            "#000000",
        );

        setSize(variant.size);

        setStock(
          variant.stock,
        );

        setPriceOverride(
          variant.priceOverride !==
            null
            ? String(
                variant.priceOverride,
              )
            : "",
        );

        setIsActive(
          variant.isActive,
        );
      }}
      className="
        inline-flex
        h-[44px]
        min-w-[112px]

        items-center
        justify-center

        rounded-[8px]

        px-[20px]

        text-[13px]
        font-semibold
        leading-none

        transition-all
        duration-150

        hover:bg-[#F7F7F7]

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-50
      "
      style={{
        backgroundColor: "#FFFFFF",
        border: "1.5px solid #AFAFAF",
        color: "#111111",
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <span
        className="
          flex
          items-center
          justify-center
          whitespace-nowrap
        "
        style={{
          color: "#111111",
        }}
      >
        Cancel
      </span>
    </button>

    {/* SAVE VARIANT */}

    <button
      type="button"
      disabled={isPending}
      onClick={saveVariant}
      className="
        inline-flex
        h-[44px]
        min-w-[145px]

        items-center
        justify-center
        gap-[8px]

        rounded-[8px]

        px-[20px]

        text-[13px]
        font-semibold
        leading-none

        transition-all
        duration-150

        hover:opacity-90

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-50
      "
      style={{
        backgroundColor:
          "#0D0D0F",
        border:
          "1.5px solid #0D0D0F",
        color: "#FFFFFF",
        boxShadow:
          "0 2px 5px rgba(0,0,0,0.14)",
      }}
    >
      <Save
        className="
          h-[16px]
          w-[16px]
          shrink-0
        "
        strokeWidth={2}
        style={{
          color: "#FFFFFF",
        }}
      />

      <span
        className="
          flex
          items-center
          justify-center
          whitespace-nowrap
        "
        style={{
          color: "#FFFFFF",
        }}
      >
        {isPending
          ? "Saving..."
          : "Save Variant"}
      </span>
    </button>
  </div>
</div>
      
    </div>
  </div>
);
}