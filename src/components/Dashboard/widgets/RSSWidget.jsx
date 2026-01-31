import { useState, useEffect } from 'react';

export function RSSWidget() {
  const [feeds, setFeeds] = useState([
    {
      title: "Apple Announces Revolutionary New MacBook",
      source: "MacRumors",
      time: "2 hours ago",
      summary: "Apple's latest MacBook features unprecedented performance and battery life..."
    },
    {
      title: "macOS Tiger Gets Security Update",
      source: "Apple Newsroom",
      time: "4 hours ago", 
      summary: "Important security fixes available for all Mac OS X Tiger users..."
    },
    {
      title: "Developer Spotlight: Building Retro Web Interfaces",
      source: "Hacker News",
      time: "6 hours ago",
      summary: "How developers are recreating classic operating systems in modern browsers..."
    }
  ]);

  useEffect(() => {
    // Simulate RSS feed updates
    const interval = setInterval(() => {
      setFeeds(prev => prev.map((feed, index) => ({
        ...feed,
        time: `${Math.floor(Math.random() * 12) + 1} hours ago`
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        boxShadow: '0 8px 32px rgba(79, 172, 254, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="text-white/80 text-xs font-medium mb-3 flex items-center justify-between">
        <span>📰 Tech News</span>
        <span className="text-xs opacity-60">Auto-updating</span>
      </div>
      
      <div className="space-y-3">
        {feeds.map((feed, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-lg p-3 backdrop-filter backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-1">
              <h4 className="text-white font-medium text-sm flex-1 pr-2">{feed.title}</h4>
              <span className="text-white/60 text-xs whitespace-nowrap">{feed.time}</span>
            </div>
            <div className="text-xs text-white/80 mb-1">{feed.source}</div>
            <p className="text-xs text-white/60 line-clamp-2">{feed.summary}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-center">
        <button
          className="text-xs text-white/60 hover:text-white/80 transition-colors duration-200"
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '4px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          Load more stories →
        </button>
      </div>
    </div>
  );
}