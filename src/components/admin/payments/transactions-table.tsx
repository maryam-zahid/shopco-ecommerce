"use client";

import { useMemo, useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  latestTransactions,
  upcomingTransactions,
  type PaymentTransaction,
} from "@/data/admin/payment-data";
const paymentTransactions: PaymentTransaction[] = [
  ...latestTransactions,
  ...upcomingTransactions,
];
export default function TransactionsTable() {
  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return paymentTransactions;
    }

    return paymentTransactions.filter((transaction) =>
      [
        transaction.id,
        transaction.date,
        transaction.title,
        transaction.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <Card
      className="
        rounded-[12px]
        border
        border-black/10
        bg-white
        p-[20px]
        shadow-none
      "
    >
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Filter transactions..."
        className="
          h-[40px]
          max-w-[320px]

          rounded-[8px]

          !border-[2px]
          !border-[#D0D0D5]

          bg-white

          px-[12px]

          text-[14px]

          !shadow-none
        "
      />

      <div
        className="
          mt-[14px]
          overflow-hidden

          rounded-[8px]
          border
          border-black/10
        "
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
              <TableHead className="text-[14px]">
                Date
              </TableHead>

              <TableHead className="text-[14px]">
                Transaction
              </TableHead>

              <TableHead className="text-[14px]">
                Status
              </TableHead>

              <TableHead className="text-[14px]">
                Amount
              </TableHead>

              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="text-[14px]">
                  {transaction.date}
                </TableCell>

                <TableCell>
                  <div>
                    <p className="text-[14px]">
                      {transaction.title}
                    </p>

                    <p className="mt-[2px] text-[12px] text-muted-foreground">
                      {transaction.id}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <span
                    className="
                      text-[14px]
                      text-muted-foreground
                    "
                  >
                    {transaction.status}
                  </span>
                </TableCell>

                <TableCell>
                  <span
                    className={
                      transaction.type === "credit"
                        ? "text-[14px] font-medium text-emerald-600"
                        : "text-[14px] font-medium text-red-500"
                    }
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    ${transaction.amount.toFixed(2)} USD
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-[30px]"
                        />
                      }
                    >
                      <MoreHorizontal className="size-[16px]" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        View details
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        Copy transaction ID
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {filteredTransactions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="
                    h-[150px]
                    text-center
                    text-[14px]
                    text-muted-foreground
                  "
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}