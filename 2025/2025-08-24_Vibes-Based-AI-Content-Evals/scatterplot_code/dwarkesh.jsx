import React, { useState } from 'react';

const ScatterPlot = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const data = [
    { speaker: "Dwarkesh Patel", theme: "Misaligned Artificial Superintelligence (near-term)", fearExcitement: -9.790601933, severity: 9.68, quote: "Work to prepare for misaligned 2028 ASI still makes a lot of sense - I think this is a totally plausible outcome." },
    { speaker: "Dwarkesh Patel", theme: "Online/continual learning → rapid emergence of superintelligence", fearExcitement: 8.51, severity: 9.90, quote: "An AI that is capable of online learning might functionally become a superintelligence quite rapidly without any further algorithmic progress." },
    { speaker: "Dwarkesh Patel", theme: "Economy-wide intelligence explosion (excitement)", fearExcitement: 7.88, severity: 9.72, quote: "…we might still see something that looks like a broadly deployed intelligence explosion." },
    { speaker: "Dwarkesh Patel", theme: "Economy-wide intelligence explosion (fear)", fearExcitement: -7.832741113, severity: 9.78, quote: "…we have to expect some truly crazy outcomes." },
    { speaker: "Dwarkesh Patel", theme: "Recursive self-improvement (fear)", fearExcitement: -8.539493652, severity: 9.74, quote: "(with models rapidly building smarter and smarter successor systems)" },
    { speaker: "Dwarkesh Patel", theme: "Recursive self-improvement (excitement)", fearExcitement: 5.63, severity: 9.81, quote: "Even if there isn't a software only singularity (with models rapidly building smarter and smarter successor systems)…" },
    { speaker: "Dwarkesh Patel", theme: "Cross-copy learning/amalgamation", fearExcitement: 7.70, severity: 9.79, quote: "But unlike humans, these models can amalgamate their learnings across all their copies. So one AI is basically learning how to do every single job in the world." },
    { speaker: "Dwarkesh Patel", theme: "AGI likely this decade (fear)", fearExcitement: -6.70687299, severity: 8.84, quote: "AGI timelines are very lognormal. It's either this decade or bust." },
    { speaker: "Dwarkesh Patel", theme: "AGI likely this decade (excitement)", fearExcitement: 6.61, severity: 8.85, quote: "AGI timelines are very lognormal. It's either this decade or bust." },
    { speaker: "Dwarkesh Patel", theme: "AI learns on the job as seamlessly as a human", fearExcitement: 7.55, severity: 8.82, quote: "AI learns on the job as easily, organically, seamlessly, and quickly as a human… after six months, it has as much actionable, deep understanding… as a human would." },
    { speaker: "Dwarkesh Patel", theme: "Present models show baby general intelligence", fearExcitement: 7.90, severity: 8.51, quote: "…the most proximal, concise, and accurate explanation is simply that it's powered baby general intelligence." },
    { speaker: "Dwarkesh Patel", theme: "Short-timeline upheaval (fear)", fearExcitement: -7.830497263, severity: 8.81, quote: "…we have to expect some truly crazy outcomes." },
    { speaker: "Dwarkesh Patel", theme: "Short-timeline upheaval (excitement)", fearExcitement: 6.81, severity: 8.98, quote: "…we have to expect some truly crazy outcomes." },
    { speaker: "Dwarkesh Patel", theme: "Models now exhibit genuine multi-step reasoning", fearExcitement: 7.80, severity: 7.56, quote: "Have you read the reasoning traces of o3 or Gemini 2.5? It's actually reasoning!" }
  ];

  // Chart dimensions and margins
  const width = 900;
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

  const getPointColor = (theme) => {
    return "#FF6B6B"; // Red for all points
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 bg-white">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl sm:text-7xl font-bold mb-1 sm:mb-2 text-gray-800 text-center">
          Why I Don't Think AGI is Right Around the Corner
        </h1>
        <p className="text-3xl text-gray-600 mb-4 text-center">
          Dwarkesh on the AGI Hype - June 2025
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
              <circle
                key={index}
                cx={xScale(point.fearExcitement)}
                cy={yScale(point.severity)}
                r="5"
                fill={getPointColor(point.theme)}
                className="cursor-pointer transition-all duration-200"
                style={{
                  filter: hoveredPoint === point ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none',
                  transform: hoveredPoint === point ? 'scale(1.5)' : 'scale(1)',
                  transformOrigin: 'center'
                }}
                onMouseEnter={(e) => handleMouseEnter(point, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            ))}
            
            {/* Impact labels with arrows - horizontal text, two lines */}
            <text 
              x={-80} 
              y={yScale(7.5) - 40} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              ↑
            </text>
            <text 
              x={-80} 
              y={yScale(7.5) - 10} 
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
              y={yScale(2.5) + 20} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Impact
            </text>
            <text 
              x={-80} 
              y={yScale(2.5) + 50} 
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
              y={yScale(7.5)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              FEAR / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(5)} 
              y={yScale(7.5)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              EXCITEMENT / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(-5)} 
              y={yScale(1.5)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              FEAR / LOW IMPACT
            </text>
            
            <text 
              x={xScale(5)} 
              y={yScale(1.5)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              EXCITEMENT / LOW IMPACT
            </text>
            
          </g>
        </svg>
        
        {/* Legend - closer to chart */}
        <div className="w-full flex justify-center mt-2 pb-2">
          <div className="flex items-center space-x-6 flex-wrap justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF6B6B" }}></div>
              <span className="text-3xl font-medium text-gray-700">Dwarkesh Patel</span>
            </div>
          </div>
        </div>
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
          <div className="font-bold text-lg mb-1 text-blue-300">{hoveredPoint.theme}</div>
          <div className="text-sm mb-2 text-gray-300">
            <strong>{hoveredPoint.speaker}</strong>
          </div>
          <div className="text-sm text-gray-200 leading-relaxed border-l-2 border-gray-600 pl-3">
            "{hoveredPoint.quote}"
          </div>
        </div>
      )}
    </div>
  );
};

export default ScatterPlot;