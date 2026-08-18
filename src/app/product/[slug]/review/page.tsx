import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import ReviewForm from "@/components/reviews/review-form";

type ReviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReviewPage({
  params,
}: ReviewPageProps) {
  const { slug } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    redirect(
      `/login?callbackUrl=/product/${slug}/review`,
    );
  }

  if (
    session.user.role !==
    "CUSTOMER"
  ) {
    redirect("/");
  }

  const product =
    await prisma.product.findUnique({
      where: {
        slug,
      },

      select: {
        id: true,
        slug: true,
        name: true,
        images: true,
      },
    });

  if (!product) {
    notFound();
  }

  const deliveredPurchase =
    await prisma.orderItem.findFirst({
      where: {
        productId:
          product.id,

        order: {
          userId:
            session.user.id,

          status:
            "DELIVERED",
        },
      },

      select: {
        id: true,
      },
    });

  const existingReview =
    await prisma.review.findUnique({
      where: {
        userId_productId: {
          userId:
            session.user.id,

          productId:
            product.id,
        },
      },

      select: {
        rating: true,
        title: true,
        comment: true,
      },
    });

  return (
    <main className="w-full bg-[#F8F8F8]">
      <div
        className="
          mx-auto
          w-full

          px-[16px]
          py-[32px]

          min-[800px]:px-[32px]

          min-[1200px]:
          max-w-[900px]

          min-[1200px]:
          py-[48px]
        "
      >
        <Link
          href={`/product/${product.slug}`}
          className="
            text-[13px]
            font-medium
            text-black/60

            hover:text-black
          "
        >
          ← Back to product
        </Link>

        <section
          className="
            mt-[18px]

            rounded-[16px]

            bg-white

            px-[22px]
            py-[24px]

            min-[800px]:
            px-[32px]

            min-[800px]:
            py-[30px]
          "
          style={{
            border:
              "1px solid rgba(0,0,0,0.12)",

            boxShadow:
              "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <h1
            className="
              m-0

              text-[26px]
              font-bold
              text-black

              min-[800px]:
              text-[30px]
            "
            style={{
              fontFamily:
                "var(--font-satoshi)",
            }}
          >
            {existingReview
              ? "Edit your review"
              : "Write a review"}
          </h1>

          <p
            className="
              mt-[6px]

              text-[14px]
              text-black/50
            "
          >
            {product.name}
          </p>

          {!deliveredPurchase ? (
            <div
              className="
                mt-[24px]

                rounded-[10px]

                px-[16px]
                py-[14px]

                text-[13px]
                leading-[20px]
                text-black/65
              "
              style={{
                backgroundColor:
                  "#F7F7F7",

                border:
                  "1px solid rgba(0,0,0,0.10)",
              }}
            >
              You can leave a review
              after this product has
              been delivered to you.
            </div>
          ) : (
            <ReviewForm
              productId={product.id}
              productSlug={
                product.slug
              }
              initialReview={
                existingReview
                  ? {
                      rating:
                        existingReview.rating,

                      title:
                        existingReview.title ??
                        "",

                      comment:
                        existingReview.comment,
                    }
                  : undefined
              }
            />
          )}
        </section>
      </div>
    </main>
  );
}