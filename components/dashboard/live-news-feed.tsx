"use client";

import React, { useState } from "react";
import { Newspaper, ExternalLink, Filter, Sparkles, Tag, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NewsCardItem {
  id: string;
  symbol: string;
  sector: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  timeAgo: string;
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
  sentimentScore: number;
  drivers: string[];
  finbertExplanation?: string;
}

const DEFAULT_NEWS: NewsCardItem[] = [
  {
    id: "n-1",
    symbol: "NVDA",
    sector: "Technology",
    title: "NVIDIA Unveils Next-Gen AI Silicon With Massive Hyperscaler Commitments",
    summary:
      "Enterprise customer backlog surges past $40B as tier-1 cloud providers double capex for high-density generative AI clusters.",
    source: "Bloomberg",
    url: "https://bloomberg.com",
    timeAgo: "18m ago",
    sentiment: "positive",
    confidence: 0.96,
    sentimentScore: 0.92,
    drivers: ["Enterprise Capex", "Chip Demand", "Margin Expansion"],
    finbertExplanation: "Google Cloud NLP: Score +0.92, Magnitude 0.95. Strong bullish polarity detected.",
  },
  {
    id: "n-2",
    symbol: "RELIANCE",
    sector: "Energy",
    title: "Reliance Q3 Preview: Oil-to-Chemicals Margin Recovery and 5G Monetization in Focus",
    summary:
      "Analysts forecast 14% YoY consolidated EBITDA expansion supported by robust telecom ARPU gains and retail store expansion.",
    source: "Economic Times",
    url: "https://economictimes.indiatimes.com",
    timeAgo: "45m ago",
    sentiment: "positive",
    confidence: 0.89,
    sentimentScore: 0.78,
    drivers: ["ARPU Expansion", "Retail Footprint", "EBITDA Growth"],
    finbertExplanation: "Google Cloud NLP: Score +0.78. Constructive tone on telecom monetization.",
  },
  {
    id: "n-3",
    symbol: "TCS",
    sector: "Technology",
    title: "TCS Notes Sluggish Discretionary IT Spend Across European Banking Clients",
    summary:
      "Management highlights prolonged decision cycles in consulting projects despite steady mega-deal conversions.",
    source: "Reuters",
    url: "https://reuters.com",
    timeAgo: "1h ago",
    sentiment: "negative",
    confidence: 0.82,
    sentimentScore: -0.64,
    drivers: ["Discretionary Cut", "Delayed Decision Cycles", "Europe Slowdown"],
    finbertExplanation: "Google Cloud NLP: Score -0.64. Bearish sentiment on delayed banking decisions.",
  },
  {
    id: "n-4",
    symbol: "TSLA",
    sector: "Automotive",
    title: "Tesla Faces Escalating Price Wars in Asian EV Markets as Inventories Rise",
    summary:
      "Intensified price cuts by domestic EV manufacturers prompt margin downgrades from multiple Wall Street brokerages.",
    source: "Wall Street Journal",
    url: "https://wsj.com",
    timeAgo: "3h ago",
    sentiment: "negative",
    confidence: 0.91,
    sentimentScore: -0.74,
    drivers: ["Price War", "Inventory Buildup", "Margin Compression"],
    finbertExplanation: "Google Cloud NLP: Score -0.74. High negative conviction on gross margins.",
  },
];

export function LiveNewsFeed({ news = DEFAULT_NEWS }: { news?: NewsCardItem[] }) {
  const [activeFilter, setActiveFilter] = useState<"ALL" | "positive" | "negative" | "neutral">("ALL");

  const filteredNews = news.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.sentiment === activeFilter;
  });

  return (
    <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-xs overflow-hidden">
      <CardHeader className="p-4 pb-2 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Newspaper className="size-4 text-emerald-500" />
          <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
            Financial News & Sentiment Feed
          </CardTitle>
          <Badge variant="outline" className="text-[10px] font-mono">
            {filteredNews.length} Stories
          </Badge>
        </div>

        {/* Polarity Filters */}
        <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveFilter("ALL")}
            className={cn(
              "px-2.5 py-0.5 rounded-md font-medium transition-all cursor-pointer text-[11px]",
              activeFilter === "ALL" ? "bg-background text-foreground shadow-2xs font-semibold" : "text-muted-foreground"
            )}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("positive")}
            className={cn(
              "px-2.5 py-0.5 rounded-md font-medium transition-all cursor-pointer text-[11px]",
              activeFilter === "positive"
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "text-muted-foreground"
            )}
          >
            Bullish
          </button>
          <button
            onClick={() => setActiveFilter("negative")}
            className={cn(
              "px-2.5 py-0.5 rounded-md font-medium transition-all cursor-pointer text-[11px]",
              activeFilter === "negative"
                ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-semibold"
                : "text-muted-foreground"
            )}
          >
            Bearish
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-4 divide-y divide-border/60 space-y-3">
        {filteredNews.map((item) => {
          const isPos = item.sentiment === "positive";
          const isNeg = item.sentiment === "negative";

          return (
            <div key={item.id} className="pt-3 first:pt-0 space-y-2 group">
              {/* Header row: Source, Time, Symbol, Sentiment Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="secondary" className="font-mono text-[10px] px-1.5 py-0">
                    {item.symbol}
                  </Badge>
                  <span className="font-medium text-foreground">{item.source}</span>
                  <span className="text-muted-foreground text-[11px]">• {item.timeAgo}</span>
                </div>

                <Badge
                  className={cn(
                    "text-[10px] font-mono font-semibold",
                    isPos
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      : isNeg
                      ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30"
                      : "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30"
                  )}
                >
                  {isPos ? "Bullish" : isNeg ? "Bearish" : "Neutral"}{" "}
                  {item.sentimentScore > 0 ? `+${(item.sentimentScore * 100).toFixed(0)}%` : `${(item.sentimentScore * 100).toFixed(0)}%`}
                </Badge>
              </div>

              {/* Title & Summary */}
              <h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-emerald-500 transition-colors leading-snug">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                  {item.title}
                  <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.summary}</p>

              {/* Catalysts & NLP reasoning */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {item.drivers.map((d, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/60 text-[10px] text-muted-foreground border border-border/50"
                  >
                    <Tag className="size-2.5" />
                    {d}
                  </span>
                ))}
                {item.finbertExplanation && (
                  <span className="text-[10px] text-muted-foreground italic ml-auto hidden sm:inline">
                    {item.finbertExplanation}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
