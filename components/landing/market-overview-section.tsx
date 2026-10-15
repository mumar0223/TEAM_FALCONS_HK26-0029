"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowUpRight,
  Filter,
  BarChart3,
  ExternalLink,
} from "lucide-react";

interface MarketCardItem {
  symbol: string;
  name: string;
  exchange: string;
  price: string;
  change: string;
  isPositive: boolean;
  sentiment: string;
  sentimentScore: number;
  sentimentType: "bullish" | "bearish" | "neutral";
  insight: string;
  sparkline: number[];
  category: "indices" | "stocks";
}

const MARKET_ITEMS: MarketCardItem[] = [
  {
    symbol: "NIFTY 50",
    name: "NSE Benchmark Index",
    exchange: "NSE",
    price: "24,850.15",
    change: "+0.42%",
    isPositive: true,
    sentiment: "Bullish 72%",
    sentimentScore: 72,
    sentimentType: "bullish",
    insight: "Strong FII net inflows & positive IT guidance lead broader market upside.",
    sparkline: [24720, 24750, 24710, 24790, 24820, 24800, 24850],
    category: "indices",
  },
  {
    symbol: "SENSEX",
    name: "BSE Benchmark 30",
    exchange: "BSE",
    price: "81,340.40",
    change: "+0.38%",
    isPositive: true,
    sentiment: "Bullish 68%",
    sentimentScore: 68,
    sentimentType: "bullish",
    insight: "Private banking and auto heavyweights offset mild metal sector correction.",
    sparkline: [80900, 81050, 81000, 81200, 81150, 81300, 81340],
    category: "indices",
  },
  {
    symbol: "BANK NIFTY",
    name: "Banking Sector Benchmark",
    exchange: "NSE",
    price: "51,412.50",
    change: "-0.15%",
    isPositive: false,
    sentiment: "Neutral 48%",
    sentimentScore: 48,
    sentimentType: "neutral",
    insight: "Mild consolidation observed around key 51,500 resistance pivot zone.",
    sparkline: [51600, 51550, 51480, 51520, 51390, 51430, 51412],
    category: "indices",
  },
  {
    symbol: "HDFC Bank",
    name: "HDFC Bank Limited",
    exchange: "NSE: HDFCBANK",
    price: "₹1,642.00",
    change: "+1.15%",
    isPositive: true,
    sentiment: "Bullish 78%",
    sentimentScore: 78,
    sentimentType: "bullish",
    insight: "Deposit mobilization growth beats street consensus; credit cost remains stable.",
    sparkline: [1620, 1625, 1630, 1628, 1638, 1635, 1642],
    category: "stocks",
  },
  {
    symbol: "Tata Consultancy",
    name: "TCS Limited",
    exchange: "NSE: TCS",
    price: "₹4,190.00",
    change: "-0.45%",
    isPositive: false,
    sentiment: "Neutral 52%",
    sentimentScore: 52,
    sentimentType: "neutral",
    insight: "Selective US discretionary spending commentary tempers short-term earnings multiples.",
    sparkline: [4220, 4210, 4215, 4195, 4200, 4185, 4190],
    category: "stocks",
  },
  {
    symbol: "Infosys Ltd",
    name: "Infosys Limited",
    exchange: "NSE: INFY",
    price: "₹1,889.30",
    change: "+2.10%",
    isPositive: true,
    sentiment: "Bullish 81%",
    sentimentScore: 81,
    sentimentType: "bullish",
    insight: "New multi-year European cloud migration deal signing spurs sharp sentiment re-rating.",
    sparkline: [1845, 1850, 1860, 1865, 1875, 1880, 1889],
    category: "stocks",
  },
  {
    symbol: "Reliance Ind.",
    name: "Reliance Industries Ltd",
    exchange: "NSE: RELIANCE",
    price: "₹2,985.40",
    change: "+1.65%",
    isPositive: true,
    sentiment: "Bullish 84%",
    sentimentScore: 84,
    sentimentType: "bullish",
    insight: "Clean energy capex timeline and retail segment EBITDA expansion drive optimism.",
    sparkline: [2930, 2940, 2935, 2960, 2970, 2965, 2985],
    category: "stocks",
  },
  {
    symbol: "Tata Motors",
    name: "Tata Motors Passenger",
    exchange: "NSE: TATAMOTORS",
    price: "₹968.20",
    change: "+2.85%",
    isPositive: true,
    sentiment: "Bullish 86%",
    sentimentScore: 86,
    sentimentType: "bullish",
    insight: "JLR operating margin expansion & EV order book surprise street expectations.",
    sparkline: [940, 945, 952, 950, 960, 958, 968],
    category: "stocks",
  },
];

export function MarketOverviewSection() {
  const [activeTab, setActiveTab] = useState<"all" | "indices" | "stocks">("all");

  const filteredItems = MARKET_ITEMS.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  return (
    <section id="overview" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Benchmark & Equities Dispatch
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Market Overview
            </h2>
            <p className="text-sm text-slate-600 mt-1.5 max-w-2xl font-normal">
              Real-time sentiment and technical dispatch for benchmark indices and bellwether stocks.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs self-start md:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Assets
            </button>
            <button
              onClick={() => setActiveTab("indices")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "indices"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Major Indices
            </button>
            <button
              onClick={() => setActiveTab("stocks")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "stocks"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Top Active Equities
            </button>
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice(0, 6).map((item, idx) => {
            const minVal = Math.min(...item.sparkline);
            const maxVal = Math.max(...item.sparkline);
            const range = maxVal - minVal || 1;

            // Generate SVG path for sparkline
            const points = item.sparkline
              .map((val, i) => {
                const x = (i / (item.sparkline.length - 1)) * 120;
                const y = 35 - ((val - minVal) / range) * 28;
                return `${x},${y}`;
              })
              .join(" ");

            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between"
              >
                {/* Card Top: Asset Info & Sentiment Badge */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-600 block uppercase">
                        {item.exchange}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.symbol}
                      </h3>
                      <p className="text-xs text-slate-600 truncate max-w-[180px]">
                        {item.name}
                      </p>
                    </div>

                    {/* Sentiment Pill */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                        item.sentimentType === "bullish"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                          : item.sentimentType === "bearish"
                          ? "bg-rose-50 text-rose-700 border-rose-200/80"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      <Sparkles className="size-3" />
                      {item.sentiment}
                    </span>
                  </div>

                  {/* Price & Sparkline Row */}
                  <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-slate-100">
                    <div>
                      <div className="text-xl font-extrabold text-slate-900 tracking-tight">
                        {item.price}
                      </div>
                      <div
                        className={`inline-flex items-center text-xs font-bold ${
                          item.isPositive ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {item.isPositive ? (
                          <TrendingUp className="size-3.5 mr-1" />
                        ) : (
                          <TrendingDown className="size-3.5 mr-1" />
                        )}
                        {item.change}
                      </div>
                    </div>

                    {/* SVG Sparkline */}
                    <div className="w-28 h-10">
                      <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible">
                        <polyline
                          fill="none"
                          stroke={item.isPositive ? "#10b981" : "#ef4444"}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={points}
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Qualitative Sentiment Driver Takeaway */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-snug">
                  <span className="font-semibold text-slate-700">Driver: </span>
                  {item.insight}
                </div>

                {/* Deep Dive Action Link */}
                <div className="mt-3 pt-2 flex items-center justify-end">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    <span>Terminal Deep Dive</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
