// import Image from "next/image";
// import Link from "next/link";

// /* =========================================================
//    FIGMA FOUR-POINT STAR
// ========================================================= */

// function Star({ className = "" }: { className?: string }) {
//   return (
//     <svg
//       viewBox="0 0 100 100"
//       aria-hidden="true"
//       className={className}
//     >
//       <path
//         d="
//           M50 0
//           C53 31 69 47 100 50
//           C69 53 53 69 50 100
//           C47 69 31 53 0 50
//           C31 47 47 31 50 0
//           Z
//         "
//         fill="currentColor"
//       />
//     </svg>
//   );
// }

// /* =========================================================
//    HERO SECTION
// ========================================================= */

// export default function HeroSection() {
//   return (
//     <section
//       className="
//         relative
//         h-[853px]
//         w-full
//         overflow-hidden
//         bg-[#F2F0F1]

//         min-[800px]:h-[663px]
//       "
//     >
//       <div className="relative mx-auto h-full w-full max-w-[1440px]">
//         {/* ===================================================
//             DESKTOP HERO IMAGE

//             Figma:
//             1440 x 663
//         ==================================================== */}

//         <Image
//           src="/images/home/hero-desktop.png"
//           alt=""
//           fill
//           priority
//           sizes="1440px"
//           className="
//             pointer-events-none
//             absolute
//             inset-0
//             z-0
//             hidden
//             h-full
//             w-full
//             object-cover

//             min-[800px]:block
//           "
//         />

//         {/* ===========================================
//         {/* ===================================================
//     MOBILE HERO IMAGE
//     EXACT FIGMA RECTANGLE 2
//     390 × 448
// =================================================== */}

// <div
//   className="
//     absolute
//     bottom-0
//     left-1/2
//     z-[1]
//     h-[448px]
//     w-[390px]
//     -translate-x-1/2
//     overflow-hidden

//     min-[800px]:hidden
//   "
// >
//   <Image
//     src="/images/home/image.png"
//     alt=""
//     width={390}
//     height={448}
//     priority
//     sizes="390px"
//     className="
//       block
//       h-[448px]
//       w-[390px]
//       max-w-none
//     "
//   />
// </div>
//         {/* ===================================================
//             HEADING
//         ==================================================== */}

//         <h1
//           className="
//             absolute
//             top-[40px]
//             left-[16px]
//             z-20
//             m-0
//             w-[315px]

//             text-[36px]
//             leading-[34px]
//             tracking-[-1px]
//             text-black

//             min-[800px]:top-[103px]
//             min-[800px]:left-[100px]
//             min-[800px]:h-[173px]
//             min-[800px]:w-[577px]
//             min-[800px]:text-[64px]
//             min-[800px]:leading-[64px]
//             min-[800px]:tracking-[0]
//           "
//           style={{
//             fontFamily: '"Arial Black", Arial, sans-serif',
//             fontWeight: 900,
//           }}
//         >
//           FIND CLOTHES THAT MATCHES YOUR STYLE
//         </h1>

//         {/* ===================================================
//             DESCRIPTION
//         ==================================================== */}

//         <p
//           className="
//             absolute
//             top-[153px]
//             left-[16px]
//             z-20
//             m-0
//             w-[358px]

//             text-[14px]
//             leading-[20px]
//             tracking-[0]
//             text-black/60

//             min-[800px]:top-[308px]
//             min-[800px]:left-[100px]
//             min-[800px]:h-[33px]
//             min-[800px]:w-[545px]
//             min-[800px]:text-[16px]
//             min-[800px]:leading-[22px]
//           "
//           style={{
//             fontFamily: "var(--font-satoshi)",
//             fontWeight: 400,
//           }}
//         >
//           Browse through our diverse range of meticulously crafted garments,
//           designed to bring out your individuality and cater to your sense of
//           style.
//         </p>

//         {/* ===================================================
//             SHOP NOW

//             DESKTOP FIGMA:
//             width: 210
//             height: 52
//             left: 100
//             page top: 507

//             Hero starts at 134:
//             507 - 134 = 373

//             Padding:
//             16px 54px

//             Radius:
//             62px
//         ==================================================== */}

//       {/* ===================================================
//     SHOP NOW BUTTON
// =================================================== */}

// <Link
//   href="/category"
//   className="
//     absolute
//     top-[227px]
//     left-[16px]
//     z-30

//     flex
//     h-[52px]
//     w-[358px]
//     items-center
//     justify-center

//     rounded-[62px]
//     bg-[#000000]

//     min-[800px]:top-[373px]
//     min-[800px]:left-[100px]
//     min-[800px]:w-[210px]
//   "
// >
//   <span
//     className="
//       flex
//       h-[22px]
//       w-[75px]
//       items-center
//       justify-center
//       whitespace-nowrap
//       text-[16px]
//       leading-[22px]
//       text-[#FFFFFF]
//     "
//     style={{
//       fontFamily: "var(--font-satoshi)",
//       fontWeight: 500,
//     }}
//   >
//     Shop Now
//   </span>
// </Link>
//         {/* ===================================================
//             MOBILE STATS
//         ==================================================== */}

//         <div
//           className="
//             absolute
//             top-[299px]
//             left-1/2
//             z-20

//             flex
//             w-[278px]
//             -translate-x-1/2
//             flex-wrap
//             justify-center

//             min-[800px]:hidden
//           "
//         >
//           {/* FIRST ROW */}

//           <div className="flex w-full items-start justify-between">
//             {/* 200+ */}

//             <div className="flex w-[106px] flex-col items-start">
//               <span
//                 className="
//                   text-[24px]
//                   leading-[32px]
//                   text-black
//                 "
//                 style={{
//                   fontFamily: "var(--font-satoshi)",
//                   fontWeight: 700,
//                 }}
//               >
//                 200+
//               </span>

//               <span
//                 className="
//                   whitespace-nowrap
//                   text-[12px]
//                   leading-[22px]
//                   text-black/60
//                 "
//                 style={{
//                   fontFamily: "var(--font-satoshi)",
//                   fontWeight: 400,
//                 }}
//               >
//                 International Brands
//               </span>
//             </div>

//             {/* DIVIDER */}

//             <div className="h-[52px] w-px bg-black/10" />

//             {/* 2,000+ */}

//             <div className="flex w-[117px] flex-col items-start">
//               <span
//                 className="
//                   text-[24px]
//                   leading-[32px]
//                   text-black
//                 "
//                 style={{
//                   fontFamily: "var(--font-satoshi)",
//                   fontWeight: 700,
//                 }}
//               >
//                 2,000+
//               </span>

//               <span
//                 className="
//                   whitespace-nowrap
//                   text-[12px]
//                   leading-[22px]
//                   text-black/60
//                 "
//                 style={{
//                   fontFamily: "var(--font-satoshi)",
//                   fontWeight: 400,
//                 }}
//               >
//                 High-Quality Products
//               </span>
//             </div>
//           </div>

//           {/* SECOND ROW */}

//           <div className="mt-[4px] flex w-[103px] flex-col items-start">
//             <span
//               className="
//                 whitespace-nowrap
//                 text-[24px]
//                 leading-[32px]
//                 text-black
//               "
//               style={{
//                 fontFamily: "var(--font-satoshi)",
//                 fontWeight: 700,
//               }}
//             >
//               30,000+
//             </span>

//             <span
//               className="
//                 whitespace-nowrap
//                 text-[12px]
//                 leading-[22px]
//                 text-black/60
//               "
//               style={{
//                 fontFamily: "var(--font-satoshi)",
//                 fontWeight: 400,
//               }}
//             >
//               Happy Customers
//             </span>
//           </div>
//         </div>

//         {/* ===================================================
//             DESKTOP STATS

//             Figma:
//             width: 596
//             height: 74
//             left: 100
//             page top: 607

//             607 - 134 = 473
//             gap: 32
//         ==================================================== */}

//         <div
//           className="
//             absolute
//             top-[473px]
//             left-[100px]
//             z-20

//             hidden
//             h-[74px]
//             w-[596px]
//             items-center
//             gap-[32px]

//             min-[800px]:flex
//           "
//         >
//           {/* 200+ */}

//           <div className="flex h-[74px] w-[141px] flex-col">
//             <span
//               className="
//                 flex
//                 items-center
//                 text-[40px]
//                 leading-[54px]
//                 text-black
//               "
//               style={{
//                 fontFamily: "var(--font-satoshi)",
//                 fontWeight: 700,
//               }}
//             >
//               200+
//             </span>

//             <span
//               className="
//                 whitespace-nowrap
//                 text-[16px]
//                 leading-[22px]
//                 text-black/60
//               "
//               style={{
//                 fontFamily: "var(--font-satoshi)",
//                 fontWeight: 400,
//               }}
//             >
//               International Brands
//             </span>
//           </div>

//           {/* DIVIDER */}

//           <div className="h-[74px] w-px shrink-0 bg-black/10" />

//           {/* 2,000+ */}

//           <div className="flex h-[74px] w-[156px] flex-col">
//             <span
//               className="
//                 flex
//                 items-center
//                 text-[40px]
//                 leading-[54px]
//                 text-black
//               "
//               style={{
//                 fontFamily: "var(--font-satoshi)",
//                 fontWeight: 700,
//               }}
//             >
//               2,000+
//             </span>

//             <span
//               className="
//                 whitespace-nowrap
//                 text-[16px]
//                 leading-[22px]
//                 text-black/60
//               "
//               style={{
//                 fontFamily: "var(--font-satoshi)",
//                 fontWeight: 400,
//               }}
//             >
//               High-Quality Products
//             </span>
//           </div>

//           {/* DIVIDER */}

//           <div className="h-[74px] w-px shrink-0 bg-black/10" />

//           {/* 30,000+ */}

//           <div className="flex h-[74px] w-[171px] flex-col">
//             <span
//               className="
//                 flex
//                 items-center
//                 whitespace-nowrap
//                 text-[40px]
//                 leading-[54px]
//                 text-black
//               "
//               style={{
//                 fontFamily: "var(--font-satoshi)",
//                 fontWeight: 700,
//               }}
//             >
//               30,000+
//             </span>

//             <span
//               className="
//                 whitespace-nowrap
//                 text-[16px]
//                 leading-[22px]
//                 text-black/60
//               "
//               style={{
//                 fontFamily: "var(--font-satoshi)",
//                 fontWeight: 400,
//               }}
//             >
//               Happy Customers
//             </span>
//           </div>
//         </div>

//         {/* ===================================================
//             SMALL STAR

//             Desktop Figma:
//             56 x 56
//             x = 750
//             page y = 431

//             431 - 134 = 297
//         ==================================================== */}
// {/* SMALL STAR */}
// <Star
//   className="
//     absolute
//     top-[542px]
//     left-[27px]
//     z-20
//     h-[44px]
//     w-[44px]
//     text-black

//     min-[800px]:top-[297px]
//     min-[800px]:left-[750px]
//     min-[800px]:h-[56px]
//     min-[800px]:w-[56px]
//   "
// />
//         {/* ===================================================
//             LARGE STAR

//             Desktop Figma:
//             104 x 104
//             x = 1255
//             page y = 220

//             220 - 134 = 86
//         ==================================================== */}
// <Star
//   className="
//     absolute
//     top-[445px]
//     right-[20px]
//     z-20
//     h-[76px]
//     w-[76px]
//     text-black

//     min-[800px]:top-[86px]
//     min-[800px]:right-[81px]
//     min-[800px]:h-[104px]
//     min-[800px]:w-[104px]
//   "
// />
//       </div>
//     </section>
//   );
// }



import Image from "next/image";
import Link from "next/link";

function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
    >
      <path
        d="
          M50 0
          C53 31 69 47 100 50
          C69 53 53 69 50 100
          C47 69 31 53 0 50
          C31 47 47 31 50 0
          Z
        "
        fill="currentColor"
      />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      className="
        relative
        h-[853px]
        w-full
        overflow-hidden
        bg-[#F2F0F1]

        min-[800px]:h-[720px]
        min-[1200px]:h-[663px]
        min-[1920px]:h-[663px]
      "
    >
      <div className="relative mx-auto h-full w-full max-w-[1440px]">
        {/* ===================================================
            MOBILE IMAGE
            0px - 799px
        ==================================================== */}

      {/* ===================================================
    MOBILE IMAGE
    0px - 799px
=================================================== */}

<div
  className="
    absolute
    bottom-0
    left-1/2
    z-[1]
    h-[448px]
    w-[390px]
    -translate-x-1/2
    overflow-hidden

    min-[800px]:hidden
  "
>
  <Image
    src="/images/home/image.png"
    alt=""
    width={390}
    height={448}
    priority
    sizes="390px"
    className="
      block
      h-[448px]
      w-[390px]
      max-w-none
    "
  />
</div>

{/* ===================================================
    TABLET IMAGE
    800px - 1919px
=================================================== */}

<div
  className="
    absolute
    right-0
    bottom-0
    z-[1]
    hidden

    min-[800px]:block
    min-[800px]:h-[520px]
    min-[800px]:w-[52%]

    min-[1200px]:h-[600px]
    min-[1200px]:w-[50%]

    min-[1920px]:hidden
  "
>
  <Image
    src="/images/home/image.png"
    alt=""
    fill
    priority
    sizes="50vw"
    className="
      object-contain
      object-right-bottom
    "
  />
</div>

{/* ===================================================
    DESKTOP IMAGE
    1920px+
=================================================== */}

<div
  className="
    absolute
    inset-0
    z-0
    hidden

    min-[1920px]:block
  "
>
  <Image
    src="/images/home/hero-desktop.png"
    alt=""
    fill
    priority
    sizes="1440px"
    className="
      object-cover
    "
  />
</div>

        {/* ===================================================
            HEADING
        ==================================================== */}

        <h1
          className="
            absolute
            top-[40px]
            left-[16px]
            z-20
            m-0
            w-[315px]

            text-[36px]
            leading-[34px]
            tracking-[-1px]
            text-black

            min-[800px]:top-[70px]
            min-[800px]:left-[40px]
            min-[800px]:w-[470px]
            min-[800px]:text-[48px]
            min-[800px]:leading-[48px]

            min-[1200px]:top-[85px]
            min-[1200px]:left-[70px]
            min-[1200px]:w-[540px]
            min-[1200px]:text-[56px]
            min-[1200px]:leading-[56px]

            min-[1920px]:top-[103px]
            min-[1920px]:left-[100px]
            min-[1920px]:h-[173px]
            min-[1920px]:w-[577px]
            min-[1920px]:text-[64px]
            min-[1920px]:leading-[64px]
            min-[1920px]:tracking-[0]
          "
          style={{
            fontFamily: '"Arial Black", Arial, sans-serif',
            fontWeight: 900,
          }}
        >
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>

        {/* ===================================================
            DESCRIPTION
        ==================================================== */}

        <p
          className="
            absolute
            top-[153px]
            left-[16px]
            z-20
            m-0
            w-[358px]

            text-[14px]
            leading-[20px]
            tracking-[0]
            text-black/60

            min-[800px]:top-[235px]
            min-[800px]:left-[40px]
            min-[800px]:w-[450px]
            min-[800px]:text-[15px]
            min-[800px]:leading-[21px]

            min-[1200px]:top-[280px]
            min-[1200px]:left-[70px]
            min-[1200px]:w-[500px]

            min-[1920px]:top-[308px]
            min-[1920px]:left-[100px]
            min-[1920px]:h-[33px]
            min-[1920px]:w-[545px]
            min-[1920px]:text-[16px]
            min-[1920px]:leading-[22px]
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

        {/* ===================================================
            SHOP NOW BUTTON
        ==================================================== */}

        <Link
          href="/category"
          className="
            absolute
            top-[227px]
            left-[16px]
            z-30

            flex
            h-[52px]
            w-[358px]
            items-center
            justify-center

            rounded-[62px]
            bg-[#000000]

            min-[800px]:top-[310px]
            min-[800px]:left-[40px]
            min-[800px]:w-[210px]

            min-[1200px]:top-[350px]
            min-[1200px]:left-[70px]

            min-[1920px]:top-[373px]
            min-[1920px]:left-[100px]
          "
        >
          <span
            className="
              flex
              h-[22px]
              w-[75px]
              items-center
              justify-center
              whitespace-nowrap
              text-[16px]
              leading-[22px]
              text-[#FFFFFF]
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 500,
            }}
          >
            Shop Now
          </span>
        </Link>

        {/* ===================================================
            MOBILE STATS
        ==================================================== */}

        <div
          className="
            absolute
            top-[299px]
            left-1/2
            z-20
            flex
            w-[278px]
            -translate-x-1/2
            flex-wrap
            justify-center

            min-[800px]:hidden
          "
        >
          <div className="flex w-full items-start justify-between">
            <div className="flex w-[106px] flex-col items-start">
              <span
                className="text-[24px] leading-[32px] text-black"
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 700,
                }}
              >
                200+
              </span>

              <span
                className="whitespace-nowrap text-[12px] leading-[22px] text-black/60"
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 400,
                }}
              >
                International Brands
              </span>
            </div>

            <div className="h-[52px] w-px bg-black/10" />

            <div className="flex w-[117px] flex-col items-start">
              <span
                className="text-[24px] leading-[32px] text-black"
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 700,
                }}
              >
                2,000+
              </span>

              <span
                className="whitespace-nowrap text-[12px] leading-[22px] text-black/60"
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 400,
                }}
              >
                High-Quality Products
              </span>
            </div>
          </div>

          <div className="mt-[4px] flex w-[103px] flex-col items-start">
            <span
              className="whitespace-nowrap text-[24px] leading-[32px] text-black"
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 700,
              }}
            >
              30,000+
            </span>

            <span
              className="whitespace-nowrap text-[12px] leading-[22px] text-black/60"
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 400,
              }}
            >
              Happy Customers
            </span>
          </div>
        </div>

        {/* ===================================================
            TABLET + DESKTOP STATS
        ==================================================== */}

        <div
          className="
            absolute
            z-20
            hidden
            items-center

            min-[800px]:top-[400px]
            min-[800px]:left-[40px]
            min-[800px]:flex
            min-[800px]:gap-[18px]

            min-[1200px]:top-[440px]
            min-[1200px]:left-[70px]
            min-[1200px]:gap-[24px]

            min-[1920px]:top-[473px]
            min-[1920px]:left-[100px]
            min-[1920px]:h-[74px]
            min-[1920px]:w-[596px]
            min-[1920px]:gap-[32px]
          "
        >
          <div className="flex flex-col">
            <span
              className="
                text-[30px]
                leading-[42px]
                text-black

                min-[1200px]:text-[34px]
                min-[1200px]:leading-[46px]

                min-[1920px]:text-[40px]
                min-[1920px]:leading-[54px]
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
                text-[13px]
                leading-[20px]
                text-black/60

                min-[1200px]:text-[14px]

                min-[1920px]:text-[16px]
                min-[1920px]:leading-[22px]
              "
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 400,
              }}
            >
              International Brands
            </span>
          </div>

          <div className="h-[60px] w-px shrink-0 bg-black/10 min-[1920px]:h-[74px]" />

          <div className="flex flex-col">
            <span
              className="
                text-[30px]
                leading-[42px]
                text-black

                min-[1200px]:text-[34px]
                min-[1200px]:leading-[46px]

                min-[1920px]:text-[40px]
                min-[1920px]:leading-[54px]
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
                text-[13px]
                leading-[20px]
                text-black/60

                min-[1200px]:text-[14px]

                min-[1920px]:text-[16px]
                min-[1920px]:leading-[22px]
              "
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 400,
              }}
            >
              High-Quality Products
            </span>
          </div>

          <div className="h-[60px] w-px shrink-0 bg-black/10 min-[1920px]:h-[74px]" />

          <div className="flex flex-col">
            <span
              className="
                whitespace-nowrap
                text-[30px]
                leading-[42px]
                text-black

                min-[1200px]:text-[34px]
                min-[1200px]:leading-[46px]

                min-[1920px]:text-[40px]
                min-[1920px]:leading-[54px]
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
                text-[13px]
                leading-[20px]
                text-black/60

                min-[1200px]:text-[14px]

                min-[1920px]:text-[16px]
                min-[1920px]:leading-[22px]
              "
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 400,
              }}
            >
              Happy Customers
            </span>
          </div>
        </div>

        {/* ===================================================
            SMALL STAR
        ==================================================== */}

        <Star
          className="
            absolute
            top-[536px]
            left-[27px]
            z-20
            h-[44px]
            w-[44px]
            text-black

            min-[800px]:top-[360px]
            min-[800px]:left-[52%]
            min-[800px]:h-[46px]
            min-[800px]:w-[46px]

            min-[1200px]:top-[330px]
            min-[1200px]:h-[50px]
            min-[1200px]:w-[50px]

            min-[1920px]:top-[297px]
            min-[1920px]:left-[750px]
            min-[1920px]:h-[56px]
            min-[1920px]:w-[56px]
          "
        />

        {/* ===================================================
            LARGE STAR
        ==================================================== */}

        <Star
          className="
            absolute
            top-[438px]
            right-[20px]
            z-20
            h-[76px]
            w-[76px]
            text-black

            min-[800px]:top-[120px]
            min-[800px]:right-[40px]
            min-[800px]:h-[80px]
            min-[800px]:w-[80px]

            min-[1200px]:top-[105px]
            min-[1200px]:right-[55px]
            min-[1200px]:h-[90px]
            min-[1200px]:w-[90px]

            min-[1920px]:top-[86px]
            min-[1920px]:right-[81px]
            min-[1920px]:h-[104px]
            min-[1920px]:w-[104px]
          "
        />
      </div>
    </section>
  );
}