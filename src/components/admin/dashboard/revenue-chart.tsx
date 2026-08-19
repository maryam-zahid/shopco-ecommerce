"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
   YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type RevenueChartItem = {
  month: string;
  currentYear: number;
  previousYear: number;
};

type RevenueChartProps = {
  data: RevenueChartItem[];

  currentYearTotal: number;
  previousYearTotal: number;

  currentYearLabel: string;
  previousYearLabel: string;
};

const chartConfig = {
  currentYear: {
    label: "Current Year",
    color: "#09090B",
  },

  previousYear: {
    label: "Previous Year",
    color: "#5B5B64",
  },
} satisfies ChartConfig;

export default function RevenueChart({
  data,
  currentYearTotal,
  previousYearTotal,
  currentYearLabel,
  previousYearLabel,
}: RevenueChartProps) {
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
      <CardHeader
        className="
          grid
          grid-cols-[1fr_auto]

          gap-y-[14px]

          px-[24px]
          pt-[18px]
          pb-0
        "
      >
        {/* TITLE */}
        <div>
          <h2
            className="
              text-[14px]
              leading-[20px]
              font-semibold
              text-foreground
            "
          >
            Total Revenue
          </h2>
        </div>

        {/* RIGHT TEXT */}
        <p
          className="
            text-[14px]
            leading-[20px]
            font-normal
            text-muted-foreground
          "
        >
          Income in the last 28 days
        </p>

        {/* SUMMARY BOX */}
        <div
          className="
            col-span-2
            w-fit

            rounded-[7px]
            border
            border-black/10
            bg-white

            px-[14px]
            py-[10px]
          "
        >
          <div className="flex items-start gap-[22px]">
            <div>
              <p
                className="
                  text-[11px]
                  leading-[16px]
                  font-normal
                  uppercase
                  tracking-[0.04em]
                  text-muted-foreground
                "
              >
                {currentYearLabel}
              </p>

              <p
                className="
                  mt-[2px]
                  text-[24px]
                  leading-[28px]
                  font-semibold
                  text-foreground
                "
              >
${currentYearTotal.toLocaleString(
  "en-US",
  {
    maximumFractionDigits: 2,
  },
)}
              </p>
            </div>

            <div>
              <p
                className="
                  text-[11px]
                  leading-[16px]
                  font-normal
                  uppercase
                  tracking-[0.04em]
                  text-muted-foreground
                "
              >
                {previousYearLabel}
              </p>

              <p
                className="
                  mt-[2px]
                  text-[24px]
                  leading-[28px]
                  font-semibold
                  text-foreground
                "
              >
        ${previousYearTotal.toLocaleString(
  "en-US",
  {
    maximumFractionDigits: 2,
  },
)}
      </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className="
          px-[22px]
          pt-[14px]
          pb-[14px]
        "
      >
        <ChartContainer
          config={chartConfig}
          className="
            h-[274px]
            w-full
          "
        >
          <BarChart
            accessibilityLayer
data={data}
            barGap={7}
            barCategoryGap="30%"
          >
            <CartesianGrid
              vertical={false}
              horizontal={false}
            />
<YAxis
  domain={[0, 250]}
  hide
/>
         <XAxis
  dataKey="month"
  tickLine={false}
  axisLine={false}
  tickMargin={12}
  interval={0}
  padding={{
    left: 0,
    right: 0,
  }}
  tick={{
    fontSize: 12,
  }}
/>

         <ChartTooltip
  cursor={{
    fill: "rgba(0, 0, 0, 0.025)",
  }}
  content={
    <ChartTooltipContent
      className="
        min-w-[155px]

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
      labelFormatter={(label) => label}
      formatter={(value, name) => {
        const config =
          chartConfig[
            name as keyof typeof chartConfig
          ];

        return (
          <div
            className="
              flex
              w-full
              min-w-[130px]
              items-center

              py-[1px]
            "
          >
            {/* SERIES INDICATOR */}
            <span
              className="
                mr-[8px]

                h-[16px]
                w-[3px]
                shrink-0

                rounded-full
              "
              style={{
                backgroundColor: config.color,
              }}
            />

            {/* LABEL */}
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

            {/* VALUE */}
            <span
              className="
                ml-auto

                pl-[18px]

                text-[14px]
                leading-[18px]
                font-semibold
                tabular-nums
                text-black
              "
            >
              {Number(value).toLocaleString()}
            </span>
          </div>
        );
      }}
    />
  }
/>
          <Bar
  dataKey="currentYear"
  fill="var(--color-currentYear)"
  radius={[5, 5, 0, 0]}
  barSize={41}
/>

<Bar
  dataKey="previousYear"
  fill="var(--color-previousYear)"
  radius={[5, 5, 0, 0]}
  barSize={41}
/>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}