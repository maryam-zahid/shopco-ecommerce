// import type { ReactNode } from "react";

// import AdminHeader from "@/components/admin/layout/admin-header";
// import AdminSidebar from "@/components/admin/layout/admin-sidebar";

// import {
//   SidebarInset,
//   SidebarProvider,
// } from "@/components/ui/sidebar";

// import {
//   TooltipProvider,
// } from "@/components/ui/tooltip";

// export default function AdminLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   return (
//     <TooltipProvider>
//       <SidebarProvider>
//         <div
//           className="
//             flex
//             min-h-svh
//             w-full
//             font-[family-name:var(--font-outfit)]
//           "
//         >
//           <AdminSidebar />

//           <SidebarInset>
//             <AdminHeader />

//             <main
//               className="
//                 min-h-[calc(100vh-52px)]
//                 bg-muted/30
//               "
//             >
//               {children}
//             </main>
//           </SidebarInset>
//         </div>
//       </SidebarProvider>
//     </TooltipProvider>
//   );
// }

import type { ReactNode } from "react";

import AdminHeader from "@/components/admin/layout/admin-header";
import AdminSidebar from "@/components/admin/layout/admin-sidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import {
  TooltipProvider,
} from "@/components/ui/tooltip";

import { requireAdmin } from "@/lib/permissions";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div
          className="
            flex
            min-h-svh
            w-full
            font-[family-name:var(--font-outfit)]
          "
        >
          <AdminSidebar />

          <SidebarInset>
            <AdminHeader />

            <main
              className="
                min-h-[calc(100vh-52px)]
                bg-muted/30
              "
            >
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}