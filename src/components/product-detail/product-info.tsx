"use client";

import {
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { addToCartAction } from "@/actions/cart.actions";
import type { ProductDetail } from "@/types/product";

type ProductInfoProps = {
  product: ProductDetail;
};
export default function ProductInfo({
  product,
}: ProductInfoProps) {
  // const [selectedColor, setSelectedColor] = useState(0);

  // const [selectedSize, setSelectedSize] = useState(
  //   product.selectedSize
  // );

  const [selectedColor, setSelectedColor] =
  useState<number | null>(null);

const [selectedSize, setSelectedSize] =
  useState("");

  const [quantity, setQuantity] = useState(1);
const [message, setMessage] = useState<string | null>(null);
const [isError, setIsError] = useState(false);
const [isPending, startTransition] = useTransition();
useEffect(() => {
  if (!message) {
    return;
  }

  const timeout = window.setTimeout(() => {
    setMessage(null);
    setIsError(false);
  }, 2500);

  return () => {
    window.clearTimeout(timeout);
  };
}, [message]);

const selectedColorName =
  selectedColor !== null
    ? product.colors[selectedColor]?.name
    : undefined;

const selectedVariant =
  selectedColorName && selectedSize
    ? product.variants.find(
        (variant) =>
          variant.colorName ===
            selectedColorName &&
          variant.size === selectedSize,
      )
    : undefined;

const availableStock =
  selectedVariant?.stock ?? 0;
  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

function increaseQuantity() {
  setQuantity((current) => {
    if (!selectedVariant) {
      return current;
    }

    return Math.min(
      current + 1,
      selectedVariant.stock,
    );
  });
}
// function handleAddToCart() {
//   setMessage(null);
//   setIsError(false);

//   if (!selectedVariant) {
//     setIsError(true);
//     setMessage(
//       "This color and size combination is unavailable.",
//     );
//     return;
//   }

//   if (!selectedVariant.isActive) {
//     setIsError(true);
//     setMessage(
//       "This product option is currently unavailable.",
//     );
//     return;
//   }

//   if (selectedVariant.stock <= 0) {
//     setIsError(true);
//     setMessage(
//       "This product option is out of stock.",
//     );
//     return;
//   }

//   startTransition(async () => {
//     const result = await addToCartAction({
//       variantId: selectedVariant.id,
//       quantity,
//     });

//     setIsError(!result.success);
//     setMessage(result.message);
//   });
// }
function handleAddToCart() {
  setMessage(null);
  setIsError(false);

  if (selectedColor === null) {
    setIsError(true);
    setMessage(
      "Please select a color before adding this product to your cart.",
    );
    return;
  }

  if (!selectedSize) {
    setIsError(true);
    setMessage(
      "Please select a size before adding this product to your cart.",
    );
    return;
  }

  if (!selectedVariant) {
    setIsError(true);
    setMessage(
      "This color and size combination is currently unavailable.",
    );
    return;
  }

  if (!selectedVariant.isActive) {
    setIsError(true);
    setMessage(
      "This product option is currently unavailable.",
    );
    return;
  }

  if (selectedVariant.stock <= 0) {
    setIsError(true);
    setMessage(
      "This product option is currently out of stock.",
    );
    return;
  }

  if (quantity > selectedVariant.stock) {
    setIsError(true);
    setMessage(
      `Only ${selectedVariant.stock} item${
        selectedVariant.stock === 1
          ? ""
          : "s"
      } currently available.`,
    );
    return;
  }

  startTransition(async () => {
    const result = await addToCartAction({
      variantId: selectedVariant.id,
      quantity,
    });

    setIsError(!result.success);

    setMessage(
      result.success
        ? "Product added to cart successfully."
        : result.message,
    );
  });
}

  return (
    <div className="w-full min-w-0">
      {message && (
  <div
    className="
      fixed
      left-[16px]
      right-[16px]
      top-[92px]
      z-[9999]

      overflow-hidden
      rounded-[12px]
      border
      border-black/10
      bg-white

      shadow-[0_12px_40px_rgba(0,0,0,0.16)]

      min-[800px]:left-auto
      min-[800px]:right-[28px]
      min-[800px]:top-[110px]
      min-[800px]:w-[390px]
    "
    style={{
      fontFamily: "var(--font-satoshi)",
    }}
  >
    <div
      className="
        flex
        min-h-[82px]
        items-center
        gap-[13px]
        px-[18px]
        py-[16px]
        pr-[48px]
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
              ? "bg-red-50 text-[#DC2626]"
              : "bg-black text-white"
          }
        `}
      >
        {isError ? (
          <AlertCircle
            className="size-[19px]"
            strokeWidth={2.2}
          />
        ) : (
          <CheckCircle2
            className="size-[19px]"
            strokeWidth={2.2}
          />
        )}
      </div>

      <div className="min-w-0">
        <p
          className="
            m-0
            text-[15px]
            leading-[20px]
            font-semibold
            text-black
          "
        >
          {isError
            ? "Unable to add product"
            : "Added to cart"}
        </p>

        <p
          className="
            m-0
            mt-[3px]
            text-[13px]
            leading-[18px]
            text-black/55
          "
        >
          {message}
        </p>
      </div>

      <button
        type="button"
        aria-label="Close notification"
        onClick={() => {
          setMessage(null);
          setIsError(false);
        }}
        className="
          absolute
          right-[14px]
          top-[14px]

          flex
          h-[26px]
          w-[26px]
          items-center
          justify-center

          rounded-full
          border-0
          bg-transparent
          p-0
          text-black/40

          transition-colors
          hover:bg-black/5
          hover:text-black
        "
      >
        <X className="size-[17px]" />
      </button>
    </div>

    <div
      className={`
        h-[3px]
        w-full

        ${
          isError
            ? "bg-[#DC2626]"
            : "bg-black"
        }
      `}
    />
  </div>
)}
      {message && (
  <div
    className={`
      fixed
      left-1/2
      top-[24px]
      z-[9999]

      flex
      min-h-[52px]
w-[calc(100%_-_32px)]
      max-w-[420px]
      -translate-x-1/2
      items-center
      justify-center

      rounded-[12px]
      px-[20px]
      py-[14px]

      text-center
      text-[15px]
      leading-[21px]
      font-medium
      text-white

      shadow-[0_12px_35px_rgba(0,0,0,0.22)]

      ${
        isError
          ? "bg-[#DC2626]"
          : "bg-black"
      }
    `}
    style={{
      fontFamily: "var(--font-satoshi)",
    }}
  >
    {message}
  </div>
)}
      {/* =================================================
          TITLE
      ================================================== */}

    {/* =================================================
    TITLE
================================================== */}

<h1
  className="
    m-0
    w-full

    text-[24px]
    leading-[28px]
    tracking-[0]
    text-black

    min-[800px]:text-[32px]
    min-[800px]:leading-[36px]

    min-[1200px]:w-[600px]
    min-[1200px]:max-w-[600px]
    min-[1200px]:whitespace-nowrap
    min-[1200px]:text-[40px]
    min-[1200px]:leading-[40px]
  "
  style={{
    fontFamily: "var(--font-archivo-black)",
    fontWeight: 400,
  }}
>
  {/* MOBILE */}
  <span className="min-[800px]:hidden">
    ONE LIFE GRAPHIC
    <br />
    T-SHIRT
  </span>

  {/* TABLET + DESKTOP */}
  <span className="hidden min-[800px]:inline">
    {product.name}
  </span>
</h1>

      {/* =================================================
          RATING
      ================================================== */}

      <div className="mt-[12px] flex items-center gap-[10px]">
        <div className="flex items-center gap-[3px] text-[#FFC633]">
          <span className="text-[20px] leading-none">★</span>
          <span className="text-[20px] leading-none">★</span>
          <span className="text-[20px] leading-none">★</span>
          <span className="text-[20px] leading-none">★</span>
          <span className="text-[20px] leading-none">★</span>
        </div>

        <span
          className="
            text-[14px]
            leading-[20px]
            text-black
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 400,
          }}
        >
          {product.rating}/
          <span className="text-black/60">
            5
          </span>
        </span>
      </div>

      {/* =================================================
          PRICE
      ================================================== */}

      <div
        className="
          mt-[12px]
          flex
          items-center
          gap-[10px]
        "
      >
        <span
          className="
            text-[24px]
            leading-[30px]
            text-black

            min-[1200px]:text-[32px]
            min-[1200px]:leading-[38px]
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 700,
          }}
        >
          ${product.price}
        </span>

        {product.oldPrice && (
          <span
            className="
              text-[24px]
              leading-[30px]
              text-black/30
              line-through

              min-[1200px]:text-[32px]
              min-[1200px]:leading-[38px]
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 700,
            }}
          >
            ${product.oldPrice}
          </span>
        )}

        {product.discount && (
          <span
            className="
              flex
              h-[34px]
              items-center
              justify-center

              rounded-[62px]
              bg-[#FF3333]/10
              px-[14px]

              text-[14px]
              leading-[20px]
              text-[#FF3333]
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 500,
            }}
          >
            -{product.discount}%
          </span>
        )}
      </div>

      {/* =================================================
          DESCRIPTION
      ================================================== */}
{/* =================================================
    DESCRIPTION
================================================== */}

<p
  className="
    m-0
    mt-[16px]
    w-full

    text-[14px]
    leading-[20px]
    text-black/60

    min-[1200px]:max-w-[590px]
    min-[1200px]:text-[16px]
    min-[1200px]:leading-[22px]
  "
  style={{
    fontFamily: "var(--font-satoshi)",
    fontWeight: 400,
  }}
>
  {product.description}
</p>

{/* DIVIDER: DESCRIPTION → COLORS */}
<div
  className="
    mt-[20px]
    mb-[20px]
    h-px
    w-full
    bg-black/10

    min-[1200px]:mt-[20px]
    min-[1200px]:mb-[20px]
  "
/>
      {/* =================================================
    COLORS
================================================== */}

<div>
  <p
    className="
      m-0

      text-[16px]
      leading-[22px]
      text-black/60
    "
    style={{
      fontFamily: "var(--font-satoshi)",
      fontWeight: 400,
    }}
  >
    Select Colors
  </p>

  <div
    className="
      mt-[16px]
      flex
      items-center
      gap-[16px]
    "
  >
    {product.colors.map((color, index) => (
      <button
        key={color.name}
        type="button"
        aria-label={color.name}
        onClick={() => setSelectedColor(index)}
        className="
          flex
          h-[37px]
          w-[37px]
          shrink-0
          items-center
          justify-center

          rounded-full
          border-0
          p-0
          outline-none

          min-[1200px]:h-[37px]
          min-[1200px]:w-[37px]
        "
        style={{
          backgroundColor: color.value,
        }}
      >
        {selectedColor === index && (
          
          <span
            className="
              text-[18px]
              leading-none
              text-white
            "
          >
            ✓
          </span>
        )}
      </button>
    ))}
  </div>
</div>

{/* DIVIDER: COLORS → SIZE */}
<div
  className="
    mt-[20px]
    mb-[20px]
    h-px
    w-full
    bg-black/10
  "
/>
   {/* =================================================
    SIZE
================================================== */}

<div>
  <p
    className="
      m-0
      text-[16px]
      leading-[22px]
      text-black/60
    "
    style={{
      fontFamily: "var(--font-satoshi)",
      fontWeight: 400,
    }}
  >
    Choose Size
  </p>

  <div
    className="
      mt-[16px]
      flex
      h-[42px]
      w-full
      items-center
      gap-[8px]

      min-[1200px]:h-[46px]
      min-[1200px]:w-[420px]
      min-[1200px]:gap-[12px]
    "
  >
    {product.sizes.map((size) => {
      const selected = selectedSize === size;

      return (
        <button
          key={size}
          type="button"
          // onClick={() => setSelectedSize(size)}
       onClick={() => {
  setSelectedSize(size);
  setQuantity(1);
  setMessage(null);
}}
          className={`
            flex
            h-[42px]
            min-w-0
            flex-1
            items-center
            justify-center
            whitespace-nowrap
            rounded-[62px]

            !border-0
            !outline-none

            text-[14px]
            leading-[20px]

            min-[1200px]:h-[46px]
            min-[1200px]:flex-none
            min-[1200px]:text-[16px]
            min-[1200px]:leading-[22px]

            ${
              size === "Small"
                ? "min-[1200px]:w-[86px]"
                : size === "Medium"
                  ? "min-[1200px]:w-[105px]"
                  : size === "Large"
                    ? "min-[1200px]:w-[86px]"
                    : "min-[1200px]:w-[107px]"
            }

            ${
              selected
                ? "!bg-black !text-white"
                : "!bg-[#F0F0F0] !text-black/60"
            }
          `}
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 400,
            border: "none",
            outline: "none",
          }}
        >
          {size}
        </button>
      );
    })}
  </div>
</div>

{/* LINE BELOW SIZE */}
<div className="my-[20px] h-px w-full bg-black/10" />
{/* =================================================
    QUANTITY + ADD TO CART
================================================== */}

<div
  className="
    flex
    w-full
    items-center
    gap-[12px]

    mb-[40px]

    min-[800px]:mb-[48px]

    min-[1200px]:gap-[20px]
    min-[1200px]:mb-[60px]
  "
>
  {/* QUANTITY */}
  <div
    className="
      flex
      h-[44px]
      w-[110px]
      shrink-0
      items-center
      justify-between

      rounded-[62px]
      bg-[#F0F0F0]
      px-[16px]

      min-[1200px]:h-[52px]
      min-[1200px]:w-[170px]
      min-[1200px]:px-[20px]
    "
  >
    <button
      type="button"
      onClick={decreaseQuantity}
      className="
        border-0
        bg-transparent
        p-0
        outline-none

        text-[24px]
        leading-none
        text-black
      "
    >
      −
    </button>

    <span
      className="
        text-[14px]
        leading-[20px]
        text-black

        min-[1200px]:text-[16px]
      "
      style={{
        fontFamily: "var(--font-satoshi)",
        fontWeight: 500,
      }}
    >
      {quantity}
    </span>

    <button
      type="button"
      onClick={increaseQuantity}
      className="
        border-0
        bg-transparent
        p-0
        outline-none

        text-[26px]
        leading-none
        text-black
      "
    >
      +
    </button>
  </div>

  {/* ADD TO CART
  <button
    type="button"
    className="
      flex
      h-[44px]
      min-w-0
      flex-1
      items-center
      justify-center

      rounded-[62px]
      !border-0
      !bg-black
      px-[16px]

      text-[14px]
      leading-[20px]
      !text-white

      min-[1200px]:h-[52px]
      min-[1200px]:text-[16px]
      min-[1200px]:leading-[22px]
    "
    style={{
      fontFamily: "var(--font-satoshi)",
      fontWeight: 500,
      border: "none",
    }}
  >
    Add to Cart
  </button> */}

 <button
  type="button"
  onClick={handleAddToCart}
  disabled={
    isPending ||
    (selectedVariant !== undefined &&
      selectedVariant.stock <= 0)
  }
  className="
    flex
    h-[44px]
    min-w-0
    flex-1
    items-center
    justify-center

    rounded-[62px]
    border-0
    px-[16px]

    text-[14px]
    leading-[20px]
    font-medium
    text-white

    transition-opacity
    duration-200

    hover:opacity-90

    disabled:cursor-not-allowed
    disabled:opacity-50

    min-[1200px]:h-[52px]
    min-[1200px]:text-[16px]
    min-[1200px]:leading-[22px]
  "
  style={{
    fontFamily: "var(--font-satoshi)",
    fontWeight: 500,
    backgroundColor: "#000000",
    color: "#FFFFFF",
    border: "none",
  }}
>
  {isPending
    ? "Adding..."
    : selectedVariant !== undefined &&
        selectedVariant.stock <= 0
      ? "Out of Stock"
      : "Add to Cart"}
</button>
</div>
<div className="-mt-[28px] mb-[40px] min-[800px]:mb-[48px] min-[1200px]:mb-[60px]">
  {selectedVariant && (
    <p
      className="
        text-[13px]
        leading-[18px]
        text-black/50
      "
      style={{
        fontFamily: "var(--font-satoshi)",
      }}
    >
      {selectedVariant.stock > 0
        ? `${selectedVariant.stock} available`
        : "Out of stock"}
    </p>
  )}
</div>
</div>
  );
}