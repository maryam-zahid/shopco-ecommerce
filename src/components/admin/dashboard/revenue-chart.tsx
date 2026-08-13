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

const chartData = [
  {
    month: "January",
    desktop: 190,
    mobile: 180,
  },
  {
    month: "February",
    desktop: 250,
    mobile: 200,
  },
  {
    month: "March",
    desktop: 240,
    mobile: 120,
  },
  {
    month: "April",
    desktop: 120,
    mobile: 190,
  },
  {
    month: "May",
    desktop: 110,
    mobile: 130,
  },
  {
    month: "June",
    desktop: 250,
    mobile: 140,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#09090B",
  },
  mobile: {
    label: "Mobile",
    color: "#5B5B64",
  },
} satisfies ChartConfig;

export default function RevenueChart() {
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
                Desktop
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
                24,828
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
                Mobile
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
                25,010
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
            data={chartData}
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
  tickMargin={10}
  fontSize={12}
  tick={{
    fill: "#737373",
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
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={[5, 5, 0, 0]}
              barSize={41}
            />

            <Bar
              dataKey="mobile"
              fill="var(--color-mobile)"
              radius={[5, 5, 0, 0]}
              barSize={41}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}