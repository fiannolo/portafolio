import { useState, useRef, useEffect } from 'react';
import { useWindowManager } from '../../contexts/WindowManagerContext';

export function AppleMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { openWindow } = useWindowManager();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: 'About This Mac', action: () => openWindow('About', { title: 'About Me' }) },
    { type: 'separator' },
    { label: 'System Preferences...', disabled: true },
    { type: 'separator' },
    { label: 'Projects', action: () => openWindow('Projects', { title: 'Projects' }) },
    { label: 'Resume', action: () => openWindow('Resume', { title: 'Resume' }) },
    { label: 'Contact', action: () => openWindow('Contact', { title: 'Contact' }) },
    { type: 'separator' },
    { label: 'Recent Items', disabled: true, hasSubmenu: true },
    { type: 'separator' },
    { label: 'Force Quit...', disabled: true, shortcut: '⌥⌘⎋' },
    { type: 'separator' },
    { label: 'Sleep', disabled: true },
    { label: 'Restart...', disabled: true },
    { label: 'Shut Down...', disabled: true },
  ];

  return (
    <div className="relative h-full" ref={menuRef}>
      <button
        className={`h-full flex items-center justify-center transition-colors ${
          isOpen ? 'bg-[#3d6dcc]' : 'hover:bg-black/[0.06]'
        }`}
        style={{
          width: '40px',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Apple Logo - correct shape, blue color like real Tiger */}
        <svg
          width="14"
          height="17"
          viewBox="0 0 16 16"
          fill={isOpen ? '#ffffff' : '#4a9ff5'}
        >
          <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
        </svg>
      </button>

      {isOpen && (
        <div
          className="menu-dropdown absolute top-full left-0 w-[240px] rounded-md py-1 z-50"
          style={{
            marginTop: '1px',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.28), 0 0 1px rgba(0, 0, 0, 0.35)',
            border: '0.5px solid rgba(0, 0, 0, 0.2)',
          }}
        >
          {menuItems.map((item, index) =>
            item.type === 'separator' ? (
              <div
                key={index}
                className="mx-2 my-[5px]"
                style={{
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.15), transparent)',
                }}
              />
            ) : (
              <button
                key={index}
                className={`w-full px-4 py-[2px] text-left text-[13px] flex items-center justify-between ${
                  item.disabled
                    ? 'text-gray-400 cursor-default'
                    : 'text-[#1a1a1a] hover:bg-[#3d6dcc] hover:text-white'
                } group`}
                onClick={() => {
                  if (!item.disabled) {
                    item.action?.();
                    setIsOpen(false);
                  }
                }}
                disabled={item.disabled}
              >
                <span>{item.label}</span>
                <span className={`text-[12px] ml-8 tabular-nums ${
                  item.disabled ? 'text-gray-300' : 'text-gray-400 group-hover:text-white/80'
                }`}>
                  {item.shortcut}
                  {item.hasSubmenu && <span className="ml-1">▶</span>}
                </span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
