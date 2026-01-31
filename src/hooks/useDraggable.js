import { useState, useCallback, useEffect } from 'react';

export function useDraggable(initialPosition, onDragEnd) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [position]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const newX = e.clientX - dragOffset.x;
      const newY = Math.max(22, e.clientY - dragOffset.y); // Keep below menu bar

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (onDragEnd) {
        onDragEnd(position);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onDragEnd, position]);

  // Sync with external position updates
  useEffect(() => {
    if (!isDragging) {
      setPosition(initialPosition);
    }
  }, [initialPosition, isDragging]);

  return {
    position,
    isDragging,
    handleMouseDown,
  };
}
