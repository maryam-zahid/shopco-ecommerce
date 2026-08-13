"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Boxes,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  Shirt,
  ShoppingCart,
  Star,
  Tags,
  TicketPercent,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const dashboardItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
];

const catalogItems: NavItem[] = [
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Tags,
  },
  {
    title: "Dress Styles",
    href: "/admin/dress-styles",
    icon: Shirt,
  },
  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: Boxes,
  },
];

const salesItems: NavItem[] = [
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Coupons",
    href: "/admin/coupons",
    icon: TicketPercent,
  },
];

const managementItems: NavItem[] = [
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
];

function AdminNavItem({
  item,
}: {
  item: NavItem;
}) {
  const pathname = usePathname();

  const isActive =
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href);

  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={item.title}
        render={
          <Link href={item.href} />
        }
      >
        <Icon className="size-4" />

        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function NavGroup({
  label,
  items,
}: {
  label?: string;
  items: NavItem[];
}) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel>
          {label}
        </SidebarGroupLabel>
      )}

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <AdminNavItem
              key={item.href}
              item={item}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default function AdminSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
    >
      {/* LOGO */}
      <SidebarHeader className="border-b p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="SHOP.CO Admin"
              render={
                <Link href="/admin" />
              }
            >
              <div
                className="
                  flex
                  size-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-black
                  text-white
                "
              >
                <span className="text-sm font-bold">
                  S
                </span>
              </div>

              <div className="grid flex-1 text-left leading-tight">
                <span
                  className="
                    truncate
                    text-[18px]
                    font-bold
                    tracking-[-0.03em]
                  "
                >
                  SHOP.CO
                </span>

                <span
                  className="
                    truncate
                    text-[11px]
                    text-muted-foreground
                  "
                >
                  Admin Dashboard
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* NAVIGATION */}
      <SidebarContent>
        <NavGroup items={dashboardItems} />

        <NavGroup
          label="Catalog"
          items={catalogItems}
        />

        <NavGroup
          label="Sales"
          items={salesItems}
        />

        <NavGroup
          label="Management"
          items={managementItems}
        />
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Settings"
              render={
                <Link href="/admin/settings" />
              }
            >
              <Settings className="size-4" />

              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}