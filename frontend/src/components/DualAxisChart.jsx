import React, { useState } from 'react';
import { Check, BarChart2 } from 'lucide-react';

export default function DualAxisChart({ stock }) {
  const [activeTimeframe, setActiveTimeframe] = useState('7D');
  const [showPrice, setShowPrice] = useState(true);
  const [showSentiment, setShowSentiment] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const timeframes = ['1D', '7D', '1M', '3M', '1Y'];
  const chartData = stock.priceVsSentiment;

  // Chart dimensions inside SVG viewBox
  const svgWidth = 840;
  const svgHeight = 280;
  const padding = { top: 25, right: 75, bottom: 35, left: 75 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  const dates = chartData.dates;
  const prices = chartData.prices;
  const sentiments = chartData.sentiment;

  // Scaling helpers
  const minPrice = 2820;
  const maxPrice = 2980;
  const minSentiment = -1.0;
  const maxSentiment = 1.0;

  const getX = (index) => padding.left + (index / (dates.length - 1)) * graphWidth;
  const getPriceY = (price) => {
    const ratio = (price - minPrice) / (maxPrice - minPrice);
    return padding.top + (1 - ratio) * graphHeight;
  };
  const getSentimentY = (val) => {
    const ratio = (val - minSentiment) / (maxSentiment - minSentiment);
    return padding.top + (1 - ratio) * graphHeight;
  };

  // Generate path string for price line
  const pricePoints = prices.map((p, i) => ({ x: getX(i), y: getPriceY(p) }));
  let pricePath = `M ${pricePoints[0].x} ${pricePoints[0].y}`;
  for (let i = 0; i < pricePoints.length - 1; i++) {
    const xc = (pricePoints[i].x + pricePoints[i + 1].x) / 2;
    const yc = (pricePoints[i].y + pricePoints[i + 1].y) / 2;
    pricePath += ` Q ${pricePoints[i].x} ${pricePoints[i].y}, ${xc} ${yc}`;
  }
  pricePath += ` T ${pricePoints[pricePoints.length - 1].x} ${pricePoints[pricePoints.length - 1].y}`;
  
  const priceAreaPath = `${pricePath} L ${pricePoints[pricePoints.length - 1].x} ${padding.top + graphHeight} L ${pricePoints[0].x} ${padding.top + graphHeight} Z`;

  // Sentiment points (line with subtle angles/curves and diamond points)
  const sentimentPoints = sentiments.map((s, i) => ({ x: getX(i), y: getSentimentY(s) }));
  let sentimentPath = `M ${sentimentPoints[0].x} ${sentimentPoints[0].y}`;
  for (let i = 1; i < sentimentPoints.length; i++) {
    sentimentPath += ` L ${sentimentPoints[i].x} ${sentimentPoints[i].y}`;
  }

  // Y-axis grid levels (5 evenly spaced lines)
  const gridLevels = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="chart-card dual-axis-card">
      {/* Header */}
      <div className="chart-header-row">
        <div className="chart-title-group">
          <div className="chart-title">
            <span className="bullet-dot blue"></span>
            <span>Stock Price (₹) vs. Aggregate Sentiment Score</span>
          </div>
          <p className="chart-subtitle">
            Dual-axis correlation: Left Axis = Equity Close (₹) • Right Axis = NLP Sentiment Index (-1.0 to +1.0)
          </p>
        </div>

        <div className="chart-controls-group">
          <div className="timeframe-pill-selector">
            {timeframes.map((tf) => (
              <button
                key={tf}
                className={`timeframe-btn ${activeTimeframe === tf ? 'active' : ''}`}
                onClick={() => setActiveTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="legend-toggles">
            <button
              className={`toggle-legend-btn price-toggle ${showPrice ? 'active' : ''}`}
              onClick={() => setShowPrice(!showPrice)}
            >
              <span className="checkbox-icon">{showPrice && <Check size={12} strokeWidth={3} />}</span>
              <span>Price (₹)</span>
            </button>
            <button
              className={`toggle-legend-btn sentiment-toggle ${showSentiment ? 'active' : ''}`}
              onClick={() => setShowSentiment(!showSentiment)}
            >
              <span className="checkbox-icon">{showSentiment && <Check size={12} strokeWidth={3} />}</span>
              <span>Sentiment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual Axis Visual */}
      <div className="chart-body-wrapper">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="dual-axis-svg"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id="priceAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-price-stroke, #059669)" stopOpacity="0.25" />
              <stop offset="85%" stopColor="var(--chart-price-stroke, #059669)" stopOpacity="0.03" />
              <stop offset="100%" stopColor="var(--chart-price-stroke, #059669)" stopOpacity="0.0" />
            </linearGradient>

            <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Horizontal Grid lines */}
          {gridLevels.map((lvl, idx) => {
            const y = padding.top + lvl * graphHeight;
            const priceLabel = chartData.priceLabels[idx] || '';
            const sentimentLabel = chartData.sentimentLabels[idx] || '';

            return (
              <g key={idx} className="grid-line-group">
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="var(--chart-grid-stroke, #e2e8f0)"
                  strokeDasharray={lvl === 0.5 ? 'none' : '3 3'}
                  strokeWidth="1"
                />
                {/* Left Y-axis (Price) */}
                <text
                  x={padding.left - 12}
                  y={y + 4}
                  textAnchor="end"
                  className="axis-label-text price-axis"
                >
                  {priceLabel}
                </text>
                {/* Right Y-axis (Sentiment) */}
                <text
                  x={svgWidth - padding.right + 12}
                  y={y + 4}
                  textAnchor="start"
                  className="axis-label-text sentiment-axis"
                >
                  {sentimentLabel}
                </text>
              </g>
            );
          })}

          {/* X-axis date labels */}
          {dates.map((date, idx) => {
            const x = getX(idx);
            return (
              <text
                key={idx}
                x={x}
                y={svgHeight - 10}
                textAnchor="middle"
                className="axis-label-text x-axis"
              >
                {date}
              </text>
            );
          })}

          {/* Price Filled Area & Line */}
          {showPrice && (
            <g className="price-series-layer">
              <path d={priceAreaPath} fill="url(#priceAreaGrad)" />
              <path
                d={pricePath}
                fill="none"
                stroke="var(--chart-price-stroke, #059669)"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#glowLine)"
              />
            </g>
          )}

          {/* Sentiment Line & Points */}
          {showSentiment && (
            <g className="sentiment-series-layer">
              <path
                d={sentimentPath}
                fill="none"
                stroke="var(--chart-sentiment-stroke, #7c3aed)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {sentimentPoints.map((pt, i) => (
                <rect
                  key={i}
                  x={pt.x - 3.5}
                  y={pt.y - 3.5}
                  width="7"
                  height="7"
                  transform={`rotate(45 ${pt.x} ${pt.y})`}
                  fill="var(--chart-sentiment-stroke, #7c3aed)"
                  stroke="var(--bg-card, #ffffff)"
                  strokeWidth="1.5"
                />
              ))}
            </g>
          )}

          {/* Interactive Hover Areas */}
          {dates.map((_, idx) => {
            const x = getX(idx);
            const isHovered = hoveredIndex === idx;

            return (
              <g
                key={idx}
                className="interactive-column"
                onMouseEnter={() => setHoveredIndex(idx)}
                style={{ cursor: 'pointer' }}
              >
                {/* Transparent hit area */}
                <rect
                  x={x - graphWidth / (dates.length * 2)}
                  y={padding.top}
                  width={graphWidth / dates.length}
                  height={graphHeight}
                  fill="transparent"
                />

                {isHovered && (
                  <>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={padding.top + graphHeight}
                      stroke="#94a3b8"
                      strokeDasharray="2 2"
                      strokeWidth="1"
                      opacity="0.6"
                    />
                    {showPrice && (
                      <circle
                        cx={x}
                        cy={getPriceY(prices[idx])}
                        r="5"
                        fill="#38bdf8"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    )}
                    {showSentiment && (
                      <circle
                        cx={x}
                        cy={getSentimentY(sentiments[idx])}
                        r="5"
                        fill="#c084fc"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    )}
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="chart-floating-tooltip"
            style={{
              left: `${(getX(hoveredIndex) / svgWidth) * 100}%`,
              transform: hoveredIndex > 4 ? 'translateX(-105%)' : 'translateX(10%)',
            }}
          >
            <div className="tooltip-date">{dates[hoveredIndex]}</div>
            {showPrice && (
              <div className="tooltip-row price">
                <span>Price:</span>
                <strong>₹{prices[hoveredIndex].toLocaleString()}</strong>
              </div>
            )}
            {showSentiment && (
              <div className="tooltip-row sentiment">
                <span>Sentiment:</span>
                <strong>{(sentiments[hoveredIndex] > 0 ? '+' : '') + sentiments[hoveredIndex].toFixed(2)}</strong>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Correlation Strip */}
      <div className="chart-footer-banner">
        <div className="correlation-legend-strip">
          <div className="legend-strip-item">
            <span className="legend-name-line">{stock.name.split(' ')[0]}</span>
            <span className="legend-sub-row">
              <span className="legend-line blue"></span>
              <span>Close Price (₹)</span>
            </span>
          </div>
          <div className="legend-strip-item">
            <span className="legend-name-line">AI</span>
            <span className="legend-sub-row">
              <span className="legend-line purple"></span>
              <span>Aggregate Polarity</span>
            </span>
          </div>
        </div>

        <div className="correlation-right-group">
          <div className="pearson-badge-box">
            <BarChart2 size={13} className="pearson-icon" />
            <span className="pearson-text">
              Pearson r = <strong>{chartData.pearson}</strong>
            </span>
          </div>
          <div className="correlation-lag-disclaimer">
            <span className="lag-highlight">({chartData.lagInfo})</span>
            <span className="disclaimer-text">
              Correlation disclaimer: Statistical association does not establish market causality. Demonstrative analytical engine.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
