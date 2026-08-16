// import type { CartItemData } from "./cart-page";
// import CartItem from "./cart-item";

// type CartItemsProps = {
//   items: CartItemData[];
//   onIncrease: (id: number) => void;
//   onDecrease: (id: number) => void;
//   onRemove: (id: number) => void;
// };

// export default function CartItems({
//   items,
//   onIncrease,
//   onDecrease,
//   onRemove,
// }: CartItemsProps) {
//   return (
//     <div
//       className="
//         w-full

//         rounded-[20px]
//         border
//         border-black/10
//         bg-white

//         px-[14px]
//         py-[14px]

//         min-[1200px]:px-[24px]
//         min-[1200px]:py-[20px]
//       "
//     >
//       {items.length === 0 ? (
//         <div
//           className="
//             flex
//             min-h-[200px]
//             items-center
//             justify-center

//             text-[16px]
//             text-black/60
//           "
//           style={{
//             fontFamily:
//               "var(--font-satoshi)",
//           }}
//         >
//           Your cart is empty.
//         </div>
//       ) : (
//         items.map((item, index) => (
//           <div key={item.id}>
//             <CartItem
//               item={item}
//               onIncrease={onIncrease}
//               onDecrease={onDecrease}
//               onRemove={onRemove}
//             />

//             {index < items.length - 1 && (
//               <div
//                 className="
//                   my-[16px]
//                   h-px
//                   w-full
//                   bg-black/10
//                 "
//               />
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import type { CartItemData } from "./cart-page";
import CartItem from "./cart-item";

type CartItemsProps = {
  items: CartItemData[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  isPending: boolean;
};

export default function CartItems({
  items,
  onIncrease,
  onDecrease,
  onRemove,
  isPending,
}: CartItemsProps) {
  return (
    <div
      className="
        w-full

        rounded-[20px]
        border
        border-black/10
        bg-white

        px-[14px]
        py-[14px]

        min-[1200px]:px-[24px]
        min-[1200px]:py-[20px]
      "
    >
      {items.length === 0 ? (
        <div
          className="
            flex
            min-h-[200px]
            items-center
            justify-center

            text-[16px]
            text-black/60
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
          }}
        >
          Your cart is empty.
        </div>
      ) : (
        items.map((item, index) => (
          <div key={item.id}>
            <CartItem
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
              isPending={isPending}
            />

            {index < items.length - 1 && (
              <div
                className="
                  my-[16px]
                  h-px
                  w-full
                  bg-black/10
                "
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}