"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className={cn(
          "relative w-11 h-6 rounded-full bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600",
          className
        )}
        aria-label="Toggle theme"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
        isDark ? "bg-green-600" : "bg-gray-200",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 flex items-center justify-center",
          isDark && "translate-x-5"
        )}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-green-600" />
        ) : (
          <Sun className="w-3 h-3 text-amber-500" />
        )}
      </span>
    </button>
  );
}
