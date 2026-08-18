"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Result = {
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
}

export async function toggleReviewVisibilityAction(
  input: {
    reviewId: string;
    isVisible: boolean;
  },
): Promise<Result> {
  try {
    await requireAdmin();

    await prisma.review.update({
      where: {
        id: input.reviewId,
      },

      data: {
        isVisible:
          input.isVisible,
      },
    });

    revalidatePath(
      "/admin/reviews",
    );

    revalidatePath("/");

    return {
      success: true,

      message:
        input.isVisible
          ? "Review made visible."
          : "Review hidden successfully.",
    };
  } catch (error) {
    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to update review.",
    };
  }
}