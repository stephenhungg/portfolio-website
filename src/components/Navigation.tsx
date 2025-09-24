'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center py-6">
      <div className="glassmorphic-nav flex gap-2 text-sm px-6 py-3 rounded-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href === "/projects" && pathname.startsWith("/projects"));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? "text-white active-nav-item"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
