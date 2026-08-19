"use client";

import type {
  CSSProperties,
  ReactNode,
} from "react";

import {
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function AdminSidebarProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider
      open={true}
      onOpenChange={() => {
        /*
         * Keep the admin sidebar
         * permanently expanded on desktop.
         *
         * Mobile uses openMobile separately,
         * so the mobile drawer still works.
         */
      }}
      style={
        {
          "--sidebar-width":
            "14rem",
        } as CSSProperties
      }
    >
      {children}
    </SidebarProvider>
  );
}