import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  ArrowUpRight, 
  ArrowLeft, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Sparkles,
  ExternalLink,
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function NewsPage({ stock, onBackToDashboard }) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('ALL');

  const allNews = [
    {
      id: 1,
      publisher: 'Bloomberg',
      time: '12m ago',
      score: '+0.82',
      label: 'Bullish',
      type: 'pos',
      confidence: '96.4%',
      title: 'Reliance Retail expands omnichannel electronics network across Tier-2 Indian hubs',
      summary: 'Expansion into 120+ secondary cities accelerates store-footprint growth and consumer electronics distribution, strengthening gross margin contribution.',
      keywords: ['Retail Footprint', 'Margin Accretion', 'Tier-2 Demand'],
      ticker: 'RELIANCE.NS',
      sector: 'Retail & Consumer'
    },
    {
      id: 2,
      publisher: 'Reuters',
      time: '34m ago',
      score: '+0.76',
      label: 'Bullish',
      type: 'pos',
      confidence: '95.1%',
      title: 'Jio Platforms reports 11.8% subscriber growth in latest quarterly operational update',
      summary: '5G standalone infrastructure expansion drives average revenue per user (ARPU) upward to ₹181.70 with reduced customer churn across wireless circles.',
      keywords: ['5G Rollout', 'ARPU Growth', 'Subscriber Additions'],
      ticker: 'RELIANCE.NS',
      sector: 'Telecom & Digital'
    },
    {
      id: 3,
      publisher: 'Economic Times',
      time: '1h ago',
      score: '-0.45',
      label: 'Bearish',
      type: 'neg',
      confidence: '91.8%',
      title: 'Global crude benchmark adjustments pose mild refining margin headwinds for domestic oil majors',
      summary: 'Brent crude pricing fluctuations and Singapore gross refining margin contractions present near-term challenges for downstream refining realizations.',
      keywords: ['Refining Margins', 'Brent Crude Volatility', 'O&G Headwind'],
      ticker: 'RELIANCE.NS',
      sector: 'Energy & Petrochemicals'
    },
    {
      id: 4,
      publisher: 'CNBC-TV18',
      time: '2h ago',
      score: '+0.64',
      label: 'Bullish',
      type: 'pos',
      confidence: '93.7%',
      title: 'Morgan Stanley maintains Overweight on Reliance with revised price target of ₹3,150',
      summary: 'Analyst note highlights strategic capital expenditure monetization in green energy and retail segments, forecasting 14% FY27 EBITDA compound annual growth.',
      keywords: ['Analyst Upgrade', 'Price Target Hike', 'CapEx Monetization'],
      ticker: 'RELIANCE.NS',
      sector: 'Equities Research'
    },
    {
      id: 5,
      publisher: 'Mint',
      time: '3h ago',
      score: '+0.08',
      label: 'Neutral',
      type: 'neu',
      confidence: '89.2%',
      title: 'Board approves green energy subsidiary capex allotment for gigafactory equipment',
      summary: 'Special resolution allocates funding for photovoltaic cell manufacturing lines and energy storage supply contracts for the Jamnagar green complex.',
      keywords: ['Green Energy', 'Solar Photovoltaic', 'Jamnagar Complex'],
      ticker: 'RELIANCE.NS',
      sector: 'Clean Tech'
    },
    {
      id: 6,
      publisher: 'Financial Express',
      time: '4h ago',
      score: '-0.05',
      label: 'Neutral',
      type: 'neu',
      confidence: '88.5%',
      title: 'Rupee fluctuation impact on petrochemical feedstock costs within projected range',
      summary: 'Foreign exchange hedging strategies effectively buffer polymer and polyester import cost variations, keeping overall cost of goods sold stable.',
      keywords: ['FX Hedging', 'Feedstock Economics', 'Currency Fluctuation'],
      ticker: 'RELIANCE.NS',
      sector: 'Petrochemicals'
    },
    {
      id: 7,
      publisher: 'Bloomberg',
      time: '5h ago',
      score: '+0.88',
      label: 'Bullish',
      type: 'pos',
      confidence: '97.2%',
      title: 'TCS bags $1.2B multi-year cloud transformation contract from European banking consortium',
      summary: 'Large multi-year engagement to migrate legacy mainframe infrastructure to hybrid sovereign cloud with integrated AI compliance guardrails.',
      keywords: ['Large Deal Win', 'Cloud Migration', 'Banking Sector'],
      ticker: 'TCS.NS',
      sector: 'Information Tech'
    },
    {
      id: 8,
      publisher: 'Reuters',
      time: '6h ago',
      score: '+0.78',
      label: 'Bullish',
      type: 'pos',
      confidence: '94.8%',
      title: 'HDFC Bank deposit growth outpaces system average as post-merger integration stabilizes',
      summary: 'Retail CASA ratio stabilizes at 38.4% as branch synergy program yields steady deposit inflows across urban and semi-urban clusters.',
      keywords: ['Deposit Growth', 'CASA Ratio', 'Branch Expansion'],
      ticker: 'HDFCBANK.NS',
      sector: 'Banking & Financials'
    }
  ];

  const filtered = allNews.filter((item) => {
    const matchesTab =
      activeTab === 'ALL' ||
      (activeTab === 'POS' && item.type === 'pos') ||
      (activeTab === 'NEG' && item.type === 'neg') ||
      (activeTab === 'NEU' && item.type === 'neu');

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ticker.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPub =
      selectedPublisher === 'ALL' || item.publisher === selectedPublisher;

    return matchesTab && matchesSearch && matchesPub;
  });

  return (
    <div className="news-page-container">
      {/* Top Banner & Breadcrumb */}
      <div className="news-page-header">
        <div className="news-page-title-row">
          <button className="back-to-dash-btn" onClick={onBackToDashboard}>
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="news-page-header-text">
            <div className="news-hero-title-group">
              <Radio size={20} className="pulse-icon text-emerald" />
              <h1 className="news-hero-title">Live News & NLP Signals Intelligence</h1>
            </div>
            <p className="news-hero-desc">
              Continuous natural language corpus processing across financial media, broker research, and institutional wires.
            </p>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="news-stats-strip">
          <div className="news-stat-card">
            <span className="stat-label">Corpus Volume</span>
            <span className="stat-value">142 Articles</span>
            <span className="stat-sub">Across 62 Outlets</span>
          </div>
          <div className="news-stat-card green-highlight">
            <span className="stat-label">Bullish Signals</span>
            <span className="stat-value">97 Items (68%)</span>
            <span className="stat-sub">+4.2% vs 24h</span>
          </div>
          <div className="news-stat-card red-highlight">
            <span className="stat-label">Bearish Signals</span>
            <span className="stat-value">17 Items (12%)</span>
            <span className="stat-sub">Floor: 12% Min</span>
          </div>
          <div className="news-stat-card neutral-highlight">
            <span className="stat-label">Neutral / Informational</span>
            <span className="stat-value">28 Items (20%)</span>
            <span className="stat-sub">Confidence: 94.2%</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="news-filter-toolbar">
        <div className="news-search-input-group">
          <Search size={15} className="toolbar-search-icon" />
          <input
            type="text"
            placeholder="Search headlines, keywords, companies, or publishers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="toolbar-search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        <div className="news-toolbar-tabs">
          <button
            className={`tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveTab('ALL')}
          >
            All Signals ({allNews.length})
          </button>
          <button
            className={`tab-btn pos ${activeTab === 'POS' ? 'active' : ''}`}
            onClick={() => setActiveTab('POS')}
          >
            <TrendingUp size={13} />
            <span>Bullish (5)</span>
          </button>
          <button
            className={`tab-btn neg ${activeTab === 'NEG' ? 'active' : ''}`}
            onClick={() => setActiveTab('NEG')}
          >
            <TrendingDown size={13} />
            <span>Bearish (1)</span>
          </button>
          <button
            className={`tab-btn neu ${activeTab === 'NEU' ? 'active' : ''}`}
            onClick={() => setActiveTab('NEU')}
          >
            <Minus size={13} />
            <span>Neutral (2)</span>
          </button>
        </div>
      </div>

      {/* News Grid Listing */}
      <div className="news-cards-grid">
        {filtered.map((item) => (
          <article key={item.id} className="news-detail-card">
            <div className="news-detail-top">
              <div className="publisher-meta-group">
                <span className="publisher-badge">{item.publisher}</span>
                <span className="time-sub">• {item.time}</span>
                <span className="sector-tag">• {item.sector}</span>
              </div>

              <div className="score-badge-group">
                <span className={`signal-score-badge ${item.type}`}>
                  {item.score} {item.label}
                </span>
                <span className="confidence-pill">
                  <CheckCircle2 size={11} />
                  <span>{item.confidence}</span>
                </span>
              </div>
            </div>

            <h2 className="news-detail-title">{item.title}</h2>
            <p className="news-detail-summary">{item.summary}</p>

            {/* AI Keywords extracted */}
            <div className="keywords-chip-row">
              <span className="keywords-label">AI Key Drivers:</span>
              {item.keywords.map((kw, idx) => (
                <span key={idx} className="keyword-chip">{kw}</span>
              ))}
            </div>

            <div className="news-detail-footer">
              <div className="ticker-badge-group">
                <span className="ticker-pill">{item.ticker}</span>
                <span className="nlp-evaluated-tag">FinBERT Analyzed</span>
              </div>

              <a
                href="#read-signal"
                onClick={(e) => e.preventDefault()}
                className="read-full-signal-link"
              >
                <span>Read Full Signal</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
