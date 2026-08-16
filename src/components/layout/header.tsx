"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import AccountMenu from "@/components/layout/account-menu";
/* =========================================================
   ICONS
========================================================= */

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 6H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 12H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 18H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4L16 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 4L4 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 6L8 10L12.5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6.75"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M16 16L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 3.5H4.2C4.75 3.5 5.23 3.87 5.37 4.4L8.05 14.05C8.2 14.58 8.68 14.95 9.23 14.95H18.1C18.65 14.95 19.14 14.57 19.28 14.04L21.25 6.75H6.05"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="9.4" cy="19" r="1.65" fill="currentColor" />
      <circle cx="18.1" cy="19" r="1.65" fill="currentColor" />
    </svg>
  );
}

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

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("q") ?? "").trim();

    if (!query) return;

    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }

  return (
    <header className="relative z-50 w-full bg-white">
      {/* =====================================================
          ANNOUNCEMENT BAR
      ====================================================== */}

      {announcementVisible && (
        <div
          className="
            relative
            flex
            h-[34px]
            w-full
            items-center
            justify-center
            bg-black
            min-[800px]:h-[38px]
          "
        >
          <p
            className="
              m-0
              whitespace-nowrap
              text-center
              text-[12px]
              leading-[12px]
              font-normal
              tracking-[0]
              text-white

              min-[800px]:text-[14px]
              min-[800px]:leading-[14px]
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 400,
            }}
          >
            Sign up and get 20% off to your first order.{" "}
            <Link
              href="/signup"
              className="underline"
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 500,
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                textDecorationThickness: "1px",
                textUnderlineOffset: "1px",
              }}
            >
              Sign Up Now
            </Link>
          </p>

          <button
            type="button"
            aria-label="Close announcement"
            onClick={() => setAnnouncementVisible(false)}
            className="
              absolute
              top-1/2
              right-[24px]
              hidden
              h-[20px]
              w-[20px]
              -translate-y-1/2
              items-center
              justify-center
              text-white

              min-[800px]:flex
              min-[1440px]:right-[100px]
            "
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      {/* <nav
        className="
          relative
          flex
          h-[64px]
          w-full
          items-center
          bg-white

          min-[800px]:h-[96px]
        "
      > */}
      <nav
  className="
    relative
    flex
    h-[64px]
    w-full
    items-center
    bg-white

    min-[800px]:h-[72px]
  "
>
   <div
  className="
    mx-auto
    flex
    w-full
    items-center
    px-[16px]

    min-[800px]:px-[32px]
    min-[800px]:gap-[18px]

    min-[1200px]:px-[56px]
    min-[1200px]:gap-[28px]

    min-[1440px]:max-w-[1440px]
    min-[1440px]:px-[72px]
    min-[1440px]:gap-[40px]
  "
>
          {/* =================================================
              MOBILE HAMBURGER
          ================================================== */}

          <button
            type="button"
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            onClick={() => {
              setMobileMenuOpen((previous) => !previous);
              setMobileSearchOpen(false);
            }}
            // className="
            //   flex
            //   h-[24px]
            //   w-[24px]
            //   shrink-0
            //   items-center
            //   justify-center
            //   text-black

            //   min-[800px]:hidden
            // "
            className="
  mr-[20px]
  flex
  h-[24px]
  w-[24px]
  shrink-0
  items-center
  justify-center
  text-black

  min-[800px]:mr-0
  min-[800px]:hidden
"
          >
            {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon />}
          </button>

          {/* =================================================
              SHOP.CO LOGO
          ================================================== */}

          <Link
            href="/"
            aria-label="SHOP.CO homepage"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/icons/logo.svg"
              alt="SHOP.CO"
              width={160}
              height={22}
              priority
              className="
                h-[18px]
                w-[126px]
                shrink-0

                min-[800px]:h-[20px]
                min-[800px]:w-[145px]

                min-[1200px]:h-[22px]
                min-[1200px]:w-[160px]
              "
            />
          </Link>

          {/* =================================================
              DESKTOP NAV LINKS
          ================================================== */}

          <div
            className="
              hidden
              h-[22px]
              shrink-0
              items-center
              text-[16px]
              leading-[16px]
              tracking-[0]
              text-black

              min-[800px]:flex
              min-[800px]:gap-[14px]

              min-[1000px]:gap-[18px]

              min-[1200px]:gap-[22px]

              min-[1440px]:gap-[24px]
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 400,
            }}
          >
            {/* SHOP */}

            <div className="relative flex h-[22px] items-center">
              <button
                type="button"
                aria-expanded={shopOpen}
                onClick={() => setShopOpen((previous) => !previous)}
                className="
                  flex
                  h-[22px]
                  items-center
                  gap-[4px]
                  whitespace-nowrap
                  text-[16px]
                  leading-[16px]
                  tracking-[0]
                  text-black
                "
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 400,
                }}
              >
                <span>Shop</span>

                <span
                  className={`
                    flex
                    h-[16px]
                    w-[16px]
                    items-center
                    justify-center
                    transition-transform
                    duration-150
                    ${shopOpen ? "rotate-180" : ""}
                  `}
                >
                  <ChevronDownIcon />
                </span>
              </button>

              {shopOpen && (
                <div
                  className="
                    absolute
                    top-[32px]
                    left-0
                    z-[100]
                    w-[170px]
                    overflow-hidden
                    rounded-[8px]
                    border
                    border-black/10
                    bg-white
                    py-[6px]
                    shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                  "
                >
                  <Link
                    href="/category/men"
                    className="block px-[16px] py-[10px] hover:bg-[#F0F0F0]"
                  >
                    Men
                  </Link>

                  <Link
                    href="/category/women"
                    className="block px-[16px] py-[10px] hover:bg-[#F0F0F0]"
                  >
                    Women
                  </Link>

                  <Link
                    href="/category/casual"
                    className="block px-[16px] py-[10px] hover:bg-[#F0F0F0]"
                  >
                    Casual
                  </Link>

                  <Link
                    href="/category/formal"
                    className="block px-[16px] py-[10px] hover:bg-[#F0F0F0]"
                  >
                    Formal
                  </Link>
                </div>
              )}
            </div>

            {/* ON SALE */}

            <Link
              href="/#on-sale"
              className="
                flex
                h-[22px]
                items-center
                whitespace-nowrap
                text-[16px]
                leading-[16px]
              "
            >
              On Sale
            </Link>

            {/* NEW ARRIVALS */}

            <Link
              href="/#new-arrivals"
              className="
                flex
                h-[22px]
                w-[87px]
                items-center
                whitespace-nowrap
                text-[16px]
                leading-[16px]
              "
            >
              New Arrivals
            </Link>

            {/* BRANDS */}

            <Link
              href="/#brands"
              className="
                flex
                h-[22px]
                w-[49px]
                items-center
                whitespace-nowrap
                text-[16px]
                leading-[16px]
              "
            >
              Brands
            </Link>
          </div>

          {/* =================================================
              DESKTOP SEARCH
          ================================================== */}

          <form
            onSubmit={handleSearch}
            className="
              hidden
              h-[48px]
              min-w-0
              max-w-[577px]
              flex-1
              items-center
              gap-[12px]
              rounded-[62px]
              bg-[#F0F0F0]
              px-[16px]

              min-[800px]:flex
            "
          >
            <button
              type="submit"
              aria-label="Search products"
              className="
                flex
                h-[24px]
                w-[24px]
                shrink-0
                items-center
                justify-center
                text-black/40
              "
            >
              <SearchIcon />
            </button>

            <input
              name="q"
              type="search"
              placeholder="Search for products..."
              aria-label="Search for products"
              autoComplete="off"
              className="
                h-full
                min-w-0
                flex-1
                bg-transparent
                p-0
                text-[16px]
                leading-[16px]
                tracking-[0]
                text-black
                outline-none
                placeholder:text-black/40
              "
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 400,
              }}
            />
          </form>

          {/* =================================================
              RIGHT ICONS
          ================================================== */}

          <div
            className="
              ml-auto
              flex
              h-[24px]
              shrink-0
              items-center
              gap-[12px]

              min-[800px]:ml-0
              min-[800px]:gap-[14px]
            "
          >
            {/* MOBILE SEARCH */}

            <button
              type="button"
              aria-label="Open search"
              aria-expanded={mobileSearchOpen}
              onClick={() => {
                setMobileSearchOpen((previous) => !previous);
                setMobileMenuOpen(false);
              }}
              className="
                flex
                h-[24px]
                w-[24px]
                items-center
                justify-center
                text-black

                min-[800px]:hidden
              "
            >
              <SearchIcon />
            </button>

            {/* CART */}

        <Link
  href="/cart"
  aria-label="Open cart"
  className="
    flex
    items-center
    justify-center
    text-black
    no-underline
  "
>
  <CartIcon />
</Link>
            {/* USER */}

          {/* USER / AUTH */}

<AccountMenu />
          </div>
        </div>
      </nav>

      {/* =====================================================
          MOBILE SEARCH PANEL
      ====================================================== */}

      {mobileSearchOpen && (
        <div
          className="
            border-t
            border-black/10
            bg-white
            px-[16px]
            py-[12px]

            min-[800px]:hidden
          "
        >
          <form
            onSubmit={handleSearch}
            className="
              flex
              h-[48px]
              w-full
              items-center
              gap-[12px]
              rounded-[62px]
              bg-[#F0F0F0]
              px-[16px]
            "
          >
            <button
              type="submit"
              aria-label="Search products"
              className="
                flex
                h-[24px]
                w-[24px]
                shrink-0
                items-center
                justify-center
                text-black/40
              "
            >
              <SearchIcon />
            </button>

            <input
              name="q"
              type="search"
              placeholder="Search for products..."
              aria-label="Search for products"
              autoComplete="off"
              autoFocus
              className="
                min-w-0
                flex-1
                bg-transparent
                p-0
                text-[14px]
                leading-[14px]
                tracking-[0]
                text-black
                outline-none
                placeholder:text-black/40
              "
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 400,
              }}
            />
          </form>
        </div>
      )}

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      {mobileMenuOpen && (
        <div
          className="
            absolute
            top-full
            left-0
            z-[100]
            w-full
            border-t
            border-black/10
            bg-white
            shadow-[0_10px_30px_rgba(0,0,0,0.10)]

            min-[800px]:hidden
          "
        >
          <div
            className="px-[16px] py-[4px]"
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 400,
            }}
          >
            <Link
              href="/category"
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex
                h-[52px]
                items-center
                justify-between
                border-b
                border-black/10
                text-[16px]
                leading-[16px]
              "
            >
              <span>Shop</span>
              <ChevronDownIcon />
            </Link>

            <Link
              href="/#on-sale"
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex
                h-[52px]
                items-center
                border-b
                border-black/10
                text-[16px]
                leading-[16px]
              "
            >
              On Sale
            </Link>

            <Link
              href="/#new-arrivals"
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex
                h-[52px]
                items-center
                border-b
                border-black/10
                text-[16px]
                leading-[16px]
              "
            >
              New Arrivals
            </Link>

            <Link
              href="/#brands"
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex
                h-[52px]
                items-center
                text-[16px]
                leading-[16px]
              "
            >
              Brands
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}