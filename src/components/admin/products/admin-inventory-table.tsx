"use client";

import {
  useEffect,
  useState,
  useTransition,
} from "react";

import {
  CheckCircle2,
  X,
} from "lucide-react";

import {
  toggleVariantActiveAction,
  updateVariantStockAction,
} from "@/actions/admin-product.actions";

type VariantRow = {
  id: string;

  productName: string;

  sku: string;

  colorName: string;

  size: string;

  stock: number;

  isActive: boolean;
};

type Props = {
  initialVariants: VariantRow[];
};

export default function AdminInventoryTable({
  initialVariants,
}: Props) {
  const [variants, setVariants] =
    useState(initialVariants);

  const [message, setMessage] =
    useState<string | null>(null);

  const [isError, setIsError] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    if (!message) return;

    const timer =
      window.setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 2500);

    return () =>
      window.clearTimeout(timer);
  }, [message]);

  function updateStock(
    variantId: string,
    stock: number,
  ) {
    startTransition(async () => {
      const result =
        await updateVariantStockAction({
          variantId,
          stock,
        });

      setIsError(!result.success);
      setMessage(result.message);

      if (!result.success) {
        return;
      }

      setVariants((current) =>
        current.map((variant) =>
          variant.id === variantId
            ? {
                ...variant,
                stock,
              }
            : variant,
        ),
      );
    });
  }

  function toggleActive(
    variantId: string,
    isActive: boolean,
  ) {
    startTransition(async () => {
      const result =
        await toggleVariantActiveAction({
          variantId,
          isActive,
        });

      setIsError(!result.success);
      setMessage(result.message);

      if (!result.success) {
        return;
      }

      setVariants((current) =>
        current.map((variant) =>
          variant.id === variantId
            ? {
                ...variant,
                isActive,
              }
            : variant,
        ),
      );
    });
  }

  return (
    <>
      {message && (
        <div
          className="
            fixed
            right-[24px]
            top-[24px]
            z-[9999]

            w-[380px]
            max-w-[calc(100%_-_32px)]

            overflow-hidden

            rounded-[12px]

            border
            border-black/10

            bg-white

            shadow-[0_12px_40px_rgba(0,0,0,0.16)]
          "
        >
          <div className="flex min-h-[76px] items-center gap-[12px] px-[18px]">
            <div
              className={`
                flex
                h-[32px]
                w-[32px]
                items-center
                justify-center
                rounded-full

                ${
                  isError
                    ? "bg-red-50 text-red-600"
                    : "bg-black text-white"
                }
              `}
            >
              {isError ? (
                <X className="size-[18px]" />
              ) : (
                <CheckCircle2 className="size-[18px]" />
              )}
            </div>

            <p className="text-[14px] font-medium text-black">
              {message}
            </p>
          </div>

          <div
            className={
              isError
                ? "h-[3px] bg-red-600"
                : "h-[3px] bg-black"
            }
          />
        </div>
      )}

      <div
        className="
          overflow-x-auto
          rounded-[14px]
          border
          border-black/10
          bg-white
        "
      >
        <table className="w-full min-w-[1000px] border-collapse">
          <thead className="bg-[#F8F8F8]">
            <tr>
              <Header>Product</Header>
              <Header>SKU</Header>
              <Header>Color</Header>
              <Header>Size</Header>
              <Header>Stock</Header>
              <Header>Active</Header>
            </tr>
          </thead>

          <tbody>
            {variants.map((variant) => (
              <tr
                key={variant.id}
                className="border-t border-black/10"
              >
                <Cell>
                  <span className="font-semibold text-black">
                    {variant.productName}
                  </span>
                </Cell>

                <Cell>
                  {variant.sku}
                </Cell>

                <Cell>
                  {variant.colorName}
                </Cell>

                <Cell>
                  {variant.size}
                </Cell>

                <Cell>
                  <input
                    type="number"
                    min={0}
                    defaultValue={variant.stock}
                    disabled={isPending}
                    onBlur={(event) => {
                      const stock =
                        Number(
                          event.target.value,
                        );

                      if (
                        Number.isInteger(stock) &&
                        stock >= 0 &&
                        stock !== variant.stock
                      ) {
                        updateStock(
                          variant.id,
                          stock,
                        );
                      }
                    }}
                    className="
                      h-[38px]
                      w-[90px]

                      rounded-[7px]

                      border
                      border-black/20

                      bg-white

                      px-[10px]

                      text-[13px]
                      text-black

                      outline-none

                      focus:border-black
                    "
                  />
                </Cell>

                <Cell>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() =>
                      toggleActive(
                        variant.id,
                        !variant.isActive,
                      )
                    }
                    className={`
                      relative

                      h-[26px]
                      w-[46px]

                      rounded-full

                      ${
                        variant.isActive
                          ? "bg-black"
                          : "bg-black/15"
                      }
                    `}
                  >
                    <span
                      className={`
                        absolute
                        top-[3px]

                        h-[20px]
                        w-[20px]

                        rounded-full
                        bg-white

                        transition-all

                        ${
                          variant.isActive
                            ? "left-[23px]"
                            : "left-[3px]"
                        }
                      `}
                    />
                  </button>
                </Cell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Header({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th
      className="
        px-[16px]
        py-[13px]
        text-left
        text-[11px]
        font-semibold
        uppercase
        text-black/50
      "
    >
      {children}
    </th>
  );
}

function Cell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <td
      className="
        px-[16px]
        py-[14px]
        text-[13px]
        text-black/60
      "
    >
      {children}
    </td>
  );
}