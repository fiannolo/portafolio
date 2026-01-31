import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNoteWidget } from './widgets/StickyNoteWidget';
import { GPUTempWidget } from './widgets/GPUTempWidget';
import { GitHubWidget } from './widgets/GitHubWidget';
import { ClockWidget } from './widgets/ClockWidget';
import { QuoteWidget } from './widgets/QuoteWidget';
import { WeatherWidget } from './widgets/WeatherWidget';
import { CalculatorWidget } from './widgets/CalculatorWidget';
import { RSSWidget } from './widgets/RSSWidget';

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9998]"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
          }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Dashboard Header with ripple effect */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium"
          >
            Dashboard — Press F4 or click anywhere to close
          </motion.div>

          {/* Widgets Container */}
          <div className="h-full pt-16 pb-20 px-8 overflow-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-4 gap-6 auto-rows-min">
              {/* Row 1 - Main widgets */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <ClockWidget />
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25, type: "spring" }}
              >
                <WeatherWidget />
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <GPUTempWidget />
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, type: "spring" }}
              >
                <CalculatorWidget />
              </motion.div>

              {/* Row 2 - Content widgets */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="col-span-2"
              >
                <GitHubWidget />
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.45, type: "spring" }}
              >
                <StickyNoteWidget />
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <QuoteWidget />
              </motion.div>

              {/* Row 3 - RSS Feed */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.55, type: "spring" }}
                className="col-span-3"
              >
                <RSSWidget />
              </motion.div>
            </div>
          </div>

          {/* Close hint ripple effect */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 0.8, duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-12 h-12 rounded-full bg-white/10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
