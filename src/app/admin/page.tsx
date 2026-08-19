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
import RecentOrdersTable from "@/components/admin/dashboard/recent-orders-table";
import BestSellingProducts from "@/components/admin/dashboard/best-selling-products";
import {
  getAdminDashboardData,
} from "@/services/admin-dashboard.service";
export default async function AdminDashboardPage() {
  const dashboard =
    await getAdminDashboardData();

  const dashboardMetrics =
    dashboard.metrics;
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
         <Button
  type="button"
  className="
    h-[36px]
    rounded-[6px]

    !border
    !border-[#08090A]
    !bg-[#08090A]

    px-[12px]

    text-[14px]
    leading-[20px]
    font-medium
    !text-white

    shadow-none
    transition-colors
    duration-150

    hover:!border-[#18181B]
    hover:!bg-[#18181B]
    hover:!text-white
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
<CongratulationsCard
  revenue={
    dashboard.congratulations
      .revenue
  }
  change={
    dashboard.congratulations
      .change
  }
/>
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
<RevenueChart
  data={dashboard.revenueChart}
  currentYearTotal={
    dashboard.revenueSummary.currentYear
  }
  previousYearTotal={
    dashboard.revenueSummary.previousYear
  }
  currentYearLabel={
    dashboard.revenueSummary.currentYearLabel
  }
  previousYearLabel={
    dashboard.revenueSummary.previousYearLabel
  }
/>
<ReturningRateChart
  data={dashboard.returningRateChart}
  rate={dashboard.returningRateSummary.rate}
  returningCustomers={
    dashboard.returningRateSummary.returningCustomers
  }
  totalCustomers={
    dashboard.returningRateSummary.totalCustomers
  }
/>
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
<SalesByLocation
  data={
    dashboard.salesByLocation
  }
/>
  <StoreVisitsChart />

<CustomerReviews
  totalReviews={
    dashboard.customerReviews
      .totalReviews
  }
  averageRating={
    dashboard.customerReviews
      .averageRating
  }
  distribution={
    dashboard.customerReviews
      .distribution
  }
  latest={
    dashboard.customerReviews
      .latest
  }
/>
</section>
{/* =========================================
    TABLES ROW
========================================== */}
<section
  className="
    mt-[14px]

    grid
    grid-cols-1
    gap-[14px]

    min-[1200px]:grid-cols-[1.35fr_0.95fr]
  "
>
<RecentOrdersTable
  orders={
    dashboard.recentOrders
  }
/>
<BestSellingProducts
  productsData={
    dashboard.bestSellingProducts
  }
/>
</section>
    </div>
  );
}