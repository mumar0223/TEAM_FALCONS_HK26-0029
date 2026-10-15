"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({
  className = "",
  variant = "button",
}: {
  className?: string;
  variant?: "button" | "row";
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    if (variant === "row") {
      return (
        <div
          className={`w-full h-10 rounded-xl border border-border/70 bg-card/40 ${className}`}
        />
      );
    }
    return (
      <div
        className={`size-9 rounded-xl border border-border/70 bg-card/40 ${className}`}
      />
    );
  }

  const isDark = theme === "dark";

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        title={`Switch to ${isDark ? "Light" : "Dark"} theme`}
        className={`w-full h-10 px-3 rounded-xl border border-border/60 bg-card/70 hover:bg-card text-foreground flex items-center justify-between transition-all cursor-pointer shadow-2xs group select-none ${className}`}
      >
        <div className="flex items-center gap-2.5">
          {isDark ? (
            <Moon className="size-4 text-emerald-400 transition-transform group-hover:scale-110" />
          ) : (
            <Sun className="size-4 text-amber-500 transition-transform group-hover:scale-110" />
          )}
          <span className="text-[12.5px] font-semibold text-foreground tracking-tight">
            {isDark ? "Dark Terminal" : "Light Terminal"}
          </span>
        </div>

        <div
          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
            isDark ? "bg-emerald-600" : "bg-zinc-300"
          }`}
        >
          <span
            className={`inline-block size-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
              isDark ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={`Switch to ${isDark ? "Light" : "Dark"} theme`}
      className={`size-9 rounded-xl border border-border/60 bg-card/60 hover:bg-card/90 text-foreground flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs ${className}`}
    >
      {isDark ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-emerald-600" />}
    </button>
  );
}
