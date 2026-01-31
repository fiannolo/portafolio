import { useState, useEffect } from 'react';

export function GPUTempWidget() {
  const [metrics, setMetrics] = useState({
    creativity: 78,
    productivity: 92,
    coffeeLevel: 65,
    bugSquash: 84,
  });

  // Simulate fluctuating metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        creativity: Math.min(100, Math.max(50, prev.creativity + (Math.random() - 0.5) * 10)),
        productivity: Math.min(100, Math.max(60, prev.productivity + (Math.random() - 0.5) * 8)),
        coffeeLevel: Math.min(100, Math.max(20, prev.coffeeLevel + (Math.random() - 0.5) * 15)),
        bugSquash: Math.min(100, Math.max(40, prev.bugSquash + (Math.random() - 0.5) * 12)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const MetricBar = ({ label, value, color, icon }) => (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="flex items-center gap-1">
          <span>{icon}</span>
          <span className="text-white/70">{label}</span>
        </span>
        <span className="text-white font-mono">{Math.round(value)}%</span>
      </div>
      <div className="h-2 bg-black/30 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`,
            boxShadow: `0 0 10px ${color}80`,
          }}
        />
      </div>
    </div>
  );

  const avgTemp = (metrics.creativity + metrics.productivity + metrics.bugSquash) / 3;

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="text-white font-semibold">Dev Core Temp</span>
        </div>
        <div
          className="px-2 py-1 rounded text-xs font-mono font-bold"
          style={{
            background: avgTemp > 80 ? '#ff4444' : avgTemp > 60 ? '#ffaa00' : '#44ff44',
            color: '#000',
          }}
        >
          {Math.round(avgTemp)}°C
        </div>
      </div>

      {/* Metrics */}
      <MetricBar label="Creativity" value={metrics.creativity} color="#ff6b6b" icon="🎨" />
      <MetricBar label="Productivity" value={metrics.productivity} color="#4ecdc4" icon="⚡" />
      <MetricBar label="Coffee Level" value={metrics.coffeeLevel} color="#ffe66d" icon="☕" />
      <MetricBar label="Bug Squash Rate" value={metrics.bugSquash} color="#95e1d3" icon="🐛" />

      {/* Status */}
      <div className="mt-4 pt-3 border-t border-white/10 text-center">
        <span className="text-xs text-white/50">
          {avgTemp > 80 ? '🔥 MAXIMUM OVERDRIVE' :
           avgTemp > 60 ? '✨ Optimal Performance' :
           '❄️ Warming Up...'}
        </span>
      </div>
    </div>
  );
}
