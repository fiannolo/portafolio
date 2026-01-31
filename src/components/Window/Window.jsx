import { useEffect, useState, useRef } from 'react';
import { useWindowManager } from '../../contexts/WindowManagerContext';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import { useSound } from '../../hooks/useSound';
import { WindowTitleBar } from './WindowTitleBar';

// App components
import { AboutApp } from '../../apps/About/AboutApp';
import { ResumeApp } from '../../apps/Resume/ResumeApp';
import { ProjectsApp } from '../../apps/Projects/ProjectsApp';
import { ContactApp } from '../../apps/Contact/ContactApp';
import { NotesApp } from '../../apps/Notes/NotesApp';
import { CalculatorApp } from '../../apps/Calculator/CalculatorApp';
import { SystemPreferencesApp } from '../../apps/SystemPreferences/SystemPreferencesApp';

const APP_COMPONENTS = {
  About: AboutApp,
  Resume: ResumeApp,
  Projects: ProjectsApp,
  Contact: ContactApp,
  Notes: NotesApp,
  Calculator: CalculatorApp,
  SystemPreferences: SystemPreferencesApp,
};

export function Window({ windowData }) {
  const {
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    updateWindowPosition,
    updateWindowSize,
    isWindowActive,
  } = useWindowManager();

  const [isOpening, setIsOpening] = useState(true);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [genieTarget, setGenieTarget] = useState({ dx: 0, dy: 0 });
  const windowRef = useRef(null);
  const wasMinimized = useRef(windowData.minimized);
  const lastGenieTarget = useRef({ dx: 0, dy: 0 });
  const isActive = isWindowActive(windowData.id);
  const { play } = useSound();
  const hasPlayedOpenSound = useRef(false);

  const { position, isDragging, handleMouseDown } = useDraggable(
    windowData.position,
    (newPos) => updateWindowPosition(windowData.id, newPos)
  );

  const { size, isResizing, handleMouseDown: handleResizeMouseDown } = useResizable(
    windowData.size,
    { width: 300, height: 200 },
    (newSize) => updateWindowSize(windowData.id, newSize)
  );

  // Calculate the genie target (dock position relative to window)
  const calculateGenieTarget = () => {
    if (!windowRef.current) return { dx: 0, dy: 0 };

    const windowRect = windowRef.current.getBoundingClientRect();
    const windowCenterX = windowRect.left + windowRect.width / 2;
    const windowCenterY = windowRect.top + windowRect.height / 2;

    // Dock is at bottom center of screen
    const dockX = window.innerWidth / 2;
    const dockY = window.innerHeight - 35; // Dock is ~35px from bottom

    return {
      dx: dockX - windowCenterX,
      dy: dockY - windowCenterY,
    };
  };

  useEffect(() => {
    // Play window open sound only once
    if (!hasPlayedOpenSound.current) {
      play('windowOpen');
      hasPlayedOpenSound.current = true;
    }
    const timer = setTimeout(() => setIsOpening(false), 200);
    return () => clearTimeout(timer);
  }, [play]);

  // Handle restore animation when window is un-minimized
  useEffect(() => {
    if (wasMinimized.current && !windowData.minimized) {
      // Window was just restored - use the saved genie target
      setShouldRender(true);
      setGenieTarget(lastGenieTarget.current);
      setIsRestoring(true);
      play('pop');
      const timer = setTimeout(() => {
        setIsRestoring(false);
      }, 400);
      return () => clearTimeout(timer);
    }
    wasMinimized.current = windowData.minimized;
  }, [windowData.minimized, play]);

  // Handle the minimize with genie effect
  const handleMinimize = () => {
    if (isMinimizing) return;

    // Calculate and save genie target before animation
    const target = calculateGenieTarget();
    setGenieTarget(target);
    lastGenieTarget.current = target;

    setIsMinimizing(true);
    play('windowMinimize');

    // After animation completes, actually minimize the window
    setTimeout(() => {
      minimizeWindow(windowData.id);
      setIsMinimizing(false);
      setShouldRender(false);
    }, 500);
  };

  // Don't render if minimized and not animating
  if (windowData.minimized && !isRestoring) {
    return null;
  }

  if (!shouldRender && !isRestoring) {
    return null;
  }

  const AppComponent = APP_COMPONENTS[windowData.appType];

  // Build class names for animations
  const animationClass = isMinimizing
    ? 'genie-minimize'
    : isRestoring
      ? 'genie-restore'
      : '';

  return (
    <div
      ref={windowRef}
      className={`window ${isActive ? '' : 'inactive'} ${isOpening ? 'window-opening' : ''} ${animationClass}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: windowData.zIndex,
        '--genie-dx': `${genieTarget.dx}px`,
        '--genie-dy': `${genieTarget.dy}px`,
      }}
      onMouseDown={() => focusWindow(windowData.id)}
    >
      <WindowTitleBar
        title={windowData.title}
        onClose={() => closeWindow(windowData.id)}
        onMinimize={handleMinimize}
        onZoom={() => toggleMaximize(windowData.id)}
        onMouseDown={handleMouseDown}
        isDragging={isDragging}
      />
      <div className="window-content">
        {AppComponent ? <AppComponent /> : <div className="p-4">App not found</div>}
      </div>
      <div
        className="window-resize-handle"
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
}
