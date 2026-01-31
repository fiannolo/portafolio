import { createContext, useContext, useState, useCallback } from 'react';

const WindowManagerContext = createContext(null);

export function WindowManagerProvider({ children }) {
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  const openWindow = useCallback((appType, options = {}) => {
    const existingWindow = windows.find(w => w.appType === appType && !w.minimized);

    if (existingWindow) {
      focusWindow(existingWindow.id);
      return existingWindow.id;
    }

    const id = `window-${Date.now()}`;
    const newWindow = {
      id,
      appType,
      title: options.title || appType,
      position: options.position || { x: 100 + (windows.length * 30), y: 50 + (windows.length * 30) },
      size: options.size || { width: 600, height: 400 },
      zIndex: nextZIndex,
      minimized: false,
      maximized: false,
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
    return id;
  }, [windows, nextZIndex]);

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const focusWindow = useCallback((id) => {
    setWindows(prev => {
      const window = prev.find(w => w.id === id);
      if (!window || window.zIndex === Math.max(...prev.map(w => w.zIndex))) {
        return prev;
      }
      return prev.map(w =>
        w.id === id ? { ...w, zIndex: nextZIndex, minimized: false } : w
      );
    });
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const minimizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: true } : w
    ));
  }, []);

  const restoreWindow = useCallback((id) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: false, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const updateWindowPosition = useCallback((id, position) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, position } : w
    ));
  }, []);

  const updateWindowSize = useCallback((id, size) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, size } : w
    ));
  }, []);

  const toggleMaximize = useCallback((id) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w;

      if (w.maximized) {
        return {
          ...w,
          maximized: false,
          position: w.previousPosition || w.position,
          size: w.previousSize || w.size,
        };
      } else {
        return {
          ...w,
          maximized: true,
          previousPosition: w.position,
          previousSize: w.size,
          position: { x: 0, y: 22 },
          size: { width: window.innerWidth, height: window.innerHeight - 22 - 70 },
        };
      }
    }));
  }, []);

  const getActiveWindow = useCallback(() => {
    const visibleWindows = windows.filter(w => !w.minimized);
    if (visibleWindows.length === 0) return null;
    return visibleWindows.reduce((prev, curr) =>
      prev.zIndex > curr.zIndex ? prev : curr
    );
  }, [windows]);

  const isWindowActive = useCallback((id) => {
    const activeWindow = getActiveWindow();
    return activeWindow?.id === id;
  }, [getActiveWindow]);

  const getRunningApps = useCallback(() => {
    return [...new Set(windows.map(w => w.appType))];
  }, [windows]);

  const value = {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    updateWindowPosition,
    updateWindowSize,
    toggleMaximize,
    getActiveWindow,
    isWindowActive,
    getRunningApps,
  };

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }
  return context;
}
