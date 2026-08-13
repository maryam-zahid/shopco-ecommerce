"use client";

import {
  Bell,
  Moon,
  Palette,
  Search,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminHeader() {
  return (
    <header
      className="
        sticky
        top-0
        z-40

        flex
        h-[52px]
        items-center
        gap-[10px]

        border-b
        border-black/10
        bg-white

        px-[14px]

        min-[800px]:px-[18px]
      "
    >
      {/* SIDEBAR TOGGLE */}
      <SidebarTrigger
        className="
          -ml-1
          h-[32px]
          w-[32px]
          rounded-[6px]
        "
      />

      <Separator
        orientation="vertical"
        className="h-[20px]"
      />

      {/* SEARCH */}
      <div
        className="
          relative
          hidden
          w-[320px]

          min-[800px]:block
          min-[1200px]:w-[360px]
        "
      >
        <Search
          className="
            pointer-events-none
            absolute
            left-[11px]
            top-1/2
            z-10

            h-[16px]
            w-[16px]

            -translate-y-1/2
            text-black/50
          "
        />

        {/* <Input
          type="search"
          placeholder="Search..."
          className="
            h-[36px]
            w-full

            rounded-[7px]
            border
            border-solid
            border-[#D1D1D6]

            bg-white

            pl-[36px]
            pr-[52px]

            text-[13px]
            leading-[18px]
            text-black

            shadow-[0_1px_2px_rgba(0,0,0,0.04)]

            placeholder:text-black/45

            focus-visible:border-black/30
            focus-visible:ring-1
            focus-visible:ring-black/10
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 400,
          }}
        /> */}
<Input
  type="search"
  placeholder="Search..."
  className="
    h-[36px]
    w-full
    rounded-[7px]

    border
    border-[#D1D1D6]
    bg-white

    pl-[36px]
    pr-[52px]

    text-[14px]
    leading-[20px]
    font-normal

    placeholder:text-muted-foreground

    shadow-[0_1px_2px_rgba(0,0,0,0.04)]
  "
/>
        <span
          className="
            pointer-events-none

            absolute
            right-[6px]
            top-1/2

            flex
            h-[26px]
            min-w-[34px]

            -translate-y-1/2
            items-center
            justify-center

            rounded-[5px]
            bg-[#E9E9EC]

            px-[6px]

            text-[11px]
            leading-none
            text-black/70
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 500,
          }}
        >
          ⌘ K
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div className="ml-auto flex items-center gap-[4px]">
        {/* GET PRO */}
        <button
          type="button"
          className="
            hidden

            rounded-[6px]
            px-[8px]
            py-[6px]

            text-[12px]
            leading-[18px]
            text-[#A855F7]

            transition-colors
            hover:bg-purple-50

            min-[800px]:block
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 500,
          }}
        >
          Get Pro
        </button>

        {/* NOTIFICATION */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="
            relative
            h-[32px]
            w-[32px]
            rounded-[6px]
          "
          aria-label="Notifications"
        >
          <Bell className="h-[15px] w-[15px]" />

          <span
            className="
              absolute
              right-[6px]
              top-[5px]

              h-[5px]
              w-[5px]

              rounded-full
              bg-red-500
            "
          />
        </Button>

        {/* THEME */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="
            hidden
            h-[32px]
            w-[32px]
            rounded-[6px]

            min-[600px]:inline-flex
          "
          aria-label="Toggle theme"
        >
          <Moon className="h-[15px] w-[15px]" />
        </Button>

        {/* APPEARANCE */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="
            hidden
            h-[32px]
            w-[32px]
            rounded-[6px]

            min-[800px]:inline-flex
          "
          aria-label="Appearance"
        >
          <Palette className="h-[15px] w-[15px]" />
        </Button>

        <Separator
          orientation="vertical"
          className="
            mx-[4px]
            hidden
            h-[20px]

            min-[800px]:block
          "
        />

        {/* AVATAR ONLY */}
        <button
          type="button"
          className="
            flex
            h-[34px]
            w-[34px]
            items-center
            justify-center

            rounded-full

            transition-opacity
            hover:opacity-80
          "
          aria-label="Admin account"
        >
          <Avatar className="h-[30px] w-[30px]">
            <AvatarFallback
              className="
                bg-black
                text-[10px]
                leading-none
                text-white
              "
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 500,
              }}
            >
              AD
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    </header>
  );
}