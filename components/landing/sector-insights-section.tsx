"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Search,
  ArrowUpRight,
  Sparkles,
  PieChart,
  BarChart2,
  ChevronRight,
  Filter,
} from "lucide-react";

interface SectorCard {
  name: string;
  score: number;
  label: string;
  change: string;
  isPositive: boolean;
  color: string;
}

const SECTORS: SectorCard[] = [
  { name: "Tech & IT", score: 78, label: "Very Bullish", change: "+4.1%", isPositive: true, color: "emerald" },
  { name: "Banking & Fin", score: 71, label: "Bullish", change: "+2.8%", isPositive: true, color: "emerald" },
  { name: "Auto & Mobility", score: 65, label: "Mild Bullish", change: "+1.9%", isPositive: true, color: "emerald" },
  { name: "FMCG", score: 51, label: "Neutral", change: "-0.4%", isPositive: false, color: "amber" },
  { name: "Pharma & Health", score: 57, label: "Mild Bullish", change: "+0.8%", isPositive: true, color: "emerald" },
  { name: "Metals & Mining", score: 44, label: "Mild Bearish", change: "-2.5%", isPositive: false, color: "rose" },
];

interface CompanyConstituent {
  ticker: string;
  name: string;
  sector: string;
  score: number;
  scoreDelta: string;
  isDeltaPos: boolean;
  driver: string;
  correlation: string;
  correlationLevel: "High" | "Very High" | "Moderate";
}

const CONSTITUENTS: CompanyConstituent[] = [
  {
    ticker: "RELIANCE",
    name: "Reliance Industries Ltd",
    sector: "Energy / Telecom",
    score: 84,
    scoreDelta: "+5.2%",
    isDeltaPos: true,
    driver: "Green Hydrogen giga-complex commissioning & 5G monetization ramp",
    correlation: "0.87",
    correlationLevel: "Very High",
  },
  {
    ticker: "TCS",
    name: "Tata Consultancy Services",
    sector: "IT Services",
    score: 54,
    scoreDelta: "-2.1%",
    isDeltaPos: false,
    driver: "Selective delayed client decisioning in UK banking vertical",
    correlation: "0.64",
    correlationLevel: "Moderate",
  },
  {
    ticker: "HDFCBANK",
    name: "HDFC Bank Limited",
    sector: "Banking",
    score: 89,
    scoreDelta: "+7.4%",
    isDeltaPos: true,
    driver: "Deposit ratio acceleration and asset quality improvement",
    correlation: "0.91",
    correlationLevel: "Very High",
  },
  {
    ticker: "INFY",
    name: "Infosys Limited",
    sector: "IT Services",
    score: 80,
    scoreDelta: "+6.1%",
    isDeltaPos: true,
    driver: "Landmark $2.2B enterprise generative AI transformation contract",
    correlation: "0.85",
    correlationLevel: "High",
  },
  {
    ticker: "TATAMOTORS",
    name: "Tata Motors Limited",
    sector: "Automotive",
    score: 86,
    scoreDelta: "+8.9%",
    isDeltaPos: true,
    driver: "European EV sales milestone and UK plant battery subsidies",
    correlation: "0.89",
    correlationLevel: "Very High",
  },
  {
    ticker: "ICICIBANK",
    name: "ICICI Bank Limited",
    sector: "Banking",
    score: 82,
    scoreDelta: "+4.3%",
    isDeltaPos: true,
    driver: "Robust net interest margins and digital underwriting expansion",
    correlation: "0.88",
    correlationLevel: "Very High",
  },
];

export function SectorInsightsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectorFilter, setSelectedSectorFilter] = useState("all");

  const filteredConstituents = CONSTITUENTS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.driver.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector =
      selectedSectorFilter === "all" ||
      item.sector.toLowerCase().includes(selectedSectorFilter.toLowerCase());

    return matchesSearch && matchesSector;
  });

  return (
    <section id="sectors" className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Sector Aggregates & Bellwethers
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Company & Sector Insights
          </h2>
          <p className="text-sm text-slate-600 mt-1.5 font-normal">
            Multi-dimensional sentiment scores across industry sectors and benchmark constituent equities.
          </p>
        </div>

        {/* 6 Sector Scores Horizontal Bar/Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-10">
          {SECTORS.map((sec, i) => (
            <div
              key={i}
              onClick={() => setSelectedSectorFilter(selectedSectorFilter === sec.name ? "all" : sec.name)}
              className="p-3.5 bg-slate-50/80 hover:bg-white rounded-xl border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs group"
            >
              <div className="text-xs font-bold text-slate-700 truncate group-hover:text-emerald-700">
                {sec.name}
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-black text-slate-900">{sec.score}</span>
                <span
                  className={`text-[11px] font-bold inline-flex items-center ${
                    sec.isPositive ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {sec.isPositive ? <TrendingUp className="size-3 mr-0.5" /> : <TrendingDown className="size-3 mr-0.5" />}
                  {sec.change}
                </span>
              </div>
              <div className="text-[10px] text-slate-600 font-semibold uppercase mt-1">
                {sec.label}
              </div>
            </div>
          ))}
        </div>

        {/* Constituent Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm font-bold text-slate-900">
                Constituent Sentiment Matrix
              </span>
              <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 font-semibold rounded-full">
                {filteredConstituents.length} Bellwethers
              </span>
            </div>

            {/* Search within table */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 size-4 text-slate-600" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by company or driver..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">FinBERT Score</th>
                  <th className="py-3 px-4">24h Shift</th>
                  <th className="py-3 px-4">Primary News Catalyst</th>
                  <th className="py-3 px-4">Correlation</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredConstituents.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div>
                        <span className="text-slate-900 font-bold block">{c.name}</span>
                        <span className="text-[11px] text-slate-600 font-mono">NSE: {c.ticker}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">{c.score}</span>
                        <span className="text-slate-600 text-[10px]">/ 100</span>
                        <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${c.score}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center font-bold text-xs ${
                          c.isDeltaPos ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {c.isDeltaPos ? <TrendingUp className="size-3 mr-0.5" /> : <TrendingDown className="size-3 mr-0.5" />}
                        {c.scoreDelta}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={c.driver}>
                      {c.driver}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[11px] border border-emerald-200/60">
                        {c.correlation} ({c.correlationLevel})
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-semibold text-xs transition-colors"
                      >
                        <span>Deep Dive</span>
                        <ArrowUpRight className="size-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
