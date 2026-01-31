import { useState, useEffect } from 'react';
import { useSound } from '../../hooks/useSound';

export function BootScreen({ onBootComplete }) {
  const [phase, setPhase] = useState('black'); // black, logo, progress, fade
  const [progress, setProgress] = useState(0);
  const { play } = useSound();

  useEffect(() => {
    // Phase 1: Black screen for 500ms
    const timer1 = setTimeout(() => {
      setPhase('logo');
      // Play the iconic Mac startup chime
      play('startup');
    }, 500);

    // Phase 2: Show logo, start progress after 800ms
    const timer2 = setTimeout(() => setPhase('progress'), 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [play]);

  useEffect(() => {
    if (phase === 'progress') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Start fade out
            setTimeout(() => setPhase('fade'), 200);
            // Complete boot
            setTimeout(() => onBootComplete(), 700);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [phase, onBootComplete]);

  if (phase === 'fade') {
    return (
      <div
        className="fixed inset-0 z-[10000] flex items-center justify-center transition-opacity duration-500 opacity-0"
        style={{ background: '#5a5a5a' }}
      />
    );
  }

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center transition-colors duration-300 ${
        phase === 'black' ? 'bg-black' : ''
      }`}
      style={{
        background: phase !== 'black' ? '#5a5a5a' : '#000',
      }}
    >
      {/* Apple Logo */}
      {phase !== 'black' && (
        <div className="flex flex-col items-center animate-fadeIn">
          {/* Gray Apple Logo */}
          <svg
            width="80"
            height="96"
            viewBox="0 0 16 16"
            className="mb-16"
            style={{ fill: '#c0c0c0' }}
          >
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
          </svg>

          {/* Spinning Gear (loading indicator) */}
          {phase === 'logo' && (
            <div className="w-8 h-8">
              <svg
                className="animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                {[...Array(12)].map((_, i) => (
                  <rect
                    key={i}
                    x="11"
                    y="2"
                    width="2"
                    height="6"
                    rx="1"
                    fill="#888"
                    opacity={0.25 + (i * 0.0625)}
                    transform={`rotate(${i * 30} 12 12)`}
                  />
                ))}
              </svg>
            </div>
          )}

          {/* Progress Bar */}
          {phase === 'progress' && (
            <div
              className="w-48 h-3 rounded-full overflow-hidden"
              style={{
                background: '#404040',
                border: '1px solid #333',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(180deg, #a8a8a8 0%, #888888 50%, #a0a0a0 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
