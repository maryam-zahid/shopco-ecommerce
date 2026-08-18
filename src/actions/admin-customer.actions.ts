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

export async function toggleCustomerActiveAction(
  input: {
    userId: string;
    isActive: boolean;
  },
): Promise<Result> {
  try {
    await requireAdmin();

    const customer =
      await prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });

    if (!customer) {
      return {
        success: false,
        message:
          "Customer not found.",
      };
    }

    if (customer.role !== "CUSTOMER") {
      return {
        success: false,
        message:
          "Only customer accounts can be updated here.",
      };
    }

    await prisma.user.update({
      where: {
        id: input.userId,
      },

      data: {
        isActive:
          input.isActive,
      },
    });

    revalidatePath(
      "/admin/customers",
    );

    return {
      success: true,

      message:
        input.isActive
          ? "Customer account activated."
          : "Customer account deactivated.",
    };
  } catch (error) {
    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to update customer.",
    };
  }
}