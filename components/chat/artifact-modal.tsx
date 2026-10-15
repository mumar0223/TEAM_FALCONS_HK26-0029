"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Check,
  X,
  Target,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Download,
  Printer,
  Copy,
  FileText,
  Compass,
  Zap,
  Globe,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MarkdownMessage } from "./markdown-message";

export interface ArtifactPayload {
  artifactId?: string;
  targetArtifactId?: string;
  isUpdated?: boolean;
  artifactType:
    | "sentiment_dossier"
    | "swarm_dossier"
    | "chart"
    | "sentiment_chart"
    | "divergence_radar"
    | "news_catalysts"
    | "document"
    | (string & {});
  title?: string;
  summary?: string;
  data: any;
}

interface ArtifactModalProps {
  isOpen: boolean;
  onClose: () => void;
  artifact: ArtifactPayload | null;
  onCommitSuccess?: (record: any) => void;
  isVoiceMode?: boolean;
}

export function ArtifactModal({
  isOpen,
  onClose,
  artifact,
}: ArtifactModalProps) {
  const [activeChartType, setActiveChartType] = useState<"area" | "line" | "bar">("area");
  const [copied, setCopied] = useState(false);

  if (!artifact) return null;

  const data = artifact.data || {};

  // Mock / Sample Trend Data if chart data not fully supplied
  const chartData = data.chartData || [
    { date: "09:30", price: 2890, sentiment: 62, volume: 1400 },
    { date: "10:30", price: 2910, sentiment: 68, volume: 2200 },
    { date: "11:30", price: 2895, sentiment: 65, volume: 1800 },
    { date: "12:30", price: 2920, sentiment: 74, volume: 3100 },
    { date: "13:30", price: 2935, sentiment: 78, volume: 2900 },
    { date: "14:30", price: 2930, sentiment: 76, volume: 2400 },
    { date: "15:30", price: 2948, sentiment: 82, volume: 4100 },
  ];

  const sentimentScore = typeof data.score === "number" ? data.score : 0.68;
  const sentimentLabel = data.polarity || (sentimentScore > 0.15 ? "Bullish" : sentimentScore < -0.15 ? "Bearish" : "Neutral");
  const magnitude = typeof data.magnitude === "number" ? data.magnitude : 0.85;

  const handleCopy = () => {
    try {
      const exportText = JSON.stringify(data, null, 2);
      navigator.clipboard.writeText(exportText);
      setCopied(true);
      toast.success("Artifact data copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(artifact.title || "sentix_intelligence").toLowerCase().replace(/\s+/g, "_")}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Intelligence dossier downloaded");
    } catch {
      toast.error("Failed to download file");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl w-[95vw] max-h-[90vh] p-0 rounded-3xl overflow-hidden bg-background border border-border/80 shadow-2xl flex flex-col"
      >
        {/* ── Top Header Bar ── */}
        <div className="p-4 sm:p-5 border-b border-border/70 bg-card/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
              {artifact.artifactType.includes("divergence") ? (
                <Zap className="size-5 text-cyan-400" />
              ) : artifact.artifactType.includes("news") ? (
                <Globe className="size-5 text-emerald-500" />
              ) : artifact.artifactType.includes("chart") ? (
                <BarChart3 className="size-5 text-emerald-500" />
              ) : (
                <Compass className="size-5 text-emerald-500" />
              )}
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-base sm:text-lg font-bold text-foreground truncate">
                {artifact.title || "Market Intelligence Dossier"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground truncate mt-0.5">
                {artifact.summary || "Google Cloud Natural Language API Grounded Intelligence"}
              </DialogDescription>
            </div>
          </div>

          {/* Action Buttons: Copy, Print, Download, Close */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopy}
              className="size-8 rounded-xl border border-border/70 hover:bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Copy JSON Payload"
            >
              {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            </button>
            <button
              onClick={handlePrint}
              className="size-8 rounded-xl border border-border/70 hover:bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Print Dossier"
            >
              <Printer className="size-3.5" />
            </button>
            <button
              onClick={handleDownload}
              className="size-8 rounded-xl border border-border/70 hover:bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Download Data"
            >
              <Download className="size-3.5" />
            </button>
            <button
              onClick={onClose}
              className="size-8 rounded-xl bg-muted/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer ml-1"
              title="Close Modal"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* ── Main Body: Scrollable Artifact Content ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          {/* Top KPI Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl border border-border/80 bg-card/40">
              <span className="text-[11px] text-muted-foreground font-medium">NLP Sentiment Score</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className={cn(
                  "text-xl font-bold font-mono",
                  sentimentLabel === "Bullish" ? "text-emerald-500" : sentimentLabel === "Bearish" ? "text-rose-500" : "text-amber-500"
                )}>
                  {sentimentScore > 0 ? "+" : ""}{(sentimentScore * 100).toFixed(0)}%
                </span>
                <span className="text-xs text-muted-foreground font-mono">({sentimentScore.toFixed(2)})</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-border/80 bg-card/40">
              <span className="text-[11px] text-muted-foreground font-medium">Polarity Classification</span>
              <div className="flex items-center gap-1.5 mt-1">
                {sentimentLabel === "Bullish" ? (
                  <TrendingUp className="size-4 text-emerald-500" />
                ) : sentimentLabel === "Bearish" ? (
                  <TrendingDown className="size-4 text-rose-500" />
                ) : (
                  <Activity className="size-4 text-amber-500" />
                )}
                <span className={cn(
                  "text-base font-bold",
                  sentimentLabel === "Bullish" ? "text-emerald-500" : sentimentLabel === "Bearish" ? "text-rose-500" : "text-amber-500"
                )}>
                  {sentimentLabel}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-border/80 bg-card/40">
              <span className="text-[11px] text-muted-foreground font-medium">Signal Magnitude</span>
              <p className="text-xl font-bold font-mono text-cyan-400 mt-1">
                {magnitude.toFixed(2)}x
              </p>
            </div>

            <div className="p-3.5 rounded-2xl border border-border/80 bg-card/40">
              <span className="text-[11px] text-muted-foreground font-medium">Algorithm Grounding</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Sparkles className="size-4 text-emerald-400" />
                <span className="text-xs font-semibold text-foreground font-mono">
                  Google Cloud NLP
                </span>
              </div>
            </div>
          </div>

          {/* Dual-Axis Sentiment & Price Comparison Chart */}
          <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-card/40 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  Stock Price vs Google Cloud NLP Sentiment Overlay
                </h4>
                <p className="text-xs text-muted-foreground">
                  Dual-axis correlation tracking real-time price action against sentiment score
                </p>
              </div>

              {/* Chart type toggle */}
              <div className="flex items-center gap-1 p-0.5 rounded-xl border border-border/70 bg-card/60">
                {(["area", "line", "bar"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveChartType(type)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium uppercase transition-colors cursor-pointer",
                      activeChartType === type
                        ? "bg-emerald-500 text-white shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                {activeChartType === "area" ? (
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="artSentimentGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="date" stroke="#888888" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="price" orientation="left" stroke="#888888" fontSize={11} domain={["auto", "auto"]} />
                    <YAxis yAxisId="sentiment" orientation="right" stroke="#10b981" fontSize={11} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(18, 18, 20, 0.95)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                    <Area
                      yAxisId="sentiment"
                      type="monotone"
                      dataKey="sentiment"
                      name="Sentiment Score"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#artSentimentGrad)"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="price"
                      name="Stock Price (INR)"
                      stroke="#06b6d4"
                      strokeWidth={2.5}
                      dot={false}
                    />
                  </AreaChart>
                ) : activeChartType === "line" ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="date" stroke="#888888" fontSize={11} />
                    <YAxis yAxisId="price" orientation="left" stroke="#888888" fontSize={11} domain={["auto", "auto"]} />
                    <YAxis yAxisId="sentiment" orientation="right" stroke="#10b981" fontSize={11} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(18, 18, 20, 0.95)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="price"
                      name="Price (INR)"
                      stroke="#06b6d4"
                      strokeWidth={2.5}
                    />
                    <Line
                      yAxisId="sentiment"
                      type="monotone"
                      dataKey="sentiment"
                      name="Sentiment Score"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="date" stroke="#888888" fontSize={11} />
                    <YAxis stroke="#888888" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(18, 18, 20, 0.95)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar dataKey="sentiment" name="Sentiment Score" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="volume" name="Buzz Volume" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Divergence Pattern & Strategic Guidance */}
          <div className="p-4 sm:p-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-foreground">
                {data.divergencePattern || "Bullish Accumulation Divergence Detected"}
              </h4>
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed font-normal">
              {data.strategicGuidance ||
                "Smart-money volume accumulation outpaces short-term price drag. Public news sentiment has surged while price remains in consolidation, indicating potential upward breakout."}
            </p>
          </div>

          {/* Financial News Articles with Clickable Source Links */}
          {Array.isArray(data.articles) && data.articles.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Globe className="size-4 text-emerald-500" />
                <span>Financial News Catalysts &amp; Direct Sources</span>
              </h4>

              <div className="space-y-2">
                {data.articles.map((art: any, idx: number) => (
                  <a
                    key={art.id || idx}
                    href={art.url || `https://news.google.com/search?q=${encodeURIComponent(art.headline || art.title || "market")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl border border-border/80 bg-card/40 hover:bg-card/80 flex items-start justify-between gap-3 transition-colors cursor-pointer group"
                  >
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                        {art.headline || art.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground font-mono">
                        <span className="font-semibold text-foreground/80">{art.source}</span>
                        <span>•</span>
                        <span>{art.timeAgo || "Recently published"}</span>
                      </div>
                    </div>
                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-emerald-400 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-0.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Markdown Content (if custom dossier content was passed) */}
          {(data.content || data.markdown) && (
            <div className="p-4 rounded-2xl border border-border/80 bg-card/30">
              <MarkdownMessage content={data.content || data.markdown} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
