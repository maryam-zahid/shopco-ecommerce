import ProductCard from "@/components/products/product-card";

import {
  getTopSellingProducts,
} from "@/services/product.service";

import type { Product } from "@/types";

export default async function TopSellingPage() {
  const databaseProducts =
    await getTopSellingProducts(50);

  const products: Product[] =
    databaseProducts.map((product) => {
      const rating =
        product.reviews.length > 0
          ? product.reviews.reduce(
              (total, review) =>
                total + review.rating,
              0,
            ) /
            product.reviews.length
          : 0;

      const originalPrice =
        Number(product.price);

      const currentPrice =
        product.discountPrice !== null
          ? Number(
              product.discountPrice,
            )
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
          product.discountPrice !== null
            ? originalPrice
            : undefined,

        discount,

        rating,
      };
    });

  return (
    <main className="w-full bg-white">
      <section
        className="
          mx-auto
          w-full

          px-[16px]
          py-[40px]

          min-[800px]:px-[32px]

          min-[1200px]:max-w-[1240px]

          min-[1200px]:px-0
          min-[1200px]:py-[56px]
        "
      >
        <h1
          className="
            text-[32px]
            leading-[38px]
            text-black

            min-[800px]:text-[40px]
          "
          style={{
            fontFamily:
              "var(--font-archivo-black)",
          }}
        >
          TOP SELLING
        </h1>

        <p
          className="
            mt-[8px]

            text-[14px]
            text-black/50
          "
        >
          Browse our most popular products.
        </p>

        {products.length === 0 ? (
          <div
            className="
              mt-[32px]

              rounded-[16px]

              border
              border-black/10

              py-[70px]

              text-center
              text-black/50
            "
          >
            No top selling products available.
          </div>
        ) : (
          <div
            className="
              mt-[30px]

              grid
              grid-cols-2

              gap-x-[16px]
              gap-y-[32px]

              min-[800px]:grid-cols-3
              min-[800px]:gap-[20px]

              min-[1200px]:grid-cols-4
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
      </section>
    </main>
  );
}