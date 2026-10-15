"use client";

import React, { useState } from "react";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { AutonomousBriefing } from "@/components/dashboard/autonomous-briefing";
import { PriceSentimentChart } from "@/components/dashboard/price-sentiment-chart";
import { SectorHeatmap } from "@/components/dashboard/sector-heatmap";
import { LiveNewsFeed } from "@/components/dashboard/live-news-feed";
import { DivergenceAlerts } from "@/components/dashboard/divergence-alerts";
import { CopilotSidebar } from "@/components/dashboard/copilot-sidebar";
import { useDashboard } from "@/components/dashboard/dashboard-context";

export default function DashboardPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboard();
  const [selectedStock, setSelectedStock] = useState("RELIANCE");
  const [isBriefingLoading, setIsBriefingLoading] = useState(false);

  const handleStockChange = (symbol: string) => {
    setSelectedStock(symbol);
  };

  const handleBriefingRefresh = () => {
    setIsBriefingLoading(true);
    setTimeout(() => {
      setIsBriefingLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full overflow-hidden">
      {/* Main Terminal Column (Left/Center) */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* 1. Top Executive KPI Bar */}
        <section aria-label="Executive KPIs">
          <KpiGrid />
        </section>

        {/* 2. Autonomous Market Pulse Intelligence Briefing */}
        <section aria-label="Autonomous Briefing">
          <AutonomousBriefing
            isLoading={isBriefingLoading}
            onRefresh={handleBriefingRefresh}
          />
        </section>

        {/* 3. Dual-Axis Stock Price vs. Sentiment Comparison Chart */}
        <section aria-label="Price vs Sentiment Chart">
          <PriceSentimentChart
            symbol={selectedStock}
            currency={selectedStock === "NVDA" || selectedStock === "AAPL" || selectedStock === "TSLA" ? "USD" : "INR"}
            currentPrice={
              selectedStock === "RELIANCE" ? 2985.3 :
              selectedStock === "NVDA" ? 132.85 :
              selectedStock === "NIFTY 50" ? 25120.45 :
              selectedStock === "TCS" ? 4180.1 :
              selectedStock === "HDFCBANK" ? 1672.4 :
              selectedStock === "AAPL" ? 234.5 : 218.4
            }
            changePercent={
              selectedStock === "RELIANCE" ? 1.45 :
              selectedStock === "NVDA" ? 3.2 :
              selectedStock === "NIFTY 50" ? 0.84 :
              selectedStock === "TCS" ? -0.65 :
              selectedStock === "HDFCBANK" ? 0.32 :
              selectedStock === "AAPL" ? 0.95 : -2.45
            }
            sentimentLabel={
              selectedStock === "TCS" || selectedStock === "TSLA" ? "Bearish" : "Bullish"
            }
            onSymbolChange={handleStockChange}
          />
        </section>

        {/* 4. Two-Column Intelligence Grid: Sector Heatmap + Divergence Radar / Live News */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Sector Matrix & Divergence Alerts */}
          <div className="lg:col-span-7 space-y-6">
            <SectorHeatmap />
            <DivergenceAlerts />
          </div>

          {/* Right Column (5 cols): Live News & Public Buzz Stream */}
          <div className="lg:col-span-5">
            <LiveNewsFeed />
          </div>
        </div>
      </main>

      {/* Right Sidebar: AI Research Copilot & Voice Agent */}
      <CopilotSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
