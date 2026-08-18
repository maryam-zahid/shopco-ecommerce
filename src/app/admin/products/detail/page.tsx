import {
  redirect,
} from "next/navigation";

import { prisma } from "@/lib/prisma";

export default async function ProductDetailShortcutPage() {
  const product =
    await prisma.product.findFirst({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
      },
    });

  if (!product) {
    redirect(
      "/admin/products",
    );
  }

  redirect(
    `/admin/products/${product.id}`,
  );
}