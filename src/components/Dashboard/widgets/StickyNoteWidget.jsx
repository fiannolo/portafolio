import { useState } from 'react';

export function StickyNoteWidget() {
  const [note, setNote] = useState(`📌 Current Focus:
- Building AI-powered portfolio
- Tiger-era authenticity
- "Never forget" UX

💡 Ideas for later:
- Add more sound effects
- Implement Exposé
- Create Terminal app`);

  return (
    <div
      className="relative p-4 rounded-lg shadow-xl"
      style={{
        background: 'linear-gradient(180deg, #fff9b0 0%, #fff176 100%)',
        transform: 'rotate(-1deg)',
        boxShadow: '2px 4px 20px rgba(0,0,0,0.3), inset 0 -2px 0 rgba(0,0,0,0.05)',
        minHeight: '200px',
      }}
    >
      {/* Tape effect */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(200,200,200,0.5) 100%)',
          borderRadius: '2px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-yellow-400/50">
        <span className="text-xs font-bold text-yellow-800/70">STICKIES</span>
        <span className="text-xs text-yellow-700/50">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* Content */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full h-40 resize-none bg-transparent text-sm text-yellow-900 outline-none leading-relaxed"
        style={{
          fontFamily: '"Marker Felt", "Comic Sans MS", cursive',
        }}
      />
    </div>
  );
}
