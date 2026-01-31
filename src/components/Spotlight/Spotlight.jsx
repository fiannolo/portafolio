import { useState, useEffect, useRef, useCallback } from 'react';
import { useWindowManager } from '../../contexts/WindowManagerContext';

// Virtual File System Schema for AI Agent
const VIRTUAL_FILE_SYSTEM = {
  '/': {
    type: 'directory',
    children: ['Applications', 'Users', 'System']
  },
  '/Applications': {
    type: 'directory',
    children: ['About.app', 'Resume.app', 'Projects.app', 'Contact.app', 'Notes.app', 'Calculator.app']
  },
  '/Applications/About.app': {
    type: 'application',
    appType: 'About',
    title: 'About Me',
    description: 'Personal information and bio'
  },
  '/Applications/Resume.app': {
    type: 'application',
    appType: 'Resume',
    title: 'Resume',
    description: 'Professional resume and experience'
  },
  '/Applications/Projects.app': {
    type: 'application',
    appType: 'Projects',
    title: 'Projects',
    description: 'Portfolio of work and projects'
  },
  '/Applications/Contact.app': {
    type: 'application',
    appType: 'Contact',
    title: 'Contact',
    description: 'Send a message'
  },
  '/Applications/Notes.app': {
    type: 'application',
    appType: 'Notes',
    title: 'Notes',
    description: 'Text editor'
  },
  '/Applications/Calculator.app': {
    type: 'application',
    appType: 'Calculator',
    title: 'Calculator',
    description: 'Calculator utility'
  },
  '/Users/johndoe': {
    type: 'directory',
    children: ['Documents', 'Desktop', 'Downloads']
  },
  '/Users/johndoe/Documents/resume.pdf': {
    type: 'file',
    mimeType: 'application/pdf',
    action: 'download',
    url: '/resume.pdf'
  }
};

// Command Parser - interprets natural language
const parseCommand = (input) => {
  const normalized = input.toLowerCase().trim();

  // Open commands
  const openMatches = normalized.match(/^(open|launch|start|show|run)\s+(.+)$/i);
  if (openMatches) {
    return { action: 'open', target: openMatches[2] };
  }

  // Close commands
  const closeMatches = normalized.match(/^(close|quit|exit)\s+(.+)$/i);
  if (closeMatches) {
    return { action: 'close', target: closeMatches[2] };
  }

  // Find/Search commands
  const findMatches = normalized.match(/^(find|search|where is|locate)\s+(.+)$/i);
  if (findMatches) {
    return { action: 'find', target: findMatches[2] };
  }

  // Help
  if (normalized === 'help' || normalized === '?') {
    return { action: 'help' };
  }

  // Default: search
  return { action: 'search', target: normalized };
};

// Find matching items in virtual file system
const searchFileSystem = (query) => {
  const results = [];
  const q = query.toLowerCase();

  Object.entries(VIRTUAL_FILE_SYSTEM).forEach(([path, item]) => {
    if (item.type === 'application') {
      const matchScore =
        (item.title.toLowerCase().includes(q) ? 3 : 0) +
        (item.appType.toLowerCase().includes(q) ? 2 : 0) +
        (item.description.toLowerCase().includes(q) ? 1 : 0);

      if (matchScore > 0) {
        results.push({ ...item, path, score: matchScore });
      }
    }
  });

  return results.sort((a, b) => b.score - a.score);
};

export function Spotlight({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);
  const { openWindow, closeWindow, windows } = useWindowManager();

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
      setFeedback(null);
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setFeedback(null);
      return;
    }

    const command = parseCommand(query);

    if (command.action === 'help') {
      setFeedback({
        type: 'info',
        message: 'Commands: "open [app]", "close [app]", "find [item]"'
      });
      setResults([]);
      return;
    }

    if (command.action === 'search' || command.action === 'open' || command.action === 'find') {
      const searchResults = searchFileSystem(command.target || query);
      setResults(searchResults);
      setSelectedIndex(0);
      setFeedback(null);
    }

    if (command.action === 'close') {
      const targetWindow = windows.find(w =>
        w.title.toLowerCase().includes(command.target.toLowerCase()) ||
        w.appType.toLowerCase().includes(command.target.toLowerCase())
      );
      if (targetWindow) {
        setFeedback({ type: 'action', message: `Will close ${targetWindow.title}`, window: targetWindow });
      }
      setResults([]);
    }
  }, [query, windows]);

  // Execute action
  const executeAction = useCallback((item) => {
    if (!item) return;

    if (item.type === 'application') {
      openWindow(item.appType, { title: item.title });
      onClose();
    } else if (item.type === 'file' && item.action === 'download') {
      window.open(item.url, '_blank');
      onClose();
    }
  }, [openWindow, onClose]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();

      // Check for close command
      if (feedback?.type === 'action' && feedback.window) {
        closeWindow(feedback.window.id);
        onClose();
        return;
      }

      // Execute selected result
      if (results[selectedIndex]) {
        executeAction(results[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="spotlight-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="spotlight-container">
        {/* Search Input */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#666]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Spotlight Search"
            className="spotlight-input"
          />
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`px-4 py-2 text-sm ${
            feedback.type === 'info' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
          }`}>
            {feedback.message}
            {feedback.type === 'action' && ' (Press Enter to confirm)'}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="spotlight-results">
            {results.map((item, index) => (
              <div
                key={item.path}
                className={`spotlight-result-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => executeAction(item)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.title}</div>
                  <div className={`text-xs truncate ${index === selectedIndex ? 'text-white/70' : 'text-gray-500'}`}>
                    {item.description}
                  </div>
                </div>

                {/* Type badge */}
                <div className={`text-xs px-2 py-0.5 rounded ${
                  index === selectedIndex ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {item.type}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query && results.length === 0 && !feedback && (
          <div className="px-4 py-8 text-center text-gray-500">
            <p>No results for "{query}"</p>
            <p className="text-sm mt-1">Try "open resume" or "find projects"</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Export the Virtual File System schema for external use
export { VIRTUAL_FILE_SYSTEM };
