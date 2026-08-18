import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getAdminProducts } from "@/services/admin-product.service";

import AdminInventoryTable from "@/components/admin/products/admin-inventory-table";

export default async function AdminInventoryPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const products = await getAdminProducts();

  const variants = products.flatMap(
    (product) =>
      product.variants.map((variant) => ({
        id: variant.id,

        productName:
          product.name,

        sku:
          variant.sku,

        colorName:
          variant.colorName,

        size:
          variant.size,

        stock:
          variant.stock,

        isActive:
          variant.isActive,
      })),
  );

  return (
    <div className="w-full">
      <div className="mb-[24px]">
        <h1 className="text-[28px] font-bold text-black">
          Inventory
        </h1>

        <p className="mt-[5px] text-[14px] text-black/50">
          Manage stock for every product variant.
        </p>
      </div>

      <AdminInventoryTable
        initialVariants={variants}
      />
    </div>
  );
}