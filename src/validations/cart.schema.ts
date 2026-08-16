import { z } from "zod";

export const addToCartSchema = z.object({
  variantId: z
    .string()
    .min(1, "Product variant is required."),

  quantity: z
    .number()
    .int()
    .min(1, "Quantity must be at least 1.")
    .max(99, "Quantity is too large."),
});

export const updateCartQuantitySchema = z.object({
  cartItemId: z.string().min(1),

  quantity: z
    .number()
    .int()
    .min(1)
    .max(99),
});

export const removeCartItemSchema = z.object({
  cartItemId: z.string().min(1),
});