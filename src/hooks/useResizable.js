import { useState, useCallback, useEffect } from 'react';

export function useResizable(initialSize, minSize = { width: 200, height: 100 }, onResizeEnd) {
  const [size, setSize] = useState(initialSize);
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState(initialSize);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize(size);
  }, [size]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;

      const newWidth = Math.max(minSize.width, startSize.width + deltaX);
      const newHeight = Math.max(minSize.height, startSize.height + deltaY);

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      if (onResizeEnd) {
        onResizeEnd(size);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, startPos, startSize, minSize, onResizeEnd, size]);

  // Sync with external size updates
  useEffect(() => {
    if (!isResizing) {
      setSize(initialSize);
    }
  }, [initialSize, isResizing]);

  return {
    size,
    isResizing,
    handleMouseDown,
  };
}
