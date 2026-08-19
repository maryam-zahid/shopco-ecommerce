import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import AdminCustomersClient from "@/components/admin/customers/admin-customers-client";

export default async function AdminCustomersPage() {
  const session =
    await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (
    session.user.role !== "ADMIN"
  ) {
    redirect("/");
  }

  const customers =
    await prisma.user.findMany({
      where: {
        role: "CUSTOMER",
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
      orders: {
  select: {
    total: true,
    status: true,
    paymentStatus: true,
    paymentMethod: true,
  },
},

        _count: {
          select: {
            orders: true,
            reviews: true,
            addresses: true,
          },
        },
      },
    });

  const rows =
    customers.map(
      (customer) => {
        const totalSpent =
          customer.orders
            .filter(
              (order) =>
                order.status !==
                  "CANCELLED" &&
                (
                  order.paymentMethod ===
                    "COD" ||
                  order.paymentStatus ===
                    "PAID"
                ),
            )
            .reduce(
              (
                total,
                order,
              ) =>
                total +
                Number(
                  order.total,
                ),
              0,
            );

        return {
          id:
            customer.id,

          name:
            customer.name,

          email:
            customer.email,

          emailVerified:
            customer.emailVerified
              ? customer.emailVerified.toISOString()
              : null,

          isActive:
            customer.isActive,

          orderCount:
            customer._count
              .orders,

          reviewCount:
            customer._count
              .reviews,

          addressCount:
            customer._count
              .addresses,

          totalSpent,

          createdAt:
            customer.createdAt.toISOString(),
        };
      },
    );

  return (
    <div className="w-full">
      <div
        className="
          mb-[24px]

          flex
          flex-col
          gap-[12px]

          min-[700px]:flex-row
          min-[700px]:items-end
          min-[700px]:justify-between
        "
      >
        <div>
          <h1
            className="
              text-[28px]
              font-bold
              text-black
            "
          >
            Customers
          </h1>

          <p
            className="
              mt-[5px]
              text-[14px]
              text-black/50
            "
          >
            Manage customer accounts and review their activity.
          </p>
        </div>

        <div
          className="
            rounded-[8px]

            border
            border-black/15

            bg-white

            px-[14px]
            py-[8px]

            text-[13px]
            text-black/60
          "
          style={{
            border:
              "1.5px solid rgba(0,0,0,0.16)",
          }}
        >
          {rows.length} Customers
        </div>
      </div>

   <AdminCustomersClient
  initialCustomers={rows}
/>
    </div>
  );
}