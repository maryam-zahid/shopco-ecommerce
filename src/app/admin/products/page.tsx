import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";

import { auth } from "@/auth";
import { getAdminProducts } from "@/services/admin-product.service";
import AdminProductsTable from "@/components/admin/products/admin-products-table";

export default async function AdminProductsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const products = await getAdminProducts();

  /*
   * These cards use the product data that currently exists
   * in the project. We are NOT inventing fake sales figures.
   */

  const activeProducts = products.filter(
    (product) => product.status === "ACTIVE",
  ).length;

  const totalStock = products.reduce(
    (total, product) => total + product.totalStock,
    0,
  );

  const featuredProducts = products.filter(
    (product) => product.isFeatured,
  ).length;

  const archivedProducts = products.filter(
    (product) => product.status === "ARCHIVED",
  ).length;

  return (
    <div
      className="w-full"
      style={{
        fontFamily: "var(--font-satoshi)",
      }}
    >
      {/* =====================================================
          PAGE TITLE
      ====================================================== */}

      <div
        className="
          mb-[24px]
          flex
          items-center
          justify-between
          gap-[20px]
        "
      >
        <h1
          className="
            text-[24px]
            font-bold
            leading-none
            text-black
          "
        >
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="
            inline-flex
            h-[38px]
            shrink-0
            items-center
            justify-center
            gap-[7px]

            rounded-[6px]

            px-[14px]

            text-[13px]
            font-semibold
            leading-none

            no-underline

            transition-opacity
            hover:opacity-90
          "
          style={{
            backgroundColor: "#0D0D0F",
            border: "1px solid #0D0D0F",
            color: "#FFFFFF",
          }}
        >
          <Plus
            className="size-[16px]"
            strokeWidth={1.8}
          />

          <span>Add Product</span>
        </Link>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <div
        className="
          mb-[30px]

          grid
          grid-cols-1
          gap-[16px]

          min-[700px]:grid-cols-2
          min-[1200px]:grid-cols-4
        "
      >
        <SummaryCard
          label="Total Products"
          value={products.length}
          change={`${activeProducts} active`}
          positive
        />

        <SummaryCard
          label="Total Stock"
          value={totalStock.toLocaleString()}
          change={`${products.length} products`}
          positive
        />

        <SummaryCard
          label="Featured"
          value={featuredProducts}
          change="Featured products"
          positive
        />

        <SummaryCard
          label="Archived"
          value={archivedProducts}
          change="Not for sale"
          positive={false}
        />
      </div>

      {/* =====================================================
          TABLE
      ====================================================== */}

      <AdminProductsTable
        initialProducts={products.map((product) => ({
          id: product.id,
          name: product.name,
          slug: product.slug,

          price: product.price,
          discountPrice: product.discountPrice,

          image: product.images[0] ?? null,

          status: product.status,

          isFeatured: product.isFeatured,
          isNewArrival: product.isNewArrival,

          categoryName: product.category.name,

          dressStyleName:
            product.dressStyle?.name ?? "—",

          totalStock: product.totalStock,

          variantCount: product.variants.length,

          sku:
            product.variants[0]?.sku ??
            "—",

          rating:
            product.reviews?.length > 0
              ? product.reviews.reduce(
                  (sum, review) =>
                    sum + review.rating,
                  0,
                ) /
                product.reviews.length
              : 0,
        }))}
      />
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  label,
  value,
  change,
  positive,
}: {
  label: string;
  value: string | number;
  change: string;
  positive: boolean;
}) {
  return (
    <div
      className="
        flex
        min-h-[112px]
        items-start
        justify-between
        gap-[14px]

        rounded-[10px]

        bg-white

        px-[24px]
        py-[22px]
      "
      style={{
        border: "1px solid #E4E4E7",
      }}
    >
      <div>
        <p
          className="
            text-[13px]
            font-normal
            leading-[18px]
            text-black/60
          "
        >
          {label}
        </p>

        <p
          className="
            mt-[8px]
            text-[30px]
            font-bold
            leading-none
            tracking-[-0.02em]
            text-[#18181B]
          "
        >
          {value}
        </p>
      </div>

      <span
        className={`
          mt-[3px]

          inline-flex
          items-center
          justify-center

          rounded-full

          border

          px-[8px]
          py-[3px]

          text-[10px]
          font-medium
          leading-none

          ${
            positive
              ? "border-emerald-200 text-emerald-600"
              : "border-red-200 text-red-500"
          }
        `}
      >
        {change}
      </span>
    </div>
  );
}