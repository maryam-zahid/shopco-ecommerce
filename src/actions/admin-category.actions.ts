"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
type Result = {
  success: boolean;
  message: string;

  item?: {
    id: string;
    name: string;
  };
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
}

export async function createCategoryAction(
  input: {
    name: string;
    slug: string;
    description: string;
  },
): Promise<Result> {
  try {
    await requireAdmin();

    const name = input.name.trim();
    const slug =
      input.slug.trim().toLowerCase();

    if (!name || !slug) {
      return {
        success: false,
        message:
          "Name and slug are required.",
      };
    }

    const existing =
      await prisma.category.findUnique({
        where: {
          slug,
        },
      });

    if (existing) {
      return {
        success: false,
        message:
          "A category with this slug already exists.",
      };
    }

   const category =
  await prisma.category.create({
    data: {
      name,
      slug,

      description:
        input.description.trim() ||
        null,

      isActive: true,
    },
  });

    revalidatePath(
      "/admin/categories",
    );

   return {
  success: true,

  message:
    "Category created successfully.",

  item: {
    id: category.id,
    name: category.name,
  },
};
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to create category.",
    };
  }
}

export async function updateCategoryAction(
  input: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
  },
): Promise<Result> {
  try {
    await requireAdmin();

    await prisma.category.update({
      where: {
        id: input.id,
      },

      data: {
        name: input.name.trim(),

        description:
          input.description.trim() ||
          null,

        isActive:
          input.isActive,
      },
    });

    revalidatePath("/");
    revalidatePath(
      "/admin/categories",
    );

    return {
      success: true,
      message:
        "Category updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to update category.",
    };
  }
}