"use client";

import {
  Pencil,
  Printer,
} from "lucide-react";

export default function OrderDetailActions() {
  function handlePrint() {
    window.print();
  }

  function handleEdit() {
    document
      .getElementById(
        "order-status-editor",
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }
return (
  <div
    className="
      flex
      items-center
      gap-[10px]
    "
  >
    {/* ================================
        PRINT BUTTON
    ================================= */}

    <button
      type="button"
      onClick={handlePrint}
      className="
        inline-flex
        h-[42px]
        min-w-[92px]
        items-center
        justify-center
        gap-[8px]

        rounded-[8px]

        px-[14px]
        py-0

        text-[14px]
        font-medium
        leading-none

        transition-all
        duration-200

        hover:bg-[#F8F8F8]
        active:scale-[0.98]
      "
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #D9D9D9",
        color: "#111111",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <Printer
        className="
          h-[18px]
          w-[18px]
          shrink-0
        "
        style={{
          color: "#111111",
          strokeWidth: 2,
        }}
      />

      <span
        className="
          flex
          items-center
          justify-center
          whitespace-nowrap
        "
      >
        Print
      </span>
    </button>

    {/* ================================
        EDIT BUTTON
    ================================= */}

    <button
      type="button"
      onClick={handleEdit}
      className="
        inline-flex
        h-[42px]
        min-w-[88px]
        items-center
        justify-center
        gap-[8px]

        rounded-[8px]

        px-[14px]
        py-0

        text-[14px]
        font-medium
        leading-none

        transition-all
        duration-200

        hover:opacity-90
        active:scale-[0.98]
      "
      style={{
        backgroundColor: "#0D0D0F",
        border: "1px solid #0D0D0F",
        color: "#FFFFFF",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.12)",
      }}
    >
      <Pencil
        className="
          h-[18px]
          w-[18px]
          shrink-0
        "
        style={{
          color: "#FFFFFF",
          strokeWidth: 2,
        }}
      />

      <span
        className="
          flex
          items-center
          justify-center
          whitespace-nowrap
        "
        style={{
          color: "#FFFFFF",
        }}
      >
        Edit
      </span>
    </button>
  </div>
);}