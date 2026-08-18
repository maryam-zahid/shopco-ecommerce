import "server-only";

import { prisma } from "@/lib/prisma";

export async function getAdminProducts() {
  const products =
    await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },

     include: {
  category: true,

  dressStyle: true,

  variants: {
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

    select: {
      rating: true,
    },
  },
},
    });

  return products.map((product) => {
    const totalStock =
      product.variants.reduce(
        (total, variant) =>
          total + variant.stock,
        0,
      );

    return {
      id: product.id,

      name: product.name,
      slug: product.slug,

      description:
        product.description,

      price:
        Number(product.price),

      discountPrice:
        product.discountPrice !== null
          ? Number(product.discountPrice)
          : null,

      images:
        product.images,

      status:
        product.status,

      isFeatured:
        product.isFeatured,

      isNewArrival:
        product.isNewArrival,

      category: {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug,
      },

      dressStyle:
        product.dressStyle
          ? {
              id:
                product.dressStyle.id,

              name:
                product.dressStyle.name,

              slug:
                product.dressStyle.slug,
            }
          : null,

      totalStock,
reviews:
    product.reviews,
      variants:
        product.variants.map(
          (variant) => ({
            id: variant.id,

            sku: variant.sku,

            colorName:
              variant.colorName,

            colorValue:
              variant.colorValue,

            size:
              variant.size,

            stock:
              variant.stock,

            priceOverride:
              variant.priceOverride !==
              null
                ? Number(
                    variant.priceOverride,
                  )
                : null,

            isActive:
              variant.isActive,
          }),
        ),

      createdAt:
        product.createdAt,
    };
  });
}

export async function getAdminProductById(
  productId: string,
) {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },

    include: {
      category: true,
      dressStyle: true,

      variants: {
        orderBy: [
          {
            colorName: "asc",
          },
          {
            size: "asc",
          },
        ],
      },
    },
  });
}

export async function getAdminProductOptions() {
  const [categories, dressStyles] =
    await Promise.all([
      prisma.category.findMany({
        where: {
          isActive: true,
        },

        orderBy: {
          name: "asc",
        },
      }),

      prisma.dressStyle.findMany({
        where: {
          isActive: true,
        },

        orderBy: {
          name: "asc",
        },
      }),
    ]);

  return {
    categories,
    dressStyles,
  };
}