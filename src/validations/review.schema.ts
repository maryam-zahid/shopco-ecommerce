import { z } from "zod";

export const reviewSchema = z.object({
  productId: z
    .string()
    .min(1, "Product is required."),

  rating: z
    .number()
    .int()
    .min(1, "Please select a rating.")
    .max(5, "Rating cannot exceed 5 stars."),

  title: z
    .string()
    .trim()
    .max(
      100,
      "Review title cannot exceed 100 characters.",
    )
    .optional()
    .or(z.literal("")),

  comment: z
    .string()
    .trim()
    .min(
      10,
      "Review must contain at least 10 characters.",
    )
    .max(
      1500,
      "Review cannot exceed 1500 characters.",
    ),
});

export type ReviewInput =
  z.infer<typeof reviewSchema>;