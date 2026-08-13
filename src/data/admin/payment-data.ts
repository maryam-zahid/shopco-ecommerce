export type PaymentTransaction = {
  id: string;
  date: string;
  title: string;
  status: "Completed" | "Pending" | "Failed";
  amount: number;
  type: "credit" | "debit";
};

export const latestTransactions: PaymentTransaction[] = [
  {
    id: "TXN-1001",
    date: "16 Aug 2025",
    title: "Withdrawal to JP Morgan Chase (0440)",
    status: "Completed",
    amount: 1275.79,
    type: "debit",
  },
  {
    id: "TXN-1002",
    date: "5 Aug 2025",
    title: "Withdrawal to Citibank (2290)",
    status: "Completed",
    amount: 202.99,
    type: "debit",
  },
  {
    id: "TXN-1003",
    date: "5 Aug 2025",
    title: "Withdrawal to Bank of America (3311)",
    status: "Completed",
    amount: 1272.3,
    type: "debit",
  },
  {
    id: "TXN-1004",
    date: "4 Aug 2025",
    title: "Payment from Paddle",
    status: "Completed",
    amount: 5651.56,
    type: "credit",
  },
  {
    id: "TXN-1005",
    date: "4 Aug 2025",
    title: "Withdrawal to HSBC (5522)",
    status: "Completed",
    amount: 1679.35,
    type: "debit",
  },
  {
    id: "TXN-1006",
    date: "20 Aug 2025",
    title: "Withdrawal to JP Morgan Chase (1133)",
    status: "Completed",
    amount: 3420,
    type: "debit",
  },
  {
    id: "TXN-1007",
    date: "18 Aug 2025",
    title: "Payment from Stripe",
    status: "Completed",
    amount: 2345.75,
    type: "credit",
  },
];

export const upcomingTransactions: PaymentTransaction[] = [
  {
    id: "TXN-2001",
    date: "22 Aug 2025",
    title: "Scheduled withdrawal to Citibank (2290)",
    status: "Pending",
    amount: 450,
    type: "debit",
  },
  {
    id: "TXN-2002",
    date: "23 Aug 2025",
    title: "Expected payment from Stripe",
    status: "Pending",
    amount: 1875.5,
    type: "credit",
  },
  {
    id: "TXN-2003",
    date: "25 Aug 2025",
    title: "Scheduled withdrawal to HSBC (5522)",
    status: "Pending",
    amount: 725,
    type: "debit",
  },
];