import React from "react";
import { TopNavbar } from "@/components/dashboard/top-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden antialiased">
      <TopNavbar />
      <div className="flex-1 flex overflow-hidden">{children}</div>
    </div>
  );
}
