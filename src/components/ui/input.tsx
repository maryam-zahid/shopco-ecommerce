import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

type InputProps =
  React.ComponentProps<"input"> & {
    inputSize?: "default" | "checkout";
  };

function Input({
  className,
  type,
  inputSize = "default",
  ...props
}: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        `
          w-full
          min-w-0

          border-solid
          bg-white

          text-black

          outline-none

          transition-all
          duration-150

          placeholder:text-black/40

          hover:border-black/70

          focus-visible:border-black
          focus-visible:ring-[3px]
          focus-visible:ring-black/10

          disabled:pointer-events-none
          disabled:cursor-not-allowed
          disabled:bg-black/[0.03]
          disabled:opacity-50

          aria-invalid:border-[#FF3333]
          aria-invalid:ring-[#FF3333]/10
        `,

        inputSize === "default" &&
          `
            h-[42px]

            rounded-[8px]

            border-[1.5px]
            border-black/30

            px-[13px]

            text-[14px]
          `,

        inputSize === "checkout" &&
          `
            h-[48px]

            rounded-[9px]

            border-2
            border-black/45

            px-[14px]

            text-[14px]
          `,

        className,
      )}
      {...props}
    />
  );
}

export { Input };