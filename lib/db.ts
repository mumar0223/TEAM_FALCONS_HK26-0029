import Dexie, { type Table } from "dexie";

export interface StockItem {
  id: string;
  symbol: string;
  name: string;
  exchange: "NSE" | "BSE" | "NASDAQ" | "NYSE";
  sector: string;
  price: number;
  currency: "INR" | "USD";
  changePercent: number;
  sentimentScore: number; // -1.0 to +1.0
  sentimentLabel: "Bullish" | "Bearish" | "Neutral";
  positivePercent: number;
  neutralPercent: number;
  negativePercent: number;
  newsCount: number;
  buzzVolume: number;
  isWatchlist: boolean;
  updatedAt: number;
}

export interface SentimentHistoryPoint {
  id: string; // `${symbol}_${timestamp}`
  symbol: string;
  timestamp: number;
  dateLabel: string;
  price: number;
  sentimentScore: number; // -1.0 to +1.0
  sentimentNormalized: number; // 0 to 100
  volume: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  keyHeadline?: string;
}

export interface NewsItem {
  id: string;
  symbol: string;
  sector: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: number;
  timeAgo: string;
  sentiment: "positive" | "negative" | "neutral";
  confidence: number; // 0.0 to 1.0
  sentimentScore: number; // -1.0 to +1.0
  drivers: string[];
  finbertExplanation: string;
}

export interface AlertItem {
  id: string;
  symbol: string;
  type: "divergence" | "sentiment_surge" | "negative_breakout" | "volume_spike";
  severity: "high" | "medium" | "info";
  title: string;
  message: string;
  metricChange: string;
  timestamp: number;
  read: boolean;
}

export interface SectorSentiment {
  id: string;
  name: string;
  sentimentScore: number; // -1.0 to +1.0
  sentimentLabel: "Bullish" | "Bearish" | "Neutral";
  change24h: number;
  stockCount: number;
  topStock: string;
  topDriver: string;
}

export interface ConversationRecord {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  pinned: boolean;
}

export interface MessageRecord {
  id: string;
  conversationId: string;
  role: "user" | "assistant" | "system";
  content: string;
  thinking?: string;
  createdAt: number;
}

export class SentixDatabase extends Dexie {
  stocks!: Table<StockItem, string>;
  sentimentHistory!: Table<SentimentHistoryPoint, string>;
  newsFeed!: Table<NewsItem, string>;
  alerts!: Table<AlertItem, string>;
  sectors!: Table<SectorSentiment, string>;
  conversations!: Table<ConversationRecord, string>;
  messages!: Table<MessageRecord, string>;

  constructor() {
    super("SentixMarketSentimentDB");
    this.version(1).stores({
      stocks: "id, symbol, name, sector, sentimentLabel, isWatchlist, updatedAt",
      sentimentHistory: "id, symbol, timestamp, [symbol+timestamp]",
      newsFeed: "id, symbol, sector, sentiment, publishedAt",
      alerts: "id, symbol, type, severity, timestamp, read",
      sectors: "id, name, sentimentLabel",
      conversations: "id, createdAt, updatedAt, pinned",
      messages: "id, conversationId, role, createdAt",
    });
  }
}

export const db = new SentixDatabase();

// ==========================================
// SEED DATA GENERATOR
// ==========================================

export const INITIAL_STOCKS: StockItem[] = [
  {
    id: "nifty50",
    symbol: "NIFTY 50",
    name: "Nifty 50 Index",
    exchange: "NSE",
    sector: "Indices",
    price: 25120.45,
    currency: "INR",
    changePercent: 0.84,
    sentimentScore: 0.68,
    sentimentLabel: "Bullish",
    positivePercent: 68,
    neutralPercent: 20,
    negativePercent: 12,
    newsCount: 420,
    buzzVolume: 12400,
    isWatchlist: true,
    updatedAt: Date.now(),
  },
  {
    id: "reliance",
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    exchange: "NSE",
    sector: "Energy",
    price: 2985.3,
    currency: "INR",
    changePercent: 1.45,
    sentimentScore: 0.76,
    sentimentLabel: "Bullish",
    positivePercent: 74,
    neutralPercent: 16,
    negativePercent: 10,
    newsCount: 168,
    buzzVolume: 5600,
    isWatchlist: true,
    updatedAt: Date.now(),
  },
  {
    id: "nvda",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    exchange: "NASDAQ",
    sector: "Technology",
    price: 132.85,
    currency: "USD",
    changePercent: 3.2,
    sentimentScore: 0.88,
    sentimentLabel: "Bullish",
    positivePercent: 86,
    neutralPercent: 9,
    negativePercent: 5,
    newsCount: 890,
    buzzVolume: 34500,
    isWatchlist: true,
    updatedAt: Date.now(),
  },
  {
    id: "tcs",
    symbol: "TCS",
    name: "Tata Consultancy Services",
    exchange: "NSE",
    sector: "Technology",
    price: 4180.1,
    currency: "INR",
    changePercent: -0.65,
    sentimentScore: -0.25,
    sentimentLabel: "Bearish",
    positivePercent: 28,
    neutralPercent: 35,
    negativePercent: 37,
    newsCount: 142,
    buzzVolume: 4100,
    isWatchlist: true,
    updatedAt: Date.now(),
  },
  {
    id: "hdfcbank",
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    exchange: "NSE",
    sector: "Banking",
    price: 1672.4,
    currency: "INR",
    changePercent: 0.32,
    sentimentScore: 0.42,
    sentimentLabel: "Bullish",
    positivePercent: 54,
    neutralPercent: 32,
    negativePercent: 14,
    newsCount: 210,
    buzzVolume: 6800,
    isWatchlist: true,
    updatedAt: Date.now(),
  },
  {
    id: "aapl",
    symbol: "AAPL",
    name: "Apple Inc.",
    exchange: "NASDAQ",
    sector: "Technology",
    price: 234.5,
    currency: "USD",
    changePercent: 0.95,
    sentimentScore: 0.52,
    sentimentLabel: "Bullish",
    positivePercent: 58,
    neutralPercent: 28,
    negativePercent: 14,
    newsCount: 540,
    buzzVolume: 21000,
    isWatchlist: false,
    updatedAt: Date.now(),
  },
  {
    id: "tsla",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    exchange: "NASDAQ",
    sector: "Automotive",
    price: 218.4,
    currency: "USD",
    changePercent: -2.45,
    sentimentScore: -0.58,
    sentimentLabel: "Bearish",
    positivePercent: 22,
    neutralPercent: 20,
    negativePercent: 58,
    newsCount: 610,
    buzzVolume: 28900,
    isWatchlist: false,
    updatedAt: Date.now(),
  },
  {
    id: "tatamotors",
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd",
    exchange: "NSE",
    sector: "Automotive",
    price: 940.6,
    currency: "INR",
    changePercent: 1.8,
    sentimentScore: 0.65,
    sentimentLabel: "Bullish",
    positivePercent: 67,
    neutralPercent: 21,
    negativePercent: 12,
    newsCount: 135,
    buzzVolume: 4900,
    isWatchlist: false,
    updatedAt: Date.now(),
  },
];

export const INITIAL_SECTORS: SectorSentiment[] = [
  {
    id: "tech",
    name: "Technology & AI",
    sentimentScore: 0.72,
    sentimentLabel: "Bullish",
    change24h: 1.9,
    stockCount: 18,
    topStock: "NVDA",
    topDriver: "Datacenter AI GPU Demand & Cloud Spending",
  },
  {
    id: "banking",
    name: "Banking & Financials",
    sentimentScore: 0.48,
    sentimentLabel: "Bullish",
    change24h: 0.4,
    stockCount: 14,
    topStock: "HDFCBANK",
    topDriver: "Healthy Net Interest Margins & Credit Growth",
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    sentimentScore: 0.62,
    sentimentLabel: "Bullish",
    change24h: 1.1,
    stockCount: 11,
    topStock: "RELIANCE",
    topDriver: "Refining Margins & Green Hydrogen Pipeline",
  },
  {
    id: "auto",
    name: "Automotive & EV",
    sentimentScore: -0.15,
    sentimentLabel: "Neutral",
    change24h: -0.8,
    stockCount: 9,
    topStock: "TATAMOTORS",
    topDriver: "EV Margin Pressures vs Domestic PV Strength",
  },
  {
    id: "pharma",
    name: "Healthcare & Pharma",
    sentimentScore: 0.35,
    sentimentLabel: "Neutral",
    change24h: 0.3,
    stockCount: 12,
    topStock: "SUNPHARMA",
    topDriver: "US FDA Approvals & Biosimilar Pipeline",
  },
  {
    id: "fmcg",
    name: "FMCG & Retail",
    sentimentScore: 0.18,
    sentimentLabel: "Neutral",
    change24h: 0.1,
    stockCount: 8,
    topStock: "ITC",
    topDriver: "Rural Demand Recovery & Stable Raw Material Costs",
  },
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "news-1",
    symbol: "NVDA",
    sector: "Technology",
    title: "NVIDIA Unveils Next-Gen AI Silicon With Massive Hyperscaler Commitments",
    summary:
      "Enterprise customer backlog surges past $40B as tier-1 cloud providers double capex for high-density generative AI clusters.",
    source: "Bloomberg",
    url: "https://bloomberg.com",
    publishedAt: Date.now() - 1000 * 60 * 18,
    timeAgo: "18m ago",
    sentiment: "positive",
    confidence: 0.96,
    sentimentScore: 0.92,
    drivers: ["Enterprise Capex", "Chip Demand", "Margin Expansion"],
    finbertExplanation:
      "FinBERT identifies high bullish polarity (0.96) triggered by contract backlog expansion and hyperscaler commitments.",
  },
  {
    id: "news-2",
    symbol: "RELIANCE",
    sector: "Energy",
    title: "Reliance Q3 Preview: Oil-to-Chemicals Margin Recovery and 5G Monetization in Focus",
    summary:
      "Analysts forecast 14% YoY consolidated EBITDA expansion supported by robust telecom ARPU gains and retail store expansion.",
    source: "Economic Times",
    url: "https://economictimes.indiatimes.com",
    publishedAt: Date.now() - 1000 * 60 * 45,
    timeAgo: "45m ago",
    sentiment: "positive",
    confidence: 0.89,
    sentimentScore: 0.78,
    drivers: ["ARPU Expansion", "Retail Footprint", "EBITDA Growth"],
    finbertExplanation:
      "Positive sentiment driven by projected EBITDA expansion and telecom monetisation metrics.",
  },
  {
    id: "news-3",
    symbol: "TCS",
    sector: "Technology",
    title: "TCS Notes Sluggish Discretionary IT Spend Across European Banking Clients",
    summary:
      "Management highlights prolonged decision cycles in consulting projects despite steady mega-deal conversions.",
    source: "Reuters",
    url: "https://reuters.com",
    publishedAt: Date.now() - 1000 * 60 * 85,
    timeAgo: "1h ago",
    sentiment: "negative",
    confidence: 0.82,
    sentimentScore: -0.64,
    drivers: ["Discretionary Cut", "Delayed Decision Cycles", "Europe Slowdown"],
    finbertExplanation:
      "Bearish polarity due to cautionary tone regarding European banking discretionary spending cuts.",
  },
  {
    id: "news-4",
    symbol: "HDFCBANK",
    sector: "Banking",
    title: "HDFC Bank Deposit Mobilization Reaches Record High; Credit-Deposit Ratio Normalized",
    summary:
      "Deposit growth outpaces loan book expansion, easing liquidity pressure and reducing funding cost volatility.",
    source: "LiveMint",
    url: "https://livemint.com",
    publishedAt: Date.now() - 1000 * 60 * 130,
    timeAgo: "2h ago",
    sentiment: "positive",
    confidence: 0.88,
    sentimentScore: 0.65,
    drivers: ["Deposit Growth", "LDR Normalization", "NIM Stability"],
    finbertExplanation:
      "Constructive tone indicating successful post-merger balance sheet adjustment and reduced liquidity strain.",
  },
  {
    id: "news-5",
    symbol: "TSLA",
    sector: "Automotive",
    title: "Tesla Faces Escalating Price Wars in Asian EV Markets as Inventories Rise",
    summary:
      "Intensified price cuts by domestic EV manufacturers prompt margin downgrades from multiple Wall Street brokerages.",
    source: "Wall Street Journal",
    url: "https://wsj.com",
    publishedAt: Date.now() - 1000 * 60 * 190,
    timeAgo: "3h ago",
    sentiment: "negative",
    confidence: 0.91,
    sentimentScore: -0.74,
    drivers: ["Price War", "Inventory Buildup", "Margin Compression"],
    finbertExplanation:
      "High negative confidence triggered by brokerage downgrades and persistent automotive gross margin compression.",
  },
  {
    id: "news-6",
    symbol: "NIFTY 50",
    sector: "Indices",
    title: "FII Inflows Rebound in Indian Equities; Domestic Institutional Buying Remains Unbroken",
    summary:
      "Foreign institutional investors turn net buyers for the fourth straight session as macro fundamentals stay resilient.",
    source: "CNBC TV18",
    url: "https://cnbctv18.com",
    publishedAt: Date.now() - 1000 * 60 * 240,
    timeAgo: "4h ago",
    sentiment: "positive",
    confidence: 0.92,
    sentimentScore: 0.81,
    drivers: ["FII Buying", "Macro Resilience", "Liquidity Surge"],
    finbertExplanation:
      "Strong positive institutional flow indicators correlating with broader market breadth expansion.",
  },
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: "alert-1",
    symbol: "NVDA",
    type: "sentiment_surge",
    severity: "high",
    title: "Sentiment Surge Detected",
    message:
      "Public & financial news sentiment jumped +42% in the last 4 hours following datacenter chip announcement.",
    metricChange: "+42% Sentiment Score (0.46 → 0.88)",
    timestamp: Date.now() - 1000 * 60 * 30,
    read: false,
  },
  {
    id: "alert-2",
    symbol: "RELIANCE",
    type: "divergence",
    severity: "medium",
    title: "Bullish Divergence Signal",
    message:
      "Sentiment rose +28% while price consolidated sideways (-0.2%). Historical pattern suggests accumulation.",
    metricChange: "Sentiment +28% vs Price -0.2%",
    timestamp: Date.now() - 1000 * 60 * 95,
    read: false,
  },
  {
    id: "alert-3",
    symbol: "TSLA",
    type: "negative_breakout",
    severity: "high",
    title: "Bearish Sentiment Breakout",
    message:
      "Negative discussion volume spiked 210% across financial blogs and news over price cuts.",
    metricChange: "Negative ratio rose to 58%",
    timestamp: Date.now() - 1000 * 60 * 180,
    read: false,
  },
];

// Helper to generate 24 hours / 7 days of realistic price & sentiment history
export function generateHistoryForSymbol(
  symbol: string,
  basePrice: number,
  baseSentiment: number,
  points = 24
): SentimentHistoryPoint[] {
  const history: SentimentHistoryPoint[] = [];
  const now = Date.now();
  const stepMs = (24 * 60 * 60 * 1000) / points;

  let currentPrice = basePrice * 0.97;
  let currentSentiment = baseSentiment - 0.2;

  for (let i = points; i >= 0; i--) {
    const timestamp = now - i * stepMs;
    const dateObj = new Date(timestamp);
    const dateLabel = `${dateObj.getHours().toString().padStart(2, "0")}:00`;

    // Drift with realistic Brownian noise
    const priceDrift = (Math.random() - 0.48) * (basePrice * 0.008);
    currentPrice = Math.max(basePrice * 0.85, currentPrice + priceDrift);

    const sentimentDrift = (Math.random() - 0.47) * 0.08;
    currentSentiment = Math.max(-0.95, Math.min(0.95, currentSentiment + sentimentDrift));

    const sentimentNorm = Math.round(((currentSentiment + 1) / 2) * 100);
    const volume = Math.round(500 + Math.random() * 2500);

    const pos = Math.round(Math.max(10, Math.min(85, sentimentNorm + (Math.random() - 0.5) * 10)));
    const neg = Math.round(Math.max(5, Math.min(60, 100 - pos - 15 + (Math.random() - 0.5) * 8)));
    const neu = Math.max(5, 100 - pos - neg);

    history.push({
      id: `${symbol}_${timestamp}`,
      symbol,
      timestamp,
      dateLabel,
      price: Number(currentPrice.toFixed(2)),
      sentimentScore: Number(currentSentiment.toFixed(2)),
      sentimentNormalized: sentimentNorm,
      volume,
      positiveCount: pos,
      negativeCount: neg,
      neutralCount: neu,
    });
  }

  // Ensure last point aligns with current
  if (history.length > 0) {
    history[history.length - 1].price = basePrice;
    history[history.length - 1].sentimentScore = baseSentiment;
    history[history.length - 1].sentimentNormalized = Math.round(((baseSentiment + 1) / 2) * 100);
  }

  return history;
}

// ==========================================
// SEEDING AND PERSISTENCE METHODS
// ==========================================

export async function ensureDatabaseSeeded(): Promise<void> {
  const count = await db.stocks.count();
  if (count > 0) {
    return; // Already initialized
  }

  // 1. Populate Stocks
  await db.stocks.bulkPut(INITIAL_STOCKS);

  // 2. Populate Sectors
  await db.sectors.bulkPut(INITIAL_SECTORS);

  // 3. Populate News
  await db.newsFeed.bulkPut(INITIAL_NEWS);

  // 4. Populate Alerts
  await db.alerts.bulkPut(INITIAL_ALERTS);

  // 5. Populate Historical comparison data for all initial stocks
  const allHistory: SentimentHistoryPoint[] = [];
  for (const stock of INITIAL_STOCKS) {
    const points = generateHistoryForSymbol(stock.symbol, stock.price, stock.sentimentScore);
    allHistory.push(...points);
  }
  await db.sentimentHistory.bulkPut(allHistory);

  // 6. Create default AI conversation
  const defaultConv: ConversationRecord = {
    id: "market-briefing-1",
    title: "Market Sentiment Briefing",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    pinned: true,
  };
  await db.conversations.put(defaultConv);

  const welcomeMsg: MessageRecord = {
    id: "msg-welcome-1",
    conversationId: "market-briefing-1",
    role: "assistant",
    content: `### Welcome to Sentix AI Terminal 📈\n\nI am your **AI Financial Market Sentiment Copilot**. I analyze real-time financial news, corporate disclosures, and market discussions to help you detect:\n\n* **Price vs. Sentiment Divergences** (e.g. accumulating vs. distributing stocks)\n* **Sector Momentum & FinBERT Sentiment Shifts**\n* **Real-time News Sentiment Polarity & Confidence**\n\nAsk me anything about current market sentiment, compare companies, or request a sentiment breakdown!`,
    createdAt: Date.now(),
  };
  await db.messages.put(welcomeMsg);
}

// Fetch all stocks
export async function getAllStocks(): Promise<StockItem[]> {
  await ensureDatabaseSeeded();
  return db.stocks.toArray();
}

// Fetch single stock
export async function getStockBySymbol(symbol: string): Promise<StockItem | undefined> {
  await ensureDatabaseSeeded();
  return db.stocks.where("symbol").equalsIgnoreCase(symbol).first();
}

// Toggle watchlist
export async function toggleStockWatchlist(symbol: string): Promise<boolean> {
  const stock = await db.stocks.where("symbol").equalsIgnoreCase(symbol).first();
  if (!stock) return false;
  const newStatus = !stock.isWatchlist;
  await db.stocks.update(stock.id, { isWatchlist: newStatus });
  return newStatus;
}

// Fetch history for a stock
export async function getStockHistory(symbol: string): Promise<SentimentHistoryPoint[]> {
  await ensureDatabaseSeeded();
  return db.sentimentHistory
    .where("symbol")
    .equals(symbol)
    .sortBy("timestamp");
}

// Fetch news feed
export async function getNewsFeed(symbol?: string, sector?: string): Promise<NewsItem[]> {
  await ensureDatabaseSeeded();
  let collection = db.newsFeed.orderBy("publishedAt").reverse();
  const all = await collection.toArray();
  return all.filter((item) => {
    if (symbol && symbol !== "ALL" && item.symbol !== symbol) return false;
    if (sector && sector !== "ALL" && item.sector !== sector) return false;
    return true;
  });
}

// Fetch alerts
export async function getAlerts(): Promise<AlertItem[]> {
  await ensureDatabaseSeeded();
  return db.alerts.orderBy("timestamp").reverse().toArray();
}

// Mark alert read
export async function markAlertRead(id: string): Promise<void> {
  await db.alerts.update(id, { read: true });
}

// Fetch sectors
export async function getAllSectors(): Promise<SectorSentiment[]> {
  await ensureDatabaseSeeded();
  return db.sectors.toArray();
}

// Conversation helpers
export async function getAllConversations(): Promise<ConversationRecord[]> {
  await ensureDatabaseSeeded();
  return db.conversations.orderBy("updatedAt").reverse().toArray();
}

export async function getConversationById(id: string): Promise<ConversationRecord | undefined> {
  await ensureDatabaseSeeded();
  return db.conversations.get(id);
}

export async function getConversationMessages(conversationId: string): Promise<MessageRecord[]> {
  await ensureDatabaseSeeded();
  return db.messages
    .where("conversationId")
    .equals(conversationId)
    .sortBy("createdAt");
}

export const getMessagesByConversationId = getConversationMessages;

export async function addMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string,
  thinking?: string
): Promise<MessageRecord> {
  const msg: MessageRecord = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    conversationId,
    role,
    content,
    thinking,
    createdAt: Date.now(),
  };
  await db.messages.put(msg);
  await db.conversations.update(conversationId, { updatedAt: Date.now() });
  return msg;
}

export async function saveMessage(msg: Partial<MessageRecord> & { id: string; conversationId: string; role: any; content: string }): Promise<string> {
  await ensureDatabaseSeeded();
  const record: MessageRecord = {
    id: msg.id,
    conversationId: msg.conversationId,
    role: msg.role,
    content: msg.content,
    thinking: msg.thinking,
    createdAt: msg.createdAt || Date.now(),
  };
  await db.messages.put(record);
  await db.conversations.update(msg.conversationId, { updatedAt: Date.now() });
  return record.id;
}

export async function createConversation(title = "New Market Analysis"): Promise<ConversationRecord> {
  const conv: ConversationRecord = {
    id: `conv-${Date.now()}`,
    title,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    pinned: false,
  };
  await db.conversations.put(conv);
  return conv;
}

export async function saveConversation(conv: ConversationRecord): Promise<void> {
  await db.conversations.put(conv);
}

export async function updateConversation(id: string, updates: Partial<ConversationRecord>): Promise<void> {
  await db.conversations.update(id, updates);
}

export async function deleteConversation(id: string): Promise<void> {
  await db.conversations.delete(id);
  await db.messages.where("conversationId").equals(id).delete();
}

export interface BusinessProfile {
  id?: string;
  businessName?: string;
  category?: string;
  city?: string;
  district?: string;
  source?: string;
  updatedAt?: number;
}

export interface EnterpriseRecord {
  id: string;
  domain: string;
  title: string;
  summary: string;
  timestamp: number;
  data?: any;
}

export async function getActiveBusinessProfile(): Promise<BusinessProfile | null> {
  return null;
}

export async function saveBusinessProfile(profile: Partial<BusinessProfile>): Promise<BusinessProfile> {
  return profile as BusinessProfile;
}

export async function clearBusinessProfile(): Promise<void> {}

export async function saveEnterpriseIntelligence(data: any): Promise<any> {
  return data;
}

export async function saveEnterpriseRecord(record: EnterpriseRecord): Promise<void> {}

export async function getEnterpriseRecords(domain?: string): Promise<EnterpriseRecord[]> {
  return [];
}

