// "use client";

// import { usePathname } from "next/navigation";

// import Header from "@/components/layout/header";
// import NewsletterSection from "@/components/layout/newsletter-section";
// import SiteFooter from "@/components/layout/site-footer";

// type SiteShellProps = {
//   children: React.ReactNode;
// };

// export default function SiteShell({
//   children,
// }: SiteShellProps) {
//   const pathname = usePathname();

//   const isAdminRoute =
//     pathname === "/admin" ||
//     pathname.startsWith("/admin/");

//   /*
//    * Admin routes have their own:
//    *
//    * - AdminSidebar
//    * - AdminHeader
//    * - Admin layout
//    *
//    * Therefore the customer storefront
//    * header/newsletter/footer must not render.
//    */
//   if (isAdminRoute) {
//     return <>{children}</>;
//   }

//   return (
//     <>
//       {/* CUSTOMER STOREFRONT HEADER */}
//       <Header />

//       {/* CURRENT CUSTOMER PAGE */}
//       {children}

//       {/* CUSTOMER NEWSLETTER */}
//       <NewsletterSection />

//       {/* CUSTOMER FOOTER */}
//       <SiteFooter />
//     </>
//   );
// }

"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/header";
import NewsletterSection from "@/components/layout/newsletter-section";
import SiteFooter from "@/components/layout/site-footer";

type SiteShellProps = {
  children: React.ReactNode;
};

export default function SiteShell({
  children,
}: SiteShellProps) {
  const pathname = usePathname();

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />

      {children}

      <NewsletterSection />

      <SiteFooter />
    </>
  );
}