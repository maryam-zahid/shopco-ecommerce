"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ImageIcon,
  Plus,
  Trash2,
  Upload,
    X,

} from "lucide-react";
import ProductImageUpload from "@/components/admin/products/product-image-upload";
import {
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import {
  createProductAction,
} from "@/actions/admin-product.actions";
import {
  createCategoryAction,
} from "@/actions/admin-category.actions";

import {
  createDressStyleAction,
} from "@/actions/admin-dress-style.actions";
type Props = {
  categories: {
    id: string;
    name: string;
  }[];

  dressStyles: {
    id: string;
    name: string;
  }[];
};

type VariantForm = {
  id: string;

  sku: string;

  colorName: string;

  colorValue: string;

  size: string;

  stock: string;

  priceOverride: string;
};

export default function NewProductForm({
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

  const [submitMode, setSubmitMode] =
    useState<"DRAFT" | "ACTIVE">(
      "DRAFT",
    );

  /* =========================================================
     IMAGES
  ========================================================= */

  const [images, setImages] =
    useState<string[]>([]);

  /* =========================================================
     VARIANTS
  ========================================================= */

  const [variants, setVariants] =
    useState<VariantForm[]>([
      createEmptyVariant(),
    ]);

  /* =========================================================
     CATEGORY / DRESS STYLE
  ========================================================= */

  const [
    categoryOptions,
    setCategoryOptions,
  ] = useState(categories);

  const [
    dressStyleOptions,
    setDressStyleOptions,
  ] = useState(dressStyles);

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState("");

  const [
    selectedDressStyleId,
    setSelectedDressStyleId,
  ] = useState("");

  const [
    showCategoryCreator,
    setShowCategoryCreator,
  ] = useState(false);

  const [
    showDressStyleCreator,
    setShowDressStyleCreator,
  ] = useState(false);

  const [
    newCategoryName,
    setNewCategoryName,
  ] = useState("");

  const [
    newDressStyleName,
    setNewDressStyleName,
  ] = useState("");

  const [
    isCreatingCategory,
    setIsCreatingCategory,
  ] = useState(false);

  const [
    isCreatingDressStyle,
    setIsCreatingDressStyle,
  ] = useState(false);

  /* =========================================================
     IMAGE HELPERS
  ========================================================= */

  function removeImage(
    image: string,
  ) {
    setImages((current) =>
      current.filter(
        (item) =>
          item !== image,
      ),
    );
  }

  /* =========================================================
     VARIANT HELPERS
  ========================================================= */

  function addVariant() {
    setVariants((current) => [
      ...current,
      createEmptyVariant(),
    ]);
  }

  function removeVariant(
    variantId: string,
  ) {
    setVariants((current) =>
      current.filter(
        (variant) =>
          variant.id !==
          variantId,
      ),
    );
  }

  function updateVariant(
    variantId: string,
    field:
      | "sku"
      | "colorName"
      | "colorValue"
      | "size"
      | "stock"
      | "priceOverride",
    value: string,
  ) {
    setVariants((current) =>
      current.map(
        (variant) =>
          variant.id ===
          variantId
            ? {
                ...variant,
                [field]:
                  value,
              }
            : variant,
      ),
    );
  }

  /* =========================================================
     SLUG HELPER
  ========================================================= */

  function makeSlug(
    value: string,
  ) {
    return value
      .trim()
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-",
      )
      .replace(
        /^-+|-+$/g,
        "",
      );
  }

  /* =========================================================
     CREATE CATEGORY
  ========================================================= */

  async function handleCreateCategory() {
    const name =
      newCategoryName.trim();

    if (!name) {
      setIsError(true);

      setMessage(
        "Please enter a category name.",
      );

      return;
    }

    setIsCreatingCategory(true);

    setIsError(false);
    setMessage(null);

    const result =
      await createCategoryAction({
        name,
        slug:
          makeSlug(name),
        description: "",
      });

    setIsCreatingCategory(false);

    if (
      !result.success ||
      !result.item
    ) {
      setIsError(true);

      setMessage(
        result.message,
      );

      return;
    }

    setCategoryOptions(
      (current) => [
        ...current,
        result.item!,
      ],
    );

    setSelectedCategoryId(
      result.item.id,
    );

    setNewCategoryName("");

    setShowCategoryCreator(
      false,
    );

    setIsError(false);

    setMessage(
      "Category added successfully.",
    );
  }

  /* =========================================================
     CREATE DRESS STYLE
  ========================================================= */

  async function handleCreateDressStyle() {
    const name =
      newDressStyleName.trim();

    if (!name) {
      setIsError(true);

      setMessage(
        "Please enter a dress style name.",
      );

      return;
    }

    setIsCreatingDressStyle(
      true,
    );

    setIsError(false);
    setMessage(null);

    const result =
      await createDressStyleAction({
        name,
        slug:
          makeSlug(name),
        description: "",
      });

    setIsCreatingDressStyle(
      false,
    );

    if (
      !result.success ||
      !result.item
    ) {
      setIsError(true);

      setMessage(
        result.message,
      );

      return;
    }

    setDressStyleOptions(
      (current) => [
        ...current,
        result.item!,
      ],
    );

    setSelectedDressStyleId(
      result.item.id,
    );

    setNewDressStyleName("");

    setShowDressStyleCreator(
      false,
    );

    setIsError(false);

    setMessage(
      "Dress style added successfully.",
    );
  }

  /* =========================================================
     SUBMIT PRODUCT
  ========================================================= */

  function handleSubmit(
    formData: FormData,
  ) {
    setMessage(null);
    setIsError(false);

    const discountRaw =
      String(
        formData.get(
          "discountPrice",
        ) ?? "",
      ).trim();

    startTransition(
      async () => {
        const result =
          await createProductAction({
            name: String(
              formData.get(
                "name",
              ) ?? "",
            ),

            slug: String(
              formData.get(
                "slug",
              ) ?? "",
            ),

            description:
              String(
                formData.get(
                  "description",
                ) ?? "",
              ),

            price: Number(
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
              selectedCategoryId,

            dressStyleId:
              selectedDressStyleId ||
              null,

            status:
              submitMode,

            isFeatured:
              formData.get(
                "isFeatured",
              ) === "on",

            isNewArrival:
              formData.get(
                "isNewArrival",
              ) === "on",

            images,

            variants:
              variants
                .filter(
                  (
                    variant,
                  ) =>
                    variant.sku.trim() ||
                    variant.colorName.trim() ||
                    variant.size.trim(),
                )
                .map(
                  (
                    variant,
                  ) => ({
                    sku:
                      variant.sku.trim(),

                    colorName:
                      variant.colorName.trim(),

                    colorValue:
                      variant.colorValue.trim() ||
                      null,

                    size:
                      variant.size.trim(),

                    stock:
                      Number(
                        variant.stock ||
                          "0",
                      ),

                    priceOverride:
                      variant.priceOverride.trim()
                        ? Number(
                            variant.priceOverride,
                          )
                        : null,
                  }),
                ),
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
          window.setTimeout(
            () => {
              router.push(
                "/admin/products",
              );

              router.refresh();
            },
            500,
          );
        }
      },
    );
  }

  return (
    <form action={handleSubmit}>
      {/* ======================================
          TOP BAR
      ====================================== */}

      <div
        className="
          mb-[18px]

          flex
          flex-col
          gap-[14px]

          min-[800px]:flex-row
          min-[800px]:items-center
          min-[800px]:justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-[14px]
          "
        >
          <button
            type="button"
            onClick={() =>
              router.back()
            }
            className="
              flex
              h-[38px]
              w-[38px]
              items-center
              justify-center

              rounded-[7px]

              border
              border-black/10

              bg-white

              text-black

              hover:bg-[#F8F8F8]
            "
          >
            <ArrowLeft className="size-[17px]" />
          </button>

          <h1
            className="
              text-[24px]
              font-semibold
              tracking-[-0.02em]
              text-black
            "
          >
            Add Products
          </h1>
        </div>

       <div
  className="
    flex
    flex-wrap
    items-center
    justify-end
    gap-[12px]
  "
>
  {/* =========================
      DISCARD
  ========================== */}
  <button
    type="button"
    onClick={() => router.back()}
    className="
      inline-flex
      items-center
      justify-center
      whitespace-nowrap

      transition-colors
      duration-200

      hover:bg-[#F2F2F2]
      active:bg-[#E8E8E8]
    "
    style={{
      minWidth: "100px",
      height: "46px",
      padding: "0 20px",

      backgroundColor: "#FFFFFF",
      border: "1px solid #D9D9DE",
      borderRadius: "8px",

      color: "#111111",
      fontFamily: "var(--font-satoshi)",
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",

      textAlign: "center",
    }}
  >
    Discard
  </button>

  {/* =========================
      SAVE DRAFT
  ========================== */}
  <button
    type="button"
    onClick={() => {
      // PUT YOUR SAVE DRAFT LOGIC HERE
    }}
    className="
      inline-flex
      items-center
      justify-center
      whitespace-nowrap

      transition-colors
      duration-200

      hover:bg-[#F2F2F2]
      active:bg-[#E8E8E8]
    "
    style={{
      minWidth: "126px",
      height: "46px",
      padding: "0 20px",

      backgroundColor: "#FFFFFF",
      border: "1px solid #D9D9DE",
      borderRadius: "8px",

      color: "#111111",
      fontFamily: "var(--font-satoshi)",
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",

      textAlign: "center",
    }}
  >
    Save Draft
  </button>

  {/* =========================
      PUBLISH
  ========================== */}
  <button
    type="submit"
    disabled={isPending}
    className="
      inline-flex
      items-center
      justify-center
      whitespace-nowrap

      transition-colors
      duration-200

      hover:bg-[#202020]

      disabled:cursor-not-allowed
      disabled:opacity-50
    "
    style={{
      minWidth: "100px",
      height: "46px",
      padding: "0 20px",

      backgroundColor: "#000000",
      border: "1px solid #000000",
      borderRadius: "8px",

      color: "#FFFFFF",
      fontFamily: "var(--font-satoshi)",
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",

      textAlign: "center",
    }}
  >
    {isPending ? "Publishing..." : "Publish"}
  </button>
</div>
      </div>

      {/* MESSAGE */}

      {message && (
        <div
          className={`
            mb-[16px]

            rounded-[8px]

            border

            px-[14px]
            py-[11px]

            text-[13px]

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

      {/* ======================================
          MAIN LAYOUT
      ====================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-[16px]

          min-[1100px]:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]
        "
      >
        {/* ====================================
            LEFT
        ==================================== */}

        <div className="space-y-[16px]">
          {/* PRODUCT DETAILS */}

          <AdminCard title="Product Details">
            <div className="space-y-[16px]">
              <Field
                label="Name"
                name="name"
                placeholder="Enter product name"
              />

              <div
                className="
                  grid
                  grid-cols-1
                  gap-[14px]

                  min-[700px]:grid-cols-2
                "
              >
                <Field
                  label="Slug"
                  name="slug"
                  placeholder="black-striped-t-shirt"
                />

                <Field
                  label="Product Reference"
                  name="productReference"
                  placeholder="Optional internal reference"
                  required={false}
                  disabled
                />
              </div>

              <label className="block">
                <Label>
                  Description
                </Label>

                <textarea
                  name="description"
                  rows={4}
                  required
                  placeholder="Enter product description"
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

                <p
                  className="
                    mt-[6px]
                    text-[11px]
                    text-black/45
                  "
                >
                  Set a description to the
                  product for better visibility.
                </p>
              </label>
            </div>
          </AdminCard>

          {/* IMAGES */}

          <AdminCard
            title="Product Images"
            rightContent={
              <span
                className="
                  text-[12px]
                  font-medium
                  text-black
                "
              >
                Add media from URL
              </span>
            }
          >
        <div>
  <ProductImageUpload
    images={images}
    onChange={setImages}
    maxImages={6}
  />

  
</div>
           

            {images.length > 0 && (
              <div
                className="
                  mt-[14px]

                  grid
                  grid-cols-2
                  gap-[10px]

                  min-[600px]:grid-cols-4
                "
              >
                {images.map(
                  (image) => (
                    <div
                      key={image}
                      className="
                        relative

                        h-[130px]

                        overflow-hidden

                        rounded-[8px]

                        border
                        border-black/10

                        bg-[#F8F8F8]
                      "
                    >
                      <Image
                        src={image}
                        alt="Product"
                        fill
                        sizes="150px"
                        className="object-contain"
                      />
<ProductImageUpload
  images={images}
  onChange={setImages}
/>
                      <button
                        type="button"
                        onClick={() =>
                          removeImage(
                            image,
                          )
                        }
                        className="
                          absolute
                          right-[6px]
                          top-[6px]

                          flex
                          h-[28px]
                          w-[28px]
                          items-center
                          justify-center

                          rounded-[6px]

                          bg-white

                          text-red-600

                          shadow
                        "
                      >
                        <Trash2 className="size-[14px]" />
                      </button>
                    </div>
                  ),
                )}
              </div>
            )}
          </AdminCard>

          {/* VARIANTS */}

          <AdminCard title="Variants">
            <div className="space-y-[10px]">
              {variants.map(
                (variant, index) => (
                  <div
                    key={variant.id}
                    className="
                      rounded-[9px]

                      border
                      border-black/10

                      bg-[#FAFAFA]

                      p-[12px]
                    "
                  >
                    <div
                      className="
                        mb-[10px]

                        flex
                        items-center
                        justify-between
                      "
                    >
                      <p
                        className="
                          text-[12px]
                          font-semibold
                          text-black
                        "
                      >
                        Variant {index + 1}
                      </p>

                      {variants.length >
                        1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeVariant(
                              variant.id,
                            )
                          }
                          className="
                            text-red-600
                          "
                        >
                          <Trash2 className="size-[15px]" />
                        </button>
                      )}
                    </div>

                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-[10px]

                        min-[600px]:grid-cols-2
                        min-[900px]:grid-cols-3
                      "
                    >
                      <VariantInput
                        label="SKU"
                        value={
                          variant.sku
                        }
                        placeholder="TSHIRT-BLK-M"
                        onChange={(
                          value,
                        ) =>
                          updateVariant(
                            variant.id,
                            "sku",
                            value,
                          )
                        }
                      />

                    <div className="block">
  <Label>
    Color
  </Label>

  <label
    className="
      flex
      h-[44px]
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
    style={{
      border:
        "1.5px solid rgba(0,0,0,0.24)",
    }}
  >
    {/* SELECTED COLOR PREVIEW */}

    <span
      className="
        h-[24px]
        w-[24px]
        shrink-0

        rounded-[6px]

        border
        border-black/15
      "
      style={{
        backgroundColor:
          variant.colorValue,
      }}
    />

    {/* AUTOMATIC COLOR NAME */}

    <span
      className="
        min-w-0
        flex-1

        truncate

        text-[12px]
        font-medium
        text-black
      "
    >
      {variant.colorName}
    </span>

   

    {/* HIDDEN NATIVE COLOR PICKER */}

    <input
      type="color"
      value={
        variant.colorValue
      }
      onChange={(event) => {
        const selectedColor =
          event.target.value;

        updateVariant(
          variant.id,
          "colorValue",
          selectedColor,
        );

        updateVariant(
          variant.id,
          "colorName",
          getClosestColorName(
            selectedColor,
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

                      <VariantInput
                        label="Size"
                        value={
                          variant.size
                        }
                        placeholder="Medium"
                        onChange={(
                          value,
                        ) =>
                          updateVariant(
                            variant.id,
                            "size",
                            value,
                          )
                        }
                      />

                      <VariantInput
                        label="Stock"
                        value={
                          variant.stock
                        }
                        type="number"
                        placeholder="10"
                        onChange={(
                          value,
                        ) =>
                          updateVariant(
                            variant.id,
                            "stock",
                            value,
                          )
                        }
                      />

                      <VariantInput
                        label="Price Override"
                        value={
                          variant.priceOverride
                        }
                        type="number"
                        placeholder="Optional"
                        onChange={(
                          value,
                        ) =>
                          updateVariant(
                            variant.id,
                            "priceOverride",
                            value,
                          )
                        }
                      />
                    </div>
                  </div>
                ),
              )}
            </div>

            <button
              type="button"
              onClick={addVariant}
              className="
                mt-[14px]

                flex
                h-[40px]
                w-full
                items-center
                justify-center
                gap-[7px]

                border-t
                border-black/10

                pt-[12px]

                text-[13px]
                font-medium
                text-black
              "
            >
              <Plus className="size-[15px]" />

              Add Variant
            </button>
          </AdminCard>
        </div>

        {/* ====================================
            RIGHT
        ==================================== */}

        <div className="space-y-[16px]">
          {/* PRICING */}

          <AdminCard title="Pricing">
            <div className="space-y-[14px]">
              <Field
                label="Base Price"
                name="price"
                type="number"
                step="0.01"
                placeholder="0.00"
              />

              <Field
                label="Discounted Price"
                name="discountPrice"
                type="number"
                step="0.01"
                placeholder="Optional"
                required={false}
              />
            </div>

            <div
              className="
                my-[16px]
                h-px
                bg-black/10
              "
            />

            <Checkbox
              name="isFeatured"
              label="Featured product"
            />

            <div className="mt-[12px]">
              <Checkbox
                name="isNewArrival"
                label="New arrival"
              />
            </div>
          </AdminCard>

          {/* STATUS */}

          <AdminCard title="Status">
            <div
              className="
                flex
                items-center
                gap-[8px]

                rounded-[7px]

                border
                border-black/15

                px-[12px]
                py-[10px]
              "
            >
              <span
                className={`
                  h-[8px]
                  w-[8px]

                  rounded-full

                  ${
                    submitMode ===
                    "ACTIVE"
                      ? "bg-green-500"
                      : "bg-orange-400"
                  }
                `}
              />

              <span
                className="
                  text-[13px]
                  font-medium
                  text-black
                "
              >
                {submitMode ===
                "ACTIVE"
                  ? "Published"
                  : "Draft"}
              </span>
            </div>

            <p
              className="
                mt-[9px]

                text-[11px]
                text-black/45
              "
            >
              Use Save Draft or Publish from
              the top right.
            </p>
          </AdminCard>

          {/* CATEGORY */}
{/* CATEGORY / DRESS STYLE */}

<AdminCard title="Categories">
  {/* CATEGORY */}

  <div>
    <Label>Category</Label>

    <div className="flex items-center gap-[8px]">
      <select
        name="categoryId"
        required
        value={selectedCategoryId}
        onChange={(event) =>
          setSelectedCategoryId(
            event.target.value,
          )
        }
        className="
          h-[46px]
          min-w-0
          flex-1

          rounded-[8px]
          bg-white

          px-[13px]

          text-[13px]
          text-black

          outline-none

          focus:border-black
          focus:ring-1
          focus:ring-black/10
        "
        style={{
          border:
            "1.5px solid rgba(0,0,0,0.22)",
        }}
      >
        <option value="">
          Select a category
        </option>

        {categoryOptions.map(
          (category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ),
        )}
      </select>

      <button
        type="button"
        aria-label="Add category"
        onClick={() => {
          setShowCategoryCreator(
            (previous) => !previous,
          );

          setShowDressStyleCreator(false);
        }}
        className="
          flex
          h-[46px]
          w-[46px]
          shrink-0
          items-center
          justify-center

          rounded-[8px]

          bg-white
          text-black

          hover:bg-[#F5F5F5]
        "
        style={{
          border:
            "1.5px solid rgba(0,0,0,0.22)",
        }}
      >
        <Plus className="size-[19px]" />
      </button>
    </div>

    {showCategoryCreator && (
      <div
        className="
          mt-[10px]

          rounded-[9px]
          bg-[#FAFAFA]

          p-[12px]
        "
        style={{
          border:
            "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <div
          className="
            mb-[10px]

            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-[13px]
              font-semibold
              text-black
            "
          >
            Add Category
          </span>

          <button
            type="button"
            onClick={() =>
              setShowCategoryCreator(false)
            }
            className="
              flex
              h-[26px]
              w-[26px]
              items-center
              justify-center

              rounded-full

              text-black/50

              hover:bg-black/5
              hover:text-black
            "
          >
            <X className="size-[15px]" />
          </button>
        </div>

        <div className="flex items-center gap-[8px]">
          <input
            type="text"
            value={newCategoryName}
            onChange={(event) =>
              setNewCategoryName(
                event.target.value,
              )
            }
            placeholder="Category name"
            className="
              h-[42px]
              min-w-0
              flex-1

              rounded-[7px]
              bg-white

              px-[12px]

              text-[13px]
              text-black

              outline-none

              placeholder:text-black/35

              focus:border-black
              focus:ring-1
              focus:ring-black/10
            "
            style={{
              border:
                "1.5px solid rgba(0,0,0,0.20)",
            }}
          />

          <button
            type="button"
            disabled={isCreatingCategory}
            onClick={() =>
              void handleCreateCategory()
            }
            className="
              inline-flex
              h-[42px]
              items-center
              justify-center

              rounded-[7px]

              px-[16px]

              text-[13px]
              font-medium

              disabled:opacity-50
            "
            style={{
              backgroundColor: "#000000",
              border: "1px solid #000000",
              color: "#FFFFFF",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
              }}
            >
              {isCreatingCategory
                ? "Adding..."
                : "Add"}
            </span>
          </button>
        </div>
      </div>
    )}
  </div>

  {/* DRESS STYLE */}

  <div className="mt-[16px]">
    <Label>Dress Style</Label>

    <div className="flex items-center gap-[8px]">
      <select
        name="dressStyleId"
        value={selectedDressStyleId}
        onChange={(event) =>
          setSelectedDressStyleId(
            event.target.value,
          )
        }
        className="
          h-[46px]
          min-w-0
          flex-1

          rounded-[8px]
          bg-white

          px-[13px]

          text-[13px]
          text-black

          outline-none

          focus:border-black
          focus:ring-1
          focus:ring-black/10
        "
        style={{
          border:
            "1.5px solid rgba(0,0,0,0.22)",
        }}
      >
        <option value="">
          Select a dress style
        </option>

        {dressStyleOptions.map(
          (style) => (
            <option
              key={style.id}
              value={style.id}
            >
              {style.name}
            </option>
          ),
        )}
      </select>

      <button
        type="button"
        aria-label="Add dress style"
        onClick={() => {
          setShowDressStyleCreator(
            (previous) => !previous,
          );

          setShowCategoryCreator(false);
        }}
        className="
          flex
          h-[46px]
          w-[46px]
          shrink-0
          items-center
          justify-center

          rounded-[8px]

          bg-white
          text-black

          hover:bg-[#F5F5F5]
        "
        style={{
          border:
            "1.5px solid rgba(0,0,0,0.22)",
        }}
      >
        <Plus className="size-[19px]" />
      </button>
    </div>

    {showDressStyleCreator && (
      <div
        className="
          mt-[10px]

          rounded-[9px]
          bg-[#FAFAFA]

          p-[12px]
        "
        style={{
          border:
            "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <div
          className="
            mb-[10px]

            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-[13px]
              font-semibold
              text-black
            "
          >
            Add Dress Style
          </span>

          <button
            type="button"
            onClick={() =>
              setShowDressStyleCreator(false)
            }
            className="
              flex
              h-[26px]
              w-[26px]
              items-center
              justify-center

              rounded-full

              text-black/50

              hover:bg-black/5
              hover:text-black
            "
          >
            <X className="size-[15px]" />
          </button>
        </div>

        <div className="flex items-center gap-[8px]">
          <input
            type="text"
            value={newDressStyleName}
            onChange={(event) =>
              setNewDressStyleName(
                event.target.value,
              )
            }
            placeholder="Dress style name"
            className="
              h-[42px]
              min-w-0
              flex-1

              rounded-[7px]
              bg-white

              px-[12px]

              text-[13px]
              text-black

              outline-none

              placeholder:text-black/35

              focus:border-black
              focus:ring-1
              focus:ring-black/10
            "
            style={{
              border:
                "1.5px solid rgba(0,0,0,0.20)",
            }}
          />

    <button
  type="button"
  disabled={isCreatingDressStyle}
  onClick={() =>
    void handleCreateDressStyle()
  }
  className="
    inline-flex
    shrink-0
    items-center
    justify-center

    rounded-[8px]

    px-[18px]
    py-[11px]

    text-[13px]
    font-medium
    leading-[18px]

    whitespace-nowrap

    transition-opacity

    disabled:cursor-not-allowed
    disabled:opacity-50
  "
  style={{
    backgroundColor: "#000000",
    border: "1px solid #000000",
    color: "#FFFFFF",
    fontFamily: "var(--font-satoshi)",
  }}
>
  {isCreatingDressStyle
    ? "Adding..."
    : "Add"}
</button>
        </div>
      </div>
    )}
  </div>
</AdminCard>
        
        </div>
      </div>
    </form>
  );
}const COLOR_NAMES = [
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

  let closestName = "Black";

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
function createEmptyVariant(): VariantForm {
  return {
    id: crypto.randomUUID(),

    sku: "",

   colorName: "Black",

colorValue: "#000000",
    size: "",

    stock: "0",

    priceOverride: "",
  };
}

function AdminCard({
  title,
  rightContent,
  children,
}: {
  title: string;
  rightContent?: React.ReactNode;
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
          "1.5px solid rgba(0,0,0,0.13)",
      }}
    >
      <div
        className="
          mb-[20px]

          flex
          items-center
          justify-between
          gap-[16px]
        "
      >
        <h2
          className="
            text-[17px]
            font-semibold
            text-black
          "
        >
          {title}
        </h2>

        {rightContent}
      </div>

      {children}
    </section>
  );
}

function Label({
  children,
}: {
  children: React.ReactNode;
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
  placeholder,
  type = "text",
  step,
  required = true,
  disabled = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  step?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>

      <input
        type={type}
        name={name}
        step={step}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
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
function VariantInput({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (
    value: string,
  ) => void;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>

      <input
        type={type}
        min={
          type === "number"
            ? 0
            : undefined
        }
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="
          h-[44px]
          w-full

          rounded-[8px]

          bg-white

          px-[12px]

          text-[12px]
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
  );
}

function Checkbox({
  name,
  label,
}: {
  name: string;

  label: string;
}) {
  return (
    <label
      className="
        flex
        cursor-pointer
        items-center
        gap-[9px]

        text-[12px]
        font-medium
        text-black
      "
    >
      <input
        type="checkbox"
        name={name}
        className="
          h-[16px]
          w-[16px]
          accent-black
        "
      />

      {label}
    </label>
  );
}