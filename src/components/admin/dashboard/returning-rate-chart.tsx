

"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import { Download } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    month: "January",
    desktop: 180,
    mobile: 85,
  },
  {
    month: "February",
    desktop: 285,
    mobile: 190,
  },
  {
    month: "March",
    desktop: 220,
    mobile: 120,
  },
  {
    month: "April",
    desktop: 430,
    mobile: 180,
  },
  {
    month: "May",
    desktop: 365,
    mobile: 130,
  },
  {
    month: "June",
    desktop: 470,
    mobile: 140,
  },
  {
    month: "July",
    desktop: 225,
    mobile: 120,
  },
  {
    month: "August",
    desktop: 430,
    mobile: 180,
  },
  {
    month: "September",
    desktop: 365,
    mobile: 125,
  },
  {
    month: "October",
    desktop: 470,
    mobile: 280,
  },
  {
    month: "November",
    desktop: 345,
    mobile: 225,
  },
  {
    month: "December",
    desktop: 630,
    mobile: 430,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#111111",
  },

  mobile: {
    label: "Mobile",
    color: "#C5C5C9",
  },
} satisfies ChartConfig;

export default function ReturningRateChart() {
  return (
    <Card
      className="
        overflow-hidden
        rounded-[10px]
        border
        border-black/10
        bg-white
        py-0
        shadow-none
      "
    >
      {/* HEADER */}
      <CardHeader
        className="
          flex
          flex-row
          items-start
          justify-between
          gap-[16px]

          px-[24px]
          pt-[18px]
          pb-0
        "
      >
        <div>
          <p
            className="
              text-[14px]
              leading-[20px]
              font-normal
              text-muted-foreground
            "
          >
            Returning Rate
          </p>

          <div
            className="
              mt-[4px]
              flex
              items-center
              gap-[8px]
            "
          >
            <span
              className="
                text-[24px]
                leading-[30px]
                font-semibold
                text-foreground
              "
            >
              $42,379
            </span>

            <span
              className="
                rounded-full
                border
                border-emerald-200
                bg-emerald-50

                px-[7px]
                py-[2px]

                text-[12px]
                leading-[16px]
                font-medium
                text-emerald-600
              "
            >
              +2.5%
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="
            h-[36px]
            rounded-[7px]
            border-black/10
            bg-white
            px-[12px]

            text-[14px]
            leading-[20px]
            font-medium
            shadow-none
          "
        >
          <Download className="size-[15px]" />

          Export
        </Button>
      </CardHeader>

      {/* CHART */}
      <CardContent
        className="
          px-[22px]
          pt-[18px]
          pb-[14px]
        "
      >
        <ChartContainer
          config={chartConfig}
          className="
            h-[321px]
            w-full
          "
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 8,
              right: 6,
              bottom: 0,
              left: 6,
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
              domain={[0, 700]}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              fontSize={12}
              tick={{
                fill: "#737373",
              }}
              tickFormatter={(value: string) =>
                value.slice(0, 3)
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideIndicator
                  className="
                    min-w-[150px]
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
                    font-semibold
                    text-black
                  "
                  formatter={(value, name) => {
                    const config =
                      chartConfig[
                        name as keyof typeof chartConfig
                      ];

                    return (
                      <div
                        className="
                          flex
                          min-w-[126px]
                          items-center
                          py-[1px]
                        "
                      >
                        {/* COLOR BOX */}
                        <span
                          className="
                            mr-[8px]
                            h-[12px]
                            w-[12px]
                            shrink-0
                            rounded-[3px]
                          "
                          style={{
                            backgroundColor:
                              config.color,
                          }}
                        />

                        <span
                          className="
                            text-[14px]
                            leading-[18px]
                            font-normal
                            text-[#737373]
                          "
                        >
                          {config.label}
                        </span>

                        <span
                          className="
                            ml-auto
                            pl-[18px]

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
                    );
                  }}
                />
              }
            />

            {/* DESKTOP */}
            <Line
              type="linear"
              dataKey="desktop"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                strokeWidth: 0,
                fill: "#111111",
              }}
            />

            {/* MOBILE */}
            <Line
              type="linear"
              dataKey="mobile"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                strokeWidth: 0,
                fill: "#66666F",
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}