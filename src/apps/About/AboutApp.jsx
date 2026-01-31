import { useState, useEffect } from 'react';
import { useEasterEggs, aboutDialogSecrets } from '../../hooks/useEasterEggs';

export function AboutApp() {
  const [secretIndex, setSecretIndex] = useState(-1);
  const [clickCount, setClickCount] = useState(0);
  const { handleLogoClick, easterEggActive } = useEasterEggs();
  const sidebarItems = [
    { label: 'Overview', icon: 'user' },
    { label: 'Skills', icon: 'star' },
    { label: 'Experience', icon: 'briefcase' },
    { label: 'Education', icon: 'book' },
  ];

  // Easter egg: Cycle through secret messages
  useEffect(() => {
    if (easterEggActive === 'tripleclick') {
      setSecretIndex(Math.floor(Math.random() * aboutDialogSecrets.length));
      const timer = setTimeout(() => setSecretIndex(-1), 5000);
      return () => clearTimeout(timer);
    }
  }, [easterEggActive]);

  // Handle logo click for Easter egg
  const handleProfileClick = (e) => {
    setClickCount(prev => prev + 1);
    handleLogoClick();
    
    // Show secret message on triple click
    if (clickCount >= 2) {
      setSecretIndex(Math.floor(Math.random() * aboutDialogSecrets.length));
      setClickCount(0);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Brushed Metal Toolbar */}
      <div
        className="flex items-center gap-2 px-2 py-1 border-b"
        style={{
          background: 'linear-gradient(180deg, #d8d8d8 0%, #c8c8c8 45%, #b8b8b8 50%, #c4c4c4 100%)',
          borderColor: '#888',
        }}
      >
        {/* Back/Forward */}
        <div className="flex">
          <button
            className="w-[24px] h-[22px] rounded-l flex items-center justify-center text-[#666]"
            style={{
              background: 'linear-gradient(180deg, #f0f0f0 0%, #d8d8d8 100%)',
              border: '1px solid #888',
              borderRight: 'none',
            }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="w-[24px] h-[22px] rounded-r flex items-center justify-center text-[#666]"
            style={{
              background: 'linear-gradient(180deg, #f0f0f0 0%, #d8d8d8 100%)',
              border: '1px solid #888',
            }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative flex items-center">
          <svg
            className="absolute left-[6px] w-[11px] h-[11px] text-[#666] pointer-events-none z-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="10" cy="10" r="7"/>
            <path d="M16 16l5 5"/>
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-[140px] h-[22px] rounded-full text-[11px] outline-none"
            style={{
              background: '#fff',
              border: '1px solid #999',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
              paddingLeft: '22px',
              paddingRight: '8px',
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className="w-[140px] flex-shrink-0 py-2 border-r overflow-y-auto"
          style={{
            background: 'linear-gradient(180deg, #d0dce8 0%, #b8c8d8 100%)',
            borderColor: '#98a8b8',
          }}
        >
          {sidebarItems.map((item, i) => (
            <button
              key={item.label}
              className={`w-full px-3 py-[3px] text-left text-[11px] flex items-center gap-2 ${
                i === 0 ? 'text-white' : 'text-[#1a2a3a]'
              }`}
              style={{
                background: i === 0
                  ? 'linear-gradient(180deg, #5890c8 0%, #3870a8 100%)'
                  : 'transparent',
              }}
            >
              <svg className="w-[14px] h-[14px] flex-shrink-0" viewBox="0 0 24 24" fill={i === 0 ? '#fff' : '#5080b0'}>
                {item.icon === 'user' && <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>}
                {item.icon === 'star' && <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3 1.2-6.8-5-4.9 6.9-1z"/>}
                {item.icon === 'briefcase' && <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5z"/>}
                {item.icon === 'book' && <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9 14H4V6h8v12zm10 0h-8V6h8v12z"/>}
              </svg>
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto bg-white">
          {/* Profile Card */}
          <div className="flex gap-5 mb-8">
            <div
              className="w-[72px] h-[72px] rounded-lg flex items-center justify-center text-[28px] font-bold text-white flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
              onClick={handleProfileClick}
              style={{
                background: easterEggActive 
                  ? 'linear-gradient(180deg, #ff6b6b 0%, #ff3838 100%)'
                  : 'linear-gradient(180deg, #7ab8f0 0%, #4088d0 100%)',
                boxShadow: easterEggActive
                  ? '0 0 20px rgba(255, 107, 107, 0.6), 0 2px 6px rgba(64, 136, 208, 0.4)'
                  : '0 2px 6px rgba(64, 136, 208, 0.4)',
              }}
            >
              {easterEggActive ? '🎯' : 'FI'}
            </div>
            <div className="pt-1">
              <h1 className="text-[15px] font-bold text-[#1a1a1a]">Francisco Iannolo</h1>
              <p className="text-[12px] text-[#555] mt-1">Senior Software Engineer</p>
              <p className="text-[11px] text-[#888] mt-1">Caracas, Venezuela • Remote</p>
              <div className="flex gap-5 mt-3">
                <a
                  href="https://github.com/fiannolo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#0066cc] hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/fiannolo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#0066cc] hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:fiannolo@gmail.com"
                  className="text-[11px] text-[#0066cc] hover:underline"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { label: 'Experience', value: '15+ years' },
              { label: 'Focus', value: 'Full Stack' },
              { label: 'Specialty', value: 'Healthcare/HIPAA' },
              { label: 'Remote', value: '8+ years' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded"
                style={{
                  background: 'linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)',
                  border: '1px solid #d0d0d0',
                }}
              >
                <div className="text-[10px] text-[#888] uppercase tracking-wider">{item.label}</div>
                <div className="text-[14px] font-semibold text-[#333] mt-1">{item.value}</div>
              </div>
            ))}
          </div>

          {/* About */}
          <div>
            <h2 className="text-[11px] font-semibold text-[#555] uppercase tracking-wider mb-3">About</h2>
            
            {/* Secret Message */}
            {secretIndex >= 0 && (
              <div
                className="mb-3 p-3 rounded text-[12px] text-center animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%)',
                  border: '1px solid #ffeeaa',
                  color: '#856404',
                }}
              >
                🎁 {aboutDialogSecrets[secretIndex]}
              </div>
            )}
            
            <p className="text-[13px] text-[#333] leading-[1.7] mb-3">
              Language-agnostic Senior Software Engineer with 15+ years building
              scalable solutions. Currently the technical backbone at a healthcare
              platform, covering architecture, full-stack development, DevOps, and
              team leadership. I'm the go-to person when you need answers.
            </p>
            <p className="text-[13px] text-[#333] leading-[1.7] italic">
              "The language is just the way to accomplish the goal — stable, robust,
              scalable software."
            </p>
            
            {easterEggActive && (
              <div className="mt-4 p-2 bg-black/5 rounded text-[11px] text-center text-[#666]">
                🕹️ Easter egg activated! Try clicking the logo 3 times...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="flex items-center justify-center px-3 h-[22px] text-[11px] text-[#555] border-t"
        style={{
          background: 'linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)',
          borderColor: '#b0b0b0',
        }}
      >
        4 items
      </div>
    </div>
  );
}
