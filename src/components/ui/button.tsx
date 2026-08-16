import { Button as ButtonPrimitive } from "@base-ui/react/button";
import {
  cva,
  type VariantProps,
} from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
    group/button
    inline-flex
    shrink-0
    items-center
    justify-center

    whitespace-nowrap

    border
    border-transparent

    bg-clip-padding

    text-sm
    font-medium

    outline-none
    select-none

    transition-all
    duration-150

    focus-visible:ring-2
    focus-visible:ring-black/10

    active:not-aria-[haspopup]:translate-y-px

    disabled:pointer-events-none
    disabled:cursor-not-allowed
    disabled:opacity-50

    aria-invalid:border-destructive
    aria-invalid:ring-2
    aria-invalid:ring-destructive/20

    [&_svg]:pointer-events-none
    [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4
  `,
  {
    variants: {
      variant: {
        default:
          `
            border-black
            bg-black
            text-white

            hover:border-[#1A1A1A]
            hover:bg-[#1A1A1A]
            hover:text-white
          `,

     outline:
  `
    border-2
    border-black/40

    bg-white
    text-black

    hover:border-black
    hover:bg-[#F8F8F8]
    hover:text-black
  `,

        subtle:
          `
            border-black/10
            bg-[#F8F8F8]
            text-black

            hover:border-black/20
            hover:bg-[#F0F0F0]
          `,

        selected:
          `
            border-2
            border-black
            bg-white
            text-black
    shadow-[0_0_0_1px_rgba(0,0,0,0.04)]

            hover:bg-[#FAFAFA]
          `,

        secondary:
          `
            bg-secondary
            text-secondary-foreground

            hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]
          `,

        ghost:
          `
            border-transparent
            bg-transparent
            text-black

            hover:bg-black/5
            hover:text-black
          `,

        destructive:
          `
            border-red-600
            bg-red-600
            text-white

            hover:bg-red-700
          `,

        link:
          `
            border-transparent
            bg-transparent
            p-0

            text-black
            underline-offset-4

            hover:underline
          `,
      },

      size: {
        default:
          `
            h-[42px]
            gap-[8px]

            rounded-[8px]

            px-[16px]

            text-[14px]
          `,

        xs:
          `
            h-[30px]
            gap-[5px]

            rounded-[6px]

            px-[10px]

            text-[12px]
          `,

        sm:
          `
            h-[36px]
            gap-[6px]

            rounded-[7px]

            px-[12px]

            text-[13px]
          `,

        lg:
          `
            h-[48px]
            gap-[8px]

            rounded-[9px]

            px-[20px]

            text-[14px]
          `,

        shop:
          `
            h-[54px]
            gap-[10px]

            rounded-[62px]

            px-[24px]

            text-[16px]
            leading-[22px]
          `,

        checkout:
          `
            h-[56px]
            gap-[10px]

            rounded-[8px]

            px-[24px]

            text-[15px]
            font-semibold
            uppercase
          `,

        icon:
          `
            size-[40px]
            rounded-[8px]
            p-0
          `,

        "icon-xs":
          `
            size-[30px]
            rounded-[6px]
            p-0
          `,

        "icon-sm":
          `
            size-[36px]
            rounded-[7px]
            p-0
          `,

        "icon-lg":
          `
            size-[48px]
            rounded-[9px]
            p-0
          `,
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    />
  );
}

export {
  Button,
  buttonVariants,
};