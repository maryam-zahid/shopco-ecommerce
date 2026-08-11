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

/* =========================================================
   CARD
========================================================= */

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article
      className="
       h-auto
  min-h-[186px]
  w-[358px]
  shrink-0
  rounded-[20px]
  border
  border-black/10
  bg-white
  px-[24px]
  py-[24px]

  min-[800px]:min-h-[220px]
  min-[800px]:w-[360px]
  min-[800px]:px-[28px]
  min-[800px]:py-[28px]

  min-[1200px]:h-[240px]
  min-[1200px]:w-[400px]
  min-[1200px]:px-[32px]
  min-[1200px]:py-[28px]
  "
    >
      {/* STARS */}

      <div className="flex items-center gap-[4px]">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>

      {/* NAME */}

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

            min-[800px]:text-[22px]
            min-[800px]:leading-[22px]

            min-[1200px]:text-[20px]
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

          text-[16px]
          leading-[22px]
          text-black/60

          min-[800px]:mt-[12px]
          min-[800px]:text-[16px]
          min-[800px]:leading-[22px]
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

/* =========================================================
   SECTION
========================================================= */
export default function TestimonialsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  
function moveLeft() {
  if (!sliderRef.current) return;

  if (window.innerWidth >= 1200) {
    setCurrentSlide(0);

    sliderRef.current.scrollTo({
      left: 0,
      behavior: "smooth",
    });

    return;
  }

  const amount = window.innerWidth < 800 ? 374 : 380;

  sliderRef.current.scrollBy({
    left: -amount,
    behavior: "smooth",
  });
}

function moveRight() {
  if (!sliderRef.current) return;

  if (window.innerWidth >= 1200) {
    setCurrentSlide(1);

    sliderRef.current.scrollTo({
      left: 420,
      behavior: "smooth",
    });

    return;
  }

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
  <div
    ref={sliderRef}
    className="
      flex
      w-full
      snap-x
      snap-mandatory
      gap-[16px]
      overflow-x-auto
      scroll-smooth
      px-[16px]

      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden

      min-[800px]:gap-[20px]
      min-[800px]:px-[32px]

      min-[1200px]:mx-auto
      min-[1200px]:w-[calc(100%-160px)]
      min-[1200px]:max-w-[1640px]
      min-[1200px]:px-0
    "
  >
    {/* {testimonials.map((testimonial, index) => (
      <div
        key={testimonial.id}
        className={`
          shrink-0
          snap-start
          transition-all
          duration-300

          ${
            index === 3
              ? "min-[1200px]:opacity-40 min-[1200px]:blur-[2px]"
              : ""
          }
        `}
      >
        <TestimonialCard testimonial={testimonial} />
      </div>
    ))} */}
  {testimonials.map((testimonial, index) => {
  const shouldBlur =
    (currentSlide === 0 && index === 3) ||
    (currentSlide === 1 && index === 0);

  return (
    <div
      key={testimonial.id}
      className={`
        shrink-0
        snap-start
        transition-all
        duration-300
        ease-out

        ${
          shouldBlur
            ? "min-[1200px]:opacity-40 min-[1200px]:blur-[3px]"
            : "opacity-100 blur-none"
        }
      `}
    >
      <TestimonialCard testimonial={testimonial} />
    </div>
  );
})}
  </div>

  {/* LEFT FADE */}
  <div
    className="
      pointer-events-none
      absolute
      left-0
      top-0
      hidden
      h-full
      w-[70px]
      bg-gradient-to-r
      from-white
      to-transparent

      min-[1200px]:block
    "
  />

  {/* RIGHT FADE */}
  <div
    className="
      pointer-events-none
      absolute
      right-0
      top-0
      hidden
      h-full
      w-[110px]
      bg-gradient-to-l
      from-white
      to-transparent

      min-[1200px]:block
    "
  />
</div>
    </section>
  );
}