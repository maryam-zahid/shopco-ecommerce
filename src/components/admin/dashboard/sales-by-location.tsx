"use client";

import {
  FileSpreadsheet,
  FileText,
  FolderUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


type SalesByLocationItem = {
  country: string;
  sales: number;
  orders: number;
  percentage: number;
};

type SalesByLocationProps = {
  data: SalesByLocationItem[];
};
export default function SalesByLocation({
  data,
}: SalesByLocationProps) {
    function exportPDF() {
    window.print();
  }

  function exportExcel() {
   const rows = [
  [
    "Country",
    "Orders",
    "Sales",
    "Sales Percentage",
  ],

  ...data.map((item) => [
    item.country,
    item.orders.toString(),
    `$${item.sales.toFixed(2)}`,
    `${item.percentage}%`,
  ]),
];

    const csvContent = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      },
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "sales-by-location.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <Card
      className="
        h-full
        rounded-[10px]
        border
        border-black/10
        bg-white
        p-0
        shadow-none
      "
    >
      <div className="px-[24px] py-[20px]">
        {/* =====================================
            HEADER
        ====================================== */}
        <div>
          <div
            className="
              flex
              items-center
              gap-[10px]
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
              Sales by Location
            </h2>

            {/* EXPORT DROPDOWN */}
          <DropdownMenu>
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

  <DropdownMenuContent
    align="start"
    sideOffset={6}
    className="
      min-w-[145px]
      rounded-[8px]
      border
      border-black/10
      bg-white
      p-[4px]
      shadow-[0_4px_12px_rgba(0,0,0,0.12)]
    "
  >
    <DropdownMenuItem
      onClick={exportPDF}
      className="
        h-[36px]
        cursor-pointer
        gap-[9px]
        rounded-[5px]
        px-[9px]

        text-[14px]
        font-normal

        hover:bg-[#F1F1F3]
        focus:bg-[#F1F1F3]
      "
    >
      <FileText className="size-[15px]" />
      PDF
    </DropdownMenuItem>

    <DropdownMenuItem
      onClick={exportExcel}
      className="
        h-[36px]
        cursor-pointer
        gap-[9px]
        rounded-[5px]
        px-[9px]

        text-[14px]
        font-normal

        hover:bg-[#F1F1F3]
        focus:bg-[#F1F1F3]
      "
    >
      <FileSpreadsheet className="size-[15px]" />
      Excel
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
          </div>

          <p
            className="
              mt-[4px]
              text-[14px]
              leading-[20px]
              font-normal
              text-muted-foreground
            "
          >
            Income in the last 28 days
          </p>
        </div>

        {/* =====================================
            LOCATION LIST
        ====================================== */}
        <div
          className="
            mt-[24px]
            flex
            flex-col
            gap-[18px]
          "
        >
          {data.map(
  (item) => {
              const positive =
                item.change >= 0;

              return (
                <div
                  key={item.country}
                >
                  <div
                    className="
                      mb-[7px]
                      flex
                      items-center
                      justify-between
                      gap-[12px]
                    "
                  >
                    {/* COUNTRY + CHANGE */}
                    <div
                      className="
                        flex
                        items-center
                        gap-[8px]
                      "
                    >
                      <span
                        className="
                          text-[14px]
                          leading-[20px]
                          font-normal
                          text-foreground
                        "
                      >
                        {item.country}
                      </span>

                   <span
  className="
    rounded-full
    border
    border-emerald-200
    bg-emerald-50

    px-[7px]
    py-[1px]

    text-[12px]
    leading-[16px]
    font-medium
    text-emerald-600
  "
>
  {item.orders}{" "}
  {item.orders === 1
    ? "order"
    : "orders"}
</span>
                    </div>

                    {/* PERCENTAGE */}
                    <span
                      className="
                        text-[14px]
                        leading-[20px]
                        font-normal
                        text-foreground
                      "
                    >
                      {
                        item.percentage
                      }
                      %
                    </span>
                  </div>

                  {/* PROGRESS */}
                  <div
                    className="
                      h-[7px]
                      w-full
                      overflow-hidden
                      rounded-full
                      bg-[#D4D4D4]
                    "
                  >
                    <div
                      className="
                        h-full
                        rounded-full
                        bg-[#111111]

                        transition-all
                        duration-500
                      "
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </Card>
  );
}