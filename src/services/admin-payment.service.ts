import "server-only";

import { prisma } from "@/lib/prisma";

export async function getAdminPayments() {
  const attempts =
    await prisma.paymentAttempt.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        order: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
            paymentStatus: true,
            paymentMethod: true,
            total: true,
          },
        },
      },
    });

  return attempts.map((attempt) => ({
    id: attempt.id,

    attemptNumber:
      attempt.attemptNumber,

    provider:
      attempt.provider,

    amount:
      Number(attempt.amount),

    currency:
      attempt.currency,

    status:
      attempt.status,

    stripeCheckoutSessionId:
      attempt.stripeCheckoutSessionId,

    stripePaymentIntentId:
      attempt.stripePaymentIntentId,

    failureCode:
      attempt.failureCode,

    failureMessage:
      attempt.failureMessage,

    paidAt:
      attempt.paidAt,

    expiredAt:
      attempt.expiredAt,

    createdAt:
      attempt.createdAt,

    customer: {
      id: attempt.customer.id,
      name: attempt.customer.name,
      email: attempt.customer.email,
    },

    order: {
      id: attempt.order.id,

      orderNumber:
        attempt.order.orderNumber,

      status:
        attempt.order.status,

      paymentStatus:
        attempt.order.paymentStatus,

      paymentMethod:
        attempt.order.paymentMethod,

      total:
        Number(
          attempt.order.total,
        ),
    },
  }));
}

export async function getAdminPaymentStats() {
  const [
    totalAttempts,
    pendingAttempts,
    paidAttempts,
    failedAttempts,
    expiredAttempts,
    paidAggregate,
  ] = await Promise.all([
    prisma.paymentAttempt.count(),

    prisma.paymentAttempt.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.paymentAttempt.count({
      where: {
        status: "PAID",
      },
    }),

    prisma.paymentAttempt.count({
      where: {
        status: "FAILED",
      },
    }),

    prisma.paymentAttempt.count({
      where: {
        status: "EXPIRED",
      },
    }),

    prisma.paymentAttempt.aggregate({
      where: {
        status: "PAID",
      },

      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    totalAttempts,
    pendingAttempts,
    paidAttempts,
    failedAttempts,
    expiredAttempts,

    paidRevenue:
      Number(
        paidAggregate._sum.amount ??
          0,
      ),
  };
}