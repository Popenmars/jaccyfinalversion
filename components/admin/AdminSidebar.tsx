"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, LogOut, Menu, X } from "lucide-react";
import { adminLogout } from "@/app/actions/admin";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/dashboard/products", icon: Package },
  { name: "Orders", href: "/admin/dashboard/orders", icon: ShoppingCart },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[200] md:hidden bg-dark-blue text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[150] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-[260px] bg-dark-blue flex flex-col z-[160] transition-transform duration-300 shadow-[4px_0_20px_rgba(0,0,0,0.2)]",
          "max-md:-translate-x-full",
          isOpen && "max-md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-white font-bold text-xl">Jaacy Admin</h2>
          <p className="text-white/50 text-xs mt-0.5">Management Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/admin/dashboard"
                ? pathname === "/admin/dashboard"
                : pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-blue text-white shadow-[0_4px_12px_rgba(0,92,255,0.3)]"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <form action={adminLogout}>
            <button
              type="submit"
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
};
