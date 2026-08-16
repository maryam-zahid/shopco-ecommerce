// "use client";

// import { useState } from "react";

// import CartItems from "./cart-items";
// import OrderSummary from "./order-summary";

// export type CartItemData = {
//   id: number;
//   slug: string;
//   name: string;
//   image: string;
//   size: string;
//   color: string;
//   price: number;
//   quantity: number;
// };

// const initialItems: CartItemData[] = [
//   {
//     id: 1,
//     slug: "gradient-graphic-t-shirt",
//     name: "Gradient Graphic T-shirt",
//     image:
//       "/images/products/recommended/gradient-graphic.png",
//     size: "Large",
//     color: "White",
//     price: 145,
//     quantity: 1,
//   },
//   {
//     id: 2,
//     slug: "checkered-shirt",
//     name: "Checkered Shirt",
//     image: "/images/products/checkered-shirt.png",
//     size: "Medium",
//     color: "Red",
//     price: 180,
//     quantity: 1,
//   },
//   {
//     id: 3,
//     slug: "skinny-fit-jeans",
//     name: "Skinny Fit Jeans",
//     image: "/images/products/skinny-fit-jeans.png",
//     size: "Large",
//     color: "Blue",
//     price: 240,
//     quantity: 1,
//   },
// ];

// export default function CartPage() {
//   const [items, setItems] =
//     useState<CartItemData[]>(initialItems);

//   function increaseQuantity(id: number) {
//     setItems((current) =>
//       current.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity: item.quantity + 1,
//             }
//           : item,
//       ),
//     );
//   }

//   function decreaseQuantity(id: number) {
//     setItems((current) =>
//       current.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity: Math.max(
//                 1,
//                 item.quantity - 1,
//               ),
//             }
//           : item,
//       ),
//     );
//   }

//   function removeItem(id: number) {
//     setItems((current) =>
//       current.filter((item) => item.id !== id),
//     );
//   }

//   const subtotal = items.reduce(
//     (total, item) =>
//       total + item.price * item.quantity,
//     0,
//   );

//   const discount = Math.round(subtotal * 0.2);
//   const deliveryFee = items.length > 0 ? 15 : 0;

//   const total =
//     subtotal - discount + deliveryFee;

//   return (
//     <main className="w-full bg-white">
//       <section
//         className="
//           mx-auto
//           w-full

//           px-[16px]
//           pt-[24px]
//           pb-[72px]

//           min-[800px]:px-[32px]

//           min-[1200px]:max-w-[1440px]
//           min-[1200px]:px-[100px]
//           min-[1200px]:pt-[24px]
//           min-[1200px]:pb-[80px]
//         "
//       >
//         {/* BREADCRUMB */}
//         <div
//           className="
//             flex
//             items-center
//             gap-[8px]

//             text-[14px]
//             leading-[20px]
//             text-black/60

//             min-[1200px]:text-[16px]
//             min-[1200px]:leading-[22px]
//           "
//           style={{
//             fontFamily: "var(--font-satoshi)",
//             fontWeight: 400,
//           }}
//         >
//           <span>Home</span>

//           <span className="text-[18px]">
//             ›
//           </span>

//           <span className="text-black">
//             Cart
//           </span>
//         </div>

//         {/* HEADING */}
//         <h1
//           className="
//             m-0
//             mt-[24px]

//             text-[32px]
//             leading-[36px]
//             text-black

//             min-[800px]:text-[36px]
//             min-[800px]:leading-[40px]

//             min-[1200px]:text-[40px]
//             min-[1200px]:leading-[48px]
//           "
//           style={{
//             fontFamily:
//               "var(--font-archivo-black)",
//             fontWeight: 400,
//           }}
//         >
//           YOUR CART
//         </h1>

//         {/* CART CONTENT */}
//         <div
//           className="
//             mt-[20px]
//             flex
//             flex-col
//             gap-[20px]

//             min-[1200px]:grid
//             min-[1200px]:grid-cols-[715px_505px]
//             min-[1200px]:items-start
//             min-[1200px]:gap-[20px]
//           "
//         >
//           <CartItems
//             items={items}
//             onIncrease={increaseQuantity}
//             onDecrease={decreaseQuantity}
//             onRemove={removeItem}
//           />

//           <OrderSummary
//             subtotal={subtotal}
//             discount={discount}
//             deliveryFee={deliveryFee}
//             total={total}
//           />
//         </div>
//       </section>
//     </main>
//   );
// }

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

type CartPageProps = {
  initialItems: CartItemData[];
};

export default function CartPage({
  initialItems,
}: CartPageProps) {
  const [items, setItems] =
    useState<CartItemData[]>(initialItems);

  const [message, setMessage] =
    useState<string | null>(null);

  const [isError, setIsError] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    if (!message) return;

    const timeout = window.setTimeout(() => {
      setMessage(null);
      setIsError(false);
    }, 2500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [message]);

  function increaseQuantity(id: string) {
    const item = items.find(
      (current) => current.id === id,
    );

    if (!item) return;

    if (item.quantity >= item.stock) {
      setIsError(true);
      setMessage(
        `Only ${item.stock} item${
          item.stock === 1 ? "" : "s"
        } available.`,
      );
      return;
    }

    const newQuantity = item.quantity + 1;

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
        current.map((cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,
                quantity: newQuantity,
              }
            : cartItem,
        ),
      );

      setIsError(false);
      setMessage("Cart updated.");
    });
  }

  function decreaseQuantity(id: string) {
    const item = items.find(
      (current) => current.id === id,
    );

    if (!item || item.quantity <= 1) {
      return;
    }

    const newQuantity = item.quantity - 1;

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
        current.map((cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,
                quantity: newQuantity,
              }
            : cartItem,
        ),
      );

      setIsError(false);
      setMessage("Cart updated.");
    });
  }

  function removeItem(id: string) {
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
          (item) => item.id !== id,
        ),
      );

      setIsError(false);
      setMessage("Item removed.");
    });
  }

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  );

  // Product discounts are already reflected
  // in each item's database price.
  const discount = 0;

  const deliveryFee =
    items.length > 0 ? 15 : 0;

  const total =
    subtotal - discount + deliveryFee;

  return (
    <main className="w-full bg-white">
      {/* TEMPORARY CART MESSAGE */}
      {message && (
        <div
          className={`
            fixed
            left-1/2
            top-[24px]
            z-[100]
            -translate-x-1/2
            rounded-[12px]
            px-[20px]
            py-[12px]
            text-[14px]
            text-white
            shadow-lg

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
          pt-[24px]
          pb-[72px]

          min-[800px]:px-[32px]

          min-[1200px]:max-w-[1440px]
          min-[1200px]:px-[100px]
          min-[1200px]:pt-[24px]
          min-[1200px]:pb-[80px]
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
          <span>Home</span>

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
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeItem}
            isPending={isPending}
          />

          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            deliveryFee={deliveryFee}
            total={total}
            isEmpty={items.length === 0}
          />
        </div>
      </section>
    </main>
  );
}