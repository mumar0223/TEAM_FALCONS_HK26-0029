"use client";

import React from "react";
import { DownloadCloud, Sparkles, LineChart, ArrowRight } from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Collect Financial News",
    description:
      "Gather relevant financial headlines and discussions from available data sources.",
    icon: DownloadCloud,
    tag: "Data Ingestion",
  },
  {
    number: "02",
    title: "Analyze Sentiment With AI",
    description:
      "Use NLP to classify the collected text as positive, negative, or neutral and calculate aggregate sentiment metrics.",
    icon: Sparkles,
    tag: "NLP Processing",
  },
  {
    number: "03",
    title: "Explore Market Insights",
    description:
      "Visualize sentiment trends, compare them with stock-price history, and investigate the news behind significant changes.",
    icon: LineChart,
    tag: "Contextual Analytics",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Process & Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
            From Financial News to Market Insights
          </h2>
          <p className="text-base text-slate-600 mt-2 font-normal leading-relaxed">
            A three-step analytical workflow turning high-volume financial data into structured market sentiment context.
          </p>
        </div>

        {/* 3 Connected Steps Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-black tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-full">
                      STEP {step.number}
                    </span>
                    <div className="size-10 rounded-xl bg-slate-50 border border-slate-200/80 text-emerald-700 flex items-center justify-center">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{step.tag}</span>
                  {idx < 2 ? (
                    <span className="hidden md:flex items-center text-emerald-600 font-bold gap-1">
                      <span>Next</span>
                      <ArrowRight className="size-3.5" />
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-bold">Workspace Ready</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
