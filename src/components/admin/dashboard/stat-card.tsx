import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";

import type {
  DashboardMetric,
} from "@/data/admin/dashboard-data";

type StatCardProps = {
  stat: DashboardMetric;
};

export default function StatCard({
  stat,
}: StatCardProps) {
  const positive = stat.change >= 0;

  return (
    <Card
      className="
        flex
        min-h-[160px]
        flex-col
        overflow-hidden
        rounded-[10px]
        border
        border-black/10
        bg-white
        py-0
        shadow-none
      "
    >
      <div className="flex flex-1 flex-col p-[20px]">
        <div className="flex items-start justify-between gap-[12px]">
          {/* <p
            className="
              text-[13px]
              leading-[18px]
              text-black/60
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 400,
            }}
          >
            {stat.title}
          </p> */}
<span
  className={
    stat.change >= 0
      ? "text-[14px] leading-[20px] font-medium text-emerald-600"
      : "text-[14px] leading-[20px] font-medium text-red-500"
  }
>
  {stat.change >= 0 ? "+" : ""}
  {stat.change}%
</span>
          {/* <span
            className={`
              shrink-0
              text-[12px]
              leading-[18px]

              ${
                positive
                  ? "text-emerald-600"
                  : "text-red-500"
              }
            `}
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 500,
            }}
          >
            {positive ? "+" : ""}
            {stat.change}%
          </span> */}
          <span
  className={
    stat.change >= 0
      ? "text-[14px] leading-[20px] font-medium text-emerald-600"
      : "text-[14px] leading-[20px] font-medium text-red-500"
  }
>
  {stat.change >= 0 ? "+" : ""}
  {stat.change}%
</span>
        </div>

        {/* <p
          className="
            mt-[18px]
            text-[28px]
            leading-[34px]
            tracking-[-0.03em]
            text-black
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 500,
          }}
        >
          {stat.value}
        </p> */}
        <p
  className="
    mt-[4px]

    text-[30px]
    leading-[36px]
    font-semibold
    tracking-[-0.02em]
    text-foreground
  "
>
  {stat.value}
</p>
      </div>

      {/* <Link
        href={stat.href}
        className="
          group
          flex
          h-[40px]
          items-center
          justify-end
          gap-[10px]
          border-t
          border-black/10
          px-[18px]

          text-[12px]
          text-black

          transition-colors
          hover:bg-black/[0.025]
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 500,
        }}
      >
        View more

        <ArrowRight
          className="
            size-[14px]
            transition-transform
            group-hover:translate-x-[2px]
          "
        />
      </Link> */}
      <Link
  href={stat.href}
  className="
    flex
    h-[45px]
    items-center
    justify-end
    gap-[8px]

    border-t
    border-border

    px-[24px]

    text-[14px]
    leading-[20px]
    font-medium
    text-foreground

    transition-colors
    hover:bg-muted/40
  "
>
  View more

  <ArrowRight className="size-[16px]" />
</Link>
    </Card>
  );
}