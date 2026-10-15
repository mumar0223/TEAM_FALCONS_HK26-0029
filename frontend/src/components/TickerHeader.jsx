import React, { useState } from 'react';
import { RefreshCw, Cpu } from 'lucide-react';

export default function TickerHeader({ currentStockKey, onSelectStock, stock }) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 900);
  };

  const tickerButtons = [
    { key: 'RELIANCE', label: 'RELIANCE' },
    { key: 'TCS', label: 'TCS' },
    { key: 'INFY', label: 'INFY' },
    { key: 'HDFCBANK', label: 'HDFCBANK' },
  ];

  return (
    <div className="ticker-banner">
      <div className="ticker-info-left">
        <div className="ticker-title-row">
          <h1 className="ticker-symbol">{stock.symbol}</h1>
          <span className="ticker-company-name">{stock.name}</span>
          <span className="exchange-tag">{stock.exchange}</span>
        </div>

        <div className="ticker-price-row">
          <span className="main-price tabular-nums">{stock.price}</span>
          <span className={`price-change tabular-nums ${stock.isPositive ? 'positive' : 'negative'}`}>
            {stock.change} ({stock.changePercent})
          </span>
          <span className="ticker-meta-divider">•</span>
          <span className="ticker-meta-text">{stock.currency}</span>
          <span className="ticker-meta-divider">•</span>
          <span className="ticker-meta-text">Real-Time AI NLP Aggregation</span>
        </div>
      </div>

      <div className="ticker-quick-switch">
        {tickerButtons.map((btn) => (
          <button
            key={btn.key}
            className={`quick-switch-btn ${currentStockKey === btn.key ? 'active' : ''}`}
            onClick={() => onSelectStock(btn.key)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="ticker-actions-right">
        <div className="nlp-engine-pill">
          <span className="nlp-icon-chevron">⫸</span>
          <span className="nlp-engine-label">NLP ENGINE:</span>
          <span className="nlp-engine-name">{stock.engine}</span>
        </div>

        <button 
          className={`resync-feed-btn ${isSyncing ? 'spinning' : ''}`}
          onClick={handleSync}
        >
          <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
          <span>Re-sync Feed</span>
        </button>
      </div>
    </div>
  );
}
