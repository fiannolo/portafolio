import { useState, useEffect, useRef } from 'react';

// iPhone OS 1-6 Skeuomorphic Era - Authentic recreation
// Features: Glass dock, glossy icons, wiggle mode, slide to unlock, iPhone frame

// iPhone 2G/3G Frame Component
function IPhoneFrame({ children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-700 to-gray-900 p-4 overflow-auto">
      <div
        className="relative"
        style={{
          // iPhone 2G dimensions ratio (roughly 2:3 with bezel)
          width: 'min(380px, 95vw)',
          height: 'min(760px, 95vh)',
        }}
      >
        {/* Outer frame - Silver aluminum bezel */}
        <div
          className="absolute inset-0 rounded-[50px]"
          style={{
            background: `linear-gradient(145deg,
              #e8e8e8 0%,
              #c0c0c0 10%,
              #a8a8a8 30%,
              #d0d0d0 50%,
              #b0b0b0 70%,
              #909090 90%,
              #707070 100%)`,
            boxShadow: `
              0 0 0 2px #505050,
              0 10px 40px rgba(0,0,0,0.5),
              0 5px 20px rgba(0,0,0,0.3),
              inset 0 2px 4px rgba(255,255,255,0.5),
              inset 0 -2px 4px rgba(0,0,0,0.2)
            `,
          }}
        />

        {/* Inner black bezel */}
        <div
          className="absolute rounded-[44px]"
          style={{
            top: 8,
            left: 8,
            right: 8,
            bottom: 8,
            background: `linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, #000 100%)`,
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8)',
          }}
        />

        {/* Top speaker grille */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 28,
            width: 60,
            height: 6,
            borderRadius: 3,
            background: 'linear-gradient(180deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
          }}
        >
          {/* Speaker holes */}
          <div className="flex justify-center items-center h-full gap-[3px] px-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-[2px] h-[2px] rounded-full bg-gray-800"
              />
            ))}
          </div>
        </div>

        {/* Home button */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: 18,
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: `linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)`,
            boxShadow: `
              0 1px 2px rgba(255,255,255,0.1),
              inset 0 2px 4px rgba(0,0,0,0.8),
              inset 0 -1px 2px rgba(255,255,255,0.05)
            `,
            border: '1px solid #333',
          }}
        >
          {/* Square icon on home button */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              border: '2px solid #444',
            }}
          />
        </div>

        {/* Screen area */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: 55,
            left: 18,
            right: 18,
            bottom: 85,
            borderRadius: 4,
            background: '#000',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
          }}
        >
          {/* Screen reflection overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-50"
            style={{
              background: `linear-gradient(135deg,
                rgba(255,255,255,0.1) 0%,
                transparent 40%,
                transparent 100%)`,
            }}
          />
          {children}
        </div>

        {/* Side buttons - Volume */}
        <div
          className="absolute"
          style={{
            left: -3,
            top: 120,
            width: 4,
            height: 30,
            borderRadius: '2px 0 0 2px',
            background: 'linear-gradient(90deg, #808080 0%, #a0a0a0 50%, #909090 100%)',
            boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
          }}
        />
        <div
          className="absolute"
          style={{
            left: -3,
            top: 160,
            width: 4,
            height: 30,
            borderRadius: '2px 0 0 2px',
            background: 'linear-gradient(90deg, #808080 0%, #a0a0a0 50%, #909090 100%)',
            boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
          }}
        />

        {/* Silent switch */}
        <div
          className="absolute"
          style={{
            left: -3,
            top: 85,
            width: 4,
            height: 16,
            borderRadius: '2px 0 0 2px',
            background: 'linear-gradient(90deg, #808080 0%, #a0a0a0 50%, #909090 100%)',
            boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
          }}
        />

        {/* Power button */}
        <div
          className="absolute"
          style={{
            top: -3,
            right: 60,
            height: 4,
            width: 50,
            borderRadius: '2px 2px 0 0',
            background: 'linear-gradient(180deg, #808080 0%, #a0a0a0 50%, #909090 100%)',
            boxShadow: '0 -1px 2px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </div>
  );
}

export function MobileView() {
  const [isLocked, setIsLocked] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [slidePosition, setSlidePosition] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [wiggleMode, setWiggleMode] = useState(false);
  const [launchingApp, setLaunchingApp] = useState(null);
  const [appPosition, setAppPosition] = useState({ x: 0, y: 0 });
  const longPressTimer = useRef(null);
  const slideRef = useRef(null);

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Home screen apps - 4x4 grid with authentic iOS gradients
  const apps = [
    { id: 'about', label: 'About', icon: 'person', gradient: ['#A5D6A7', '#43A047'] }, // Contacts green
    { id: 'resume', label: 'Resume', icon: 'doc', gradient: ['#FFAB91', '#E64A19'] }, // Orange/red
    { id: 'projects', label: 'Projects', icon: 'folder', gradient: ['#90CAF9', '#1976D2'] }, // Blue folder
    { id: 'contact', label: 'Contact', icon: 'envelope', gradient: ['#42A5F5', '#1565C0'] }, // Mail blue
    { id: 'github', label: 'GitHub', icon: 'github', gradient: ['#616161', '#212121'], external: 'https://github.com/fiannolo' }, // Dark
    { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', gradient: ['#29B6F6', '#0277BD'], external: 'https://linkedin.com/in/fiannolo' }, // LinkedIn blue
    { id: 'notes', label: 'Notes', icon: 'note', gradient: ['#FFF59D', '#F9A825'] }, // Yellow notepad
    { id: 'settings', label: 'Settings', icon: 'gear', gradient: ['#B0BEC5', '#546E7A'] }, // Gray settings
  ];

  // Dock apps - Original iPhone colors
  const dockApps = [
    { id: 'phone', label: 'Phone', icon: 'phone', gradient: ['#8BC34A', '#388E3C'] }, // Green
    { id: 'mail', label: 'Mail', icon: 'envelope', gradient: ['#42A5F5', '#1565C0'] }, // Blue
    { id: 'safari', label: 'Safari', icon: 'compass', gradient: ['#42A5F5', '#1976D2'] }, // Blue
    { id: 'ipod', label: 'iPod', icon: 'music', gradient: ['#FF7043', '#E64A19'] }, // Orange
  ];

  // Handle slide to unlock
  const handleSlideStart = (e) => {
    setIsSliding(true);
    const startX = e.touches ? e.touches[0].clientX : e.clientX;
    const sliderWidth = slideRef.current?.offsetWidth || 200;

    const handleMove = (moveE) => {
      const currentX = moveE.touches ? moveE.touches[0].clientX : moveE.clientX;
      const delta = currentX - startX;
      const percent = Math.min(Math.max(delta / (sliderWidth - 60), 0), 1);
      setSlidePosition(percent * 100);

      if (percent >= 0.9) {
        setIsLocked(false);
        cleanup();
      }
    };

    const handleEnd = () => {
      setSlidePosition(0);
      setIsSliding(false);
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
  };

  // Long press for wiggle mode
  const handleLongPressStart = () => {
    longPressTimer.current = setTimeout(() => {
      setWiggleMode(true);
    }, 500);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  // Handle app click with zoom animation
  const handleAppClick = (app, e) => {
    if (wiggleMode) {
      setWiggleMode(false);
      return;
    }

    if (app.external) {
      window.open(app.external, '_blank');
      return;
    }

    if (['about', 'resume', 'projects', 'contact'].includes(app.id)) {
      const rect = e.currentTarget.getBoundingClientRect();
      setAppPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      setLaunchingApp(app.id);

      setTimeout(() => {
        setCurrentScreen(app.id);
        setLaunchingApp(null);
      }, 300);
    }
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  // Authentic iOS Skeuomorphic Icons - recreated as SVG
  const renderIcon = (iconType, size = 28) => {
    const s = size;

    // Each icon is designed to look like the original iPhone icons
    const icons = {
      // Phone icon - classic green with white handset
      phone: (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <defs>
            <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8BC34A"/>
              <stop offset="100%" stopColor="#4CAF50"/>
            </linearGradient>
          </defs>
          <path fill="white" d="M42 38.5c-2.2 0-4.3-.4-6.3-1.1-.6-.2-1.3-.1-1.8.4l-4 4c-5.8-3-10.6-7.8-13.6-13.6l4-4c.5-.5.6-1.2.4-1.8-.7-2-1.1-4.1-1.1-6.3 0-1-.8-1.8-1.8-1.8h-6c-1 0-1.8.8-1.8 1.8 0 18.8 15.3 34.1 34.1 34.1 1 0 1.8-.8 1.8-1.8v-6c-.1-1.1-.9-1.9-1.9-1.9z"/>
        </svg>
      ),

      // Mail icon - blue with white envelope
      envelope: (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <rect x="8" y="15" width="44" height="32" rx="3" fill="white"/>
          <path d="M8 18l22 14 22-14" fill="none" stroke="white" strokeWidth="2"/>
          <polygon points="8,15 30,33 52,15" fill="#E3F2FD"/>
          <path d="M8 18l22 14 22-14" fill="none" stroke="#90CAF9" strokeWidth="1"/>
        </svg>
      ),

      // Safari compass - blue and white with red needle
      compass: (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="26" fill="white" stroke="#E0E0E0" strokeWidth="1"/>
          <circle cx="30" cy="30" r="22" fill="white"/>
          {/* Compass needle */}
          <polygon points="30,8 34,30 30,34 26,30" fill="#FF3B30"/>
          <polygon points="30,52 34,30 30,26 26,30" fill="#E0E0E0"/>
          {/* Cardinal points */}
          <text x="30" y="13" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#333">N</text>
          <text x="30" y="53" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#333">S</text>
          <text x="10" y="33" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#333">W</text>
          <text x="50" y="33" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#333">E</text>
          <circle cx="30" cy="30" r="3" fill="#333"/>
        </svg>
      ),

      // iPod/Music icon - orange with music notes
      music: (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <ellipse cx="18" cy="44" rx="8" ry="6" fill="white"/>
          <ellipse cx="42" cy="40" rx="8" ry="6" fill="white"/>
          <rect x="24" y="12" width="4" height="32" fill="white"/>
          <rect x="48" y="8" width="4" height="32" fill="white"/>
          <rect x="24" y="8" width="28" height="6" fill="white"/>
        </svg>
      ),

      // Person/Contacts icon - silhouette style
      person: (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <circle cx="30" cy="18" r="12" fill="white"/>
          <ellipse cx="30" cy="52" rx="20" ry="14" fill="white"/>
        </svg>
      ),

      // Document icon - white paper with lines
      doc: (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <path d="M15 6 L15 54 L45 54 L45 18 L33 6 Z" fill="white"/>
          <path d="M33 6 L33 18 L45 18" fill="#E0E0E0" stroke="#CCC" strokeWidth="1"/>
          <line x1="20" y1="26" x2="40" y2="26" stroke="#DDD" strokeWidth="2"/>
          <line x1="20" y1="34" x2="40" y2="34" stroke="#DDD" strokeWidth="2"/>
          <line x1="20" y1="42" x2="35" y2="42" stroke="#DDD" strokeWidth="2"/>
        </svg>
      ),

      // Folder icon
      folder: (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <path d="M6 16 L6 48 Q6 52 10 52 L50 52 Q54 52 54 48 L54 22 Q54 18 50 18 L28 18 L24 12 L10 12 Q6 12 6 16 Z" fill="white"/>
          <path d="M6 22 L54 22" stroke="#E0E0E0" strokeWidth="1"/>
        </svg>
      ),

      // GitHub - Octocat simplified
      github: (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <path fill="white" d="M30 6C16.7 6 6 16.7 6 30c0 10.6 6.9 19.6 16.4 22.8 1.2.2 1.6-.5 1.6-1.2v-4.2c-6.7 1.5-8.1-3.2-8.1-3.2-1.1-2.8-2.7-3.5-2.7-3.5-2.2-1.5.2-1.5.2-1.5 2.4.2 3.7 2.5 3.7 2.5 2.1 3.6 5.6 2.6 7 2 .2-1.6.8-2.6 1.5-3.2-5.3-.6-10.9-2.7-10.9-11.8 0-2.6.9-4.7 2.5-6.4-.2-.6-1.1-3 .2-6.4 0 0 2-.6 6.6 2.5 1.9-.5 4-.8 6-.8s4.1.3 6 .8c4.6-3.1 6.6-2.5 6.6-2.5 1.3 3.3.5 5.7.2 6.4 1.5 1.7 2.5 3.8 2.5 6.4 0 9.1-5.5 11.1-10.8 11.7.9.7 1.6 2.2 1.6 4.5v6.6c0 .6.4 1.4 1.6 1.2C47.1 49.6 54 40.6 54 30c0-13.3-10.7-24-24-24z"/>
        </svg>
      ),

      // LinkedIn
      linkedin: (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <rect x="8" y="8" width="44" height="44" rx="6" fill="white"/>
          <path fill="#0077B5" d="M18 24h6v20h-6V24zm3-10c2 0 3.5 1.5 3.5 3.5S23 21 21 21s-3.5-1.5-3.5-3.5S19 14 21 14zm9 10h6v3c1-2 4-3 6-3 6 0 7 4 7 9v11h-6V34c0-2-1-4-3-4s-4 1-4 4v10h-6V24z"/>
        </svg>
      ),

      // Notes - yellow legal pad style
      note: (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <rect x="8" y="6" width="44" height="48" fill="white" rx="2"/>
          <rect x="8" y="6" width="44" height="8" fill="#FFEB3B"/>
          <line x1="14" y1="22" x2="46" y2="22" stroke="#E3F2FD" strokeWidth="1"/>
          <line x1="14" y1="30" x2="46" y2="30" stroke="#E3F2FD" strokeWidth="1"/>
          <line x1="14" y1="38" x2="46" y2="38" stroke="#E3F2FD" strokeWidth="1"/>
          <line x1="14" y1="46" x2="46" y2="46" stroke="#E3F2FD" strokeWidth="1"/>
          <line x1="16" y1="14" x2="16" y2="54" stroke="#FFCDD2" strokeWidth="1"/>
        </svg>
      ),

      // Settings gear - detailed
      gear: (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <path fill="white" d="M30 6l4 6 7-2 2 7 7 0 0 7-6 4 2 7-6 4 0 7-7 0-4 6-4-6-7 0 0-7-6-4 2-7-6-4 0-7 7 0 2-7 7 2 4-6z"/>
          <circle cx="30" cy="30" r="10" fill="#8E8E93"/>
          <circle cx="30" cy="30" r="7" fill="#636366"/>
        </svg>
      ),
    };

    return icons[iconType] || null;
  };

  // Glossy App Icon Component - iOS Squircle style
  const AppIcon = ({ app, size = 60, onClick, showReflection = false, isWiggling = false }) => {
    const borderRadius = Math.round(size * 0.22); // iOS squircle ratio ~22%

    return (
      <button
        onClick={onClick}
        onMouseDown={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
        onMouseLeave={handleLongPressEnd}
        onTouchStart={handleLongPressStart}
        onTouchEnd={handleLongPressEnd}
        className={`flex flex-col items-center ${isWiggling ? 'wiggle' : ''}`}
        style={{ animation: isWiggling ? `wiggle 0.15s ease-in-out infinite alternate` : 'none' }}
      >
        <div className="relative">
          {/* Main Icon */}
          <div
            style={{
              width: size,
              height: size,
              borderRadius: borderRadius,
              position: 'relative',
              overflow: 'hidden',
              background: `linear-gradient(145deg, ${app.gradient[0]} 0%, ${app.gradient[1]} 100%)`,
              boxShadow: `
                0 2px 4px rgba(0,0,0,0.4),
                0 4px 8px rgba(0,0,0,0.2),
                inset 0 1px 1px rgba(255,255,255,0.3)
              `,
            }}
          >
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {renderIcon(app.icon, size * 0.5)}
            </div>

            {/* GLOSSY OVERLAY - The signature iPhone shine */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '55%',
                background: `linear-gradient(180deg,
                  rgba(255,255,255,0.8) 0%,
                  rgba(255,255,255,0.6) 30%,
                  rgba(255,255,255,0.3) 60%,
                  rgba(255,255,255,0) 100%)`,
                borderRadius: `${borderRadius}px ${borderRadius}px 40% 40%`,
                pointerEvents: 'none',
              }}
            />

            {/* Edge highlight */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: borderRadius,
                border: '1px solid rgba(255,255,255,0.3)',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Reflection for dock */}
          {showReflection && (
            <div
              style={{
                width: size,
                height: size * 0.6,
                marginTop: 2,
                background: `linear-gradient(145deg, ${app.gradient[0]} 0%, ${app.gradient[1]} 100%)`,
                borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
                transform: 'scaleY(-1) perspective(100px) rotateX(30deg)',
                opacity: 0.4,
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)',
                filter: 'blur(1px)',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Delete badge in wiggle mode */}
          {isWiggling && (
            <div
              style={{
                position: 'absolute',
                top: -6,
                left: -6,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'linear-gradient(180deg, #FF6B6B 0%, #FF3B30 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 'bold',
                color: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
              }}
            >
              ×
            </div>
          )}
        </div>

        <span
          style={{
            marginTop: showReflection ? 0 : 6,
            fontSize: 11,
            fontWeight: 500,
            color: 'white',
            textShadow: '0 1px 3px rgba(0,0,0,1)',
            fontFamily: 'Helvetica, Arial, sans-serif',
          }}
        >
          {app.label}
        </span>
      </button>
    );
  };

  // Status Bar Component
  const StatusBar = ({ dark = false }) => (
    <div
      className="flex items-center justify-between px-3 h-5 text-white text-[12px] font-semibold flex-shrink-0"
      style={{
        background: dark
          ? 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%)'
          : 'linear-gradient(180deg, #3A4A5A 0%, #2A3A4A 50%, #1A2A3A 100%)',
      }}
    >
      {/* Signal + Carrier */}
      <div className="flex items-center gap-1 w-24">
        <div className="flex items-end gap-[1px]">
          {[1, 2, 3, 4, 5].map((bar) => (
            <div
              key={bar}
              style={{
                width: 3,
                height: 2 + bar * 2,
                borderRadius: 1,
                background: bar <= 4 ? 'white' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
        <span className="ml-1 text-[11px]">Portfolio</span>
      </div>

      {/* Time */}
      <span className="font-bold">
        {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
      </span>

      {/* Battery */}
      <div className="flex items-center w-24 justify-end">
        <div
          style={{
            width: 22,
            height: 10,
            border: '1px solid white',
            borderRadius: 2,
            padding: 1,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, #4CD964 0%, #34C759 100%)',
              borderRadius: 1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -3,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 2,
              height: 5,
              background: 'white',
              borderRadius: '0 1px 1px 0',
            }}
          />
        </div>
      </div>
    </div>
  );

  // Render app content
  const renderContent = () => {
    const contentBg = '#C5CCD4';

    const contentMap = {
      about: (
        <div className="min-h-full" style={{ background: contentBg }}>
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 text-center border-b border-gray-200">
                <div
                  className="w-20 h-20 mx-auto mb-3 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                  style={{ background: `linear-gradient(145deg, ${apps[0].gradient[0]}, ${apps[0].gradient[1]})` }}
                >
                  FI
                </div>
                <h2 className="text-lg font-bold text-gray-900">Franco Iannolo</h2>
                <p className="text-sm text-gray-500">Full Stack Developer</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Ciao! I craft beautiful, functional digital experiences with React, Node.js, and modern web technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      resume: (
        <div className="min-h-full" style={{ background: contentBg }}>
          <div className="p-4 space-y-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase px-2">Experience</h3>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                { role: 'Senior Developer', company: 'Tech Co.', period: '2022+' },
                { role: 'Full Stack Dev', company: 'Startup', period: '2019-22' },
              ].map((job, i, arr) => (
                <div key={i} className={`px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="font-semibold text-sm">{job.role}</div>
                  <div className="text-xs text-blue-600">{job.company}</div>
                  <div className="text-xs text-gray-500">{job.period}</div>
                </div>
              ))}
            </div>
            <a
              href="/resume.pdf"
              download
              className="block w-full py-3 text-center text-white font-semibold rounded-lg"
              style={{
                background: 'linear-gradient(180deg, #4CD964 0%, #34C759 50%, #248A3D 100%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              Download Resume
            </a>
          </div>
        </div>
      ),
      projects: (
        <div className="min-h-full" style={{ background: contentBg }}>
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                { title: 'Portfolio Site', desc: 'Mac OS X themed', tech: 'React' },
                { title: 'E-Commerce', desc: 'Online store', tech: 'Next.js' },
                { title: 'Task Manager', desc: 'Productivity app', tech: 'React Native' },
              ].map((p, i, arr) => (
                <div key={i} className={`px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="font-semibold text-sm">{p.title}</div>
                  <div className="text-xs text-gray-500">{p.desc}</div>
                  <div className="text-xs text-blue-600 mt-1">{p.tech}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      contact: (
        <div className="min-h-full" style={{ background: contentBg }}>
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                { label: 'Email', value: 'fiannolo@gmail.com', href: 'mailto:fiannolo@gmail.com' },
                { label: 'GitHub', value: '@fiannolo', href: 'https://github.com/fiannolo' },
                { label: 'LinkedIn', value: 'fiannolo', href: 'https://linkedin.com/in/fiannolo' },
              ].map((c, i, arr) => (
                <a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`block px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="text-sm text-gray-900">{c.label}</div>
                  <div className="text-sm text-blue-600">{c.value}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      ),
    };

    return contentMap[currentScreen] || null;
  };

  // Lock Screen - Authentic iOS style
  if (isLocked) {
    return (
      <IPhoneFrame>
        <div
          className="h-full w-full flex flex-col overflow-hidden"
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
          }}
        >
        {/* Status Bar - Lock screen style */}
        <div
          className="flex items-center justify-between px-2 h-5 text-white text-[12px] font-medium flex-shrink-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
          }}
        >
          {/* Signal + Carrier */}
          <div className="flex items-center gap-1">
            <div className="flex items-end gap-[1px]">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  style={{
                    width: 2,
                    height: 2 + bar * 2,
                    borderRadius: 0.5,
                    background: bar <= 4 ? 'white' : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
            <span className="ml-1 text-[11px]">Portfolio</span>
            {/* WiFi icon */}
            <svg width="12" height="10" viewBox="0 0 16 12" fill="white" className="ml-1">
              <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
              <path d="M8 6c1.7 0 3.2.7 4.3 1.8l-1.4 1.4C10.1 8.4 9.1 8 8 8s-2.1.4-2.9 1.2L3.7 7.8C4.8 6.7 6.3 6 8 6z" opacity="0.9"/>
              <path d="M8 2.5c2.8 0 5.4 1.1 7.3 3l-1.4 1.4C12.3 5.3 10.2 4.5 8 4.5S3.7 5.3 2.1 6.9L.7 5.5C2.6 3.6 5.2 2.5 8 2.5z" opacity="0.7"/>
            </svg>
          </div>

          {/* Lock icon */}
          <svg width="8" height="12" viewBox="0 0 10 14" fill="white">
            <rect x="0" y="5" width="10" height="9" rx="2"/>
            <path d="M2 5V4a3 3 0 116 0v1" fill="none" stroke="white" strokeWidth="1.5"/>
          </svg>

          {/* Battery */}
          <div className="flex items-center gap-1">
            <span className="text-[10px]">100%</span>
            <div style={{ width: 20, height: 9, border: '1px solid white', borderRadius: 2, padding: 1, position: 'relative' }}>
              <div style={{ width: '100%', height: '100%', background: '#4CD964', borderRadius: 1 }} />
              <div style={{ position: 'absolute', right: -3, top: '50%', transform: 'translateY(-50%)', width: 2, height: 4, background: 'white', borderRadius: '0 1px 1px 0' }} />
            </div>
          </div>
        </div>

        {/* Time/Date Header - Dark gradient */}
        <div
          style={{
            background: 'linear-gradient(180deg, #2c3e50 0%, #3a5068 50%, #4a6278 100%)',
            padding: '20px 0 25px 0',
            textAlign: 'center',
            borderBottom: '1px solid rgba(0,0,0,0.3)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 200,
              color: 'white',
              letterSpacing: -2,
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              lineHeight: 1,
            }}
          >
            {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).replace(' AM', '').replace(' PM', '')}
          </div>
          <div
            style={{
              fontSize: 18,
              color: 'white',
              marginTop: 4,
              fontWeight: 400,
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Linen texture background */}
        <div
          className="flex-1"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(0,0,0,0.03) 1px,
                rgba(0,0,0,0.03) 2px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 1px,
                rgba(0,0,0,0.03) 1px,
                rgba(0,0,0,0.03) 2px
              ),
              linear-gradient(180deg, #7BA3C4 0%, #8FAEC4 50%, #A5C0D4 100%)
            `,
          }}
        />

        {/* Bottom area with slide to unlock */}
        <div
          style={{
            background: 'linear-gradient(180deg, #4a5a68 0%, #3a4854 50%, #2a3844 100%)',
            padding: '15px 20px 20px 20px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Slide to unlock track */}
          <div
            ref={slideRef}
            className="relative overflow-hidden"
            style={{
              height: 52,
              borderRadius: 26,
              background: 'linear-gradient(180deg, #1a2530 0%, #2a3540 50%, #1a2530 100%)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(255,255,255,0.1)',
              border: '1px solid rgba(0,0,0,0.4)',
            }}
          >
            {/* Text with shimmer */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ paddingLeft: 60 }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  letterSpacing: 0.5,
                  background: 'linear-gradient(90deg, #666 0%, #666 35%, #fff 50%, #666 65%, #666 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 2.5s ease-in-out infinite',
                }}
              >
                slide to unlock
              </span>
            </div>

            {/* Arrow button */}
            <div
              className="absolute top-1 bottom-1 left-1 flex items-center justify-center cursor-grab active:cursor-grabbing"
              style={{
                width: 46,
                borderRadius: 23,
                background: 'linear-gradient(180deg, #fefefe 0%, #e8e8e8 50%, #d0d0d0 100%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.8)',
                transform: `translateX(${(slidePosition / 100) * (slideRef.current?.offsetWidth - 56 || 200)}px)`,
                transition: isSliding ? 'none' : 'transform 0.3s ease-out',
              }}
              onMouseDown={handleSlideStart}
              onTouchStart={handleSlideStart}
            >
              {/* Arrow icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="#4a5a6a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            0%, 100% { background-position: 200% center; }
            50% { background-position: -200% center; }
          }
        `}</style>
        </div>
      </IPhoneFrame>
    );
  }

  // Home Screen
  return (
    <IPhoneFrame>
      <div
        className="h-full w-full flex flex-col overflow-hidden"
        style={{
          background: '#000',
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
        onClick={() => wiggleMode && setWiggleMode(false)}
      >
      <StatusBar />

      {currentScreen === 'home' ? (
        <>
          {/* App Grid */}
          <div className="flex-1 px-4 pt-6 pb-2 overflow-hidden">
            <div className="grid grid-cols-4 gap-x-3 gap-y-4 justify-items-center">
              {apps.map((app) => (
                <AppIcon
                  key={app.id}
                  app={app}
                  size={58}
                  isWiggling={wiggleMode}
                  onClick={(e) => handleAppClick(app, e)}
                />
              ))}
            </div>
          </div>

          {/* Page dots */}
          <div className="flex justify-center gap-2 py-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white/30" />
          </div>

          {/* 3D Glass Dock */}
          <div className="px-2 pb-2 flex-shrink-0">
            <div
              style={{
                background: `linear-gradient(180deg,
                  rgba(255,255,255,0.6) 0%,
                  rgba(255,255,255,0.3) 3%,
                  rgba(120,140,160,0.5) 6%,
                  rgba(80,100,120,0.6) 50%,
                  rgba(40,60,80,0.7) 100%)`,
                borderRadius: 16,
                padding: '8px 12px 4px 12px',
                border: '1px solid rgba(255,255,255,0.5)',
                borderBottom: '1px solid rgba(0,0,0,0.3)',
                boxShadow: `
                  inset 0 2px 3px rgba(255,255,255,0.5),
                  inset 0 -2px 6px rgba(0,0,0,0.2),
                  0 -2px 10px rgba(0,0,0,0.4)
                `,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transform: 'perspective(500px) rotateX(2deg)',
                transformOrigin: 'bottom center',
              }}
            >
              <div className="flex justify-around items-end">
                {dockApps.map((app) => (
                  <AppIcon
                    key={app.id}
                    app={app}
                    size={50}
                    showReflection
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* App Navigation Bar */}
          <div
            className="flex items-center h-11 px-2 flex-shrink-0"
            style={{
              background: `linear-gradient(180deg,
                #B0C4DE 0%, #8FA4BE 30%, #6688AA 50%, #5A7A9A 100%)`,
              borderBottom: '1px solid #4A6A8A',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <button
              onClick={handleBack}
              className="flex items-center px-3 py-1 rounded text-white text-sm font-semibold"
              style={{
                background: 'linear-gradient(180deg, #6A8AAA 0%, #4A6A8A 50%, #3A5A7A 100%)',
                border: '1px solid #2A4A6A',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              ‹ Home
            </button>
            <h1 className="flex-1 text-center font-bold text-white" style={{ textShadow: '0 1px 0 rgba(0,0,0,0.3)' }}>
              {apps.find((a) => a.id === currentScreen)?.label}
            </h1>
            <div className="w-16" />
          </div>

          <div className="flex-1 overflow-auto">
            {renderContent()}
          </div>
        </>
      )}

      {/* App launch animation overlay */}
      {launchingApp && (
        <div
          className="fixed inset-0 bg-white z-50"
          style={{
            animation: 'zoomIn 0.3s ease-out forwards',
            transformOrigin: `${appPosition.x}px ${appPosition.y}px`,
          }}
        />
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes wiggle {
          0% { transform: rotate(-2deg); }
          100% { transform: rotate(2deg); }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      </div>
    </IPhoneFrame>
  );
}
