import React, { useState } from 'react';

const ScatterPlot = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const data = [
    { speaker: "Taylor Swift", theme: "Social media overwhelm / online safety", fearExcitement: -8.82, severity: 0.9, quote: "I'm genuinely terrified to open my DMs… there's smoke coming out of my DM." },
    { speaker: "Taylor Swift", theme: "Mass fan mobilization changing creator–platform economics", fearExcitement: 7.80, severity: 2.04, quote: "They were like we ride at dawn… it was amazing." },
    { speaker: "Taylor Swift", theme: "Collective catharsis at large events (ritualized release)", fearExcitement: 7.80, severity: 0.98, quote: "People cathartically scream this song… so passionate the fan response…" },
    { speaker: "Taylor Swift", theme: "Cross-domain fandom (music ↔ sports as social glue)", fearExcitement: 6.83, severity: 1.14, quote: "It's been wild… I've loved every second… it's such a community." },
    { speaker: "Taylor Swift", theme: "Archival/from the vault culture (preservation & creativity)", fearExcitement: 6.84, severity: 0.02, quote: "A whole bunch of extra songs I loved and adored… give fans the whole story." },
    { speaker: "Taylor Swift", theme: "Remix/reissue norms (nostalgia + novelty)", fearExcitement: 7.09, severity: 0.00, quote: "It was so exciting because fans… get to hear these new songs." },
    { speaker: "Taylor Swift", theme: "Risk calculus in public dating", fearExcitement: -6.23, severity: 0.00, quote: "If this guy isn't crazy—which is a big if…" },
    { speaker: "Taylor Swift", theme: "Romantic grand gesture (courtship scripts)", fearExcitement: 7.08, severity: 0.18, quote: "Felt like an '80s John Hughes movie… boom box… 'I want to date you.'" },
    { speaker: "Taylor Swift", theme: "Stadium-tour joy as communal identity", fearExcitement: 6.95, severity: 0.18, quote: "It was so fun… an iconic part of that tour." },
    { speaker: "Taylor Swift", theme: "Domestic memetics (household rituals via media catchphrases)", fearExcitement: 6.98, severity: 0.11, quote: "I love New News because of the screaming… we yell it across the house." },
    { speaker: "Taylor Swift", theme: "Public displays of gratitude (parasocial reinforcement)", fearExcitement: 8.16, severity: 0.19, quote: "Oh my god… I'm going to cry. This is so sweet." },
    { speaker: "Taylor Swift", theme: "Role-modeling passionate work", fearExcitement: 5.06, severity: 0.00, quote: "He is so passionate… I love it." },
    { speaker: "Taylor Swift", theme: "Kinship-building across fan/family groups", fearExcitement: 6.16, severity: 0.00, quote: "It's been so much fun to get to know your whole family." },
    { speaker: "Jason Kelce", theme: "Performance nerves (ritual of live media)", fearExcitement: 6.00, severity: 0.00, quote: "I'm shaking right now." },
    { speaker: "All three", theme: "Group cheer as micro-ritual", fearExcitement: 6.20, severity: 0.00, quote: "Yeah!" },
    { speaker: "Jason Kelce", theme: "Music ownership topic", fearExcitement: 6.88, severity: 0.14, quote: "So, how I guess how does music ownership This is so crazy to me." },
    { speaker: "Taylor Swift", theme: "Raising artist awareness", fearExcitement: 6.23, severity: 0.04, quote: "One thing that I think is really great that has come about… I have so many new artists come up to me now and say, hey, I didn't even know this was a thing." },
    { speaker: "Taylor Swift", theme: "Ownership of masters", fearExcitement: -7.79, severity: 0.00, quote: "If I never would have been able to buy back my music, one day, someone else would be leaving all of my music from my first six albums to their kids in their will." },
    { speaker: "Taylor Swift", theme: "Fans backing re-records", fearExcitement: 8.77, severity: 0.00, quote: "They were like, we ride at dawn… it was amazing because… they're the reason why the re-records worked out." },
    { speaker: "Taylor Swift", theme: "Live band performance quality", fearExcitement: 8.13, severity: 0.00, quote: "I'm so impressed… there are actually some… Taylor's versions I kind of prefer… I think it sounds incredible." },
    { speaker: "Taylor Swift", theme: "Re-records vs originals", fearExcitement: 5.76, severity: 0.13, quote: "Yeah it's your choice… I love both of them… I think a lot of the vocals I did on the re-records are better than the originals." },
    { speaker: "Taylor Swift", theme: "All Too Well (10 Minute Version) crowd reaction", fearExcitement: 10.00, severity: 0.03, quote: "I'm watching people just like cathartically scream this song… it was so passionate." },
    { speaker: "Taylor Swift", theme: "Hypothetical of no re-records", fearExcitement: -7.18, severity: 0.00, quote: "What if this never happened? Like what if I never had the re-records." },
    { speaker: "Jason Kelce", theme: "Eras Tour scale", fearExcitement: -8.12, severity: 0.00, quote: "Perhaps the most daunting thing that any artist has ever taken on, which is the Eras tour." },
    { speaker: "Taylor Swift", theme: "Finishing the tour", fearExcitement: 6.11, severity: 0.08, quote: "I mean it feels, it feels great Jason, to be honest." },
    { speaker: "Taylor Swift", theme: "Performing while unwell", fearExcitement: -4.96, severity: 0.00, quote: "Or like stomach flu or like just like aching feet or blisters or whatever." },
    { speaker: "Taylor Swift", theme: "Creative ambition of the tour", fearExcitement: 9.23, severity: 0.00, quote: "It was kind of the coolest thing in the world… I had some really lofty goals I wanted to reach." },
    { speaker: "Jason Kelce", theme: "Reaction to show design", fearExcitement: 6.90, severity: 0.14, quote: "I watched the whole tour… I just thought it was amazing." },
    { speaker: "Taylor Swift", theme: "Audience euphoria/amnesia", fearExcitement: 9.83, severity: 0.00, quote: "I experienced a state of euphoria that I now don't remember what happened to me. I was like, oh my god." },
    { speaker: "Travis Kelce", theme: "Seeing the Eras Tour", fearExcitement: 9.91, severity: 0.23, quote: "If I would have never gone to that show and been mesmerized and just been captivated…" },
    { speaker: "Travis Kelce", theme: "First meeting with Taylor", fearExcitement: 9.98, severity: 0.00, quote: "It was just the easiest conversation I ever had… it… knocked my socks off… She blew me away." },
    { speaker: "Taylor Swift", theme: "Mutual first-meeting feeling", fearExcitement: 6.96, severity: 0.13, quote: "Thank you. I felt the same when I met you." },
    { speaker: "Taylor Swift", theme: "Traveling during tour", fearExcitement: 7.82, severity: 0.21, quote: "Like Europe was so fun. Australia is amazing." },
    { speaker: "Travis Kelce", theme: "Seeing Taylor's home hobbies", fearExcitement: 6.97, severity: 0.03, quote: "It's been so fun to see what Taylor actually gets into around the house." },
    { speaker: "Travis Kelce", theme: "Relationship joy", fearExcitement: 8.04, severity: 0.00, quote: "I'm the luckiest man in the world." },
    { speaker: "Taylor Swift", theme: "Sourdough obsession", fearExcitement: 6.75, severity: 0.00, quote: "I'm deep in a sourdough obsession that has taken over my life." },
    { speaker: "Jason Kelce", theme: "Kids' reaction to bread", fearExcitement: 7.02, severity: 0.00, quote: "Oh my gosh. Does that blow their mind?" },
    { speaker: "Taylor Swift", theme: "Finding the sourdough community", fearExcitement: 6.02, severity: 0.00, quote: "Oh I'm on your blog. I'm on your blog, girl, I'm on your blog. Um, but it's like I just didn't know this." },
    { speaker: "Travis Kelce", theme: "Desire to befriend otters", fearExcitement: 7.13, severity: 0.20, quote: "I want a wild otter. So bad." },
    { speaker: "Taylor Swift", theme: "Shared otter excitement", fearExcitement: 6.13, severity: 0.00, quote: "Like that's what he wants. and I want it too, honestly. who doesn't" },
    { speaker: "Travis Kelce", theme: "Quest for an otter friend", fearExcitement: 5.79, severity: 0.00, quote: "I'm on the hunt. I'm on the hunt for a friend." },
    { speaker: "Taylor Swift", theme: "Life after tour", fearExcitement: 7.24, severity: 0.00, quote: "It's so precious" },
    { speaker: "Taylor Swift", theme: "Favorite tour moments (bonding)", fearExcitement: 7.82, severity: 0.00, quote: "I have a lot of favorite things from the Eras tour… It was really wonderful." },
    { speaker: "Taylor Swift", theme: "Crowd 'orb' tradition", fearExcitement: 9.14, severity: 0.00, quote: "It was insane to look out and see spontaneously thousands of these orbs… It was so special." },
    { speaker: "Taylor Swift", theme: "Team feeling with fans", fearExcitement: 8.90, severity: 0.03, quote: "It felt like we were all a team. That was my favorite." }
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
      case "Taylor Swift": return "#FF69B4"; // Hot pink
      case "Jason Kelce": return "#32CD32";   // Lime green
      case "Travis Kelce": return "#1E90FF";  // Dodger blue
      default: return "#9370DB";              // Medium purple for "All three"
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 bg-white">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl sm:text-7xl font-bold mb-1 sm:mb-2 text-gray-800 text-center">
          Eras of Emotion
        </h1>
        <p className="text-gray-600 mb-4 text-3xl text-center">
          Taylor Swift + Kelce Bros - August 2025
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
              y={yScale(2.5) - 5} 
              textAnchor="middle" 
              className="text-2xl font-bold fill-gray-600"
            >
              Low
            </text>
            <text 
              x={-80} 
              y={yScale(2.5) + 40} 
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
              FEAR / HIGH
            </text>
            
            <text 
              x={xScale(5)} 
              y={yScale(7.5)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              EXCITEMENT / HIGH
            </text>
            
            <text 
              x={xScale(-5)} 
              y={yScale(2.5)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              FEAR / LOW
            </text>
            
            <text 
              x={xScale(5)} 
              y={yScale(2.5)} 
              textAnchor="middle" 
              className="text-2xl fill-gray-500 font-bold"
            >
              EXCITEMENT / LOW
            </text>
            
          </g>
        </svg>
        
        {/* Legend - closer to chart */}
        <div className="w-full flex justify-center mt-2 pb-2">
          <div className="flex items-center space-x-6 flex-wrap justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF69B4" }}></div>
              <span className="text-3xl font-medium text-gray-700">Taylor Swift</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#32CD32" }}></div>
              <span className="text-3xl font-medium text-gray-700">Jason Kelce</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#1E90FF" }}></div>
              <span className="text-3xl font-medium text-gray-700">Travis Kelce</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#9370DB" }}></div>
              <span className="text-3xl font-medium text-gray-700">All Three</span>
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