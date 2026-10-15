"use client";

import React, { useState } from "react";
import { StockListSidebar, WATCHLIST_ITEMS, type StockListItem } from "./stock-list-sidebar";
import { StockDetailView } from "./stock-detail-view";
import { AiAssistantSidebar } from "./ai-assistant-sidebar";

export function DashboardTerminal() {
  const [selectedStock, setSelectedStock] = useState<StockListItem>(
    WATCHLIST_ITEMS.find((s) => s.symbol === "AAPL") || WATCHLIST_ITEMS[0]
  );

  return (
    <div className="flex-1 w-full h-[calc(100vh-3rem)] flex overflow-hidden">
      {/* 1. Left Column: Watchlist & Stock List (Full Height) */}
      <StockListSidebar
        selectedSymbol={selectedStock.symbol}
        onSelectStock={setSelectedStock}
      />

      {/* 2. Center Column: Detailed Selected Stock View */}
      <main className="flex-1 h-full overflow-hidden flex flex-col">
        <StockDetailView stock={selectedStock} />
      </main>

      {/* 3. Right Column: AI Assistant & Voice Agent (Full Height) */}
      <AiAssistantSidebar selectedStock={selectedStock} />
    </div>
  );
}
