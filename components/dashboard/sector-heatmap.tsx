"use client";

import React from "react";
import { Layers, TrendingUp, TrendingDown, ChevronRight, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface SectorItem {
  id: string;
  name: string;
  sentimentScore: number; // -1.0 to 1.0
  sentimentLabel: "Bullish" | "Bearish" | "Neutral";
  change24h: number;
  stockCount: number;
  topStock: string;
  topDriver: string;
}

const DEFAULT_SECTORS: SectorItem[] = [
  {
    id: "tech",
    name: "Technology & AI",
    sentimentScore: 0.72,
    sentimentLabel: "Bullish",
    change24h: 1.9,
    stockCount: 18,
    topStock: "NVDA",
    topDriver: "Datacenter AI GPU Demand & Cloud Capex",
  },
  {
    id: "banking",
    name: "Banking & Financials",
    sentimentScore: 0.48,
    sentimentLabel: "Bullish",
    change24h: 0.4,
    stockCount: 14,
    topStock: "HDFCBANK",
    topDriver: "Deposit Growth & Credit Expansion",
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    sentimentScore: 0.62,
    sentimentLabel: "Bullish",
    change24h: 1.1,
    stockCount: 11,
    topStock: "RELIANCE",
    topDriver: "Refining Margin Recovery & Green Energy",
  },
  {
    id: "auto",
    name: "Automotive & EV",
    sentimentScore: -0.15,
    sentimentLabel: "Neutral",
    change24h: -0.8,
    stockCount: 9,
    topStock: "TATAMOTORS",
    topDriver: "EV Margin Pressures vs Domestic PVs",
  },
  {
    id: "pharma",
    name: "Healthcare & Pharma",
    sentimentScore: 0.35,
    sentimentLabel: "Neutral",
    change24h: 0.3,
    stockCount: 12,
    topStock: "SUNPHARMA",
    topDriver: "US FDA Approvals & Pipeline Strength",
  },
  {
    id: "fmcg",
    name: "FMCG & Consumer",
    sentimentScore: 0.18,
    sentimentLabel: "Neutral",
    change24h: 0.1,
    stockCount: 8,
    topStock: "ITC",
    topDriver: "Rural Demand Recovery & Stable Costs",
  },
];

export function SectorHeatmap({
  sectors = DEFAULT_SECTORS,
  onSelectSector,
}: {
  sectors?: SectorItem[];
  onSelectSector?: (id: string) => void;
}) {
  return (
    <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-xs overflow-hidden">
      <CardHeader className="p-4 pb-2 border-b border-border/60 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-emerald-500" />
          <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
            Sector-Wise Sentiment Matrix
          </CardTitle>
        </div>
        <span className="text-[11px] text-muted-foreground font-mono">6 Tracked Sectors</span>
      </CardHeader>

      <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sectors.map((s) => {
          const isBullish = s.sentimentScore > 0.2;
          const isBearish = s.sentimentScore < -0.1;

          return (
            <div
              key={s.id}
              onClick={() => onSelectSector?.(s.id)}
              className={cn(
                "p-3.5 rounded-xl border transition-all cursor-pointer hover:scale-[1.01] hover:shadow-sm flex flex-col justify-between space-y-2",
                isBullish
                  ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40"
                  : isBearish
                  ? "bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40"
                  : "bg-slate-500/5 border-slate-500/20 hover:border-slate-500/40"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-semibold text-foreground tracking-tight">{s.name}</h4>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {s.stockCount} equities • Top: {s.topStock}
                  </span>
                </div>

                <Badge
                  className={cn(
                    "text-[10px] font-semibold font-mono",
                    isBullish
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      : isBearish
                      ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30"
                      : "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30"
                  )}
                >
                  {(s.sentimentScore * 100).toFixed(0)}%
                </Badge>
              </div>

              {/* Driver note */}
              <p className="text-[11px] text-muted-foreground line-clamp-1 italic">
                "{s.topDriver}"
              </p>

              {/* Bottom bar */}
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-border/40 font-mono">
                <span className="text-muted-foreground">24h Shift</span>
                <span
                  className={cn(
                    "font-semibold flex items-center gap-0.5",
                    s.change24h >= 0 ? "text-emerald-500" : "text-rose-500"
                  )}
                >
                  {s.change24h >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                  {s.change24h >= 0 ? "+" : ""}
                  {s.change24h}%
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
