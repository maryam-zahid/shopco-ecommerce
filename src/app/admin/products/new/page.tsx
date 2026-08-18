import {
  redirect,
} from "next/navigation";

import { auth } from "@/auth";

import {
  getAdminProductOptions,
} from "@/services/admin-product.service";

import NewProductForm from "@/components/admin/products/new-product-form";

export default async function NewProductPage() {
  const session =
    await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (
    session.user.role !== "ADMIN"
  ) {
    redirect("/");
  }

  const options =
    await getAdminProductOptions();

  return (
    <div className="w-full">
      {/* <div className="mb-[24px]">
        <h1 className="text-[28px] font-bold text-black">
          Add Product
        </h1>

        <p className="mt-[5px] text-[14px] text-black/50">
          Create a new storefront product.
        </p>
      </div> */}

      <NewProductForm
        categories={options.categories.map(
          (category) => ({
            id: category.id,
            name: category.name,
          }),
        )}
        dressStyles={options.dressStyles.map(
          (style) => ({
            id: style.id,
            name: style.name,
          }),
        )}
      />
    </div>
  );
}