import { useState, useEffect } from 'react';

export function WelcomeDialog({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Fade in after a brief delay
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
        isVisible && !isClosing ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(2px)',
      }}
      onClick={handleClose}
    >
      <div
        className={`relative transition-all duration-300 ${
          isVisible && !isClosing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Welcome dialog"
      >
        {/* Tiger-style window */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            width: 420,
            background: 'linear-gradient(180deg, #e8e8e8 0%, #d4d4d4 100%)',
            boxShadow: `
              0 20px 60px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.8)
            `,
          }}
        >
          {/* Title bar */}
          <div
            className="h-[22px] flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(180deg, #e0e0e0 0%, #c8c8c8 50%, #b8b8b8 100%)',
              borderBottom: '1px solid #a0a0a0',
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute left-2 w-[13px] h-[13px] rounded-full flex items-center justify-center group"
              style={{
                background: 'linear-gradient(180deg, #ff6b5b 0%, #ff4136 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.2)',
              }}
              aria-label="Close"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-[#4a0000] leading-none">
                ×
              </span>
            </button>
            <span className="text-[11px] font-medium text-[#333]">Welcome</span>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex gap-6">
              {/* Profile Photo */}
              <div className="flex-shrink-0">
                <div
                  className="w-[100px] h-[100px] rounded-lg overflow-hidden"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(0,0,0,0.1)',
                  }}
                >
                  <img
                    src="/assets/profile.png"
                    alt="Francisco Iannolo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    className="w-full h-full items-center justify-center text-[32px] font-bold text-white hidden"
                    style={{
                      background: 'linear-gradient(145deg, #6a9fd4 0%, #3a7fc4 100%)',
                    }}
                  >
                    FI
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 pt-1">
                <h1 className="text-[18px] font-bold text-[#1a1a1a] mb-1">
                  Francisco Iannolo
                </h1>
                <p className="text-[13px] text-[#555] mb-3">
                  Senior Software Engineer
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {['15+ Years', 'HIPAA', 'Remote'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-medium text-[#555] rounded"
                      style={{
                        background: 'linear-gradient(180deg, #f5f5f5 0%, #e5e5e5 100%)',
                        border: '1px solid #c0c0c0',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-[#666] leading-relaxed">
                  Double-click desktop icons or use the Dock to explore my work.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleClose}
                className="px-6 py-1.5 text-[12px] font-medium text-white rounded"
                style={{
                  background: 'linear-gradient(180deg, #6ab4f5 0%, #3890d5 50%, #2070c0 100%)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                  border: '1px solid #2060a0',
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
