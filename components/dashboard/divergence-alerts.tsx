"use client";

import React from "react";
import { AlertTriangle, TrendingUp, TrendingDown, Bell, Check, ArrowRight, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AlertData {
  id: string;
  symbol: string;
  type: "divergence" | "sentiment_surge" | "negative_breakout";
  severity: "high" | "medium" | "info";
  title: string;
  message: string;
  metricChange: string;
  timeAgo: string;
  read: boolean;
}

const DEFAULT_ALERTS: AlertData[] = [
  {
    id: "a-1",
    symbol: "NVDA",
    type: "sentiment_surge",
    severity: "high",
    title: "Sentiment Surge Detected",
    message: "Public and financial news sentiment jumped +42% in 4 hours on hyperscaler datacenter commitments.",
    metricChange: "+42% Sentiment Score (0.46 → 0.88)",
    timeAgo: "30m ago",
    read: false,
  },
  {
    id: "a-2",
    symbol: "RELIANCE",
    type: "divergence",
    severity: "medium",
    title: "Bullish Divergence Signal",
    message: "Sentiment rose +28% while price consolidated sideways (-0.2%). Historical pattern suggests accumulation.",
    metricChange: "Sentiment +28% vs Price -0.2%",
    timeAgo: "1h ago",
    read: false,
  },
  {
    id: "a-3",
    symbol: "TSLA",
    type: "negative_breakout",
    severity: "high",
    title: "Bearish Sentiment Breakout",
    message: "Negative discussion volume spiked 210% across financial blogs over Asian market price cuts.",
    metricChange: "Negative ratio reached 58%",
    timeAgo: "3h ago",
    read: false,
  },
];

export function DivergenceAlerts({ alerts = DEFAULT_ALERTS }: { alerts?: AlertData[] }) {
  return (
    <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-xs overflow-hidden">
      <CardHeader className="p-4 pb-2 border-b border-border/60 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-amber-500" />
          <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
            Market Sentiment Divergence Radar
          </CardTitle>
        </div>
        <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-500 font-mono">
          {alerts.length} Active Triggers
        </Badge>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3",
              alert.severity === "high"
                ? "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40"
                : "bg-muted/40 border-border/60 hover:border-border"
            )}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-[10px] px-1.5 py-0 font-bold">
                  {alert.symbol}
                </Badge>
                <span className="text-xs font-semibold text-foreground">{alert.title}</span>
                <span className="text-[10px] text-muted-foreground font-mono">• {alert.timeAgo}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">{alert.message}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <Badge
                variant="outline"
                className="font-mono text-[10px] px-2 py-0.5 border-border/70 text-foreground"
              >
                {alert.metricChange}
              </Badge>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-emerald-500 hover:text-emerald-400">
                Inspect <ArrowRight className="size-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
