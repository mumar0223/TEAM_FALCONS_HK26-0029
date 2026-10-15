"use client";

import React, { useState } from "react";
import {
  Bot,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Paperclip,
  RefreshCw,
  TrendingUp,
  BrainCircuit,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkdownMessage } from "@/components/chat/markdown-message";
import { cn } from "@/lib/utils";
import type { StockListItem } from "./stock-list-sidebar";

interface AiAssistantSidebarProps {
  selectedStock: StockListItem;
}

interface ChatMsg {
  id: string;
  role: "assistant" | "user";
  content: string;
  time: string;
}

export function AiAssistantSidebar({ selectedStock }: AiAssistantSidebarProps) {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: "m-1",
      role: "assistant",
      content: `The current consolidation pattern in **${selectedStock.symbol}** suggests a potential bullish breakout. Watch for the MACD to cross above the signal line and the RSI to rebound from the midline. Volume accumulation remains steady.`,
      time: "Just now",
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg: ChatMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      content: inputVal,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");

    // Simulate instant context-aware reply
    setTimeout(() => {
      const replyMsg: ChatMsg = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: `**Google Cloud NLP** evaluated the latest news sentiment for **${selectedStock.symbol}** at **${(selectedStock.sentimentScore * 100).toFixed(0)}% (${selectedStock.sentimentLabel})**.\n\n$$\\text{Conviction} = \\frac{\\text{Positive}}{\\text{Total Vol}} \\times 100 = ${(selectedStock.sentimentScore * 100).toFixed(0)}\\%$$\n\nKey catalyst remains enterprise cloud expansion and margin defense.`,
        time: "Just now",
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 400);
  };

  return (
    <aside className="w-80 sm:w-88 md:w-96 h-full border-l border-border/80 bg-background/50 flex flex-col shrink-0 select-none">
      {/* Top Header matching reference image */}
      <div className="p-3.5 border-b border-border/70 flex items-center justify-between shrink-0 bg-card/40">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-xs">
            <Bot className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-foreground">AI Assistant</span>
              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[9px] px-1 py-0 font-mono">
                Gemini 3.7 Flash
              </Badge>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">Google Cloud NLP Grounded</span>
          </div>
        </div>

        {/* Voice Mode Toggle */}
        <button
          onClick={() => setIsVoiceActive(!isVoiceActive)}
          className={cn(
            "size-8 rounded-lg border transition-all flex items-center justify-center cursor-pointer",
            isVoiceActive
              ? "bg-emerald-500 border-emerald-500 text-white shadow-xs animate-pulse"
              : "border-border/80 text-muted-foreground hover:text-foreground hover:bg-card"
          )}
          title="Toggle Voice Mode"
        >
          {isVoiceActive ? <Mic className="size-3.5" /> : <MicOff className="size-3.5" />}
        </button>
      </div>

      {/* Center Body: Full-Height Scrollable Insights & Chat Stream */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 custom-scrollbar">
        {/* Top Autonomous Insight Card matching image */}
        <div className="p-3.5 rounded-xl border border-border/80 bg-card/60 space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Sparkles className="size-3" />
            </div>
            <span className="text-xs font-bold text-foreground">AI Assistant Synthesis</span>
          </div>

          <p className="text-xs text-foreground/90 leading-relaxed font-normal">
            The current consolidation pattern in <strong className="text-emerald-400">{selectedStock.symbol}</strong> suggests a potential bullish breakout. Watch for the MACD to cross above the signal line and the RSI to rebound from the midline.
          </p>
        </div>

        {/* Strategy & Divergence Card matching image */}
        <div className="p-3.5 rounded-xl border border-border/80 bg-card/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Zap className="size-3 text-cyan-400" /> AI Insights Strategy
            </span>
            <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[9px] font-mono">
              Bullish
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Consider an accumulation bracket near current support levels. Sentiment volume outpaces short-term price drag, indicating smart-money accumulation.
          </p>
        </div>

        {/* Conversation Stream */}
        <div className="space-y-3 pt-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex flex-col space-y-1", m.role === "user" ? "items-end" : "items-start")}
            >
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground px-1 font-mono">
                <span>{m.role === "user" ? "You" : "Sentix Copilot"}</span>
                <span>• {m.time}</span>
              </div>

              <div
                className={cn(
                  "p-3 rounded-xl text-xs max-w-[90%] shadow-2xs leading-relaxed",
                  m.role === "user"
                    ? "bg-emerald-600 text-white rounded-br-xs"
                    : "bg-card border border-border/70 text-foreground rounded-bl-xs"
                )}
              >
                {m.role === "assistant" ? (
                  <MarkdownMessage content={m.content} />
                ) : (
                  <p>{m.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Input Field Fixed at the Bottom matching image */}
      <div className="p-3 border-t border-border/70 bg-background/80 shrink-0">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-1.5 bg-muted/40 rounded-xl border border-border/80 p-1.5 focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all"
        >
          <button
            type="button"
            className="size-7 rounded-lg text-muted-foreground hover:text-foreground flex items-center justify-center cursor-pointer"
          >
            <Paperclip className="size-3.5" />
          </button>

          <Input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask anything about sentiment..."
            className="border-0 shadow-none focus-visible:ring-0 text-xs h-7 bg-transparent px-1 placeholder:text-muted-foreground/60"
          />

          <button
            type="button"
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className="size-7 rounded-lg text-muted-foreground hover:text-foreground flex items-center justify-center cursor-pointer"
          >
            <Mic className="size-3.5" />
          </button>

          <Button
            type="submit"
            size="sm"
            disabled={!inputVal.trim()}
            className="size-7 p-0 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40"
          >
            <Send className="size-3" />
          </Button>
        </form>
      </div>
    </aside>
  );
}
