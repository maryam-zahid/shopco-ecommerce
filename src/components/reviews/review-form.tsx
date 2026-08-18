"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  CheckCircle2,
  Loader2,
  Star,
} from "lucide-react";

import {
  submitReviewAction,
} from "@/actions/review.actions";

type ReviewFormProps = {
  productId: string;
  productSlug: string;

  initialReview?: {
    rating: number;
    title: string;
    comment: string;
  };
};

export default function ReviewForm({
  productId,
  initialReview,
}: ReviewFormProps) {
  const [rating, setRating] =
    useState(
      initialReview?.rating ??
        0,
    );

  const [hoverRating, setHoverRating] =
    useState(0);

  const [title, setTitle] =
    useState(
      initialReview?.title ??
        "",
    );

  const [comment, setComment] =
    useState(
      initialReview?.comment ??
        "",
    );

  const [message, setMessage] =
    useState<string | null>(
      null,
    );

  const [isError, setIsError] =
    useState(false);

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleSubmit(
    event:
      React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage(null);
    setIsError(false);

    startTransition(
      async () => {
        const result =
          await submitReviewAction(
            {
              productId,
              rating,
              title,
              comment,
            },
          );

        setIsError(
          !result.success,
        );

        setMessage(
          result.message,
        );
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-[28px]"
    >
      {/* RATING */}

      <div>
        <label
          className="
            text-[13px]
            font-semibold
            text-black
          "
        >
          Your rating
        </label>

        <div
          className="
            mt-[10px]

            flex
            items-center
            gap-[6px]
          "
        >
          {[1, 2, 3, 4, 5].map(
            (star) => {
              const active =
                star <=
                (hoverRating ||
                  rating);

              return (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() =>
                    setHoverRating(
                      star,
                    )
                  }
                  onMouseLeave={() =>
                    setHoverRating(
                      0,
                    )
                  }
                  onClick={() =>
                    setRating(
                      star,
                    )
                  }
                  className="
                    flex
                    h-[34px]
                    w-[34px]
                    items-center
                    justify-center
                  "
                  aria-label={`${star} stars`}
                >
                  <Star
                    className="
                      h-[26px]
                      w-[26px]
                    "
                    style={{
                      color:
                        "#FFC633",

                      fill: active
                        ? "#FFC633"
                        : "transparent",

                      strokeWidth:
                        1.8,
                    }}
                  />
                </button>
              );
            },
          )}

          {rating > 0 && (
            <span
              className="
                ml-[4px]

                text-[12px]
                text-black/45
              "
            >
              {rating}/5
            </span>
          )}
        </div>
      </div>

      {/* TITLE */}

      <label
        className="
          mt-[24px]
          block
        "
      >
        <span
          className="
            text-[13px]
            font-semibold
            text-black
          "
        >
          Review title
        </span>

        <input
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(
              event.target.value,
            )
          }
          maxLength={100}
          placeholder="Summarize your experience"
          className="
            mt-[8px]

            h-[44px]
            w-full

            rounded-[8px]

            bg-white

            px-[13px]

            text-[13px]
            text-black

            outline-none

            transition-colors

            focus:ring-2
            focus:ring-black/10
          "
          style={{
            border:
              "1.5px solid rgba(0,0,0,0.18)",
          }}
        />
      </label>

      {/* COMMENT */}

      <label
        className="
          mt-[20px]
          block
        "
      >
        <span
          className="
            text-[13px]
            font-semibold
            text-black
          "
        >
          Your review
        </span>

        <textarea
          value={comment}
          onChange={(event) =>
            setComment(
              event.target.value,
            )
          }
          maxLength={1500}
          rows={6}
          placeholder="Tell other customers what you liked or disliked about this product..."
          className="
            mt-[8px]

            min-h-[140px]
            w-full

            resize-y

            rounded-[8px]

            bg-white

            px-[13px]
            py-[12px]

            text-[13px]
            leading-[20px]
            text-black

            outline-none

            transition-colors

            focus:ring-2
            focus:ring-black/10
          "
          style={{
            border:
              "1.5px solid rgba(0,0,0,0.18)",
          }}
        />

        <div
          className="
            mt-[5px]

            flex
            justify-end
          "
        >
          <span
            className="
              text-[10px]
              text-black/40
            "
          >
            {comment.length}
            /1500
          </span>
        </div>
      </label>

      {/* MESSAGE */}

      {message && (
        <div
          className="
            mt-[16px]

            flex
            items-center
            gap-[8px]

            rounded-[8px]

            px-[12px]
            py-[10px]

            text-[12px]
          "
          style={{
            backgroundColor:
              isError
                ? "#FEF2F2"
                : "#F0FDF4",

            border: isError
              ? "1px solid #FECACA"
              : "1px solid #BBF7D0",

            color: isError
              ? "#B91C1C"
              : "#15803D",
          }}
        >
          {!isError && (
            <CheckCircle2 className="size-[15px]" />
          )}

          {message}
        </div>
      )}

      {/* SUBMIT */}

      <div
        className="
          mt-[24px]

          flex
          justify-end
        "
      >
        <button
          type="submit"
          disabled={
            isPending
          }
          className="
            inline-flex
            min-h-[42px]
            min-w-[145px]
            items-center
            justify-center
            gap-[8px]

            rounded-[8px]

            px-[18px]
            py-[10px]

            text-[13px]
            font-semibold
            leading-[18px]

            disabled:
            cursor-not-allowed
          "
          style={{
            backgroundColor:
              "#0D0D0F",

            border:
              "1px solid #0D0D0F",

            color:
              "#FFFFFF",

            opacity:
              isPending
                ? 0.65
                : 1,
          }}
        >
          {isPending && (
            <Loader2
              className="
                size-[15px]
                animate-spin
              "
              style={{
                color:
                  "#FFFFFF",
              }}
            />
          )}

          <span
            style={{
              color:
                "#FFFFFF",
            }}
          >
            {initialReview
              ? "Update Review"
              : "Submit Review"}
          </span>
        </button>
      </div>
    </form>
  );
}