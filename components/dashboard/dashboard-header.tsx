"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  Search,
  RefreshCw,
  SlidersHorizontal,
  Bot,
  Mic,
  Bell,
  PanelRightClose,
  PanelRightOpen,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function DashboardHeader({
  isSidebarOpen,
  onToggleSidebar,
  onRefresh,
  isRefreshing = false,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-xl transition-all">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Activity className="size-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-base tracking-tight text-foreground">
                  Sentix<span className="text-emerald-500">AI</span>
                </span>
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] px-1.5 py-0 h-4 uppercase font-mono font-semibold"
                >
                  TERMINAL
                </Badge>
              </div>
              <span className="text-[10px] text-muted-foreground hidden sm:inline">
                Real-Time Stock Market Sentiment Radar
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search & Market Status */}
        <div className="flex items-center gap-3 flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search companies, sectors (e.g. RELIANCE, NVDA, Tech)..."
              className="pl-8 h-8 text-xs bg-muted/40 border-border/60 focus:bg-background rounded-lg"
            />
          </div>
        </div>

        {/* Right: Actions, Theme, Copilot Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Refresh Action */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground hidden sm:flex items-center gap-1.5"
            title="Refresh Live Data"
          >
            <RefreshCw className={`size-3.5 ${isRefreshing ? "animate-spin text-emerald-500" : ""}`} />
            <span className="hidden md:inline">Refresh</span>
          </Button>

          {/* Market Status Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-500">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono">MARKETS LIVE</span>
          </div>

          <ThemeToggle />

          {/* Toggle Right-Hand AI Copilot Sidebar */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleSidebar}
            className={`h-8 px-3 text-xs gap-2 rounded-lg border transition-all ${
              isSidebarOpen
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "border-border/80 text-foreground hover:bg-muted"
            }`}
          >
            <Bot className="size-3.5 text-emerald-500" />
            <span className="hidden sm:inline font-semibold">AI Copilot</span>
            {isSidebarOpen ? (
              <PanelRightClose className="size-3.5 text-muted-foreground ml-0.5" />
            ) : (
              <PanelRightOpen className="size-3.5 text-muted-foreground ml-0.5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
