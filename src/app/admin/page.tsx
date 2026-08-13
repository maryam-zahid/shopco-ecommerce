import {
  CalendarDays,
  Download,
} from "lucide-react";

import CongratulationsCard from "@/components/admin/dashboard/congratulations-card";
import StatCard from "@/components/admin/dashboard/stat-card";

import { Button } from "@/components/ui/button";
import RevenueChart from "@/components/admin/dashboard/revenue-chart";
import ReturningRateChart from "@/components/admin/dashboard/returning-rate-chart";
import SalesByLocation from "@/components/admin/dashboard/sales-by-location";
import StoreVisitsChart from "@/components/admin/dashboard/store-visits-chart";
import CustomerReviews from "@/components/admin/dashboard/customer-reviews";
import {
  dashboardMetrics,
} from "@/data/admin/dashboard-data";

export default function AdminDashboardPage() {
  return (
    <div
      className="
        w-full
        px-[14px]
        py-[18px]

        min-[800px]:px-[20px]
        min-[800px]:py-[20px]

        min-[1920px]:px-[24px]
      "
    >
      {/* PAGE HEADER */}
      <div
        className="
          flex
          flex-col
          gap-[14px]

          min-[800px]:flex-row
          min-[800px]:items-center
          min-[800px]:justify-between
        "
      >
        <h1
          className="
            text-[24px]
            leading-[30px]
            tracking-[-0.03em]
            text-black
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 500,
          }}
        >
          E-Commerce Dashboard
        </h1>

        <div className="flex flex-wrap items-center gap-[8px]">
          <Button
            variant="outline"
            className="
              h-[36px]
              rounded-[6px]
              border-black/10
              bg-white
              px-[12px]
              text-[12px]
              shadow-none
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 500,
            }}
          >
            <CalendarDays className="size-[15px]" />

            17 Jul 2026 - 13 Aug 2026
          </Button>

          {/* <Button
            className="
              h-[36px]
              rounded-[6px]
              bg-black
              px-[13px]
              text-[12px]
              text-white
              hover:bg-black/85
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 500,
            }}
          >
            <Download className="size-[15px]" />

            Download
          </Button> */}
          <Button
  className="
    h-[36px]
    rounded-[6px]
    bg-black
    px-[12px]

    text-[14px]
    leading-[20px]
    font-medium
    text-white

    hover:bg-black/85
  "
>
  <Download className="size-[16px]" />

  Download
</Button>
        </div>
      </div>

      {/* TOP DASHBOARD CARDS */}
      <section
  className="
    mt-[16px]
    grid
    grid-cols-1
    gap-[12px]

    min-[800px]:grid-cols-2

    min-[1200px]:grid-cols-[1.35fr_0.9fr_0.9fr_0.9fr]

    min-[1920px]:gap-[14px]
  "
>
  <CongratulationsCard />

  {dashboardMetrics.map((stat) => (
    <StatCard
      key={stat.id}
      stat={stat}
    />
  ))}
</section>
<section
  className="
    mt-[14px]
    grid
    grid-cols-1
    gap-[14px]

    min-[1200px]:grid-cols-2
  "
>
  <RevenueChart />

  <ReturningRateChart />
</section>
{/* =========================================
    INSIGHTS ROW
========================================== */}
<section
  className="
    mt-[14px]
    grid
    grid-cols-1
    gap-[14px]

    min-[1000px]:grid-cols-2

    min-[1400px]:grid-cols-[1.15fr_0.85fr_1.35fr]
  "
>
  <SalesByLocation />

  <StoreVisitsChart />

  <CustomerReviews />
</section>
    </div>
  );
}