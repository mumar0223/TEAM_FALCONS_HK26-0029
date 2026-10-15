"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Clock,
  Gauge,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { StockListItem } from "./stock-list-sidebar";

const TIMEFRAMES = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

// High-fidelity intraday chart data points
const SAMPLE_CHART_SERIES = [
  { time: "09:30", price: 194.2, sentiment: 0.35, volume: 1800 },
  { time: "10:15", price: 195.8, sentiment: 0.42, volume: 2200 },
  { time: "11:00", price: 195.1, sentiment: 0.38, volume: 1400 },
  { time: "11:45", price: 196.9, sentiment: 0.52, volume: 2900 },
  { time: "12:30", price: 198.4, sentiment: 0.65, volume: 3400 },
  { time: "13:15", price: 197.8, sentiment: 0.61, volume: 2100 },
  { time: "14:00", price: 199.5, sentiment: 0.74, volume: 4100 },
  { time: "14:45", price: 201.2, sentiment: 0.79, volume: 4800 },
  { time: "15:30", price: 198.76, sentiment: 0.72, volume: 5600 },
];

export function StockDetailView({ stock }: { stock: StockListItem }) {
  const [selectedTf, setSelectedTf] = useState("1D");

  const minPrice = stock.rawPrice * 0.985;
  const maxPrice = stock.rawPrice * 1.015;

  return (
    <div className="flex-1 h-full overflow-y-auto p-4 sm:p-5 flex flex-col space-y-4 custom-scrollbar select-none">
      {/* Top Header of Selected Stock */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-mono">
              {stock.symbol}
            </h1>
            <span className="text-xs text-muted-foreground font-mono">/ {stock.exchange}</span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-mono text-emerald-500 border-emerald-500/30">
              LAST ✓
            </Badge>
          </div>

          <div className="flex flex-wrap items-baseline gap-2.5 mt-1 font-mono">
            <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
              {stock.currency === "INR" ? "₹" : "$"}
              {stock.price}
            </span>

            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded",
                stock.isPositive
                  ? "text-emerald-500 bg-emerald-500/10"
                  : "text-rose-500 bg-rose-500/10"
              )}
            >
              {stock.isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {stock.change}
            </span>

            <span className="text-xs text-muted-foreground">Volume: 56.72M</span>
          </div>
        </div>

        {/* Timeframe Buttons matching image */}
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg self-start sm:self-center font-mono">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTf(tf)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
                selectedTf === tf
                  ? "bg-background text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual-Axis Interactive Chart Area matching reference image */}
      <div className="w-full h-[320px] sm:h-[360px] rounded-2xl border border-border/80 bg-card/50 p-3 pt-2 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-2 px-1">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="text-foreground font-medium">Stock Price</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-cyan-400" />
              <span className="text-foreground font-medium">Google NLP Sentiment</span>
            </div>
          </div>
          <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px]">
            {stock.sentimentLabel} {(stock.sentimentScore * 100).toFixed(0)}%
          </Badge>
        </div>

        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart data={SAMPLE_CHART_SERIES} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="detailPriceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.07} />

            <XAxis dataKey="time" stroke="currentColor" opacity={0.5} tick={{ fontSize: 11 }} tickLine={false} />

            <YAxis
              yAxisId="price"
              domain={[minPrice, maxPrice]}
              stroke="currentColor"
              opacity={0.5}
              tick={{ fontSize: 11 }}
              tickLine={false}
              tickFormatter={(v) => v.toFixed(1)}
            />

            <YAxis
              yAxisId="sentiment"
              orientation="right"
              domain={[-1.0, 1.0]}
              stroke="#06b6d4"
              opacity={0.6}
              tick={{ fontSize: 11 }}
              tickLine={false}
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="p-3 bg-popover/95 backdrop-blur-md border border-border rounded-xl shadow-lg text-xs space-y-1 font-mono">
                      <p className="text-muted-foreground pb-1 border-b border-border/50">Time: {d.time}</p>
                      <p className="text-emerald-500 font-bold">Price: {stock.currency === "INR" ? "₹" : "$"}{d.price}</p>
                      <p className="text-cyan-400 font-bold">NLP Sentiment: {(d.sentiment * 100).toFixed(1)}%</p>
                      <p className="text-muted-foreground text-[10px]">Volume: {d.volume}k shares</p>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Price Area */}
            <Area
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#detailPriceGradient)"
            />

            {/* Sentiment Overlay Line */}
            <Line
              yAxisId="sentiment"
              type="monotone"
              dataKey="sentiment"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ r: 3, fill: "#06b6d4" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Lower Metrics & Sentiment Radar matching image bottom cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
        {/* Performance Box */}
        <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between space-y-2">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">
            Performance Track
          </span>
          <div className="space-y-1 font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Since Jan:</span>
              <span className="text-emerald-500 font-bold">+113.72%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">1 Year Return:</span>
              <span className="text-emerald-500 font-bold">+57.95%</span>
            </div>
          </div>
          <div className="pt-1 border-t border-border/50 text-[11px] font-bold text-foreground font-mono">
            Valuation: $187,450.42
          </div>
        </div>

        {/* Sentiment Conviction & RSI */}
        <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">
              Sentiment Conviction
            </span>
            <span className="text-xs font-mono font-bold text-cyan-400">
              {(stock.sentimentScore * 100).toFixed(0)}%
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
              <span>Bearish</span>
              <span>Neutral</span>
              <span>Bullish</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden flex">
              <div
                className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500"
                style={{ width: `${Math.round(((stock.sentimentScore + 1) / 2) * 100)}%` }}
              />
            </div>
          </div>

          <div className="text-[11px] text-emerald-500 font-mono font-medium flex items-center gap-1">
            <Zap className="size-3" />
            <span>High accumulation momentum</span>
          </div>
        </div>

        {/* Live Catalysts for Selected Stock */}
        <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between space-y-2">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">
            Live Catalysts & Signals
          </span>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            Google Cloud NLP identified strong contract backlog and cloud margin expansion as primary drivers.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono pt-1 border-t border-border/50">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>Divergence: Normal consolidation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
