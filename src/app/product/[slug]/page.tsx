
import { notFound } from "next/navigation";
import YouMightAlsoLike from "@/components/product-detail/you-might-also-like";
import ProductGallery from "@/components/product-detail/product-gallery";
import ProductInfo from "@/components/product-detail/product-info";
import ReviewsSection from "@/components/product-detail/reviews-section";

import {
  getProductBySlug,
  shopProducts,
} from "@/data/shop-products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return shopProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="w-full bg-white">
      {/* =================================================
          PRODUCT TOP SECTION
      ================================================== */}

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
        {/* =================================================
            BREADCRUMBS
        ================================================== */}

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
            fontFamily: "var(--font-satoshi)",
            fontWeight: 400,
          }}
        >
          {product.breadcrumb.map((item, index) => {
            const last =
              index === product.breadcrumb.length - 1;

            return (
              <div
                key={item}
                className="flex items-center gap-[12px]"
              >
                <span className={last ? "text-black" : ""}>
                  {item}
                </span>

                {!last && (
                  <span className="text-[20px] text-black/40">
                    ›
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* =================================================
            PRODUCT
        ================================================== */}

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

      {/* =================================================
          RATING & REVIEWS
      ================================================== */}

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