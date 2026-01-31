import { projects } from '../../data/projects';

export function ProjectsApp() {
  const categories = ['All Projects', 'Web Apps', 'Mobile', 'Open Source'];

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

        {/* View Mode Buttons */}
        <div className="flex">
          {['icons', 'list', 'columns'].map((mode, i) => (
            <button
              key={mode}
              className={`w-[26px] h-[22px] flex items-center justify-center ${
                i === 0 ? 'rounded-l' : i === 2 ? 'rounded-r' : ''
              }`}
              style={{
                background: i === 0
                  ? 'linear-gradient(180deg, #a8c8f0 0%, #6898d0 100%)'
                  : 'linear-gradient(180deg, #f0f0f0 0%, #d8d8d8 100%)',
                border: '1px solid #888',
                borderLeft: i > 0 ? 'none' : undefined,
              }}
            >
              {mode === 'icons' && (
                <svg className="w-[14px] h-[14px]" viewBox="0 0 16 16" fill={i === 0 ? '#fff' : '#555'}>
                  <rect x="1" y="1" width="6" height="6" rx="1"/>
                  <rect x="9" y="1" width="6" height="6" rx="1"/>
                  <rect x="1" y="9" width="6" height="6" rx="1"/>
                  <rect x="9" y="9" width="6" height="6" rx="1"/>
                </svg>
              )}
              {mode === 'list' && (
                <svg className="w-[14px] h-[14px]" viewBox="0 0 16 16" fill="#555">
                  <rect x="1" y="2" width="14" height="2" rx="0.5"/>
                  <rect x="1" y="7" width="14" height="2" rx="0.5"/>
                  <rect x="1" y="12" width="14" height="2" rx="0.5"/>
                </svg>
              )}
              {mode === 'columns' && (
                <svg className="w-[14px] h-[14px]" viewBox="0 0 16 16" fill="#555">
                  <rect x="1" y="1" width="4" height="14" rx="0.5"/>
                  <rect x="6" y="1" width="4" height="14" rx="0.5"/>
                  <rect x="11" y="1" width="4" height="14" rx="0.5"/>
                </svg>
              )}
            </button>
          ))}
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
          {categories.map((item, i) => (
            <button
              key={item}
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
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
              </svg>
              {item}
            </button>
          ))}
        </div>

        {/* Icon Grid */}
        <div className="flex-1 p-4 overflow-auto bg-white">
          <div className="grid grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col items-center p-2 rounded hover:bg-[#d0e0f8] cursor-pointer"
              >
                {/* Folder Icon */}
                <div className="w-[64px] h-[52px] mb-1 flex items-center justify-center">
                  <svg viewBox="0 0 64 52" className="w-full h-full">
                    <defs>
                      <linearGradient id="folderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a8d4f8"/>
                        <stop offset="50%" stopColor="#68a8e8"/>
                        <stop offset="100%" stopColor="#4888d0"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M2 10 L2 46 C2 48 4 50 6 50 L58 50 C60 50 62 48 62 46 L62 14 C62 12 60 10 58 10 L28 10 L24 4 L6 4 C4 4 2 6 2 8 Z"
                      fill="url(#folderGrad)"
                      stroke="#3878b8"
                      strokeWidth="1"
                    />
                    <path
                      d="M6 14 L58 14 L58 18 L6 18 Z"
                      fill="rgba(255,255,255,0.3)"
                    />
                  </svg>
                </div>
                {/* Label */}
                <span className="text-[11px] text-center text-[#1a1a1a] leading-tight max-w-[80px]">
                  {project.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="flex items-center justify-center px-3 h-[20px] text-[11px] text-[#555] border-t"
        style={{
          background: 'linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)',
          borderColor: '#b0b0b0',
        }}
      >
        {projects.length} items
      </div>
    </div>
  );
}
