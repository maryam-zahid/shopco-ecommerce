// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";

// const satoshi = localFont({
//   src: [
//     {
//       path: "../fonts/Satoshi-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/Satoshi-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//   ],
//   variable: "--font-satoshi",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "SHOP.CO",
//   description: "Find clothes that match your style",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={satoshi.variable}>{children}</body>
//     </html>
//   );
// }
import NewsletterSection from "@/components/layout/newsletter-section";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteFooter from "@/components/layout/site-footer";
const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});


export const metadata: Metadata = {
  title: "SHOP.CO",
  description: "Find clothes that match your style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={satoshi.variable}>
        {children}
        <div className="relative">
  <NewsletterSection />

  <div
    className="
      absolute
      bottom-0
      left-0
      -z-10
      h-[50%]
      w-full
      bg-[#F0F0F0]
    "
  />
</div>

<SiteFooter />

      </body>
    </html>
  );
}