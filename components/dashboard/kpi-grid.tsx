"use client";

import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Gauge,
  Newspaper,
  Zap,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface KpiData {
  sentimentScore: number; // 0 - 100
  sentimentLabel: "Extreme Greed" | "Bullish" | "Neutral" | "Bearish" | "Extreme Fear";
  articlesCount: number;
  velocityPercent: number;
  divergenceCount: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
}

const DEFAULT_KPIS: KpiData = {
  sentimentScore: 71,
  sentimentLabel: "Bullish",
  articlesCount: 14820,
  velocityPercent: 12.4,
  divergenceCount: 3,
  positivePct: 65,
  neutralPct: 21,
  negativePct: 14,
};

export function KpiGrid({ data = DEFAULT_KPIS }: { data?: KpiData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* 1. Overall Market Sentiment Index */}
      <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Market Sentiment Index
            </span>
            <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Gauge className="size-4" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono tracking-tight text-foreground">
                {data.sentimentScore}
              </span>
              <span className="text-xs text-muted-foreground font-mono">/ 100</span>
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[11px] font-semibold">
                {data.sentimentLabel}
              </Badge>
            </div>

            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Fear</span>
                <span>Neutral</span>
                <span>Greed</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 transition-all duration-500"
                  style={{ width: `${data.sentimentScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
            <TrendingUp className="size-3" />
            <span>+6.2 pts from previous session</span>
          </div>
        </CardContent>
      </Card>

      {/* 2. 24h News & Discussions Analyzed */}
      <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              24h Analyzed Volume
            </span>
            <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Newspaper className="size-4" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono tracking-tight text-foreground">
                {data.articlesCount.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">articles & posts</span>
            </div>

            <div className="mt-3 flex h-2 rounded-full overflow-hidden bg-muted">
              <div
                title={`Bullish: ${data.positivePct}%`}
                className="bg-emerald-500 transition-all"
                style={{ width: `${data.positivePct}%` }}
              />
              <div
                title={`Neutral: ${data.neutralPct}%`}
                className="bg-slate-400 dark:bg-slate-500 transition-all"
                style={{ width: `${data.neutralPct}%` }}
              />
              <div
                title={`Bearish: ${data.negativePct}%`}
                className="bg-rose-500 transition-all"
                style={{ width: `${data.negativePct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-1">
            <span className="text-emerald-500 font-medium">{data.positivePct}% Pos</span>
            <span className="text-slate-400">{data.neutralPct}% Neu</span>
            <span className="text-rose-500 font-medium">{data.negativePct}% Neg</span>
          </div>
        </CardContent>
      </Card>

      {/* 3. Sentiment Velocity */}
      <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Sentiment Velocity
            </span>
            <div className="size-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500">
              <Zap className="size-4" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono tracking-tight text-foreground">
                +{data.velocityPercent}%
              </span>
              <span className="text-xs text-muted-foreground">/ 24 hours</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Rapid sentiment acceleration across Tech & Energy sectors.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-teal-600 dark:text-teal-400 font-medium pt-1">
            <ArrowUpRight className="size-3" />
            <span>High conviction buying pace</span>
          </div>
        </CardContent>
      </Card>

      {/* 4. Active Divergence Alerts */}
      <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Divergence Signals
            </span>
            <div className="size-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
              <AlertTriangle className="size-4" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono tracking-tight text-foreground">
                {data.divergenceCount}
              </span>
              <Badge variant="outline" className="border-amber-500/40 text-amber-500 text-[10px]">
                High Priority
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Price-sentiment decouplings detected (e.g. RELIANCE, TSLA).
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-medium pt-1">
            <ShieldAlert className="size-3" />
            <span>2 Bullish Accumulations, 1 Bearish</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
