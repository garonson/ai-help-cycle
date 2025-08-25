import React, { useState } from 'react';

const ScatterPlot = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const data = [
    { speaker: "Andrej Karpathy", theme: "Genomic design AI", fearExcitement: 8.885167626, severity: 8.656263742, quote: "AI that understands DNA… predicting how changes can impact… from a single protein all the way up to an entire organism." },
    { speaker: "Andrej Karpathy", theme: "Thinking models", fearExcitement: 7.800016761, severity: 4.540684403, quote: "This stage is relatively recent… seen as a large breakthrough… you can expect… higher accuracies especially on… math and code." },
    { speaker: "Andrej Karpathy", theme: "AI hallucinations", fearExcitement: -6.81672388, severity: 3.572104211, quote: "Even though it is doing research… there are no guarantees… any of this can be hallucinated… totally made up, fabricated, misunderstood." },
    { speaker: "Model persona (Grok)", theme: "AI conspiracies", fearExcitement: -5.578905208, severity: 3.584289263, quote: "I've got a fresh batch of conspiracy theories… Illuminati… lizard people… it's all connected." },
    { speaker: "Andrej Karpathy", theme: "AI web search", fearExcitement: 5.766963579, severity: 2.736062035, quote: "We can get models to perform… visit the web pages… pull the information… This is a very very cool feature." },
    { speaker: "Andrej Karpathy", theme: "True audio AI", fearExcitement: 5.974758367, severity: 2.652842269, quote: "The model can… hear and speak directly in audio… it's quite magical." },
    { speaker: "Andrej Karpathy", theme: "Research agents", fearExcitement: 6.500401956, severity: 2.768200481, quote: "This is… almost like a custom research paper on any topic… really incredible that it gives… citations and processes the information." },
    { speaker: "Andrej Karpathy", theme: "AI in medicine", fearExcitement: -4.516929919, severity: 2.568682739, quote: "This is medical information and you don't want it to be wrong… you probably want to talk to an actual doctor as well." },
    { speaker: "Andrej Karpathy", theme: "AI verification limits", fearExcitement: -3.648659411, severity: 2.617236217, quote: "I'm not guaranteed that this is the correct answer… I can go to primary sources… I don't always fully trust what's coming out here." },
    { speaker: "Andrej Karpathy", theme: "AI video generation", fearExcitement: 5.537961816, severity: 1.851805148, quote: "There's a lot of tools now that can generate videos and they are incredible and… very rapidly evolving." }
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
    switch(speaker) {
      case "Andrej Karpathy": return "#FF6B6B"; // Red
      case "Model persona (Grok)": return "#4ECDC4"; // Teal
      default: return "#9370DB"; // Medium purple for others
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 bg-white">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl sm:text-7xl font-bold mb-1 sm:mb-2 text-gray-800 text-center">
          Andrej Karpathy's Practical, Hands-on AI Advice
        </h1>
        <p className="text-3xl mb-4 text-center">
          From 'How I use LLMs' - February 2025
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
                r="4"
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
              y={yScale(7.5) + 15} 
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
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF6B6B" }}></div>
              <span className="text-3xl font-medium text-gray-700">Andrej Karpathy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#4ECDC4" }}></div>
              <span className="text-3xl font-medium text-gray-700">Model persona (Grok)</span>
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