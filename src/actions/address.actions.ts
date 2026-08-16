"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { createCustomerAddress } from "@/services/address.service";
import { addressSchema } from "@/validations/address.schema";

type AddressActionResult = {
  success: boolean;
  message: string;
};

export async function createAddressAction(
  input: {
    fullName: string;
        email: string;

    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  },
): Promise<AddressActionResult> {
  const session = await auth();

  if (
    !session?.user?.id ||
    session.user.role !== "CUSTOMER"
  ) {
    return {
      success: false,
      message:
        "Please login to save a shipping address.",
    };
  }

  const parsed =
    addressSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]?.message ??
        "Please check your address details.",
    };
  }

  try {
    await createCustomerAddress(
      session.user.id,
      parsed.data,
    );

    revalidatePath("/checkout");

    return {
      success: true,
      message:
        "Shipping address saved successfully.",
    };
  } catch {
    return {
      success: false,
      message:
        "Unable to save your shipping address.",
    };
  }
}