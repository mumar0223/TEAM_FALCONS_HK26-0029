"use client";

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
} from "react";
import {
  ArrowUp,
  AudioLines,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatAttachment } from "./types";

interface FloatingInputProps {
  onSend: (message: string, attachments?: ChatAttachment[]) => void;
  onStartVoiceMode?: () => void;
  isLoading?: boolean;
  isCentered?: boolean;
  placeholder?: string;
}

export function FloatingInput({
  onSend,
  onStartVoiceMode,
  isLoading = false,
  isCentered = false,
  placeholder,
}: FloatingInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const displayPlaceholder =
    placeholder || "Ask about market sentiment, divergence, or stock catalysts...";

  const canSend = !isLoading && input.trim().length > 0;

  // Auto-grow textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        140,
      )}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (!canSend) return;
    onSend(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={cn(
        "w-full transition-all duration-200",
        isCentered
          ? "max-w-2xl mx-auto px-2"
          : "max-w-3xl mx-auto px-1 sm:px-2",
      )}
    >
      <div className="relative group">
        <div
          className={cn(
            "relative rounded-3xl transition-all duration-200",
            "bg-card/90 dark:bg-card/70 border border-border/80 backdrop-blur-xl shadow-lg",
            "hover:border-border hover:shadow-xl",
            "focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20",
            "p-2 sm:p-2.5",
          )}
        >
          {/* Main Input Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={displayPlaceholder}
            className="w-full resize-none bg-transparent px-3 py-1.5 text-xs sm:text-[13.5px] leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-hidden min-h-[38px] max-h-[140px]"
          />

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-1 px-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground font-mono hidden sm:inline">
                Shift + Enter for new line
              </span>
            </div>

            {/* Right Actions: Live Voice Agent & Send */}
            <div className="flex items-center gap-2">
              {/* Gemini Live Voice Agent Trigger */}
              {onStartVoiceMode && (
                <button
                  type="button"
                  onClick={onStartVoiceMode}
                  disabled={isLoading}
                  aria-label="Start live voice agent"
                  title="Voice Agent OS"
                  className="h-7.5 px-2.5 sm:px-3 rounded-full flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs active:scale-95 group"
                >
                  <AudioLines className="size-3.5 text-emerald-500 group-hover:scale-110 transition-transform animate-pulse" />
                  <span className="text-[11px] sm:text-[11.5px] font-semibold tracking-tight">
                    Voice Agent OS
                  </span>
                </button>
              )}

              {/* Send Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSend}
                title={isLoading ? "Generating response..." : "Send message"}
                className={cn(
                  "size-7.5 rounded-full flex items-center justify-center transition-all cursor-pointer",
                  canSend
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md scale-100"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-50",
                )}
              >
                <ArrowUp className="size-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="mt-1.5 text-center text-[10.5px] text-muted-foreground select-none">
        Sentix AI can make mistakes. Verify important financial decisions.
      </p>
    </div>
  );
}
