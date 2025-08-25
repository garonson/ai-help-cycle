import React, { useState } from 'react';

const ScatterPlot = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const data = [
    { speaker: "Theo Von", theme: "purposelessness", fearExcitement: -96.50429388, severity: 94.69168747, quote: "work gives us purpose... we are the ones advancing society humanity gives us purpose... It feels like our sense of purpose would start to really disappear" },
    { speaker: "Theo Von", theme: "mass unemployment", fearExcitement: -93.68226536, severity: 97.62308544, quote: "How will people survive, like how do we adjust our structure of like financially... How will societal members still be able to financially survive?" },
    { speaker: "Theo Von", theme: "sectoral unemployment", fearExcitement: -85.0416189, severity: 80.29841723, quote: "if all the trucking jobs disappear... if everything becomes a robo taxi... where will those people go for jobs?" },
    { speaker: "Theo Von", theme: "gig work", fearExcitement: -77.53315925, severity: 74.32642303, quote: "I had this dream... everybody's driving an Uber and literally holding each other at gunpoint to be each other's passengers" },
    { speaker: "Theo Von", theme: "corp. surveillance", fearExcitement: -79.54705438, severity: 83.89511334, quote: "it starts to feel like a surveillance state... I get scared sometimes to use certain AI stuff because I don't know who's gonna have it" },
    { speaker: "Theo Von", theme: "manipulation", fearExcitement: -72.25071666, severity: 77.96460684, quote: "I don't know how much personal information I want to put in because I don't know who's gonna have it" },
    { speaker: "Theo Von", theme: "privacy", fearExcitement: -81.80432777, severity: 88.40186363, quote: "I don't know who's gonna have it... it's scary" },
    { speaker: "Theo Von", theme: "laws", fearExcitement: -75.75337568, severity: 76.46025156, quote: "how long does it take lawmakers to come up with that?... it's moving so fast that it doesn't even matter" },
    { speaker: "Theo Von", theme: "obsolescence", fearExcitement: -88.47035269, severity: 92.99174153, quote: "I can't build any technological stuff. So then I'm like, dang dude, well... what am I gonna build over there?" },
    { speaker: "Theo Von", theme: "disembodiment", fearExcitement: -36.27292741, severity: 52.23909206, quote: "this will be one of the last like maybe 40 years that we conceive children in the body... in a vat or something" },
    { speaker: "Theo Von", theme: "deception", fearExcitement: -78.58442304, severity: 83.15856265, quote: "AIs that would rather give you an answer that was possibly pleasing to the user than to give them the factual answer" },
    { speaker: "Theo Von", theme: "secrecy", fearExcitement: -65.92946827, severity: 81.128433, quote: "AIs that were developing some of their own languages to communicate with each other... languages that we don't even know" },
    { speaker: "Theo Von", theme: "unnatural", fearExcitement: -34.40747964, severity: 62.39281247, quote: "it starts to make our planet look like a software board... R2-D2 look on the outside" },
    { speaker: "Theo Von", theme: "environmental damage", fearExcitement: -56.20965012, severity: 73.48247904, quote: "it takes water to cool them, right? It takes power to power them... repercussions within the environments" },
    { speaker: "Theo Von", theme: "enslavement", fearExcitement: -99.57354646, severity: 96.88328038, quote: "if something has all the information... Aren't we then working for that thing?" },
    { speaker: "Theo Von", theme: "agency", fearExcitement: -30.66801648, severity: 58.70707778, quote: "Now maybe we get tricked. Like social media tricked us…we got too addicted to feeds…But we realized like this is not helping me be my best" },
    { speaker: "Theo Von", theme: "tech lords", fearExcitement: -68.75937824, severity: 63.94368509, quote: "some of us can't conceptualize sometimes how you guys ['tech lords'] are thinking" },
    { speaker: "Theo Von", theme: "incentives", fearExcitement: -83.48960407, severity: 90.54359566, quote: "Do you think there's bad artists... people that want for evil and not for good" },
    { speaker: "Theo Von", theme: "govt' surveillance", fearExcitement: -87.64263204, severity: 92.18663628, quote: "Palantir... to create a database on most of America. But it starts to feel like a surveillance state" },
    { speaker: "Theo Von", theme: "authenticity", fearExcitement: -49.91016827, severity: 53.69908067, quote: "Hank's Ribs... Marty's Pizza... Susan's Salami shop but they're all the same place... you feel like something's missing" },
    { speaker: "Theo Von", theme: "assistant", fearExcitement: 59.97266194, severity: 60.30600086, quote: "It was like having a secretary right there... go here and see if there's any table available" },
    { speaker: "Theo Von", theme: "coding", fearExcitement: 51.29667743, severity: 81.97401722, quote: "I can build some stuff, but I can't build like any technological stuff... [Sam: you can make any piece of software you want because you just ask an AI in English]" },
    { speaker: "Theo Von", theme: "self-actualization", fearExcitement: 85.39479764, severity: 60.26260301, quote: "if AI... helps you to figure out what your true goals in life are and then accomplish those" },
    { speaker: "Theo Von", theme: "evolution", fearExcitement: 66.06146395, severity: 65.35075177, quote: "Is there a new evolution of our purpose? Is there like a blooming inside of us?" },
    { speaker: "Theo Von", theme: "abundance", fearExcitement: 23.33567141, severity: 91.80753003, quote: "this utopian place... people are fed and have enough... are provided for, can take care of themselves….I kind of keep asking that over and over again. But you don't really have answers and that's okay…we're not in the future" },
    { speaker: "Theo Von", theme: "meaning", fearExcitement: 76.77835597, severity: 72.87699613, quote: "Will it be able to tell us about God or anything, do you think?" },
    { speaker: "Theo Von", theme: "decisions", fearExcitement: 74.32624795, severity: 77.37225401, quote: "this agent that... knew all the information and knew all the problems and knew the best ways to solve them" },
    { speaker: "Sam Altman", theme: "scrolling", fearExcitement: -73.03171456, severity: 77.02498028, quote: "scrolling, the kind of like short video feed dopamine hit feels like it's probably messing with kids' brain development in a super deep way" },
    { speaker: "Sam Altman", theme: "AI companion", fearExcitement: -51.60149622, severity: 51.31933097, quote: "There are a lot of people that talk to Chat GPT all day long... these sort of new AI companions that people talk to like they would a girlfriend or a boyfriend" },
    { speaker: "Sam Altman", theme: "legal", fearExcitement: -79.03802162, severity: 51.92355779, quote: "if you go talk to ChatGPT about your most sensitive stuff... we could be required to produce that and I think that's very screwed up" },
    { speaker: "Sam Altman", theme: "govt' surveillance", fearExcitement: -81.72424822, severity: 97.56237238, quote: "I am worried that the more AI in the world we have, the more surveillance the world is going to want... history is that the government takes that way too far" },
    { speaker: "Sam Altman", theme: "purpose", fearExcitement: -79.8118699, severity: 86.21117347, quote: "I worry about this a lot... creativity and intelligence cuts so deeply at the core of whatever we are and how we value ourselves" },
    { speaker: "Sam Altman", theme: "bias", fearExcitement: -69.52762117, severity: 75.01079733, quote: "hundreds of millions of people talk to ChatGPT every day... it probably has like a big impact on what they believe" },
    { speaker: "Sam Altman", theme: "change", fearExcitement: -64.84433214, severity: 70.72547539, quote: "if you're like a 50-year-old and you have to learn to do things in a very different way, that doesn't always work" },
    { speaker: "Sam Altman", theme: "atomic bomb", fearExcitement: -87.60256378, severity: 95.37300688, quote: "there are these moments in the history of science where you have a group of scientists look at their creation and just say... what have we done?" },
    { speaker: "Sam Altman", theme: "unknown", fearExcitement: -61.152703, severity: 75.87997894, quote: "we have discovered... something extraordinary that is going to reshape the course of human history... no one can predict the future" },
    { speaker: "Sam Altman", theme: "regulation", fearExcitement: -64.07683254, severity: 65.89784252, quote: "it'd be a mistake to let each state do this kind of crazy patchwork of stuff" },
    { speaker: "Sam Altman", theme: "environmental damage", fearExcitement: -65.47509036, severity: 73.64155854, quote: "I think we need to get to fusion as fast as possible... if you have to burn a little bit more gas in the short term" },
    { speaker: "Sam Altman", theme: "zero-sum", fearExcitement: -55.37321612, severity: 64.28046539, quote: "people get blinded by competition... very well-meaning people can get caught up in very negative incentives" },
    { speaker: "Sam Altman", theme: "coding", fearExcitement: 92.93153047, severity: 67.44370084, quote: "you can make any piece of software you want because you just ask an AI in English... this will make technology the most accessible it ever has been" },
    { speaker: "Sam Altman", theme: "abundance", fearExcitement: 79.24921155, severity: 93.03758837, quote: "I don't like basic... I want like universal extreme wealth for everybody" },
    { speaker: "Sam Altman", theme: "creativity", fearExcitement: 92.14466973, severity: 64.80669177, quote: "people really do love to be useful to each other and people love to express their creativity" },
    { speaker: "Sam Altman", theme: "interface", fearExcitement: 82.47688823, severity: 63.85798226, quote: "I think AI... so changes the game that you can design a new kind of computer based off of a really smart AI" },
    { speaker: "Sam Altman", theme: "agents", fearExcitement: 93.97175723, severity: 81.32677381, quote: "an AI cannot just answer questions for you, but it can go and actually do stuff on your behalf as your agent" },
    { speaker: "Sam Altman", theme: "energy", fearExcitement: 89.26453529, severity: 94.19859716, quote: "Nuclear fusion... makes a bunch of energy, but no carbon, very clean... power can become like abundant and pretty limitless" },
    { speaker: "Sam Altman", theme: "medical", fearExcitement: 80.05041498, severity: 94.30949044, quote: "these systems are discovering new cures for diseases" },
    { speaker: "Sam Altman", theme: "science", fearExcitement: 93.01185251, severity: 93.05556012, quote: "we'll go colonize space, we'll go build neural interfaces, who knows what else we'll do" },
    { speaker: "Sam Altman", theme: "purpose", fearExcitement: 72.11306258, severity: 68.33488926, quote: "it will be able to help us answer questions about the nature of the universe that we currently can't" },
    { speaker: "Sam Altman", theme: "progress", fearExcitement: 98.63660439, severity: 100, quote: "this one long compounding exponential... we're able to just do more and more... I want that exponential to keep going" },
    { speaker: "Sam Altman", theme: "self-actualization", fearExcitement: 95.55654034, severity: 80.6595171, quote: "if AI feels like it is helping you try to accomplish your goals and be your best, that will feel very different" },
    { speaker: "Sam Altman", theme: "ingenuity", fearExcitement: 89.45688353, severity: 88.67370988, quote: "we're letting the massively distributed human ingenuity and creativity and economic engine do its thing" },
    { speaker: "Sam Altman", theme: "redistribution", fearExcitement: 83.84889379, severity: 93.44336633, quote: "everybody gets one trillion tokens... everybody on earth is getting like a slice of the world's AI capacity" }
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
          Drawl vs. Vocal Fry
        </h1>
        <p className="text-gray-600 mb-4 text-3xl text-center">
          AI Fear and Excitement - Theo Von and Sam Altman - July 2025
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
                fill={point.speaker === "Theo Von" ? "#FF6B6B" : "#4ECDC4"}
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
              y={yScale(75) + 15} 
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
              y={yScale(25) + 15} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Impact
            </text>
            <text 
              x={-80} 
              y={yScale(25) + 40} 
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
            
            {/* Quadrant labels - moved down and larger */}
            <text 
              x={xScale(-50)} 
              y={yScale(70)} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-500"
            >
              FEAR / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(50)} 
              y={yScale(70)} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-500"
            >
              EXCITEMENT / HIGH IMPACT
            </text>
            
            <text 
              x={xScale(-50)} 
              y={yScale(30)} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-500"
            >
              FEAR / LOW IMPACT
            </text>
            
            <text 
              x={xScale(50)} 
              y={yScale(30)} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-500"
            >
              EXCITEMENT / LOW IMPACT
            </text>
            
          </g>
        </svg>
        
        {/* Legend - closer to chart */}
        <div className="w-full flex justify-center mt-2 pb-2">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-3xl font-medium text-gray-700">Theo Von</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
              <span className="text-3xl font-medium text-gray-700">Sam Altman</span>
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