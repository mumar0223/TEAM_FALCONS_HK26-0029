import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function VelocityChart({ stock }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const data = stock.velocityMix;

  const svgWidth = 840;
  const svgHeight = 180;
  const padding = { top: 20, right: 35, bottom: 25, left: 45 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  const maxY = 30;
  const barWidth = 26;

  const dates = data.dates;
  const getX = (i) => padding.left + (i / (dates.length - 1)) * graphWidth;
  const getY = (val) => padding.top + (1 - val / maxY) * graphHeight;

  // Compute rolling mean path points
  const rollingMeanPoints = data.rollingMean.map((val, i) => ({
    x: getX(i),
    y: getY(val),
  }));

  let rollingMeanPath = `M ${rollingMeanPoints[0].x} ${rollingMeanPoints[0].y}`;
  for (let i = 1; i < rollingMeanPoints.length; i++) {
    rollingMeanPath += ` L ${rollingMeanPoints[i].x} ${rollingMeanPoints[i].y}`;
  }

  return (
    <div className="chart-card velocity-chart-card">
      <div className="chart-header-row">
        <div className="chart-title-group">
          <h2 className="chart-title-plain">7-Day Sentiment Velocity & Category Mix</h2>
          <p className="chart-subtitle">
            Daily volume classification across Positive, Negative, and Neutral financial headlines
          </p>
        </div>

        <div className="velocity-legend">
          <span className="v-legend-item">
            <span className="v-legend-square pos"></span> Pos
          </span>
          <span className="v-legend-item">
            <span className="v-legend-square neg"></span> Neg
          </span>
          <span className="v-legend-item">
            <span className="v-legend-square neu"></span> Neu
          </span>
          <span className="v-legend-item">
            <span className="v-legend-line rolling"></span> Rolling Mean
          </span>
        </div>
      </div>

      <div className="chart-body-wrapper velocity-body">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="velocity-svg"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Y Axis Grid lines at 30, 15, 0 */}
          {[30, 15, 0].map((val) => {
            const y = getY(val);
            return (
              <g key={val} className="grid-line-group">
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="#172238"
                  strokeDasharray="2 2"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="axis-label-text"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Stacked Vertical Bars */}
          {dates.map((date, i) => {
            const cx = getX(i);
            const posCount = data.positive[i];
            const neuCount = data.neutral[i];
            const negCount = data.negative[i];

            const posH = (posCount / maxY) * graphHeight;
            const neuH = (neuCount / maxY) * graphHeight;
            const negH = (negCount / maxY) * graphHeight;

            const baseY = padding.top + graphHeight;
            const posY = baseY - posH;
            const neuY = posY - neuH;
            const negY = neuY - negH;

            const isHovered = hoveredIndex === i;

            return (
              <g
                key={i}
                className="bar-column-group"
                onMouseEnter={() => setHoveredIndex(i)}
                style={{ cursor: 'pointer' }}
              >
                {/* Positive segment (bottom green) */}
                <rect
                  x={cx - barWidth / 2}
                  y={posY}
                  width={barWidth}
                  height={posH}
                  fill="#10b981"
                  rx="1"
                />
                {/* Neutral segment (middle cyan/slate) */}
                <rect
                  x={cx - barWidth / 2}
                  y={neuY}
                  width={barWidth}
                  height={neuH}
                  fill="#475569"
                />
                {/* Negative segment (top red) */}
                <rect
                  x={cx - barWidth / 2}
                  y={negY}
                  width={barWidth}
                  height={negH}
                  fill="#f43f5e"
                  rx="2"
                />

                {/* X Axis Date Label */}
                <text
                  x={cx}
                  y={svgHeight - 6}
                  textAnchor="middle"
                  className="axis-label-text"
                  fill={isHovered ? '#f8fafc' : '#64748b'}
                >
                  {date}
                </text>
              </g>
            );
          })}

          {/* Rolling Mean Line */}
          <path
            d={rollingMeanPath}
            fill="none"
            stroke="#c084fc"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {rollingMeanPoints.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill="#c084fc"
              stroke="#080d1a"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="chart-floating-tooltip"
            style={{
              left: `${(getX(hoveredIndex) / svgWidth) * 100}%`,
              top: '5%',
              transform: hoveredIndex > 4 ? 'translateX(-105%)' : 'translateX(10%)',
            }}
          >
            <div className="tooltip-date">{dates[hoveredIndex]} Breakdown</div>
            <div className="tooltip-row green-text">
              <span>Positive:</span>
              <strong>{data.positive[hoveredIndex]}</strong>
            </div>
            <div className="tooltip-row neutral-text">
              <span>Neutral:</span>
              <strong>{data.neutral[hoveredIndex]}</strong>
            </div>
            <div className="tooltip-row red-text">
              <span>Negative:</span>
              <strong>{data.negative[hoveredIndex]}</strong>
            </div>
            <div className="tooltip-row purple-text">
              <span>Rolling Mean:</span>
              <strong>{data.rollingMean[hoveredIndex]}</strong>
            </div>
          </div>
        )}
      </div>

      <div className="velocity-footer-row">
        <div className="hvsi-stat">
          <CheckCircle2 size={13} className="green-check" />
          <span>High Volume Stability Index (HVSI): <strong>{data.hvsi}</strong></span>
        </div>
        <div className="floor-stat">
          <span>Negative Sentiment Floor: <strong>{data.negFloor}</strong></span>
        </div>
      </div>
    </div>
  );
}
