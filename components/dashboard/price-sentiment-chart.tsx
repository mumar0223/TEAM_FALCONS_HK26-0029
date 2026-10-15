"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Layers, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChartDataPoint {
  dateLabel: string;
  price: number;
  sentimentScore: number; // -1.0 to 1.0
  sentimentNormalized: number; // 0 to 100
  volume: number;
}

interface PriceSentimentChartProps {
  symbol?: string;
  currency?: "INR" | "USD";
  data?: ChartDataPoint[];
  currentPrice?: number;
  changePercent?: number;
  sentimentLabel?: string;
  onSymbolChange?: (symbol: string) => void;
}

const AVAILABLE_STOCKS = [
  { symbol: "RELIANCE", name: "Reliance", currency: "INR" },
  { symbol: "NVDA", name: "Nvidia", currency: "USD" },
  { symbol: "NIFTY 50", name: "Nifty 50", currency: "INR" },
  { symbol: "TCS", name: "TCS", currency: "INR" },
  { symbol: "HDFCBANK", name: "HDFC Bank", currency: "INR" },
  { symbol: "AAPL", name: "Apple", currency: "USD" },
  { symbol: "TSLA", name: "Tesla", currency: "USD" },
];

const TIME_RANGES = ["1D", "1W", "1M", "3M", "1Y"];

// Default 24h sample data
const DEFAULT_CHART_DATA: ChartDataPoint[] = [
  { dateLabel: "09:15", price: 2940, sentimentScore: 0.35, sentimentNormalized: 67, volume: 1200 },
  { dateLabel: "10:00", price: 2955, sentimentScore: 0.42, sentimentNormalized: 71, volume: 1650 },
  { dateLabel: "10:45", price: 2948, sentimentScore: 0.40, sentimentNormalized: 70, volume: 980 },
  { dateLabel: "11:30", price: 2962, sentimentScore: 0.58, sentimentNormalized: 79, volume: 2400 },
  { dateLabel: "12:15", price: 2970, sentimentScore: 0.65, sentimentNormalized: 82, volume: 1890 },
  { dateLabel: "13:00", price: 2965, sentimentScore: 0.62, sentimentNormalized: 81, volume: 1300 },
  { dateLabel: "13:45", price: 2978, sentimentScore: 0.74, sentimentNormalized: 87, volume: 3100 },
  { dateLabel: "14:30", price: 2982, sentimentScore: 0.76, sentimentNormalized: 88, volume: 2750 },
  { dateLabel: "15:15", price: 2985.3, sentimentScore: 0.76, sentimentNormalized: 88, volume: 3600 },
];

export function PriceSentimentChart({
  symbol = "RELIANCE",
  currency = "INR",
  data = DEFAULT_CHART_DATA,
  currentPrice = 2985.3,
  changePercent = 1.45,
  sentimentLabel = "Bullish",
  onSymbolChange,
}: PriceSentimentChartProps) {
  const [selectedRange, setSelectedRange] = useState("1D");
  const isPositive = changePercent >= 0;

  const minPrice = Math.min(...data.map((d) => d.price)) * 0.995;
  const maxPrice = Math.max(...data.map((d) => d.price)) * 1.005;

  return (
    <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-xs overflow-hidden">
      <CardHeader className="p-4 pb-2 border-b border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Stock Info & Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {AVAILABLE_STOCKS.map((s) => (
                <button
                  key={s.symbol}
                  onClick={() => onSymbolChange?.(s.symbol)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer font-mono",
                    symbol === s.symbol
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {s.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg self-start sm:self-auto">
            {TIME_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={cn(
                  "px-2 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer",
                  selectedRange === range
                    ? "bg-background text-foreground shadow-2xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Sentiment Metrics Summary Bar */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 pt-3">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl font-bold font-mono text-foreground">
              {currency === "INR" ? "₹" : "$"}
              {currentPrice.toLocaleString()}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-mono text-xs font-semibold",
                isPositive ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {isPositive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
              {isPositive ? "+" : ""}
              {changePercent}%
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Price ($ / ₹)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-cyan-400" />
              <span className="text-muted-foreground">Google NLP Sentiment</span>
            </div>
            <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-semibold">
              {sentimentLabel}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="w-full h-[320px] sm:h-[360px] pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.08} />

              <XAxis
                dataKey="dateLabel"
                stroke="currentColor"
                opacity={0.5}
                tick={{ fontSize: 11 }}
                tickLine={false}
              />

              {/* Left Y-Axis: Stock Price */}
              <YAxis
                yAxisId="priceAxis"
                domain={[minPrice, maxPrice]}
                stroke="currentColor"
                opacity={0.5}
                tick={{ fontSize: 11 }}
                tickLine={false}
                tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toFixed(0))}
              />

              {/* Right Y-Axis: Sentiment Score (-1.0 to 1.0) */}
              <YAxis
                yAxisId="sentimentAxis"
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
                    const d = payload[0].payload as ChartDataPoint;
                    return (
                      <div className="p-3 bg-popover/95 backdrop-blur-md border border-border rounded-xl shadow-lg text-xs space-y-1.5 font-mono">
                        <p className="text-muted-foreground font-semibold border-b border-border/50 pb-1">
                          Time: {d.dateLabel}
                        </p>
                        <div className="flex justify-between gap-4">
                          <span className="text-emerald-500 font-medium">Price:</span>
                          <span className="font-bold text-foreground">
                            {currency === "INR" ? "₹" : "$"}
                            {d.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-cyan-400 font-medium">NLP Sentiment:</span>
                          <span className="font-bold text-foreground">
                            {(d.sentimentScore * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                          <span>Analyzed Buzz:</span>
                          <span>{d.volume} mentions</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Stock Price Area Line */}
              <Area
                yAxisId="priceAxis"
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#priceGradient)"
                name="Stock Price"
              />

              {/* Google NLP Sentiment Line */}
              <Line
                yAxisId="sentimentAxis"
                type="monotone"
                dataKey="sentimentScore"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ r: 3, fill: "#06b6d4" }}
                activeDot={{ r: 5 }}
                name="Google NLP Sentiment"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
