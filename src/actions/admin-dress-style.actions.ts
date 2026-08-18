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

export async function createDressStyleAction(
  input: {
    name: string;
    slug: string;
    description: string;
  },
): Promise<Result> {
  try {
    await requireAdmin();

    const name =
      input.name.trim();

    const slug =
      input.slug
        .trim()
        .toLowerCase();

    if (!name || !slug) {
      return {
        success: false,

        message:
          "Name and slug are required.",
      };
    }

    const existing =
      await prisma.dressStyle.findUnique({
        where: {
          slug,
        },
      });

    if (existing) {
      return {
        success: false,

        message:
          "A dress style with this name already exists.",
      };
    }

    const dressStyle =
      await prisma.dressStyle.create({
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
      "/admin/products",
    );

    revalidatePath(
      "/admin/products/new",
    );

    return {
      success: true,

      message:
        "Dress style created successfully.",

      item: {
        id: dressStyle.id,
        name: dressStyle.name,
      },
    };
  } catch (error) {
    console.error(
      "CREATE_DRESS_STYLE_ERROR:",
      error,
    );

    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to create dress style.",
    };
  }
}