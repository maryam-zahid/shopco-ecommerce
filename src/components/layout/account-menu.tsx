"use client";

import {
  LogOut,
  Package,
  ShieldCheck,
 
} from "lucide-react";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { logoutAction } from "@/actions/auth.actions";

function UserIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="12"
        cy="8.2"
        r="3.35"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M5.7 18.2C6.75 14.85 9 13.05 12 13.05C15 13.05 17.25 14.85 18.3 18.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AccountMenu() {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);

  const isLoggedIn =
    status === "authenticated" &&
    Boolean(session?.user?.id);

  const isAdmin =
    session?.user?.role === "ADMIN";

  if (status === "loading") {
    return (
      <div
        className="
          flex
          h-[24px]
          w-[24px]
          items-center
          justify-center
          text-black
        "
      >
        <UserIcon />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        aria-label="Login"
        className="
          flex
          h-[24px]
          w-[24px]
          items-center
          justify-center
          text-black
        "
      >
        <UserIcon />
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Account menu"
        aria-expanded={open}
        onClick={() =>
          setOpen((previous) => !previous)
        }
        className="
          flex
          h-[24px]
          w-[24px]
          items-center
          justify-center
          text-black
        "
      >
        <UserIcon />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-[36px]
            z-[200]
            w-[200px]
            overflow-hidden
            rounded-[10px]
            border
            border-black/10
            bg-white
            py-[6px]
            shadow-[0_12px_35px_rgba(0,0,0,0.14)]
          "
          style={{
            fontFamily: "var(--font-satoshi)",
          }}
        >
          <div
            className="
              border-b
              border-black/10
              px-[14px]
              py-[9px]
            "
          >
            <p
              className="
                truncate
                text-[12px]
                text-black/50
              "
            >
              {session?.user?.email}
            </p>
          </div>

  {!isAdmin && (
  <Link
    href="/account/orders"
    onClick={() => setOpen(false)}
    className="
      flex
      items-center
      gap-[10px]

      px-[14px]
      py-[10px]

      text-[14px]
      text-black

      no-underline

      hover:bg-[#F0F0F0]
    "
    style={{
      fontFamily: "var(--font-satoshi)",
    }}
  >
    <Package className="size-[17px] shrink-0" />

    <span>My Orders</span>
  </Link>
)}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="
                flex
                items-center
                gap-[10px]
                px-[14px]
                py-[10px]
                text-[14px]
                text-black
                hover:bg-[#F0F0F0]
              "
            >
              <ShieldCheck className="size-[17px]" />

              Admin Dashboard
            </Link>
          )}

          <form action={logoutAction}>
            <button
              type="submit"
              className="
                flex
                w-full
                items-center
                gap-[10px]
                px-[14px]
                py-[10px]
                text-left
                text-[14px]
                text-black
                hover:bg-[#F0F0F0]
              "
            >
              <LogOut className="size-[17px]" />

              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}