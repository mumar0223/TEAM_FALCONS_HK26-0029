export const STOCKS_DATA = {
  RELIANCE: {
    symbol: "RELIANCE.NS",
    name: "Reliance Industries Ltd.",
    exchange: "NSE EQUITIES",
    price: "₹2,972.40",
    change: "+35.65",
    changePercent: "+1.21%",
    isPositive: true,
    currency: "INR",
    engine: "FINBERT-L9",
    sentiment: {
      score: 68,
      label: "BULLISH",
      change: "+4.2% vs 24h",
      index: "+0.68",
      sourcesCount: 142,
      sparkline: [22, 28, 24, 38, 48, 42, 62, 68, 60, 68]
    },
    corpus: {
      volume: 142,
      window: "24h Rolling",
      change: "+18 in 4h",
      outlets: 62,
      desks: 54,
      reg: 26,
      coverage: "99.4%",
      tokens: "4.8M"
    },
    polarity: {
      pos: 68,
      neu: 20,
      neg: 12,
      posItems: 97,
      neuItems: 28,
      negItems: 17,
      confidence: "94.2%",
      zscore: "+1.84"
    },
    priceVsSentiment: {
      dates: ["Oct 18", "Oct 19", "Oct 20", "Oct 21", "Oct 22", "Oct 23", "Oct 24"],
      priceLabels: ["₹2,980", "₹2,940", "₹2,900", "₹2,860", "₹2,820"],
      sentimentLabels: ["+1.00", "+0.50", "0.00", "-0.50", "-1.00"],
      // Price data points normalized across 2820 to 2980
      prices: [2838, 2878, 2840, 2920, 2960, 2942, 2982],
      // Sentiment data points between -1.0 and +1.0
      sentiment: [0.12, 0.22, 0.14, 0.54, 0.62, 0.50, 0.68],
      pearson: "+0.81",
      lagInfo: "High Positive Lag-0"
    },
    velocityMix: {
      dates: ["10/18", "10/19", "10/20", "10/21", "10/22", "10/23", "10/24"],
      positive: [14, 16, 12, 21, 24, 18, 22],
      neutral: [3, 4, 3, 3, 3, 4, 3],
      negative: [2, 2, 2, 2, 1, 2, 3],
      rollingMean: [17, 19, 14, 23, 25, 20, 23],
      hvsi: "0.89",
      negFloor: "12% Min"
    },
    news: [
      {
        id: 1,
        publisher: "Bloomberg",
        time: "12m ago",
        score: "+0.82 Bullish",
        type: "pos",
        title: "Reliance Retail expands omnichannel electronics network across Tier-2 Indian hubs",
        ticker: "RELIANCE.NS"
      },
      {
        id: 2,
        publisher: "Reuters",
        time: "34m ago",
        score: "+0.76 Bullish",
        type: "pos",
        title: "Jio Platforms reports 11.8% subscriber growth in latest quarterly operational update",
        ticker: "RELIANCE.NS"
      },
      {
        id: 3,
        publisher: "Economic Times",
        time: "1h ago",
        score: "-0.45 Bearish",
        type: "neg",
        title: "Global crude benchmark adjustments pose mild refining margin headwinds for domestic oil majors",
        ticker: "RELIANCE.NS"
      },
      {
        id: 4,
        publisher: "CNBC-TV18",
        time: "2h ago",
        score: "+0.64 Bullish",
        type: "pos",
        title: "Morgan Stanley maintains Overweight on Reliance with revised price target of ₹3,150",
        ticker: "RELIANCE.NS"
      },
      {
        id: 5,
        publisher: "Mint",
        time: "3h ago",
        score: "+0.08 Neutral",
        type: "neu",
        title: "Board approves green energy subsidiary capex allotment for gigafactory equipment",
        ticker: "RELIANCE.NS"
      },
      {
        id: 6,
        publisher: "Financial Express",
        time: "4h ago",
        score: "-0.05 Neutral",
        type: "neu",
        title: "Rupee fluctuation impact on petrochemical feedstock costs within projected range",
        ticker: "RELIANCE.NS"
      }
    ]
  },

  TCS: {
    symbol: "TCS.NS",
    name: "Tata Consultancy Services Ltd.",
    exchange: "NSE EQUITIES",
    price: "₹4,120.80",
    change: "+48.20",
    changePercent: "+1.18%",
    isPositive: true,
    currency: "INR",
    engine: "FINBERT-L9",
    sentiment: {
      score: 72,
      label: "BULLISH",
      change: "+5.1% vs 24h",
      index: "+0.72",
      sourcesCount: 118,
      sparkline: [30, 35, 40, 48, 55, 52, 65, 70, 68, 72]
    },
    corpus: {
      volume: 118,
      window: "24h Rolling",
      change: "+14 in 4h",
      outlets: 51,
      desks: 42,
      reg: 25,
      coverage: "98.9%",
      tokens: "3.9M"
    },
    polarity: {
      pos: 72,
      neu: 18,
      neg: 10,
      posItems: 85,
      neuItems: 21,
      negItems: 12,
      confidence: "95.6%",
      zscore: "+2.01"
    },
    priceVsSentiment: {
      dates: ["Oct 18", "Oct 19", "Oct 20", "Oct 21", "Oct 22", "Oct 23", "Oct 24"],
      priceLabels: ["₹4,150", "₹4,100", "₹4,050", "₹4,000", "₹3,950"],
      sentimentLabels: ["+1.00", "+0.50", "0.00", "-0.50", "-1.00"],
      prices: [3980, 4010, 4040, 4080, 4095, 4070, 4120],
      sentiment: [0.20, 0.32, 0.40, 0.58, 0.65, 0.58, 0.72],
      pearson: "+0.86",
      lagInfo: "High Positive Lag-0"
    },
    velocityMix: {
      dates: ["10/18", "10/19", "10/20", "10/21", "10/22", "10/23", "10/24"],
      positive: [12, 14, 15, 18, 20, 17, 21],
      neutral: [3, 3, 2, 2, 3, 3, 2],
      negative: [1, 2, 1, 1, 1, 2, 1],
      rollingMean: [14, 16, 16, 19, 21, 18, 21],
      hvsi: "0.92",
      negFloor: "10% Min"
    },
    news: [
      {
        id: 11,
        publisher: "Bloomberg",
        time: "18m ago",
        score: "+0.88 Bullish",
        type: "pos",
        title: "TCS bags $1.2B multi-year cloud transformation contract from European banking consortium",
        ticker: "TCS.NS"
      },
      {
        id: 12,
        publisher: "Reuters",
        time: "45m ago",
        score: "+0.71 Bullish",
        type: "pos",
        title: "TCS accelerates GenAI adoption across Fortune 500 client base with proprietary toolsets",
        ticker: "TCS.NS"
      },
      {
        id: 13,
        publisher: "Economic Times",
        time: "2h ago",
        score: "-0.28 Bearish",
        type: "neg",
        title: "Discretionary tech spending in North America shows selective deceleration in Q3",
        ticker: "TCS.NS"
      }
    ]
  },

  INFY: {
    symbol: "INFY.NS",
    name: "Infosys Ltd.",
    exchange: "NSE EQUITIES",
    price: "₹1,845.20",
    change: "-12.30",
    changePercent: "-0.66%",
    isPositive: false,
    currency: "INR",
    engine: "FINBERT-L9",
    sentiment: {
      score: 54,
      label: "NEUTRAL",
      change: "-1.8% vs 24h",
      index: "+0.18",
      sourcesCount: 96,
      sparkline: [50, 48, 52, 49, 56, 52, 50, 55, 52, 54]
    },
    corpus: {
      volume: 96,
      window: "24h Rolling",
      change: "+9 in 4h",
      outlets: 44,
      desks: 36,
      reg: 16,
      coverage: "97.8%",
      tokens: "3.1M"
    },
    polarity: {
      pos: 54,
      neu: 32,
      neg: 14,
      posItems: 52,
      neuItems: 31,
      negItems: 13,
      confidence: "91.4%",
      zscore: "+0.92"
    },
    priceVsSentiment: {
      dates: ["Oct 18", "Oct 19", "Oct 20", "Oct 21", "Oct 22", "Oct 23", "Oct 24"],
      priceLabels: ["₹1,900", "₹1,875", "₹1,850", "₹1,825", "₹1,800"],
      sentimentLabels: ["+1.00", "+0.50", "0.00", "-0.50", "-1.00"],
      prices: [1860, 1872, 1855, 1865, 1870, 1850, 1845],
      sentiment: [0.15, 0.22, 0.10, 0.18, 0.25, 0.14, 0.18],
      pearson: "+0.64",
      lagInfo: "Moderate Correlation"
    },
    velocityMix: {
      dates: ["10/18", "10/19", "10/20", "10/21", "10/22", "10/23", "10/24"],
      positive: [8, 10, 7, 9, 11, 8, 9],
      neutral: [5, 4, 6, 5, 4, 5, 5],
      negative: [2, 3, 2, 2, 3, 2, 2],
      rollingMean: [11, 12, 10, 11, 13, 11, 11],
      hvsi: "0.84",
      negFloor: "14% Min"
    },
    news: [
      {
        id: 21,
        publisher: "Mint",
        time: "50m ago",
        score: "+0.52 Bullish",
        type: "pos",
        title: "Infosys expands Topaz AI suite with industry-specific autonomous enterprise workflows",
        ticker: "INFY.NS"
      },
      {
        id: 22,
        publisher: "CNBC-TV18",
        time: "3h ago",
        score: "-0.40 Bearish",
        type: "neg",
        title: "Analysts adjust FY27 operating margin guidance amid elevated delivery costs",
        ticker: "INFY.NS"
      }
    ]
  },

  HDFCBANK: {
    symbol: "HDFCBANK.NS",
    name: "HDFC Bank Ltd.",
    exchange: "NSE EQUITIES",
    price: "₹1,698.50",
    change: "+18.90",
    changePercent: "+1.13%",
    isPositive: true,
    currency: "INR",
    engine: "FINBERT-L9",
    sentiment: {
      score: 64,
      label: "BULLISH",
      change: "+3.4% vs 24h",
      index: "+0.56",
      sourcesCount: 130,
      sparkline: [35, 40, 42, 48, 50, 58, 62, 59, 61, 64]
    },
    corpus: {
      volume: 130,
      window: "24h Rolling",
      change: "+16 in 4h",
      outlets: 58,
      desks: 49,
      reg: 23,
      coverage: "99.1%",
      tokens: "4.2M"
    },
    polarity: {
      pos: 64,
      neu: 24,
      neg: 12,
      posItems: 83,
      neuItems: 31,
      negItems: 16,
      confidence: "93.8%",
      zscore: "+1.65"
    },
    priceVsSentiment: {
      dates: ["Oct 18", "Oct 19", "Oct 20", "Oct 21", "Oct 22", "Oct 23", "Oct 24"],
      priceLabels: ["₹1,720", "₹1,700", "₹1,680", "₹1,660", "₹1,640"],
      sentimentLabels: ["+1.00", "+0.50", "0.00", "-0.50", "-1.00"],
      prices: [1650, 1665, 1658, 1678, 1692, 1685, 1698],
      sentiment: [0.18, 0.28, 0.20, 0.42, 0.52, 0.48, 0.56],
      pearson: "+0.79",
      lagInfo: "High Positive Lag-0"
    },
    velocityMix: {
      dates: ["10/18", "10/19", "10/20", "10/21", "10/22", "10/23", "10/24"],
      positive: [11, 13, 10, 16, 18, 15, 17],
      neutral: [4, 4, 4, 3, 4, 4, 4],
      negative: [2, 2, 2, 2, 1, 2, 2],
      rollingMean: [14, 15, 12, 17, 19, 16, 18],
      hvsi: "0.88",
      negFloor: "12% Min"
    },
    news: [
      {
        id: 31,
        publisher: "Bloomberg",
        time: "25m ago",
        score: "+0.78 Bullish",
        type: "pos",
        title: "HDFC Bank deposit growth outpaces system average as post-merger integration stabilizes",
        ticker: "HDFCBANK.NS"
      },
      {
        id: 32,
        publisher: "Reuters",
        time: "1h ago",
        score: "+0.62 Bullish",
        type: "pos",
        title: "Credit demand in retail loan portfolio registers solid double-digit expansion",
        ticker: "HDFCBANK.NS"
      }
    ]
  }
};
