"use client";

import {
  Cell,
  Pie,
  PieChart,
} from "recharts";

import { Card } from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

import {
  storeVisitData,
} from "@/data/admin/dashboard-data";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

const totalVisitors = storeVisitData.reduce(
  (total, item) => total + item.visitors,
  0,
);

function formatVisitors(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toString();
}

export default function StoreVisitsChart() {
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
        <h2
          className="
            text-[14px]
            leading-[20px]
            font-semibold
            text-foreground
          "
        >
          Store Visits by Source
        </h2>

        <div
          className="
            relative
            mt-[20px]
            flex
            items-center
            justify-center
          "
        >
          <ChartContainer
            config={chartConfig}
            className="
              h-[230px]
              w-[230px]
            "
          >
            <PieChart>

              <ChartTooltip
  cursor={false}
  content={({ active, payload }) => {
    if (
      !active ||
      !payload ||
      payload.length === 0
    ) {
      return null;
    }

    const entry = payload[0];

    const source =
      entry.name?.toString() ?? "";

    const value =
      Number(entry.value) || 0;

    const item = storeVisitData.find(
      (visit) => visit.source === source,
    );

    return (
      <div
        className="
          flex
          min-w-[145px]
          items-center
          gap-[10px]

          rounded-[8px]
          border
          border-black/10
          bg-white

          px-[12px]
          py-[8px]

          shadow-[0_4px_12px_rgba(0,0,0,0.10)]
        "
      >
        <span
          className="
            h-[10px]
            w-[10px]
            shrink-0
            rounded-[2px]
          "
          style={{
            backgroundColor:
              item?.fill ?? "#52525B",
          }}
        />

        <span
          className="
            text-[14px]
            leading-[20px]
            font-normal
            text-muted-foreground
          "
        >
          {source}
        </span>

        <span
          className="
            ml-auto
            text-[14px]
            leading-[20px]
            font-medium
            tabular-nums
            text-foreground
          "
        >
          {value.toLocaleString()}
        </span>
      </div>
    );
  }}
/>

              <Pie
                data={storeVisitData}
                dataKey="visitors"
                nameKey="source"
                innerRadius={54}
                outerRadius={92}
                strokeWidth={0}
                paddingAngle={0}
              >
                {storeVisitData.map((item) => (
                  <Cell
                    key={item.source}
                    fill={item.fill}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* CENTER LABEL */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2

              -translate-x-1/2
              -translate-y-1/2

              text-center
            "
          >
            <p
              className="
                text-[30px]
                leading-[36px]
                font-bold
                tracking-[-0.03em]
                text-foreground
              "
            >
              {formatVisitors(totalVisitors)}
            </p>

            <p
              className="
                mt-[1px]
                text-[12px]
                leading-[16px]
                font-normal
                text-muted-foreground
              "
            >
              Visitors
            </p>
          </div>
        </div>

        {/* LEGEND */}
        <div
          className="
            mt-[14px]
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-[14px]
            gap-y-[8px]
          "
        >
          {storeVisitData.map((item) => (
            <div
              key={item.source}
              className="
                flex
                items-center
                gap-[6px]
              "
            >
              <span
                className="
                  h-[7px]
                  w-[7px]
                  rounded-[1px]
                "
                style={{
                  backgroundColor: item.fill,
                }}
              />

              <span
                className="
                  text-[12px]
                  leading-[16px]
                  font-normal
                  text-foreground
                "
              >
                {item.source}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}