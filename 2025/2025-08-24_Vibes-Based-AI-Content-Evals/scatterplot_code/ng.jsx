import React, { useState } from 'react';

const ScatterPlot = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const data = [
    { speaker: "Andrew Ng", theme: "Abuse via deepfakes/hacking", fearExcitement: -6.621104214, severity: 7.933514239, quote: "ALSO READ: TRANSCRIPT: Dark Side of AI – How Hackers use AI & Deepfakes: Mark T. Hofmann." },
    { speaker: "Andrew Ng", theme: "Combinatorial AI building blocks enabling previously impossible software", fearExcitement: 7.832894945, severity: 7.840295679, quote: "build software that no one on the planet could have built even a year ago." },
    { speaker: "Andrew Ng", theme: "Engineering speed up / cost down (accelerates AI deployment)", fearExcitement: 4.663634093, severity: 6.984923348, quote: "the speed of engineering is going up rapidly and the cost of engineering is also going down rapidly." },
    { speaker: "Andrew Ng", theme: "Rise of agentic AI as a major trend", fearExcitement: 6.862526654, severity: 6.557149497, quote: "agentic AI is exciting and important and also opens up a lot more startup opportunities." },
    { speaker: "Andrew Ng", theme: "Agentic workflows unlocking hard domains (e.g., medical/legal)", fearExcitement: 5.867588203, severity: 4.889297404, quote: "we found that these agentic workflows are really a huge difference between working versus not working." },
    { speaker: "Andrew Ng", theme: "Agentic orchestration layer lowers barriers to complex apps", fearExcitement: 4.8960984, severity: 4.635511913, quote: "the orchestration layer has made it even easier to build applications." },
    { speaker: "Andrew Ng", theme: "Highly agentic coding assistants boost capability", fearExcitement: 5.596447266, severity: 4.554688529, quote: "a new generation of highly agentic coding assistants… making developer productivity keep on growing." },
    { speaker: "Andrew Ng", theme: "Everyone learns to code (broad empowerment)", fearExcitement: 6.803417974, severity: 3.98132272, quote: "I think it's time for everyone in every job role to learn to code." },
    { speaker: "Andrew Ng", theme: "Data-leak (PII) harms from insecure prototypes", fearExcitement: -5.516867049, severity: 4.830710375, quote: "Leaking PII, leaking sensitive data, that is very damaging." }
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

  const getPointColor = (speaker) => {
    return "#4A90E2"; // Single blue color for Andrew Ng
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 bg-white">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl sm:text-7xl font-bold mb-1 sm:mb-2 text-gray-800 text-center">
          Optimistic Andrew Ng
        </h1>
        <p className="text-gray-600 mb-4 text-3xl text-center">
          Y Combinator Speech - June 2025
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
                r="6"
                fill={getPointColor(point.speaker)}
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
              y={yScale(7)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              FEAR / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(5)} 
              y={yScale(7)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              EXCITEMENT / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(-5)} 
              y={yScale(2)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              FEAR / LOW IMPACT
            </text>
            
            <text 
              x={xScale(5)} 
              y={yScale(2)} 
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
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#4A90E2" }}></div>
              <span className="text-3xl font-medium text-gray-700">Andrew Ng</span>
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
          <div className="text-xs text-gray-400 mt-2">
            Fear/Excitement: {hoveredPoint.fearExcitement.toFixed(2)} | Impact: {hoveredPoint.severity.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScatterPlot;