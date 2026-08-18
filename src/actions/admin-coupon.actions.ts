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

export async function createCouponAction(
  input: {
    code: string;

    discountType:
      | "PERCENTAGE"
      | "FIXED";

    discountValue: number;

    minimumOrderAmount:
      | number
      | null;

    usageLimit:
      | number
      | null;

    startsAt:
      | string
      | null;

    expiresAt:
      | string
      | null;
  },
): Promise<Result> {
  try {
    await requireAdmin();

    const code =
      input.code
        .trim()
        .toUpperCase();

    if (!code) {
      return {
        success: false,
        message:
          "Coupon code is required.",
      };
    }

    if (
      !Number.isFinite(
        input.discountValue,
      ) ||
      input.discountValue <= 0
    ) {
      return {
        success: false,
        message:
          "Enter a valid discount value.",
      };
    }

    if (
      input.discountType ===
        "PERCENTAGE" &&
      input.discountValue > 100
    ) {
      return {
        success: false,
        message:
          "Percentage discount cannot exceed 100%.",
      };
    }

    if (
      input.usageLimit !== null &&
      (
        !Number.isInteger(
          input.usageLimit,
        ) ||
        input.usageLimit < 1
      )
    ) {
      return {
        success: false,
        message:
          "Usage limit must be at least 1.",
      };
    }

    const existing =
      await prisma.coupon.findUnique({
        where: {
          code,
        },
      });

    if (existing) {
      return {
        success: false,
        message:
          "A coupon with this code already exists.",
      };
    }

    await prisma.coupon.create({
      data: {
        code,

        discountType:
          input.discountType,

        discountValue:
          input.discountValue,

        isActive: true,

        startsAt:
          input.startsAt
            ? new Date(
                input.startsAt,
              )
            : null,

        expiresAt:
          input.expiresAt
            ? new Date(
                input.expiresAt,
              )
            : null,

        minimumOrderAmount:
          input.minimumOrderAmount,

        usageLimit:
          input.usageLimit,
      },
    });

    revalidatePath(
      "/admin/coupons",
    );

    return {
      success: true,
      message:
        "Coupon created successfully.",
    };
  } catch (error) {
    console.error(
      "CREATE_COUPON_ERROR:",
      error,
    );

    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to create coupon.",
    };
  }
}

export async function toggleCouponAction(
  input: {
    couponId: string;
    isActive: boolean;
  },
): Promise<Result> {
  try {
    await requireAdmin();

    await prisma.coupon.update({
      where: {
        id: input.couponId,
      },

      data: {
        isActive:
          input.isActive,
      },
    });

    revalidatePath(
      "/admin/coupons",
    );

    return {
      success: true,

      message:
        input.isActive
          ? "Coupon enabled."
          : "Coupon disabled.",
    };
  } catch (error) {
    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to update coupon.",
    };
  }
}