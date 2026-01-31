import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../../contexts/WindowManagerContext';
import { useSound } from '../../hooks/useSound';

const BASE_SIZE = 48;
const MAX_SIZE = 80;
const MAGNIFICATION_RANGE = 140;

export function DockItem({ item, index, mouseX, dockRef }) {
  const [isBouncing, setIsBouncing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const itemRef = useRef(null);
  const { openWindow, getRunningApps, windows, restoreWindow } = useWindowManager();
  const { play } = useSound();

  const isRunning = getRunningApps().includes(item.appType);
  const minimizedWindow = windows.find(w => w.appType === item.appType && w.minimized);

  // Calculate size based on mouse distance using cosine for smooth falloff
  const getSize = () => {
    if (mouseX === null || !itemRef.current || !dockRef.current) {
      return BASE_SIZE;
    }

    const itemRect = itemRef.current.getBoundingClientRect();
    const dockRect = dockRef.current.getBoundingClientRect();
    const itemCenterX = itemRect.left + itemRect.width / 2 - dockRect.left;
    const distance = Math.abs(mouseX - itemCenterX);

    if (distance > MAGNIFICATION_RANGE) {
      return BASE_SIZE;
    }

    // Cosine-based scaling for authentic macOS feel
    const scale = Math.cos((distance / MAGNIFICATION_RANGE) * (Math.PI / 2));
    return BASE_SIZE + (MAX_SIZE - BASE_SIZE) * scale;
  };

  const handleClick = () => {
    if (minimizedWindow) {
      play('pop');
      restoreWindow(minimizedWindow.id);
      return;
    }

    if (!isRunning && item.appType) {
      setIsBouncing(true);
      play('dockBounce');
      setTimeout(() => setIsBouncing(false), 1200); // Enhanced bounce duration
    } else {
      play('click');
    }

    if (item.appType) {
      openWindow(item.appType, {
        title: item.title,
        size: item.windowSize,
      });
    }
  };

  const size = getSize();

  return (
    <motion.button
      ref={itemRef}
      className="relative flex flex-col items-center cursor-pointer bg-transparent border-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
      aria-label={`${item.title}${isRunning ? ' (running)' : ''}. Click to open.`}
      style={{
        marginBottom: '0px',
        padding: '0 2px',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          className="absolute px-3 py-1.5 rounded whitespace-nowrap pointer-events-none z-50"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          style={{
            bottom: size + 14,
            background: 'rgba(0, 0, 0, 0.75)',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '500',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {item.title}
          {/* Tooltip arrow */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              bottom: '-6px',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(0, 0, 0, 0.75)',
            }}
          />
        </motion.div>
      )}

      {/* Icon container - sits ON the dock */}
      <motion.div
        animate={{
          width: size,
          height: size,
          y: isBouncing ? [0, -8, -4, -12, -6, -10, -4, -8, 0] : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 25 },
          height: { type: "spring", stiffness: 300, damping: 25 },
          y: isBouncing ? {
            duration: 1.2,
            times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1],
            ease: "easeInOut"
          } : {}
        }}
        style={{
          transformOrigin: 'bottom center',
          marginBottom: '4px',
        }}
      >
        <img
          src={item.icon}
          alt={item.title}
          className="w-full h-full object-contain"
          style={{
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))',
          }}
          draggable={false}
        />
      </motion.div>

      {/* Icon reflection - on the dock surface */}
      <motion.div
        animate={{
          width: size * 0.9,
          height: size * 0.4,
          opacity: 0.3,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 25 },
          height: { type: "spring", stiffness: 300, damping: 25 },
        }}
        style={{
          marginTop: '-4px',
          background: `url(${item.icon}) no-repeat center top`,
          backgroundSize: 'contain',
          transform: 'scaleY(-1)',
          filter: 'blur(1px)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 70%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 70%)',
        }}
      />

      {/* Running indicator - small triangle/dot */}
      {isRunning && (
        <motion.div
          className="absolute"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            bottom: '-2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderBottom: '4px solid rgba(50, 50, 50, 0.8)',
          }}
        />
      )}
    </motion.button>
  );
}
