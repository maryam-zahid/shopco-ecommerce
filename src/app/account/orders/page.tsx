import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function MyOrdersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account/orders");
  }

  if (session.user.role !== "CUSTOMER") {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      items: true,
    },
  });

  return (
    <main className="w-full bg-white">
      <section
        className="
          mx-auto
          w-full
          px-[16px]
          py-[40px]

          min-[800px]:px-[32px]

          min-[1200px]:max-w-[1240px]
          min-[1200px]:px-0
          min-[1200px]:py-[56px]
        "
      >
        <div
          className="
            flex
            items-center
            gap-[8px]

            text-[14px]
            text-black/50
          "
        >
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Account</span>
          <span>/</span>
          <span className="text-black">
            Orders
          </span>
        </div>

        <h1
          className="
            mt-[12px]
            text-[34px]
            leading-[40px]
            text-black

            min-[800px]:text-[42px]
          "
          style={{
            fontFamily:
              "var(--font-archivo-black)",
          }}
        >
          MY ORDERS
        </h1>

        {orders.length === 0 ? (
          <div
            className="
              mt-[28px]
              rounded-[16px]
              border
              border-black/10
              bg-white
              px-[24px]
              py-[60px]
              text-center
            "
          >
            <p className="text-[16px] text-black/60">
              You have not placed any orders yet.
            </p>

            <Link
              href="/"
              className="
                mt-[20px]
                inline-flex
                h-[46px]
                items-center
                justify-center
                rounded-full
                bg-black
                px-[24px]
                text-[14px]
                font-medium
                text-white
              "
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-[28px] space-y-[18px]">
            {orders.map((order) => (
              <article
                key={order.id}
                className="
                  overflow-hidden
                  rounded-[16px]
                  border
                  border-black/10
                  bg-white
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-[12px]
                    border-b
                    border-black/10
                    bg-[#F8F8F8]
                    px-[18px]
                    py-[16px]

                    min-[800px]:flex-row
                    min-[800px]:items-center
                    min-[800px]:justify-between
                  "
                >
                  <div>
                    <p
                      className="
                        text-[14px]
                        font-semibold
                        text-black
                      "
                    >
                      {order.orderNumber}
                    </p>

                    <p
                      className="
                        mt-[3px]
                        text-[12px]
                        text-black/50
                      "
                    >
                      {order.createdAt.toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-[8px]
                    "
                  >
                    <Badge>
                      {order.status}
                    </Badge>

                    <Badge>
                      {order.paymentMethod}
                    </Badge>

                    <Badge>
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </div>

                <div className="p-[18px]">
                  <div className="space-y-[14px]">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="
                          flex
                          items-center
                          gap-[14px]
                        "
                      >
                        <div
                          className="
                            relative
                            h-[76px]
                            w-[76px]
                            shrink-0
                            overflow-hidden
                            rounded-[8px]
                            bg-[#F0EEED]
                          "
                        >
                          {item.productImage && (
                            <Image
                              src={item.productImage}
                              alt={item.productName}
                              fill
                              sizes="76px"
                              className="object-contain"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className="
                              truncate
                              text-[14px]
                              font-semibold
                              text-black
                            "
                          >
                            {item.productName}
                          </p>

                          <p
                            className="
                              mt-[3px]
                              text-[12px]
                              text-black/50
                            "
                          >
                            {item.colorName}
                            {" / "}
                            {item.size}
                            {" × "}
                            {item.quantity}
                          </p>
                        </div>

                        <p
                          className="
                            shrink-0
                            text-[14px]
                            font-semibold
                            text-black
                          "
                        >
                          $
                          {Number(
                            item.subtotal,
                          ).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="my-[18px] h-px bg-black/10" />

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-[16px]
                    "
                  >
                    <span className="text-[14px] text-black/60">
                      Order Total
                    </span>

                    <span className="text-[20px] font-bold text-black">
                      $
                      {Number(
                        order.total,
                      ).toFixed(2)}
                    </span>
                  </div>
         <div
  className="
    mt-[18px]

    flex
    flex-col
    gap-[14px]
  "
>
  {/* DELIVERY PROGRESS */}

  {order.status !== "CANCELLED" && (
    <div>
      <div
        className="
          flex
          items-center
          justify-between

          text-[10px]
          font-medium
          text-black/45
        "
      >
        <span>Processing</span>
        <span>Shipped</span>
        <span>Out for Delivery</span>
        <span>Delivered</span>
      </div>

      <div
        className="
          relative

          mt-[8px]

          h-[6px]
          w-full

          overflow-hidden

          rounded-full

          bg-black/10
        "
      >
        <div
          className="
            absolute
            inset-y-0
            left-0

            rounded-full

            bg-black

            transition-all
            duration-500
          "
          style={{
            width:
              order.status === "DELIVERED"
                ? "100%"
                : order.status === "OUT_FOR_DELIVERY"
                  ? "75%"
                  : order.status === "SHIPPED"
                    ? "50%"
                    : order.status === "CONFIRMED" ||
                        order.status === "PROCESSING"
                      ? "25%"
                      : "0%",
          }}
        />
      </div>
    </div>
  )}

  {/* VIEW DETAILS */}

  <Link
    href={`/account/orders/${order.orderNumber}`}
    className="
      inline-flex
      min-h-[44px]
      w-full
      items-center
      justify-center

      rounded-[62px]

      px-[20px]
      py-[11px]

      text-[13px]
      font-medium
      leading-[18px]

      no-underline

      transition-opacity
      duration-200

      hover:opacity-85
    "
    style={{
      backgroundColor: "#000000",
      border: "1px solid #000000",
      color: "#FFFFFF",
      fontFamily: "var(--font-satoshi)",
    }}
  >
    <span
      style={{
        color: "#FFFFFF",
      }}
    >
      View Order Details
    </span>
  </Link>
</div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Badge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        rounded-full
        border
        border-black/10
        bg-white
        px-[10px]
        py-[5px]
        text-[11px]
        font-medium
        text-black
      "
    >
      {children}
    </span>
  );
}