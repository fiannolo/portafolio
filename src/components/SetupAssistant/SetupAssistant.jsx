import { useState, useEffect, useCallback } from 'react';

const WELCOME_LANGUAGES = [
  'Welcome',
  'Bienvenue',
  'Willkommen',
  'Benvenuto',
  'Bienvenido',
  'Bem-vindo',
  '欢迎',
  'ようこそ',
  '환영합니다',
  'Welkom',
  'Välkommen',
  'Добро пожаловать',
  'مرحبا',
];

export function SetupAssistant({ onComplete }) {
  const [phase, setPhase] = useState('globe'); // globe, typing, complete
  const [currentLang, setCurrentLang] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showSkip, setShowSkip] = useState(false);

  const fullText = `Initializing Developer Environment...

> Loading portfolio modules...
> Mounting virtual file system...
> Starting window compositor...
> Enabling Aqua interface...

Welcome to my world.

I'm Francisco Iannolo, a Senior Software Engineer
with 15+ years building scalable solutions.

HIPAA healthcare • Team leadership • Remote expert

Press any key to continue...`;

  // Cycle through welcome languages
  useEffect(() => {
    if (phase !== 'globe') return;

    const langInterval = setInterval(() => {
      setCurrentLang((prev) => (prev + 1) % WELCOME_LANGUAGES.length);
    }, 800);

    // Move to typing phase after showing languages
    const phaseTimer = setTimeout(() => {
      setPhase('typing');
    }, 6000);

    return () => {
      clearInterval(langInterval);
      clearTimeout(phaseTimer);
    };
  }, [phase]);

  // Typing effect
  useEffect(() => {
    if (phase !== 'typing') return;

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setTypedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setShowSkip(true);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [phase, fullText]);

  // Handle key press to skip/continue
  const handleKeyPress = useCallback(() => {
    if (phase === 'globe') {
      setPhase('typing');
    } else if (phase === 'typing') {
      if (typedText.length < fullText.length) {
        setTypedText(fullText);
        setShowSkip(true);
      } else {
        setPhase('complete');
        setTimeout(onComplete, 500);
      }
    }
  }, [phase, typedText, fullText, onComplete]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key) handleKeyPress();
    };
    window.addEventListener('keydown', handler);
    window.addEventListener('click', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('click', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div
      className={`fixed inset-0 z-[10001] flex items-center justify-center transition-opacity duration-500 ${
        phase === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #1a3a5c 0%, #0a1628 50%, #000 100%)',
      }}
    >
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {phase === 'globe' && (
          <div className="animate-fadeIn">
            {/* Spinning Globe */}
            <div
              className="w-48 h-48 mx-auto mb-8 rounded-full relative"
              style={{
                background: 'linear-gradient(135deg, #4a90d9 0%, #1a5ab8 50%, #0a3a88 100%)',
                boxShadow: '0 0 60px rgba(74, 144, 217, 0.5), inset -20px -20px 40px rgba(0,0,0,0.3)',
                animation: 'spin 20s linear infinite',
              }}
            >
              {/* Continents (simplified) */}
              <div
                className="absolute inset-4 rounded-full opacity-30"
                style={{
                  background: `
                    radial-gradient(ellipse 30% 20% at 30% 30%, #5a8a4a 0%, transparent 100%),
                    radial-gradient(ellipse 25% 15% at 60% 40%, #5a8a4a 0%, transparent 100%),
                    radial-gradient(ellipse 20% 25% at 70% 60%, #5a8a4a 0%, transparent 100%),
                    radial-gradient(ellipse 15% 10% at 40% 70%, #5a8a4a 0%, transparent 100%)
                  `,
                }}
              />
              {/* Atmosphere glow */}
              <div
                className="absolute -inset-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, transparent 60%, rgba(100, 180, 255, 0.2) 100%)',
                }}
              />
            </div>

            {/* Welcome text cycling */}
            <div
              className="text-5xl font-light text-white mb-4 transition-opacity duration-300"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              {WELCOME_LANGUAGES[currentLang]}
            </div>

            <div className="text-white/50 text-sm">
              Click or press any key to continue
            </div>
          </div>
        )}

        {(phase === 'typing' || phase === 'complete') && (
          <div className="max-w-xl mx-auto text-left px-8">
            {/* Terminal-style output */}
            <div
              className="p-6 rounded-lg font-mono text-sm"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              }}
            >
              <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
                {typedText}
                {typedText.length < fullText.length && (
                  <span className="animate-pulse">▋</span>
                )}
              </pre>
            </div>

            {/* Skip hint */}
            {showSkip && (
              <div className="text-center mt-6 text-white/50 text-sm animate-pulse">
                Press any key to enter...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Apple logo watermark */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <svg
          width="40"
          height="48"
          viewBox="0 0 16 16"
          className="opacity-20"
          fill="white"
        >
          <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
        </svg>
      </div>
    </div>
  );
}
