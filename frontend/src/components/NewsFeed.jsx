import React, { useState, useRef } from 'react';
import { Radio, Search, ArrowUpRight, ArrowUp, ExternalLink } from 'lucide-react';

export default function NewsFeed({ stock }) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef(null);

  const newsList = stock.news || [];

  // Filter based on active tab and search query
  const filteredNews = newsList.filter((item) => {
    const matchesTab =
      activeTab === 'ALL' ||
      (activeTab === 'POS' && item.type === 'pos') ||
      (activeTab === 'NEG' && item.type === 'neg') ||
      (activeTab === 'NEU' && item.type === 'neu');

    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ticker.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesQuery;
  });

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="news-feed-card">
      {/* Header */}
      <div className="news-card-header">
        <div className="news-title-group">
          <Radio size={16} className="news-radio-icon text-cyan" />
          <h2 className="news-title-text">Live News & Signals</h2>
        </div>
        <span className="news-total-badge tabular-nums">142</span>
      </div>

      {/* Search Bar */}
      <div className="news-search-box">
        <Search size={14} className="search-icon" />
        <input
          type="text"
          placeholder="Filter headlines, publisher, keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="news-search-input"
        />
        <span className="search-shortcut-badge">⌘K</span>
      </div>

      {/* Filter Tabs */}
      <div className="news-filter-tabs">
        <button
          className={`filter-tab ${activeTab === 'ALL' ? 'active' : ''}`}
          onClick={() => setActiveTab('ALL')}
        >
          All (142)
        </button>
        <button
          className={`filter-tab ${activeTab === 'POS' ? 'active' : ''}`}
          onClick={() => setActiveTab('POS')}
        >
          Pos (97)
        </button>
        <button
          className={`filter-tab ${activeTab === 'NEG' ? 'active' : ''}`}
          onClick={() => setActiveTab('NEG')}
        >
          Neg (17)
        </button>
        <button
          className={`filter-tab ${activeTab === 'NEU' ? 'active' : ''}`}
          onClick={() => setActiveTab('NEU')}
        >
          Neu (28)
        </button>
      </div>

      {/* News List Items */}
      <div className="news-items-container" ref={scrollRef}>
        {filteredNews.map((item) => {
          let scoreBadgeClass = 'badge-pos';
          if (item.type === 'neg') scoreBadgeClass = 'badge-neg';
          if (item.type === 'neu') scoreBadgeClass = 'badge-neu';

          return (
            <article key={item.id} className="news-item-card">
              <div className="news-item-top">
                <span className="news-publisher-time">
                  <strong>{item.publisher}</strong> • {item.time}
                </span>
                <span className={`news-score-badge ${scoreBadgeClass} tabular-nums`}>
                  {item.score}
                </span>
              </div>

              <h3 className="news-headline-text">{item.title}</h3>

              <div className="news-item-bottom">
                <span className="news-ticker-tag">{item.ticker}</span>
                <button className="read-signal-btn">
                  <span>Read Signal</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </article>
          );
        })}

        {filteredNews.length === 0 && (
          <div className="empty-news-state">
            <p>No headlines found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* News Card Footer */}
      <div className="news-card-footer">
        <div className="socket-status">
          <span className="live-pulse"></span>
          <span>Ingesting via WebSockets</span>
        </div>
        <button className="top-scroll-btn" onClick={scrollToTop}>
          <span>Top</span>
          <ArrowUp size={12} />
        </button>
      </div>
    </div>
  );
}
