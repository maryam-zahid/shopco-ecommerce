"use client";

import { useRef, useState } from "react";
/* =========================================================
   TYPES
========================================================= */

type Testimonial = {
  id: number;
  name: string;
  review: string;
};

/* =========================================================
   DATA
========================================================= */

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    review:
      `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`,
  },
  {
    id: 2,
    name: "Alex K.",
    review:
      `"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."`,
  },
  {
    id: 3,
    name: "James L.",
    review:
      `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."`,
  },
  {
    id: 4,
    name: "Moody M.",
    review:
      `"As someone who's always on the lookout for unique fashion pieces, I'm impressed by the collection, quality, and attention to detail that Shop.co consistently provides."`,
  },
  {
    id: 5,
    name: "Emily R.",
    review:
      `"The shopping experience was smooth and the quality exceeded what I expected. I always find something that fits my style."`,
  },
];


const carouselTestimonials = [
  testimonials[testimonials.length - 2],
  testimonials[testimonials.length - 1],
  ...testimonials,
  testimonials[0],
  testimonials[1],
  testimonials[2],
];


/* =========================================================
   STAR
========================================================= */

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="
        h-[19px]
        w-[19px]

        min-[800px]:h-[22px]
        min-[800px]:w-[22px]
      "
    >
      <path
        fill="#FFC633"
        d="M12 1.5L15.09 7.76L22 8.77L17 13.64L18.18 20.52L12 17.27L5.82 20.52L7 13.64L2 8.77L8.91 7.76L12 1.5Z"
      />
    </svg>
  );
}

/* =========================================================
   VERIFIED ICON
========================================================= */

function VerifiedIcon() {
  return (
    <span
      className="
        flex
        h-[19px]
        w-[19px]
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-[#01AB31]

        min-[800px]:h-[24px]
        min-[800px]:w-[24px]
      "
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="h-[11px] w-[11px] text-white min-[800px]:h-[14px] min-[800px]:w-[14px]"
      >
        <path
          d="M3 8.2L6.2 11.2L13 4.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* =========================================================
   ARROWS
========================================================= */

function LeftArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[24px] w-[24px]"
    >
      <path
        d="M19 12H5M11 18L5 12L11 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RightArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[24px] w-[24px]"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article
    //   className="
    //     box-border
    //     w-[358px]
    //     shrink-0
    //     rounded-[20px]
    //     border
    //     border-black/10
    //     bg-white

    //     px-[24px]
    //     py-[24px]

    //     min-[800px]:w-[360px]
    //     min-[800px]:px-[28px]
    //     min-[800px]:py-[28px]

    //     min-[1200px]:w-[400px]
    //     min-[1200px]:px-[32px]
    //     min-[1200px]:py-[28px]
    //   "
    className="
    box-border
    h-full
    w-full
    shrink-0
    rounded-[20px]
    border
    border-black/10
    bg-white

    px-[24px]
    py-[24px]

    min-[800px]:px-[28px]
    min-[800px]:py-[28px]

    min-[1200px]:w-[400px]
    min-[1200px]:px-[32px]
    min-[1200px]:py-[28px]
  "
    >
      {/* STARS */}
      <div className="flex h-[23px] items-center gap-[4px]">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>

      {/* NAME + VERIFIED */}
      <div
        className="
          mt-[12px]
          flex
          items-center
          gap-[4px]

          min-[800px]:mt-[15px]
        "
      >
        <h3
          className="
            m-0
            text-[20px]
            leading-[22px]
            text-black
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 700,
          }}
        >
          {testimonial.name}
        </h3>

        <VerifiedIcon />
      </div>

      {/* REVIEW */}
      <p
        className="
          m-0
          mt-[8px]
          w-full

          text-[16px]
          leading-[22px]
          text-black/60
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 400,
        }}
      >
        {testimonial.review}
      </p>
    </article>
  );
}

/* 
=========================================================
   SECTION
========================================================= */
export default function TestimonialsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(2);
  

function moveLeft() {
  if (window.innerWidth >= 1200) {
    setCurrentSlide((prev) => Math.max(prev - 1, 1));
    return;
  }

  if (!sliderRef.current) return;

  const amount = window.innerWidth < 800 ? 374 : 380;

  sliderRef.current.scrollBy({
    left: -amount,
    behavior: "smooth",
  });
}

function moveRight() {
  if (window.innerWidth >= 1200) {
    setCurrentSlide((prev) =>
      Math.min(prev + 1, carouselTestimonials.length - 4)
    );
    return;
  }

  if (!sliderRef.current) return;

  const amount = window.innerWidth < 800 ? 374 : 380;

  sliderRef.current.scrollBy({
    left: amount,
    behavior: "smooth",
  });
}

  
  return (
    <section
      id="testimonials"
      className="
        w-full
        overflow-hidden
        bg-white

        pt-[50px]
        pb-[50px]

        min-[800px]:pt-[64px]
        min-[800px]:pb-[64px]

        min-[1200px]:pt-[80px]
        min-[1200px]:pb-[80px]
      "
    >
   {/* ===================================================
    HEADING + ARROWS
==================================================== */}

<div
  className="
    relative
    mx-auto
    w-full
    px-[16px]

    min-[800px]:px-[32px]

    min-[1200px]:max-w-[1240px]
    min-[1200px]:px-0
  "
>
  {/* HEADING */}
  <h2
    className="
      m-0
      w-[286px]

      text-[32px]
      leading-[36px]
      tracking-[0]
      text-black

      min-[800px]:w-auto
      min-[800px]:pr-[100px]
      min-[800px]:text-[40px]
      min-[800px]:leading-[44px]

      min-[1200px]:text-[48px]
      min-[1200px]:leading-[48px]
  "
    style={{
      fontFamily: '"Arial Black", Arial, sans-serif',
      fontWeight: 900,
    }}
  >
    OUR HAPPY CUSTOMERS
  </h2>

  {/* ARROWS */}
  <div
    className="
      absolute
      right-[16px]
      bottom-[4px]
      z-20

      flex
      items-center
      gap-[16px]

      min-[800px]:right-[32px]

      min-[1200px]:right-0
      min-[1200px]:bottom-[6px]
    "
  >
    <button
      type="button"
      onClick={moveLeft}
      aria-label="Previous testimonial"
      className="
        flex
        h-[24px]
        w-[24px]
        cursor-pointer
        items-center
        justify-center
        border-0
        bg-transparent
        p-0
        text-black
      "
    >
      <LeftArrowIcon />
    </button>

    <button
      type="button"
      onClick={moveRight}
      aria-label="Next testimonial"
      className="
        flex
        h-[24px]
        w-[24px]
        cursor-pointer
        items-center
        justify-center
        border-0
        bg-transparent
        p-0
        text-black
      "
    >
      <RightArrowIcon />
    </button>
  </div>
</div>
    
{/* ===================================================
    CAROUSEL
==================================================== */}

<div
  className="
    relative
    mt-[24px]
    w-full
    overflow-hidden

    min-[800px]:mt-[32px]
    min-[1200px]:mt-[40px]
  "
>
  {/* =================================================
      MOBILE + TABLET
  ================================================== */}
{/* =================================================
    MOBILE + TABLET
================================================== */}

<div
  ref={sliderRef}
  className="
    flex
    w-full
    snap-x
    snap-mandatory
    overflow-x-auto
    scroll-smooth

    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden

    min-[1200px]:hidden
  "
>
  {testimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="
        w-full
        shrink-0
        snap-start

        px-[16px]

        min-[800px]:px-[32px]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[358px]

          min-[800px]:max-w-[700px]
        "
      >
        <TestimonialCard testimonial={testimonial} />
      </div>
    </div>
  ))}
</div>
  {/* =================================================
      DESKTOP

      visible:
      blur | clear | clear | clear | blur
  ================================================== */}

  <div
    className="
      relative
      hidden
      w-full
      overflow-hidden

      min-[1200px]:block
    "
  >
    <div
      className="
        flex
        items-stretch
        gap-[20px]

        transition-transform
        duration-500
        ease-in-out
      "
      style={{
        marginLeft: "calc((100vw - 1240px) / 2)",
        transform: `translateX(-${currentSlide * 420}px)`,
      }}
    >
      {carouselTestimonials.map((testimonial, index) => {
        const isLeftBlur = index === currentSlide - 1;
        const isRightBlur = index === currentSlide + 3;

        const isClear =
          index >= currentSlide &&
          index <= currentSlide + 2;

        return (
          <div
            key={`${testimonial.id}-${index}`}
            className={`
              shrink-0
              transition-all
              duration-500
              ease-in-out

              ${
                isLeftBlur || isRightBlur
                  ? "opacity-35 blur-[3px]"
                  : ""
              }

              ${
                isClear
                  ? "opacity-100 blur-0"
                  : ""
              }
            `}
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        );
      })}
    </div>
  </div>
</div>
 
    </section>
  );
}