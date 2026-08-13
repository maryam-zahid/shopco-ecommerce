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
export type RecentOrder = {
  id: string;
  customer: string;
  avatar: string;
  product: string;
  amount: number;
  status:
    | "Processing"
    | "Paid"
    | "Success"
    | "Failed";
};

export const recentOrdersData: RecentOrder[] = [
  {
    id: "#1023",
    customer: "Theodore Bell",
    avatar: "/images/admin/customers/customer-1.jpg",
    product: "Tire Doodad",
    amount: 300,
    status: "Processing",
  },
  {
    id: "#2045",
    customer: "Amelia Grant",
    avatar: "/images/admin/customers/customer-2.jpg",
    product: "Engine Kit",
    amount: 450,
    status: "Paid",
  },
  {
    id: "#3067",
    customer: "Eleanor Ward",
    avatar: "/images/admin/customers/customer-3.jpg",
    product: "Brake Pad",
    amount: 200,
    status: "Success",
  },
  {
    id: "#4089",
    customer: "Henry Carter",
    avatar: "/images/admin/customers/customer-4.jpg",
    product: "Fuel Pump",
    amount: 500,
    status: "Processing",
  },
  {
    id: "#5102",
    customer: "Olivia Harris",
    avatar: "/images/admin/customers/customer-5.jpg",
    product: "Steering Wheel",
    amount: 350,
    status: "Failed",
  },
  {
    id: "#6123",
    customer: "James Robinson",
    avatar: "/images/admin/customers/customer-6.jpg",
    product: "Air Filter",
    amount: 180,
    status: "Paid",
  },
  {
    id: "#7145",
    customer: "Sophia Martinez",
    avatar: "/images/admin/customers/customer-7.jpg",
    product: "Oil Filter",
    amount: 220,
    status: "Success",
  },
  {
    id: "#8167",
    customer: "Liam Thompson",
    avatar: "/images/admin/customers/customer-8.jpg",
    product: "Radiator Cap",
    amount: 290,
    status: "Processing",
  },
];

export type BestSellingProduct = {
  id: string;
  name: string;
  shortName: string;
  sold: number;
  sales: number;
};

export const bestSellingProductsData: BestSellingProduct[] = [
  {
    id: "P001",
    name: "Sports Shoes",
    shortName: "SS",
    sold: 316,
    sales: 10,
  },
  {
    id: "P002",
    name: "Black T-Shirt",
    shortName: "BT",
    sold: 274,
    sales: 20,
  },
  {
    id: "P003",
    name: "Jeans",
    shortName: "JN",
    sold: 195,
    sales: 15,
  },
  {
    id: "P004",
    name: "Red Sneakers",
    shortName: "RS",
    sold: 402,
    sales: 40,
  },
  {
    id: "P005",
    name: "Red Scarf",
    shortName: "SC",
    sold: 280,
    sales: 37,
  },
  {
    id: "P006",
    name: "Casual Hoodie",
    shortName: "CH",
    sold: 150,
    sales: 18,
  },
  {
    id: "P007",
    name: "Skinny Fit Jeans",
    shortName: "SJ",
    sold: 316,
    sales: 25,
  },
  {
    id: "P008",
    name: "Gradient T-Shirt",
    shortName: "GT",
    sold: 290,
    sales: 12,
  },
];
