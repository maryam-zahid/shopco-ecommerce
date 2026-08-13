export type DashboardMetric = {
  id: string;
  title: string;
  value: string;
  change: number;
  href: string;
};

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "revenue",
    title: "Monthly recurring revenue",
    value: "$34.1K",
    change: 6.1,
    href: "/admin/payments",
  },
  {
    id: "users",
    title: "Users",
    value: "500.1K",
    change: 19.2,
    href: "/admin/customers",
  },
  {
    id: "growth",
    title: "User growth",
    value: "11.3%",
    change: -1.2,
    href: "/admin/customers",
  },
];

export type RevenueChartItem = {
  month: string;
  currentYear: number;
  previousYear: number;
};

export const revenueChartData: RevenueChartItem[] = [
  {
    month: "January",
    currentYear: 15240,
    previousYear: 14300,
  },
  {
    month: "February",
    currentYear: 22840,
    previousYear: 17650,
  },
  {
    month: "March",
    currentYear: 21950,
    previousYear: 10450,
  },
  {
    month: "April",
    currentYear: 10480,
    previousYear: 15320,
  },
  {
    month: "May",
    currentYear: 9650,
    previousYear: 11250,
  },
  {
    month: "June",
    currentYear: 22980,
    previousYear: 12480,
  },
];

export const revenueSummary = {
  currentYear: 24828,
  previousYear: 25010,
};