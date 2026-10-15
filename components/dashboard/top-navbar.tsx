"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  Search,
  Bell,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";

const MACRO_TICKERS = [
  { pair: "EUR/USD", val: "1.0995", change: "-0.2%", isPos: false },
  { pair: "BTC/USD", val: "$68,930", change: "+1.28%", isPos: true },
  { pair: "USD/JPY", val: "155.78", change: "+0.5%", isPos: true },
  { pair: "Gold", val: "$2,439.00", change: "+0.99%", isPos: true },
  { pair: "Crude Oil", val: "$85.15", change: "-1.8%", isPos: false },
];

export function TopNavbar() {
  return (
    <header className="h-12 w-full border-b border-border/80 bg-background/90 backdrop-blur-xl shrink-0 px-4 flex items-center justify-between gap-4 z-40 select-none">
      {/* Left: Brand & Nav Tabs */}
      <div className="flex items-center gap-6 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="size-7 rounded-lg bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Activity className="size-4 stroke-[2.5]" />
          </div>
          <span className="font-heading font-bold text-sm tracking-tight text-foreground">
            Artha<span className="text-emerald-500">Drishti</span>
          </span>
        </Link>

        {/* Navigation Tabs matching reference image */}
        <nav className="hidden md:flex items-center gap-1">
          <button className="px-3 py-1 rounded-md text-xs font-semibold bg-muted/80 text-foreground transition-colors cursor-pointer shadow-2xs">
            Dashboard
          </button>
          <button className="px-3 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Portfolio
          </button>
          <button className="px-3 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Sectors & Heatmap
          </button>
        </nav>
      </div>

      {/* Center: Macro & Currency Mini Tickers matching image */}
      <div className="hidden xl:flex items-center gap-5 text-xs font-mono overflow-hidden">
        {MACRO_TICKERS.map((t, idx) => (
          <div key={idx} className="flex items-center gap-1.5 shrink-0">
            <span className="text-muted-foreground font-medium">{t.pair}</span>
            <span className="text-foreground font-semibold">{t.val}</span>
            <span
              className={`flex items-center text-[11px] ${
                t.isPos ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {t.isPos ? (
                <TrendingUp className="size-3 mr-0.5" />
              ) : (
                <TrendingDown className="size-3 mr-0.5" />
              )}
              {t.change}
            </span>
          </div>
        ))}
      </div>

      {/* Right: Status Pill & Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-500">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>REALTIME FEED</span>
        </div>

        <ThemeToggle />

        <button
          className="size-8 rounded-lg border border-border/80 bg-card/60 hover:bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Notifications & Divergence Alerts"
        >
          <Bell className="size-3.5" />
        </button>
      </div>
    </header>
  );
}
