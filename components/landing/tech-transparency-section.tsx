"use client";

import React from "react";
import {
  Cpu,
  Database,
  LineChart,
  Mic,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

interface TechItem {
  title: string;
  description: string;
  status: "Implemented" | "Planned Integration";
  icon: React.ComponentType<{ className?: string }>;
}

const TECH_ITEMS: TechItem[] = [
  {
    title: "Financial News Data Feeds",
    description: "Ingestion and deduplication of published financial headlines and public market commentary.",
    status: "Implemented",
    icon: Database,
  },
  {
    title: "Natural Language Processing",
    description: "Algorithmic text classification identifying positive, negative, and neutral financial context.",
    status: "Implemented",
    icon: Cpu,
  },
  {
    title: "FinBERT Financial Sentiment Model",
    description: "Specialized language model fine-tuned for financial lexicon, corporate earnings, and macro terminology.",
    status: "Implemented",
    icon: Sparkles,
  },
  {
    title: "Historical Stock-Price Data",
    description: "Benchmark indices and constituent stock price timelines for side-by-side comparison.",
    status: "Implemented",
    icon: LineChart,
  },
  {
    title: "Interactive Visualizations",
    description: "Dual-timeline graphs, sentiment gauges, and sector matrices for pattern discovery.",
    status: "Implemented",
    icon: LineChart,
  },
  {
    title: "Voice & Chat Exploration",
    description: "Conversational text queries and audio dispatches for natural language market exploration.",
    status: "Implemented",
    icon: Mic,
  },
  {
    title: "Multilingual Indian Regional News",
    description: "Expanding coverage across regional financial press (Hindi, Marathi, Gujarati, Tamil).",
    status: "Planned Integration",
    icon: Clock,
  },
  {
    title: "Brokerage Execution Integrations",
    description: "Direct order dispatch from sentiment divergence alerts to registered Indian brokers.",
    status: "Planned Integration",
    icon: Clock,
  },
];

export function TechTransparencySection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Architecture & Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
            Technology and Transparency
          </h2>
          <p className="text-base text-slate-600 mt-2 font-normal leading-relaxed">
            ArthaDrishti combines natural language processing with market data to deliver explainable, research-focused sentiment insights.
          </p>
        </div>

        {/* Tech Capabilities Grid with Status Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {TECH_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const isImplemented = item.status === "Implemented";
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="size-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center">
                      <Icon className="size-4 text-emerald-700" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isImplemented
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200/80"
                          : "bg-slate-200/70 text-slate-700 border-slate-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparency Statement Banner */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-amber-50 rounded-xl text-amber-700 border border-amber-200/70 shrink-0 mt-0.5">
              <ShieldAlert className="size-5" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <h4 className="font-bold text-slate-900">
                Transparency Statement
              </h4>
              <p className="text-slate-600 leading-relaxed font-normal">
                Sentiment analysis measures the tone of available news and public discussions. It does not guarantee future stock-price movements or replace independent investment research. ArthaDrishti is designed as an informational and educational research tool.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
