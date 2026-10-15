"use client";

import React from "react";
import {
  Newspaper,
  BrainCircuit,
  ChartNoAxesCombined,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

interface FeatureCardData {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tag: string;
}

const FEATURES: FeatureCardData[] = [
  {
    icon: Newspaper,
    title: "Financial News Intelligence",
    description:
      "Bring financial headlines together in one place and understand the stories shaping market conversations.",
    tag: "Aggregated Intelligence",
  },
  {
    icon: BrainCircuit,
    title: "AI Sentiment Analysis",
    description:
      "Classify financial news as positive, negative, or neutral using natural language processing.",
    tag: "FinBERT NLP",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Stock Price Correlation",
    description:
      "Compare sentiment trends with historical stock-price movements to explore how market mood and price behavior relate.",
    tag: "Dual Timeline",
  },
  {
    icon: MessageCircle,
    title: "AI Market Assistant",
    description:
      "Explore financial news and dashboard insights through the existing voice and chat assistant.",
    tag: "Conversational Copilot",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
            Turn Financial Noise Into Clarity
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal leading-relaxed">
            Understand market sentiment through AI-powered financial news analysis, historical trends, and contextual insights.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="size-11 rounded-xl bg-white border border-slate-200/80 group-hover:bg-emerald-50 group-hover:border-emerald-200 text-emerald-700 flex items-center justify-center shadow-xs transition-colors">
                      <Icon className="size-5.5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-full border border-slate-200/60">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Explore in Workspace</span>
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
