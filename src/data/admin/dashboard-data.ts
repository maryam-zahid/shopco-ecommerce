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
export type LocationSalesItem = {
  country: string;
  change: number;
  percentage: number;
};

export const locationSalesData: LocationSalesItem[] = [
  {
    country: "Canada",
    change: 5.2,
    percentage: 85,
  },
  {
    country: "Greenland",
    change: 7.8,
    percentage: 80,
  },
  {
    country: "Russia",
    change: -2.1,
    percentage: 63,
  },
  {
    country: "China",
    change: 3.4,
    percentage: 60,
  },
  {
    country: "Australia",
    change: 1.2,
    percentage: 45,
  },
  {
    country: "Greece",
    change: 1,
    percentage: 40,
  },
];

export type StoreVisitItem = {
  source: string;
  visitors: number;
  fill: string;
};

export const storeVisitData: StoreVisitItem[] = [
  {
    source: "Direct",
    visitors: 2550,
    fill: "#09090B",
  },
  {
    source: "Referrals",
    visitors: 1700,
    fill: "#A1A1AA",
  },
  {
    source: "Email",
    visitors: 2550,
    fill: "#27272A",
  },
  {
    source: "Other",
    visitors: 1700,
    fill: "#D4D4D8",
  },
  {
    source: "Social",
    visitors: 1700,
    fill: "#52525B",
  },
];

export const reviewDistribution = [
  {
    rating: 5,
    count: 4000,
    percentage: 82,
  },
  {
    rating: 4,
    count: 2100,
    percentage: 54,
  },
  {
    rating: 3,
    count: 800,
    percentage: 30,
  },
  {
    rating: 2,
    count: 631,
    percentage: 18,
  },
  {
    rating: 1,
    count: 344,
    percentage: 9,
  },
];