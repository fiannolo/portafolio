import { useState } from 'react';

export function NotesApp() {
  const [content, setContent] = useState(`Welcome to Notes!

This is a simple text editor. You can:
• Write notes and reminders
• Draft messages
• Keep track of ideas

Feel free to edit this text.`);

  return (
    <div className="h-full flex flex-col">
      {/* Notepad Toolbar */}
      <div
        className="flex items-center gap-3 px-3 py-1 border-b"
        style={{
          background: 'linear-gradient(180deg, #f5f0e0 0%, #e8dcc0 45%, #dcd0b0 50%, #e4d8c0 100%)',
          borderColor: '#b8a880',
        }}
      >
        <button
          className="px-3 py-[2px] text-[11px] text-[#5a4830] rounded font-medium"
          style={{
            background: 'linear-gradient(180deg, #fff 0%, #f0e8d8 100%)',
            border: '1px solid #c0b090',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
          onClick={() => setContent('')}
        >
          Clear
        </button>
        <button
          className="px-3 py-[2px] text-[11px] text-[#5a4830] rounded font-medium"
          style={{
            background: 'linear-gradient(180deg, #fff 0%, #f0e8d8 100%)',
            border: '1px solid #c0b090',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
          onClick={() => navigator.clipboard.writeText(content)}
        >
          Copy
        </button>
        <div className="flex-1" />
        <span className="text-[10px] text-[#8a7860]">
          {content.length} chars
        </span>
      </div>

      {/* Notepad Content */}
      <div
        className="flex-1 overflow-hidden"
        style={{ background: '#fffef5' }}
      >
        <div
          className="h-full px-5 py-4 overflow-auto"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, #e8dcc0 23px, #e8dcc0 24px)',
            backgroundPosition: '0 11px',
          }}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full resize-none text-[13px] outline-none bg-transparent"
            style={{
              lineHeight: '24px',
              color: '#2a2820',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "SF Pro Text", sans-serif',
            }}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="flex items-center justify-center px-3 h-[20px] text-[11px] text-[#8a7860] border-t"
        style={{
          background: 'linear-gradient(180deg, #f0e8d8 0%, #e4d8c8 100%)',
          borderColor: '#c8b898',
        }}
      >
        Plain Text
      </div>
    </div>
  );
}
