"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  Maximize2,
  Sparkles,
} from "lucide-react";

interface TimelinePoint {
  time: string;
  price: number;
  sentiment: number;
  event?: string;
  eventDetail?: string;
}

const TIMEFRAME_DATA: Record<string, TimelinePoint[]> = {
  "1D": [
    { time: "09:15", price: 24730, sentiment: 58 },
    { time: "10:30", price: 24760, sentiment: 62 },
    {
      time: "11:45",
      price: 24790,
      sentiment: 71,
      event: "Morning FII Net Buy Spike",
      eventDetail: "Domestic & foreign desk buying accelerates in private banking",
    },
    { time: "13:00", price: 24820, sentiment: 69 },
    {
      time: "14:15",
      price: 24810,
      sentiment: 74,
      event: "European Open Catalyst",
      eventDetail: "DAX & FTSE surge fuels tech export sentiment",
    },
    { time: "15:30", price: 24850, sentiment: 76 },
  ],
  "1W": [
    { time: "Mon", price: 24650, sentiment: 52 },
    { time: "Tue", price: 24710, sentiment: 59 },
    {
      time: "Wed",
      price: 24780,
      sentiment: 68,
      event: "RBI MPC Rate Pause",
      eventDetail: "Monetary policy committee maintains 6.5% repo rate as expected",
    },
    { time: "Thu", price: 24810, sentiment: 66 },
    {
      time: "Fri",
      price: 24850,
      sentiment: 74,
      event: "IT Mega Contract Announcement",
      eventDetail: "Multi-billion dollar generative AI enterprise contracts disclosed",
    },
  ],
  "1M": [
    { time: "Week 1", price: 24300, sentiment: 48 },
    {
      time: "Week 2",
      price: 24520,
      sentiment: 59,
      event: "Q2 Corporate Earnings Beats",
      eventDetail: "Automobile & private banking report 14% YoY profit surge",
    },
    { time: "Week 3", price: 24680, sentiment: 65 },
    {
      time: "Week 4",
      price: 24850,
      sentiment: 72,
      event: "FII Capital Inflow Rebound",
      eventDetail: "Net monthly institutional purchases exceed ₹18,400 Cr",
    },
  ],
};

export function SentimentTrackerSection() {
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M">("1W");
  const [activePointIndex, setActivePointIndex] = useState<number | null>(2);

  const points = TIMEFRAME_DATA[timeframe];
  const activePoint = activePointIndex !== null ? points[activePointIndex] : points[points.length - 1];

  // Chart dimensions & scaling
  const minPrice = Math.min(...points.map((p) => p.price)) - 50;
  const maxPrice = Math.max(...points.map((p) => p.price)) + 50;
  const priceRange = maxPrice - minPrice || 1;

  const minSent = 40;
  const maxSent = 90;
  const sentRange = maxSent - minSent;

  const svgWidth = 800;
  const svgHeight = 260;
  const paddingX = 40;
  const paddingY = 30;
  const innerWidth = svgWidth - paddingX * 2;
  const innerHeight = svgHeight - paddingY * 2;

  // Build SVG path coordinates
  const priceCoords = points.map((p, i) => {
    const x = paddingX + (i / (points.length - 1)) * innerWidth;
    const y = svgHeight - paddingY - ((p.price - minPrice) / priceRange) * innerHeight;
    return { x, y, p, i };
  });

  const sentCoords = points.map((p, i) => {
    const x = paddingX + (i / (points.length - 1)) * innerWidth;
    const y = svgHeight - paddingY - ((p.sentiment - minSent) / sentRange) * innerHeight;
    return { x, y, p, i };
  });

  const sentPathD = sentCoords.reduce((acc, curr, i, arr) => {
    if (i === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[i - 1];
    const cx1 = prev.x + (curr.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (curr.x - prev.x) / 2;
    const cy2 = curr.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr.x} ${curr.y}`;
  }, "");

  const sentAreaD = `${sentPathD} L ${sentCoords[sentCoords.length - 1].x} ${
    svgHeight - paddingY
  } L ${sentCoords[0].x} ${svgHeight - paddingY} Z`;

  const pricePathD = priceCoords.reduce((acc, curr, i, arr) => {
    if (i === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[i - 1];
    const cx1 = prev.x + (curr.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (curr.x - prev.x) / 2;
    const cy2 = curr.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr.x} ${curr.y}`;
  }, "");

  return (
    <section id="sentiment" className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Realtime FinBERT Sentiment Distribution
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            AI Sentiment Tracker & Trajectory
          </h2>
          <p className="text-sm text-slate-600 mt-1.5 font-normal">
            Classifying millions of real-time financial headlines into positive, neutral, and negative buckets with trend trajectory analysis.
          </p>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* 1. Positive */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200/90 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Positive Sentiment
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-bold">
                <TrendingUp className="size-3" />
                +4.8% vs last week
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              64.2%
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                style={{ width: "64.2%" }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
              <span>9,120 Headlines</span>
              <span>Bullish Narrative Dominance</span>
            </div>
          </div>

          {/* 2. Neutral */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200/90 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Neutral Sentiment
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">
                -1.2% steady
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              23.5%
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-400 rounded-full transition-all duration-700"
                style={{ width: "23.5%" }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
              <span>3,340 Headlines</span>
              <span>Routine Regulatory & Balance Data</span>
            </div>
          </div>

          {/* 3. Negative */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200/90 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Negative Sentiment
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                <TrendingDown className="size-3" />
                -3.6% improvement
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              12.3%
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full transition-all duration-700"
                style={{ width: "12.3%" }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
              <span>1,740 Headlines</span>
              <span>Mild Crude & Forex Headwinds</span>
            </div>
          </div>
        </div>

        {/* Main Trajectory Chart Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Card Title & Timeframe Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Price vs. Sentiment Divergence Correlation Trajectory
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Observed price action mapped against algorithmic headline sentiment index.
              </p>
            </div>

            {/* Timeframe Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              {(["1D", "1W", "1M"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTimeframe(t);
                    setActivePointIndex(1);
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    timeframe === t
                      ? "bg-white text-emerald-700 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chart Area */}
          <div className="relative w-full overflow-x-auto">
            <div className="min-w-[650px] sm:min-w-full">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-64 overflow-visible">
                <defs>
                  <linearGradient id="sentAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line
                  x1={paddingX}
                  y1={paddingY}
                  x2={svgWidth - paddingX}
                  y2={paddingY}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <line
                  x1={paddingX}
                  y1={svgHeight / 2}
                  x2={svgWidth - paddingX}
                  y2={svgHeight / 2}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <line
                  x1={paddingX}
                  y1={svgHeight - paddingY}
                  x2={svgWidth - paddingX}
                  y2={svgHeight - paddingY}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />

                {/* Sentiment Area Gradient */}
                <path d={sentAreaD} fill="url(#sentAreaGradient)" />

                {/* Sentiment Spline Curve (Green) */}
                <path
                  d={sentPathD}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Price Spline Curve (Slate / Dark) */}
                <path
                  d={pricePathD}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2.2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />

                {/* Points & Interactive Event Pins */}
                {sentCoords.map((coord, i) => {
                  const isSelected = activePointIndex === i;
                  const hasEvent = Boolean(coord.p.event);

                  return (
                    <g
                      key={i}
                      className="cursor-pointer transition-transform"
                      onClick={() => setActivePointIndex(i)}
                    >
                      {/* Vertical Indicator Line on Selected */}
                      {isSelected && (
                        <line
                          x1={coord.x}
                          y1={paddingY}
                          x2={coord.x}
                          y2={svgHeight - paddingY}
                          stroke="#10b981"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                      )}

                      {/* Event Marker Pin */}
                      {hasEvent && (
                        <g transform={`translate(${coord.x}, ${coord.y - 24})`}>
                          <rect
                            x="-45"
                            y="-16"
                            width="90"
                            height="18"
                            rx="5"
                            fill="#0f172a"
                            className="shadow-sm"
                          />
                          <text
                            x="0"
                            y="-4"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="9"
                            fontWeight="bold"
                          >
                            News Catalyst
                          </text>
                          <polygon points="-4,2 4,2 0,7" fill="#0f172a" />
                        </g>
                      )}

                      {/* Point Circle */}
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r={isSelected ? 6 : 4}
                        fill={isSelected ? "#059669" : "#10b981"}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="transition-all hover:scale-125"
                      />

                      {/* X-Axis Label */}
                      <text
                        x={coord.x}
                        y={svgHeight - paddingY + 18}
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="11"
                        fontWeight="500"
                      >
                        {coord.p.time}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Chart Legend & Selected Point Inspector Box */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            {/* Legend */}
            <div className="flex items-center gap-6 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
                <span className="font-semibold">FinBERT Sentiment Score</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-slate-700 border-t border-dashed border-slate-700" />
                <span className="font-semibold">NIFTY 50 Price Action</span>
              </div>
            </div>

            {/* Active Inspector Callout */}
            {activePoint && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-wrap items-center gap-4">
                <div>
                  <span className="text-slate-600 block text-[10px]">TIME</span>
                  <span className="font-bold text-slate-900">{activePoint.time}</span>
                </div>
                <div>
                  <span className="text-slate-600 block text-[10px]">PRICE</span>
                  <span className="font-bold text-slate-900">{activePoint.price.toLocaleString("en-IN")}</span>
                </div>
                <div>
                  <span className="text-slate-600 block text-[10px]">SENTIMENT</span>
                  <span className="font-bold text-emerald-700">{activePoint.sentiment} / 100</span>
                </div>
                {activePoint.event && (
                  <div className="border-l border-slate-300 pl-3">
                    <span className="text-emerald-700 font-bold block text-[10px]">EVENT DETECTED</span>
                    <span className="font-medium text-slate-800">{activePoint.event}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
