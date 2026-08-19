import Link from "next/link";
import { notFound } from "next/navigation";

import ProductCard from "@/components/products/product-card";
import { prisma } from "@/lib/prisma";
import {
  getActiveProducts,
} from "@/services/product.service";

import type { Product } from "@/types";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    page?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    color?: string;
    size?: string;
  }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;

  const query = await searchParams;
/* =========================================
   CATEGORY / DRESS STYLE
========================================= */

const category =
  await prisma.category.findFirst({
    where: {
      slug,
      isActive: true,
    },

    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
    },
  });

const dressStyle =
  category
    ? null
    : await prisma.dressStyle.findFirst({
        where: {
          slug,
          isActive: true,
        },

        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
        },
      });

if (
  !category &&
  !dressStyle
) {
  notFound();
}

const activeCollection =
  category ??
  dressStyle!;

const isDressStyle =
  Boolean(dressStyle);

  /* =========================================
     QUERY VALUES
  ========================================= */

  const page =
    Number(query.page) > 0
      ? Number(query.page)
      : 1;

  const minPrice =
    query.minPrice &&
    !Number.isNaN(
      Number(query.minPrice),
    )
      ? Number(query.minPrice)
      : undefined;

  const maxPrice =
    query.maxPrice &&
    !Number.isNaN(
      Number(query.maxPrice),
    )
      ? Number(query.maxPrice)
      : undefined;

  const allowedSorts = [
    "newest",
    "price-low-high",
    "price-high-low",
  ] as const;

  type SortValue =
    (typeof allowedSorts)[number];

  const sort: SortValue =
    allowedSorts.includes(
      query.sort as SortValue,
    )
      ? (query.sort as SortValue)
      : "newest";

  /* =========================================
     PRODUCTS
  ========================================= */

 const result =
  await getActiveProducts({
    categorySlug:
      isDressStyle
        ? undefined
        : activeCollection.slug,

    dressStyleSlug:
      isDressStyle
        ? activeCollection.slug
        : undefined,

    page,

    pageSize: 9,

    sort,

    minPrice,

    maxPrice,

    color:
      query.color ||
      undefined,

    size:
      query.size ||
      undefined,
  });
  /* =========================================
     PRODUCT CARD MAPPING
  ========================================= */

  const products: Product[] =
    result.products.map(
      (product) => {
        const originalPrice =
          Number(product.price);

        const currentPrice =
          product.discountPrice !==
          null
            ? Number(
                product.discountPrice,
              )
            : originalPrice;

        const discount =
          product.discountPrice !==
            null &&
          originalPrice > 0
            ? Math.round(
                ((originalPrice -
                  currentPrice) /
                  originalPrice) *
                  100,
              )
            : undefined;

        return {
          id: product.id,

          slug:
            product.slug,

          name:
            product.name,

          image:
            product.images[0] ??
            "/images/products/placeholder.png",

          price:
            currentPrice,

          originalPrice:
            product.discountPrice !==
            null
              ? originalPrice
              : undefined,

          discount,

          rating: 0,
        };
      },
    );

  const {
    pagination,
  } = result;

  function createPageUrl(
    targetPage: number,
  ) {
    const params =
      new URLSearchParams();

    params.set(
      "page",
      String(targetPage),
    );

    if (
      query.sort &&
      query.sort !== "newest"
    ) {
      params.set(
        "sort",
        query.sort,
      );
    }

    if (query.minPrice) {
      params.set(
        "minPrice",
        query.minPrice,
      );
    }

    if (query.maxPrice) {
      params.set(
        "maxPrice",
        query.maxPrice,
      );
    }

    if (query.color) {
      params.set(
        "color",
        query.color,
      );
    }

    if (query.size) {
      params.set(
        "size",
        query.size,
      );
    }

    return `/category/${activeCollection.slug}?${params.toString()}`;
  }

  return (
    <main
      className="
        w-full
        bg-white
      "
    >
      <section
        className="
          mx-auto
          w-full

          px-[16px]
          pb-[80px]
          pt-[24px]

          min-[800px]:px-[32px]

          min-[1200px]:max-w-[1240px]
          min-[1200px]:px-0
          min-[1200px]:pt-[32px]
        "
      >
        {/* =====================================
            BREADCRUMB
        ====================================== */}

        <div
          className="
            flex
            items-center
            gap-[8px]

            text-[14px]
            leading-[20px]
            text-black/60
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
          }}
        >
          <Link
            href="/"
            className="
              transition-colors
              hover:text-black
            "
          >
            Home
          </Link>

          <span>›</span>

          <span className="text-black">
{activeCollection.name}
          </span>
        </div>

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div
          className="
            mt-[24px]

            flex
            flex-col
            gap-[12px]

            min-[800px]:flex-row
            min-[800px]:items-end
            min-[800px]:justify-between
          "
        >
          <div>
            <h1
              className="
                m-0

                text-[32px]
                leading-[38px]
                text-black

                min-[800px]:text-[40px]
                min-[800px]:leading-[46px]
              "
              style={{
                fontFamily:
                  "var(--font-archivo-black)",
              }}
            >
{activeCollection.name.toUpperCase()}
            </h1>

{activeCollection.description && (
  <p
    className="
      mt-[6px]

      max-w-[620px]

      text-[14px]
      leading-[20px]
      text-black/50
    "
    style={{
      fontFamily:
        "var(--font-satoshi)",
    }}
  >
    {activeCollection.description}
  </p>
)}
          </div>

          <p
            className="
              text-[14px]
              text-black/60
            "
            style={{
              fontFamily:
                "var(--font-satoshi)",
            }}
          >
            Showing{" "}
            <span className="font-medium text-black">
              {products.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-black">
              {pagination.total}
            </span>{" "}
            products
          </p>
        </div>

        {/* =====================================
            CONTENT
        ====================================== */}

        <div
          className="
            mt-[28px]

            grid
            grid-cols-1
            gap-[24px]

            min-[1000px]:
            grid-cols-[250px_minmax(0,1fr)]
          "
        >
          {/* =================================
              FILTER SIDEBAR
          ================================== */}

          <aside
            className="
              h-fit

              rounded-[20px]

              border
              border-black/10

              bg-white

              p-[20px]
            "
          >
            <div
              className="
                flex
                items-center
                justify-between

                border-b
                border-black/10

                pb-[18px]
              "
            >
              <h2
                className="
                  text-[20px]
                  font-bold
                  text-black
                "
                style={{
                  fontFamily:
                    "var(--font-satoshi)",
                }}
              >
                Filters
              </h2>

              <FilterIcon />
            </div>

            {/* PRICE */}

            <div
              className="
                border-b
                border-black/10

                py-[20px]
              "
            >
              <h3
                className="
                  text-[16px]
                  font-bold
                  text-black
                "
              >
                Price
              </h3>

              <form
                method="GET"
                className="
                  mt-[14px]
                  space-y-[10px]
                "
              >
                <input
                  type="hidden"
                  name="sort"
                  value={sort}
                />

                <input
                  type="number"
                  name="minPrice"
                  defaultValue={
                    query.minPrice
                  }
                  placeholder="Min price"
                  min="0"
                  className="
                    h-[42px]
                    w-full

                    rounded-[10px]

                    bg-white

                    px-[12px]

                    text-[13px]
                    text-black

                    outline-none

                    focus:border-black
                  "
                  style={{
                    border:
                      "1px solid rgba(0,0,0,0.18)",
                  }}
                />

                <input
                  type="number"
                  name="maxPrice"
                  defaultValue={
                    query.maxPrice
                  }
                  placeholder="Max price"
                  min="0"
                  className="
                    h-[42px]
                    w-full

                    rounded-[10px]

                    bg-white

                    px-[12px]

                    text-[13px]
                    text-black

                    outline-none

                    focus:border-black
                  "
                  style={{
                    border:
                      "1px solid rgba(0,0,0,0.18)",
                  }}
                />

               <button
  type="submit"
  className="
    flex
    h-[42px]
    w-full
    items-center
    justify-center

    rounded-[62px]

    text-[13px]
    font-medium

    transition-opacity
    hover:opacity-85
  "
  style={{
    backgroundColor: "#000000",
    color: "#FFFFFF",
    fontFamily: "var(--font-satoshi)",
  }}
>
  <span style={{ color: "#FFFFFF" }}>
    Apply Filter
  </span>
</button>
              </form>
            </div>

            {/* CATEGORY LINKS */}

            <div
              className="
                border-b
                border-black/10

                py-[20px]
              "
            >
              <h3
                className="
                  mb-[14px]

                  text-[16px]
                  font-bold
                  text-black
                "
              >
                Categories
              </h3>

              <div
                className="
                  flex
                  flex-col
                  gap-[12px]
                "
              >
              <CategoryLink
  label="Men"
  href="/category/men"
  active={
    !isDressStyle &&
    activeCollection.slug === "men"
  }
/>

<CategoryLink
  label="Women"
  href="/category/women"
  active={
    !isDressStyle &&
    activeCollection.slug === "women"
  }
/>

<CategoryLink
  label="Kids"
  href="/category/kids"
  active={
    !isDressStyle &&
    activeCollection.slug === "kids"
  }
/>
              </div>
            </div>

            {/* SIZE */}

            <div className="py-[20px]">
              <h3
                className="
                  mb-[14px]

                  text-[16px]
                  font-bold
                  text-black
                "
              >
                Size
              </h3>

              <div
                className="
                  flex
                  flex-wrap
                  gap-[8px]
                "
              >
                {[
                  "Small",
                  "Medium",
                  "Large",
                  "X-Large",
                ].map(
                  (size) => (
                    <Link
                      key={size}
                   href={`/category/${activeCollection.slug}?size=${encodeURIComponent(
  size,
)}`}
                     className={`
  flex
  h-[38px]
  items-center
  justify-center

  rounded-[62px]

  px-[14px]

  text-[12px]

  transition-colors
  duration-150

  ${
    query.size === size
      ? "!bg-black !text-white"
      : "!bg-[#F0F0F0] !text-black/60 hover:!bg-black hover:!text-white"
  }
`}
                    >
                      {size}
                    </Link>
                  ),
                )}
              </div>
            </div>

            {/* RESET */}

            <Link
href={`/category/${activeCollection.slug}`}              className="
                flex
                h-[42px]
                w-full
                items-center
                justify-center

                rounded-[62px]

                border
                border-black/10

                text-[13px]
                font-medium
                text-black

                transition-colors

                hover:bg-black/[0.04]
              "
            >
              Clear Filters
            </Link>
          </aside>

          {/* =================================
              PRODUCTS
          ================================== */}

          <div className="min-w-0">
            {/* SORT */}

            <div
              className="
                mb-[20px]

                flex
                items-center
                justify-between
                gap-[12px]
              "
            >
              <h2
                className="
                  text-[20px]
                  font-bold
                  text-black

                  min-[800px]:text-[24px]
                "
                style={{
                  fontFamily:
                    "var(--font-satoshi)",
                }}
              >
{activeCollection.name}
              </h2>

              <div
                className="
                  flex
                  items-center
                  gap-[6px]

                  text-[13px]
                  text-black/60
                "
              >
                <span className="hidden min-[600px]:inline">
                  Sort by:
                </span>

                <SortLinks
                  categorySlug={
   activeCollection.slug               }
                  currentSort={
                    sort
                  }
                />
              </div>
            </div>

            {/* PRODUCTS */}

            {products.length ===
            0 ? (
              <div
                className="
                  flex
                  min-h-[360px]
                  flex-col
                  items-center
                  justify-center

                  rounded-[20px]

                  border
                  border-black/10

                  px-[20px]

                  text-center
                "
              >
                <h3
                  className="
                    text-[22px]
                    font-bold
                    text-black
                  "
                >
                  No products found
                </h3>

                <p
                  className="
                    mt-[6px]

                    text-[14px]
                    text-black/50
                  "
                >
                  Try changing or
                  clearing your
                  filters.
                </p>

           <Link
  href={`/category/${activeCollection.slug}`}
  className="
    mt-[20px]
    inline-flex
    h-[48px]
    items-center
    justify-center

    rounded-full

    px-[32px]

    text-[14px]
    font-medium

    transition-opacity
    hover:opacity-90
  "
  style={{
    fontFamily:
      "var(--font-satoshi)",

    backgroundColor:
      "#000000",

    color:
      "#FFFFFF",
  }}
>
  <span
    style={{
      color:
        "#FFFFFF",
    }}
  >
    Clear Filters
  </span>
</Link>
              </div>
            ) : (
              <div
                className="
                  grid
                  grid-cols-2

                  gap-x-[14px]
                  gap-y-[32px]

                  min-[700px]:
                  grid-cols-3

                  min-[700px]:
                  gap-x-[18px]

                  min-[1200px]:
                  gap-x-[20px]
                "
              >
                {products.map(
                  (product) => (
                    <ProductCard
                      key={
                        product.id
                      }
                      product={
                        product
                      }
                    />
                  ),
                )}
              </div>
            )}

            {/* =================================
                PAGINATION
            ================================== */}

            {pagination.totalPages >
              1 && (
              <div
                className="
                  mt-[36px]

                  flex
                  items-center
                  justify-between

                  border-t
                  border-black/10

                  pt-[20px]
                "
              >
                {pagination.page >
                1 ? (
                  <Link
                    href={createPageUrl(
                      pagination.page -
                        1,
                    )}
                    className="
                      flex
                      h-[40px]
                      items-center
                      justify-center
                      gap-[6px]

                      rounded-[8px]

                      border
                      border-black/10

                      px-[14px]

                      text-[13px]
                      font-medium
                      text-black
                    "
                  >
                    ← Previous
                  </Link>
                ) : (
                  <div />
                )}

                <div
                  className="
                    text-[13px]
                    text-black/50
                  "
                >
                  Page{" "}
                  <strong className="text-black">
                    {
                      pagination.page
                    }
                  </strong>{" "}
                  of{" "}
                  <strong className="text-black">
                    {
                      pagination.totalPages
                    }
                  </strong>
                </div>

                {pagination.page <
                pagination.totalPages ? (
                  <Link
                    href={createPageUrl(
                      pagination.page +
                        1,
                    )}
                    className="
                      flex
                      h-[40px]
                      items-center
                      justify-center
                      gap-[6px]

                      rounded-[8px]

                      border
                      border-black/10

                      px-[14px]

                      text-[13px]
                      font-medium
                      text-black
                    "
                  >
                    Next →
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================
   CATEGORY LINK
========================================= */

function CategoryLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        flex
        items-center
        justify-between

        text-[14px]

        transition-colors

        ${
          active
            ? "font-semibold text-black"
            : "text-black/60 hover:text-black"
        }
      `}
    >
      <span>{label}</span>

      <span>›</span>
    </Link>
  );
}

/* =========================================
   SORT
========================================= */

function SortLinks({
  categorySlug,
  currentSort,
}: {
  categorySlug: string;

  currentSort:
    | "newest"
    | "price-low-high"
    | "price-high-low";
}) {
  return (
    <select
      defaultValue={
        currentSort
      }
      className="
        h-[38px]

        rounded-[8px]

        bg-white

        px-[10px]

        text-[13px]
        font-medium
        text-black

        outline-none
      "
      style={{
        border:
          "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <option value="newest">
        Most Recent
      </option>

      <option value="price-low-high">
        Price: Low to High
      </option>

      <option value="price-high-low">
        Price: High to Low
      </option>
    </select>
  );
}

/* =========================================
   FILTER ICON
========================================= */

function FilterIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 5H17.5M5 10H15M7.5 15H12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}