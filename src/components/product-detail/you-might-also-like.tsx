import Image from "next/image";
import Link from "next/link";

type SuggestedProduct = {
  id: number;
  name: string;
  slug: string;
  image: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: number;
};

const suggestedProducts: SuggestedProduct[] = [
  {
    id: 1,
    name: "Polo with Contrast Trims",
    slug: "polo-with-contrast-trims",
    image: "/images/products/recommended/polo-contrast.png",
    rating: 4.0,
    price: 212,
    oldPrice: 242,
    discount: 20,
  },
  {
    id: 2,
    name: "Gradient Graphic T-shirt",
    slug: "gradient-graphic-t-shirt",
    image: "/images/products/recommended/gradient-graphic.png",
    rating: 3.5,
    price: 145,
  },
  {
    id: 3,
    name: "Polo with Tipping Details",
    slug: "polo-with-tipping-details",
    image: "/images/products/recommended/polo-tipping.png",
    rating: 4.5,
    price: 180,
  },
  {
    id: 4,
    name: "Black Striped T-shirt",
    slug: "black-striped-t-shirt",
    image: "/images/products/recommended/black-striped.png",
    rating: 5.0,
    price: 120,
    oldPrice: 150,
    discount: 30,
  },
];

function RatingStars({
  rating,
}: {
  rating: number;
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-[3px] text-[#FFC633]">
        {Array.from({ length: fullStars }).map((_, index) => (
          <span
            key={index}
            className="
              text-[18px]
              leading-none

              min-[1200px]:text-[20px]
            "
          >
            ★
          </span>
        ))}

        {hasHalfStar && (
          <span
            className="
              inline-block
              w-[9px]
              overflow-hidden
              text-[18px]
              leading-none

              min-[1200px]:w-[10px]
              min-[1200px]:text-[20px]
            "
          >
            ★
          </span>
        )}
      </div>

      <span
        className="
          ml-[10px]
          whitespace-nowrap

          text-[14px]
          leading-[19px]
          text-black/60
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 400,
        }}
      >
        {rating.toFixed(1)}/5
      </span>
    </div>
  );
}

function SuggestedProductCard({
  product,
}: {
  product: SuggestedProduct;
}) {
  return (
    <article
      className="
        w-[198px]
        shrink-0

        min-[800px]:w-[260px]

        min-[1200px]:w-[295px]
      "
    >
      <Link
        href={`/product/${product.slug}`}
        className="block text-inherit no-underline"
      >
        {/* IMAGE */}
        <div
          className="
            relative
            h-[200px]
            w-full
            overflow-hidden
            rounded-[20px]
            bg-[#F0EEED]

            min-[800px]:h-[265px]

            min-[1200px]:h-[298px]
          "
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 799px) 198px, (max-width: 1199px) 260px, 295px"
            className="object-contain"
          />
        </div>

        {/* NAME */}
        <h3
          className="
            m-0
            mt-[10px]

            overflow-hidden
            whitespace-nowrap
            text-ellipsis

            text-[16px]
            leading-[22px]
            text-black

            min-[1200px]:mt-[16px]
            min-[1200px]:text-[20px]
            min-[1200px]:leading-[27px]
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 700,
          }}
        >
          {product.name}
        </h3>

        {/* RATING */}
        <div className="mt-[6px]">
          <RatingStars rating={product.rating} />
        </div>

        {/* PRICE */}
        <div
          className="
            mt-[6px]
            flex
            items-center
            gap-[8px]

            min-[1200px]:mt-[8px]
            min-[1200px]:gap-[10px]
          "
        >
          <span
            className="
              text-[20px]
              leading-[27px]
              text-black

              min-[1200px]:text-[24px]
              min-[1200px]:leading-[32px]
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
                text-[20px]
                leading-[27px]
                text-black/40
                line-through

                min-[1200px]:text-[24px]
                min-[1200px]:leading-[32px]
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
                h-[28px]
                items-center
                justify-center

                rounded-[62px]
                bg-[#FF3333]/10
                px-[10px]

                text-[12px]
                leading-[16px]
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
      </Link>
    </article>
  );
}

export default function YouMightAlsoLike() {
  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-white

        pb-[50px]
        pt-[40px]

        min-[800px]:pb-[64px]
        min-[800px]:pt-[56px]

        min-[1200px]:pb-[80px]
        min-[1200px]:pt-[64px]
      "
    >
      {/* =================================================
          HEADING
      ================================================== */}

      <h2
        className="
          mx-auto
          m-0

          w-[284px]

          text-center
          text-[32px]
          leading-[36px]
          tracking-[0]
          text-black

          min-[800px]:w-auto
          min-[800px]:text-[40px]
          min-[800px]:leading-[44px]

          min-[1200px]:text-[48px]
          min-[1200px]:leading-[48px]
        "
        style={{
          fontFamily: "var(--font-archivo-black)",
          fontWeight: 400,
        }}
      >
        YOU MIGHT ALSO LIKE
      </h2>

      {/* =================================================
          PRODUCTS
      ================================================== */}

      <div
        className="
          mt-[32px]
          overflow-x-auto

          pl-[16px]

          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          min-[800px]:mt-[40px]
          min-[800px]:pl-[32px]

          min-[1200px]:mt-[48px]
          min-[1200px]:overflow-visible
          min-[1200px]:px-0
        "
      >
        <div
          className="
            flex
            w-max
            gap-[16px]

            min-[800px]:gap-[20px]

            min-[1200px]:mx-auto
            min-[1200px]:w-[1240px]
          "
        >
          {suggestedProducts.map((product) => (
            <SuggestedProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}