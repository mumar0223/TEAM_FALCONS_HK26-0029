import { NextRequest, NextResponse } from "next/server";
import { LIVE_VOICE_AGENT_CONFIG } from "@/lib/agent/chat-config";
import { GoogleAuth } from "google-auth-library";
import { chatStore } from "@/lib/storage/chat-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return handleVoiceSession(req);
}

export async function GET(req: NextRequest) {
  return handleVoiceSession(req);
}

async function handleVoiceSession(req: NextRequest) {
  try {
    const project = process.env.GOOGLE_VERTEX_PROJECT;
    const location = process.env.LIVE_VOICE_LOCATION || "us-central1";
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!project || !clientEmail || !privateKey) {
      return NextResponse.json(
        {
          error:
            "Vertex AI credentials are incomplete. Configure GOOGLE_VERTEX_PROJECT, GOOGLE_CLIENT_EMAIL, and GOOGLE_PRIVATE_KEY.",
        },
        { status: 500 },
      );
    }

    // Unescape \n in the private key
    privateKey = privateKey.replace(/\\n/g, "\n");

    // Generate short-lived Google OAuth2 access token for Vertex AI Live
    const auth = new GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });
    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const accessToken = tokenResponse?.token;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to generate Vertex AI access token." },
        { status: 500 },
      );
    }

    const body =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const conversationId =
      body.conversationId ||
      new URL(req.url).searchParams.get("conversationId") ||
      undefined;

    const activeArtifactOverview = body.activeArtifactOverview as
      | {
          type?: string;
          title?: string;
          summary?: string;
        }
      | undefined;
    const isCameraActive = Boolean(
      body.isCameraActive ||
      new URL(req.url).searchParams.get("isCameraActive") === "true",
    );
    const rawLang =
      body.language || new URL(req.url).searchParams.get("language") || "en";
    const languageCode = rawLang.split("-")[0]; // "hi-IN" -> "hi"

    const LANGUAGE_MAP: Record<string, { name: string; native: string }> = {
      en: { name: "English", native: "English" },
      hi: { name: "Hindi", native: "हिन्दी" },
      hinglish: {
        name: "Hinglish",
        native: "Hinglish (Hindi in Roman script)",
      },
      mr: { name: "Marathi", native: "मराठी" },
      bn: { name: "Bengali", native: "বাংলা" },
      gu: { name: "Gujarati", native: "ગુજરાતી" },
      ta: { name: "Tamil", native: "தமிழ்" },
      te: { name: "Telugu", native: "తెలుగు" },
      pa: { name: "Punjabi", native: "ਪੰਜਾਬੀ" },
      kn: { name: "Kannada", native: "ಕನ್ನಡ" },
      ml: { name: "Malayalam", native: "മലയാളം" },
    };

    const targetLang = LANGUAGE_MAP[languageCode] || LANGUAGE_MAP.en;

    const history = conversationId
      ? chatStore.getMessages(conversationId).slice(-20)
      : [];
    const hasHistory = history.length > 0;

    const languageInstruction = `
======================================================================
LANGUAGE & SPOKEN CONVERSATION POLICY:
======================================================================
APP LANGUAGE: ${targetLang.name} (${targetLang.native})
${hasHistory ? `SESSION STATE: EXISTING CONVERSATION (${history.length} previous turns).` : "SESSION STATE: NEW CONVERSATION, no prior turns."}

SUPPORTED LANGUAGES:
1. English
2. Hindi (हिन्दी)
3. Hinglish (Conversational Hindi in Roman script)
4. Indian Regional Languages: Marathi, Gujarati, Bengali, Tamil, Telugu, Punjabi, Kannada, Malayalam.

RULES:
- When the user speaks in English, answer in clear, articulate, professional English.
- When the user speaks in Hindi or Hinglish, answer in polite, natural conversational Hindi/Hinglish.
- Keep spoken replies concise, natural, and conversational (1 to 3 short spoken sentences).`;

    const modelId = (LIVE_VOICE_AGENT_CONFIG.model || "gemini-3.8-live")
      .replace(/^models\//, "")
      .replace(
        /^projects\/[^/]+\/locations\/[^/]+\/publishers\/google\/models\//,
        "",
      );
    const model = `projects/${project}/locations/${location}/publishers/google/models/${modelId}`;

    const artifactContext = activeArtifactOverview?.title
      ? `CURRENT ON-SCREEN DOSSIER: ${activeArtifactOverview.type || "dossier"} - "${activeArtifactOverview.title}" (${activeArtifactOverview.summary || "active on screen"}).`
      : `CURRENT ON-SCREEN DOSSIER: None.`;

    let historyContext = "";
    if (hasHistory) {
      const summaryItems: string[] = [];
      for (const m of history) {
        if (m.role === "user" && m.content) {
          summaryItems.push(`User: "${m.content.slice(0, 150)}"`);
        } else if (m.role === "assistant" && m.content) {
          const cleanText = m.content.replace(/```[\s\S]*?```/g, "").replace(/\|[\s\S]*?\|/g, "").trim();
          if (cleanText) {
            summaryItems.push(`Artha Drishti: "${cleanText.slice(0, 200)}"`);
          }
        }
      }

      if (summaryItems.length > 0) {
        historyContext = `
======================================================================
SESSION CONVERSATION MEMORY:
======================================================================
${summaryItems.slice(-6).map((s) => `• ${s}`).join("\n")}
Refer to these previous context points naturally when the user follows up.`;
      }
    }

    let systemInstruction = `You are Artha Drishti (अर्थ दृष्टि), an autonomous Conversational Financial AI and Real-time Market Intelligence Copilot running live on Vertex AI Gemini Live (gemini-3.8-live).

You converse with the user in natural, fluid spoken voice in real time.
You have deep expertise in global financial markets, US equities (Apple, NVIDIA, Tesla, Microsoft, Alphabet), Indian equities (NSE/BSE, Nifty 50, Reliance, TCS, HDFC Bank), corporate earnings, macroeconomics, Google Cloud NLP sentiment analysis, and sentiment-price divergence.
${languageInstruction}
${historyContext}
${artifactContext}

======================================================================
CORE PROTOCOL: CONVERSATIONAL AI vs MARKET INTELLIGENCE DISPATCH
======================================================================
1. CONVERSATIONAL FINANCIAL AI (NO TOOLS REQUIRED):
- For ANY general financial discussion, concept question, greeting, market chat, or explanation:
  * "Hello", "Hi", "Good morning"
  * "What is market sentiment?", "Explain P/E ratio", "How does inflation impact tech stocks?"
  * "What do you think about AI semiconductor demand?"
  * "How does sentiment divergence signal smart money accumulation?"
- ACTION: Speak back directly in a warm, confident, expert spoken voice (1-3 sentences). DO NOT call any tool!

2. ACTIONABLE MARKET INTELLIGENCE & DOSSIER GENERATION:
- When the user asks for specific market research, live quotes, sentiment classification, news headlines, divergence scans, or a stock dossier (e.g., "Analyze sentiment for Apple", "Check divergence in Nvidia", "Show latest headlines for Reliance", "What is the sentiment score for Tesla?"):
- ACTION: Call 'triggerScreenAction({ spokenAnnouncement, query })'.
- PROTOCOL:
  * Fill 'spokenAnnouncement' in the user's CURRENT language announcing what you are analyzing right now (e.g. "I'm analyzing Google Cloud NLP sentiment and price divergence for Apple now. In the meantime, feel free to ask me anything else!" / "मैं एप्पल के लिए सेंटीमेंट और डाइवर्जेंस डेटा तैयार कर रहा हूँ। तब तक आप कुछ भी पूछ सकते हैं!").
  * After the tool finishes, speak the key sentiment score, divergence pattern, or news takeaway in 1–2 crisp sentences.

Never recite raw markdown tables, json, or technical schema details in speech. Speak naturally like a senior Wall Street and Dalal Street quantitative analyst.`;

    const tools = [
      {
        functionDeclarations: [
          {
            name: "triggerScreenAction",
            description:
              "MARKET INTELLIGENCE & SENTIMENT SWARM TOOL. Dispatches operations to autonomous sub-agents to analyze Google Cloud Natural Language sentiment (-1.0 to +1.0), detect price-sentiment divergence patterns, fetch live stock quotes, search financial news, and stage interactive dossiers on the user's screen. WHEN TO CALL: When user asks for sentiment analysis, divergence detection, stock quote, financial news, or a sentiment dossier. WHEN NOT TO CALL: Do NOT call for general conversational chat, definitions, macro questions, or greetings — answer those directly with spoken voice.",
            parameters: {
              type: "OBJECT",
              properties: {
                spokenAnnouncement: {
                  type: "STRING",
                  description:
                    "MANDATORY. One natural spoken announcement in the user's CURRENT language announcing what you are analyzing right now AND warmly telling the user they can ask anything in the meantime. Example: 'I am analyzing sentiment and divergence for NVIDIA now. In the meantime, feel free to ask me anything!'",
                },
                query: {
                  type: "STRING",
                  description:
                    "The stock ticker and analysis instructions for the subagent, e.g. 'Analyze sentiment and search financial news for NVDA'.",
                },
                captureImage: {
                  type: "BOOLEAN",
                  description:
                    "Set to true only if inspecting an image on camera.",
                },
              },
              required: ["spokenAnnouncement", "query"],
            },
          },
        ],
      },
    ];

    const toolConfig = {
      functionCallingConfig: {
        mode: "AUTO",
      },
    };

    const safetySettings = [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_LOW_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_LOW_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_LOW_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_LOW_AND_ABOVE",
      },
    ];

    const wsUrl = `wss://${location}-aiplatform.googleapis.com/ws/google.cloud.aiplatform.v1beta1.LlmBidiService/BidiGenerateContent?access_token=${accessToken}`;

    const sessionNote = hasHistory
      ? null
      : `[Session note: new chat. App language is ${targetLang.name}. Answer in ${targetLang.name}, then mirror the user's language.]`;

    return NextResponse.json({
      accessToken,
      model,
      wsUrl,
      location,
      voiceName: LIVE_VOICE_AGENT_CONFIG.voiceName || "Puck",
      systemInstruction,
      tools,
      toolConfig,
      safetySettings,
      conversationId,
      sessionNote,
      hasHistory,
    });
  } catch (error) {
    console.error("[voice/session]", error);
    return NextResponse.json(
      { error: "Failed to initialize the Vertex voice session" },
      { status: 500 },
    );
  }
}
