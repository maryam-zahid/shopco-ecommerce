"use client";

import {
  useEffect,
  useState,
  useTransition,
} from "react";

import {
  removeCartItemAction,
  updateCartQuantityAction,
} from "@/actions/cart.actions";

import CartItems from "./cart-items";
import OrderSummary from "./order-summary";

export type CartItemData = {
  id: string;
  variantId: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  stock: number;
};

type CartCouponData = {
  code: string;

  discountType:
    | "PERCENTAGE"
    | "FIXED";

  discountValue: number;

  minimumOrderAmount:
    | number
    | null;
};

type CartPageProps = {
  initialItems: CartItemData[];

  initialCoupon:
    | CartCouponData
    | null;
};

export default function CartPage({
  initialItems,
  initialCoupon,
}: CartPageProps) {
  const [items, setItems] =
    useState<CartItemData[]>(
      initialItems,
    );

  const [message, setMessage] =
    useState<string | null>(null);

  const [isError, setIsError] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    if (!message) return;

    const timeout =
      window.setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 2500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [message]);

  function increaseQuantity(
    id: string,
  ) {
    const item = items.find(
      (current) =>
        current.id === id,
    );

    if (!item) return;

    if (
      item.quantity >= item.stock
    ) {
      setIsError(true);

      setMessage(
        `Only ${item.stock} item${
          item.stock === 1
            ? ""
            : "s"
        } available.`,
      );

      return;
    }

    const newQuantity =
      item.quantity + 1;

    startTransition(async () => {
      const result =
        await updateCartQuantityAction({
          cartItemId: id,
          quantity: newQuantity,
        });

      if (!result.success) {
        setIsError(true);
        setMessage(result.message);
        return;
      }

      setItems((current) =>
        current.map(
          (cartItem) =>
            cartItem.id === id
              ? {
                  ...cartItem,
                  quantity:
                    newQuantity,
                }
              : cartItem,
        ),
      );

      setIsError(false);
      setMessage(
        "Cart updated.",
      );
    });
  }

  function decreaseQuantity(
    id: string,
  ) {
    const item = items.find(
      (current) =>
        current.id === id,
    );

    if (
      !item ||
      item.quantity <= 1
    ) {
      return;
    }

    const newQuantity =
      item.quantity - 1;

    startTransition(async () => {
      const result =
        await updateCartQuantityAction({
          cartItemId: id,
          quantity: newQuantity,
        });

      if (!result.success) {
        setIsError(true);
        setMessage(result.message);
        return;
      }

      setItems((current) =>
        current.map(
          (cartItem) =>
            cartItem.id === id
              ? {
                  ...cartItem,
                  quantity:
                    newQuantity,
                }
              : cartItem,
        ),
      );

      setIsError(false);
      setMessage(
        "Cart updated.",
      );
    });
  }

  function removeItem(
    id: string,
  ) {
    startTransition(async () => {
      const result =
        await removeCartItemAction({
          cartItemId: id,
        });

      if (!result.success) {
        setIsError(true);
        setMessage(result.message);
        return;
      }

      setItems((current) =>
        current.filter(
          (item) =>
            item.id !== id,
        ),
      );

      setIsError(false);
      setMessage(
        "Item removed.",
      );
    });
  }

  /*
   * =====================================
   * AUTHORITATIVE DISPLAY SUBTOTAL
   * =====================================
   *
   * Product discounts / price overrides
   * are already represented in item.price.
   */

  const subtotal =
    items.reduce(
      (runningTotal, item) =>
        runningTotal +
        item.price *
          item.quantity,
      0,
    );

  /*
   * =====================================
   * COUPON DISCOUNT
   * =====================================
   */

  let discount = 0;

  if (
    initialCoupon &&
    (
      initialCoupon
        .minimumOrderAmount ===
        null ||
      subtotal >=
        initialCoupon
          .minimumOrderAmount
    )
  ) {
    if (
      initialCoupon
        .discountType ===
      "PERCENTAGE"
    ) {
      discount =
        subtotal *
        (initialCoupon
          .discountValue /
          100);
    } else {
      discount =
        initialCoupon
          .discountValue;
    }

    /*
     * Discount can never make
     * subtotal negative.
     */
    discount = Math.min(
      discount,
      subtotal,
    );
  }

  const deliveryFee =
    items.length > 0
      ? 15
      : 0;

  const total =
    subtotal -
    discount +
    deliveryFee;

  return (
    <main className="w-full bg-white">
      {/* =====================================
          CART TOAST
      ====================================== */}

      {message && (
        <div
          className={`
            fixed
            left-1/2
            top-[24px]
            z-[9999]

            w-[calc(100%_-_32px)]
            max-w-[390px]

            -translate-x-1/2

            rounded-[12px]

            px-[20px]
            py-[13px]

            text-center
            text-[14px]
            text-white

            shadow-[0_12px_35px_rgba(0,0,0,0.20)]

            ${
              isError
                ? "bg-red-600"
                : "bg-black"
            }
          `}
          style={{
            fontFamily:
              "var(--font-satoshi)",

            fontWeight: 500,
          }}
        >
          {message}
        </div>
      )}

      <section
        className="
          mx-auto
          w-full

          px-[16px]
          pb-[72px]
          pt-[24px]

          min-[800px]:px-[32px]

          min-[1200px]:max-w-[1440px]
          min-[1200px]:px-[100px]
          min-[1200px]:pb-[80px]
          min-[1200px]:pt-[24px]
        "
      >
        {/* BREADCRUMB */}

        <div
          className="
            flex
            items-center
            gap-[8px]

            text-[14px]
            leading-[20px]
            text-black/60

            min-[1200px]:text-[16px]
            min-[1200px]:leading-[22px]
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",

            fontWeight: 400,
          }}
        >
          <span>
            Home
          </span>

          <span className="text-[18px]">
            ›
          </span>

          <span className="text-black">
            Cart
          </span>
        </div>

        {/* HEADING */}

        <h1
          className="
            m-0
            mt-[24px]

            text-[32px]
            leading-[36px]
            text-black

            min-[800px]:text-[36px]
            min-[800px]:leading-[40px]

            min-[1200px]:text-[40px]
            min-[1200px]:leading-[48px]
          "
          style={{
            fontFamily:
              "var(--font-archivo-black)",

            fontWeight: 400,
          }}
        >
          YOUR CART
        </h1>

        {/* CART CONTENT */}

        <div
          className="
            mt-[20px]

            flex
            flex-col
            gap-[20px]

            min-[1200px]:grid
            min-[1200px]:grid-cols-[715px_505px]
            min-[1200px]:items-start
            min-[1200px]:gap-[20px]
          "
        >
          <CartItems
            items={items}
            onIncrease={
              increaseQuantity
            }
            onDecrease={
              decreaseQuantity
            }
            onRemove={
              removeItem
            }
            isPending={
              isPending
            }
          />

          <OrderSummary
            subtotal={
              subtotal
            }
            discount={
              discount
            }
            deliveryFee={
              deliveryFee
            }
            total={
              total
            }
            isEmpty={
              items.length === 0
            }
            appliedCouponCode={
              initialCoupon?.code ??
              null
            }
          />
        </div>
      </section>
    </main>
  );
}