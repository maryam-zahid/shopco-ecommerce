import { z } from "zod";

export const checkoutSelectionSchema = z.object({
  addressId: z
    .string()
    .min(1, "Please select a shipping address."),

  paymentMethod: z.enum(["COD", "CARD"]),
});

export type CheckoutSelectionInput =
  z.infer<typeof checkoutSelectionSchema>;