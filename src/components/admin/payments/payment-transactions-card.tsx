"use client";

import { useState } from "react";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  latestTransactions,
  upcomingTransactions,
} from "@/data/admin/payment-data";

type TransactionTab = "latest" | "upcoming";

export default function PaymentTransactionsCard() {
  const [activeTab, setActiveTab] =
    useState<TransactionTab>("latest");

  const transactions =
    activeTab === "latest"
      ? latestTransactions
      : upcomingTransactions;

  return (
    <Card
      className="
        overflow-hidden

        rounded-[10px]

        border
        border-black/10

        bg-white

        p-0
        shadow-none
      "
    >
      {/* =========================================
          HEADER
      ========================================== */}
      <div className="px-[20px] pt-[18px]">
        <div
          className="
            flex
            items-start
            justify-between
            gap-[16px]
          "
        >
          <div>
            <h2
              className="
                text-[14px]
                leading-[20px]
                font-semibold
                text-foreground
              "
            >
              Transactions
            </h2>

            <p
              className="
                mt-[3px]

                text-[14px]
                leading-[20px]
                font-normal
                text-muted-foreground
              "
            >
              Updated every several minutes
            </p>
          </div>

          <Button
            render={
              <Link href="/admin/payments/transactions" />
            }
            nativeButton={false}
            variant="ghost"
            className="
              h-[32px]

              gap-[5px]

              px-[7px]

              text-[14px]
              leading-[20px]
              font-medium

              hover:bg-[#F5F5F5]
            "
          >
            View all

            <ChevronRight className="size-[14px]" />
          </Button>
        </div>

        {/* =========================================
            TABS
        ========================================== */}
        {/* TABS */}
<div
  className="
    relative
    mt-[18px]
    flex
    h-[40px]
    items-end
    gap-[6px]

    border-b
    border-[#E2E2E5]
  "
>
  <button
    type="button"
    onClick={() => setActiveTab("latest")}
    className={`
      relative
      z-[1]

      flex
      h-[40px]
      items-center
      justify-center

      px-[12px]

      text-[14px]
      leading-[20px]
      font-normal

      transition-all
      duration-150

      ${
        activeTab === "latest"
          ? `
            bg-white
            text-[#111111]
            shadow-[0_4px_10px_rgba(0,0,0,0.10)]
          `
          : `
            bg-transparent
            text-muted-foreground
            shadow-none

            hover:text-[#111111]
          `
      }
    `}
  >
    Latest
  </button>

  <button
    type="button"
    onClick={() => setActiveTab("upcoming")}
    className={`
      relative
      z-[1]

      flex
      h-[40px]
      items-center
      justify-center

      px-[12px]

      text-[14px]
      leading-[20px]
      font-normal

      transition-all
      duration-150

      ${
        activeTab === "upcoming"
          ? `
            bg-white
            text-[#111111]
            shadow-[0_4px_10px_rgba(0,0,0,0.10)]
          `
          : `
            bg-transparent
            text-muted-foreground
            shadow-none

            hover:text-[#111111]
          `
      }
    `}
  >
    Upcoming
  </button>
</div>
       </div>

      {/* =========================================
          TRANSACTIONS
      ========================================== */}
      <div>
        {transactions.map((transaction) => {
          const isCredit =
            transaction.type === "credit";

          return (
            <div
              key={transaction.id}
              className="
                grid
                min-h-[58px]
                grid-cols-[135px_minmax(0,1fr)_150px_42px]
                items-center
                gap-[12px]

                border-b
                border-[#E5E5E7]

                px-[20px]

                last:border-b-0

                hover:bg-[#FAFAFA]
              "
            >
              {/* DATE */}
              <span
                className="
                  whitespace-nowrap

                  text-[14px]
                  leading-[20px]
                  font-normal
                  text-foreground
                "
              >
                {transaction.date}
              </span>

              {/* DETAILS */}
              <div className="min-w-0">
                <p
                  className="
                    truncate

                    text-[14px]
                    leading-[20px]
                    font-normal
                    text-foreground
                  "
                >
                  {transaction.title}
                </p>

                <p
                  className="
                    mt-[1px]

                    text-[14px]
                    leading-[18px]
                    font-normal
                    text-muted-foreground
                  "
                >
                  {transaction.status}
                </p>
              </div>

              {/* AMOUNT */}
              <span
                className={`
                  whitespace-nowrap
                  text-right

                  text-[14px]
                  leading-[20px]
                  font-normal
                  tabular-nums

                  ${
                    isCredit
                      ? "text-emerald-600"
                      : "text-red-500"
                  }
                `}
              >
                {isCredit ? "+" : "-"}
                {transaction.amount.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  },
                )}{" "}
                USD
              </span>

              {/* DETAILS BUTTON */}
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="
                  size-[32px]

                  rounded-[7px]

                  !border-[1px]
                  !border-[#D0D0D5]

                  bg-white

                  shadow-none

                  hover:bg-[#F5F5F5]
                "
                aria-label={`View ${transaction.id}`}
              >
                <ChevronRight className="size-[15px]" />
              </Button>
            </div>
          );
        })}

        {transactions.length === 0 && (
          <div
            className="
              flex
              h-[180px]
              items-center
              justify-center
            "
          >
            <p className="text-[14px] text-muted-foreground">
              No transactions available.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}