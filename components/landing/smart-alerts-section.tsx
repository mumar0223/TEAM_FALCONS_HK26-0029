"use client";

import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  Zap,
  TrendingUp,
  TrendingDown,
  Check,
  Plus,
  Sliders,
  X,
  ShieldCheck,
  Radio,
} from "lucide-react";

interface AlertCardData {
  type: "Spike Alert" | "Divergence Alert" | "Narrative Shift";
  asset: string;
  exchange: string;
  urgency: "High" | "Medium" | "Low";
  message: string;
  timeAgo: string;
  metric: string;
}

const ALERTS_DATA: AlertCardData[] = [
  {
    type: "Spike Alert",
    asset: "Tata Motors Limited",
    exchange: "NSE: TATAMOTORS",
    urgency: "High",
    message: "Headline sentiment surged by +28 pts in under 2 hours following positive UK battery subsidy disclosures.",
    timeAgo: "12m ago",
    metric: "Score 86 (+28 pts)",
  },
  {
    type: "Divergence Alert",
    asset: "Axis Bank Limited",
    exchange: "NSE: AXISBANK",
    urgency: "Medium",
    message: "Stock price softened 1.2% while news sentiment surged to 88% Bullish. Classic early bullish divergence signal detected.",
    timeAgo: "34m ago",
    metric: "Divergence Factor: +4.2",
  },
  {
    type: "Narrative Shift",
    asset: "IT & Software Services",
    exchange: "Sector Index",
    urgency: "Low",
    message: "Aggregate sector narrative flipped from Neutral (51) to Bullish (78) after positive US enterprise tech cloud commentary.",
    timeAgo: "1h ago",
    metric: "Regime: Bullish Expansion",
  },
];

export function SmartAlertsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [createdToast, setCreatedToast] = useState(false);

  // Form states
  const [alertAsset, setAlertAsset] = useState("RELIANCE");
  const [alertType, setAlertType] = useState("divergence");
  const [alertThreshold, setAlertThreshold] = useState("15");

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
    setCreatedToast(true);
    setTimeout(() => setCreatedToast(false), 4000);
  };

  return (
    <section id="alerts" className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Autonomous Risk & Alpha Triggers
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Smart Watchlists & Narrative Alerts
            </h2>
            <p className="text-sm text-slate-600 mt-1.5 max-w-2xl font-normal">
              Configure custom sentiment threshold alerts and never miss an early narrative divergence or news breakout.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer self-start md:self-auto"
          >
            <Plus className="size-4" />
            <span>Create Custom Alert</span>
          </button>
        </div>

        {/* 3 Alert Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALERTS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-5 space-y-4 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      item.urgency === "High"
                        ? "bg-rose-100 text-rose-800 border border-rose-200"
                        : item.urgency === "Medium"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}
                  >
                    <AlertTriangle className="size-3" />
                    {item.urgency} Urgency • {item.type}
                  </span>

                  <span className="text-[11px] text-slate-600">{item.timeAgo}</span>
                </div>

                <div className="mt-3">
                  <h3 className="text-base font-bold text-slate-900">{item.asset}</h3>
                  <span className="text-[11px] text-slate-600 font-mono">{item.exchange}</span>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.message}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-700 font-bold">
                  {item.metric}
                </span>
                <span className="text-slate-600 font-medium">Webhook / Push Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Success Toast */}
        {createdToast && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Check className="size-4 text-emerald-600" />
              <span>
                <strong>Alert Rule Created:</strong> You will receive real-time notifications for {alertAsset} when {alertType} threshold ({alertThreshold}%) is breached.
              </span>
            </div>
            <button
              onClick={() => setCreatedToast(false)}
              className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Modal for Creating Custom Alert */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Bell className="size-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Configure Sentiment Alert
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              <form onSubmit={handleCreateAlert} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Select Benchmark / Equities
                  </label>
                  <select
                    value={alertAsset}
                    onChange={(e) => setAlertAsset(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="NIFTY 50">NIFTY 50 Benchmark</option>
                    <option value="SENSEX">BSE SENSEX</option>
                    <option value="RELIANCE">Reliance Industries (RELIANCE)</option>
                    <option value="HDFCBANK">HDFC Bank Limited (HDFCBANK)</option>
                    <option value="TCS">Tata Consultancy Services (TCS)</option>
                    <option value="INFY">Infosys Ltd (INFY)</option>
                    <option value="TATAMOTORS">Tata Motors (TATAMOTORS)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Trigger Condition
                  </label>
                  <select
                    value={alertType}
                    onChange={(e) => setAlertType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="divergence">Price vs Sentiment Divergence (Sharp Gap)</option>
                    <option value="spike">Sudden Sentiment Spike (&gt; 20 Pts)</option>
                    <option value="regime">Narrative Regime Shift (Neutral to Bullish/Bearish)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Sensitivity Threshold (%)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={alertThreshold}
                    onChange={(e) => setAlertThreshold(e.target.value)}
                    className="w-full accent-emerald-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                    <span>5% (High Sensitivity)</span>
                    <span className="font-bold text-emerald-700">{alertThreshold}%</span>
                    <span>40% (Major Moves Only)</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-[11px] flex items-start gap-2">
                  <ShieldCheck className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Alert triggers are evaluated continuously against real-time news wires using FinBERT NLP classification.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs cursor-pointer"
                  >
                    Activate Alert
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
