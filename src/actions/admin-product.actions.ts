"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type ActionResult = {
  success: boolean;
  message: string;
};

async function requireAdmin() {
  const session = await auth();

  if (
    !session?.user?.id ||
    session.user.role !== "ADMIN"
  ) {
    throw new Error(
      "Admin access required.",
    );
  }

  return session;
}

/*
 * =========================================
 * PRODUCT STATUS
 * =========================================
 */

export async function updateProductStatusAction(
  input: {
    productId: string;
    status:
      | "DRAFT"
      | "ACTIVE"
      | "ARCHIVED";
  },
): Promise<ActionResult> {
  try {
    await requireAdmin();

    await prisma.product.update({
      where: {
        id: input.productId,
      },

      data: {
        status: input.status,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/products");

    return {
      success: true,
      message: `Product marked as ${input.status.toLowerCase()}.`,
    };
  } catch (error) {
    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to update product.",
    };
  }
}

/*
 * =========================================
 * FEATURED
 * =========================================
 */

export async function toggleProductFeaturedAction(
  input: {
    productId: string;
    isFeatured: boolean;
  },
): Promise<ActionResult> {
  try {
    await requireAdmin();

    await prisma.product.update({
      where: {
        id: input.productId,
      },

      data: {
        isFeatured:
          input.isFeatured,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/products");

    return {
      success: true,
      message:
        input.isFeatured
          ? "Product marked as featured."
          : "Product removed from featured products.",
    };
  } catch (error) {
    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to update product.",
    };
  }
}

/*
 * =========================================
 * NEW ARRIVAL
 * =========================================
 */

export async function toggleProductNewArrivalAction(
  input: {
    productId: string;
    isNewArrival: boolean;
  },
): Promise<ActionResult> {
  try {
    await requireAdmin();

    await prisma.product.update({
      where: {
        id: input.productId,
      },

      data: {
        isNewArrival:
          input.isNewArrival,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/products");

    return {
      success: true,

      message:
        input.isNewArrival
          ? "Product added to New Arrivals."
          : "Product removed from New Arrivals.",
    };
  } catch (error) {
    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to update product.",
    };
  }
}

/*
 * =========================================
 * VARIANT STOCK
 * =========================================
 */

export async function updateVariantStockAction(
  input: {
    variantId: string;
    stock: number;
  },
): Promise<ActionResult> {
  try {
    await requireAdmin();

    if (
      !Number.isInteger(input.stock) ||
      input.stock < 0
    ) {
      return {
        success: false,
        message:
          "Stock must be a whole number of 0 or greater.",
      };
    }

    await prisma.productVariant.update({
      where: {
        id: input.variantId,
      },

      data: {
        stock: input.stock,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/admin/inventory");

    return {
      success: true,
      message:
        "Variant stock updated successfully.",
    };
  } catch (error) {
    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to update stock.",
    };
  }
}

/*
 * =========================================
 * VARIANT ACTIVE
 * =========================================
 */

export async function toggleVariantActiveAction(
  input: {
    variantId: string;
    isActive: boolean;
  },
): Promise<ActionResult> {
  try {
    await requireAdmin();

    await prisma.productVariant.update({
      where: {
        id: input.variantId,
      },

      data: {
        isActive:
          input.isActive,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/admin/inventory");

    return {
      success: true,

      message:
        input.isActive
          ? "Variant activated."
          : "Variant deactivated.",
    };
  } catch (error) {
    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to update variant.",
    };
  }
}
export async function updateProductAction(
  input: {
    productId: string;

    name: string;
    description: string;

    price: number;
    discountPrice: number | null;

    categoryId: string;
    dressStyleId: string | null;

    status:
      | "DRAFT"
      | "ACTIVE"
      | "ARCHIVED";

    isFeatured: boolean;
    isNewArrival: boolean;
  },
): Promise<ActionResult> {
  try {
    await requireAdmin();

    if (!input.productId) {
      return {
        success: false,
        message:
          "Product ID is required.",
      };
    }

    if (
      !input.name.trim() ||
      !input.description.trim()
    ) {
      return {
        success: false,
        message:
          "Name and description are required.",
      };
    }

    if (
      !Number.isFinite(input.price) ||
      input.price <= 0
    ) {
      return {
        success: false,
        message:
          "Please enter a valid product price.",
      };
    }

    if (
      input.discountPrice !== null &&
      (
        input.discountPrice <= 0 ||
        input.discountPrice >=
          input.price
      )
    ) {
      return {
        success: false,
        message:
          "Discount price must be lower than the regular price.",
      };
    }

    const category =
      await prisma.category.findUnique({
        where: {
          id: input.categoryId,
        },
      });

    if (!category) {
      return {
        success: false,
        message:
          "Selected category is invalid.",
      };
    }

    if (input.dressStyleId) {
      const dressStyle =
        await prisma.dressStyle.findUnique({
          where: {
            id: input.dressStyleId,
          },
        });

      if (!dressStyle) {
        return {
          success: false,
          message:
            "Selected dress style is invalid.",
        };
      }
    }

    await prisma.product.update({
      where: {
        id: input.productId,
      },

      data: {
        name:
          input.name.trim(),

        description:
          input.description.trim(),

        price:
          input.price,

        discountPrice:
          input.discountPrice,

        categoryId:
          input.categoryId,

        dressStyleId:
          input.dressStyleId,

        status:
          input.status,

        isFeatured:
          input.isFeatured,

        isNewArrival:
          input.isNewArrival,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath(
      `/product`,
    );
    revalidatePath(
      "/category/new-arrivals",
    );

    return {
      success: true,
      message:
        "Product updated successfully.",
    };
  } catch (error) {
    console.error(
      "UPDATE_PRODUCT_ERROR:",
      error,
    );

    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to update product.",
    };
  }
}
export async function createProductAction(
  input: {
    name: string;

    slug: string;

    description: string;

    price: number;

    discountPrice:
      | number
      | null;

    categoryId: string;

    dressStyleId:
      | string
      | null;

    status:
      | "DRAFT"
      | "ACTIVE"
      | "ARCHIVED";

    isFeatured: boolean;

    isNewArrival: boolean;

    images: string[];

    variants: {
      sku: string;

      colorName: string;

      colorValue:
        | string
        | null;

      size: string;

      stock: number;

      priceOverride:
        | number
        | null;
    }[];
  },
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const name =
      input.name.trim();

    const slug =
      input.slug
        .trim()
        .toLowerCase();

    if (!name) {
      return {
        success: false,
        message:
          "Product name is required.",
      };
    }

    if (!slug) {
      return {
        success: false,
        message:
          "Product slug is required.",
      };
    }

    if (
      !input.description.trim()
    ) {
      return {
        success: false,
        message:
          "Description is required.",
      };
    }

    if (
      !Number.isFinite(
        input.price,
      ) ||
      input.price <= 0
    ) {
      return {
        success: false,
        message:
          "Please enter a valid price.",
      };
    }

    if (
      input.discountPrice !==
        null &&
      (
        input.discountPrice <=
          0 ||
        input.discountPrice >=
          input.price
      )
    ) {
      return {
        success: false,

        message:
          "Discount price must be lower than the base price.",
      };
    }

    const existing =
      await prisma.product.findUnique(
        {
          where: {
            slug,
          },
        },
      );

    if (existing) {
      return {
        success: false,

        message:
          "A product with this slug already exists.",
      };
    }

    const category =
      await prisma.category.findUnique(
        {
          where: {
            id:
              input.categoryId,
          },
        },
      );

    if (!category) {
      return {
        success: false,
        message:
          "Please select a valid category.",
      };
    }

    if (
      input.dressStyleId
    ) {
      const style =
        await prisma.dressStyle.findUnique(
          {
            where: {
              id:
                input.dressStyleId,
            },
          },
        );

      if (!style) {
        return {
          success: false,

          message:
            "Please select a valid dress style.",
        };
      }
    }

    for (
      const variant of
      input.variants
    ) {
      if (
        !variant.sku ||
        !variant.colorName ||
        !variant.size
      ) {
        return {
          success: false,

          message:
            "Every variant requires SKU, color and size.",
        };
      }

      if (
        !Number.isInteger(
          variant.stock,
        ) ||
        variant.stock < 0
      ) {
        return {
          success: false,

          message:
            "Variant stock must be a whole number of 0 or greater.",
        };
      }
    }

    const duplicateSkus =
      input.variants.filter(
        (
          variant,
          index,
          all,
        ) =>
          all.findIndex(
            (item) =>
              item.sku ===
              variant.sku,
          ) !== index,
      );

    if (
      duplicateSkus.length >
      0
    ) {
      return {
        success: false,

        message:
          "Variant SKU values must be unique.",
      };
    }

    await prisma.product.create(
      {
        data: {
          name,

          slug,

          description:
            input.description.trim(),

          price:
            input.price,

          discountPrice:
            input.discountPrice,

          images:
            input.images,

          status:
            input.status,

          isFeatured:
            input.isFeatured,

          isNewArrival:
            input.isNewArrival,

          categoryId:
            input.categoryId,

          dressStyleId:
            input.dressStyleId,

          variants: {
            create:
              input.variants.map(
                (variant) => ({
                  sku:
                    variant.sku,

                  colorName:
                    variant.colorName,

                  colorValue:
                    variant.colorValue,

                  size:
                    variant.size,

                  stock:
                    variant.stock,

                  priceOverride:
                    variant.priceOverride,

                  isActive:
                    true,
                }),
              ),
          },
        },
      },
    );

    revalidatePath("/");
    revalidatePath(
      "/admin/products",
    );
    revalidatePath(
      "/admin/inventory",
    );
    revalidatePath(
      "/category/new-arrivals",
    );

    return {
      success: true,

      message:
        input.status ===
        "ACTIVE"
          ? "Product published successfully."
          : "Product saved as draft.",
    };
  } catch (error) {
    console.error(
      "CREATE_PRODUCT_ERROR:",
      error,
    );

    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to create product.",
    };
  }
}