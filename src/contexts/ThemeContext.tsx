"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "catppuccin";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Safe localStorage helpers that work in both SSR and client
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window === "undefined") return null;
      if (typeof localStorage === "undefined") return null;
      if (typeof localStorage.getItem !== "function") return null;
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window === "undefined") return;
      if (typeof localStorage === "undefined") return;
      if (typeof localStorage.setItem !== "function") return;
      localStorage.setItem(key, value);
    } catch {
      // Silently fail
    }
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get theme from localStorage or default to dark
    const savedTheme = safeLocalStorage.getItem("theme") as Theme;
    if (savedTheme && (savedTheme === "dark" || savedTheme === "catppuccin")) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Apply theme to document
      document.documentElement.setAttribute("data-theme", theme);
      safeLocalStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "catppuccin" : "dark");
  };

  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default values if not within provider (for SSR)
    return {
      theme: "dark" as Theme,
      toggleTheme: () => {}
    };
  }
  return context;
}
