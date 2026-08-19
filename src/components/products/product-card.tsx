
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/ui/star-rating";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article
      className="
        w-[198px]
        shrink-0

        min-[800px]:w-[240px]

        min-[1200px]:w-[270px]

        min-[1440px]:w-[295px]
      "
    >
      {/* =================================================
          PRODUCT IMAGE
      ================================================== */}

     
<Link
  href={`/product/${product.slug}`}
  prefetch={false}        className="
          relative
          block
          h-[200px]
          w-[198px]
          overflow-hidden
          rounded-[13px]
          bg-[#F0EEED]

          min-[800px]:h-[242px]
          min-[800px]:w-[240px]
          min-[800px]:rounded-[16px]

          min-[1200px]:h-[273px]
          min-[1200px]:w-[270px]

          min-[1440px]:h-[298px]
          min-[1440px]:w-[295px]
          min-[1440px]:rounded-[20px]
        "
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="
            (max-width: 799px) 198px,
            (max-width: 1199px) 240px,
            (max-width: 1439px) 270px,
            295px
          "
          className="object-contain"
        />
      </Link>

      {/* =================================================
          PRODUCT NAME
      ================================================== */}
 <Link
  href={`/product/${product.slug}`}
  prefetch={false}
    >

        <h3
          className="
            m-0
            mt-[10px]
            whitespace-nowrap
            text-[16px]
            leading-[20px]
            text-black

            min-[800px]:mt-[12px]
            min-[800px]:text-[18px]

            min-[1440px]:text-[20px]
            min-[1440px]:leading-[20px]
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 700,
          }}
        >
          {product.name}
        </h3>
      </Link>

      {/* =================================================
          RATING
      ================================================== */}

      <div className="mt-[4px] min-[1440px]:mt-[8px]">
        <StarRating rating={product.rating} />
      </div>

      {/* =================================================
          PRICE
      ================================================== */}

      <div
        className="
          mt-[4px]
          flex
          items-center
          gap-[5px]

          min-[800px]:gap-[8px]

          min-[1440px]:mt-[8px]
          min-[1440px]:gap-[10px]
        "
      >
        <span
          className="
            whitespace-nowrap
            text-[20px]
            leading-[24px]
            text-black

            min-[800px]:text-[22px]

            min-[1440px]:text-[24px]
            min-[1440px]:leading-[24px]
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 700,
          }}
        >
          ${product.price}
        </span>

{product.originalPrice !== undefined && (          <span
            className="
              whitespace-nowrap
              text-[20px]
              leading-[24px]
              text-black/40
              line-through

              min-[800px]:text-[22px]

              min-[1440px]:text-[24px]
              min-[1440px]:leading-[24px]
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 700,
            }}
          >
            ${product.originalPrice}
          </span>
        )}

{product.discount !== undefined &&
  product.discount > 0 && (
              <span
            className="
              flex
              h-[20px]
              items-center
              justify-center

              whitespace-nowrap
              rounded-[62px]
              bg-[#FF3333]/10
              px-[8px]

              text-[10px]
              leading-[14px]
              text-[#FF3333]

              min-[800px]:h-[24px]
              min-[800px]:px-[10px]

              min-[1440px]:h-[28px]
              min-[1440px]:px-[14px]
              min-[1440px]:text-[12px]
              min-[1440px]:leading-[16px]
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
    </article>
  );
}