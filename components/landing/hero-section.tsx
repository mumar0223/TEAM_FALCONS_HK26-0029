"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Info,
  ChevronDown,
} from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/70">
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(16,185,129,0.08),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 right-0 size-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 size-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Narrative & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-2xs">
              <span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold text-emerald-800 tracking-wide uppercase">
                AI-Powered Stock Market Sentiment Intelligence
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Understand the Market{" "}
              <span className="text-[#007a55] block sm:inline">
                Beyond the Numbers.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Turn financial news into meaningful sentiment insights. Discover what people are saying, understand market mood, and explore how sentiment moves alongside stock prices.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#007a55] hover:bg-[#006647] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:translate-y-[-1px] active:translate-y-0 transition-all duration-200"
              >
                <span>Explore Workspace</span>
                <ArrowRight className="size-4" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all duration-200"
              >
                <span>See How It Works</span>
                <ChevronDown className="size-4 text-emerald-600" />
              </a>
            </div>

            {/* Compact Value Points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">NLP Powered</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Automated tone classification</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-600">Dual Timeline</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Price & sentiment correlation</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">Voice & Chat</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Conversational exploration</div>
              </div>
            </div>
          </div>

          {/* Right Column: Miniature Workspace Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md w-full rounded-2xl bg-white border border-slate-200 shadow-xl p-5 sm:p-6 space-y-5">
              {/* Card Header & Sample Data Label */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Workspace Preview
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200/70">
                  Illustrative Sample Data
                </span>
              </div>

              {/* Sentiment Compass Miniature Gauge & Score */}
              <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase block">
                    Sentiment Compass
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-slate-900">68</span>
                    <span className="text-xs font-semibold text-slate-500">/ 100</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    <Activity className="size-3 text-emerald-600" />
                    Bullish Mood Trend
                  </span>
                </div>

                {/* Compact SVG Gauge */}
                <div className="w-28 h-18 relative flex items-center justify-center">
                  <svg viewBox="0 0 120 75" className="w-full h-full overflow-visible">
                    <path
                      d="M 15 65 A 45 45 0 0 1 105 65"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 15 65 A 45 45 0 0 1 105 65"
                      fill="none"
                      stroke="url(#heroMiniGradient)"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Needle */}
                    <g transform="rotate(-35, 60, 65)">
                      <line x1="60" y1="65" x2="60" y2="28" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="60" cy="65" r="4" fill="#0f172a" />
                    </g>
                    <defs>
                      <linearGradient id="heroMiniGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Sentiment Breakdown Indicators (Positive, Neutral, Negative) */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/60 text-center">
                  <div className="text-[10px] font-semibold text-emerald-800 uppercase">Positive</div>
                  <div className="text-base font-extrabold text-emerald-700 mt-0.5">64%</div>
                  <div className="w-full bg-emerald-200/60 h-1 rounded-full mt-1 overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[64%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] font-semibold text-slate-700 uppercase">Neutral</div>
                  <div className="text-base font-extrabold text-slate-700 mt-0.5">24%</div>
                  <div className="w-full bg-slate-200 h-1 rounded-full mt-1 overflow-hidden">
                    <div className="bg-slate-400 h-full w-[24%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-200/60 text-center">
                  <div className="text-[10px] font-semibold text-rose-800 uppercase">Negative</div>
                  <div className="text-base font-extrabold text-rose-700 mt-0.5">12%</div>
                  <div className="w-full bg-rose-200/60 h-1 rounded-full mt-1 overflow-hidden">
                    <div className="bg-rose-500 h-full w-[12%]" />
                  </div>
                </div>
              </div>

              {/* Small Stock Price vs Sentiment Comparison Chart */}
              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-700">Price vs. Sentiment Trajectory</span>
                  <span className="font-mono text-emerald-700 font-semibold">+4.2% Delta</span>
                </div>

                {/* SVG Mini Area Chart */}
                <div className="w-full h-16">
                  <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Sentiment Gradient Area */}
                    <path
                      d="M 0 45 Q 60 40 120 22 T 240 10 L 240 60 L 0 60 Z"
                      fill="url(#heroChartFill)"
                    />
                    {/* Sentiment Line */}
                    <path
                      d="M 0 45 Q 60 40 120 22 T 240 10"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    {/* Stock Price Line (Dashed) */}
                    <path
                      d="M 0 50 Q 70 48 130 32 T 240 16"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.8"
                      strokeDasharray="3 3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    News Sentiment
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-0.5 bg-slate-600" />
                    Stock Price Movement
                  </span>
                </div>
              </div>

              {/* Bottom Intelligence Metrics Strip */}
              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Sparkles className="size-3 text-emerald-600" />
                  Confidence: <strong className="text-slate-800">94.2%</strong>
                </span>
                <span className="text-[10px] text-slate-500">
                  Full analytics available inside workspace
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
