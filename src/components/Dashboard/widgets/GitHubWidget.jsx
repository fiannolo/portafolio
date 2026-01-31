import { useState, useEffect } from 'react';

export function GitHubWidget() {
  // Simulated commit feed (replace with real GitHub API in production)
  const [commits] = useState([
    { hash: 'a3f2c1d', message: 'feat: Add Genie effect animation', time: '2 hours ago', branch: 'main' },
    { hash: 'b7e4f2a', message: 'fix: Spotlight search not focusing input', time: '5 hours ago', branch: 'main' },
    { hash: 'c9d1e3b', message: 'style: Improve traffic light button glow', time: '8 hours ago', branch: 'feature/ui' },
    { hash: 'd2a5f7c', message: 'feat: Implement Dashboard widgets', time: '1 day ago', branch: 'main' },
    { hash: 'e8b3c4d', message: 'refactor: Extract Window components', time: '2 days ago', branch: 'main' },
  ]);

  const [currentCommit, setCurrentCommit] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Cycle through commits with typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentCommit(prev => (prev + 1) % commits.length);
        setIsTyping(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [commits.length]);

  return (
    <div
      className="p-4 rounded-xl h-full"
      style={{
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        border: '1px solid #30363d',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-white" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <span className="text-white font-semibold">GitHub Activity</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-400">Live</span>
        </div>
      </div>

      {/* Terminal-style commit display */}
      <div
        className="p-3 rounded-lg font-mono text-sm mb-4"
        style={{ background: '#0d1117', border: '1px solid #30363d' }}
      >
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <span className="text-green-400">$</span>
          <span>git log --oneline -1</span>
        </div>
        <div className={`text-yellow-400 transition-opacity ${isTyping ? 'opacity-50' : 'opacity-100'}`}>
          <span className="text-purple-400">{commits[currentCommit].hash}</span>
          {' '}
          <span className="text-white">{commits[currentCommit].message}</span>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          on <span className="text-cyan-400">{commits[currentCommit].branch}</span> • {commits[currentCommit].time}
        </div>
      </div>

      {/* Recent commits list */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Recent Commits</div>
        {commits.slice(0, 4).map((commit, i) => (
          <div
            key={commit.hash}
            className={`flex items-center gap-2 text-xs p-2 rounded transition-colors ${
              i === currentCommit ? 'bg-blue-500/20 border-l-2 border-blue-500' : 'hover:bg-white/5'
            }`}
          >
            <span className="text-purple-400 font-mono">{commit.hash.slice(0, 7)}</span>
            <span className="text-gray-300 truncate flex-1">{commit.message}</span>
            <span className="text-gray-600">{commit.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
