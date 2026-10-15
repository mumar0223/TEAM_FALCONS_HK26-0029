"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TickerTape } from "@/components/dashboard/ticker-tape";
import { DashboardProvider, useDashboard } from "@/components/dashboard/dashboard-context";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, toggleSidebar } = useDashboard();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Header */}
      <DashboardHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Real-time Ticker Tape Ribbon */}
      <TickerTape />

      {/* Dashboard Body Content */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}
