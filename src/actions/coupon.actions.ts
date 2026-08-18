"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  applyCouponToCart,
  removeCouponFromCart,
} from "@/services/cart.service";

type CouponActionResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export async function applyCouponAction(
  input: {
    code: string;
  },
): Promise<CouponActionResult> {
  try {
    const result =
      await applyCouponToCart(
        input.code,
      );

    revalidatePath("/cart");
    revalidatePath("/checkout");

    return {
      success: true,

      message:
        `${result.code} applied successfully.`,
    };
  } catch (error) {
    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to apply coupon.",
    };
  }
}

export async function removeCouponAction(): Promise<CouponActionResult> {
  try {
    await removeCouponFromCart();

    revalidatePath("/cart");
    revalidatePath("/checkout");

    return {
      success: true,

      message:
        "Coupon removed successfully.",
    };
  } catch (error) {
    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to remove coupon.",
    };
  }
}