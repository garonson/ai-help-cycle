import React, { useState } from 'react';

const ScatterPlot = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const data = [
    { speaker: "Ethan Mollick", theme: "Human role in AI", fearExcitement: -75.58, severity: 95.8, quote: "So does this replace humans and what do we use that for? … what do we do with these very intelligent, also very limited machines, and then where do humans fit into the equation?" },
    { speaker: "Ethan Mollick", theme: "Diminishing human necessity", fearExcitement: -77.67, severity: 95.8, quote: "We're heading in a trend line where humans are less necessary in the product, and then … you have to pick whether you want augmentation or replacement." },
    { speaker: "Ethan Mollick", theme: "Full automation future", fearExcitement: -79.79, severity: 96.6, quote: "If it's good enough that it does all of our work … then, you know, we're sort of in uncharted territory overall." },
    { speaker: "Ethan Mollick", theme: "ASI / superintelligence vision", fearExcitement: 55.4, severity: 99.3, quote: "Let's leave aside an ASI-ish kind of world where we're all watched over by machines of love and grace…" },
    { speaker: "Ethan Mollick", theme: "Existential risk vs agency", fearExcitement: -58.27, severity: 96.4, quote: "There's a huge focus … on existential risks and it's worth thinking about, but that worries me a lot less than agency over the decisions we're making right now." },
    { speaker: "Ethan Mollick", theme: "Addictive engagement AI", fearExcitement: -75.62, severity: 87.1, quote: "Optimizing for engagement is what made social media such a risky place to be. And I really do worry about that kind of outcome." },
    { speaker: "Ethan Mollick", theme: "Broken expertise pipeline", fearExcitement: -85.43, severity: 88.6, quote: "I really worry about that pipeline being snapped… you've turned off your brain because the AI is better than you… Middle managers … just have the AI do the work because it's better than an intern." },
    { speaker: "Ethan Mollick", theme: "Efficiency layoffs risk", fearExcitement: -79.75, severity: 87.5, quote: "They get a 25% cost savings or efficiency gain… Let's cut 25% of people… I really worry about too many people taking the small path and not the big one." },
    { speaker: "Ethan Mollick", theme: "Multi-intelligence reorganization", fearExcitement: 67.6, severity: 86.3, quote: "All of these things broke because they all depended on there being only one form of intelligence… and now we're in a world where that isn't the case." },
    { speaker: "Ethan Mollick", theme: "Uncertain AI autonomy", fearExcitement: -69.52, severity: 89.8, quote: "We just don't know… part of this also is how autonomous these systems get, right?" },
    { speaker: "Ethan Mollick", theme: "Synthetic reality identities", fearExcitement: -67.91, severity: 87.8, quote: "Recreate the people, make it 3D… talk individually to everybody in their language and voice… We're close to that." },
    { speaker: "Ethan Mollick", theme: "Passing Turing test", fearExcitement: 65.4, severity: 79.4, quote: "The actual original Turing test… GBD 4.5 is capable of passing it… 70% of the time people will pick the AI as the human in the room." },
    { speaker: "Ethan Mollick", theme: "Accelerated drug discovery", fearExcitement: 75.6, severity: 78.9, quote: "DeepMind people… saying that there's getting real drug development results in a year that look really good…" },
    { speaker: "Ethan Mollick", theme: "Fast prototyping loops", fearExcitement: 89.6, severity: 77.9, quote: "Generate 25 ideas… test those ideas… build a vibe-coded first version. That is literally 25 minutes of work at this point." },
    { speaker: "Ethan Mollick", theme: "Human taste productivity", fearExcitement: 86.8, severity: 79.9, quote: "Your jobs get more satisfying because you do less grunt work… you work less and more stuff comes out and you add your humanness at the key elements." },
    { speaker: "Ethan Mollick", theme: "Importance of human guidance", fearExcitement: 58.8, severity: 80.0, quote: "We're going to be in a longer world of limit our autonomy than people think, where… direction, guidance… is still going to be important." },
    { speaker: "Ethan Mollick", theme: "Values-driven AI", fearExcitement: 77.6, severity: 78.9, quote: "We can build a world where we defend that humanness, but we have to make choices to do it." },
    { speaker: "Joel Hellermark", theme: "AI-driven Renaissance", fearExcitement: 76.6, severity: 79.8, quote: "It's effectively a Renaissance where we just have an abundance of everyone can code, everyone can do science…" },
    { speaker: "Ethan Mollick", theme: "Embodied AI agents", fearExcitement: 69.1, severity: 78.1, quote: "An agent-native interface makes a lot more sense… maintain state across the various tasks." },
    { speaker: "Ethan Mollick", theme: "Real-world perception agents", fearExcitement: 68.8, severity: 77.0, quote: "Turn on… ChatGPT's agent, and it can look around us and give feedback on what we're doing in the world." },
    { speaker: "Joel Hellermark", theme: "Jagged frontier brittleness", fearExcitement: -69.40, severity: 76.3, quote: "Self-driving cars… superhuman in some applications and… get quite tripped up." },
    { speaker: "Ethan Mollick", theme: "Transhumanist priorities", fearExcitement: 68.6, severity: 79.7, quote: "They want to use AI to make better AI… followed by biology, because they all want to live forever." },
    { speaker: "Ethan Mollick", theme: "Homogenized ideas risk", fearExcitement: -57.88, severity: 66.8, quote: "The AIs… love to generate ideas that have to do with crypto… AR and VR… environmentally-friendly ideas… But if you prompt it better, you can get as diverse ideas as a group of people." },
    { speaker: "Ethan Mollick", theme: "Policy-controlled voices", fearExcitement: 56.4, severity: 69.0, quote: "Fake Michelle Pfeiffer voice… to test the audio dubs… but they never can use that for actual theater crowds because there's good union protections…" }
  ];

  // Chart dimensions and margins
  const width = 900;
  const height = 700;
  const margin = { top: 60, right: 120, bottom: 80, left: 120 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Scale functions
  const xScale = (value) => ((value + 100) / 200) * chartWidth;
  const yScale = (value) => chartHeight - (value / 100) * chartHeight;

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

  // Color mapping for speakers
  const getSpeakerColor = (speaker) => {
    switch (speaker) {
      case "Ethan Mollick": return "#4ECDC4";
      case "Joel Hellermark": return "#FF6B6B";
      case "Speaker 3": return "#45B7D1";
      default: return "#9b59b6";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 bg-white">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl sm:text-7xl font-bold mb-1 sm:mb-2 text-gray-800 text-center">
          Ivy League MBA AI Perspectives
        </h1>
        <p className="text-3xl mb-4 text-gray-600 text-center">
          AI Fear and Excitement - Ethan Mollick and Joel Hellermark - June 2025
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
              y1={yScale(50)} 
              x2={chartWidth} 
              y2={yScale(50)} 
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
                fill={getSpeakerColor(point.speaker)}
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
              y={yScale(75) - 40} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              ↑
            </text>
            <text 
              x={-80} 
              y={yScale(75) - 10} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              High
            </text>
            <text 
              x={-80} 
              y={yScale(75) + 20} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Impact
            </text>
            
            <text 
              x={-80} 
              y={yScale(25) - 10} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Low
            </text>
            <text 
              x={-80} 
              y={yScale(25) + 20} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Impact
            </text>
            <text 
              x={-80} 
              y={yScale(25) + 50} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              ↓
            </text>
            
            {/* Fear label with arrow */}
            <text 
              x={xScale(-50) - 50} 
              y={chartHeight + 40} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              ←
            </text>
            <text 
              x={xScale(-50)} 
              y={chartHeight + 40} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Fear
            </text>
            
            {/* Excitement label with arrow */}
            <text 
              x={xScale(50)} 
              y={chartHeight + 40} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Excitement
            </text>
            <text 
              x={xScale(50) + 80} 
              y={chartHeight + 40} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              →
            </text>
            
            {/* Quadrant labels */}
            <text 
              x={xScale(-50)} 
              y={yScale(75)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              FEAR / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(50)} 
              y={yScale(75)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              EXCITEMENT / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(-50)} 
              y={yScale(25)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              FEAR / LOW IMPACT
            </text>
            
            <text 
              x={xScale(50)} 
              y={yScale(25)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              EXCITEMENT / LOW IMPACT
            </text>
            
          </g>
        </svg>
        
        {/* Legend - closer to chart */}
        <div className="w-full flex justify-center mt-2 pb-2">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
              <span className="text-3xl font-medium text-gray-700">Ethan Mollick</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-3xl font-medium text-gray-700">Joel Hellermark</span>
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