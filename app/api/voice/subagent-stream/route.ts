import { NextRequest, NextResponse } from "next/server";
import { getAgentTools } from "@/lib/agent/tools";
import { getLanguageModel } from "@/lib/agent/ai-provider";
import { DASHBOARD_CHAT_CONFIG } from "@/lib/agent/chat-config";
import { chatStore } from "@/lib/storage/chat-store";
import { streamText } from "ai";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let query = "";
    let conversationId: string | undefined = undefined;
    let language = "en";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      query = (formData.get("query") as string) || "";
      conversationId = (formData.get("conversationId") as string) || undefined;
      language = (formData.get("language") as string) || "en";
    } else {
      const body = await req.json().catch(() => ({}));
      query = body.query || "";
      conversationId = body.conversationId;
      language = body.language || "en";
    }

    if (!query.trim()) {
      query = "Analyze market sentiment";
    }

    const streamStartTime = Date.now();

    // Prepare history
    let chatHistoryMessages: any[] = [];
    if (conversationId) {
      try {
        const history = chatStore.getMessages(conversationId).slice(-6);
        chatHistoryMessages = history
          .filter((m) => m.content && m.content.trim())
          .map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content.slice(0, 300),
          }));
      } catch (e) {
        console.warn("[voice/subagent-stream] error reading history:", e);
      }
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const sendEvent = (event: string, data: any) => {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          );
        };

        try {
          sendEvent("status", {
            status: "working",
            activeTool: "marketIntelligence",
            description: `Analyzing market intelligence for "${query}"`,
            spokenHint: "Analyzing market data...",
            progressPhase: "analyzing",
          });

          const collectedToolCalls: any[] = [];
          const tools = getAgentTools({
            conversationId,
            onToolDelta: (delta: any) => {
              if (delta.type === "tool-call") {
                sendEvent("tool_call", {
                  toolName: delta.toolName,
                  summary: delta.summary,
                });
              }
            },
          });

          const model = getLanguageModel(
            DASHBOARD_CHAT_CONFIG.provider,
            DASHBOARD_CHAT_CONFIG.model
          );

          const systemInstruction = `You are Artha Drishti, an elite conversational financial AI and market intelligence copilot.
You have been invoked to analyze market data, sentiment, or corporate news for: "${query}".

Analyze the company or ticker mentioned in the query.
Use the provided tools (analyzeSentiment, getLiveMarketQuote, searchFinancialNews, detectSentimentDivergence) to gather factual intelligence.
Then synthesize a concise, high-conviction spoken summary (2-3 short sentences max) that can be read out over voice to the user.
Speak naturally like a Wall Street quantitative analyst.`;

          const result = streamText({
            model,
            system: systemInstruction,
            messages: [
              ...chatHistoryMessages,
              { role: "user", content: query },
            ],
            tools,
            temperature: 0.3,
          });

          let assistantText = "";
          for await (const chunk of result.textStream) {
            assistantText += chunk;
            sendEvent("chunk", { text: chunk });
          }

          // Await full result to get completed tool calls
          try {
            const toolResults = await result.toolResults;
            if (Array.isArray(toolResults)) {
              for (const tr of toolResults) {
                const anyTr = tr as any;
                const item = {
                  toolName: anyTr.toolName,
                  toolCallId: anyTr.toolCallId,
                  args: anyTr.args,
                  summary: `Executed ${anyTr.toolName}`,
                  status: "completed",
                  result: anyTr.result,
                };
                collectedToolCalls.push(item);
                sendEvent("tool_result", item);
              }
            }
          } catch (trErr) {
            console.warn("[voice/subagent-stream] toolResults error:", trErr);
          }

          const elapsedSeconds = Number(
            ((Date.now() - streamStartTime) / 1000).toFixed(1)
          );

          sendEvent("done", {
            assistantContent: assistantText || "Market analysis completed.",
            toolCalls: collectedToolCalls,
            thoughtDurationSeconds: elapsedSeconds,
          });

          controller.close();
        } catch (err: any) {
          console.error("[voice/subagent-stream execution error]:", err);
          sendEvent("status", {
            status: "error",
            description: "Market intelligence agent encountered an issue.",
          });
          sendEvent("done", {
            assistantContent: `Analysis for "${query}" completed with standard estimates.`,
            toolCalls: [],
          });
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    console.error("[voice/subagent-stream fatal]:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
