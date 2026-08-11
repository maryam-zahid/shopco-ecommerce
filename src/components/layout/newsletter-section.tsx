
"use client";

import type { FormEvent } from "react";

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[24px] w-[24px] shrink-0 text-black/40"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M4 7L12 13L20 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NewsletterSection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section
   
     className="
    relative
    z-10
    w-full
    bg-[linear-gradient(to_bottom,#FFFFFF_0%,#FFFFFF_50%,#F0F0F0_50%,#F0F0F0_100%)]
  "
    >
      {/* BLACK NEWSLETTER FRAME */}
      <div
        className="
          mx-auto
          !flex
          h-[293px]
          w-full
          max-w-[358px]
          !flex-col
          rounded-[20px]
          !bg-black
          px-[24px]
          py-[32px]

          min-[800px]:h-[180px]
          min-[800px]:max-w-[1240px]
          min-[800px]:!flex-row
          min-[800px]:!items-center
          min-[800px]:!justify-between
          min-[800px]:gap-[40px]
          min-[800px]:px-[64px]
          min-[800px]:py-[36px]

          min-[1920px]:gap-[153px]
        "
      >
        {/* HEADING */}
        <h2
          className="
            m-0
            w-[310px]
            max-w-full
            shrink-0
            text-[32px]
            leading-[35px]
            tracking-[-1px]
            !text-white

            min-[800px]:w-[551px]
            min-[800px]:text-[40px]
            min-[800px]:leading-[45px]
            min-[800px]:tracking-[0]
          "
          style={{
            fontFamily: '"Arial Black", Arial, sans-serif',
            fontWeight: 900,
          }}
        >
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>

        {/* RIGHT / BOTTOM FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            mt-[28px]
            !flex
            h-[98px]
            w-[310px]
            max-w-full
            shrink-0
            !flex-col
            !gap-[14px]

            min-[800px]:mt-0
            min-[800px]:h-[108px]
            min-[800px]:w-[349px]
          "
        >
          {/* 1 — EMAIL FRAME */}
          <div
            className="
              !flex
              !h-[42px]
              !w-full
              shrink-0
              !items-center
              !gap-[12px]
              !rounded-[62px]
              !bg-white
              !px-[16px]

              min-[800px]:!h-[48px]
            "
          >
            <EmailIcon />

            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="
                !block
                h-[22px]
                min-w-0
                flex-1
                !border-0
                !bg-transparent
                !p-0
                !outline-none

                text-[14px]
                leading-[22px]
                !text-black

                placeholder:!text-black/40

                min-[800px]:text-[16px]
              "
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 400,
              }}
            />
          </div>

          {/* 2 — SUBSCRIBE FRAME */}
          <button
            type="submit"
            className="
              !m-0
              !flex
              !h-[42px]
              !min-h-[42px]
              !w-full
              shrink-0
              cursor-pointer
              !items-center
              !justify-center

              !rounded-[62px]
              !border-0
              !bg-white
              !px-[16px]
              !py-0

              text-[16px]
              leading-[22px]
              !text-black
              opacity-100
              visible

              min-[800px]:!h-[46px]
              min-[800px]:!min-h-[46px]
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 500,
              display: "flex",
              visibility: "visible",
              opacity: 1,
            }}
          >
            Subscribe to Newsletter
          </button>
        </form>
      </div>
    </section>
  );
}