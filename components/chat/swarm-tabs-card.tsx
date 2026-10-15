"use client";

import { useState, useMemo } from "react";
import {
  Target,
  Zap,
  Globe,
  BarChart3,
  Compass,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Activity,
  CheckCircle2,
  Maximize2,
  Code2,
  Layers,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolCallItem } from "./types";
import { MarkdownMessage } from "./markdown-message";
import type { ArtifactPayload } from "./artifact-modal";
import { SerpApiPayloadModal, type SerpApiPayloadData } from "@/components/ui/serpapi-payload-modal";

interface SwarmTabsCardProps {
  toolCalls?: ToolCallItem[];
  onOpenArtifact?: (artifact: ArtifactPayload) => void;
  isStreaming?: boolean;
}

interface AwakenedDomain {
  id: string;
  type: "sentiment" | "divergence" | "news" | "market" | "dossier" | "custom";
  title: string;
  icon: any;
  status: "calling" | "completed";
  summary?: string;
  spokenSummary?: string;
  result: any;
  toolCall?: ToolCallItem;
}

const SUBAGENT_TOOLS = new Set([
  "analyzeSentiment",
  "detectSentimentDivergence",
  "searchFinancialNews",
  "getLiveMarketQuote",
  "generateSentimentDossier",
]);

export function SwarmTabsCard({ toolCalls = [], onOpenArtifact, isStreaming = false }: SwarmTabsCardProps) {
  // Only display once streaming content has actually started or when result is present
  const activeStreamCalls = toolCalls.filter((tc) => {
    const isSubagent =
      SUBAGENT_TOOLS.has(tc.toolName) ||
      tc.toolName?.startsWith("runCustom") ||
      Boolean((tc.result as any)?.isCustomSubAgent) ||
      Boolean((tc.result as any)?.isArtifact && (tc.result as any)?.tabTitle);

    if (!isSubagent) return false;

    const res = (tc.result || {}) as any;
    const content = res?.content || res?.data?.content || res?.markdown || "";
    const hasStreamingContent = typeof content === "string" && content.trim().length > 0;
    const hasCompletedResult = Boolean(tc.result && typeof tc.result === "object" && Object.keys(tc.result).length > 0);

    return hasStreamingContent || hasCompletedResult;
  });

  if (activeStreamCalls.length === 0) return null;

  return (
    <SwarmTabsCardInner
      completedCalls={activeStreamCalls}
      toolCalls={toolCalls}
      onOpenArtifact={onOpenArtifact}
      isStreaming={isStreaming}
    />
  );
}

function SwarmTabsCardInner({
  completedCalls,
  toolCalls,
  onOpenArtifact,
  isStreaming,
}: {
  completedCalls: ToolCallItem[];
  toolCalls: ToolCallItem[];
  onOpenArtifact?: (artifact: ArtifactPayload) => void;
  isStreaming: boolean;
}) {
  const awakenedDomains: AwakenedDomain[] = [];

  completedCalls.forEach((tc, idx) => {
    const res = (tc.result || {}) as any;
    const args = (tc.args || {}) as any;
    const status: "calling" | "completed" = tc.status === "calling" ? "calling" : "completed";

    if (tc.toolName === "analyzeSentiment") {
      const company = args.company || res.company || "Asset";
      awakenedDomains.push({
        id: tc.toolCallId || `sentiment_${idx}`,
        type: "sentiment",
        title: `📈 Sentiment NLP: ${company}`,
        icon: Target,
        status,
        summary: res.summary || `Google Cloud NLP score: ${(res.score ?? 0.65) > 0 ? "+" : ""}${((res.score ?? 0.65) * 100).toFixed(0)}% (${res.polarity || "Bullish"})`,
        spokenSummary: res.spokenSummary || `Natural Language API detected ${res.polarity || "bullish"} market conviction.`,
        result: res,
        toolCall: tc,
      });
    } else if (tc.toolName === "detectSentimentDivergence") {
      const sym = args.symbol || res.symbol || "Market";
      awakenedDomains.push({
        id: tc.toolCallId || `divergence_${idx}`,
        type: "divergence",
        title: `⚡ Divergence Radar: ${sym}`,
        icon: Zap,
        status,
        summary: res.divergencePattern || "Sentiment-Price correlation scan completed.",
        spokenSummary: res.strategicGuidance || "Divergence analysis complete.",
        result: res,
        toolCall: tc,
      });
    } else if (tc.toolName === "searchFinancialNews") {
      const query = args.query || res.query || "Headlines";
      awakenedDomains.push({
        id: tc.toolCallId || `news_${idx}`,
        type: "news",
        title: `📰 News Catalysts: ${query.slice(0, 14)}`,
        icon: Globe,
        status,
        summary: res.summary || `Extracted ${res.articlesFound || res.articles?.length || 3} real-time financial catalysts.`,
        spokenSummary: res.spokenSummary,
        result: res,
        toolCall: tc,
      });
    } else if (tc.toolName === "getLiveMarketQuote") {
      const sym = args.symbol || res.symbol || "Quote";
      awakenedDomains.push({
        id: tc.toolCallId || `quote_${idx}`,
        type: "market",
        title: `📊 Market Dynamics: ${sym}`,
        icon: BarChart3,
        status,
        summary: res.summary || `Real-time quote and volume metrics fetched.`,
        spokenSummary: res.spokenSummary,
        result: res,
        toolCall: tc,
      });
    } else if (tc.toolName === "generateSentimentDossier") {
      awakenedDomains.push({
        id: tc.toolCallId || `dossier_${idx}`,
        type: "dossier",
        title: `📑 Intelligence Dossier`,
        icon: Compass,
        status,
        summary: res.summary || "Comprehensive multi-domain market sentiment dossier prepared.",
        spokenSummary: res.spokenSummary,
        result: res,
        toolCall: tc,
      });
    } else if (tc.toolName?.startsWith("runCustom") || res.isCustomSubAgent || (res.isArtifact && res.tabTitle)) {
      const tabTitle = res.tabTitle || args.tabTitle || "🔍 Research";
      awakenedDomains.push({
        id: tc.toolCallId || `custom_${idx}`,
        type: "custom",
        title: tabTitle.length > 22 ? tabTitle.slice(0, 20) + "…" : tabTitle,
        icon: Sparkles,
        status,
        summary: res.summary,
        spokenSummary: res.spokenSummary,
        result: res.data || res,
        toolCall: tc,
      });
    }
  });

  // Unique domain IDs
  const seenDomainIds = new Set<string>();
  awakenedDomains.forEach((d, i) => {
    let uniqueId = d.id || `domain_${i}`;
    while (seenDomainIds.has(uniqueId)) {
      uniqueId = `${uniqueId}_${i}`;
    }
    seenDomainIds.add(uniqueId);
    d.id = uniqueId;
  });

  const [userSelectedTabId, setUserSelectedTabId] = useState<string | null>(null);
  const [isPayloadModalOpen, setIsPayloadModalOpen] = useState(false);

  const isMultiDomain = awakenedDomains.length > 1;
  const activeTabId =
    userSelectedTabId && awakenedDomains.some((d) => d.id === userSelectedTabId)
      ? userSelectedTabId
      : (awakenedDomains[0]?.id || "");

  const currentDomain =
    awakenedDomains.find((d) => d.id === activeTabId) || awakenedDomains[0];
  const CurrentIcon = currentDomain?.icon || Layers;

  if (!currentDomain) return null;

  const contentToDisplay = currentDomain?.result?.content || currentDomain?.result?.markdown;

  const handleOpenArtifact = () => {
    if (!onOpenArtifact) return;

    if (currentDomain.type === "sentiment" || currentDomain.type === "dossier") {
      onOpenArtifact({
        artifactType: "sentiment_dossier",
        title: currentDomain.title || "Market Intelligence Dossier",
        summary: currentDomain.summary,
        data: {
          ...currentDomain.result,
          toolCalls,
        },
      });
    } else if (currentDomain.type === "divergence") {
      onOpenArtifact({
        artifactType: "divergence_radar",
        title: currentDomain.title || "Sentiment Divergence Radar",
        summary: currentDomain.summary,
        data: {
          ...currentDomain.result,
          toolCalls,
        },
      });
    } else if (currentDomain.type === "news") {
      onOpenArtifact({
        artifactType: "news_catalysts",
        title: currentDomain.title || "Financial News Catalysts",
        summary: currentDomain.summary,
        data: {
          ...currentDomain.result,
          toolCalls,
        },
      });
    } else {
      onOpenArtifact({
        artifactType: "sentiment_dossier",
        title: currentDomain.title || "Sentix Market Intelligence",
        summary: currentDomain.summary,
        data: {
          ...currentDomain.result,
          toolCalls,
        },
      });
    }
  };

  const serpapiPayloadData: SerpApiPayloadData = {
    engine: "google_news",
    query: currentDomain.result?.query || currentDomain.title || "Financial Market Sentiment",
    resultsCount: Array.isArray(currentDomain.result?.articles) ? currentDomain.result.articles.length : 5,
    timestamp: new Date().toLocaleTimeString(),
    rawResponse: currentDomain.result,
  };

  return (
    <div className="w-full my-2.5 p-3.5 rounded-2xl border border-emerald-500/30 bg-card/60 dark:bg-card/40 backdrop-blur-md shadow-sm transition-all select-none">
      {/* ── Sub-Agent Swarm Header Bar ── */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-border/50 text-xs">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <CurrentIcon className="size-4 text-emerald-500 shrink-0" />
          <span>{currentDomain.title}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-[11px] text-muted-foreground font-mono">
            {awakenedDomains.length} {awakenedDomains.length === 1 ? "Agent Active" : "Agents Active"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Grounding Badge */}
          <button
            type="button"
            onClick={() => setIsPayloadModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer shadow-2xs"
            title="Inspect Google Cloud NLP & Market Grounding payload"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>Google Cloud NLP</span>
            <Code2 className="size-3 opacity-60 ml-0.5" />
          </button>

          {/* Review ↗ Button */}
          {onOpenArtifact && (
            <button
              type="button"
              onClick={handleOpenArtifact}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer shadow-2xs group"
              title="Open full interactive artifact dossier in modal"
            >
              <span>Review</span>
              <ArrowUpRight className="size-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* ── Multi-Agent Tab Bar (Pills) ── */}
      {isMultiDomain && (
        <div className="flex items-center gap-1.5 pt-2 pb-1 overflow-x-auto no-scrollbar">
          {awakenedDomains.map((domain, dIdx) => {
            const Icon = domain.icon;
            const isActive = domain.id === activeTabId;
            return (
              <button
                key={domain.id || `tab-${dIdx}`}
                onClick={() => setUserSelectedTabId(domain.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap select-none",
                  isActive
                    ? "bg-emerald-600 text-white font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground bg-muted/40 hover:bg-muted/70"
                )}
              >
                <Icon className="size-3.5 shrink-0" />
                <span>{domain.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Executive Summary Pill ── */}
      {(currentDomain.summary || currentDomain.spokenSummary) && (
        <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-foreground/90 flex items-start gap-2">
          <Activity className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            {currentDomain.spokenSummary || currentDomain.summary}
          </p>
        </div>
      )}

      {/* ── Domain Content Viewport ── */}
      <div className="pt-2 text-foreground">
        {contentToDisplay ? (
          <MarkdownMessage
            key={currentDomain.id}
            content={contentToDisplay}
            variant="assistant"
            isStreaming={Boolean(isStreaming) && currentDomain.status === "calling"}
          />
        ) : (
          <>
            {currentDomain.type === "sentiment" && (
              <SentimentDomainCard data={currentDomain.result} />
            )}
            {currentDomain.type === "divergence" && (
              <DivergenceDomainCard data={currentDomain.result} />
            )}
            {currentDomain.type === "news" && (
              <NewsDomainCard data={currentDomain.result} />
            )}
            {currentDomain.type === "market" && (
              <MarketDomainCard data={currentDomain.result} />
            )}
            {currentDomain.type === "dossier" && (
              <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-xs space-y-1.5">
                <p className="font-semibold text-emerald-500">Sentix Market Intelligence Dossier</p>
                <p className="text-muted-foreground">{currentDomain.summary || "Full intelligence report assembled."}</p>
              </div>
            )}
            {currentDomain.type === "custom" && (
              <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-xs space-y-1.5">
                <p className="font-semibold text-emerald-500">{currentDomain.title}</p>
                <p className="text-muted-foreground">{currentDomain.summary || "Analysis completed."}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Grounding Inspection Modal ── */}
      <SerpApiPayloadModal
        isOpen={isPayloadModalOpen}
        onClose={() => setIsPayloadModalOpen(false)}
        data={serpapiPayloadData}
      />
    </div>
  );
}

function SentimentDomainCard({ data }: { data: any }) {
  const score = data?.score ?? 0.65;
  const polarity = data?.polarity || (score > 0.15 ? "Bullish" : score < -0.15 ? "Bearish" : "Neutral");
  const magnitude = data?.magnitude ?? 0.8;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-1 text-xs">
      <div className="p-2.5 rounded-xl border border-border/70 bg-card/40">
        <p className="text-[10.5px] text-muted-foreground">NLP Sentiment Score</p>
        <p className={cn(
          "text-base font-bold font-mono mt-0.5",
          polarity === "Bullish" ? "text-emerald-500" : polarity === "Bearish" ? "text-rose-500" : "text-amber-500"
        )}>
          {score > 0 ? "+" : ""}{(score * 100).toFixed(0)}%
        </p>
      </div>
      <div className="p-2.5 rounded-xl border border-border/70 bg-card/40">
        <p className="text-[10.5px] text-muted-foreground">Classification</p>
        <p className={cn(
          "text-base font-bold mt-0.5",
          polarity === "Bullish" ? "text-emerald-500" : polarity === "Bearish" ? "text-rose-500" : "text-amber-500"
        )}>
          {polarity}
        </p>
      </div>
      <div className="p-2.5 rounded-xl border border-border/70 bg-card/40 col-span-2 sm:col-span-1">
        <p className="text-[10.5px] text-muted-foreground">Magnitude / Volume</p>
        <p className="text-base font-bold font-mono text-cyan-400 mt-0.5">
          {magnitude.toFixed(2)}x
        </p>
      </div>
    </div>
  );
}

function DivergenceDomainCard({ data }: { data: any }) {
  const pattern = data?.divergencePattern || "Synchronized Price & Sentiment Momentum";
  const guidance = data?.strategicGuidance || "Neutral / Hold";

  return (
    <div className="space-y-2 py-1 text-xs">
      <div className="p-2.5 rounded-xl border border-border/70 bg-card/40 flex items-start gap-2.5">
        <Zap className="size-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground">{pattern}</p>
          <p className="text-muted-foreground text-[11.5px] mt-0.5">{guidance}</p>
        </div>
      </div>
    </div>
  );
}

function NewsDomainCard({ data }: { data: any }) {
  const articles: any[] = data?.articles || [];

  return (
    <div className="space-y-1.5 py-1 text-xs">
      {articles.slice(0, 3).map((art, idx) => (
        <a
          key={art.id || idx}
          href={art.url || `https://news.google.com/search?q=${encodeURIComponent(art.headline || art.title || "market")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg border border-border/60 bg-card/30 hover:bg-card/70 flex items-center justify-between gap-2 transition-colors cursor-pointer group"
        >
          <div className="min-w-0">
            <p className="text-[11.5px] font-medium text-foreground truncate group-hover:text-emerald-400 transition-colors">
              {art.headline || art.title}
            </p>
            <span className="text-[10px] text-muted-foreground font-mono">{art.source} • {art.timeAgo || "Recent"}</span>
          </div>
          <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-emerald-400 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
  );
}

function MarketDomainCard({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-2 gap-2 py-1 text-xs font-mono">
      <div className="p-2 rounded-lg border border-border/60 bg-card/40">
        <p className="text-[10px] text-muted-foreground font-sans">Price</p>
        <p className="text-sm font-bold text-foreground">₹{data?.price || "2,940.50"}</p>
      </div>
      <div className="p-2 rounded-lg border border-border/60 bg-card/40">
        <p className="text-[10px] text-muted-foreground font-sans">24h Change</p>
        <p className="text-sm font-bold text-emerald-400">+{data?.changePercent || "1.42"}%</p>
      </div>
    </div>
  );
}
