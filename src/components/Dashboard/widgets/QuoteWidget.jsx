import { useState, useEffect } from 'react';

const quotes = [
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
  { text: "Code is poetry.", author: "WordPress" },
];

export function QuoteWidget() {
  const [quote, setQuote] = useState(quotes[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setFade(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="p-5 rounded-xl flex flex-col justify-between"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
        minHeight: '160px',
      }}
    >
      {/* Quote icon */}
      <div className="text-white/30 text-4xl font-serif">"</div>

      {/* Quote text */}
      <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-white text-lg font-medium leading-relaxed mb-3">
          {quote.text}
        </p>
        <p className="text-white/70 text-sm">
          — {quote.author}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1 mt-3">
        {quotes.slice(0, 5).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              quotes.indexOf(quote) % 5 === i ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
