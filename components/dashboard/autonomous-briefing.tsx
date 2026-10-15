"use client";

import React from "react";
import { Sparkles, BrainCircuit, RefreshCw, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface AutonomousBriefingProps {
  summary?: string;
  keyDrivers?: string[];
  bullishSectors?: string[];
  bearishSectors?: string[];
  divergenceWatch?: string;
  updatedAt?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const DEFAULT_SUMMARY = `Global sentiment remains constructive, lifted by robust enterprise hyperscaler capex and resilient Indian macro indicators. Google Cloud Natural Language scoring reflects net bullish polarity (+0.68) across semiconductor and domestic banking assets, while discretionary consulting and EV gross margins remain under selective distribution pressure.`;

const DEFAULT_DRIVERS = [
  "NVIDIA hyperscaler datacenter pipeline backlog reaching record commitments",
  "Reliance Q3 EBITDA expansion projected on 5G monetization and retail footprint",
  "HDFC Bank credit-deposit ratio normalizing, easing net interest margin compression",
  "European banking discretionary IT spend delays creating selective headwinds for TCS",
];

export function AutonomousBriefing({
  summary = DEFAULT_SUMMARY,
  keyDrivers = DEFAULT_DRIVERS,
  bullishSectors = ["Technology & AI (+0.72)", "Energy & Refining (+0.62)", "Banking (+0.48)"],
  bearishSectors = ["Automotive & EV (-0.15)", "European Discretionary IT (-0.25)"],
  divergenceWatch = "RELIANCE: Bullish divergence detected (+28% sentiment vs -0.2% price consolidation). TSLA: Bearish distribution alert.",
  updatedAt = "Just now",
  onRefresh,
  isLoading = false,
}: AutonomousBriefingProps) {
  return (
    <Card className="border border-border/80 bg-gradient-to-br from-card/80 via-card/50 to-emerald-950/10 backdrop-blur-md shadow-xs overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="p-4 pb-2 border-b border-border/60 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-xs">
            <BrainCircuit className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
                Autonomous Market Pulse & Sentiment Briefing
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] px-1.5 py-0"
              >
                Gemini 3.7 Flash + Google NLP
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
              <Clock className="size-3" /> Updated {updatedAt} • Generated autonomously without prompt
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          title="Regenerate live market synthesis"
        >
          <RefreshCw className={`size-3 mr-1 ${isLoading ? "animate-spin text-emerald-500" : ""}`} />
          <span className="hidden sm:inline">Synthesize</span>
        </Button>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Executive Narrative */}
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal bg-muted/30 p-3 rounded-lg border border-border/50">
          {summary}
        </p>

        {/* 3-Column Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {/* Key Drivers */}
          <div className="space-y-2 bg-card/60 p-3 rounded-lg border border-border/60">
            <span className="text-[11px] font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="size-3 text-amber-500" /> Key Catalysts
            </span>
            <ul className="space-y-1.5">
              {keyDrivers.slice(0, 3).map((driver, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="size-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="line-clamp-2">{driver}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sector Momentum */}
          <div className="space-y-2 bg-card/60 p-3 rounded-lg border border-border/60">
            <span className="text-[11px] font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="size-3 text-emerald-500" /> Sector Flow
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <span className="font-medium">Leaders:</span>
                <span className="text-[11px] truncate max-w-[150px]">{bullishSectors[0]}</span>
              </div>
              <div className="flex items-center justify-between text-rose-500">
                <span className="font-medium">Laggards:</span>
                <span className="text-[11px] truncate max-w-[150px]">{bearishSectors[0]}</span>
              </div>
              <div className="pt-1 text-[11px] text-muted-foreground border-t border-border/50">
                Broad breadth: 4 of 6 sectors positive
              </div>
            </div>
          </div>

          {/* Divergence Watch */}
          <div className="space-y-2 bg-card/60 p-3 rounded-lg border border-border/60">
            <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
              ⚡ Divergence Radar
            </span>
            <p className="text-xs text-muted-foreground leading-snug">
              {divergenceWatch}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
