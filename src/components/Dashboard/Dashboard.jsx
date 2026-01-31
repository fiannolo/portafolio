import { useState, useEffect } from 'react';
import { StickyNoteWidget } from './widgets/StickyNoteWidget';
import { GPUTempWidget } from './widgets/GPUTempWidget';
import { GitHubWidget } from './widgets/GitHubWidget';
import { ClockWidget } from './widgets/ClockWidget';
import { QuoteWidget } from './widgets/QuoteWidget';

export function Dashboard({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9998] transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Dashboard Header */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
        Dashboard — Press F4 or click anywhere to close
      </div>

      {/* Widgets Container */}
      <div className="h-full pt-16 pb-20 px-8 overflow-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 auto-rows-min">
          {/* Row 1 */}
          <ClockWidget />
          <GPUTempWidget />
          <QuoteWidget />

          {/* Row 2 */}
          <div className="col-span-2">
            <GitHubWidget />
          </div>
          <StickyNoteWidget />
        </div>
      </div>

      {/* Close hint ripple effect */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-12 h-12 rounded-full bg-white/10 animate-ping" />
      </div>
    </div>
  );
}
