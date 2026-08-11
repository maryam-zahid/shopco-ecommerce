"use client";

import { useState } from "react";

type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 4.5,
    text:
      "\"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.\"",
    date: "Posted on August 14, 2023",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 4,
    text:
      "\"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.\"",
    date: "Posted on August 15, 2023",
  },
  {
    id: 3,
    name: "Ethan R.",
    rating: 3.5,
    text:
      "\"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.\"",
    date: "Posted on August 16, 2023",
  },
  {
    id: 4,
    name: "Olivia P.",
    rating: 4,
    text:
      "\"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.\"",
    date: "Posted on August 17, 2023",
  },
  {
    id: 5,
    name: "Liam K.",
    rating: 4,
    text:
      "\"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.\"",
    date: "Posted on August 18, 2023",
  },
  {
    id: 6,
    name: "Ava H.",
    rating: 4.5,
    text:
      "\"I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.\"",
    date: "Posted on August 19, 2023",
  },
];

function VerifiedIcon() {
  return (
    <span
      className="
        inline-flex
        h-[19px]
        w-[19px]
        items-center
        justify-center
        rounded-full
        bg-[#01AB31]

        text-[12px]
        leading-none
        text-white
      "
    >
      ✓
    </span>
  );
}

function MoreIcon() {
  return (
    <span
      className="
        text-[22px]
        leading-none
        tracking-[2px]
        text-black/40
      "
    >
      •••
    </span>
  );
}
function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="
        h-[20px]
        w-[20px]

        min-[1200px]:h-[24px]
        min-[1200px]:w-[24px]
      "
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* LEFT SLIDER */}
      <path
        d="M5 3V8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 12V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2.5 10H7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* MIDDLE SLIDER */}
      <path
        d="M12 3V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 17V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 15H14.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* RIGHT SLIDER */}
      <path
        d="M19 3V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 10V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 8H21.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ReviewStars({
  rating,
}: {
  rating: number;
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div
      className="
        flex
        items-center
        gap-[4px]

        text-[#FFC633]
      "
    >
      {Array.from({ length: fullStars }).map((_, index) => (
        <span
          key={`full-${index}`}
          className="
            text-[20px]
            leading-none

            min-[1200px]:text-[22px]
          "
        >
          ★
        </span>
      ))}

      {hasHalfStar && (
        <span
          className="
            inline-block
            w-[10px]
            overflow-hidden

            text-[20px]
            leading-none

            min-[1200px]:w-[11px]
            min-[1200px]:text-[22px]
          "
        >
          ★
        </span>
      )}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: Review;
}) {
  return (
    <article
      className="
        box-border
        flex
        w-full
        flex-col

        rounded-[20px]
        border
        border-black/10
        bg-white

        px-[24px]
        py-[24px]

        min-[1200px]:min-h-[242px]
        min-[1200px]:px-[32px]
        min-[1200px]:py-[28px]
      "
    >
      {/* TOP */}
      <div className="flex items-start justify-between">
        <ReviewStars rating={review.rating} />

        <MoreIcon />
      </div>

      {/* NAME */}
      <div
        className="
          mt-[14px]
          flex
          items-center
          gap-[6px]
        "
      >
        <h3
          className="
            m-0

            text-[16px]
            leading-[22px]
            text-black

            min-[1200px]:text-[20px]
            min-[1200px]:leading-[22px]
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 700,
          }}
        >
          {review.name}
        </h3>

        <VerifiedIcon />
      </div>

      {/* REVIEW */}
      <p
        className="
          m-0
          mt-[12px]

          text-[14px]
          leading-[20px]
          text-black/60

          min-[1200px]:text-[16px]
          min-[1200px]:leading-[22px]
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 400,
        }}
      >
        {review.text}
      </p>

      {/* DATE */}
      <p
        className="
          m-0
          mt-[24px]

          text-[14px]
          leading-[20px]
          text-black/60

          min-[1200px]:mt-auto
          min-[1200px]:pt-[24px]
          min-[1200px]:text-[16px]
          min-[1200px]:leading-[22px]
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 500,
        }}
      >
        {review.date}
      </p>
    </article>
  );
}

export default function ReviewsSection() {
  const [sortOpen, setSortOpen] = useState(false);
  const [showAllMobileReviews, setShowAllMobileReviews] = useState(false);

  return (
    <section
      className="
        w-full
        bg-white
      "
    >
      <div
        className="
          mx-auto
          w-full

          px-[16px]

          min-[800px]:px-[32px]

          min-[1200px]:max-w-[1440px]
          min-[1200px]:px-[100px]
        "
      >
      {/* =================================================
    TABS
================================================== */}

<div
  className="
    grid
    grid-cols-[1fr_1.35fr_0.8fr]
    border-b
    border-black/10

    min-[1200px]:grid-cols-3
  "
>
  <button
    type="button"
    className="
      h-[48px]
      whitespace-nowrap
      border-0
      bg-transparent
      px-0

      text-[14px]
      leading-[20px]
      text-black/60

      min-[800px]:text-[16px]
      min-[800px]:leading-[22px]

      min-[1200px]:h-[52px]
      min-[1200px]:text-[20px]
    "
    style={{
      fontFamily: "var(--font-satoshi)",
      fontWeight: 400,
    }}
  >
    Product Details
  </button>

  <button
    type="button"
    className="
      relative
      h-[48px]
      whitespace-nowrap
      border-0
      bg-transparent
      px-0

      text-[16px]
      leading-[22px]
      text-black

      after:absolute
      after:bottom-[-1px]
      after:left-0
      after:h-[2px]
      after:w-full
      after:bg-black

      min-[1200px]:h-[52px]
      min-[1200px]:text-[20px]
    "
    style={{
      fontFamily: "var(--font-satoshi)",
      fontWeight: 500,
    }}
  >
    Rating & Reviews
  </button>

  <button
    type="button"
    className="
      h-[48px]
      whitespace-nowrap
      border-0
      bg-transparent
      px-0

      text-[14px]
      leading-[20px]
      text-black/60

      min-[800px]:text-[16px]
      min-[800px]:leading-[22px]

      min-[1200px]:h-[52px]
      min-[1200px]:text-[20px]
    "
    style={{
      fontFamily: "var(--font-satoshi)",
      fontWeight: 400,
    }}
  >
    FAQs
  </button>
</div>
        {/* =================================================
    REVIEWS HEADER
================================================== */}

<div
  className="
    mt-[20px]
    flex
    w-full
    items-center
    justify-between

    min-[1200px]:mt-[24px]
  "
>
  {/* ALL REVIEWS */}
  <div
    className="
      flex
      min-w-0
      shrink
      items-baseline
      gap-[6px]

      min-[1200px]:gap-[8px]
    "
  >
    <h2
      className="
        m-0
        whitespace-nowrap

        text-[20px]
        leading-[26px]
        text-black

        min-[1200px]:text-[24px]
        min-[1200px]:leading-[32px]
      "
      style={{
        fontFamily: "var(--font-satoshi)",
        fontWeight: 700,
      }}
    >
      All Reviews
    </h2>

    <span
      className="
        whitespace-nowrap

        text-[14px]
        leading-[20px]
        text-black/60

        min-[1200px]:text-[16px]
        min-[1200px]:leading-[22px]
      "
      style={{
        fontFamily: "var(--font-satoshi)",
        fontWeight: 400,
      }}
    >
      (451)
    </span>
  </div>

  {/* =================================================
      MOBILE CONTROLS
  ================================================== */}

  <div
    className="
      flex
      shrink-0
      items-center
      gap-[8px]

      min-[1200px]:hidden
    "
  >
    {/* MOBILE FILTER */}
    <button
      type="button"
      aria-label="Filter reviews"
      className="
        flex
        h-[40px]
        w-[40px]
        shrink-0
        items-center
        justify-center

        rounded-full
        !border-0
        !bg-[#F0F0F0]
        !p-0
        text-black
        outline-none
      "
      style={{
        border: "none",
      }}
    >
      <FilterIcon />
    </button>

    {/* MOBILE WRITE REVIEW */}
    <button
      type="button"
      className="
        flex
        h-[40px]
        w-[113px]
        shrink-0
        items-center
        justify-center

        whitespace-nowrap
        rounded-[62px]
        !border-0
        !bg-black
        !px-[16px]
        !py-0

        text-[12px]
        leading-[16px]
        !text-white
        outline-none
      "
      style={{
        fontFamily: "var(--font-satoshi)",
        fontWeight: 500,
        border: "none",
      }}
    >
      Write a Review
    </button>
  </div>

  {/* =================================================
      DESKTOP CONTROLS
  ================================================== */}

  <div
    className="
      hidden
      h-[48px]
      w-[354px]
      shrink-0
      items-center
      gap-[10px]

      min-[1200px]:flex
    "
  >
    {/* DESKTOP FILTER */}
    <button
      type="button"
      aria-label="Filter reviews"
      className="
        flex
        h-[48px]
        w-[48px]
        shrink-0
        items-center
        justify-center

        rounded-full
        !border-0
        !bg-[#F0F0F0]
        !p-0
        text-black
        outline-none
      "
      style={{
        border: "none",
      }}
    >
      <FilterIcon />
    </button>

    {/* LATEST */}
    <div className="relative h-[48px] w-[120px] shrink-0">
      <button
        type="button"
        onClick={() => setSortOpen((value) => !value)}
        className="
          flex
          h-[48px]
          w-[120px]
          items-center
          justify-between

          rounded-[62px]
          !border-0
          !bg-[#F0F0F0]
          !px-[20px]
          !py-0
          outline-none

          text-[16px]
          leading-[22px]
          text-black
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 500,
          border: "none",
        }}
      >
        <span>Latest</span>

        <ChevronDownIcon />
      </button>

      {sortOpen && (
        <div
          className="
            absolute
            right-0
            top-[54px]
            z-30

            w-[120px]
            overflow-hidden
            rounded-[14px]
            border
            border-black/10
            bg-white
            shadow-md
          "
        >
          <button
            type="button"
            className="
              block
              w-full
              border-0
              bg-white
              px-[16px]
              py-[10px]

              text-left
              text-[14px]
              text-black
            "
          >
            Latest
          </button>

          <button
            type="button"
            className="
              block
              w-full
              border-0
              bg-white
              px-[16px]
              py-[10px]

              text-left
              text-[14px]
              text-black
            "
          >
            Oldest
          </button>
        </div>
      )}
    </div>

    {/* DESKTOP WRITE REVIEW */}
    <button
      type="button"
      className="
        flex
        h-[48px]
        w-[166px]
        shrink-0
        items-center
        justify-center

        whitespace-nowrap
        rounded-[62px]
        !border-0
        !bg-black
        !px-[24px]
        !py-0
        outline-none

        text-[16px]
        leading-[22px]
        !text-white
      "
      style={{
        fontFamily: "var(--font-satoshi)",
        fontWeight: 500,
        border: "none",
      }}
    >
      Write a Review
    </button>
  </div>
</div>
        {/* =================================================
            REVIEWS GRID
        ================================================== */}

       {/* =================================================
    REVIEWS GRID
================================================== */}

<div
  className="
    mt-[20px]
    grid
    grid-cols-1
    gap-[16px]

    min-[800px]:grid-cols-2
    min-[800px]:gap-[20px]

    min-[1200px]:mt-[24px]
  "
>
  {reviews.map((review, index) => (
    <div
      key={review.id}
      className={`
        ${
          !showAllMobileReviews && index >= 2
            ? "hidden min-[800px]:block"
            : "block"
        }
      `}
    >
      <ReviewCard review={review} />
    </div>
  ))}
</div>

   
{/* =================================================
    LOAD MORE
================================================== */}

<div
  className="
    flex
    justify-center

    pt-[32px]
    pb-[40px]

    min-[1200px]:pt-[36px]
    min-[1200px]:pb-[64px]
  "
>
  <button
    type="button"
    onClick={() => setShowAllMobileReviews(true)}
    className="
      flex
      h-[47px]
      w-[195px]
      items-center
      justify-center

      rounded-[62px]

      !border
      !border-solid
      !border-black/10
      !bg-white

      text-[14px]
      leading-[20px]
      text-black

      cursor-pointer

      min-[1200px]:h-[52px]
      min-[1200px]:w-[230px]
      min-[1200px]:text-[16px]
      min-[1200px]:leading-[22px]
    "
    style={{
      fontFamily: "var(--font-satoshi)",
      fontWeight: 500,
      border: "1px solid rgba(0, 0, 0, 0.1)",
    }}
  >
    Load More Reviews
  </button>
</div>
      </div>
    </section>
  );
}