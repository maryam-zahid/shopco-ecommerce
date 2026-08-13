"use client";

import { useMemo, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  FileText,
  FolderUp,
  MoreHorizontal,
  Package,
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
  bestSellingProductsData,
} from "@/data/admin/dashboard-data";

export default function BestSellingProducts() {
  const [search, setSearch] = useState("");
  const [soldDescending, setSoldDescending] =
    useState(false);
  const [salesDescending, setSalesDescending] =
    useState(false);

  const products = useMemo(() => {
    const query = search.toLowerCase().trim();

    let result = bestSellingProductsData.filter(
      (product) =>
        !query ||
        product.name.toLowerCase().includes(query),
    );

    if (soldDescending) {
      result = [...result].sort(
        (a, b) => b.sold - a.sold,
      );
    }

    if (salesDescending) {
      result = [...result].sort(
        (a, b) => b.sales - a.sales,
      );
    }

    return result;
  }, [
    search,
    soldDescending,
    salesDescending,
  ]);

  function exportExcel() {
    const rows = [
      ["Product", "Sold", "Sales"],

      ...products.map((product) => [
        product.name,
        product.sold,
        product.sales,
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
    anchor.download = "best-selling-products.csv";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
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
          "
        >
          Best Selling Products
        </h2>

        <DropdownMenu>
          {/* <DropdownMenuTrigger
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
                  font-medium

                  hover:bg-[#F3F3F4]

                  data-[state=open]:bg-[#F3F3F4]
                "
              />
            }
          >
            <FolderUp className="size-[16px]" />
            Export
          </DropdownMenuTrigger> */}
          <DropdownMenuTrigger
  render={
    <Button
      type="button"
      variant="outline"
      className="
        h-[36px]
        rounded-[8px]

        !border-[2px]
        !border-solid
        !border-[#D0D0D5]

        !bg-white
        !shadow-none

        px-[12px]

        text-[14px]
        leading-[20px]
        font-medium
        text-foreground

        transition-colors
        duration-150

        hover:!border-[#C2C2C8]
        hover:!bg-[#F3F3F4]

        data-[state=open]:!border-[#C2C2C8]
        data-[state=open]:!bg-[#F3F3F4]

        focus-visible:!outline-none
        focus-visible:!ring-0
      "
    />
  }
>
  <FolderUp
    className="size-[16px]"
    strokeWidth={1.8}
  />
  Export
</DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={exportExcel}
              className="gap-[8px] text-[14px]"
            >
              <FileSpreadsheet className="size-[15px]" />
              Excel
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => window.print()}
              className="gap-[8px] text-[14px]"
            >
              <FileText className="size-[15px]" />
              PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Input
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        placeholder="Filter products..."
        // className="
        //   mt-[22px]

        //   h-[36px]
        //   max-w-[270px]

        //   rounded-[6px]
        //   border-[#D1D1D6]

        //   px-[12px]

        //   text-[14px]

        //   shadow-none
        // "
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
              <TableHead className="h-[42px] min-w-[230px] px-[10px] text-[14px] font-normal text-foreground">
                Product
              </TableHead>

              <TableHead className="min-w-[120px] px-[10px]">
                <button
                  type="button"
                  className="flex items-center gap-[7px] text-[14px]"
                  onClick={() => {
                    setSoldDescending(
                      (previous) => !previous,
                    );

                    setSalesDescending(false);
                  }}
                >
                  Sold
                  <span>⇅</span>
                </button>
              </TableHead>

              <TableHead className="min-w-[100px] px-[10px]">
                <button
                  type="button"
                  className="flex items-center gap-[7px] text-[14px]"
                  onClick={() => {
                    setSalesDescending(
                      (previous) => !previous,
                    );

                    setSoldDescending(false);
                  }}
                >
                  Sales
                  <span>⇅</span>
                </button>
              </TableHead>

              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="h-[42px]"
              >
                <TableCell className="px-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <div
                      className="
                        flex
                        size-[30px]
                        shrink-0
                        items-center
                        justify-center

                        rounded-[2px]
                        bg-[#E5E5E5]

                        text-[9px]
                        font-medium
                        text-black/60
                      "
                    >
                      {product.shortName}
                    </div>

                    <span className="text-[14px]">
                      {product.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="px-[10px] text-[14px]">
                  ${product.sold.toFixed(2)}
                </TableCell>

                <TableCell className="px-[10px] text-[14px]">
                  {product.sales}
                </TableCell>

                <TableCell className="px-[8px] text-right">
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
                      <DropdownMenuItem className="gap-[8px] text-[14px]">
                        <Package className="size-[15px]" />
                        View product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {products.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="
                    h-[160px]
                    text-center
                    text-[14px]
                    text-muted-foreground
                  "
                >
                  No products match your filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div
        className="
          mt-[14px]
          flex
          items-center
          justify-between
        "
      >
        <p className="text-[14px] text-muted-foreground">
          0 of {products.length} row(s) selected.
        </p>

        <div className="flex gap-[6px]">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled
            className="size-[32px]"
          >
            <ChevronLeft className="size-[15px]" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled
            className="size-[32px]"
          >
            <ChevronRight className="size-[15px]" />
          </Button>
        </div>
      </div>
    </Card>
  );
}