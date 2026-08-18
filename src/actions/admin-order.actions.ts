"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  sendOrderStatusEmail,
} from "@/lib/mail";
type AdminOrderStatus =
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

type UpdateOrderStatusResult = {
  success: boolean;
  message: string;
};

export async function updateOrderStatusAction(
  input: {
    orderId: string;
    status: AdminOrderStatus;
  },
): Promise<UpdateOrderStatusResult> {
  const session = await auth();

  if (
    !session?.user?.id ||
    session.user.role !== "ADMIN"
  ) {
    return {
      success: false,
      message: "Admin access required.",
    };
  }

  if (!input.orderId) {
    return {
      success: false,
      message: "Order ID is required.",
    };
  }

  const allowedStatuses: AdminOrderStatus[] = [
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ];

  if (!allowedStatuses.includes(input.status)) {
    return {
      success: false,
      message: "Invalid order status.",
    };
  }

  try {
   const existingOrder =
  await prisma.order.findUnique({
    where: {
      id: input.orderId,
    },

    select: {
      id: true,
      orderNumber: true,
      status: true,

      shippingFullName: true,
      shippingEmail: true,

      confirmedAt: true,
      processingAt: true,
      shippedAt: true,
      outForDeliveryAt: true,
      deliveredAt: true,
      cancelledAt: true,
    },
  });

    if (!existingOrder) {
      return {
        success: false,
        message: "Order not found.",
      };
    }

    /*
     * We do not allow a delivered/cancelled order
     * to be silently moved back into fulfillment.
     */
    if (
      existingOrder.status === "DELIVERED" &&
      input.status !== "DELIVERED"
    ) {
      return {
        success: false,
        message:
          "A delivered order cannot be moved to another status.",
      };
    }

    if (
      existingOrder.status === "CANCELLED" &&
      input.status !== "CANCELLED"
    ) {
      return {
        success: false,
        message:
          "A cancelled order cannot be moved to another status.",
      };
    }

    const now = new Date();

    await prisma.order.update({
      where: {
        id: input.orderId,
      },

      data: {
        status: input.status,

        confirmedAt:
          input.status === "CONFIRMED"
            ? existingOrder.confirmedAt ?? now
            : existingOrder.confirmedAt,

        processingAt:
          input.status === "PROCESSING"
            ? existingOrder.processingAt ?? now
            : existingOrder.processingAt,

        shippedAt:
          input.status === "SHIPPED"
            ? existingOrder.shippedAt ?? now
            : existingOrder.shippedAt,
outForDeliveryAt:
  input.status === "OUT_FOR_DELIVERY"
    ? existingOrder.outForDeliveryAt ?? now
    : existingOrder.outForDeliveryAt,

        deliveredAt:
          input.status === "DELIVERED"
            ? existingOrder.deliveredAt ?? now
            : existingOrder.deliveredAt,

        cancelledAt:
          input.status === "CANCELLED"
            ? existingOrder.cancelledAt ?? now
            : existingOrder.cancelledAt,
      },
    });
    console.log(
  "ORDER_EMAIL_DEBUG:",
  {
    shippingEmail:
      existingOrder.shippingEmail,

    shippingFullName:
      existingOrder.shippingFullName,

    oldStatus:
      existingOrder.status,

    newStatus:
      input.status,

    hasEmail:
      Boolean(
        existingOrder.shippingEmail,
      ),

    statusChanged:
      existingOrder.status !==
      input.status,
  },
);
    if (
  existingOrder.shippingEmail &&
  existingOrder.status !== input.status &&
  input.status !== "CONFIRMED"
) {
  try {
    await sendOrderStatusEmail({
      to: existingOrder.shippingEmail,

      customerName:
        existingOrder.shippingFullName,

      orderNumber:
        existingOrder.orderNumber,

      status: input.status,
    });
  } catch (emailError) {
    console.error(
      "ORDER_STATUS_EMAIL_ERROR:",
      emailError,
    );
  }
}

    revalidatePath("/admin/orders");
    revalidatePath("/account/orders");

    return {
      success: true,
      message: `Order marked as ${input.status.toLowerCase()}.`,
    };
  } catch (error) {
    console.error(
      "ADMIN_ORDER_STATUS_ERROR:",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update order status.",
    };
  }
}
export async function markCodOrderPaidAction(
  input: {
    orderId: string;
  },
) {
  try {
    const session =
      await auth();

    if (
      !session?.user?.id ||
      session.user.role !==
        "ADMIN"
    ) {
      return {
        success: false,
        message:
          "Admin access required.",
      };
    }

   const order =
  await prisma.order.findUnique({
    where: {
      id: input.orderId,
    },

    select: {
  id: true,
  userId: true,
  total: true,
  paymentMethod: true,
  paymentStatus: true,
  orderNumber: true,
},
  });

    if (!order) {
      return {
        success: false,
        message:
          "Order not found.",
      };
    }

    if (
      order.paymentMethod !==
      "COD"
    ) {
      return {
        success: false,

        message:
          "Card payment status is controlled by Stripe.",
      };
    }

    if (
      order.paymentStatus ===
      "PAID"
    ) {
      return {
        success: true,
        message:
          "This COD order is already marked as paid.",
      };
    }

    await prisma.$transaction(
  async (tx) => {
    await tx.order.update({
      where: {
        id: order.id,
      },

      data: {
        paymentStatus: "PAID",
      },
    });

    const existingAttempt =
      await tx.paymentAttempt.findFirst({
        where: {
          orderId: order.id,
          provider: "COD",
        },

        orderBy: {
          attemptNumber: "desc",
        },
      });

    if (existingAttempt) {
      await tx.paymentAttempt.update({
        where: {
          id: existingAttempt.id,
        },

        data: {
          status: "PAID",
          amount: order.total,
          paidAt: new Date(),
          failureCode: null,
          failureMessage: null,
          expiredAt: null,
        },
      });
    } else {
      const lastAttempt =
        await tx.paymentAttempt.findFirst({
          where: {
            orderId: order.id,
          },

          orderBy: {
            attemptNumber: "desc",
          },

          select: {
            attemptNumber: true,
          },
        });

      await tx.paymentAttempt.create({
        data: {
          orderId: order.id,
customerId: order.userId,
          attemptNumber:
            (lastAttempt?.attemptNumber ??
              0) + 1,

          provider: "COD",

          amount: order.total,
          currency: "usd",

          status: "PAID",
          paidAt: new Date(),
        },
      });
    }
  },
);

   revalidatePath(
  "/admin/orders",
);

revalidatePath(
  `/admin/orders/${order.orderNumber}`,
);

revalidatePath(
  "/admin/payments",
);

revalidatePath(
  "/account/orders",
);

return {
  success: true,

  message:
    "Cash on Delivery payment marked as paid.",
};
  } catch (error) {
    console.error(
      "MARK_COD_PAID_ERROR:",
      error,
    );

    return {
      success: false,

      message:
        "Unable to update payment status.",
    };
  }
}