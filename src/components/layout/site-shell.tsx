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

  if (isAdminRoute) {
    return <>{children}</>;
  }

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