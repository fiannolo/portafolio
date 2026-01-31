import { useState } from 'react';

export function NotesApp() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Welcome!',
      content: `Thanks for visiting my portfolio!

Feel free to explore:
• About Me - Learn my background
• Resume - Download my CV
• Projects - See my work
• Contact - Get in touch

— Francisco`,
      color: 'yellow',
    },
  ]);
  const [selectedNote, setSelectedNote] = useState(0);

  const colors = {
    yellow: {
      bg: 'linear-gradient(180deg, #fff9c4 0%, #fff59d 20%, #ffee58 100%)',
      header: 'linear-gradient(180deg, #ffee58 0%, #fdd835 100%)',
      border: '#e6c200',
      text: '#5d4037',
      lines: 'rgba(93, 64, 55, 0.15)',
    },
    pink: {
      bg: 'linear-gradient(180deg, #fce4ec 0%, #f8bbd9 20%, #f48fb1 100%)',
      header: 'linear-gradient(180deg, #f48fb1 0%, #ec407a 100%)',
      border: '#c2185b',
      text: '#880e4f',
      lines: 'rgba(136, 14, 79, 0.15)',
    },
    blue: {
      bg: 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 20%, #90caf9 100%)',
      header: 'linear-gradient(180deg, #90caf9 0%, #42a5f5 100%)',
      border: '#1976d2',
      text: '#0d47a1',
      lines: 'rgba(13, 71, 161, 0.15)',
    },
    green: {
      bg: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 20%, #a5d6a7 100%)',
      header: 'linear-gradient(180deg, #a5d6a7 0%, #66bb6a 100%)',
      border: '#388e3c',
      text: '#1b5e20',
      lines: 'rgba(27, 94, 32, 0.15)',
    },
  };

  const currentNote = notes[selectedNote];
  const colorScheme = colors[currentNote?.color || 'yellow'];

  const updateNote = (content) => {
    const updated = [...notes];
    updated[selectedNote] = { ...updated[selectedNote], content };
    setNotes(updated);
  };

  return (
    <div className="h-full flex">
      {/* Notes List Sidebar */}
      <div
        className="w-[140px] flex-shrink-0 flex flex-col border-r"
        style={{
          background: 'linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 100%)',
          borderColor: '#c0c0c0',
        }}
      >
        {/* Sidebar Header */}
        <div
          className="px-3 py-2 text-[11px] font-semibold text-[#555] border-b"
          style={{
            background: 'linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)',
            borderColor: '#c0c0c0',
          }}
        >
          Notes
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-auto py-1">
          {notes.map((note, index) => (
            <button
              key={note.id}
              onClick={() => setSelectedNote(index)}
              className={`w-full px-3 py-2 text-left text-[11px] border-b ${
                selectedNote === index ? 'bg-[#d0e0f8]' : 'hover:bg-[#e8e8e8]'
              }`}
              style={{ borderColor: '#e0e0e0' }}
            >
              <div
                className="w-3 h-3 rounded-sm mb-1"
                style={{ background: colors[note.color].header }}
              />
              <div className="font-medium text-[#333] truncate">{note.title}</div>
              <div className="text-[#888] truncate text-[10px]">
                {note.content.slice(0, 30)}...
              </div>
            </button>
          ))}
        </div>

        {/* Color Picker */}
        <div
          className="px-3 py-2 border-t flex gap-2"
          style={{ borderColor: '#c0c0c0' }}
        >
          {Object.keys(colors).map((color) => (
            <button
              key={color}
              onClick={() => {
                const updated = [...notes];
                updated[selectedNote] = { ...updated[selectedNote], color };
                setNotes(updated);
              }}
              className="w-5 h-5 rounded-full border-2"
              style={{
                background: colors[color].header,
                borderColor: currentNote?.color === color ? '#333' : 'transparent',
              }}
            />
          ))}
        </div>
      </div>

      {/* Sticky Note View */}
      <div className="flex-1 flex flex-col">
        {/* Sticky Note Header - torn paper effect */}
        <div
          className="h-[28px] flex items-center px-3"
          style={{
            background: colorScheme.header,
            borderBottom: `1px solid ${colorScheme.border}`,
            boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <span
            className="text-[12px] font-semibold"
            style={{ color: colorScheme.text }}
          >
            {currentNote?.title}
          </span>
        </div>

        {/* Note Content - lined paper */}
        <div
          className="flex-1 overflow-hidden"
          style={{
            background: colorScheme.bg,
          }}
        >
          <textarea
            value={currentNote?.content || ''}
            onChange={(e) => updateNote(e.target.value)}
            className="w-full h-full resize-none px-4 py-3 text-[13px] outline-none bg-transparent"
            style={{
              lineHeight: '24px',
              color: colorScheme.text,
              fontFamily: '"Marker Felt", "Comic Sans MS", cursive, sans-serif',
              backgroundImage: `repeating-linear-gradient(
                transparent,
                transparent 23px,
                ${colorScheme.lines} 23px,
                ${colorScheme.lines} 24px
              )`,
              backgroundPosition: '0 12px',
            }}
            placeholder="Type your note here..."
          />
        </div>

        {/* Bottom shadow/fold effect */}
        <div
          className="h-[8px]"
          style={{
            background: `linear-gradient(180deg, ${colorScheme.border}40 0%, transparent 100%)`,
          }}
        />
      </div>
    </div>
  );
}
