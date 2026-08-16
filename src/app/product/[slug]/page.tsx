
// import { notFound } from "next/navigation";
// import YouMightAlsoLike from "@/components/product-detail/you-might-also-like";
// import ProductGallery from "@/components/product-detail/product-gallery";
// import ProductInfo from "@/components/product-detail/product-info";
// import ReviewsSection from "@/components/product-detail/reviews-section";

// import {
//   getProductBySlug,
//   shopProducts,
// } from "@/data/shop-products";

// type ProductPageProps = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// export function generateStaticParams() {
//   return shopProducts.map((product) => ({
//     slug: product.slug,
//   }));
// }

// export default async function ProductPage({
//   params,
// }: ProductPageProps) {
//   const { slug } = await params;

//   const product = getProductBySlug(slug);

//   if (!product) {
//     notFound();
//   }

//   return (
//     <main className="w-full bg-white">
//       {/* =================================================
//           PRODUCT TOP SECTION
//       ================================================== */}

//       <section
//         className="
//           mx-auto
//           w-full

//           px-[16px]
//           pt-[20px]

//           min-[800px]:px-[32px]
//           min-[800px]:pt-[24px]

//           min-[1200px]:max-w-[1440px]
//           min-[1200px]:px-[100px]
//         "
//       >
//         {/* =================================================
//             BREADCRUMBS
//         ================================================== */}

//         <div
//           className="
//             mb-[20px]
//             flex
//             items-center
//             gap-[12px]

//             overflow-hidden
//             whitespace-nowrap

//             text-[14px]
//             leading-[22px]
//             text-black/60

//             min-[1200px]:mb-[24px]
//             min-[1200px]:text-[16px]
//           "
//           style={{
//             fontFamily: "var(--font-satoshi)",
//             fontWeight: 400,
//           }}
//         >
//           {product.breadcrumb.map((item, index) => {
//             const last =
//               index === product.breadcrumb.length - 1;

//             return (
//               <div
//                 key={item}
//                 className="flex items-center gap-[12px]"
//               >
//                 <span className={last ? "text-black" : ""}>
//                   {item}
//                 </span>

//                 {!last && (
//                   <span className="text-[20px] text-black/40">
//                     ›
//                   </span>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* =================================================
//             PRODUCT
//         ================================================== */}

//         <div
//           className="
//             flex
//             flex-col
//             gap-[20px]

//             min-[1200px]:grid
//             min-[1200px]:grid-cols-[610px_590px]
//             min-[1200px]:items-start
//             min-[1200px]:gap-[40px]
//           "
//         >
//           <ProductGallery
//             images={product.images}
//             productName={product.name}
//           />

//           <ProductInfo product={product} />
//         </div>
//       </section>

//       {/* =================================================
//           RATING & REVIEWS
//       ================================================== */}

//       <div
//         className="
//           mt-[40px]

//           min-[800px]:mt-[48px]

//           min-[1200px]:mt-[64px]
//         "
//       >
//         <ReviewsSection />
//       </div>
//       <YouMightAlsoLike />
//     </main>
//   );
// }

import { notFound } from "next/navigation";

import ProductGallery from "@/components/product-detail/product-gallery";
import ProductInfo from "@/components/product-detail/product-info";
import ReviewsSection from "@/components/product-detail/reviews-section";
import YouMightAlsoLike from "@/components/product-detail/you-might-also-like";

import { getProductBySlug } from "@/services/product.service";

import type { ProductDetail } from "@/types/product";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const databaseProduct =
    await getProductBySlug(slug);

  if (!databaseProduct) {
    notFound();
  }

  const originalPrice =
    Number(databaseProduct.price);

  const currentPrice =
    databaseProduct.discountPrice !== null
      ? Number(databaseProduct.discountPrice)
      : originalPrice;

  const discount =
    databaseProduct.discountPrice !== null &&
    originalPrice > 0
      ? Math.round(
          ((originalPrice - currentPrice) /
            originalPrice) *
            100,
        )
      : undefined;

  const rating =
    databaseProduct.reviews.length > 0
      ? databaseProduct.reviews.reduce(
          (total, review) =>
            total + review.rating,
          0,
        ) /
        databaseProduct.reviews.length
      : 0;

  const colors = Array.from(
    new Map(
      databaseProduct.variants.map(
        (variant) => [
          variant.colorName,
          {
            name: variant.colorName,
            value:
              variant.colorValue ??
              "#000000",
          },
        ],
      ),
    ).values(),
  );

  const sizes = Array.from(
    new Set(
      databaseProduct.variants.map(
        (variant) => variant.size,
      ),
    ),
  );

 const product: ProductDetail = {
  id: databaseProduct.id,
  slug: databaseProduct.slug,
  name: databaseProduct.name,

  description: databaseProduct.description,

  images:
    databaseProduct.images.length > 0
      ? databaseProduct.images
      : ["/images/products/t-shirt-with-tape-details.png"],

  price: currentPrice,

  oldPrice:
    databaseProduct.discountPrice !== null
      ? originalPrice
      : undefined,

  discount,

  rating,

  colors,

  sizes,

  selectedSize: sizes[0] ?? "",

  variants: databaseProduct.variants.map((variant) => ({
    id: variant.id,
    colorName: variant.colorName,
    colorValue: variant.colorValue ?? "#000000",
    size: variant.size,
    stock: variant.stock,
    isActive: variant.isActive,
  })),

  breadcrumb: [
    "Home",
    "Shop",
    databaseProduct.category.name,
    databaseProduct.name,
  ],
};

  return (
    <main className="w-full bg-white">
      <section
        className="
          mx-auto
          w-full

          px-[16px]
          pt-[20px]

          min-[800px]:px-[32px]
          min-[800px]:pt-[24px]

          min-[1200px]:max-w-[1440px]
          min-[1200px]:px-[100px]
        "
      >
        {/* BREADCRUMBS */}

        <div
          className="
            mb-[20px]
            flex
            items-center
            gap-[12px]

            overflow-hidden
            whitespace-nowrap

            text-[14px]
            leading-[22px]
            text-black/60

            min-[1200px]:mb-[24px]
            min-[1200px]:text-[16px]
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
            fontWeight: 400,
          }}
        >
          {product.breadcrumb.map(
            (item, index) => {
              const last =
                index ===
                product.breadcrumb.length - 1;

              return (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center gap-[12px]"
                >
                  <span
                    className={
                      last ? "text-black" : ""
                    }
                  >
                    {item}
                  </span>

                  {!last && (
                    <span className="text-[20px] text-black/40">
                      ›
                    </span>
                  )}
                </div>
              );
            },
          )}
        </div>

        {/* PRODUCT */}

        <div
          className="
            flex
            flex-col
            gap-[20px]

            min-[1200px]:grid
            min-[1200px]:grid-cols-[610px_590px]
            min-[1200px]:items-start
            min-[1200px]:gap-[40px]
          "
        >
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          <ProductInfo product={product} />
        </div>
      </section>

      <div
        className="
          mt-[40px]

          min-[800px]:mt-[48px]

          min-[1200px]:mt-[64px]
        "
      >
        <ReviewsSection />
      </div>

      <YouMightAlsoLike />
    </main>
  );
}