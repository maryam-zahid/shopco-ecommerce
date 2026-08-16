import { z } from "zod";

export const addressSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100),

    email: z
  .string()
  .trim()
  .email(
    "Please enter a valid email address.",
  ),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30),

  addressLine1: z
    .string()
    .trim()
    .min(5, "Please enter your street address.")
    .max(200),

  addressLine2: z
    .string()
    .trim()
    .max(200)
    .optional(),

  city: z
    .string()
    .trim()
    .min(2, "Please enter your city.")
    .max(100),

  state: z
    .string()
    .trim()
    .max(100)
    .optional(),

  postalCode: z
    .string()
    .trim()
    .min(2, "Please enter your postal code.")
    .max(20),

  country: z
    .string()
    .trim()
    .min(2, "Please enter your country.")
    .max(100),

  isDefault: z.boolean().default(false),
});

export type AddressInput =
  z.infer<typeof addressSchema>;