import "server-only";

import { prisma } from "@/lib/prisma";

type ProductListOptions = {
  page?: number;
  pageSize?: number;

  categorySlug?: string;
  dressStyleSlug?: string;

  minPrice?: number;
  maxPrice?: number;

  color?: string;
  size?: string;

  search?: string;

  sort?:
    | "newest"
    | "price-low-high"
    | "price-high-low";
};

export async function getActiveProducts(
  options: ProductListOptions = {},
) {
  const {
    page = 1,
    pageSize = 9,

    categorySlug,
    dressStyleSlug,

    minPrice,
    maxPrice,

    color,
    size,

    search,

    sort = "newest",
  } = options;

  const safePage =
    Number.isInteger(page) && page > 0
      ? page
      : 1;

  const safePageSize =
    Number.isInteger(pageSize) &&
    pageSize > 0 &&
    pageSize <= 50
      ? pageSize
      : 9;

  const skip =
    (safePage - 1) * safePageSize;

  const where = {
    status: "ACTIVE" as const,

    ...(categorySlug
      ? {
          category: {
            slug: categorySlug,
            isActive: true,
          },
        }
      : {}),

    ...(dressStyleSlug
      ? {
          dressStyle: {
            slug: dressStyleSlug,
            isActive: true,
          },
        }
      : {}),

    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),

    ...(minPrice !== undefined ||
    maxPrice !== undefined
      ? {
          price: {
            ...(minPrice !== undefined
              ? {
                  gte: minPrice,
                }
              : {}),

            ...(maxPrice !== undefined
              ? {
                  lte: maxPrice,
                }
              : {}),
          },
        }
      : {}),

    ...(color || size
      ? {
          variants: {
            some: {
              isActive: true,

              ...(color
                ? {
                    colorName: {
                      equals: color,
                      mode: "insensitive" as const,
                    },
                  }
                : {}),

              ...(size
                ? {
                    size: {
                      equals: size,
                      mode: "insensitive" as const,
                    },
                  }
                : {}),
            },
          },
        }
      : {}),
  };

  const orderBy =
    sort === "price-low-high"
      ? {
          price: "asc" as const,
        }
      : sort === "price-high-low"
        ? {
            price: "desc" as const,
          }
        : {
            createdAt: "desc" as const,
          };

const [products, total] =
  await Promise.all([
    prisma.product.findMany({
      where,

      orderBy,

      skip,
      take: safePageSize,

      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },

        dressStyle: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },

        variants: {
          where: {
            isActive: true,
          },

          select: {
            id: true,
            sku: true,
            colorName: true,
            colorValue: true,
            size: true,
            stock: true,
            priceOverride: true,
            isActive: true,
          },
        },

        _count: {
          select: {
            reviews: true,
          },
        },
      },
    }),

    prisma.product.count({
      where,
    }),
  ]);

  return {
    products,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      total,
      totalPages: Math.ceil(
        total / safePageSize,
      ),
    },
  };
}

// export async function getProductBySlug(
//   slug: string,
// ) {
//   return prisma.product.findFirst({
//     where: {
//       slug,
//       status: "ACTIVE",

//       category: {
//         isActive: true,
//       },
//     },

//     include: {
//       category: {
//         select: {
//           id: true,
//           name: true,
//           slug: true,
//         },
//       },

//       dressStyle: {
//         select: {
//           id: true,
//           name: true,
//           slug: true,
//         },
//       },

//       variants: {
//         where: {
//           isActive: true,
//         },

//         orderBy: [
//           {
//             colorName: "asc",
//           },
//           {
//             size: "asc",
//           },
//         ],
//       },

//       reviews: {
//         where: {
//           isVisible: true,
//         },

//         orderBy: {
//           createdAt: "desc",
//         },

//         select: {
//           id: true,
//           rating: true,
//           title: true,
//           comment: true,
//           createdAt: true,

//           user: {
//             select: {
//               name: true,
//             },
//           },
//         },
//       },
//     },
//   });
// }
export async function getProductBySlug(
  slug: string,
) {
  return prisma.product.findFirst({
    where: {
      slug,
      status: "ACTIVE",
    },

    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },

      variants: {
        where: {
          isActive: true,
        },

        orderBy: [
          {
            colorName: "asc",
          },
          {
            size: "asc",
          },
        ],
      },

      reviews: {
        where: {
          isVisible: true,
        },

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          rating: true,
          title: true,
          comment: true,
          createdAt: true,

          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function getNewArrivalProducts(
  limit = 4,
) {
  return prisma.product.findMany({
    where: {
      status: "ACTIVE",
      isNewArrival: true,

      category: {
        isActive: true,
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    take: limit,

    include: {
      variants: {
        where: {
          isActive: true,
        },

        select: {
          stock: true,
        },
      },

      reviews: {
        where: {
          isVisible: true,
        },

        select: {
          rating: true,
        },
      },
    },
  });
}

export async function getFeaturedProducts(
  limit = 4,
) {
  return prisma.product.findMany({
    where: {
      status: "ACTIVE",
      isFeatured: true,

      category: {
        isActive: true,
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    take: limit,

    include: {
      variants: {
        where: {
          isActive: true,
        },

        select: {
          stock: true,
        },
      },

      _count: {
        select: {
          reviews: true,
        },
      },
    },
  });
}

export async function getTopSellingProducts(
  limit = 4,
) {
  return prisma.product.findMany({
    where: {
      status: "ACTIVE",

      category: {
        isActive: true,
      },

      variants: {
        some: {
          isActive: true,
          stock: {
            gt: 0,
          },
        },
      },
    },

    orderBy: [
      {
        orderItems: {
          _count: "desc",
        },
      },
      {
        createdAt: "desc",
      },
    ],

    take: limit,

    include: {
      variants: {
        where: {
          isActive: true,
        },

        select: {
          stock: true,
        },
      },

      reviews: {
        where: {
          isVisible: true,
        },

        select: {
          rating: true,
        },
      },
    },
  });
}