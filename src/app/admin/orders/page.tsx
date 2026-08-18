import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import AdminOrdersTable from "@/components/admin/orders/admin-orders-table";

export default async function AdminOrdersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const orders =
    await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },

        items: {
          orderBy: {
            createdAt: "asc",
          },

          include: {
            product: {
              select: {
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

  const rows = orders.map(
    (order) => {
      const firstItem =
        order.items[0];

      return {
        id: order.id,

        orderNumber:
          order.orderNumber,

        customerName:
          order.user.name,

        customerEmail:
          order.user.email,

        status:
          order.status,

        paymentStatus:
          order.paymentStatus,

        paymentMethod:
          order.paymentMethod,

        total:
          Number(order.total),

        createdAt:
          order.createdAt.toISOString(),

        productName:
          firstItem?.productName ??
          "Order",

        productImage:
          firstItem?.productImage ??
          null,

        category:
          firstItem?.product
            ?.category?.name ??
          "Uncategorized",

        itemCount:
          order.items.length,
      };
    },
  );

  return (
    <main className="w-full bg-[#FAFAFA]">
      <div
        className="
          mx-auto
          w-full
          px-[16px]
          py-[18px]

          min-[800px]:px-[22px]
          min-[1200px]:px-[26px]
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-[16px]
          "
        >
          <h1
            className="
              m-0
              text-[24px]
              font-semibold
              leading-none
              text-black
            "
          >
            Orders
          </h1>

         <button
  type="button"
  className="
    inline-flex
    min-h-[40px]
    min-w-[132px]

    items-center
    justify-center

    gap-[8px]

    rounded-[7px]

    px-[16px]
    py-[10px]

    text-[12px]
    font-semibold
    leading-[16px]

    whitespace-nowrap

    transition-opacity
    hover:opacity-90
  "
  style={{
    backgroundColor: "#0D0D0F",
    border: "1px solid #0D0D0F",
    color: "#FFFFFF",
  }}
>
  <span
    className="
      flex
      h-[16px]
      w-[16px]
      shrink-0
      items-center
      justify-center

      text-[17px]
      font-normal
      leading-none
    "
    style={{
      color: "#FFFFFF",
    }}
  >
    +
  </span>

  <span
    className="
      flex
      items-center
      justify-center

      leading-[16px]
    "
    style={{
      color: "#FFFFFF",
    }}
  >
    Create Order
  </span>
</button>
        </div>

        <div className="mt-[18px]">
          <AdminOrdersTable
            initialOrders={rows}
          />
        </div>
      </div>
    </main>
  );
}