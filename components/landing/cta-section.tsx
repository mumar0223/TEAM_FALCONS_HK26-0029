"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden border-b border-slate-200/70">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="size-3.5 text-emerald-600" />
          <span>Start Exploring Without Distractions</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Ready to Explore Market Sentiment?
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Bring financial news, AI-driven sentiment analysis, and market trends together in one workspace.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Launch ArthaDrishti Workspace</span>
            <ArrowRight className="size-4" />
          </Link>

          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 px-5 py-4 rounded-xl text-slate-700 hover:text-emerald-700 font-semibold text-sm transition-colors"
          >
            <span>See How It Works</span>
            <ChevronRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
