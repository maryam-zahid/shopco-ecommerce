// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// export default function CongratulationsCard() {
//   return (
//     <Card
//       className="
//         relative
//         h-full
//         min-h-[176px]
//         overflow-hidden

//         rounded-[24px]
//         border
//         border-black/10
//         bg-[#FAFAFA]

//         p-0
//         shadow-none

//       "
//     >
//       {/* =========================================
//           CONFETTI / DECORATION
//       ========================================== */}

//       <span
//         className="
//           absolute
//           left-[10px]
//           top-[16px]
//           text-[14px]
//           text-blue-500
//         "
//         aria-hidden="true"
//       >
//         ✦
//       </span>

//       <span
//         className="
//           absolute
//           left-[32%]
//           top-[8px]
//           text-[15px]
//           text-blue-500
//         "
//         aria-hidden="true"
//       >
//         ✦
//       </span>

//       <span
//         className="
//           absolute
//           left-[49%]
//           top-[42px]
//           text-[13px]
//           text-orange-500
//         "
//         aria-hidden="true"
//       >
//         ✦
//       </span>

//       <span
//         className="
//           absolute
//           left-[61%]
//           top-[18px]
//           text-[11px]
//           text-purple-500
//         "
//         aria-hidden="true"
//       >
//         ✦
//       </span>

//       <span
//         className="
//           absolute
//           right-[24%]
//           top-[40px]
//           text-[13px]
//           text-emerald-400
//         "
//         aria-hidden="true"
//       >
//         ✦
//       </span>

//       <span
//         className="
//           absolute
//           right-[4%]
//           top-[20px]
//           text-[14px]
//           text-emerald-500
//         "
//         aria-hidden="true"
//       >
//         ✦
//       </span>

//       <span
//         className="
//           absolute
//           right-[8%]
//           top-[86px]
//           text-[12px]
//           text-red-500
//         "
//         aria-hidden="true"
//       >
//         ✦
//       </span>

//       <span
//         className="
//           absolute
//           bottom-[52px]
//           left-[1px]
//           text-[12px]
//           text-emerald-400
//         "
//         aria-hidden="true"
//       >
//         ✦
//       </span>

//       <span
//         className="
//           absolute
//           bottom-[52px]
//           left-[32%]
//           text-[11px]
//           text-blue-500
//         "
//         aria-hidden="true"
//       >
//         ✦
//       </span>

//       {/* =========================================
//           CONTENT
//       ========================================== */}

//       <div
//         className="
//           relative
//           z-10

//           flex
//           h-full
//           min-h-[176px]
//           flex-col

//           px-[28px]
//           py-[28px]

//           min-[800px]:px-[36px]
//           min-[800px]:py-[34px]
//         "
//       >
//         {/* HEADING */}

//         <div>
//           <div
//             className="
//               flex
//               items-center
//               gap-[10px]
//             "
//           >
//             {/* <h2
//               className="
//                 m-0

//                 text-[30px]
//                 leading-[36px]
//                 tracking-[-0.035em]
//                 text-black

//                 min-[800px]:text-[36px]
//                 min-[800px]:leading-[42px]
//               "
//               style={{
//                 fontFamily: "var(--font-satoshi)",
//                 fontWeight: 500,
//               }}
//             >
//               Congratulations Admin!
//             </h2> */}
//             <h2
//   className="
//     text-[24px]
//     leading-[32px]
//     font-semibold
//     tracking-[-0.02em]
//     text-foreground
//   "
// >
//   Congratulations Admin! 🎉
// </h2>

//             <span
//               className="
//                 shrink-0
//                 text-[30px]
//                 leading-none

//                 min-[800px]:text-[36px]
//               "
//               aria-hidden="true"
//             >
//               🎉
//             </span>
//           </div>

//           <p
//             className="
//               mt-[14px]
//               mb-0

//               text-[20px]
//               leading-[28px]
//               text-black/55

//               min-[800px]:text-[22px]
//               min-[800px]:leading-[30px]
//             "
//             style={{
//               fontFamily: "var(--font-satoshi)",
//               fontWeight: 400,
//             }}
//           >
//             Best seller of the month
//           </p>
//         </div>

//         {/* =========================================
//             BOTTOM CONTENT
//         ========================================== */}

//         <div
//           className="
//             mt-auto

//             flex
//             items-end
//             justify-between
//             gap-[24px]
//           "
//         >
//           {/* SALES */}

//           <div>
//             <p
//               className="
//                 m-0

//                 whitespace-nowrap

//                 text-[42px]
//                 leading-[48px]
//                 tracking-[-0.045em]
//                 text-black

//                 min-[800px]:text-[48px]
//                 min-[800px]:leading-[54px]
//               "
//               style={{
//                 fontFamily: "var(--font-satoshi)",
//                 fontWeight: 500,
//               }}
//             >
//               $15,231.89
//             </p>

//             <p
//               className="
//                 mt-[8px]
//                 mb-0

//                 whitespace-nowrap

//                 text-[17px]
//                 leading-[24px]
//                 text-black/55

//                 min-[800px]:text-[19px]
//                 min-[800px]:leading-[26px]
//               "
//               style={{
//                 fontFamily: "var(--font-satoshi)",
//                 fontWeight: 400,
//               }}
//             >
//               <span
//                 className="text-emerald-600"
//                 style={{
//                   fontWeight: 500,
//                 }}
//               >
//                 +65%
//               </span>{" "}
//               from last month
//             </p>
//           </div>

//           {/* VIEW SALES */}

//           <Button
//             render={<Link href="/admin/orders" />}
//             variant="outline"
//             className="
//               h-[56px]
//               shrink-0

//               rounded-[12px]
//               border
//               border-black/10
//               bg-white

//               px-[28px]

//               text-[18px]
//               leading-[24px]
//               text-black

//               shadow-[0_3px_10px_rgba(0,0,0,0.10)]

//               transition-all
//               duration-200

//               hover:-translate-y-[1px]
//               hover:bg-white
//               hover:shadow-[0_5px_14px_rgba(0,0,0,0.12)]

//               min-[800px]:h-[60px]
//               min-[800px]:px-[32px]
//               min-[800px]:text-[20px]
//             "
//             style={{
//               fontFamily: "var(--font-satoshi)",
//               fontWeight: 500,
//             }}
//           >
//             View Sales
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// }


import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CongratulationsCard() {
  return (
    <Card
      className="
        relative
        h-full
        min-h-[176px]
        overflow-hidden

        rounded-[18px]
        border
        border-black/10
        bg-[#FAFAFA]

        p-0
        shadow-none
      "
    >
      {/* CONFETTI */}
      <span
        className="absolute left-[10px] top-[14px] text-[12px] text-blue-500"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="absolute left-[32%] top-[8px] text-[13px] text-blue-500"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="absolute left-[49%] top-[37px] text-[11px] text-orange-500"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="absolute left-[61%] top-[18px] text-[10px] text-purple-500"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="absolute right-[24%] top-[38px] text-[11px] text-emerald-400"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="absolute right-[4%] top-[18px] text-[12px] text-emerald-500"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="absolute right-[8%] top-[72px] text-[10px] text-red-500"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="absolute bottom-[16px] left-[1px] text-[10px] text-emerald-400"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="absolute bottom-[12px] left-[33%] text-[10px] text-blue-500"
        aria-hidden="true"
      >
        ✦
      </span>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10

          flex
          min-h-[176px]
          h-full
          flex-col

          px-[20px]
          py-[18px]

          min-[800px]:px-[22px]
          min-[800px]:py-[20px]
        "
      >
        {/* TOP */}
        <div>
          <h2
            className="
              m-0

              text-[24px]
              leading-[32px]
              font-semibold
              tracking-[-0.02em]
              text-foreground
            "
          >
            Congratulations Admin! 🎉
          </h2>

          <p
            className="
              mt-[4px]
              mb-0

              text-[14px]
              leading-[20px]
              font-normal
              text-muted-foreground
            "
          >
            Best seller of the month
          </p>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-auto

            flex
            items-end
            justify-between
            gap-[20px]
          "
        >
          <div>
            <p
              className="
                m-0
                whitespace-nowrap

                text-[30px]
                leading-[36px]
                font-semibold
                tracking-[-0.025em]
                text-foreground
              "
            >
              $15,231.89
            </p>

            <p
              className="
                mt-[2px]
                mb-0
                whitespace-nowrap

                text-[14px]
                leading-[20px]
                font-normal
                text-muted-foreground
              "
            >
              <span className="font-medium text-emerald-600">
                +65%
              </span>{" "}
              from last month
            </p>
          </div>
{/* 
          <Button
            render={<Link href="/admin/orders" />}
            variant="outline"
            className="
              h-[36px]
              shrink-0

              rounded-[7px]
              border
              border-black/10
              bg-white

              px-[16px]

              text-[14px]
              leading-[20px]
              font-medium
              text-foreground

              shadow-[0_2px_5px_rgba(0,0,0,0.08)]

              transition-all
              duration-200

              hover:bg-muted/30
            "
          >
            View Sales
          </Button> */}
          <Button
  render={<Link href="/admin/orders" />}
  variant="outline"
  className="
    h-[36px]
    rounded-[7px]
    border-black/10
    bg-white
    px-[16px]

    text-[14px]
    leading-[20px]
    font-medium

    shadow-[0_2px_5px_rgba(0,0,0,0.08)]
  "
>
  View Sales
</Button>
        </div>
      </div>
    </Card>
  );
}