import Image from "next/image";
import Link from "next/link";

import type { CategoryProduct } from "@/data/category-products";

type CategoryProductCardProps = {
  product: CategoryProduct;
};

export default function CategoryProductCard({
  product,
}: CategoryProductCardProps) {
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="
        block
        min-w-0
        text-black
        no-underline
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          aspect-[295/298]
          w-full
          overflow-hidden
          rounded-[13px]
          bg-[#F0EEED]

          min-[800px]:rounded-[20px]
        "
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="
            (max-width: 799px) 50vw,
            (max-width: 1199px) 33vw,
            295px
          "
          className="object-contain"
        />
      </div>

      {/* NAME */}
      <h3
        className="
          mt-[10px]
          truncate
          text-[14px]
          leading-[18px]

          min-[800px]:text-[16px]
          min-[800px]:leading-[22px]

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
      <div className="mt-[4px] flex items-center gap-[6px]">
        <div
          className="
            flex
            items-center
            text-[14px]
            leading-none
            text-[#FFC633]

            min-[800px]:text-[16px]
            min-[1200px]:text-[18px]
          "
        >
          {Array.from({ length: fullStars }).map((_, index) => (
            <span key={index}>★</span>
          ))}

          {hasHalfStar && <span>◐</span>}
        </div>

        <span
          className="
            text-[12px]
            text-black/60

            min-[1200px]:text-[14px]
          "
          style={{
            fontFamily: "var(--font-satoshi)",
          }}
        >
          {product.rating.toFixed(1)}/5
        </span>
      </div>

      {/* PRICE */}
      <div
        className="
          mt-[5px]
          flex
          flex-wrap
          items-center
          gap-[5px]

          min-[1200px]:gap-[10px]
        "
      >
        <span
          className="
            text-[20px]
            leading-[24px]

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
              text-[18px]
              leading-[24px]
              text-black/40
              line-through

              min-[1200px]:text-[24px]
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
              rounded-full
              bg-[#FF3333]/10
              px-[8px]
              py-[4px]
              text-[10px]
              leading-[12px]
              text-[#FF3333]

              min-[1200px]:px-[14px]
              min-[1200px]:py-[6px]
              min-[1200px]:text-[12px]
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
  );
}