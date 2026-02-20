'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Home", color: "text-blue" },
  { href: "/about", label: "About", color: "text-pink" },
  { href: "/projects", label: "Projects", color: "text-green" },
  { href: "/gallery", label: "Gallery", color: "text-yellow" },
  { href: "/contact", label: "Contact", color: "text-peach" },
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full hidden sm:flex justify-center py-4">
        <div className={`glassmorphic-nav flex items-center gap-2 text-sm px-6 py-3 rounded-2xl transition-all duration-500 ${
          isHomePage ? 'nav-glow' : ''
        }`}>
          {NAV_ITEMS.map((item) => {
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
          <div className="ml-2 pl-2 border-l border-white/10">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 sm:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-medium text-white">
            SH
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="glassmorphic-nav w-10 h-10 rounded-xl flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 top-0 bg-black/95 backdrop-blur-md transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ zIndex: -1 }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href ||
                (item.href === "/projects" && pathname.startsWith("/projects"));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-2xl font-light transition-all duration-300 ${
                    isActive
                      ? `${item.color} font-medium`
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
