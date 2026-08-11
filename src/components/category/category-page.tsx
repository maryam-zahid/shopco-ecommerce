"use client";

import { useEffect, useState } from "react";

import { casualProducts } from "@/data/category-products";

import CategoryFilters, {
  FilterIcon,
} from "./category-filters";

import CategoryPagination from "./category-pagination";
import CategoryProductCard from "./category-product-card";

export default function CategoryPage() {
  const [desktopFiltersOpen, setDesktopFiltersOpen] =
    useState(true);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  return (
    <>
      <main className="w-full bg-white">
        <section
          className="
            mx-auto
            w-full

            px-[16px]
            pt-[24px]
            pb-[64px]

            min-[800px]:px-[32px]

            min-[1200px]:max-w-[1440px]
            min-[1200px]:px-[100px]
            min-[1200px]:pt-[24px]
            min-[1200px]:pb-[80px]
          "
        >
          {/* =========================================
              BREADCRUMB
          ========================================= */}

          <div
            className="
              flex
              items-center
              gap-[8px]

              text-[14px]
              leading-[20px]
              text-black/60

              min-[1200px]:text-[16px]
              min-[1200px]:leading-[22px]
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 400,
            }}
          >
            <span>Home</span>

            <span className="text-[18px]">›</span>

            <span className="text-black">Casual</span>
          </div>

          {/* =========================================
              CONTENT
          ========================================= */}

          <div
            className="
              mt-[20px]

              min-[1200px]:flex
              min-[1200px]:items-start
              min-[1200px]:gap-[20px]
            "
          >
            {/* DESKTOP SIDEBAR */}

            <div
              className={`
                hidden
                shrink-0
                overflow-hidden

                transition-[width,opacity]
                duration-300

                min-[1200px]:block

                ${
                  desktopFiltersOpen
                    ? "min-[1200px]:w-[295px] min-[1200px]:opacity-100"
                    : "min-[1200px]:w-0 min-[1200px]:opacity-0"
                }
              `}
            >
              <div className="w-[295px]">
                <CategoryFilters />
              </div>
            </div>

            {/* =========================================
                RIGHT SIDE
            ========================================= */}

            <div className="min-w-0 flex-1">
              {/* HEADER */}

              <div
                className="
                  flex
                  items-end
                  justify-between
                  gap-[12px]
                "
              >
                {/* MOBILE / LEFT */}

                <div
                  className="
                    flex
                    min-w-0
                    items-baseline
                    gap-[8px]
                  "
                >
                  <h1
                    className="
                      m-0
                      shrink-0

                      text-[24px]
                      leading-[32px]
                      text-black

                      min-[1200px]:text-[32px]
                      min-[1200px]:leading-[43px]
                    "
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      fontWeight: 700,
                    }}
                  >
                    Casual
                  </h1>

                  {/* MOBILE COUNT */}

                  <span
                    className="
                      truncate
                      text-[14px]
                      leading-[20px]
                      text-black/60

                      min-[1200px]:hidden
                    "
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      fontWeight: 400,
                    }}
                  >
                    Showing 1-10 of 100 Products
                  </span>
                </div>

                {/* MOBILE FILTER */}

                <button
                  type="button"
                  aria-label="Open filters"
                  onClick={() =>
                    setMobileFiltersOpen(true)
                  }
                  className="
                    flex
                    h-[40px]
                    w-[40px]
                    shrink-0
                    items-center
                    justify-center

                    rounded-full
                    border-0
                    bg-[#F0F0F0]
                    p-0
                    text-black

                    min-[1200px]:hidden
                  "
                >
                  <FilterIcon />
                </button>

                {/* DESKTOP STATUS */}

                <div
                  className="
                    hidden
                    items-center
                    gap-[12px]

                    min-[1200px]:flex
                  "
                >
                  <span
                    className="
                      text-[16px]
                      leading-[22px]
                      text-black/60
                    "
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      fontWeight: 400,
                    }}
                  >
                    Showing 1-10 of 100 Products
                  </span>

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-[6px]
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
                    <span>Sort by:</span>

                    <strong
                      className="text-black"
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      Most Popular
                    </strong>

                    <ChevronDownIcon />
                  </button>

                  {/* DESKTOP FILTER TOGGLE */}

                  <button
                    type="button"
                    aria-label="Toggle filters"
                    onClick={() =>
                      setDesktopFiltersOpen(
                        (value) => !value,
                      )
                    }
                    className="
                      flex
                      h-[40px]
                      w-[40px]
                      shrink-0
                      items-center
                      justify-center

                      rounded-full
                      border-0
                      bg-[#F0F0F0]
                      p-0
                      text-black
                    "
                  >
                    <FilterIcon />
                  </button>
                </div>
              </div>

              {/* =========================================
                  GRID
              ========================================= */}

              <div
                className={`
                  mt-[20px]
                  grid
                  grid-cols-2
                  gap-x-[14px]
                  gap-y-[24px]

                  min-[800px]:grid-cols-3
                  min-[800px]:gap-x-[20px]
                  min-[800px]:gap-y-[32px]

                  ${
                    desktopFiltersOpen
                      ? "min-[1200px]:grid-cols-3"
                      : "min-[1200px]:grid-cols-4"
                  }
                `}
              >
                {casualProducts.map((product) => (
                  <CategoryProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>

              <CategoryPagination />
            </div>
          </div>
        </section>
      </main>

      {/* =========================================
          MOBILE FILTER
      ========================================= */}

      {mobileFiltersOpen && (
        <div
          className="
            fixed
            inset-x-0
            bottom-0
            top-[98px]
            z-[100]

            overflow-y-auto
            bg-white

            min-[800px]:top-[105px]

            min-[1200px]:hidden
          "
        >
          <CategoryFilters
            mobile
            onClose={() =>
              setMobileFiltersOpen(false)
            }
          />
        </div>
      )}
    </>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3 6L8 11L13 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}