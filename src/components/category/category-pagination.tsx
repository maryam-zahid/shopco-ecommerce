"use client";

import { useState } from "react";

export default function CategoryPagination() {
  const [page, setPage] = useState(1);

  const totalPages = 10;

  function previousPage() {
    setPage((current) => Math.max(1, current - 1));
  }

  function nextPage() {
    setPage((current) =>
      Math.min(totalPages, current + 1),
    );
  }

  return (
    <div
      className="
        mt-[32px]
        w-full
        border-t
        border-black/10
        pt-[20px]
      "
    >
      <div
        className="
          flex
          h-[36px]
          w-full
          items-center
          justify-between

          min-[800px]:h-[40px]
        "
      >
        {/* =========================================
            PREVIOUS
        ========================================= */}
<button
  type="button"
  onClick={previousPage}
  disabled={page === 1}
  className="
    flex
    h-[36px]
    items-center
    justify-center
    gap-[8px]

    !rounded-[8px]
    !border
    !border-solid
    !border-[#E6E6E6]
    !bg-white

    px-[10px]

    text-[12px]
    leading-[16px]
    !text-black

    disabled:cursor-not-allowed
    disabled:opacity-40

    min-[800px]:h-[40px]
    min-[800px]:px-[14px]
    min-[800px]:text-[14px]
    min-[800px]:leading-[20px]
  "
  style={{
    fontFamily: "var(--font-satoshi)",
    fontWeight: 500,
    border: "1px solid #E6E6E6",
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
  }}
>
  <ArrowLeftIcon />
  <span>Previous</span>
</button>

        {/* =========================================
            PAGE NUMBERS
        ========================================= */}

        <div
          className="
            flex
            items-center
            gap-[2px]

            min-[800px]:gap-[8px]
          "
        >
          <PageButton
            pageNumber={1}
            currentPage={page}
            setPage={setPage}
          />

          <PageButton
            pageNumber={2}
            currentPage={page}
            setPage={setPage}
          />

          <PageButton
            pageNumber={3}
            currentPage={page}
            setPage={setPage}
            desktopOnly
          />

          <span
            className="
              flex
              h-[36px]
              min-w-[28px]
              items-center
              justify-center

              text-[14px]
              leading-[20px]
              text-black/40

              min-[800px]:h-[40px]
              min-[800px]:min-w-[40px]
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 400,
            }}
          >
            ...
          </span>

          <PageButton
            pageNumber={8}
            currentPage={page}
            setPage={setPage}
            desktopOnly
          />

          <PageButton
            pageNumber={9}
            currentPage={page}
            setPage={setPage}
          />

          <PageButton
            pageNumber={10}
            currentPage={page}
            setPage={setPage}
          />
        </div>

        {/* =========================================
            NEXT
        ========================================= */}

       <button
  type="button"
  onClick={nextPage}
  disabled={page === totalPages}
  className="
    flex
    h-[36px]
    items-center
    justify-center
    gap-[8px]

    !rounded-[8px]
    !border
    !border-solid
    !border-[#E6E6E6]
    !bg-white

    px-[10px]

    text-[12px]
    leading-[16px]
    !text-black

    disabled:cursor-not-allowed
    disabled:opacity-40

    min-[800px]:h-[40px]
    min-[800px]:px-[14px]
    min-[800px]:text-[14px]
    min-[800px]:leading-[20px]
  "
  style={{
    fontFamily: "var(--font-satoshi)",
    fontWeight: 500,
    border: "1px solid #E6E6E6",
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
  }}
>
  <span>Next</span>
  <ArrowRightIcon />
</button>
      </div>
    </div>
  );
}

function PageButton({
  pageNumber,
  currentPage,
  setPage,
  desktopOnly = false,
}: {
  pageNumber: number;
  currentPage: number;
  setPage: (page: number) => void;
  desktopOnly?: boolean;
}) {
  const active = pageNumber === currentPage;

  return (
    <button
      type="button"
      onClick={() => setPage(pageNumber)}
      aria-current={active ? "page" : undefined}
      className={`
        h-[36px]
        min-w-[36px]

        items-center
        justify-center

        rounded-[8px]
        border-0
        p-0

        text-[14px]
        leading-[20px]

        transition-colors
        duration-200

        min-[800px]:h-[40px]
        min-[800px]:min-w-[40px]

        ${desktopOnly ? "hidden min-[800px]:flex" : "flex"}

        ${
          active
            ? "!bg-[#F0F0F0] !text-black"
            : "!bg-transparent !text-black/40 hover:!text-black/70"
        }
      `}
      style={{
        fontFamily: "var(--font-satoshi)",
        fontWeight: active ? 500 : 400,
      }}
    >
      {pageNumber}
    </button>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M19 12H5M12 19L5 12L12 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M5 12H19M12 5L19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}