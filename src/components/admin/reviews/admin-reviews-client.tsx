"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  toggleReviewVisibilityAction,
} from "@/actions/admin-review.actions";

type ReviewRow = {
  id: string;

  customerName: string;
  customerEmail: string;

  productName: string;
  productSlug: string;

  rating: number;

  title:
    | string
    | null;

  comment: string;

  isVisible: boolean;

  createdAt: string;
};

type Props = {
  initialReviews: ReviewRow[];
};

export default function AdminReviewsClient({
  initialReviews,
}: Props) {
  const [reviews, setReviews] =
    useState(initialReviews);

  const [message, setMessage] =
    useState<string | null>(null);

  const [isError, setIsError] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  function handleToggle(
    review: ReviewRow,
  ) {
    startTransition(async () => {
      const result =
        await toggleReviewVisibilityAction({
          reviewId:
            review.id,

          isVisible:
            !review.isVisible,
        });

      setIsError(
        !result.success,
      );

      setMessage(
        result.message,
      );

      if (!result.success) {
        return;
      }

      setReviews((current) =>
        current.map((item) =>
          item.id === review.id
            ? {
                ...item,
                isVisible:
                  !item.isVisible,
              }
            : item,
        ),
      );
    });
  }

  return (
    <div className="space-y-[16px]">
      {message && (
        <div
          className={`
            rounded-[10px]

            border

            px-[14px]
            py-[12px]

            text-[13px]

            ${
              isError
                ? "border-red-300 bg-red-50 text-red-700"
                : "border-green-300 bg-green-50 text-green-700"
            }
          `}
        >
          {message}
        </div>
      )}

      {reviews.map(
        (review) => (
          <article
            key={review.id}
            className="
              rounded-[14px]

              border

              bg-white

              p-[20px]
            "
            style={{
              border:
                "1.5px solid rgba(0,0,0,0.16)",
            }}
          >
            <div
              className="
                flex
                flex-col
                gap-[14px]

                min-[800px]:flex-row
                min-[800px]:items-start
                min-[800px]:justify-between
              "
            >
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-black">
                  {review.productName}
                </p>

                <p className="mt-[3px] text-[12px] text-black/50">
                  {review.customerName}
                  {" · "}
                  {review.customerEmail}
                </p>

                <p className="mt-[8px] text-[13px] font-semibold text-black">
                  Rating: {review.rating}/5
                </p>

                {review.title && (
                  <p className="mt-[10px] text-[14px] font-semibold text-black">
                    {review.title}
                  </p>
                )}

                <p
                  className="
                    mt-[8px]
                    max-w-[800px]

                    text-[13px]
                    leading-[21px]
                    text-black/65
                  "
                >
                  {review.comment}
                </p>

                <p className="mt-[10px] text-[11px] text-black/40">
                  {new Date(
                    review.createdAt,
                  ).toLocaleDateString(
                    "en-US",
                    {
                      year:
                        "numeric",

                      month:
                        "short",

                      day:
                        "numeric",
                    },
                  )}
                </p>
              </div>

              <button
                type="button"
                disabled={isPending}
                onClick={() =>
                  handleToggle(
                    review,
                  )
                }
                className="
                  h-[40px]
                  shrink-0

                  rounded-[8px]

                  px-[16px]

                  text-[12px]
                  font-semibold

                  disabled:opacity-50
                "
                style={{
                  border:
                    "1.5px solid rgba(0,0,0,0.28)",

                  backgroundColor:
                    review.isVisible
                      ? "#FFFFFF"
                      : "#000000",

                  color:
                    review.isVisible
                      ? "#000000"
                      : "#FFFFFF",
                }}
              >
                {review.isVisible
                  ? "Hide Review"
                  : "Show Review"}
              </button>
            </div>
          </article>
        ),
      )}

      {reviews.length === 0 && (
        <div
          className="
            rounded-[14px]

            bg-white

            px-[20px]
            py-[70px]

            text-center
            text-[14px]
            text-black/45
          "
          style={{
            border:
              "1.5px solid rgba(0,0,0,0.16)",
          }}
        >
          No reviews found.
        </div>
      )}
    </div>
  );
}