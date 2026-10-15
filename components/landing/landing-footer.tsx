"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-14 pb-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-8 border-b border-slate-100">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-2xs">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-bold text-emerald-600 text-base">
                  अ
                </div>
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                Artha<span className="text-emerald-600">Drishti</span>
              </span>
            </Link>

            <p className="text-slate-600 max-w-sm leading-relaxed text-xs">
              AI-powered market sentiment intelligence platform connecting financial news, institutional narratives, and observed stock movements.
            </p>

            {/* Project Repository Link */}
            <div className="pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
              >
                {/* Clean GitHub SVG mark */}
                <svg
                  className="size-4 fill-current text-slate-700"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>Project Repository</span>
                <ArrowUpRight className="size-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a href="#home" className="hover:text-emerald-700 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-emerald-700 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-700 transition-colors">
                  About & Technology
                </a>
              </li>
            </ul>
          </div>

          {/* Workspace Action Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Financial Workspace
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link
                  href="/dashboard"
                  className="font-semibold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1"
                >
                  <span>Launch Workspace</span>
                  <ArrowUpRight className="size-3" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-700 transition-colors">
                  Sentiment Compass
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-700 transition-colors">
                  Watchlist & Divergence
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-700 transition-colors">
                  AI Assistant Sidebar
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Governance */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Principles
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a href="#about" className="hover:text-emerald-700 transition-colors">
                  Model Methodology
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-700 transition-colors">
                  Data Transparency
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-700 transition-colors">
                  Responsible AI
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Required Financial Disclaimer */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 leading-relaxed text-[11px]">
          <strong className="text-slate-800">Financial Disclaimer: </strong>
          ArthaDrishti provides sentiment analysis and informational market insights. Sentiment is not a guaranteed predictor of stock-price movements and should not be treated as personalized investment advice.
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] pt-2">
          <p>© {new Date().getFullYear()} ArthaDrishti. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Informational Market Intelligence</span>
            <span>•</span>
            <Link href="/dashboard" className="text-emerald-700 font-semibold hover:underline">
              Enter Workspace →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
