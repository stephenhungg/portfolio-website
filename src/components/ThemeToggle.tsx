"use client";

import { useTheme } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-6 rounded-full bg-gray-600 opacity-50" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-white/20"
      style={{
        background: theme === "catppuccin" ? "#8aadf4" : "#374151"
      }}
      title={theme === "catppuccin" ? "Switch to Dark Theme" : "Switch to Catppuccin Theme"}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 transform ${
          theme === "catppuccin" ? "translate-x-6 bg-[#24273a]" : "translate-x-0.5 bg-white"
        }`}
      />
      
      {/* Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1">
        {/* Moon icon (dark theme) */}
        <svg
          className={`w-3 h-3 transition-opacity duration-300 ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            clipRule="evenodd"
          />
        </svg>
        
        {/* Cat icon (catppuccin theme) */}
        <svg
          className={`w-3 h-3 transition-opacity duration-300 ${
            theme === "catppuccin" ? "opacity-100" : "opacity-0"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      </div>
    </button>
  );
}
