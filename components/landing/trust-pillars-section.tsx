"use client";

import React from "react";
import {
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  HelpCircle,
  FileText,
  AlertCircle,
  Binary,
} from "lucide-react";

const PILLARS = [
  {
    icon: Cpu,
    title: "FinBERT Domain Architecture",
    description:
      "Trained on over 10M+ financial news dispatches, earnings call transcripts, and exchange filings to reliably detect tone, nuance, and fiscal context.",
  },
  {
    icon: Zap,
    title: "Sub-Second Ingestion Pipeline",
    description:
      "Cleans, deduplicates, and classifies financial press releases in sub-second latency from authorized RSS and news wire feeds.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Hallucination Guarantee",
    description:
      "Engineered strictly for explanatory narrative intelligence. We present observed data correlation with zero speculative gambling or price-guessing.",
  },
  {
    icon: Binary,
    title: "Transparent Model Confidence",
    description:
      "Every headline classification displays explicit FinBERT probability scores and data tags (Live, Cached, or Delayed) for auditability.",
  },
];

export function TrustPillarsSection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Responsible Intelligence & Transparency
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Engineered for Precision. Rooted in Transparency.
          </h2>
          <p className="text-sm text-slate-600 mt-1.5 font-normal">
            ArthaDrishti decouples noisy hype from verified market movements with explainable AI architecture.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md p-6 space-y-3 transition-all duration-300"
              >
                <div className="size-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/70 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Card as in Screenshot */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-amber-50 rounded-xl text-amber-700 border border-amber-200/70 shrink-0 mt-0.5">
              <AlertCircle className="size-4.5" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-slate-900">
                Data Transparency & Regulatory Compliance Disclaimer
              </h4>
              <p className="text-slate-600 leading-relaxed">
                ArthaDrishti is an informational and educational market intelligence research platform. It does not provide personalized investment advice, portfolio management, or trade execution. Observed news sentiment reflects automated algorithmic processing using the FinBERT model and is not a guaranteed predictor of stock market prices or returns. Market participants should always consult registered investment advisors and perform independent due diligence before making financial decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
