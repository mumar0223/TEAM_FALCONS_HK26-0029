"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  sentimentScore: number; // -1.0 to 1.0
  sentimentLabel: "Bullish" | "Bearish" | "Neutral";
}

const DEFAULT_TICKERS: TickerItem[] = [
  {
    symbol: "NIFTY 50",
    name: "Nifty 50",
    price: "25,120.45",
    change: "+0.84%",
    isPositive: true,
    sentimentScore: 0.68,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "S&P 500",
    name: "S&P 500",
    price: "5,864.67",
    change: "+0.45%",
    isPositive: true,
    sentimentScore: 0.55,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Ind.",
    price: "₹2,985.30",
    change: "+1.45%",
    isPositive: true,
    sentimentScore: 0.76,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: "$132.85",
    change: "+3.20%",
    isPositive: true,
    sentimentScore: 0.88,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy",
    price: "₹4,180.10",
    change: "-0.65%",
    isPositive: false,
    sentimentScore: -0.25,
    sentimentLabel: "Bearish",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    price: "₹1,672.40",
    change: "+0.32%",
    isPositive: true,
    sentimentScore: 0.42,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: "$234.50",
    change: "+0.95%",
    isPositive: true,
    sentimentScore: 0.52,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: "$218.40",
    change: "-2.45%",
    isPositive: false,
    sentimentScore: -0.58,
    sentimentLabel: "Bearish",
  },
];

export function TickerTape({ tickers = DEFAULT_TICKERS }: { tickers?: TickerItem[] }) {
  // Duplicate array for seamless infinite scroll
  const duplicated = [...tickers, ...tickers];

  return (
    <div className="w-full bg-card/60 dark:bg-card/40 border-y border-border/80 backdrop-blur-md overflow-hidden select-none py-1.5 flex items-center">
      <div className="flex items-center gap-2 px-3 border-r border-border shrink-0 text-[11px] font-bold tracking-wider uppercase text-emerald-500 dark:text-emerald-400">
        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
        LIVE SENTIMENT
      </div>

      <div className="overflow-hidden flex-1 relative mask-gradient">
        <div className="animate-ticker flex items-center gap-6 whitespace-nowrap">
          {duplicated.map((t, idx) => (
            <div
              key={`${t.symbol}-${idx}`}
              className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md hover:bg-muted/50 transition-colors cursor-pointer text-xs"
            >
              <span className="font-semibold text-foreground tracking-tight">{t.symbol}</span>
              <span className="font-mono text-muted-foreground">{t.price}</span>

              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-mono text-[11px] font-medium",
                  t.isPositive ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
                )}
              >
                {t.isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {t.change}
              </span>

              <span
                className={cn(
                  "text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                  t.sentimentLabel === "Bullish"
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : t.sentimentLabel === "Bearish"
                    ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                    : "bg-slate-500/15 text-slate-600 dark:text-slate-400 border border-slate-500/30"
                )}
              >
                {t.sentimentLabel} {(t.sentimentScore * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
