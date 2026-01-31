import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../../contexts/WindowManagerContext';
import { useSound } from '../../hooks/useSound';

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
  const [searchHistory, setSearchHistory] = useState([]);
  const inputRef = useRef(null);
  const { openWindow, closeWindow, windows } = useWindowManager();
  const { play } = useSound();

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
      setFeedback(null);
      play('pop');
    }
  }, [isOpen, play]);

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

    // Add to search history
    if (query && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
    }

    if (item.type === 'application') {
      play('click');
      openWindow(item.appType, { title: item.title });
      onClose();
    } else if (item.type === 'file' && item.action === 'download') {
      play('click');
      window.open(item.url, '_blank');
      onClose();
    }
  }, [openWindow, onClose, query, searchHistory, play]);

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="spotlight-overlay"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.25, type: "spring" }}
            className="spotlight-container"
          >
            {/* Search Input */}
            <div className="relative">
              <motion.svg
                animate={{ rotate: query ? [0, 10, -10, 0] : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#666]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </motion.svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Spotlight Search (Cmd+Space)"
                className="spotlight-input"
              />
            </div>

            {/* Search History */}
            {!query && searchHistory.length > 0 && (
              <div className="px-4 py-2 text-xs text-gray-500">
                Recent Searches
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-4 py-2 text-sm ${
                  feedback.type === 'info' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                }`}
              >
                {feedback.message}
                {feedback.type === 'action' && ' (Press Enter to confirm)'}
              </motion.div>
            )}

            {/* Results */}
            <AnimatePresence>
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="spotlight-results"
                >
                  {results.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`spotlight-result-item ${index === selectedIndex ? 'selected' : ''}`}
                      onClick={() => executeAction(item)}
                      onMouseEnter={() => {
                        setSelectedIndex(index);
                        play('click');
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {query && results.length === 0 && !feedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-8 text-center text-gray-500"
              >
                <p>No results for "{query}"</p>
                <p className="text-sm mt-1">Try "open resume" or "find projects"</p>
              </motion.div>
            )}

            {/* Help hint */}
            {!query && (
              <div className="px-4 py-2 text-xs text-gray-400 text-center">
                Use ↑↓ to navigate • Enter to select • Esc to close
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export the Virtual File System schema for external use
export { VIRTUAL_FILE_SYSTEM };
