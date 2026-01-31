import { createContext, useContext, useState, useCallback } from 'react';

const DesktopContext = createContext(null);

export function DesktopProvider({ children }) {
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [selectionBox, setSelectionBox] = useState(null);

  const selectIcon = useCallback((id, addToSelection = false) => {
    if (addToSelection) {
      setSelectedIcons(prev =>
        prev.includes(id)
          ? prev.filter(i => i !== id)
          : [...prev, id]
      );
    } else {
      setSelectedIcons([id]);
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIcons([]);
  }, []);

  const isIconSelected = useCallback((id) => {
    return selectedIcons.includes(id);
  }, [selectedIcons]);

  const startSelectionBox = useCallback((startPoint) => {
    setSelectionBox({
      start: startPoint,
      end: startPoint,
    });
  }, []);

  const updateSelectionBox = useCallback((endPoint) => {
    setSelectionBox(prev => prev ? { ...prev, end: endPoint } : null);
  }, []);

  const endSelectionBox = useCallback(() => {
    setSelectionBox(null);
  }, []);

  const value = {
    selectedIcons,
    selectIcon,
    clearSelection,
    isIconSelected,
    selectionBox,
    startSelectionBox,
    updateSelectionBox,
    endSelectionBox,
  };

  return (
    <DesktopContext.Provider value={value}>
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used within DesktopProvider');
  }
  return context;
}
