import { prisma } from "@/lib/prisma";

function percentageChange(
  current: number,
  previous: number,
) {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return Number(
    (
      ((current - previous) /
        previous) *
      100
    ).toFixed(1),
  );
}

function startOfMonth(
  date: Date,
) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
  );
}

export async function getAdminDashboardData() {
  const now = new Date();

  const currentMonthStart =
    startOfMonth(now);

  const previousMonthStart =
    new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );

  /*
   * =========================================
   * CURRENT MONTH REVENUE
   * =========================================
   */

  const currentRevenue =
    await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: currentMonthStart,
        },

        status: {
          not: "CANCELLED",
        },
      },

      _sum: {
        total: true,
      },
    });

  /*
   * =========================================
   * PREVIOUS MONTH REVENUE
   * =========================================
   */

  const previousRevenue =
    await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: previousMonthStart,
          lt: currentMonthStart,
        },

        status: {
          not: "CANCELLED",
        },
      },

      _sum: {
        total: true,
      },
    });

  const currentRevenueValue =
    Number(
      currentRevenue._sum.total ?? 0,
    );

  const previousRevenueValue =
    Number(
      previousRevenue._sum.total ?? 0,
    );

  /*
   * =========================================
   * CUSTOMERS
   * =========================================
   */

  const totalUsers =
    await prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    });

  const currentMonthUsers =
    await prisma.user.count({
      where: {
        role: "CUSTOMER",

        createdAt: {
          gte: currentMonthStart,
        },
      },
    });

  const previousMonthUsers =
    await prisma.user.count({
      where: {
        role: "CUSTOMER",

        createdAt: {
          gte: previousMonthStart,
          lt: currentMonthStart,
        },
      },
    });

  /*
   * =========================================
   * RECENT ORDERS
   * =========================================
   */

  const recentOrders =
    await prisma.order.findMany({
      take: 8,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            name: true,
          },
        },

        items: {
          take: 1,

          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

  /*
   * =========================================
   * BEST SELLING PRODUCTS
   * =========================================
   */

  const bestSellingGroups =
    await prisma.orderItem.groupBy({
      by: [
        "productId",
        "productName",
      ],

      where: {
        productId: {
          not: null,
        },

        order: {
          status: {
            not: "CANCELLED",
          },
        },
      },

      _sum: {
        quantity: true,
        subtotal: true,
      },

      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },

      take: 8,
    });
const bestSellingProductIds =
  bestSellingGroups
    .map(
      (item) =>
        item.productId,
    )
    .filter(
      (id): id is string =>
        id !== null,
    );

const bestSellingProductRecords =
  await prisma.product.findMany({
    where: {
      id: {
        in: bestSellingProductIds,
      },
    },

    select: {
      id: true,
      slug: true,
    },
  });

const productSlugMap =
  new Map(
    bestSellingProductRecords.map(
      (product) => [
        product.id,
        product.slug,
      ],
    ),
  );
  /*
   * =========================================
   * FORMAT RESPONSE
   * =========================================
   */

  const revenueChange =
    percentageChange(
      currentRevenueValue,
      previousRevenueValue,
    );

  const userGrowth =
    percentageChange(
      currentMonthUsers,
      previousMonthUsers,
    );
const currentYear =
  now.getFullYear();

const previousYear =
  currentYear - 1;

const currentYearStart =
  new Date(
    currentYear,
    0,
    1,
  );

const nextYearStart =
  new Date(
    currentYear + 1,
    0,
    1,
  );

const previousYearStart =
  new Date(
    previousYear,
    0,
    1,
  );

const currentYearOrders =
  await prisma.order.findMany({
    where: {
      createdAt: {
        gte: currentYearStart,
        lt: nextYearStart,
      },

      status: {
        not: "CANCELLED",
      },
    },

    select: {
      createdAt: true,
      total: true,
    },
  });

const previousYearOrders =
  await prisma.order.findMany({
    where: {
      createdAt: {
        gte: previousYearStart,
        lt: currentYearStart,
      },

      status: {
        not: "CANCELLED",
      },
    },

    select: {
      createdAt: true,
      total: true,
    },
  });

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const revenueChart =
  monthNames.map(
    (month, monthIndex) => {
      const currentRevenue =
        currentYearOrders
          .filter(
            (order) =>
              order.createdAt.getMonth() ===
              monthIndex,
          )
          .reduce(
            (sum, order) =>
              sum +
              Number(order.total),
            0,
          );

      const previousRevenue =
        previousYearOrders
          .filter(
            (order) =>
              order.createdAt.getMonth() ===
              monthIndex,
          )
          .reduce(
            (sum, order) =>
              sum +
              Number(order.total),
            0,
          );

      return {
        month,

        currentYear:
          currentRevenue,

        previousYear:
          previousRevenue,
      };
    },
  );

const currentYearRevenue =
  currentYearOrders.reduce(
    (sum, order) =>
      sum + Number(order.total),
    0,
  );

const previousYearRevenue =
  previousYearOrders.reduce(
    (sum, order) =>
      sum + Number(order.total),
    0,
  );
/*
 * =========================================
 * RETURNING CUSTOMER RATE
 * =========================================
 */

const customerOrders =
  await prisma.order.findMany({
    where: {
      status: {
        not: "CANCELLED",
      },

      createdAt: {
        lt: nextYearStart,
      },
    },

    select: {
      userId: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });

const firstOrderByCustomer =
  new Map<string, Date>();

for (const order of customerOrders) {
  if (
    !firstOrderByCustomer.has(
      order.userId,
    )
  ) {
    firstOrderByCustomer.set(
      order.userId,
      order.createdAt,
    );
  }
}

const returningRateChart =
  monthNames.map(
    (month, monthIndex) => {
      const monthOrders =
        customerOrders.filter(
          (order) =>
            order.createdAt.getFullYear() ===
              currentYear &&
            order.createdAt.getMonth() ===
              monthIndex,
        );

      const customerIds =
        Array.from(
          new Set(
            monthOrders.map(
              (order) =>
                order.userId,
            ),
          ),
        );

      let newCustomers = 0;
      let returningCustomers = 0;

      for (
        const customerId of customerIds
      ) {
        const firstOrderDate =
          firstOrderByCustomer.get(
            customerId,
          );

        if (!firstOrderDate) {
          continue;
        }

        if (
          firstOrderDate.getFullYear() ===
            currentYear &&
          firstOrderDate.getMonth() ===
            monthIndex
        ) {
          newCustomers += 1;
        } else {
          returningCustomers += 1;
        }
      }

      return {
        month,

        returningCustomers,
        newCustomers,
      };
    },
  );

const totalCurrentYearCustomers =
  returningRateChart.reduce(
    (total, month) =>
      total +
      month.returningCustomers +
      month.newCustomers,
    0,
  );

const totalReturningCustomers =
  returningRateChart.reduce(
    (total, month) =>
      total +
      month.returningCustomers,
    0,
  );

const returningRate =
  totalCurrentYearCustomers > 0
    ? Number(
        (
          (totalReturningCustomers /
            totalCurrentYearCustomers) *
          100
        ).toFixed(1),
      )
    : 0;

           const salesByCountryRaw =
  await prisma.order.groupBy({
    by: [
      "shippingCountry",
    ],

    where: {
      status: {
        not: "CANCELLED",
      },

      OR: [
        {
          paymentStatus:
            "PAID",
        },
        {
          paymentMethod:
            "COD",
        },
      ],
    },

    _sum: {
      total: true,
    },

    _count: {
      _all: true,
    },

    orderBy: {
      _sum: {
        total: "desc",
      },
    },

    take: 5,
  });

const totalLocationRevenue =
  salesByCountryRaw.reduce(
    (sum, country) =>
      sum +
      Number(
        country._sum.total ??
          0,
      ),
    0,
  );

const salesByLocation =
  salesByCountryRaw.map(
    (country) => {
      const revenue =
        Number(
          country._sum.total ??
            0,
        );

      return {
        country:
          country.shippingCountry,

        sales:
          revenue,

        orders:
          country._count._all,

        percentage:
          totalLocationRevenue >
          0
            ? Number(
                (
                  (revenue /
                    totalLocationRevenue) *
                  100
                ).toFixed(1),
              )
            : 0,
      };
    },
  );  
   const reviewGroups =
  await prisma.review.groupBy({
    by: ["rating"],

    where: {
      isVisible: true,
    },

    _count: {
      _all: true,
    },
  });

const totalReviews =
  reviewGroups.reduce(
    (sum, item) =>
      sum +
      item._count._all,
    0,
  );

const weightedRatingTotal =
  reviewGroups.reduce(
    (sum, item) =>
      sum +
      item.rating *
        item._count._all,
    0,
  );

const averageRating =
  totalReviews > 0
    ? Number(
        (
          weightedRatingTotal /
          totalReviews
        ).toFixed(1),
      )
    : 0;

const reviewDistribution =
  [5, 4, 3, 2, 1].map(
    (rating) => {
      const group =
        reviewGroups.find(
          (item) =>
            item.rating ===
            rating,
        );

      const count =
        group?._count._all ??
        0;

      return {
        rating,

        count,

        percentage:
          totalReviews > 0
            ? Number(
                (
                  (count /
                    totalReviews) *
                  100
                ).toFixed(1),
              )
            : 0,
      };
    },
  );

const latestReview =
  await prisma.review.findFirst({
    where: {
      isVisible: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      rating: true,
      title: true,
      comment: true,

      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    metrics: [
      {
        id: "revenue",

        title:
          "Monthly recurring revenue",

        value:
          `$${currentRevenueValue.toLocaleString(
            "en-US",
            {
              maximumFractionDigits: 2,
            },
          )}`,

        change: revenueChange,

        href: "/admin/payments",
      },

      {
        id: "users",

        title: "Users",

        value:
          totalUsers.toLocaleString(),

        change: userGrowth,

        href: "/admin/customers",
      },

      {
        id: "growth",

        title: "User growth",

        value: `${userGrowth}%`,

        change: userGrowth,

        href: "/admin/customers",
      },
    ],

    congratulations: {
      revenue:
        currentRevenueValue,

      change:
        revenueChange,
    },

    recentOrders:
      recentOrders.map(
        (order) => {
          let status:
            | "Processing"
            | "Paid"
            | "Success"
            | "Failed";

          if (
            order.status ===
            "DELIVERED"
          ) {
            status = "Success";
          } else if (
            order.paymentStatus ===
            "PAID"
          ) {
            status = "Paid";
          } else if (
            order.status ===
              "CANCELLED" ||
            order.paymentStatus ===
              "FAILED"
          ) {
            status = "Failed";
          } else {
            status =
              "Processing";
          }

//        const salesByCountryRaw =
//   await prisma.order.groupBy({
//     by: [
//       "shippingCountry",
//     ],

//     where: {
//       status: {
//         not: "CANCELLED",
//       },

//       OR: [
//         {
//           paymentStatus:
//             "PAID",
//         },
//         {
//           paymentMethod:
//             "COD",
//         },
//       ],
//     },

//     _sum: {
//       total: true,
//     },

//     _count: {
//       _all: true,
//     },

//     orderBy: {
//       _sum: {
//         total: "desc",
//       },
//     },

//     take: 5,
//   });

// const totalLocationRevenue =
//   salesByCountryRaw.reduce(
//     (sum, country) =>
//       sum +
//       Number(
//         country._sum.total ??
//           0,
//       ),
//     0,
//   );

// const salesByLocation =
//   salesByCountryRaw.map(
//     (country) => {
//       const revenue =
//         Number(
//           country._sum.total ??
//             0,
//         );

//       return {
//         country:
//           country.shippingCountry,

//         sales:
//           revenue,

//         orders:
//           country._count._all,

//         percentage:
//           totalLocationRevenue >
//           0
//             ? Number(
//                 (
//                   (revenue /
//                     totalLocationRevenue) *
//                   100
//                 ).toFixed(1),
//               )
//             : 0,
//       };
//     },
//   );  
//    const reviewGroups =
//   await prisma.review.groupBy({
//     by: ["rating"],

//     where: {
//       isVisible: true,
//     },

//     _count: {
//       _all: true,
//     },
//   });

// const totalReviews =
//   reviewGroups.reduce(
//     (sum, item) =>
//       sum +
//       item._count._all,
//     0,
//   );

// const weightedRatingTotal =
//   reviewGroups.reduce(
//     (sum, item) =>
//       sum +
//       item.rating *
//         item._count._all,
//     0,
//   );

// const averageRating =
//   totalReviews > 0
//     ? Number(
//         (
//           weightedRatingTotal /
//           totalReviews
//         ).toFixed(1),
//       )
//     : 0;

// const reviewDistribution =
//   [5, 4, 3, 2, 1].map(
//     (rating) => {
//       const group =
//         reviewGroups.find(
//           (item) =>
//             item.rating ===
//             rating,
//         );

//       const count =
//         group?._count._all ??
//         0;

//       return {
//         rating,

//         count,

//         percentage:
//           totalReviews > 0
//             ? Number(
//                 (
//                   (count /
//                     totalReviews) *
//                   100
//                 ).toFixed(1),
//               )
//             : 0,
//       };
//     },
//   );

// const latestReview =
//   await prisma.review.findFirst({
//     where: {
//       isVisible: true,
//     },

//     orderBy: {
//       createdAt: "desc",
//     },

//     select: {
//       rating: true,
//       title: true,
//       comment: true,

//       user: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });


         return {
  id:
    order.orderNumber,

  orderNumber:
    order.orderNumber,

  customerId:
    order.userId,

  customer:
    order.user.name,

  avatar: "",

  product:
    order.items[0]
      ?.productName ??
    "Order",

  amount:
    Number(order.total),

  status,
};
        },
      ),

    bestSellingProducts:
      bestSellingGroups.map(
        (product) => ({
          id:
            product.productId ??
            product.productName,
slug:
        product.productId
          ? productSlugMap.get(
              product.productId,
            ) ?? null
          : null,
          name:
            product.productName,

          shortName:
            product.productName
              .split(" ")
              .map(
                (word) =>
                  word[0],
              )
              .join("")
              .slice(0, 2)
              .toUpperCase(),

          sold:
            product._sum
              .quantity ?? 0,

          sales:
            Number(
              product._sum
                .subtotal ?? 0,
            ),
        }),
      ),
      revenueChart,

  revenueSummary: {
    currentYear:
      currentYearRevenue,

    previousYear:
      previousYearRevenue,

    currentYearLabel:
      currentYear.toString(),

    previousYearLabel:
      previousYear.toString(),
  },
  returningRateChart,

returningRateSummary: {
  rate:
    returningRate,

  returningCustomers:
    totalReturningCustomers,

  totalCustomers:
    totalCurrentYearCustomers,
},
salesByLocation,

customerReviews: {
  totalReviews,

  averageRating,

  distribution:
    reviewDistribution,

  latest:
    latestReview
      ? {
          rating:
            latestReview.rating,

          title:
            latestReview.title,

          comment:
            latestReview.comment,

          customerName:
            latestReview.user.name,
        }
      : null,
},
  };
}
