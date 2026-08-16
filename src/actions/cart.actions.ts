"use server";

import { revalidatePath } from "next/cache";

import {
  addVariantToCart,
  removeCartItem,
  updateCartItemQuantity,
} from "@/services/cart.service";

import {
  addToCartSchema,
  removeCartItemSchema,
  updateCartQuantitySchema,
} from "@/validations/cart.schema";

type CartActionResult = {
  success: boolean;
  message: string;
};

export async function addToCartAction(
  input: {
    variantId: string;
    quantity: number;
  },
): Promise<CartActionResult> {
  const parsed =
    addToCartSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]?.message ??
        "Invalid cart request.",
    };
  }

  try {
    await addVariantToCart(
      parsed.data.variantId,
      parsed.data.quantity,
    );

    revalidatePath("/cart");

    return {
      success: true,
      message: "Added to cart.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to add item to cart.",
    };
  }
}

export async function updateCartQuantityAction(
  input: {
    cartItemId: string;
    quantity: number;
  },
): Promise<CartActionResult> {
  const parsed =
    updateCartQuantitySchema.safeParse(
      input,
    );

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid quantity.",
    };
  }

  try {
    await updateCartItemQuantity(
      parsed.data.cartItemId,
      parsed.data.quantity,
    );

    revalidatePath("/cart");

    return {
      success: true,
      message: "Cart updated.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to update cart.",
    };
  }
}

export async function removeCartItemAction(
  input: {
    cartItemId: string;
  },
): Promise<CartActionResult> {
  const parsed =
    removeCartItemSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid cart item.",
    };
  }

  try {
    await removeCartItem(
      parsed.data.cartItemId,
    );

    revalidatePath("/cart");

    return {
      success: true,
      message: "Item removed.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to remove cart item.",
    };
  }
}