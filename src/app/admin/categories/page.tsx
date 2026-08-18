import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import AdminCategoriesClient from "@/components/admin/categories/admin-categories-client";

export default async function AdminCategoriesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const categories =
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

  return (
    <div className="w-full">
      <div className="mb-[24px]">
        <h1
          className="
            text-[28px]
            font-bold
            text-black
          "
        >
          Categories
        </h1>

        <p
          className="
            mt-[5px]

            text-[14px]
            text-black/50
          "
        >
          Create and manage storefront categories.
        </p>
      </div>

      <AdminCategoriesClient
        initialCategories={categories.map(
          (category) => ({
            id: category.id,

            name:
              category.name,

            slug:
              category.slug,

            description:
              category.description,

            isActive:
              category.isActive,
          }),
        )}
      />
    </div>
  );
}