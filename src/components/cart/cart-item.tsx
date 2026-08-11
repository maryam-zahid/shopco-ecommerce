import Image from "next/image";
import Link from "next/link";

import type { CartItemData } from "./cart-page";

type CartItemProps = {
  item: CartItemData;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div
      className="
        relative
        flex
        min-h-[124px]
        w-full
        gap-[16px]

        min-[1200px]:min-h-[124px]
      "
    >
      {/* IMAGE */}
      <Link
        href={`/product/${item.slug}`}
        className="
          relative
          h-[124px]
          w-[124px]
          shrink-0
          overflow-hidden
          rounded-[8px]
          bg-[#F0EEED]

          max-[799px]:h-[120px]
          max-[799px]:w-[120px]
        "
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="124px"
          className="object-contain"
        />
      </Link>

      {/* INFO */}
      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >
        <Link
          href={`/product/${item.slug}`}
          className="
            pr-[34px]
            text-[16px]
            leading-[22px]
            text-black
            no-underline

            min-[800px]:text-[18px]
            min-[800px]:leading-[24px]

            min-[1200px]:text-[20px]
            min-[1200px]:leading-[27px]
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
            fontWeight: 700,
          }}
        >
          {item.name}
        </Link>

        <p
          className="
            m-0
            mt-[2px]

            text-[14px]
            leading-[19px]
            text-black
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
            fontWeight: 400,
          }}
        >
          Size:{" "}
          <span className="text-black/60">
            {item.size}
          </span>
        </p>

        <p
          className="
            m-0
            mt-[2px]

            text-[14px]
            leading-[19px]
            text-black
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
            fontWeight: 400,
          }}
        >
          Color:{" "}
          <span className="text-black/60">
            {item.color}
          </span>
        </p>

        <div
          className="
            mt-auto
            flex
            items-end
            justify-between
            gap-[12px]
          "
        >
          <span
            className="
              text-[24px]
              leading-[32px]
              text-black
            "
            style={{
              fontFamily:
                "var(--font-satoshi)",
              fontWeight: 700,
            }}
          >
            ${item.price}
          </span>

          {/* QUANTITY */}
          <div
            className="
              flex
              h-[44px]
              min-w-[126px]
              items-center
              justify-between

              rounded-[62px]
              bg-[#F0F0F0]
              px-[16px]

              max-[799px]:h-[38px]
              max-[799px]:min-w-[128px]
            "
          >
            <button
              type="button"
              onClick={() =>
                onDecrease(item.id)
              }
              className="
                flex
                h-[24px]
                w-[24px]
                items-center
                justify-center
                border-0
                bg-transparent
                p-0
                text-[24px]
                text-black
              "
            >
              −
            </button>

            <span
              className="
                min-w-[20px]
                text-center
                text-[14px]
                leading-[19px]
              "
              style={{
                fontFamily:
                  "var(--font-satoshi)",
                fontWeight: 500,
              }}
            >
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                onIncrease(item.id)
              }
              className="
                flex
                h-[24px]
                w-[24px]
                items-center
                justify-center
                border-0
                bg-transparent
                p-0
                text-[24px]
                text-black
              "
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* DELETE */}
      <button
        type="button"
        onClick={() =>
          onRemove(item.id)
        }
        aria-label={`Remove ${item.name}`}
        className="
          absolute
          right-0
          top-0

          flex
          h-[24px]
          w-[24px]
          items-center
          justify-center

          border-0
          bg-transparent
          p-0
          text-[#FF3333]
        "
      >
        <TrashIcon />
      </button>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* handle */}
      <path
        d="M5 3V2C5 1.44772 5.44772 1 6 1H9C9.55228 1 10 1.44772 10 2V3"
        stroke="#FF3333"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* top bar */}
      <path
        d="M1 4H14"
        stroke="#FF3333"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* bin body */}
      <path
        d="M2.25 4.5H12.75L12 14.5C11.94 15.34 11.24 16 10.4 16H4.6C3.76 16 3.06 15.34 3 14.5L2.25 4.5Z"
        fill="#FF3333"
      />

      {/* white slots */}
      <path
        d="M5.5 7V13"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M9.5 7V13"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}