"use client";

import { useState } from "react";
import type { ShopProduct } from "@/data/shop-products";

type ProductInfoProps = {
  product: ShopProduct;
};

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(0);

  const [selectedSize, setSelectedSize] = useState(
    product.selectedSize
  );

  const [quantity, setQuantity] = useState(1);

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  return (
    <div className="w-full min-w-0">
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
          onClick={() => setSelectedSize(size)}
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

  {/* ADD TO CART */}
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
  </button>
</div>
</div>
  );
}