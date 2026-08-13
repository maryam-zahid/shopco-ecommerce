"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  FileSpreadsheet,
  FileText,
  FolderUp,
  MoreHorizontal,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
  recentOrdersData,
  type RecentOrder,
} from "@/data/admin/dashboard-data";

const PAGE_SIZE = 8;

function StatusBadge({
  status,
}: {
  status: RecentOrder["status"];
}) {
  const styles = {
    Processing:
      "border-blue-400 bg-blue-50 text-blue-600",

    Paid:
      "border-orange-400 bg-orange-50 text-orange-600",

    Success:
      "border-emerald-400 bg-emerald-50 text-emerald-600",

    Failed:
      "border-red-500 bg-red-500 text-white",
  };

  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        justify-center

        rounded-full
        border

        px-[8px]
        py-[2px]

        text-[12px]
        leading-[16px]
        font-normal

        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}

export default function RecentOrdersTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [amountDescending, setAmountDescending] =
    useState(false);

  const filteredOrders = useMemo(() => {
    const query = search.toLowerCase().trim();

    const result = recentOrdersData.filter((order) => {
      if (!query) return true;

      return (
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query)
      );
    });

    return [...result].sort((a, b) =>
      amountDescending
        ? b.amount - a.amount
        : a.amount - b.amount,
    );
  }, [search, amountDescending]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / PAGE_SIZE),
  );

  const visibleOrders = filteredOrders.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  function exportExcel() {
    const rows = [
      [
        "Order ID",
        "Customer",
        "Product",
        "Amount",
        "Status",
      ],

      ...filteredOrders.map((order) => [
        order.id,
        order.customer,
        order.product,
        order.amount,
        order.status,
      ]),
    ];

    const csv = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "recent-orders.csv";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  }

  function exportPDF() {
    window.print();
  }

  return (
    <Card
      className="
        h-full

        rounded-[12px]
        border
        border-black/10
        bg-white

        p-[20px]

        shadow-none

        min-[800px]:p-[24px]
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          gap-[16px]
        "
      >
        <h2
          className="
            text-[14px]
            leading-[20px]
            font-semibold
            text-foreground
          "
        >
          Recent Orders
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="outline"
                className="
                  h-[36px]

                  rounded-[7px]

                  border-[#DADADD]
                  bg-white

                  px-[12px]

                  text-[14px]
                  leading-[20px]
                  font-medium

                  shadow-[0_1px_2px_rgba(0,0,0,0.05)]

                  hover:bg-[#F3F3F4]

                  data-[state=open]:bg-[#F3F3F4]
                "
              />
            }
          >
            <FolderUp className="size-[16px]" />

            Export
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="min-w-[145px]"
          >
            <DropdownMenuItem
              onClick={exportExcel}
              className="gap-[8px] text-[14px]"
            >
              <FileSpreadsheet className="size-[15px]" />
              Excel
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={exportPDF}
              className="gap-[8px] text-[14px]"
            >
              <FileText className="size-[15px]" />
              PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* FILTER */}
    <Input
  value={search}
  onChange={(event) => {
    setSearch(event.target.value);
    setPage(0);
  }}
  placeholder="Filter orders..."
       className="
  h-[40px]
  w-full
  max-w-[270px]

  rounded-[8px]

  !border-[2px]
  !border-solid
  !border-[#CDCDD3]

  !bg-white
  px-[12px]

  text-[14px]
  leading-[20px]
  font-normal
  text-foreground

  !shadow-none

  placeholder:text-[#737373]

  transition-colors

  hover:!border-[#BFC0C6]

  focus-visible:!border-[#B8B9BF]
  focus-visible:!ring-0
  focus-visible:!outline-none
"
/>
      {/* TABLE */}
      <div
        className="
          mt-[14px]
          overflow-x-auto

          rounded-[7px]
          border
          border-black/10
        "
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
              <TableHead className="h-[42px] min-w-[90px] px-[10px] text-[14px] font-normal text-foreground">
                ID
              </TableHead>

              <TableHead className="min-w-[210px] px-[10px] text-[14px] font-normal text-foreground">
                Customer
              </TableHead>

              <TableHead className="min-w-[170px] px-[10px] text-[14px] font-normal text-foreground">
                Product
              </TableHead>

              <TableHead className="min-w-[130px] px-[10px]">
                <button
                  type="button"
                  onClick={() =>
                    setAmountDescending(
                      (previous) => !previous,
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-[7px]

                    text-[14px]
                    font-normal
                    text-foreground
                  "
                >
                  Amount
                  <span className="text-[13px]">⇅</span>
                </button>
              </TableHead>

              <TableHead className="min-w-[130px] px-[10px] text-[14px] font-normal text-foreground">
                Status
              </TableHead>

              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {visibleOrders.length > 0 ? (
              visibleOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="h-[42px]"
                >
                  <TableCell className="px-[10px] text-[14px] text-muted-foreground">
                    {order.id}
                  </TableCell>

<TableCell className="px-[10px]">
  <div className="flex items-center gap-[10px]">
    <div
      className="
        relative
        flex
        size-[34px]
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-full
        bg-[#F1F1F3]
      "
    >
      {order.avatar ? (
        <Image
          src={order.avatar}
          alt={order.customer}
          fill
          sizes="34px"
          className="object-cover"
        />
      ) : (
        <span
          className="
            text-[10px]
            font-medium
            text-[#666666]
          "
        >
          {order.customer
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </span>
      )}
    </div>

    <span className="text-[14px]">
      {order.customer}
    </span>
  </div>
</TableCell>
                  <TableCell className="px-[10px] text-[14px]">
                    {order.product}
                  </TableCell>

                  <TableCell className="px-[10px] text-[14px]">
                    ${order.amount.toFixed(2)}
                  </TableCell>

                  <TableCell className="px-[10px]">
                    <StatusBadge status={order.status} />
                  </TableCell>

                  <TableCell className="px-[8px] text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="
                              size-[30px]
                              rounded-[5px]

                              hover:bg-[#F2F2F3]
                            "
                          />
                        }
                      >
                        <MoreHorizontal className="size-[16px]" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="min-w-[190px]"
                      >
                        <DropdownMenuItem
                          className="gap-[8px] text-[14px]"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              order.id,
                            )
                          }
                        >
                          <Copy className="size-[15px]" />
                          Copy order ID
                        </DropdownMenuItem>

                        <DropdownMenuItem className="gap-[8px] text-[14px]">
                          <UserRound className="size-[15px]" />
                          View customer
                        </DropdownMenuItem>

                        <DropdownMenuItem className="gap-[8px] text-[14px]">
                          <CreditCard className="size-[15px]" />
                          View payment details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="
                    h-[160px]
                    text-center
                    text-[14px]
                    text-muted-foreground
                  "
                >
                  No orders match your filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* FOOTER */}
      <div
        className="
          mt-[14px]

          flex
          items-center
          justify-between
          gap-[16px]
        "
      >
        <p className="text-[14px] text-muted-foreground">
          Showing{" "}
          {filteredOrders.length === 0
            ? 0
            : page * PAGE_SIZE + 1}{" "}
          to{" "}
          {Math.min(
            page * PAGE_SIZE + PAGE_SIZE,
            filteredOrders.length,
          )}{" "}
          of {filteredOrders.length} entries
        </p>

        <div className="flex items-center gap-[6px]">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={page === 0}
            onClick={() =>
              setPage((previous) =>
                Math.max(0, previous - 1),
              )
            }
            className="size-[32px] rounded-[6px]"
          >
            <ChevronLeft className="size-[15px]" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={page >= totalPages - 1}
            onClick={() =>
              setPage((previous) =>
                Math.min(
                  totalPages - 1,
                  previous + 1,
                ),
              )
            }
            className="size-[32px] rounded-[6px]"
          >
            <ChevronRight className="size-[15px]" />
          </Button>
        </div>
      </div>
    </Card>
  );
}