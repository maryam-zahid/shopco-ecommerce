import Image from "next/image";
import Link from "next/link";

import {
  notFound,
  redirect,
} from "next/navigation";

import {
  Archive,
  Boxes,
  DollarSign,
  Pencil,
  ShoppingBag,
  Star,
} from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import AdminProductGallery from "@/components/admin/products/admin-product-gallery";
import AdminProductDetailActions from "@/components/admin/products/admin-product-detail-actions";

type AdminProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminProductDetailPage({
  params,
}: AdminProductDetailPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const { id } = await params;

  const product =
    await prisma.product.findUnique({
      where: {
        id,
      },

      include: {
        category: true,

        dressStyle: true,

        variants: {
          orderBy: [
            {
              colorName: "asc",
            },
            {
              size: "asc",
            },
          ],
        },

        reviews: {
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
          },
        },

        orderItems: {
          select: {
            orderId: true,
            quantity: true,
            subtotal: true,
          },
        },
      },
    });

  if (!product) {
    notFound();
  }

  const activeVariants =
    product.variants.filter(
      (variant) =>
        variant.isActive,
    );

  const totalStock =
    activeVariants.reduce(
      (total, variant) =>
        total + variant.stock,
      0,
    );

  const orderCount =
    new Set(
      product.orderItems.map(
        (item) => item.orderId,
      ),
    ).size;

  const totalRevenue =
    product.orderItems.reduce(
      (total, item) =>
        total +
        Number(item.subtotal),
      0,
    );

  const firstSku =
    product.variants[0]?.sku ??
    "—";

  const colors = Array.from(
    new Map(
      activeVariants.map(
        (variant) => [
          variant.colorName,
          {
            name:
              variant.colorName,

            value:
              variant.colorValue ??
              "#111111",
          },
        ],
      ),
    ).values(),
  );

  const sizes = Array.from(
    new Set(
      activeVariants.map(
        (variant) =>
          variant.size,
      ),
    ),
  );

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce(
          (sum, review) =>
            sum + review.rating,
          0,
        ) /
        product.reviews.length
      : 0;

  const ratingCounts = {
    5: product.reviews.filter(
      (review) =>
        review.rating === 5,
    ).length,

    4: product.reviews.filter(
      (review) =>
        review.rating === 4,
    ).length,

    3: product.reviews.filter(
      (review) =>
        review.rating === 3,
    ).length,

    2: product.reviews.filter(
      (review) =>
        review.rating === 2,
    ).length,

    1: product.reviews.filter(
      (review) =>
        review.rating === 1,
    ).length,
  };

  return (
    <main
      className="w-full"
      style={{
        fontFamily:
          "var(--font-satoshi)",
      }}
    >
      {/* ==================================================
          HEADER
      =================================================== */}

      <div
        className="
          flex
          flex-col
          gap-[16px]

          min-[850px]:
          flex-row

          min-[850px]:
          items-start

          min-[850px]:
          justify-between
        "
      >
        <div>
          <h1
            className="
              m-0

              text-[26px]
              font-bold
              leading-[32px]
              text-black
            "
          >
            {product.name}
          </h1>

          <div
            className="
              mt-[10px]

              flex
              flex-wrap
              items-center

              gap-x-[22px]
              gap-y-[5px]

              text-[13px]
              text-black/55
            "
          >
            <p>
              <span className="font-semibold text-black">
                Published:
              </span>{" "}

              {product.createdAt.toLocaleDateString(
                "en-US",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                },
              )}
            </p>

            <p>
              <span className="font-semibold text-black">
                SKU:
              </span>{" "}
              {firstSku}
            </p>

            <p>
              <span className="font-semibold text-black">
                Status:
              </span>{" "}
              {formatStatus(
                product.status,
              )}
            </p>
          </div>
        </div>

        <AdminProductDetailActions
          productId={product.id}
        />
      </div>

      {/* ==================================================
          MAIN CONTENT
      =================================================== */}

      <div
        className="
          mt-[24px]

          grid
          grid-cols-1
          gap-[18px]

          min-[1100px]:
          grid-cols-[465px_minmax(0,1fr)]
        "
      >
        {/* GALLERY */}

        <AdminProductGallery
          images={product.images}
          productName={
            product.name
          }
        />

        {/* RIGHT */}

        <div className="min-w-0">
          {/* STATS */}

          <div
            className="
              grid
              grid-cols-2
              gap-[12px]

              min-[1350px]:
              grid-cols-4
            "
          >
            <MetricCard
              icon={
                <DollarSign className="size-[23px]" />
              }
              label="Price"
              value={`$${Number(
                product.discountPrice ??
                  product.price,
              ).toFixed(2)}`}
            />

            <MetricCard
              icon={
                <ShoppingBag className="size-[23px]" />
              }
              label="No. of Orders"
              value={orderCount.toLocaleString()}
            />

            <MetricCard
              icon={
                <Boxes className="size-[23px]" />
              }
              label="Available Stocks"
              value={totalStock.toLocaleString()}
            />

            <MetricCard
              icon={
                <DollarSign className="size-[23px]" />
              }
              label="Total Revenue"
              value={`$${totalRevenue.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits:
                    2,
                  maximumFractionDigits:
                    2,
                },
              )}`}
            />
          </div>

          {/* DETAILS CARD */}

          <section
            className="
              mt-[16px]

              rounded-[12px]

              bg-white

              px-[22px]
              py-[24px]
            "
            style={{
              border:
                "1px solid #E1E1E5",
            }}
          >
            <div
              className="
                grid
                grid-cols-1
                gap-[24px]

                min-[1300px]:
                grid-cols-[minmax(0,1fr)_270px]
              "
            >
              {/* DESCRIPTION */}

              <div>
                <h2 className="text-[17px] font-bold text-black">
                  Description:
                </h2>

                <p
                  className="
                    mt-[10px]

                    max-w-[760px]

                    text-[15px]
                    leading-[24px]
                    text-black/60
                  "
                >
                  {product.description}
                </p>

                {/* COLORS */}

                <div className="mt-[28px]">
                  <h3 className="text-[15px] font-bold text-black">
                    Colors:
                  </h3>

                  {colors.length > 0 ? (
                    <div
                      className="
                        mt-[12px]

                        flex
                        flex-wrap
                        gap-[10px]
                      "
                    >
                      {colors.map(
                        (color) => (
                          <div
                            key={
                              color.name
                            }
                            title={
                              color.name
                            }
                            className="
                              flex
                              h-[38px]
                              w-[38px]
                              items-center
                              justify-center

                              rounded-full
                            "
                            style={{
                              border:
                                "1px solid #111111",
                            }}
                          >
                            <span
                              className="
                                h-[31px]
                                w-[31px]

                                rounded-full
                              "
                              style={{
                                backgroundColor:
                                  color.value,
                              }}
                            />
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="mt-[8px] text-[13px] text-black/40">
                      No colors configured.
                    </p>
                  )}
                </div>

                {/* SIZES */}

                <div className="mt-[28px]">
                  <h3 className="text-[15px] font-bold text-black">
                    Sizes:
                  </h3>

                  <div
                    className="
                      mt-[12px]

                      flex
                      flex-wrap
                      gap-[8px]
                    "
                  >
                    {sizes.map(
                      (size) => (
                        <span
                          key={size}
                          className="
                            inline-flex
                            min-h-[42px]
                            min-w-[46px]
                            items-center
                            justify-center

                            rounded-[7px]

                            px-[12px]

                            text-[13px]
                            font-medium
                            text-black
                          "
                          style={{
                            border:
                              "1px solid #D9D9DE",

                            backgroundColor:
                              "#FFFFFF",
                          }}
                        >
                          {size}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                {/* FLAGS */}

                <div
                  className="
                    mt-[28px]

                    flex
                    flex-wrap
                    gap-[8px]
                  "
                >
                  {product.isFeatured && (
                    <InfoBadge>
                      Featured
                    </InfoBadge>
                  )}

                  {product.isNewArrival && (
                    <InfoBadge>
                      New Arrival
                    </InfoBadge>
                  )}

                  <InfoBadge>
                    {
                      activeVariants.length
                    }{" "}
                    Variants
                  </InfoBadge>
                </div>
              </div>

              {/* ATTRIBUTE TABLE */}

              <div
                className="
                  h-fit
                  overflow-hidden

                  rounded-[8px]

                  bg-white
                "
                style={{
                  border:
                    "1px solid #E1E1E5",
                }}
              >
                <DetailRow
                  label="Category"
                  value={
                    product.category
                      .name
                  }
                />

                <DetailRow
                  label="Style"
                  value={
                    product
                      .dressStyle
                      ?.name ?? "—"
                  }
                />

                <DetailRow
                  label="Status"
                  value={formatStatus(
                    product.status,
                  )}
                />

                <DetailRow
                  label="Variants"
                  value={String(
                    product.variants
                      .length,
                  )}
                  last
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ==================================================
          REVIEWS
      =================================================== */}

      <section
        className="
          mt-[20px]

          rounded-[12px]

          bg-white

          px-[24px]
          py-[24px]
        "
        style={{
          border:
            "1px solid #E1E1E5",
        }}
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-[20px]
          "
        >
          <h2 className="text-[18px] font-bold text-black">
            Reviews
          </h2>

          <Link
            href={`/product/${product.slug}`}
            className="
              inline-flex
              min-h-[38px]
              items-center
              justify-center

              rounded-[7px]

              px-[14px]

              text-[12px]
              font-medium
              text-black
            "
            style={{
              border:
                "1px solid #D9D9DE",

              backgroundColor:
                "#FFFFFF",
            }}
          >
            View Store Product
          </Link>
        </div>

        <div
          className="
            mt-[24px]

            grid
            grid-cols-1
            gap-[18px]

            min-[1050px]:
            grid-cols-[minmax(0,1fr)_305px]
          "
        >
          {/* REVIEW CARDS */}

          <div className="space-y-[14px]">
            {product.reviews.length >
            0 ? (
              product.reviews.map(
                (review) => (
                  <article
                    key={review.id}
                    className="
                      rounded-[9px]

                      bg-white

                      px-[20px]
                      py-[18px]
                    "
                    style={{
                      border:
                        "1px solid #E1E1E5",
                    }}
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-[16px]
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-[11px]
                        "
                      >
                        <div
                          className="
                            flex
                            h-[42px]
                            w-[42px]
                            items-center
                            justify-center

                            rounded-full

                            bg-black

                            text-[14px]
                            font-semibold
                          "
                          style={{
                            color:
                              "#FFFFFF",
                          }}
                        >
                          {getInitials(
                            review.user
                              .name,
                          )}
                        </div>

                        <div>
                          <p className="text-[15px] font-semibold text-black">
                            {
                              review
                                .user
                                .name
                            }
                          </p>

                          <div
                            className="
                              mt-[5px]

                              inline-flex
                              items-center
                              gap-[5px]

                              rounded-full

                              px-[8px]
                              py-[3px]
                            "
                            style={{
                              border:
                                "1px solid #E1E1E5",
                            }}
                          >
                            <Star
                              className="
                                size-[14px]

                                fill-[#FF9500]
                                text-[#FF9500]
                              "
                            />

                            <span className="text-[11px] text-black/60">
                              {
                                review.rating
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      <span className="text-[11px] text-black/45">
                        {review.createdAt.toLocaleDateString(
                          "en-US",
                          {
                            month:
                              "short",
                            day:
                              "numeric",
                            year:
                              "numeric",
                          },
                        )}
                      </span>
                    </div>

                    {review.title && (
                      <h3
                        className="
                          mt-[18px]

                          text-[15px]
                          font-bold
                          text-black
                        "
                      >
                        {review.title}
                      </h3>
                    )}

                    <p
                      className="
                        mt-[8px]

                        text-[14px]
                        leading-[22px]
                        text-black/60
                      "
                    >
                      {review.comment}
                    </p>
                  </article>
                ),
              )
            ) : (
              <div
                className="
                  rounded-[9px]

                  px-[20px]
                  py-[50px]

                  text-center

                  text-[13px]
                  text-black/45
                "
                style={{
                  border:
                    "1px solid #E1E1E5",
                }}
              >
                This product has no
                reviews yet.
              </div>
            )}
          </div>

          {/* RATING SUMMARY */}

          <div
            className="
              h-fit

              overflow-hidden

              rounded-[9px]

              bg-white
            "
            style={{
              border:
                "1px solid #E1E1E5",
            }}
          >
            <div
              className="
                flex
                items-center
                gap-[4px]

                bg-[#F8F8F8]

                px-[20px]
                py-[18px]
              "
            >
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <Star
                    key={star}
                    className={`
                      size-[19px]

                      ${
                        star <=
                        Math.round(
                          averageRating,
                        )
                          ? "fill-[#FF9500] text-[#FF9500]"
                          : "text-[#FF9500]"
                      }
                    `}
                  />
                ),
              )}

              <span className="ml-[10px] text-[14px] text-black/60">
                {averageRating.toFixed(
                  1,
                )}{" "}
                (
                {
                  product.reviews
                    .length
                }{" "}
                reviews)
              </span>
            </div>

            <div className="px-[20px] py-[18px]">
              {(
                [
                  5,
                  4,
                  3,
                  2,
                  1,
                ] as const
              ).map((rating) => (
                <RatingRow
                  key={rating}
                  rating={rating}
                  count={
                    ratingCounts[
                      rating
                    ]
                  }
                  total={
                    product.reviews
                      .length
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ========================================================
   HELPERS
======================================================== */

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[100px]
        items-start
        gap-[15px]

        rounded-[10px]

        bg-white

        px-[18px]
        py-[20px]
      "
      style={{
        border:
          "1px solid #E1E1E5",
      }}
    >
      <div className="mt-[2px] text-black/35">
        {icon}
      </div>

      <div>
        <p className="text-[13px] text-black/55">
          {label}
        </p>

        <p className="mt-[7px] text-[20px] font-bold text-black">
          {value}
        </p>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className="
        flex
        min-h-[44px]
        items-center
        justify-between
        gap-[14px]

        px-[12px]

        text-[13px]
      "
      style={{
        borderBottom: last
          ? "none"
          : "1px solid #E1E1E5",
      }}
    >
      <span className="font-semibold text-black">
        {label}
      </span>

      <span className="text-right text-black/65">
        {value}
      </span>
    </div>
  );
}

function InfoBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        justify-center

        rounded-full

        px-[10px]
        py-[5px]

        text-[11px]
        font-medium
        text-black
      "
      style={{
        backgroundColor:
          "#F4F4F5",

        border:
          "1px solid #E1E1E5",
      }}
    >
      {children}
    </span>
  );
}

function RatingRow({
  rating,
  count,
  total,
}: {
  rating: number;
  count: number;
  total: number;
}) {
  const percentage =
    total > 0
      ? Math.round(
          (count / total) * 100,
        )
      : 0;

  return (
    <div
      className="
        mb-[16px]

        grid
        grid-cols-[55px_minmax(0,1fr)_38px]
        items-center
        gap-[10px]

        last:mb-0
      "
    >
      <span className="text-[13px] text-black">
        {rating}{" "}
        {rating === 1
          ? "star"
          : "stars"}
      </span>

      <div
        className="
          h-[8px]

          overflow-hidden

          rounded-full

          bg-black/15
        "
      >
        <div
          className="
            h-full

            rounded-full

            bg-black
          "
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <span className="text-right text-[12px] text-black">
        {percentage}%
      </span>
    </div>
  );
}

function getInitials(
  name: string,
) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatStatus(
  status:
    | "DRAFT"
    | "ACTIVE"
    | "ARCHIVED",
) {
  switch (status) {
    case "ACTIVE":
      return "Active";

    case "DRAFT":
      return "Draft";

    case "ARCHIVED":
      return "Archived";
  }
}