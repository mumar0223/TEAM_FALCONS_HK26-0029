import React from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';

export default function MetricCards({ stock }) {
  const { sentiment, corpus, polarity } = stock;

  // Generate smooth SVG path for the sentiment sparkline
  const sparklinePoints = sentiment.sparkline;
  const width = 360;
  const height = 48;
  const minVal = 0;
  const maxVal = 100;
  
  const coords = sparklinePoints.map((val, idx) => {
    const x = (idx / (sparklinePoints.length - 1)) * width;
    const y = height - ((val - minVal) / (maxVal - minVal)) * (height - 10) - 5;
    return { x, y };
  });

  // Create smooth bezier curve path
  let pathD = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const xc = (coords[i].x + coords[i + 1].x) / 2;
    const yc = (coords[i].y + coords[i + 1].y) / 2;
    pathD += ` Q ${coords[i].x} ${coords[i].y}, ${xc} ${yc}`;
  }
  pathD += ` T ${coords[coords.length - 1].x} ${coords[coords.length - 1].y}`;
  const areaPathD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="metric-cards-grid">
      {/* CARD 1: AI AGGREGATE SENTIMENT */}
      <div className="metric-card">
        <div className="card-header-row">
          <span className="card-label">AI AGGREGATE SENTIMENT</span>
          <span className="live-stream-badge">
            <span className="live-pulse"></span>
            <span>Live Stream</span>
          </span>
        </div>

        <div className="card-main-stat-row">
          <div className="sentiment-number-group">
            <span className="huge-stat-value green-text tabular-nums">{sentiment.score}%</span>
            <span className="sentiment-status-label green-text">{sentiment.label}</span>
          </div>
          <div className="stat-delta-pill positive">
            <ArrowUpRight size={13} />
            <span>{sentiment.change}</span>
          </div>
        </div>

        {/* Sparkline Graphic */}
        <div className="sparkline-wrapper">
          <svg viewBox={`0 0 ${width} ${height}`} className="sparkline-svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="greenSparkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d={areaPathD} fill="url(#greenSparkGradient)" />
            <path d={pathD} fill="none" stroke="#00e676" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="card-footer-row">
          <span className="footer-dim-text">Based on {sentiment.sourcesCount} AI-evaluated sources</span>
          <span className="footer-highlight-text tabular-nums">Index: <strong>{sentiment.index}</strong></span>
        </div>
      </div>

      {/* CARD 2: PROCESSED CORPUS VOLUME */}
      <div className="metric-card">
        <div className="card-header-row">
          <span className="card-label">PROCESSED CORPUS VOLUME</span>
          <span className="window-label">Window: {corpus.window}</span>
        </div>

        <div className="card-main-stat-row">
          <div className="volume-number-group">
            <span className="huge-stat-value white-text tabular-nums">{corpus.volume}</span>
            <span className="stat-unit-label">Articles</span>
          </div>
          <div className="stat-delta-pill blue-pill">
            <Zap size={12} className="fill-current" />
            <span>{corpus.change}</span>
          </div>
        </div>

        {/* Bar & Source Categories */}
        <div className="volume-bar-wrapper">
          <div className="corpus-progress-track">
            <div className="corpus-progress-fill" style={{ width: '85%' }}></div>
          </div>
          <div className="corpus-breakdown-row">
            <span className="breakdown-tag blue-dot">
              <span className="bullet-dot blue"></span> {corpus.outlets} Outlets
            </span>
            <span className="breakdown-tag cyan-dot">
              <span className="bullet-dot cyan"></span> {corpus.desks} Desks
            </span>
            <span className="breakdown-tag teal-dot">
              <span className="bullet-dot teal"></span> {corpus.reg} Reg
            </span>
          </div>
        </div>

        <div className="card-footer-row">
          <span className="footer-dim-text">Coverage Rate: {corpus.coverage}</span>
          <span className="footer-highlight-text tabular-nums">Tokens: <strong>{corpus.tokens}</strong></span>
        </div>
      </div>

      {/* CARD 3: SIGNAL POLARITY DISTRIBUTION */}
      <div className="metric-card">
        <div className="card-header-row">
          <span className="card-label">SIGNAL POLARITY DISTRIBUTION</span>
          <span className="model-tag-subtle">Illustrative Mock Model</span>
        </div>

        <div className="polarity-top-labels">
          <span className="pol-label pos">POS {polarity.pos}%</span>
          <span className="pol-label neu">NEU {polarity.neu}%</span>
          <span className="pol-label neg">NEG {polarity.neg}%</span>
        </div>

        {/* Multi-Segment Horizontal Bar */}
        <div className="segmented-bar-wrapper">
          <div className="segmented-bar">
            <div className="segment pos-segment" style={{ width: `${polarity.pos}%` }}></div>
            <div className="segment neu-segment" style={{ width: `${polarity.neu}%` }}></div>
            <div className="segment neg-segment" style={{ width: `${polarity.neg}%` }}></div>
          </div>
        </div>

        <div className="polarity-items-counts">
          <span className="pol-count-item">
            <span className="bullet-dot green"></span>
            <strong>{polarity.pos}%</strong>
            <span className="item-sub">{polarity.posItems} items</span>
          </span>
          <span className="pol-count-item">
            <span className="bullet-dot blue"></span>
            <strong>{polarity.neu}%</strong>
            <span className="item-sub">{polarity.neuItems} items</span>
          </span>
          <span className="pol-count-item">
            <span className="bullet-dot red"></span>
            <strong>{polarity.neg}%</strong>
            <span className="item-sub">{polarity.negItems} items</span>
          </span>
        </div>

        <div className="card-footer-row">
          <span className="footer-dim-text">Confidence Interval: {polarity.confidence}</span>
          <span className="footer-highlight-text tabular-nums">Z-Score: <strong className="green-text">{polarity.zscore}</strong></span>
        </div>
      </div>
    </div>
  );
}
