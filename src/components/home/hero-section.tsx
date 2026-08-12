import Image from "next/image";
import Link from "next/link";
import BrandStrip from "@/components/home/brand-strip";
export default function HeroSection() {
  return (
     <>
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F2F0F1]

        min-[1200px]:h-[663px]
      "
    >
      {/* =========================
          DESKTOP BACKGROUND IMAGE
         ========================= */}
      <div
        className="
          absolute
          inset-0
          hidden

          min-[1200px]:block
        "
      >
        <Image
          src="/images/home/hero-desktop.png"
          alt="Fashionable couple wearing modern clothing"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />
      </div>

      {/* =========================
          DESKTOP CONTENT
         ========================= */}
      <div
        className="
          relative
          z-10
          mx-auto
          hidden
          h-full
          w-full
          max-w-[1440px]

          min-[1200px]:block
        "
      >
        {/* HEADING */}
        <h1
          className="
            absolute
            left-[100px]
            top-[96px]

            m-0
            w-[577px]

            text-[64px]
            leading-[64px]
            tracking-[-0.02em]
            text-black
          "
          style={{
            fontFamily: "var(--font-archivo-black)",
            fontWeight: 400,
          }}
        >
          FIND CLOTHES
          <br />
          THAT MATCHES
          <br />
          YOUR STYLE
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            absolute
            left-[100px]
            top-[304px]

            m-0
            w-[545px]

            text-[16px]
            leading-[22px]
            text-black/60
          "
          style={{
            fontFamily: "var(--font-satoshi)",
            fontWeight: 400,
          }}
        >
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>

       {/* <Link
  href="/category/casual"
  className="
    absolute
    left-[100px]
    top-[373px]

    !flex
    !h-[52px]
    !w-[210px]
    shrink-0

    !items-center
    !justify-center

    !rounded-[62px]
    !border-0
    !bg-black

    !p-0
    no-underline

    text-[16px]
    leading-[22px]
    !text-white
  "
  style={{
    fontFamily: "var(--font-satoshi)",
    fontWeight: 500,
    color: "#FFFFFF",
    backgroundColor: "#000000",
    borderRadius: "62px",
  }}
>
  <span
    className="
      block
      whitespace-nowrap
      !text-white
    "
    style={{
      fontFamily: "var(--font-satoshi)",
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "22px",
      color: "#FFFFFF",
    }}
  >
    Shop Now
  </span>
</Link> */}

<Link
  href="/category/casual"
  className="
    hero-shop-now
    absolute
    left-[100px]
    top-[373px]
    z-20

    flex
    h-[52px]
    w-[210px]
    items-center
    justify-center

    rounded-[62px]
    bg-black
    p-0
    no-underline
  "
>
  <span>Shop Now</span>
</Link>
        {/* =========================
            STATS
           ========================= */}
        <div
          className="
            absolute
            left-[100px]
            top-[471px]

            flex
            h-[74px]
            items-center
            gap-[32px]
          "
        >
          <Stat
            number="200+"
            label="International Brands"
            width="141px"
          />

          <div className="h-[74px] w-px bg-black/10" />

          <Stat
            number="2,000+"
            label="High-Quality Products"
            width="156px"
          />

          <div className="h-[74px] w-px bg-black/10" />

          <Stat
            number="30,000+"
            label="Happy Customers"
            width="171px"
          />
        </div>

        {/* =========================
            DECORATIVE STARS
           ========================= */}

        {/* SMALL STAR */}
        <div
          className="
            absolute
            left-[750px]
            top-[297px]

            h-[56px]
            w-[56px]
          "
          aria-hidden="true"
        >
          <StarIcon />
        </div>

        {/* LARGE STAR */}
        <div
          className="
            absolute
            right-[81px]
            top-[57px]

            h-[104px]
            w-[104px]
          "
          aria-hidden="true"
        >
          <StarIcon />
        </div>
      </div>

     {/* =================================================
    MOBILE — 0px to 799px
    Figma hero: 390px × 853px
================================================== */}

<div
  className="
    relative
    mx-auto
    h-[853px]
    w-full
    max-w-[390px]

    min-[800px]:hidden
  "
>
  {/* =================================================
      MOBILE HEADING
      Figma:
      left: 16px
      top inside hero: 40px
      315 × 93
  ================================================== */}

  <h1
    className="
      absolute
      left-[16px]
      top-[40px]

      m-0
      w-[315px]

      text-[36px]
      leading-[34px]
      tracking-[0px]
      text-black
    "
    style={{
      fontFamily: "var(--font-archivo-black)",
      fontWeight: 400,
    }}
  >
    FIND CLOTHES
    <br />
    THAT MATCHES
    <br />
    YOUR STYLE
  </h1>

  {/* =================================================
      MOBILE DESCRIPTION
      Figma:
      left: 16px
      top inside hero: 153px
      358 × 50
  ================================================== */}

  <p
    className="
      absolute
      left-[16px]
      top-[153px]

      m-0
      w-[358px]

      text-[14px]
      leading-[20px]
      tracking-[0px]
      text-black/60
    "
    style={{
      fontFamily: "var(--font-satoshi)",
      fontWeight: 400,
    }}
  >
    Browse through our diverse range of meticulously crafted garments,
    designed to bring out your individuality and cater to your sense of
    style.
  </p>

  {/* =================================================
      MOBILE SHOP NOW
      Figma:
      left: 16px
      top inside hero: 227px
      358 × 52
  ================================================== */}

  <Link
    href="/category/casual"
    className="
      absolute
      left-[16px]
      top-[227px]
      z-20

      flex
      h-[52px]
      w-[358px]
      items-center
      justify-center

      rounded-[62px]
      bg-black
      no-underline
    "
    style={{
      backgroundColor: "#000000",
      textDecoration: "none",
    }}
  >
    <span
      style={{
        fontFamily: "var(--font-satoshi)",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "22px",
        color: "#FFFFFF",
      }}
    >
      Shop Now
    </span>
  </Link>

  {/* =================================================
      FIRST STATS ROW
      Figma top inside hero: 299px
  ================================================== */}

  <div
    className="
      absolute
      left-1/2
      top-[299px]

      flex
      h-[52px]
      w-[278px]
      -translate-x-1/2
      items-center
      justify-between
    "
  >
    {/* 200+ */}
    <div
      className="
        flex
        h-[48px]
        w-[106px]
        flex-col
        items-start
      "
    >
      <span
        className="
          h-[32px]
          whitespace-nowrap

          text-[24px]
          leading-[32px]
          text-black
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 700,
        }}
      >
        200+
      </span>

      <span
        className="
          whitespace-nowrap
          text-[12px]
          leading-[22px]
          text-black/60
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 400,
        }}
      >
        International Brands
      </span>
    </div>

    {/* VERTICAL DIVIDER */}
    <div className="h-[52px] w-px shrink-0 bg-black/10" />

    {/* 2,000+ */}
    <div
      className="
        flex
        h-[48px]
        w-[117px]
        flex-col
        items-start
      "
    >
      <span
        className="
          h-[32px]
          whitespace-nowrap

          text-[24px]
          leading-[32px]
          text-black
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 700,
        }}
      >
        2,000+
      </span>

      <span
        className="
          whitespace-nowrap
          text-[12px]
          leading-[22px]
          text-black/60
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 400,
        }}
      >
        High-Quality Products
      </span>
    </div>
  </div>

  {/* =================================================
      30,000+
      Figma top inside hero: 363px
  ================================================== */}

  <div
    className="
      absolute
      left-1/2
      top-[363px]

      flex
      h-[48px]
      w-[103px]
      -translate-x-1/2
      flex-col
      items-start
    "
  >
    <span
      className="
        h-[32px]
        whitespace-nowrap

        text-[24px]
        leading-[32px]
        text-black
      "
      style={{
        fontFamily: "var(--font-satoshi)",
        fontWeight: 700,
      }}
    >
      30,000+
    </span>

    <span
      className="
        whitespace-nowrap
        text-[12px]
        leading-[22px]
        text-black/60
      "
      style={{
        fontFamily: "var(--font-satoshi)",
        fontWeight: 400,
      }}
    >
      Happy Customers
    </span>
  </div>

  {/* =================================================
      MOBILE HERO IMAGE
      Figma:
      top inside hero: 405px
      width: 390px
      height: 448px
  ================================================== */}

  <div
    className="
      absolute
      left-0
      top-[405px]

      h-[448px]
      w-[390px]
      overflow-hidden

      bg-[#F2F0F1]
    "
  >
    <Image
      src="/images/home/hero-mobile.png"
      alt="Fashionable couple wearing modern clothing"
      fill
      priority
      sizes="390px"
      className="
        object-cover
        object-center
      "
    />

    {/* SMALL STAR */}
    <div
      className="
        absolute
        left-[27px]
        top-[177px]

        h-[44px]
        w-[44px]
      "
      aria-hidden="true"
    >
      <StarIcon />
    </div>

    {/* LARGE STAR */}
    <div
      className="
        absolute
        right-[21px]
        top-[100px]

        h-[76px]
        w-[76px]
      "
      aria-hidden="true"
    >
      <StarIcon />
    </div>
  </div>
</div>
    </section>
      {/* =====================================================
          BRAND STRIP
          Existing separate reusable component
      ====================================================== */}

      <BrandStrip />
      </>
  );
}

function Stat({
  number,
  label,
  width,
}: {
  number: string;
  label: string;
  width: string;
}) {
  return (
    <div
      className="
        flex
        h-[74px]
        shrink-0
        flex-col
        items-start
        justify-center
      "
      style={{ width }}
    >
      <span
        className="
          whitespace-nowrap
          text-[40px]
          leading-[54px]
          text-black
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 700,
        }}
      >
        {number}
      </span>

      <span
        className="
          -mt-[2px]
          whitespace-nowrap

          text-[16px]
          leading-[22px]
          text-black/60
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 400,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function MobileStat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div
      className="
        flex
        min-w-[150px]
        flex-col
        items-center
        px-[8px]

        min-[800px]:items-start
      "
    >
      <span
        className="
          text-[24px]
          leading-[32px]
          text-black

          min-[800px]:text-[32px]
          min-[800px]:leading-[40px]
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 700,
        }}
      >
        {number}
      </span>

      <span
        className="
          whitespace-nowrap
          text-[12px]
          leading-[18px]
          text-black/60

          min-[800px]:text-[14px]
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 400,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 104 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <path
        d="
          M52 0
          C55 31 73 49 104 52
          C73 55 55 73 52 104
          C49 73 31 55 0 52
          C31 49 49 31 52 0
          Z
        "
        fill="black"
      />
    </svg>
  );
}