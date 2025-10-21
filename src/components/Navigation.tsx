'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", color: "text-blue" },
    { href: "/about", label: "About", color: "text-pink" },
    { href: "/projects", label: "Projects", color: "text-green" },
    { href: "/gallery", label: "Gallery", color: "text-yellow" },
    { href: "/contact", label: "Contact", color: "text-peach" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center py-4">
      <div className="glassmorphic-nav flex items-center gap-2 text-sm px-6 py-3 rounded-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href === "/projects" && pathname.startsWith("/projects"));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? `${item.color} active-nav-item font-semibold`
                  : `${item.color} hover:opacity-80`
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
