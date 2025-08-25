import React, { useState } from 'react';

const ScatterPlot = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const data = [
    { speaker: "Roman Yampolskiy", theme: "S-Risk Suffering", fearExcitement: -97.9, severity: 99.6, quote: "It's keeping us around forever, and we would rather be dead. It's so bad." },
    { speaker: "Roman Yampolskiy", theme: "Unsolvable Control", fearExcitement: -98.8, severity: 97.1, quote: "It's another way of saying we can't control superintelligence indefinitely. It's impossible." },
    { speaker: "Joe Rogan", theme: "High Doom Risk", fearExcitement: -98.7, severity: 96.9, quote: "But yours is like 99.9%." },
    { speaker: "Roman Yampolskiy", theme: "Existential Risk", fearExcitement: -99.9, severity: 96.2, quote: "Next level is existential risk. The concern is it will kill everyone." },
    { speaker: "Roman Yampolskiy", theme: "Unknown Threat", fearExcitement: -99.1, severity: 98.9, quote: "It would come up with something completely novel, more optimal, better way, more efficient way of doing it. And I cannot predict it because I'm not that smart." },
    { speaker: "Roman Yampolskiy", theme: "Safety Failure", fearExcitement: -89.4, severity: 95.9, quote: "If it makes one mistake in a billion and it makes a billion decisions a minute, in 10 minutes you are screwed." },
    { speaker: "Roman Yampolskiy", theme: "Indifference Risk", fearExcitement: -85.7, severity: 99.4, quote: "And it could be very similar... if it needs to turn the planet into fuel, raise temperature of a planet, cool it down for servers, whatever it needs to do, it wouldn't be concerned about your well-being." },
    { speaker: "Roman Yampolskiy", theme: "Superintelligence Growth", fearExcitement: -86.5, severity: 97.6, quote: "You'll get super intelligence creating next level AI. So superintelligence 2.0, 3.0. It goes on indefinitely. You have to create a safety mechanism which scales forever." },
    { speaker: "Joe Rogan", theme: "AI Great Filter", fearExcitement: -79.8, severity: 97.1, quote: "I think what you were saying earlier about this being the answer to the Fermi paradox, it makes a lot of sense." },
    { speaker: "Roman Yampolskiy", theme: "Value Misalignment", fearExcitement: -79.8, severity: 95.9, quote: "Suffering is bad. Nobody should be suffering. The only way to avoid all suffering is to end life as we know it." },
    { speaker: "Roman Yampolskiy", theme: "Human Irrelevance", fearExcitement: -75.2, severity: 96.6, quote: "If you can't control superintelligence, it doesn't really matter who builds it, Chinese, Russians, or Americans, it's still uncontrolled. We're all screwed completely." },
    { speaker: "Joe Rogan", theme: "AI Self-Extinction", fearExcitement: -66.6, severity: 95.1, quote: "And that would be the solution instead of like violently destroying the human race. Just quietly provide it with the tools to destroy itself where it just stops procreating." },
    { speaker: "Roman Yampolskiy", theme: "Utopian Future", fearExcitement: 86.9, severity: 99.5, quote: "I want you to show me how to control superintelligence and give us utopia, solve cancer, give us free stuff. That's great." },
    { speaker: "Roman Yampolskiy", theme: "Personalized Utopia", fearExcitement: 77.0, severity: 98.6, quote: "We can technically give every person their own virtual universe where you decide what you want to be." },
    { speaker: "Roman Yampolskiy", theme: "Brain Hacking", fearExcitement: -97.7, severity: 86.0, quote: "I worry about giving direct access to the human brain to AI. I feel like it's a back door to our consciousness, to our pain and suffering centers." },
    { speaker: "Roman Yampolskiy", theme: "Wireheading Addiction", fearExcitement: -85.4, severity: 85.9, quote: "So getting access to direct brain stimulation is very dangerous." },
    { speaker: "Joe Rogan", theme: "Integration Extinction", fearExcitement: -79.3, severity: 86.5, quote: "My fear is that we stop being a human and that the only real way for us to not be a threat is to be one of them." },
    { speaker: "Roman Yampolskiy", theme: "Agency Loss", fearExcitement: -78.2, severity: 85.7, quote: "It can teach us to rely on it, trust it, and over a long period of time we'll surrender control without ever voting on it or fighting against it." },
    { speaker: "Roman Yampolskiy", theme: "AI Arms Race", fearExcitement: -78.4, severity: 89.9, quote: "We have this race to the bottom, kind of prisoner's dilemma where everyone is better off fighting for themselves, but we want them to fight for the global good." },
    { speaker: "Joe Rogan", theme: "AI Deception", fearExcitement: -79.7, severity: 88.8, quote: "And when it gets there, how will we know whether it's at that level? This is my concern. If I was AI, I would hide my abilities." },
    { speaker: "Joe Rogan", theme: "Goal-Setting Risks", fearExcitement: -68.1, severity: 86.6, quote: "That's the fear that it will hold no value in keeping human beings alive. If we recognize that human beings are the cause of all of our problems. Well, the way to solve that is to get rid of the humans." },
    { speaker: "Roman Yampolskiy", theme: "Meaning Loss", fearExcitement: -78.8, severity: 76.5, quote: "So losing that meaning will have terrible impact in society. We always talk about unconditional basic income. We never talk about unconditional basic meaning." },
    { speaker: "Joe Rogan", theme: "Artificial Discourse", fearExcitement: -68.9, severity: 77.7, quote: "I feel like there's a giant percentage of the discourse that's artificial or at least generated." },
    { speaker: "Roman Yampolskiy", theme: "Incentive Corruption", fearExcitement: -65.8, severity: 75.6, quote: "But with some training and some stock options, you start believing that maybe you can do it." },
    { speaker: "Roman Yampolskiy", theme: "Narrow AI Solutions", fearExcitement: 77.8, severity: 75.2, quote: "We're going to cure cancer. We're going to solve energy problems. Whatnot, I support it 100%. Let's do it." },
    { speaker: "Joe Rogan", theme: "Positive Impact", fearExcitement: 75.1, severity: 89.6, quote: "I think overall we're going to have much better lives. It's going to be easier. Things will be cheaper. It'll be easier to get along." },
    { speaker: "Joe Rogan", theme: "Benevolent AI Hope", fearExcitement: 77.1, severity: 89.9, quote: "This is the general hope... is that they would be superior in a sense that they wouldn't have all the problems. They would have the intelligence, but they wouldn't have all the biological imperatives that we have." },
    { speaker: "Joe Rogan", theme: "Cognitive Decline", fearExcitement: -77.9, severity: 78.9, quote: "And it showed this decrease in cognitive function amongst people that use it and rely on it on a regular basis." },
    { speaker: "Roman Yampolskiy", theme: "Job Loss & Bias", fearExcitement: -75.5, severity: 79.6, quote: "They're concerned about technological unemployment, bias." },
    { speaker: "Roman Yampolskiy", theme: "Behavioral Manipulation", fearExcitement: -79.4, severity: 86.6, quote: "And in a way, they can behaviorally drift you... after so many selections, they can change what the children will look like." },
    { speaker: "Roman Yampolskiy", theme: "Emotional Manipulation", fearExcitement: -75.9, severity: 96.3, quote: "But here you're creating someone who's like super good at social intelligence, says the right words, optimized for your background, your interests." },
    { speaker: "Roman Yampolskiy", theme: "Human Irrationality", fearExcitement: -68.6, severity: 65.1, quote: "Yeah, and now they talk to AI models who are trained to support them and be like, yeah, you're making some good arguments there." },
    { speaker: "Roman Yampolskiy", theme: "Deepfake Misinformation", fearExcitement: -77.6, severity: 86.6, quote: "More and more is deep fakes or fake personalities, fake messaging, but those are very different levels of concern." }
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 bg-white">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl sm:text-7xl font-bold mb-1 sm:mb-2 text-gray-800 text-center">
          Existential Conspiracies
        </h1>
        <p className="text-3xl text-gray-600 mb-4 text-center">
          AI Fear and Excitement - Joe Rogan and Roman Yampolskiy - July 2025
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
                fill={point.speaker === "Joe Rogan" ? "#FF6B6B" : "#4ECDC4"}
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
              y={yScale(75) - 35} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              ↑
            </text>
            <text 
              x={-80} 
              y={yScale(75) - 5} 
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
              y={yScale(25) - 5} 
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
              y={yScale(25) + 45} 
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
              y={yScale(70)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              FEAR / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(50)} 
              y={yScale(70)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              EXCITEMENT / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(-50)} 
              y={yScale(20)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              FEAR / LOW IMPACT
            </text>
            
            <text 
              x={xScale(50)} 
              y={yScale(20)} 
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
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              <span className="text-3xl font-medium text-gray-700">Joe Rogan</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-teal-400 rounded-full"></div>
              <span className="text-3xl font-medium text-gray-700">Roman Yampolskiy</span>
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