import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Men",
    slug: "men",

    image:
      "/images/categories/men.jpg",

    description:
      "Explore men's clothing, essentials and everyday styles.",
  },

  {
    title: "Women",
    slug: "women",

    image:
      "/images/categories/women.jpg",

    description:
      "Discover women's fashion, new styles and wardrobe essentials.",
  },

  {
    title: "Kids",
    slug: "kids",

    image:
      "/images/categories/kids.jpg",

    description:
      "Shop comfortable and stylish clothing for kids.",
  },
];

export default function CategoryPage() {
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
          min-[800px]:pt-[32px]

          min-[1200px]:max-w-[1240px]
          min-[1200px]:px-0
          min-[1200px]:pt-[40px]
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
            Shop
          </span>
        </div>

        {/* =====================================
            PAGE HEADING
        ====================================== */}

        <div className="mt-[24px]">
          <h1
            className="
              m-0

              text-[32px]
              leading-[38px]
              text-black

              min-[800px]:text-[40px]
              min-[800px]:leading-[46px]

              min-[1200px]:text-[48px]
              min-[1200px]:leading-[54px]
            "
            style={{
              fontFamily:
                "var(--font-archivo-black)",

              fontWeight: 400,
            }}
          >
            SHOP BY CATEGORY
          </h1>

          <p
            className="
              mt-[8px]

              max-w-[640px]

              text-[14px]
              leading-[21px]
              text-black/55

              min-[800px]:text-[16px]
              min-[800px]:leading-[22px]
            "
            style={{
              fontFamily:
                "var(--font-satoshi)",

              fontWeight: 400,
            }}
          >
            Browse our collections and find
            the right styles for everyone.
          </p>
        </div>

        {/* =====================================
            CATEGORY CARDS
        ====================================== */}

        <div
          className="
            mt-[32px]

            grid
            grid-cols-1

            gap-[18px]

            min-[700px]:grid-cols-2

            min-[1100px]:grid-cols-3
            min-[1100px]:gap-[22px]
          "
        >
          {categories.map(
            (category) => (
              <Link
                key={
category.slug                }
href={`/category/${category.slug}`}
                className="
                  group

                  overflow-hidden

                  rounded-[20px]

                  bg-white

                  no-underline

                  shadow-[0_3px_14px_rgba(0,0,0,0.06)]

                  transition-all
                  duration-300

                  hover:-translate-y-[4px]
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]
                "
                style={{
                  border:
                    "1.5px solid rgba(0,0,0,0.10)",
                }}
              >
                {/* ==============================
                    IMAGE
                =============================== */}

                <div
                  className="
                    relative

                    h-[310px]
                    w-full

                    overflow-hidden

                    bg-[#F0EEED]

                    min-[800px]:h-[360px]

                    min-[1200px]:h-[385px]
                  "
                >
             <Image
  src={category.image}
  alt={category.title}
  fill
  sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 33vw"
  className="
    object-cover
    object-center

    transition-transform
    duration-500

    group-hover:scale-[1.035]
  "
/>

                  {/* SUBTLE IMAGE GRADIENT */}

                  <div
                    className="
                      pointer-events-none

                      absolute
                      inset-x-0
                      bottom-0

                      h-[70px]

                      bg-gradient-to-t
                      from-black/10
                      to-transparent
                    "
                  />
                </div>

                {/* ==============================
                    CONTENT
                =============================== */}

                <div
                  className="
                    flex
                    min-h-[142px]
                    items-start
                    justify-between
                    gap-[18px]

                    bg-white

                    px-[20px]
                    py-[20px]

                    min-[1200px]:
                    min-h-[150px]
                  "
                >
                  <div className="min-w-0">
                    <h2
                      className="
                        m-0

                        text-[24px]
                        leading-[30px]
                        font-bold
                        text-black

                        min-[1200px]:
                        text-[26px]
                      "
                      style={{
                        fontFamily:
                          "var(--font-satoshi)",
                      }}
                    >
                      {
                        category.title
                      }
                    </h2>

                    <p
                      className="
                        mt-[7px]

                        max-w-[260px]

                        text-[13px]
                        leading-[20px]
                        text-black/55

                        min-[1200px]:
                        text-[14px]
                      "
                      style={{
                        fontFamily:
                          "var(--font-satoshi)",
                      }}
                    >
                      {
                        category.description
                      }
                    </p>
                  </div>

                  {/* ARROW */}

                  <div
                    className="
                      mt-[4px]

                      flex
                      h-[44px]
                      w-[44px]
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      bg-black

                      text-white

                      transition-transform
                      duration-300

                      group-hover:
                      translate-x-[3px]
                    "
                  >
                    <ArrowIcon />
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      </section>
    </main>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10H16M11 5L16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}