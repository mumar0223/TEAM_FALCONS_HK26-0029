"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  ExternalLink,
  Flame,
  Radio,
  FileText,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface DispatchHeadline {
  title: string;
  source: string;
  timeAgo: string;
  sentiment: "positive" | "negative" | "neutral";
  sentimentPercent: string;
  finbertScore: string;
  category: "earnings" | "policy" | "macro" | "corporate";
  leadTime: string;
  impactSymbol: string;
}

const STREAMING_DISPATCHES: DispatchHeadline[] = [
  {
    title: "Cabinet clears ₹24,000 Cr incentive scheme for EV & clean energy ecosystems",
    source: "Economic Times",
    timeAgo: "4m ago",
    sentiment: "positive",
    sentimentPercent: "89% Positive",
    finbertScore: "+0.94",
    category: "policy",
    leadTime: "38m lead",
    impactSymbol: "TATAMOTORS",
  },
  {
    title: "US Fed hints at calibrated rate cuts as retail inflation eases to 2.9%",
    source: "Bloomberg",
    timeAgo: "18m ago",
    sentiment: "positive",
    sentimentPercent: "76% Positive",
    finbertScore: "+0.82",
    category: "macro",
    leadTime: "45m lead",
    impactSymbol: "NIFTY 50",
  },
  {
    title: "IT export billings witness mild softness amid EU client budget cycles",
    source: "LiveMint",
    timeAgo: "32m ago",
    sentiment: "negative",
    sentimentPercent: "64% Negative",
    finbertScore: "-0.68",
    category: "earnings",
    leadTime: "52m lead",
    impactSymbol: "TCS / INFY",
  },
  {
    title: "Domestic mutual funds record all-time high monthly SIP inflows of ₹23,500 Cr",
    source: "MoneyControl",
    timeAgo: "45m ago",
    sentiment: "positive",
    sentimentPercent: "92% Positive",
    finbertScore: "+0.96",
    category: "macro",
    leadTime: "30m lead",
    impactSymbol: "HDFCBANK",
  },
  {
    title: "Crude oil benchmarks fluctuate near $82 as Red Sea shipping route rates normalize",
    source: "Reuters",
    timeAgo: "1h ago",
    sentiment: "neutral",
    sentimentPercent: "54% Neutral",
    finbertScore: "+0.08",
    category: "macro",
    leadTime: "40m lead",
    impactSymbol: "RELIANCE",
  },
];

export function NarrativeLeadSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredDispatches = STREAMING_DISPATCHES.filter((d) => {
    if (selectedCategory === "all") return true;
    return d.category === selectedCategory;
  });

  return (
    <section id="narrative" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Temporal Information Advantage
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            News Meets the Market: Narrative Lead Effect
          </h2>
          <p className="text-sm text-slate-600 mt-1.5 font-normal">
            Visualizing the temporal lead-lag between breaking financial news narratives and subsequent stock price volatility.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Temporal Lead Graph */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="size-4 text-emerald-600" />
                  Temporal Lead-Lag Visualization
                </h3>
                <p className="text-xs text-slate-600">
                  Observe how institutional narrative surges precede retail price discovery.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 self-start sm:self-auto">
                <Clock className="size-3" />
                Avg Lead Window: ~42 Mins
              </span>
            </div>

            {/* Visual Lead-Lag Diagram */}
            <div className="relative pt-4">
              <div className="w-full h-56 relative bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-100 p-4 flex flex-col justify-between overflow-hidden">
                {/* SVG Visualizing Early Narrative Spike vs Delayed Price Movement */}
                <svg viewBox="0 0 600 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="narrativeFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Shaded Area between News Spike and Price Discovery */}
                  <rect
                    x="210"
                    y="20"
                    width="140"
                    height="150"
                    fill="#10b981"
                    fillOpacity="0.06"
                    stroke="#10b981"
                    strokeDasharray="3 3"
                    rx="6"
                  />

                  {/* News Narrative Curve (Surges Early at x=180) */}
                  <path
                    d="M 20 160 C 120 160, 160 150, 210 40 C 260 40, 320 60, 580 70"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 160 C 120 160, 160 150, 210 40 C 260 40, 320 60, 580 70 L 580 180 L 20 180 Z"
                    fill="url(#narrativeFill)"
                  />

                  {/* Price Movement Curve (Lags behind, Surges at x=340) */}
                  <path
                    d="M 20 170 C 180 170, 260 170, 340 160 C 400 65, 480 60, 580 50"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="2.5"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                  />

                  {/* Marker 1: Narrative Outbreak */}
                  <circle cx="210" cy="40" r="5" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                  <text x="210" y="24" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">
                    Narrative Outbreak
                  </text>

                  {/* Lead Gap Annotation */}
                  <text x="280" y="100" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">
                    ⏱ 42 Min Lead Window
                  </text>
                  <text x="280" y="116" textAnchor="middle" fill="#64748b" fontSize="9">
                    Alpha Opportunity Zone
                  </text>

                  {/* Marker 2: Price Reaction Peak */}
                  <circle cx="420" cy="65" r="5" fill="#334155" stroke="#ffffff" strokeWidth="2" />
                  <text x="420" y="48" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">
                    Price Discovery Peak
                  </text>
                </svg>
              </div>

              {/* Legend & Insight Note */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-xs text-slate-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-emerald-500 rounded-full" />
                    <span className="font-semibold text-slate-800">News Narrative Surge</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-slate-700 border-t border-dashed border-slate-700" />
                    <span className="font-semibold text-slate-800">Stock Price Reaction</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 italic">
                  Data source: 1,840 correlated corporate events (2024-2026)
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Filter Narrative:</span>
              {[
                { id: "all", label: "All Top Headlines" },
                { id: "earnings", label: "Earnings Beats" },
                { id: "policy", label: "Policy Decisions" },
                { id: "macro", label: "Macroeconomic" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSelectedCategory(btn.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === btn.id
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Streaming Dispatches Feed */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Radio className="size-4 text-emerald-600 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                  Streaming Dispatches
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-600">FinBERT Scoring</span>
            </div>

            {/* Dispatch List */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredDispatches.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-slate-50/50 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.source}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-emerald-700 font-bold">{item.leadTime}</span>
                      <span>•</span>
                      <span>{item.timeAgo}</span>
                    </div>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {item.title}
                  </h4>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono text-slate-600">
                      Asset: <strong className="text-slate-800">{item.impactSymbol}</strong>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        item.sentiment === "positive"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/70"
                          : item.sentiment === "negative"
                          ? "bg-rose-50 text-rose-700 border border-rose-200/70"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {item.sentimentPercent} (Score: {item.finbertScore})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
