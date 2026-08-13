

// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import { Archivo_Black, Geist } from "next/font/google";

// import "./globals.css";

// import Header from "@/components/layout/header";
// import NewsletterSection from "@/components/layout/newsletter-section";
// import SiteFooter from "@/components/layout/site-footer";
// import { cn } from "@/lib/utils";

// const geist = Geist({subsets:['latin'],variable:'--font-sans'});

// const archivoBlack = Archivo_Black({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-archivo-black",
//   display: "swap",
// });

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
//     <html lang="en" className={cn("font-sans", geist.variable)}>
//       <body
//         className={`${satoshi.variable} ${archivoBlack.variable}`}
//       >
//         {/* COMMON HEADER / NAVBAR */}
//         <Header />

//         {/* CURRENT PAGE */}
//         {children}

//         {/* COMMON NEWSLETTER */}
//         <NewsletterSection />

//         {/* COMMON FOOTER */}
//         <SiteFooter />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Archivo_Black, Geist, Outfit } from "next/font/google";
import "./globals.css";

import SiteShell from "@/components/layout/site-shell";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

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
  description:
    "Find clothes that match your style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        geist.variable,
      )}
    >
     <body
  className={`${satoshi.variable} ${archivoBlack.variable} ${outfit.variable}`}
>
        <SiteShell>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}