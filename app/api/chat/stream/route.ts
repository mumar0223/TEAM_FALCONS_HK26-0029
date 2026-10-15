import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { getLanguageModel } from "@/lib/agent/ai-provider";
import { DASHBOARD_CHAT_CONFIG } from "@/lib/agent/chat-config";
import { getAgentTools } from "@/lib/agent/tools";
import { chatStore } from "@/lib/storage/chat-store";

export const dynamic = "force-dynamic";

const SYSTEM_INSTRUCTION = `You are Artha Drishti, an elite conversational financial AI assistant, market intelligence analyst, and quantitative research copilot.
Your mission is to converse with investors, answer market questions, analyze financial news, corporate disclosures, and market discussions to classify sentiment as Positive/Bullish, Negative/Bearish, or Neutral.

Core Capabilities:
1. Sentiment Classification using Google Cloud Natural Language API tools to output exact numerical polarity (-1.0 to +1.0) and magnitude.
2. Company-wise and Sector-wise sentiment analysis across Indian & Global equities.
3. Sentiment Divergence Analysis: Detecting when market perception decouples from stock price movement (e.g., Bullish Accumulation when price consolidates while sentiment surges, or Bearish Distribution when price floats up while sentiment deteriorates).
4. Explaining the NLP linguistic reasoning behind sentiment ratings.

Formatting Rules:
- Use clean GitHub-flavored Markdown.
- Use bold keywords and numerical values (e.g. **+0.84%**, **₹2,985.30**, **Score: +0.76**).
- Include mathematical formulas in KaTeX when helpful (e.g. $$\\text{Net Polarity} = P(\\text{Positive}) - P(\\text{Negative})$$).
- Provide actionable, structured takeaways without giving guaranteed financial advice.
`;

export async function POST(req: NextRequest) {
  try {
    const { message, conversationId, history = [] } = await req.json();

    const textContent = typeof message === "string" ? message.trim() : "";
    if (!textContent) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. Manage Conversation in Store
    let activeConvId = conversationId;
    if (!activeConvId) {
      const conv = chatStore.createConversation(textContent.slice(0, 30));
      activeConvId = conv.id;
    }

    chatStore.addMessage({
      conversationId: activeConvId,
      role: "user",
      content: textContent,
    });

    // 2. Prepare Tools and Language Model
    const tools = getAgentTools({
      conversationId: activeConvId,
    });

    const model = getLanguageModel(
      DASHBOARD_CHAT_CONFIG.provider,
      DASHBOARD_CHAT_CONFIG.model
    );

    // 3. Convert history to messages format
    const formattedMessages = history.map((h: any) => ({
      role: h.role,
      content: h.content,
    }));
    formattedMessages.push({ role: "user", content: textContent });

    // 4. Stream Response with Tools
    const result = streamText({
      model,
      system: SYSTEM_INSTRUCTION,
      messages: formattedMessages,
      tools,
      onFinish: (event) => {
        if (event.text) {
          chatStore.addMessage({
            conversationId: activeConvId,
            role: "assistant",
            content: event.text,
          });
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (err: any) {
    console.error("[Chat Stream Error]:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
