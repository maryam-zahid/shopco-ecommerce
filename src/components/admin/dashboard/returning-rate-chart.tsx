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

type ReturningRateItem = {
  month: string;
  returningCustomers: number;
  newCustomers: number;
};

type ReturningRateChartProps = {
  data: ReturningRateItem[];
  rate: number;
  returningCustomers: number;
  totalCustomers: number;
};

const chartConfig = {
  returningCustomers: {
    label: "Returning Customers",
    color: "#111111",
  },

  newCustomers: {
    label: "New Customers",
    color: "#C5C5C9",
  },
} satisfies ChartConfig;

export default function ReturningRateChart({
  data,
  rate,
  returningCustomers,
  totalCustomers,
}: ReturningRateChartProps) {
  const maxValue = Math.max(
    1,
    ...data.flatMap((item) => [
      item.returningCustomers,
      item.newCustomers,
    ]),
  );

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
${totalCustomers.toLocaleString()}
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
+{rate}%
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
            data={data}
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
              domain={[
                0,
                Math.max(
                  5,
                  Math.ceil(
                    maxValue * 1.2,
                  ),
                ),
              ]}
            />

           <XAxis
  dataKey="month"
  tickLine={false}
  axisLine={false}
  tickMargin={12}
  fontSize={12}
  interval={0}
  minTickGap={0}
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
                  formatter={(
                    value,
                    name,
                  ) => {
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

            {/* RETURNING CUSTOMERS */}

            <Line
              type="linear"
              dataKey="returningCustomers"
              stroke="var(--color-returningCustomers)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                strokeWidth: 0,
                fill: "#111111",
              }}
            />

            {/* NEW CUSTOMERS */}

            <Line
              type="linear"
              dataKey="newCustomers"
              stroke="var(--color-newCustomers)"
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