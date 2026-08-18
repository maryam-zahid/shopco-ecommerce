import ProductCard from "@/components/products/product-card";
import { prisma } from "@/lib/prisma";

export default async function NewArrivalsPage() {
  const products =
    await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        isNewArrival: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        variants: true,
        category: true,
        dressStyle: true,
      },
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

          min-[1440px]:max-w-[1240px]
          min-[1440px]:px-0
          min-[1440px]:py-[56px]
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
          NEW ARRIVALS
        </h1>

        <p
          className="
            mt-[8px]
            text-[14px]
            text-black/50
          "
        >
          Discover our latest products.
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
            No new arrivals available.
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
            {products.map((product) => (
           <ProductCard
  key={product.id}
  product={{
    id: product.id,
    slug: product.slug,
    name: product.name,

    image:
      product.images[0] ??
      "/images/products/t-shirt-with-tape-details.png",

    price: Number(
      product.discountPrice ??
        product.price,
    ),

    originalPrice:
      product.discountPrice !== null
        ? Number(product.price)
        : undefined,

    discount:
      product.discountPrice !== null
        ? Math.round(
            ((Number(product.price) -
              Number(product.discountPrice)) /
              Number(product.price)) *
              100,
          )
        : undefined,

    rating: 0,
  }}
/>  
            ))}
          </div>
        )}
      </section>
    </main>
  );
}