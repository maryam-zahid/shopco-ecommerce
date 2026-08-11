"use client";

import { useState } from "react";

type CategoryFiltersProps = {
  onClose?: () => void;
  mobile?: boolean;
};

const categories = [
  "T-shirts",
  "Shorts",
  "Shirts",
  "Hoodie",
  "Jeans",
];

const colors = [
  "#00C12B",
  "#F50606",
  "#F5DD06",
  "#F57906",
  "#06CAF5",
  "#063AF5",
  "#7D06F5",
  "#F506A4",
  "#FFFFFF",
  "#000000",
];

const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const dressStyles = ["Casual", "Formal", "Party", "Gym"];

export default function CategoryFilters({
  onClose,
  mobile = false,
}: CategoryFiltersProps) {
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(200);

  const [selectedColor, setSelectedColor] =
    useState("#063AF5");

  const [selectedSize, setSelectedSize] =
    useState("Large");

  const [selectedStyle, setSelectedStyle] =
    useState("Casual");

  const min = 0;
  const max = 250;

  const minPercent =
    ((minPrice - min) / (max - min)) * 100;

  const maxPercent =
    ((maxPrice - min) / (max - min)) * 100;

  function handleMinPrice(value: number) {
    const next = Math.min(value, maxPrice - 10);
    setMinPrice(next);
  }

  function handleMaxPrice(value: number) {
    const next = Math.max(value, minPrice + 10);
    setMaxPrice(next);
  }

  return (
    <aside
      className={`
        w-full
        bg-white

        ${
          mobile
            ? `
              min-h-full
              px-[20px]
              pt-[20px]
              pb-[28px]
            `
            : `
              rounded-[20px]
              border
              border-black/10
              px-[24px]
              pt-[20px]
              pb-[28px]
            `
        }
      `}
    >
      {/* =========================================
          HEADER
      ========================================= */}

      <div className="flex items-center justify-between">
        <h2
          className="
            m-0
            text-[20px]
            leading-[27px]
            text-black
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 700,
          }}
        >
          Filters
        </h2>

        {mobile ? (
          <button
            type="button"
            aria-label="Close filters"
            onClick={onClose}
            className="
              flex
              h-[24px]
              w-[24px]
              items-center
              justify-center
              border-0
              bg-transparent
              p-0

              text-[30px]
              leading-[24px]
              text-black/40
            "
          >
            ×
          </button>
        ) : (
          <div className="text-black/40">
            <FilterIcon />
          </div>
        )}
      </div>

      <Divider />

      {/* =========================================
          PRODUCT TYPES
      ========================================= */}

      <div className="flex flex-col gap-[20px]">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className="
              flex
              w-full
              items-center
              justify-between

              border-0
              bg-transparent
              p-0

              text-[16px]
              leading-[22px]
              text-black/60
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 400,
            }}
          >
            <span>{category}</span>

            <ChevronRightIcon />
          </button>
        ))}
      </div>

      <Divider />

      {/* =========================================
          PRICE
      ========================================= */}

      <FilterTitle title="Price" />

      <div className="mt-[20px]">
        <div className="relative h-[28px]">
          {/* BASE */}
          <div
            className="
              absolute
              left-0
              right-0
              top-[10px]
              h-[6px]
              rounded-full
              bg-[#F0F0F0]
            "
          />

          {/* ACTIVE RANGE */}
          <div
            className="
              absolute
              top-[10px]
              h-[6px]
              rounded-full
              bg-black
            "
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          />

          {/* MIN INPUT */}
          <input
            type="range"
            min={min}
            max={max}
            value={minPrice}
            onChange={(event) =>
              handleMinPrice(Number(event.target.value))
            }
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-[28px]
              w-full
              appearance-none
              bg-transparent

              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:h-[20px]
              [&::-webkit-slider-thumb]:w-[20px]
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-black

              [&::-moz-range-thumb]:pointer-events-auto
              [&::-moz-range-thumb]:h-[20px]
              [&::-moz-range-thumb]:w-[20px]
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:bg-black
            "
          />

          {/* MAX INPUT */}
          <input
            type="range"
            min={min}
            max={max}
            value={maxPrice}
            onChange={(event) =>
              handleMaxPrice(Number(event.target.value))
            }
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-[28px]
              w-full
              appearance-none
              bg-transparent

              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:h-[20px]
              [&::-webkit-slider-thumb]:w-[20px]
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-black

              [&::-moz-range-thumb]:pointer-events-auto
              [&::-moz-range-thumb]:h-[20px]
              [&::-moz-range-thumb]:w-[20px]
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:bg-black
            "
          />
        </div>

        <div
          className="
            flex
            justify-between
            px-[22px]

            text-[14px]
            leading-[19px]
            text-black
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 500,
          }}
        >
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      <Divider />

      {/* =========================================
          COLORS
      ========================================= */}

      <FilterTitle title="Colors" />

      <div
        className="
          mt-[16px]
          grid
          grid-cols-7
          gap-x-[12px]
          gap-y-[12px]

          min-[1200px]:grid-cols-5
        "
      >
        {colors.map((color) => {
          const selected = selectedColor === color;

          return (
            <button
              type="button"
              key={color}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select ${color}`}
              className="
                flex
                h-[37px]
                w-[37px]
                items-center
                justify-center

                rounded-full
                border
                border-black/20
                p-0
              "
              style={{
                backgroundColor: color,
              }}
            >
              {selected && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12.5L9.5 17L19 7.5"
                    stroke={
                      color === "#FFFFFF"
                        ? "#000000"
                        : "#FFFFFF"
                    }
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      <Divider />
      {/* =========================================
          SIZE
      ========================================= */}

      <FilterTitle title="Size" />

      <div
        className="
          mt-[16px]
          flex
          w-full
          flex-wrap
          gap-[8px]
        "
      >
        {sizes.map((size) => {
          const selected = selectedSize === size;

          return (
            <button
              type="button"
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`
                !m-0
                !flex
                !h-[39px]
                !min-h-[39px]
                !items-center
                !justify-center

                !rounded-[62px]
                !border-0
                !px-[20px]
                !py-0

                text-[14px]
                leading-[19px]

                ${
                  selected
                    ? "!bg-black !text-white"
                    : "!bg-[#F0F0F0] !text-black/60"
                }
              `}
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 400,
              }}
            >
              {size}
            </button>
          );
        })}
      </div>

      <Divider />

      {/* =========================================
          DRESS STYLE
      ========================================= */}

      <FilterTitle title="Dress Style" />

      <div
        className="
          mt-[20px]
          flex
          w-full
          flex-col
          gap-[20px]
        "
      >
        {dressStyles.map((style) => {
          const selected = selectedStyle === style;

          return (
            <button
              type="button"
              key={style}
              onClick={() => setSelectedStyle(style)}
              className="
                !m-0
                !flex
                !h-[22px]
                !w-full
                !items-center
                !justify-between

                !border-0
                !bg-transparent
                !p-0

                text-left
                text-[16px]
                leading-[22px]
                !text-black/60
              "
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: selected ? 500 : 400,
              }}
            >
              <span>{style}</span>

              <ChevronRightIcon />
            </button>
          );
        })}
      </div>

      {/* =========================================
          APPLY FILTER
      ========================================= */}

      <button
        type="button"
        onClick={mobile ? onClose : undefined}
        className="
          !m-0
          !mt-[24px]

          !flex
          !h-[48px]
          !min-h-[48px]
          !w-full

          !items-center
          !justify-center

          !rounded-[62px]
          !border-0
          !bg-black

          !px-[24px]
          !py-0

          text-[14px]
          leading-[19px]
          !text-white

          cursor-pointer
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 500,
          backgroundColor: "#000000",
          color: "#FFFFFF",
          borderRadius: "62px",
        }}
      >
        Apply Filter
      </button>
    </aside>
  );
}

function Divider() {
  return (
    <div
      className="
        my-[24px]
        h-px
        w-full
        bg-black/10
      "
    />
  );
}

function FilterTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div
      className="
        flex
        h-[27px]
        w-full
        items-center
        justify-between
      "
    >
      <h3
        className="
          !m-0
          !p-0

          text-[20px]
          leading-[27px]
          !text-black
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 700,
        }}
      >
        {title}
      </h3>

      <ChevronUpIcon />
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-black/60"
    >
      <path
        d="M6 3L11 8L6 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3 10L8 5L13 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FilterIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 3V8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M6 12V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M3 10H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M12 3V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M12 17V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M9 15H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M18 3V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M18 10V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M15 8H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}