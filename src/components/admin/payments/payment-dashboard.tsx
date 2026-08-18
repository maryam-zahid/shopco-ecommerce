// "use client";
// import Link from "next/link";
// import {
//   ChevronRight,
//   CircleAlert,
//   X,
// } from "lucide-react";
// import PaymentTransactionsCard from "@/components/admin/payments/payment-transactions-card";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// import ExchangeRatesCard from "@/components/admin/payments/exchange-rates-card";

// const balances = [
//   {
//     code: "US",
//     amount: "1,240.30",
//     currency: "USD",
//   },
//   {
//     code: "EU",
//     amount: "500.00",
//     currency: "EUR",
//   },
//   {
//     code: "GB",
//     amount: "0.00",
//     currency: "GBP",
//   },
// ];

// export default function PaymentDashboard() {
//   return (
//     <div
//       className="
//         w-full
//         px-[16px]
//         py-[18px]

//         min-[800px]:px-[20px]

//         min-[1920px]:px-[24px]
//       "
//     >
//       {/* =========================================
//           MAIN TWO-COLUMN PAYMENT LAYOUT
//       ========================================== */}
//       <div
//         className="
//           grid
//           grid-cols-1
//           gap-[14px]

//           min-[1200px]:grid-cols-[minmax(0,1.72fr)_minmax(420px,0.88fr)]
//         "
//       >
//         {/* =========================================
//             LEFT SIDE
//         ========================================== */}
//         <div className="min-w-0">
//           {/* PAGE TITLE */}
//           <div>
//             <h1
//               className="
//                 text-[24px]
//                 leading-[30px]
//                 font-semibold
//                 tracking-[-0.02em]
//                 text-foreground
//               "
//             >
//               Balances
//             </h1>

//             <p
//               className="
//                 mt-[4px]

//                 text-[14px]
//                 leading-[20px]
//                 font-normal
//                 text-muted-foreground
//               "
//             >
//               Total funds in all balances: 1,740.30 USD
//             </p>
//           </div>

//           {/* =========================================
//               VERIFICATION BANNER
//           ========================================== */}
//           <div
//             className="
//               mt-[16px]

//               flex
//               min-h-[52px]
//               items-center
//               justify-between
//               gap-[16px]

//               rounded-[8px]

//               border
//               border-[#F3CF42]

//               bg-[#FFFCEC]

//               px-[14px]
//               py-[9px]
//             "
//           >
//             <div
//               className="
//                 flex
//                 min-w-0
//                 items-center
//                 gap-[10px]
//               "
//             >
//               <CircleAlert
//                 className="
//                   size-[16px]
//                   shrink-0
//                   text-black
//                 "
//               />

//               <p
//                 className="
//                   truncate

//                   text-[14px]
//                   leading-[20px]
//                   font-normal
//                   text-foreground
//                 "
//               >
//                 You have information to submit in verification center
//               </p>
//             </div>

//             <div
//               className="
//                 flex
//                 shrink-0
//                 items-center
//                 gap-[8px]
//               "
//             >
//              <button
//   type="button"
//   className="
//     flex
//     min-h-[54px]
//     min-w-[154px]
//     cursor-pointer
//     items-center
//     justify-center

//     rounded-[10px]
//     border-0
//     !bg-[#08090A]

//     px-[28px]
//     py-[14px]

//     text-[16px]
//     font-medium
//     leading-none
//     !text-white

//     shadow-none
//     transition-colors
//     duration-150

//     hover:!bg-[#18181B]
//     hover:!text-white
//   "
// >
//   Submit Now
// </button>

//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="
//                   size-[32px]
//                   rounded-[6px]
//                 "
//                 aria-label="Dismiss verification notice"
//               >
//                 <X className="size-[16px]" />
//               </Button>
//             </div>
//           </div>

//           {/* =========================================
//               BALANCE CARDS
//           ========================================== */}
//           <section
//             className="
//               mt-[12px]

//               grid
//               grid-cols-1
//               gap-[12px]

//               min-[700px]:grid-cols-3
//             "
//           >
//             {balances.map((balance) => (
//               <Card
//                 key={balance.currency}
//                 className="
//                   group

//                   flex
//                   min-h-[68px]
//                   cursor-pointer
//                   items-center
//                   justify-between

//                   rounded-[10px]

//                   border
//                   border-black/10

//                   bg-white

//                   px-[16px]
//                   py-[12px]

//                   shadow-none

//                   transition-colors

//                   hover:bg-[#FAFAFA]
//                 "
//               >
//                 <div
//                   className="
//                     flex
//                     items-center
//                     gap-[10px]
//                   "
//                 >
//                   <span
//                     className="
//                       text-[14px]
//                       leading-[20px]
//                       font-medium
//                       text-muted-foreground
//                     "
//                   >
//                     {balance.code}
//                   </span>

//                   <span
//                     className="
//                       whitespace-nowrap

//                       text-[20px]
//                       leading-[26px]
//                       font-semibold
//                       tracking-[-0.015em]
//                       text-foreground
//                     "
//                   >
//                     {balance.amount} {balance.currency}
//                   </span>
//                 </div>

//                 <ChevronRight
//                   className="
//                     size-[16px]
//                     shrink-0
//                     text-muted-foreground
//                   "
//                 />
//               </Card>
//             ))}
//           </section>

//           {/* =========================================
//               TRANSACTIONS
//           ========================================== */}
//          <PaymentTransactionsCard />
//         </div>

//         {/* =========================================
//             RIGHT SIDE
//         ========================================== */}
//         <div
//           className="
//             min-w-0

//             min-[1200px]:pt-[0px]
//           "
//         >
//           <ExchangeRatesCard />
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import {
  CircleAlert,
  CreditCard,
  DollarSign,
  Hourglass,
  XCircle,
} from "lucide-react";

import RealPaymentsTable from "@/components/admin/payments/real-payments-table";

import ExchangeRatesCard from "@/components/admin/payments/exchange-rates-card";

import { Card } from "@/components/ui/card";

type PaymentRow = {
  id: string;

  attemptNumber: number;

  provider: string;

  amount: number;

  currency: string;

  status: string;

  stripeCheckoutSessionId:
    | string
    | null;

  stripePaymentIntentId:
    | string
    | null;

  failureCode:
    | string
    | null;

  failureMessage:
    | string
    | null;

  paidAt:
    | string
    | null;

  expiredAt:
    | string
    | null;

  createdAt: string;

  customer: {
    id: string;
    name: string;
    email: string;
  };

  order: {
    id: string;

    orderNumber: string;

    status: string;

    paymentStatus: string;

    paymentMethod: string;

    total: number;
  };
};

type PaymentStats = {
  totalAttempts: number;

  pendingAttempts: number;

  paidAttempts: number;

  failedAttempts: number;

  expiredAttempts: number;

  paidRevenue: number;
};

type PaymentDashboardProps = {
  payments: PaymentRow[];
  stats: PaymentStats;
};

export default function PaymentDashboard({
  payments,
  stats,
}: PaymentDashboardProps) {
  return (
    <div
      className="
        w-full
        px-[16px]
        py-[18px]

        min-[800px]:px-[20px]

        min-[1920px]:px-[24px]
      "
    >
      <div
        className="
          grid
          grid-cols-1
          gap-[14px]

          min-[1200px]:grid-cols-[minmax(0,1.72fr)_minmax(420px,0.88fr)]
        "
      >
        {/* ================================
            LEFT SIDE
        ================================= */}
        <div className="min-w-0">
          {/* HEADER */}
          <div>
            <h1
              className="
                text-[24px]
                font-semibold
                leading-[30px]
                tracking-[-0.02em]
                text-foreground
              "
            >
              Payments
            </h1>

            <p
              className="
                mt-[4px]

                text-[14px]
                leading-[20px]
                text-muted-foreground
              "
            >
              Monitor payment attempts,
              successful transactions and
              payment failures.
            </p>
          </div>

          {/* ================================
              STRIPE NOTICE
          ================================= */}
          <div
            className="
              mt-[16px]

              flex
              min-h-[52px]
              items-center
              gap-[10px]

              rounded-[8px]

              border
              border-black/10

              bg-[#F8F8F8]

              px-[14px]
              py-[10px]
            "
          >
            <CircleAlert
              className="
                size-[16px]
                shrink-0
                text-black
              "
            />

            <p
              className="
                text-[13px]
                leading-[19px]
                text-black/65
              "
            >
              Stripe card payments will appear
              here after Stripe test keys and
              webhook processing are configured.
              Cash on Delivery orders are tracked
              under Admin Orders.
            </p>
          </div>

          {/* ================================
              REAL PAYMENT STATS
          ================================= */}
          <section
            className="
              mt-[14px]

              grid
              grid-cols-1
              gap-[12px]

              min-[600px]:grid-cols-2
              min-[1100px]:grid-cols-4
            "
          >
            <StatCard
              title="Paid Revenue"
              value={`$${stats.paidRevenue.toFixed(
                2,
              )}`}
              subtitle={`${stats.paidAttempts} paid attempt${
                stats.paidAttempts === 1
                  ? ""
                  : "s"
              }`}
              icon={
                <DollarSign className="size-[18px]" />
              }
            />

            <StatCard
              title="Payment Attempts"
              value={String(
                stats.totalAttempts,
              )}
              subtitle="All card attempts"
              icon={
                <CreditCard className="size-[18px]" />
              }
            />

            <StatCard
              title="Pending"
              value={String(
                stats.pendingAttempts,
              )}
              subtitle="Awaiting payment"
              icon={
                <Hourglass className="size-[18px]" />
              }
            />

            <StatCard
              title="Failed / Expired"
              value={String(
                stats.failedAttempts +
                  stats.expiredAttempts,
              )}
              subtitle={`${stats.failedAttempts} failed · ${stats.expiredAttempts} expired`}
              icon={
                <XCircle className="size-[18px]" />
              }
            />
          </section>

          {/* ================================
              REAL TRANSACTIONS
          ================================= */}
          <section className="mt-[16px]">
            <div
              className="
                mb-[12px]

                flex
                items-center
                justify-between
                gap-[16px]
              "
            >
              <div>
                <h2
                  className="
                    text-[18px]
                    font-semibold
                    text-black
                  "
                >
                  Payment Transactions
                </h2>

                <p
                  className="
                    mt-[3px]
                    text-[13px]
                    text-black/45
                  "
                >
                  Real payment attempts stored
                  in PostgreSQL.
                </p>
              </div>

              <span
                className="
                  rounded-[7px]

                  border
                  border-black/10

                  bg-white

                  px-[10px]
                  py-[6px]

                  text-[12px]
                  text-black/55
                "
              >
                {payments.length} records
              </span>
            </div>

            <RealPaymentsTable
              payments={payments}
            />
          </section>
        </div>

        {/* ================================
            RIGHT SIDE
        ================================= */}
        <div
          className="
            min-w-0

            min-[1200px]:pt-0
          "
        >
          <ExchangeRatesCard />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <Card
      className="
        rounded-[10px]

        border
        border-black/10

        bg-white

        p-[16px]

        shadow-none
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-[12px]
        "
      >
        <div>
          <p
            className="
              text-[12px]
              font-medium
              text-black/45
            "
          >
            {title}
          </p>

          <p
            className="
              mt-[6px]

              text-[22px]
              font-semibold
              tracking-[-0.02em]
              text-black
            "
          >
            {value}
          </p>

          <p
            className="
              mt-[4px]
              text-[11px]
              text-black/40
            "
          >
            {subtitle}
          </p>
        </div>

        <div
          className="
            flex
            h-[36px]
            w-[36px]
            shrink-0
            items-center
            justify-center

            rounded-[8px]

            border
            border-black/10

            bg-[#F8F8F8]

            text-black
          "
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}