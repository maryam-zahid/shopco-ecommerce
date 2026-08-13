"use client";
import Link from "next/link";
import {
  ChevronRight,
  CircleAlert,
  X,
} from "lucide-react";
import PaymentTransactionsCard from "@/components/admin/payments/payment-transactions-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import ExchangeRatesCard from "@/components/admin/payments/exchange-rates-card";

const balances = [
  {
    code: "US",
    amount: "1,240.30",
    currency: "USD",
  },
  {
    code: "EU",
    amount: "500.00",
    currency: "EUR",
  },
  {
    code: "GB",
    amount: "0.00",
    currency: "GBP",
  },
];

export default function PaymentDashboard() {
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
      {/* =========================================
          MAIN TWO-COLUMN PAYMENT LAYOUT
      ========================================== */}
      <div
        className="
          grid
          grid-cols-1
          gap-[14px]

          min-[1200px]:grid-cols-[minmax(0,1.72fr)_minmax(420px,0.88fr)]
        "
      >
        {/* =========================================
            LEFT SIDE
        ========================================== */}
        <div className="min-w-0">
          {/* PAGE TITLE */}
          <div>
            <h1
              className="
                text-[24px]
                leading-[30px]
                font-semibold
                tracking-[-0.02em]
                text-foreground
              "
            >
              Balances
            </h1>

            <p
              className="
                mt-[4px]

                text-[14px]
                leading-[20px]
                font-normal
                text-muted-foreground
              "
            >
              Total funds in all balances: 1,740.30 USD
            </p>
          </div>

          {/* =========================================
              VERIFICATION BANNER
          ========================================== */}
          <div
            className="
              mt-[16px]

              flex
              min-h-[52px]
              items-center
              justify-between
              gap-[16px]

              rounded-[8px]

              border
              border-[#F3CF42]

              bg-[#FFFCEC]

              px-[14px]
              py-[9px]
            "
          >
            <div
              className="
                flex
                min-w-0
                items-center
                gap-[10px]
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
                  truncate

                  text-[14px]
                  leading-[20px]
                  font-normal
                  text-foreground
                "
              >
                You have information to submit in verification center
              </p>
            </div>

            <div
              className="
                flex
                shrink-0
                items-center
                gap-[8px]
              "
            >
             <button
  type="button"
  className="
    flex
    min-h-[54px]
    min-w-[154px]
    cursor-pointer
    items-center
    justify-center

    rounded-[10px]
    border-0
    !bg-[#08090A]

    px-[28px]
    py-[14px]

    text-[16px]
    font-medium
    leading-none
    !text-white

    shadow-none
    transition-colors
    duration-150

    hover:!bg-[#18181B]
    hover:!text-white
  "
>
  Submit Now
</button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="
                  size-[32px]
                  rounded-[6px]
                "
                aria-label="Dismiss verification notice"
              >
                <X className="size-[16px]" />
              </Button>
            </div>
          </div>

          {/* =========================================
              BALANCE CARDS
          ========================================== */}
          <section
            className="
              mt-[12px]

              grid
              grid-cols-1
              gap-[12px]

              min-[700px]:grid-cols-3
            "
          >
            {balances.map((balance) => (
              <Card
                key={balance.currency}
                className="
                  group

                  flex
                  min-h-[68px]
                  cursor-pointer
                  items-center
                  justify-between

                  rounded-[10px]

                  border
                  border-black/10

                  bg-white

                  px-[16px]
                  py-[12px]

                  shadow-none

                  transition-colors

                  hover:bg-[#FAFAFA]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-[10px]
                  "
                >
                  <span
                    className="
                      text-[14px]
                      leading-[20px]
                      font-medium
                      text-muted-foreground
                    "
                  >
                    {balance.code}
                  </span>

                  <span
                    className="
                      whitespace-nowrap

                      text-[20px]
                      leading-[26px]
                      font-semibold
                      tracking-[-0.015em]
                      text-foreground
                    "
                  >
                    {balance.amount} {balance.currency}
                  </span>
                </div>

                <ChevronRight
                  className="
                    size-[16px]
                    shrink-0
                    text-muted-foreground
                  "
                />
              </Card>
            ))}
          </section>

          {/* =========================================
              TRANSACTIONS
          ========================================== */}
         <PaymentTransactionsCard />
        </div>

        {/* =========================================
            RIGHT SIDE
        ========================================== */}
        <div
          className="
            min-w-0

            min-[1200px]:pt-[0px]
          "
        >
          <ExchangeRatesCard />
        </div>
      </div>
    </div>
  );
}