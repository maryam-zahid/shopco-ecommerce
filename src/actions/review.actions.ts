"use server";

import {
  revalidatePath,
} from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import {
  reviewSchema,
} from "@/validations/review.schema";

type ReviewActionResult = {
  success: boolean;
  message: string;
};

export async function submitReviewAction(
  input: {
    productId: string;
    rating: number;
    title: string;
    comment: string;
  },
): Promise<ReviewActionResult> {
  const session = await auth();

  if (
    !session?.user?.id ||
    session.user.role !== "CUSTOMER"
  ) {
    return {
      success: false,
      message:
        "Please login as a customer to leave a review.",
    };
  }

  const parsed =
    reviewSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,

      message:
        parsed.error.issues[0]
          ?.message ??
        "Please check your review.",
    };
  }

  try {
    const product =
      await prisma.product.findUnique({
        where: {
          id: parsed.data.productId,
        },

        select: {
          id: true,
          slug: true,
          name: true,
        },
      });

    if (!product) {
      return {
        success: false,
        message:
          "Product could not be found.",
      };
    }

    /*
     * Customer must actually have received
     * this product before reviewing it.
     */

    const purchasedItem =
      await prisma.orderItem.findFirst({
        where: {
          productId:
            parsed.data.productId,

          order: {
            userId:
              session.user.id,

            status:
              "DELIVERED",
          },
        },

        select: {
          id: true,
        },
      });

    if (!purchasedItem) {
      return {
        success: false,

        message:
          "You can review this product after a delivered purchase.",
      };
    }

    /*
     * One review per customer/product.
     *
     * Upsert also allows the customer to
     * edit their previous review later.
     */

    await prisma.review.upsert({
      where: {
        userId_productId: {
          userId:
            session.user.id,

          productId:
            parsed.data.productId,
        },
      },

      update: {
        rating:
          parsed.data.rating,

        title:
          parsed.data.title ||
          null,

        comment:
          parsed.data.comment,

        /*
         * If an admin hides a review,
         * editing it should not secretly
         * make it visible again.
         */
      },

      create: {
        userId:
          session.user.id,

        productId:
          parsed.data.productId,

        rating:
          parsed.data.rating,

        title:
          parsed.data.title ||
          null,

        comment:
          parsed.data.comment,

        isVisible: true,
      },
    });

    revalidatePath(
      `/product/${product.slug}`,
    );

    revalidatePath(
      `/product/${product.slug}/review`,
    );

    return {
      success: true,

      message:
        "Your review has been submitted successfully.",
    };
  } catch (error) {
    console.error(
      "SUBMIT_REVIEW_ERROR:",
      error,
    );

    return {
      success: false,

      message:
        "Unable to submit your review.",
    };
  }
}