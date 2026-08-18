import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import AdminReviewsClient from "@/components/admin/reviews/admin-reviews-client";

export default async function AdminReviewsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (
    session.user.role !== "ADMIN"
  ) {
    redirect("/");
  }

  const reviews =
    await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },

        product: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

  return (
    <div className="w-full">
      <div className="mb-[24px]">
        <h1 className="text-[28px] font-bold text-black">
          Reviews
        </h1>

        <p className="mt-[5px] text-[14px] text-black/50">
          Moderate customer product reviews.
        </p>
      </div>

      <AdminReviewsClient
        initialReviews={reviews.map(
          (review) => ({
            id: review.id,

            customerName:
              review.user.name,

            customerEmail:
              review.user.email,

            productName:
              review.product.name,

            productSlug:
              review.product.slug,

            rating:
              review.rating,

            title:
              review.title,

            comment:
              review.comment,

            isVisible:
              review.isVisible,

            createdAt:
              review.createdAt.toISOString(),
          }),
        )}
      />
    </div>
  );
}