import { redirect } from "next/navigation";

import { auth } from "@/auth";

import PaymentDashboard from "@/components/admin/payments/payment-dashboard";

import {
  getAdminPayments,
  getAdminPaymentStats,
} from "@/services/admin-payment.service";

export default async function PaymentsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const [payments, stats] =
    await Promise.all([
      getAdminPayments(),
      getAdminPaymentStats(),
    ]);

  return (
    <PaymentDashboard
      payments={payments.map((payment) => ({
        ...payment,

        createdAt:
          payment.createdAt.toISOString(),

        paidAt:
          payment.paidAt?.toISOString() ??
          null,

        expiredAt:
          payment.expiredAt?.toISOString() ??
          null,
      }))}
      stats={stats}
    />
  );
}