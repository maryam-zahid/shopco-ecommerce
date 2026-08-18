"use client";

import Link from "next/link";

import {
  Archive,
  Pencil,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useTransition,
} from "react";

import {
  updateProductStatusAction,
} from "@/actions/admin-product.actions";

type Props = {
  productId: string;
};

export default function AdminProductDetailActions({
  productId,
}: Props) {
  const router = useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function archiveProduct() {
    const confirmed =
      window.confirm(
        "Archive this product? It will no longer be available for sale.",
      );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result =
        await updateProductStatusAction(
          {
            productId,
            status:
              "ARCHIVED",
          },
        );

      if (!result.success) {
        window.alert(
          result.message,
        );

        return;
      }

      router.refresh();
    });
  }

  return (
    <div
      className="
        flex
        items-center
        gap-[9px]
      "
    >
      <Link
        href={`/admin/products/${productId}/edit`}
        className="
          inline-flex
          min-h-[42px]
          items-center
          justify-center
          gap-[8px]

          rounded-[7px]

          px-[15px]
          py-[9px]

          text-[13px]
          font-semibold
          leading-[18px]
        "
        style={{
          backgroundColor:
            "#0D0D0F",

          border:
            "1px solid #0D0D0F",

          color:
            "#FFFFFF",
        }}
      >
        <Pencil
          className="size-[16px]"
          style={{
            color:
              "#FFFFFF",
          }}
        />

        <span
          style={{
            color:
              "#FFFFFF",
          }}
        >
          Edit
        </span>
      </Link>

      <button
        type="button"
        disabled={isPending}
        onClick={archiveProduct}
        className="
          inline-flex
          h-[42px]
          w-[42px]
          items-center
          justify-center

          rounded-[7px]

          disabled:
          cursor-not-allowed

          disabled:
          opacity-50
        "
        style={{
          backgroundColor:
            "#EF001B",

          border:
            "1px solid #EF001B",

          color:
            "#FFFFFF",
        }}
        aria-label="Archive product"
      >
        <Archive
          className="size-[17px]"
          style={{
            color:
              "#FFFFFF",
          }}
        />
      </button>
    </div>
  );
}