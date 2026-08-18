import {
  notFound,
  redirect,
} from "next/navigation";

import { auth } from "@/auth";

import {
  getAdminProductById,
  getAdminProductOptions,
} from "@/services/admin-product.service";

import EditProductForm from "@/components/admin/products/edit-product-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const { id } = await params;

  const [product, options] =
    await Promise.all([
      getAdminProductById(id),
      getAdminProductOptions(),
    ]);

  if (!product) {
    notFound();
  }

  return (
<div
  className="
    mx-auto
    w-full
    max-w-[1240px]
  "
>     
      <EditProductForm
        product={{
          id: product.id,
          name: product.name,

          description:
            product.description,

          price:
            Number(product.price),

          discountPrice:
            product.discountPrice !== null
              ? Number(
                  product.discountPrice,
                )
              : null,

          categoryId:
            product.categoryId,

          dressStyleId:
            product.dressStyleId,

          status:
            product.status,

          isFeatured:
            product.isFeatured,

          isNewArrival:
            product.isNewArrival,
        }}
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