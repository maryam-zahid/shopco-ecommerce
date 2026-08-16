
// import Link from "next/link";
// import ProductCard from "@/components/products/product-card";
// import SectionHeading from "@/components/ui/section-heading";
// import { newArrivals } from "@/data/products";

// export default function NewArrivalsSection() {
//   return (
//     <section
//       id="new-arrivals"
//       className="
//         w-full
//         bg-white
//         pt-[50px]

//         min-[800px]:pt-[58px]
//         min-[1200px]:pt-[64px]
//         min-[1920px]:pt-[72px]
//       "
//     >
//       <div
//         className="
//           mx-auto
//           w-full
//           px-[16px]

//           min-[800px]:px-[32px]

//           min-[1200px]:px-[40px]

//           min-[1440px]:max-w-[1240px]
//           min-[1440px]:px-0
//         "
//       >
//         {/* =================================================
//             HEADING
//         ================================================== */}

//         <SectionHeading
//           className="
//             mx-auto
//             w-[269px]

//             min-[800px]:w-auto

//             min-[1440px]:w-[403px]
//           "
//         >
//           NEW ARRIVALS
//         </SectionHeading>

//         {/* =================================================
//             PRODUCT ROW
//         ================================================== */}

//         <div
//           className="
//             mt-[32px]
//             flex
//             w-full
//             gap-[16px]
//             overflow-x-auto
//             pb-[4px]

//             [scrollbar-width:none]
//             [&::-webkit-scrollbar]:hidden

//             min-[800px]:mt-[40px]
//             min-[800px]:gap-[18px]

//             min-[1200px]:gap-[20px]

//             min-[1440px]:mt-[55px]
//             min-[1440px]:grid
//             min-[1440px]:grid-cols-4
//             min-[1440px]:gap-[20px]
//             min-[1440px]:overflow-visible
//           "
//         >
//           {newArrivals.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//             />
//           ))}
//         </div>

//         {/* =================================================
//             VIEW ALL
//         ================================================== */}

//         <div
//           className="
//             mt-[24px]
//             flex
//             justify-center

//             min-[800px]:mt-[32px]

//             min-[1440px]:mt-[36px]
//           "
//         >
//           <Link
//             href="/category"
//             className="
//               flex
//               h-[46px]
//               w-full
//               items-center
//               justify-center

//               rounded-[62px]
//               border
//               border-black/10

//               text-[14px]
//               leading-[19px]
//               text-black

//               min-[800px]:w-[180px]

//               min-[1440px]:h-[52px]
//               min-[1440px]:w-[218px]
//               min-[1440px]:text-[16px]
//               min-[1440px]:leading-[22px]
//             "
//             style={{
//               fontFamily: "var(--font-satoshi)",
//               fontWeight: 500,
//             }}
//           >
//             View All
//           </Link>
//         </div>

//         {/* =================================================
//             FIGMA DIVIDER
//             1240px × 1px
//         ================================================== */}

//         <div
//           className="
//             mt-[40px]
//             h-px
//             w-full
//             bg-black/10

//             min-[800px]:mt-[52px]

//             min-[1440px]:mt-[64px]
//           "
//         />
//       </div>
//     </section>
//   );
// }


import Link from "next/link";

import ProductCard from "@/components/products/product-card";
import SectionHeading from "@/components/ui/section-heading";

import { getNewArrivalProducts } from "@/services/product.service";

import type { Product } from "@/types";

export default async function NewArrivalsSection() {
  const databaseProducts =
    await getNewArrivalProducts(4);

  const products: Product[] =
    databaseProducts.map((product) => {
      const rating =
        product.reviews.length > 0
          ? product.reviews.reduce(
              (total, review) =>
                total + review.rating,
              0,
            ) / product.reviews.length
          : 0;

      const originalPrice =
        Number(product.price);

      const currentPrice =
        product.discountPrice !== null
          ? Number(product.discountPrice)
          : originalPrice;

      const discount =
        product.discountPrice !== null &&
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
        slug: product.slug,
        name: product.name,

        image:
          product.images[0] ??
          "/images/products/placeholder.png",

        price: currentPrice,

        originalPrice:
          product.discountPrice !== null
            ? originalPrice
            : undefined,

        discount,

        rating,
      };
    });

  return (
    <section
      id="new-arrivals"
      className="
        w-full
        bg-white
        pt-[50px]

        min-[800px]:pt-[58px]
        min-[1200px]:pt-[64px]
        min-[1920px]:pt-[72px]
      "
    >
      <div
        className="
          mx-auto
          w-full
          px-[16px]

          min-[800px]:px-[32px]

          min-[1200px]:px-[40px]

          min-[1440px]:max-w-[1240px]
          min-[1440px]:px-0
        "
      >
        <SectionHeading
          className="
            mx-auto
            w-[269px]

            min-[800px]:w-auto

            min-[1440px]:w-[403px]
          "
        >
          NEW ARRIVALS
        </SectionHeading>

        <div
          className="
            mt-[32px]
            flex
            w-full
            gap-[16px]
            overflow-x-auto
            pb-[4px]

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            min-[800px]:mt-[40px]
            min-[800px]:gap-[18px]

            min-[1200px]:gap-[20px]

            min-[1440px]:mt-[55px]
            min-[1440px]:grid
            min-[1440px]:grid-cols-4
            min-[1440px]:gap-[20px]
            min-[1440px]:overflow-visible
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div
          className="
            mt-[24px]
            flex
            justify-center

            min-[800px]:mt-[32px]

            min-[1440px]:mt-[36px]
          "
        >
          <Link
            href="/category"
            className="
              flex
              h-[46px]
              w-full
              items-center
              justify-center

              rounded-[62px]
              border
              border-black/10

              text-[14px]
              leading-[19px]
              text-black

              min-[800px]:w-[180px]

              min-[1440px]:h-[52px]
              min-[1440px]:w-[218px]
              min-[1440px]:text-[16px]
              min-[1440px]:leading-[22px]
            "
            style={{
              fontFamily:
                "var(--font-satoshi)",
              fontWeight: 500,
            }}
          >
            View All
          </Link>
        </div>

        <div
          className="
            mt-[40px]
            h-px
            w-full
            bg-black/10

            min-[800px]:mt-[52px]

            min-[1440px]:mt-[64px]
          "
        />
      </div>
    </section>
  );
}