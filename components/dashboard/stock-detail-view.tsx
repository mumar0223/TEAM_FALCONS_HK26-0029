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
  Newspaper,
  ExternalLink,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { StockListItem } from "./stock-list-sidebar";

const TIMEFRAMES = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

export interface DetailedNewsArticle {
  id: string;
  headline: string;
  summary: string;
  source: string;
  url: string;
  timeAgo: string;
  sentiment: "positive" | "negative" | "neutral";
  nlpScore: number; // -1.0 to +1.0
  nlpMagnitude: number; // 0.0 to 2.5
  drivers: string[];
  nlpRationale: string;
}

// Sample dataset tailored for various stocks
const STOCK_NEWS_DB: Record<string, DetailedNewsArticle[]> = {
  AAPL: [
    {
      id: "aapl-1",
      headline: "Apple Expands Private AI Cloud Infrastructure With Next-Gen Silicon Deals",
      summary:
        "Supply chain checks indicate Apple has accelerated custom server chip tape-outs to support on-device and private cloud generative intelligence rollouts across 1.2B active iPhones.",
      source: "Bloomberg",
      url: "https://www.bloomberg.com/news/articles/2026-03-24/apple-accelerates-ai-server-chips",
      timeAgo: "22m ago",
      sentiment: "positive",
      nlpScore: 0.86,
      nlpMagnitude: 0.92,
      drivers: ["AI Server Silicon", "Device Replacement Cycle", "Services Margin"],
      nlpRationale:
        "Google Cloud NLP classified high positive polarity (+0.86) driven by accelerated capex commitments and hardware-software integration.",
    },
    {
      id: "aapl-2",
      headline: "Greater China iPhone Shipments Stabilize in Q1 Following Strategic Retail Discounts",
      summary:
        "Channel inventory across tier-1 Chinese cities normalized as local promotional pricing countered aggressive domestic competition from Huawei and Xiaomi.",
      source: "Reuters",
      url: "https://www.reuters.com/technology/apple-china-shipments-stabilize-q1-2026-03-24/",
      timeAgo: "1h ago",
      sentiment: "positive",
      nlpScore: 0.42,
      nlpMagnitude: 0.65,
      drivers: ["China Stabilization", "Channel Inventory", "Promotional Elasticity"],
      nlpRationale:
        "Moderate bullish score (+0.42). Rebound in unit sell-through offsets concerns over pricing concessions.",
    },
    {
      id: "aapl-3",
      headline: "EU Antitrust Regulators Scrutinize Alternative App Store Developer Fees",
      summary:
        "European Commission opens preliminary inquiry into Apple's Core Technology Fee, evaluating compliance with Digital Markets Act interoperability rules.",
      source: "Wall Street Journal",
      url: "https://www.wsj.com/tech/apple-eu-inquiry-dma-compliance-2026",
      timeAgo: "3h ago",
      sentiment: "negative",
      nlpScore: -0.54,
      nlpMagnitude: 0.78,
      drivers: ["EU Regulatory Risk", "App Store Monitization", "DMA Compliance"],
      nlpRationale:
        "Negative sentiment (-0.54). Regulatory friction introduces potential legal expenses and services revenue uncertainty.",
    },
  ],
  RELIANCE: [
    {
      id: "rel-1",
      headline: "Reliance Q3 EBITDA Expands 14% YoY on Strong Jio ARPU Growth and Retail Footprint",
      summary:
        "Consolidated quarterly earnings beat consensus expectations as telecom subscriber monetization and festive grocery retail footfalls reached all-time highs.",
      source: "The Economic Times",
      url: "https://economictimes.indiatimes.com/markets/stocks/news/reliance-q3-results-preview",
      timeAgo: "18m ago",
      sentiment: "positive",
      nlpScore: 0.91,
      nlpMagnitude: 0.95,
      drivers: ["Telecom ARPU", "Retail EBITDA", "Debt Deleveraging"],
      nlpRationale:
        "Strong bullish polarity (+0.91). Key drivers include margin expansion and accelerated digital monetization.",
    },
    {
      id: "rel-2",
      headline: "Reliance New Energy Completes Electrolyzer Gigafactory Phase 1 in Jamnagar",
      summary:
        "Commercial test runs begin for pressurized alkaline electrolyzers, positioning Reliance to achieve green hydrogen production costs below $1.5/kg by 2027.",
      source: "LiveMint",
      url: "https://www.livemint.com/companies/news/reliance-jamnagar-gigafactory-green-hydrogen",
      timeAgo: "2h ago",
      sentiment: "positive",
      nlpScore: 0.74,
      nlpMagnitude: 0.81,
      drivers: ["Green Hydrogen", "Capex Commissioning", "Clean Tech"],
      nlpRationale:
        "Constructive tone (+0.74) recognizing milestone completion of strategic long-term capital investments.",
    },
  ],
  NVDA: [
    {
      id: "nvda-1",
      headline: "NVIDIA Unveils Next-Gen AI Datacenter Silicon With Massive Cloud Commitments",
      summary:
        "Enterprise hyperscaler backlog surges past $42B as Microsoft, Google, AWS, and Meta double forward purchases for high-density AI superclusters.",
      source: "Bloomberg",
      url: "https://www.bloomberg.com/technology/nvidia-datacenter-ai-orders-surge",
      timeAgo: "15m ago",
      sentiment: "positive",
      nlpScore: 0.95,
      nlpMagnitude: 0.98,
      drivers: ["Hyperscaler Capex", "Datacenter Backlog", "Gross Margins"],
      nlpRationale:
        "Exceptional bullish score (+0.95, magnitude 0.98). Sustained pricing power and record enterprise commitments.",
    },
  ],
  TCS: [
    {
      id: "tcs-1",
      headline: "TCS Highlights Sluggish Discretionary IT Spend Across European Banking Clients",
      summary:
        "Management notes extended decision-making cycles in high-margin advisory consulting projects despite healthy mega-deal order book conversions.",
      source: "Reuters",
      url: "https://www.reuters.com/business/tcs-notes-client-delays-europe-2026",
      timeAgo: "45m ago",
      sentiment: "negative",
      nlpScore: -0.64,
      nlpMagnitude: 0.85,
      drivers: ["Discretionary Cut", "Europe Banking Slowdown", "Consulting Margin"],
      nlpRationale:
        "High negative polarity (-0.64). Cautionary executive commentary on discretionary tech budgets.",
    },
  ],
  TSLA: [
    {
      id: "tsla-1",
      headline: "Tesla Faces Escalating Price Wars Across Asian EV Markets as Inventories Rise",
      summary:
        "Intensified price cuts by domestic EV manufacturers prompt brokerage gross margin downgrades for Q1 automotive deliveries.",
      source: "Wall Street Journal",
      url: "https://www.wsj.com/business/autos/tesla-ev-price-competition-asia-margins",
      timeAgo: "1h ago",
      sentiment: "negative",
      nlpScore: -0.74,
      nlpMagnitude: 0.91,
      drivers: ["Price War", "Inventory Buildup", "Auto Gross Margin"],
      nlpRationale:
        "High negative conviction (-0.74). Persistent gross margin compression and rising finished goods inventories.",
    },
  ],
};

const DEFAULT_NEWS_FALLBACK: DetailedNewsArticle[] = [
  {
    id: "gen-1",
    headline: "Global Equity Markets Digest Macro Signals as Central Banks Signal Rate Flexibility",
    summary:
      "Benchmark indices maintain positive breadth as corporate earnings resilience offsets ongoing geopolitical commodity price volatility.",
    source: "Bloomberg",
    url: "https://www.bloomberg.com/markets",
    timeAgo: "25m ago",
    sentiment: "positive",
    nlpScore: 0.62,
    nlpMagnitude: 0.74,
    drivers: ["Macro Flexibility", "Corporate Earnings", "Liquidity Breadth"],
    nlpRationale:
      "Moderate positive polarity (+0.62) driven by institutional equity inflows and easing bond yields.",
  },
];

// Sample intraday chart data points
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
  const [newsFilter, setNewsFilter] = useState<"ALL" | "positive" | "negative">("ALL");

  const newsList = STOCK_NEWS_DB[stock.symbol] || DEFAULT_NEWS_FALLBACK;
  const filteredNews = newsList.filter((item) => {
    if (newsFilter === "ALL") return true;
    return item.sentiment === newsFilter;
  });

  const minPrice = stock.rawPrice * 0.985;
  const maxPrice = stock.rawPrice * 1.015;

  return (
    <div className="flex-1 h-full overflow-y-auto p-4 sm:p-6 flex flex-col space-y-6 custom-scrollbar select-none">
      {/* 1. Top Header of Selected Stock */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70 shrink-0">
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

      {/* 2. Main Dual-Axis Interactive Chart Area */}
      <div className="w-full h-[320px] sm:h-[360px] rounded-2xl border border-border/80 bg-card/50 p-3 pt-2 relative overflow-hidden shrink-0">
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

            <Area
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#detailPriceGradient)"
            />

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

      {/* 3. Performance & Conviction Indicators (Matching reference image) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 shrink-0">
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
            Sector Benchmark: {stock.sectorName || "Global Tech"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">
              Google NLP Conviction
            </span>
            <span className="text-xs font-mono font-bold text-cyan-400">
              {(stock.sentimentScore * 100).toFixed(0)}%
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
              <span>Bearish (-1.0)</span>
              <span>Neutral (0.0)</span>
              <span>Bullish (+1.0)</span>
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
            <span>High conviction buying pace</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-col justify-between space-y-2">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">
            Divergence Alert Radar
          </span>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {stock.sentimentScore > 0 && !stock.isPositive
              ? `Bullish Divergence: Sentiment is surging (+${(stock.sentimentScore * 100).toFixed(0)}%) while price is temporarily lagging (${stock.change}).`
              : stock.sentimentScore < 0 && stock.isPositive
              ? `Bearish Distribution: Sentiment is deteriorating while price is floating upward.`
              : `Price and public sentiment are moving in synchronized momentum.`}
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono pt-1 border-t border-border/50">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>Status: Verified by Google NLP</span>
          </div>
        </div>
      </div>

      {/* 4. DETAILED FINANCIAL NEWS ARTICLES & NLP CLASSIFICATION CARDS */}
      <div className="rounded-2xl border border-border/80 bg-card/50 p-4 space-y-4">
        {/* News Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
          <div className="flex items-center gap-2">
            <Newspaper className="size-4 text-emerald-500" />
            <h2 className="text-sm font-bold text-foreground tracking-tight">
              Financial News & Google Cloud NLP Sentiment Stream
            </h2>
            <Badge variant="outline" className="font-mono text-[10px]">
              {filteredNews.length} Stories for {stock.symbol}
            </Badge>
          </div>

          {/* Sentiment Filter Pills */}
          <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg text-xs font-mono self-start sm:self-center">
            <button
              onClick={() => setNewsFilter("ALL")}
              className={cn(
                "px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer",
                newsFilter === "ALL" ? "bg-background text-foreground shadow-2xs font-semibold" : "text-muted-foreground"
              )}
            >
              All
            </button>
            <button
              onClick={() => setNewsFilter("positive")}
              className={cn(
                "px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer",
                newsFilter === "positive"
                  ? "bg-emerald-500/15 text-emerald-400 font-semibold"
                  : "text-muted-foreground"
              )}
            >
              Bullish (+)
            </button>
            <button
              onClick={() => setNewsFilter("negative")}
              className={cn(
                "px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer",
                newsFilter === "negative"
                  ? "bg-rose-500/15 text-rose-400 font-semibold"
                  : "text-muted-foreground"
              )}
            >
              Bearish (-)
            </button>
          </div>
        </div>

        {/* Detailed News Cards List */}
        <div className="space-y-3.5">
          {filteredNews.map((article) => {
            const isBullish = article.sentiment === "positive";
            const isBearish = article.sentiment === "negative";

            return (
              <div
                key={article.id}
                className={cn(
                  "p-4 rounded-xl border transition-all space-y-3 group",
                  isBullish
                    ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40"
                    : isBearish
                    ? "bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40"
                    : "bg-card/40 border-border/60 hover:border-border"
                )}
              >
                {/* Top Row: Source, Time, External Link, and Google Cloud NLP Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-foreground font-mono">{article.source}</span>
                    <span className="text-muted-foreground text-[11px] font-mono">• {article.timeAgo}</span>
                  </div>

                  {/* Google Cloud NLP Polarity & Score Pill */}
                  <div className="flex items-center gap-2">
                    <Badge
                      className={cn(
                        "text-[10px] font-mono font-semibold px-2 py-0.5",
                        isBullish
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : isBearish
                          ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                          : "bg-slate-500/15 text-slate-400 border-slate-500/30"
                      )}
                    >
                      {isBullish ? "Bullish" : isBearish ? "Bearish" : "Neutral"}{" "}
                      {article.nlpScore > 0 ? `+${(article.nlpScore * 100).toFixed(0)}%` : `${(article.nlpScore * 100).toFixed(0)}%`}
                    </Badge>

                    <Badge variant="outline" className="font-mono text-[9px] text-muted-foreground">
                      Mag: {article.nlpMagnitude}
                    </Badge>
                  </div>
                </div>

                {/* Clickable Article Headline opening external source page in new tab */}
                <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-emerald-400 transition-colors leading-snug">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:underline cursor-pointer"
                    title="Click to open full article source page"
                  >
                    {article.headline}
                    <ExternalLink className="size-3.5 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                </h3>

                {/* Summary Snippet */}
                <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                  {article.summary}
                </p>

                {/* Key Drivers & Google Cloud NLP Rationale Callout */}
                <div className="pt-2 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  {/* Entity Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {article.drivers.map((driver, dIdx) => (
                      <span
                        key={dIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/70 text-[10px] text-muted-foreground font-mono border border-border/50"
                      >
                        <Tag className="size-2.5 text-emerald-500" />
                        {driver}
                      </span>
                    ))}
                  </div>

                  {/* Direct button to source */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
                  >
                    Read on {article.source} <ArrowRight className="size-3" />
                  </a>
                </div>

                {/* NLP Linguistic Reasoning Note */}
                <div className="p-2 rounded-lg bg-card/60 border border-border/40 text-[11px] text-muted-foreground/90 font-mono flex items-start gap-1.5">
                  <Sparkles className="size-3 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{article.nlpRationale}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
