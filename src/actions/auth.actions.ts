"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { mergeGuestCartIntoCustomer } from "@/services/cart.service";
import { hashPassword } from "@/lib/password";
import {
  loginSchema,
  registerSchema,
} from "@/validations/auth.schema";

type AuthActionResult = {
  success: boolean;
  message: string;
};

export async function registerAction(
  formData: FormData,
): Promise<AuthActionResult> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]?.message ??
        "Invalid registration details.",
    };
  }

  const { name, email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message:
        "An account with this email already exists.",
    };
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,

      // Public registration always creates CUSTOMER.
      // ADMIN is assigned only by us in seed/database.
      role: "CUSTOMER",

      isActive: true,
    },
  });

  return {
    success: true,
    message: "Account created successfully.",
  };
}

export async function loginAction(
  formData: FormData,
): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]?.message ??
        "Invalid login details.",
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });

    return {
      success: true,
      message: "Logged in successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }
}

export async function logoutAction() {
  await signOut({
    redirectTo: "/",
  });
}