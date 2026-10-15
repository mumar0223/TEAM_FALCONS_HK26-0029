"use client";

import React, { useState } from "react";
import { Search, TrendingUp, TrendingDown, Layers, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface StockListItem {
  symbol: string;
  name: string;
  exchange: string;
  category: "equity" | "sector";
  sectorName?: string;
  price: string;
  rawPrice: number;
  change: string;
  rawChange: number;
  isPositive: boolean;
  currency: "USD" | "INR";
  sentimentScore: number; // -1.0 to 1.0
  sentimentLabel: "Bullish" | "Bearish" | "Neutral";
}

export const WATCHLIST_ITEMS: StockListItem[] = [
  // Equities
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    exchange: "NASDAQ",
    category: "equity",
    sectorName: "Technology",
    price: "198.76",
    rawPrice: 198.76,
    change: "-1.24%",
    rawChange: -1.24,
    isPositive: false,
    currency: "USD",
    sentimentScore: 0.52,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    exchange: "NSE",
    category: "equity",
    sectorName: "Energy",
    price: "2,985.30",
    rawPrice: 2985.3,
    change: "+1.45%",
    rawChange: 1.45,
    isPositive: true,
    currency: "INR",
    sentimentScore: 0.76,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    exchange: "NASDAQ",
    category: "equity",
    sectorName: "Technology",
    price: "132.85",
    rawPrice: 132.85,
    change: "+3.20%",
    rawChange: 3.2,
    isPositive: true,
    currency: "USD",
    sentimentScore: 0.88,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    exchange: "NSE",
    category: "equity",
    sectorName: "Technology",
    price: "4,180.10",
    rawPrice: 4180.1,
    change: "-0.65%",
    rawChange: -0.65,
    isPositive: false,
    currency: "INR",
    sentimentScore: -0.25,
    sentimentLabel: "Bearish",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    exchange: "NSE",
    category: "equity",
    sectorName: "Banking",
    price: "1,672.40",
    rawPrice: 1672.4,
    change: "+0.32%",
    rawChange: 0.32,
    isPositive: true,
    currency: "INR",
    sentimentScore: 0.42,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    exchange: "NASDAQ",
    category: "equity",
    sectorName: "Automotive",
    price: "176.19",
    rawPrice: 176.19,
    change: "-2.06%",
    rawChange: -2.06,
    isPositive: false,
    currency: "USD",
    sentimentScore: -0.58,
    sentimentLabel: "Bearish",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    exchange: "NASDAQ",
    category: "equity",
    sectorName: "Technology",
    price: "411.96",
    rawPrice: 411.96,
    change: "+0.84%",
    rawChange: 0.84,
    isPositive: true,
    currency: "USD",
    sentimentScore: 0.62,
    sentimentLabel: "Bullish",
  },

  // Sectors & Major Indices
  {
    symbol: "TECH SECTOR",
    name: "Technology & AI Index",
    exchange: "SECTOR",
    category: "sector",
    sectorName: "Technology",
    price: "3,450.20",
    rawPrice: 3450.2,
    change: "+1.90%",
    rawChange: 1.9,
    isPositive: true,
    currency: "USD",
    sentimentScore: 0.72,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "BANKING SECTOR",
    name: "Banking & Financials",
    exchange: "SECTOR",
    category: "sector",
    sectorName: "Banking",
    price: "52,180.10",
    rawPrice: 52180.1,
    change: "+0.40%",
    rawChange: 0.4,
    isPositive: true,
    currency: "INR",
    sentimentScore: 0.48,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "ENERGY SECTOR",
    name: "Energy & Utilities",
    exchange: "SECTOR",
    category: "sector",
    sectorName: "Energy",
    price: "31,890.40",
    rawPrice: 31890.4,
    change: "+1.10%",
    rawChange: 1.1,
    isPositive: true,
    currency: "INR",
    sentimentScore: 0.62,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "AUTO SECTOR",
    name: "Automotive & EV",
    exchange: "SECTOR",
    category: "sector",
    sectorName: "Automotive",
    price: "18,450.00",
    rawPrice: 18450,
    change: "-0.80%",
    rawChange: -0.8,
    isPositive: false,
    currency: "INR",
    sentimentScore: -0.15,
    sentimentLabel: "Neutral",
  },
  {
    symbol: "NIFTY 50",
    name: "Nifty 50 Index",
    exchange: "NSE",
    category: "sector",
    sectorName: "Broad Market",
    price: "25,120.45",
    rawPrice: 25120.45,
    change: "+0.84%",
    rawChange: 0.84,
    isPositive: true,
    currency: "INR",
    sentimentScore: 0.68,
    sentimentLabel: "Bullish",
  },
  {
    symbol: "NASDAQ",
    name: "Nasdaq Composite",
    exchange: "IXIC",
    category: "sector",
    sectorName: "Broad Market",
    price: "16,784.56",
    rawPrice: 16784.56,
    change: "-1.16%",
    rawChange: -1.16,
    isPositive: false,
    currency: "USD",
    sentimentScore: -0.22,
    sentimentLabel: "Bearish",
  },
];

interface StockListSidebarProps {
  selectedSymbol: string;
  onSelectStock: (stock: StockListItem) => void;
}

export function StockListSidebar({
  selectedSymbol,
  onSelectStock,
}: StockListSidebarProps) {
  const [activeTab, setActiveTab] = useState<"all" | "equity" | "sector">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = WATCHLIST_ITEMS.filter((item) => {
    if (activeTab !== "all" && item.category !== activeTab) return false;
    if (
      searchQuery &&
      !item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <aside className="w-64 sm:w-72 md:w-80 h-full border-r border-border/80 bg-background/50 flex flex-col shrink-0 select-none">
      {/* Top Controls: Category Switcher (Companies vs Sectors) */}
      <div className="p-2.5 border-b border-border/70 shrink-0 space-y-2">
        <div className="grid grid-cols-3 gap-1 bg-muted/60 p-0.5 rounded-lg text-xs font-mono">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer",
              activeTab === "all"
                ? "bg-background text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("equity")}
            className={cn(
              "py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer",
              activeTab === "equity"
                ? "bg-background text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Companies
          </button>
          <button
            onClick={() => setActiveTab("sector")}
            className={cn(
              "py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer",
              activeTab === "sector"
                ? "bg-background text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Sectors
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search companies & sectors..."
            className="pl-8 h-7.5 text-xs bg-muted/40 border-border/60 focus:bg-background rounded-lg"
          />
        </div>
      </div>

      {/* Watchlist Items Scroll Area */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
        {filtered.map((stock) => {
          const isSelected = selectedSymbol === stock.symbol;

          return (
            <div
              key={stock.symbol}
              onClick={() => onSelectStock(stock)}
              className={cn(
                "p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 text-xs",
                isSelected
                  ? "bg-card border-emerald-500/50 shadow-sm ring-1 ring-emerald-500/30"
                  : "bg-card/40 border-border/50 hover:bg-card/80 hover:border-border"
              )}
            >
              {/* Left Info: Symbol & Category */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-foreground tracking-tight font-mono">
                    {stock.symbol}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-mono">
                    {stock.exchange}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground truncate max-w-[130px]">
                  {stock.name}
                </span>
              </div>

              {/* Right Info: Price, Change Pill, Sentiment Pill */}
              <div className="flex flex-col items-end shrink-0 font-mono">
                <span className="font-bold text-foreground">
                  {stock.currency === "INR" ? "₹" : "$"}
                  {stock.price}
                </span>

                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-1 py-0.2 rounded",
                      stock.isPositive
                        ? "text-emerald-500 bg-emerald-500/10"
                        : "text-rose-500 bg-rose-500/10"
                    )}
                  >
                    {stock.change}
                  </span>

                  <span
                    className={cn(
                      "text-[9px] font-semibold px-1 py-0.2 rounded-full uppercase",
                      stock.sentimentLabel === "Bullish"
                        ? "text-emerald-400 bg-emerald-500/15"
                        : stock.sentimentLabel === "Bearish"
                        ? "text-rose-400 bg-rose-500/15"
                        : "text-slate-400 bg-slate-500/15"
                    )}
                  >
                    {stock.sentimentLabel.slice(0, 4)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
