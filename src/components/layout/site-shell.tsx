
"use client";

import { SessionProvider } from "next-auth/react";
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

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register";

  const isInvoiceRoute =
    pathname.startsWith(
      "/invoice/orders/",
    );

  /*
   * Admin pages use their own admin layout.
   * Invoice pages must render ONLY the invoice.
   */
  if (
    isAdminRoute ||
    isInvoiceRoute
  ) {
    return <>{children}</>;
  }

  /*
   * Normal storefront routes.
   * Header needs SessionProvider because
   * AccountMenu uses useSession().
   */
  return (
    <SessionProvider>
      <Header />

      {children}

      {!isAuthRoute && (
        <>
          <NewsletterSection />
          <SiteFooter />
        </>
      )}
    </SessionProvider>
  );
}