"use client";

import { useMemo, useState } from "react";

import {
  ArrowDownUp,
  BarChart3,
  RefreshCw,
} from "lucide-react";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type RangeKey =
  | "1D"
  | "7D"
  | "30D"
  | "90D"
  | "1Y";

const currencies = [
  {
    code: "EUR",
    country: "EU",
  },
  {
    code: "USD",
    country: "US",
  },
  {
    code: "GBP",
    country: "GB",
  },
  {
    code: "JPY",
    country: "JP",
  },
  {
    code: "CAD",
    country: "CA",
  },
  {
    code: "AUD",
    country: "AU",
  },
];

/*
 * Static dashboard data for now.
 * Later this can come from a real exchange-rate API/backend.
 */
const rangeData: Record<
  RangeKey,
  {
    date: string;
    value: number;
  }[]
> = {
  "1D": [
    { date: "08:00", value: 140 },
    { date: "09:00", value: 152 },
    { date: "10:00", value: 178 },
    { date: "11:00", value: 220 },
    { date: "12:00", value: 242 },
    { date: "13:00", value: 230 },
    { date: "14:00", value: 208 },
    { date: "15:00", value: 218 },
    { date: "16:00", value: 266 },
    { date: "17:00", value: 292 },
    { date: "18:00", value: 310 },
  ],

  "7D": [
    { date: "Jun 25", value: 160 },
    { date: "Jun 26", value: 340 },
    { date: "Jun 27", value: 348 },
    { date: "Jun 28", value: 170 },
    { date: "Jun 29", value: 145 },
    { date: "Jun 30", value: 345 },
  ],

  "30D": [
    { date: "Jun 1", value: 185 },
    { date: "Jun 3", value: 445 },
    { date: "Jun 5", value: 125 },
    { date: "Jun 7", value: 350 },
    { date: "Jun 9", value: 420 },
    { date: "Jun 11", value: 145 },
    { date: "Jun 13", value: 470 },
    { date: "Jun 15", value: 250 },
    { date: "Jun 17", value: 455 },
    { date: "Jun 19", value: 170 },
    { date: "Jun 21", value: 380 },
    { date: "Jun 23", value: 462 },
    { date: "Jun 25", value: 155 },
    { date: "Jun 27", value: 430 },
    { date: "Jun 29", value: 125 },
    { date: "Jun 30", value: 420 },
  ],

  "90D": [
    { date: "Apr 4", value: 170 },
    { date: "Apr 8", value: 410 },
    { date: "Apr 13", value: 140 },
    { date: "Apr 18", value: 390 },
    { date: "Apr 23", value: 185 },
    { date: "Apr 28", value: 445 },
    { date: "May 3", value: 220 },
    { date: "May 8", value: 465 },
    { date: "May 13", value: 205 },
    { date: "May 18", value: 450 },
    { date: "May 23", value: 135 },
    { date: "May 28", value: 410 },
    { date: "Jun 1", value: 230 },
    { date: "Jun 5", value: 465 },
    { date: "Jun 10", value: 190 },
    { date: "Jun 14", value: 450 },
    { date: "Jun 19", value: 205 },
    { date: "Jun 24", value: 455 },
    { date: "Jun 28", value: 150 },
    { date: "Jun 30", value: 420 },
  ],

  "1Y": [
    { date: "Apr 2", value: 240 },
    { date: "Apr 5", value: 130 },
    { date: "Apr 8", value: 390 },
    { date: "Apr 11", value: 145 },
    { date: "Apr 14", value: 360 },
    { date: "Apr 17", value: 190 },
    { date: "Apr 21", value: 420 },
    { date: "Apr 24", value: 160 },
    { date: "Apr 27", value: 395 },
    { date: "May 1", value: 180 },
    { date: "May 4", value: 440 },
    { date: "May 7", value: 388 },
    { date: "May 11", value: 205 },
    { date: "May 14", value: 420 },
    { date: "May 17", value: 470 },
    { date: "May 21", value: 145 },
    { date: "May 24", value: 350 },
    { date: "May 28", value: 190 },
    { date: "May 31", value: 440 },
    { date: "Jun 3", value: 160 },
    { date: "Jun 6", value: 455 },
    { date: "Jun 9", value: 225 },
    { date: "Jun 12", value: 470 },
    { date: "Jun 15", value: 170 },
    { date: "Jun 18", value: 450 },
    { date: "Jun 21", value: 195 },
    { date: "Jun 24", value: 465 },
    { date: "Jun 27", value: 150 },
    { date: "Jun 30", value: 430 },
  ],
};

const chartConfig = {
  value: {
    label: "Page Views",
    color: "#111111",
  },
} satisfies ChartConfig;

const ranges: RangeKey[] = [
  "1D",
  "7D",
  "30D",
  "90D",
  "1Y",
];

export default function ExchangeRatesCard() {
  const [fromCurrency, setFromCurrency] =
    useState("EUR");

  const [toCurrency, setToCurrency] =
    useState("USD");

  /*
   * Your reference screenshot currently shows
   * 30D selected, so use 30D as the initial state.
   */
  const [range, setRange] =
    useState<RangeKey>("30D");

  const chartData = useMemo(
    () => rangeData[range],
    [range],
  );

  function swapCurrencies() {
    const previousFrom = fromCurrency;

    setFromCurrency(toCurrency);
    setToCurrency(previousFrom);
  }

  return (
    <Card
      className="
        h-fit

        rounded-[12px]
        border
        border-black/10
        bg-white

        p-[18px]

        shadow-none
      "
    >
      {/* =========================================
          HEADER
      ========================================== */}
      <div
        className="
          flex
          items-center
          justify-between
          gap-[12px]
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
          Exchange rates
        </h2>

        <div
          className="
            flex
            items-center
            gap-[7px]
          "
        >
          <span
            className="
              whitespace-nowrap

              text-[12px]
              leading-[18px]
              font-normal
              text-muted-foreground
            "
          >
            Last updated: 11:08 AM
          </span>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="
              size-[28px]
              rounded-[5px]

              text-muted-foreground
            "
            aria-label="Refresh exchange rates"
          >
            <RefreshCw className="size-[14px]" />
          </Button>
        </div>
      </div>

      {/* =========================================
          CURRENCY SELECTORS
      ========================================== */}
      <div
        className="
          mt-[18px]

          grid
          grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)]
          items-center
          gap-[6px]
        "
      >
        {/* FROM */}
        <Select
          value={fromCurrency}
          onValueChange={(value) => {
            if (value) {
              setFromCurrency(value);
            }
          }}
        >
          <SelectTrigger
            className="
              h-[36px]
              w-full

              rounded-[7px]

              !border-[1px]
              !border-solid
              !border-[#D0D0D5]

              bg-white

              px-[10px]

              text-[14px]
              leading-[20px]
              font-normal
              text-foreground

              shadow-none

              hover:!border-[#BFC0C5]

              focus-visible:!ring-0
              focus-visible:!outline-none
            "
          >
            <SelectValue>
              {currencies.find(
                (item) =>
                  item.code === fromCurrency,
              )?.country}{" "}
              {fromCurrency}
            </SelectValue>
          </SelectTrigger>

          <SelectContent
            className="
              rounded-[8px]
              border
              border-black/10
            "
          >
            {currencies.map((currency) => (
              <SelectItem
                key={currency.code}
                value={currency.code}
                className="
                  text-[14px]
                  leading-[20px]
                "
              >
                {currency.country}{" "}
                {currency.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* SWAP */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={swapCurrencies}
          className="
            size-[28px]
            rounded-[5px]

            text-muted-foreground

            hover:bg-[#F5F5F6]
          "
          aria-label="Swap currencies"
        >
          <ArrowDownUp className="size-[16px]" />
        </Button>

        {/* TO */}
        <Select
          value={toCurrency}
          onValueChange={(value) => {
            if (value) {
              setToCurrency(value);
            }
          }}
        >
          <SelectTrigger
            className="
              h-[36px]
              w-full

              rounded-[7px]

              !border-[1px]
              !border-solid
              !border-[#D0D0D5]

              bg-white

              px-[10px]

              text-[14px]
              leading-[20px]
              font-normal
              text-foreground

              shadow-none

              hover:!border-[#BFC0C5]

              focus-visible:!ring-0
              focus-visible:!outline-none
            "
          >
            <SelectValue>
              {currencies.find(
                (item) =>
                  item.code === toCurrency,
              )?.country}{" "}
              {toCurrency}
            </SelectValue>
          </SelectTrigger>

          <SelectContent
            className="
              rounded-[8px]
              border
              border-black/10
            "
          >
            {currencies.map((currency) => (
              <SelectItem
                key={currency.code}
                value={currency.code}
                className="
                  text-[14px]
                  leading-[20px]
                "
              >
                {currency.country}{" "}
                {currency.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* =========================================
          RANGE BUTTONS
      ========================================== */}
      {/* RANGE BUTTONS */}
<div className="mt-[14px] flex items-center gap-[8px]">
  {ranges.map((item) => {
    const isActive = range === item;

    return (
      <button
        key={item}
        type="button"
        onClick={() => setRange(item)}
        className={`
          flex
          h-[34px]
          min-w-[44px]
          items-center
          justify-center
          rounded-[7px]
          border-[2px]
          px-[10px]
          text-[14px]
          font-medium
          leading-none
          transition-all
          duration-150

          ${
            isActive
              ? `
                !border-[#77777D]
                !bg-[#09090B]
                !text-white
                hover:!bg-[#09090B]
                hover:!text-white
              `
              : `
                !border-[#E5E5E7]
                !bg-[#F4F4F5]
                !text-[#777777]
                hover:!border-[#D4D4D7]
                hover:!bg-[#EEEEF0]
                hover:!text-[#111111]
              `
          }
        `}
      >
        {item}
      </button>
    );
  })}
</div>
      {/* =========================================
          CHART
      ========================================== */}
      <div
        className="
          mt-[14px]

          border-t
          border-black/[0.04]

          pt-[8px]
        "
      >
        <ChartContainer
          config={chartConfig}
          className="
            h-[215px]
            w-full
          "
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 4,
              bottom: 2,
              left: 4,
            }}
          >
            {/* HORIZONTAL GRID ONLY */}
            <CartesianGrid
              vertical={false}
              stroke="#ECECEF"
              strokeWidth={1}
            />

            <YAxis
              hide
              domain={[
                "dataMin - 35",
                "dataMax + 35",
              ]}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={28}
              fontSize={11}
              tick={{
                fill: "#737373",
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideIndicator
                  className="
                    min-w-[175px]

                    rounded-[10px]

                    border
                    border-black/10

                    bg-white

                    px-[12px]
                    py-[10px]

                    shadow-[0_6px_18px_rgba(0,0,0,0.10)]
                  "
                  labelClassName="
                    mb-[6px]

                    text-[14px]
                    leading-[18px]
                    font-medium
                    text-black
                  "
                  formatter={(value) => (
                    <div
                      className="
                        flex
                        min-w-[145px]
                        items-center
                        gap-[9px]
                      "
                    >
                      <span
                        className="
                          size-[12px]
                          shrink-0
                          rounded-[3px]
                          bg-black
                        "
                      />

                      <span
                        className="
                          text-[14px]
                          leading-[18px]
                          font-normal
                          text-muted-foreground
                        "
                      >
                        Page Views
                      </span>

                      <span
                        className="
                          ml-auto

                          text-[14px]
                          leading-[18px]
                          font-medium
                          tabular-nums
                          text-black
                        "
                      >
                        {Number(
                          value,
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                />
              }
            />

            <Line
              type="monotone"
              dataKey="value"

              stroke="#111111"
              strokeWidth={1.8}

              dot={false}

              activeDot={{
                r: 3.5,
                fill: "#111111",
                stroke: "#111111",
                strokeWidth: 0,
              }}
            />
          </LineChart>
        </ChartContainer>
      </div>

      <div className="mt-[20px] flex w-full flex-col gap-[10px]">
  {/* Convert Currencies */}
  <Button
  type="button"
  className="
    h-[50px]
    w-full
    rounded-[6px]
    border
    !border-[#08090A]
    !bg-[#08090A]
    text-[14px]
    font-medium
    !text-white
    shadow-none

    hover:!border-[#08090A]
    hover:!bg-[#08090A]
    hover:!text-white

    active:!bg-[#08090A]
    active:!text-white

    focus-visible:!bg-[#08090A]
    focus-visible:!text-white
  "
>
  Convert Currencies
</Button>
  {/* Rate Alerts
  <button
  type="button"
  className="
    flex
    h-[50px]
    w-full
    cursor-pointer
    items-center
    justify-center
    gap-[8px]

    !rounded-[7px]
    !border-2
    !border-solid
    !border-[#D8D8DD]
    !bg-white

    text-[14px]
    font-medium
    text-[#18181B]

    !shadow-none
  "
>
  <span
    aria-hidden="true"
    className="text-[16px] leading-none"
  >
    📊
  </span>

  <span>Rate Alerts</span>
</button> */}
<button
  type="button"
  style={{
    border: "2px solid #D8D8DD",
    borderRadius: "7px",
  }}
  className="
    flex
    h-[50px]
    w-full
    cursor-pointer
    items-center
    justify-center
    gap-[8px]

    !bg-white

    text-[14px]
    font-medium
    text-[#18181B]

    shadow-none
    transition-colors
    duration-150

    hover:!bg-[#E4E4E7]
  "
>
  <span
    aria-hidden="true"
    className="text-[16px] leading-none"
  >
    📊
  </span>

  <span>Rate Alerts</span>
</button>
</div>
    </Card>
  );
}