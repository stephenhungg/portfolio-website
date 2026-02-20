"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsVisible(true);
        prevPathname.current = pathname;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div
      className="transition-opacity ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDuration: isVisible ? "300ms" : "0ms",
      }}
    >
      {children}
    </div>
  );
}
