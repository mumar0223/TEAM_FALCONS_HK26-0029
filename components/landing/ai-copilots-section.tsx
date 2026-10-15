"use client";

import React, { useState, useEffect } from "react";
import {
  Bot,
  Mic,
  Play,
  Pause,
  Send,
  Volume2,
  Sparkles,
  CheckCircle,
  HelpCircle,
  RefreshCw,
  Terminal,
} from "lucide-react";

interface PresetConversation {
  question: string;
  answer: string[];
  confidence: string;
  timestamp: string;
}

const PRESET_CONVERSATIONS: Record<string, PresetConversation> = {
  nifty: {
    question: "Explain why NIFTY surged despite higher crude prices?",
    answer: [
      "FinBERT processed 420 financial headlines in the past 4 hours. Three mitigating factors explain the divergence:",
      "1. Record DII net absorption of ₹4,120 Cr neutralized crude-related foreign fund outflows.",
      "2. Reliance Industries & IT exporters gained heavily from dollar strength, offsetting refinery margin concerns.",
      "3. Core retail inflation came in lower than consensus, preserving expectations of an RBI rate ease.",
    ],
    confidence: "94.8% FinBERT Confidence",
    timestamp: "Just now",
  },
  hdfc: {
    question: "What is driving HDFC Bank's 78% Bullish score today?",
    answer: [
      "Headline sentiment jumped +7.4% following quarterly deposit growth figures:",
      "1. Retail deposit growth reached 16.2% YoY, resolving earlier post-merger liquidity questions.",
      "2. Net interest margin stabilized at 3.52%, beating median consensus.",
      "3. Multiple brokerage upgrades highlighted benign credit costs and asset quality.",
    ],
    confidence: "96.1% FinBERT Confidence",
    timestamp: "3m ago",
  },
  auto: {
    question: "What is the sentiment outlook for Indian Auto & EV sector?",
    answer: [
      "Sector sentiment score stands at 65 (Mild Bullish) with distinct catalysts:",
      "1. European order book for JLR (Tata Motors) continues to expand with strong margins.",
      "2. State subsidies and commercial EV fleet transition announcements created positive press coverage.",
      "3. Near-term risks: Festive inventory build-up monitoring required in passenger car segments.",
    ],
    confidence: "91.3% FinBERT Confidence",
    timestamp: "8m ago",
  },
};

export function AiCopilotsSection() {
  const [activeChatKey, setActiveChatKey] = useState<"nifty" | "hdfc" | "auto">("nifty");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(48); // percent
  const [customInput, setCustomInput] = useState("");
  const [chatLog, setChatLog] = useState<Array<{ sender: "user" | "agent"; text: string | string[] }>>([
    { sender: "user", text: PRESET_CONVERSATIONS.nifty.question },
    { sender: "agent", text: PRESET_CONVERSATIONS.nifty.answer },
  ]);

  // Audio simulation timer
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleSelectPreset = (key: "nifty" | "hdfc" | "auto") => {
    setActiveChatKey(key);
    const conv = PRESET_CONVERSATIONS[key];
    setChatLog([
      { sender: "user", text: conv.question },
      { sender: "agent", text: conv.answer },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const query = customInput;
    setCustomInput("");
    setChatLog((prev) => [...prev, { sender: "user", text: query }]);

    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          sender: "agent",
          text: [
            `FinBERT analyzed sentiment for "${query}":`,
            `• Observed overall market narrative tone is 68% Bullish across verified news wire releases.`,
            `• No severe negative divergence flagged; technical and sentiment momentum remain aligned.`,
            `• Recommended action: Review specific sector constituents in the Terminal view.`,
          ],
        },
      ]);
    }, 600);
  };

  return (
    <section id="agents" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Conversational Financial Copilots
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Personalized AI Agents: Financial Market Copilots
          </h2>
          <p className="text-sm text-slate-600 mt-1.5 font-normal">
            Query complex macro trends, news sentiment divergence, and constituent sentiment with specialized conversational copilots.
          </p>
        </div>

        {/* 2 Agent Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* 1. Text Agent: ArthaAgent Chat */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Bot className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    ArthaAgent — Market Strategist
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online & Linked to Realtime News Wire
                  </span>
                </div>
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                Model: FinBERT-L
              </span>
            </div>

            {/* Chat Bubble Thread */}
            <div className="space-y-4 max-h-[300px] min-h-[220px] overflow-y-auto pr-1">
              {chatLog.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 text-xs ${
                      msg.sender === "user"
                        ? "bg-emerald-600 text-white rounded-br-xs font-medium"
                        : "bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-xs leading-relaxed space-y-1.5"
                    }`}
                  >
                    {Array.isArray(msg.text) ? (
                      msg.text.map((line, lineIdx) => (
                        <p key={lineIdx} className={lineIdx === 0 ? "font-bold text-slate-900" : ""}>
                          {line}
                        </p>
                      ))
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompt Chips */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                <Sparkles className="size-3 text-emerald-600" />
                <span>Try Instant Market Queries:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleSelectPreset("nifty")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                    activeChatKey === "nifty"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Why did NIFTY surge?
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPreset("hdfc")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                    activeChatKey === "hdfc"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  HDFC Bank sentiment drivers
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPreset("auto")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                    activeChatKey === "auto"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Auto & EV outlook
                </button>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="relative pt-1">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Ask ArthaAgent anything about sentiment..."
                className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-2.5 size-7 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Send className="size-3.5" />
              </button>
            </form>
          </div>

          {/* 2. Voice & Audio Agent: Morning Briefing Player */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-xs">
                  <Mic className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Audio & Voice Market Dispatch Copilot
                  </h3>
                  <span className="text-[11px] text-teal-700 font-semibold flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-teal-500 animate-pulse" />
                    Daily Morning Intelligence Briefing
                  </span>
                </div>
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                Duration: 02:30
              </span>
            </div>

            {/* Waveform Equalizer Graphic */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center justify-center gap-1.5 h-16 w-full">
                {[18, 35, 60, 40, 80, 55, 95, 70, 45, 85, 30, 65, 50, 90, 75, 40, 60, 30].map(
                  (height, idx) => (
                    <span
                      key={idx}
                      className={`w-1.5 rounded-full transition-all duration-300 ${
                        isPlayingAudio
                          ? "bg-emerald-500 animate-pulse"
                          : "bg-slate-300"
                      }`}
                      style={{
                        height: isPlayingAudio ? `${Math.min(95, height * 1.1)}%` : `${height * 0.4}%`,
                        animationDelay: `${idx * 60}ms`,
                      }}
                    />
                  )
                )}
              </div>

              {/* Player Controls */}
              <div className="w-full flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="size-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  {isPlayingAudio ? (
                    <Pause className="size-4.5" />
                  ) : (
                    <Play className="size-4.5 ml-0.5" />
                  )}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                    <span>
                      {Math.floor((audioProgress * 1.5) / 60)}:
                      {String(Math.floor((audioProgress * 1.5) % 60)).padStart(2, "0")}
                    </span>
                    <span>02:30</span>
                  </div>
                </div>

                <Volume2 className="size-4 text-slate-600 shrink-0" />
              </div>
            </div>

            {/* Live Synchronized Transcript Box */}
            <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase">
                <span>Synchronized Audio Transcript</span>
                <span className="text-emerald-700">English (India)</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-xs">
                &ldquo;Good morning. Indian benchmark indices opened with a bullish gap of 85 points led by private banking and metal stocks. FinBERT sentiment score for NIFTY 50 touched 74, supported by robust quarterly corporate earnings announcements and record domestic mutual fund SIP inflows...&rdquo;
              </p>
            </div>

            {/* Features check list */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-600">
              <span className="flex items-center gap-1">
                <CheckCircle className="size-3.5 text-emerald-600" />
                Voice synthesis in 4 languages
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="size-3.5 text-emerald-600" />
                Evidence-cited answers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
