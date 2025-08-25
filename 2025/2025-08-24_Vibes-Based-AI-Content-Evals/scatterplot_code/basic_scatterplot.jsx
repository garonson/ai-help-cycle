import React, { useState } from 'react';

const ScatterPlot = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const data = [
    { point: "Salvation", fearExcitement: 10.00, impact: 10.00 },
    { point: "Extermination", fearExcitement: -10.00, impact: 10.00 },
    { point: "Unknown unknown", fearExcitement: 0.00, impact: 5.00 },
    { point: "Pretty helpful", fearExcitement: 4.82, impact: 3.00 },
    { point: "Irrelevant", fearExcitement: 0.00, impact: 0.00 },
    { point: "Evil and useless", fearExcitement: -10.00, impact: 0.00 },
    { point: "Mass unemployment", fearExcitement: -8.00, impact: 8.00 },
    { point: "Revolutionize education", fearExcitement: 8.00, impact: 8.00 },
    { point: "SO FUNNY", fearExcitement: 10.00, impact: 0.00 },
    { point: "Ugly art", fearExcitement: -4.15, impact: 2.80 },
    { point: "Unknowable human evolution", fearExcitement: 0.00, impact: 10.00 }
  ];

  // Chart dimensions and margins
  const width = 1100;
  const height = 700;
  const margin = { top: 60, right: 120, bottom: 80, left: 120 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Scale functions
  const xScale = (value) => ((value + 10) / 20) * chartWidth;
  const yScale = (value) => chartHeight - (value / 10) * chartHeight;

  const handleMouseEnter = (point, event) => {
    setHoveredPoint(point);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const getPointColor = () => {
    return "#EF4444"; // Red for all points
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 bg-white">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl sm:text-7xl font-bold mb-2 sm:mb-3 text-gray-800 text-center">
          Vibes-Based AI Sentiment
        </h1>
        <p className="text-3xl text-gray-600 mb-6 text-center">
          AI Themes Plotted on a Fear-Excitement vs. Impact Matrix
        </p>
      </div>
      
      <div className="relative bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <svg width={width} height={height} className="min-w-full">
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            
            {/* Outer bounding box with rounded corners */}
            <rect 
              x={0} 
              y={0} 
              width={chartWidth} 
              height={chartHeight} 
              fill="none" 
              stroke="#d1d5db" 
              strokeWidth="2"
              rx="12"
            />
            
            {/* Center dividing lines to create quadrants */}
            <line 
              x1={xScale(0)} 
              y1={0} 
              x2={xScale(0)} 
              y2={chartHeight} 
              stroke="#d1d5db" 
              strokeWidth="2"
            />
            <line 
              x1={0} 
              y1={yScale(5)} 
              x2={chartWidth} 
              y2={yScale(5)} 
              stroke="#d1d5db" 
              strokeWidth="2"
            />
            
            {/* Data points */}
            {data.map((point, index) => (
              <g key={index}>
                <circle
                  cx={xScale(point.fearExcitement)}
                  cy={yScale(point.impact)}
                  r="8"
                  fill={getPointColor()}
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    filter: hoveredPoint === point ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none',
                    transform: hoveredPoint === point ? 'scale(1.3)' : 'scale(1)',
                    transformOrigin: 'center'
                  }}
                  onMouseEnter={(e) => handleMouseEnter(point, e)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                />
                {/* Point labels */}
                <text
                  x={xScale(point.fearExcitement) + 15}
                  y={yScale(point.impact) + 4}
                  className="text-2xl font-medium fill-gray-700 pointer-events-none"
                  style={{
                    textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
                  }}
                >
                  {point.point}
                </text>
              </g>
            ))}
            
            {/* Impact labels with arrows - horizontal text, two lines */}
            <text 
              x={-80} 
              y={yScale(7.5) - 35} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              ↑
            </text>
            <text 
              x={-80} 
              y={yScale(7.5) - 5} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              High
            </text>
            <text 
              x={-80} 
              y={yScale(7.5) + 20} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Impact
            </text>
            
            <text 
              x={-80} 
              y={yScale(2.5) - 10} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Low
            </text>
            <text 
              x={-80} 
              y={yScale(2.5) + 15} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Impact
            </text>
            <text 
              x={-80} 
              y={yScale(2.5) + 45} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              ↓
            </text>
            
            {/* Fear label with arrow */}
            <text 
              x={xScale(-5) - 50} 
              y={chartHeight + 40} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              ←
            </text>
            <text 
              x={xScale(-5)} 
              y={chartHeight + 40} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Fear
            </text>
            
            {/* Excitement label with arrow */}
            <text 
              x={xScale(5)} 
              y={chartHeight + 40} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Excitement
            </text>
            <text 
              x={xScale(5) + 80} 
              y={chartHeight + 40} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              →
            </text>
            
            {/* Quadrant labels */}
            <text 
              x={xScale(-5)} 
              y={yScale(8.5)} 
              textAnchor="middle" 
              className="text-3xl fill-gray-500 font-black"
            >
              FEAR / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(5)} 
              y={yScale(8.5)} 
              textAnchor="middle" 
              className="text-3xl fill-gray-500 font-black"
            >
              EXCITEMENT / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(-5)} 
              y={yScale(1.5)} 
              textAnchor="middle" 
              className="text-3xl fill-gray-500 font-black"
            >
              FEAR / LOW IMPACT
            </text>
            
            <text 
              x={xScale(5)} 
              y={yScale(1.5)} 
              textAnchor="middle" 
              className="text-3xl fill-gray-500 font-black"
            >
              EXCITEMENT / LOW IMPACT
            </text>
            
          </g>
        </svg>
        
      </div>
      
      {/* Tooltip */}
      {hoveredPoint && (
        <div
          className="fixed z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl max-w-md pointer-events-none"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="font-bold text-lg mb-1 text-blue-300">{hoveredPoint.point}</div>
          <div className="text-xs text-gray-400 mt-2">
            Fear/Excitement: {hoveredPoint.fearExcitement.toFixed(2)} | Impact: {hoveredPoint.impact.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScatterPlot;