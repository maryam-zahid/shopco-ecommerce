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

    px-[16px]
    py-[20px]

    min-[800px]:px-[24px]
    min-[800px]:py-[24px]

    min-[1200px]:px-[30px]
    min-[1200px]:py-[28px]

    min-[1920px]:px-[36px]
    min-[1920px]:py-[32px]
  "
>
  <div
    className="
      mx-auto
      w-full
      max-w-[1600px]
    "
  >
    {children}
  </div>
</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}