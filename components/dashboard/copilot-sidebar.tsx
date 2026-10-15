"use client";

import React, { useState } from "react";
import {
  Bot,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Paperclip,
  X,
  RotateCcw,
  Maximize2,
  ChevronRight,
  TrendingUp,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MarkdownMessage } from "@/components/chat/markdown-message";
import { cn } from "@/lib/utils";

interface CopilotSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const SAMPLE_MESSAGES: MessageItem[] = [
  {
    id: "m-1",
    role: "assistant",
    content: `### Sentix AI Copilot Initialized 📈\n\nI am connected to **Google Cloud Natural Language API** and **Vertex AI Gemini 3.7 Flash**.\n\n* **Real-time Price vs. Sentiment Divergences**\n* **FinBERT / Google NLP Polarity Explanations**\n* **Sector Flow & Macro Perception**\n\nHow can I assist your market research today?`,
    time: "10:30 AM",
  },
  {
    id: "m-2",
    role: "user",
    content: "Why did TCS sentiment turn negative today despite the broader market rally?",
    time: "10:32 AM",
  },
  {
    id: "m-3",
    role: "assistant",
    content: `Google Cloud Natural Language API scored recent TCS headlines at **-0.64 (Bearish)** with high magnitude (0.82).\n\n### Key Catalysts:\n1. **Discretionary IT Spending Delays**: European banking clients are prolonging decision cycles for advisory consulting.\n2. **Margin Conservatism**: Analysts pruned Q3 EBIT estimates by 35 bps.\n\n$$\\text{Net Polarity} = P(\\text{Positive}) - P(\\text{Negative}) = 0.28 - 0.72 = -0.44$$\n\nWhile Nifty rallied +0.84%, discretionary IT exhibits a **bearish sector rotation** today.`,
    time: "10:32 AM",
  },
];

const SUGGESTED_PROMPTS = [
  "Explain Reliance bullish divergence",
  "Compare NVDA vs TSLA sentiment",
  "Summarize today's top market catalysts",
  "What is driving Banking sector inflows?",
];

export function CopilotSidebar({ isOpen, onClose }: CopilotSidebarProps) {
  const [messages, setMessages] = useState<MessageItem[]>(SAMPLE_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  if (!isOpen) return null;

  return (
    <aside className="w-full lg:w-[380px] xl:w-[420px] h-[calc(100vh-3.5rem)] sticky top-14 shrink-0 border-l border-border/80 bg-background/95 backdrop-blur-2xl flex flex-col z-30 transition-all shadow-2xl">
      {/* Header */}
      <div className="p-3.5 border-b border-border/70 flex items-center justify-between bg-card/40">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-xs">
            <Bot className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-foreground">Sentix Copilot</span>
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[9px] px-1 py-0 font-mono">
                Gemini 3.7 Flash
              </Badge>
            </div>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              NLP Engine Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Voice Agent Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={cn(
              "size-8 p-0 rounded-lg transition-colors",
              isVoiceActive ? "bg-emerald-500 text-white shadow-xs animate-pulse" : "text-muted-foreground hover:text-foreground"
            )}
            title="Toggle Voice Agent"
          >
            {isVoiceActive ? <Mic className="size-4" /> : <MicOff className="size-4" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="size-8 p-0 rounded-lg text-muted-foreground hover:text-foreground"
            title="Close Copilot"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {/* Voice Mode Banner (If Voice Mode is active) */}
      {isVoiceActive && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-3.5 py-2 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400">
          <div className="flex items-center gap-2">
            <Volume2 className="size-3.5 animate-bounce" />
            <span className="font-semibold text-[11px]">Voice Mode Listening...</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">Speak anytime</span>
        </div>
      )}

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex flex-col space-y-1", m.role === "user" ? "items-end" : "items-start")}
          >
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground px-1 font-mono">
              <span>{m.role === "user" ? "You" : "Sentix AI"}</span>
              <span>• {m.time}</span>
            </div>

            <div
              className={cn(
                "rounded-2xl p-3 text-xs sm:text-[13px] max-w-[90%] shadow-2xs leading-relaxed",
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

      {/* Prompt Suggestions */}
      <div className="px-3.5 py-2 border-t border-border/50 bg-card/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {SUGGESTED_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => setInputValue(prompt)}
            className="px-2 py-1 rounded-md bg-muted/60 hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors border border-border/40 shrink-0 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Floating Bottom Input */}
      <div className="p-3 border-t border-border/80 bg-background/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!inputValue.trim()) return;
            const newMsg: MessageItem = {
              id: `user-${Date.now()}`,
              role: "user",
              content: inputValue,
              time: "Just now",
            };
            setMessages((prev) => [...prev, newMsg]);
            setInputValue("");
          }}
          className="relative flex items-center gap-1.5 bg-muted/40 rounded-xl border border-border/80 p-1.5 focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all"
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="size-7 p-0 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="size-3.5" />
          </Button>

          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about sentiment, divergence, or stocks..."
            className="border-0 shadow-none focus-visible:ring-0 text-xs h-7 bg-transparent px-1 placeholder:text-muted-foreground/60"
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className="size-7 p-0 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <Mic className="size-3.5" />
          </Button>

          <Button
            type="submit"
            size="sm"
            disabled={!inputValue.trim()}
            className="size-7 p-0 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40"
          >
            <Send className="size-3" />
          </Button>
        </form>
      </div>
    </aside>
  );
}
