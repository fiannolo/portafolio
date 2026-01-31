import { useSound } from '../../hooks/useSound';

export function WindowControls({ onClose, onMinimize, onZoom }) {
  const { play } = useSound();

  const handleClose = (e) => {
    e.stopPropagation();
    play('pop');
    onClose();
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    // Sound is handled by the genie effect in Window.jsx
    onMinimize();
  };

  const handleZoom = (e) => {
    e.stopPropagation();
    play('click');
    onZoom();
  };

  return (
    <div className="window-controls">
      <button
        className="window-control window-control-close"
        onClick={handleClose}
        aria-label="Close"
      >
        <svg viewBox="0 0 6 6" fill="none">
          <path d="M0.5 0.5L5.5 5.5M5.5 0.5L0.5 5.5" />
        </svg>
      </button>
      <button
        className="window-control window-control-minimize"
        onClick={handleMinimize}
        aria-label="Minimize"
      >
        <svg viewBox="0 0 6 6" fill="none">
          <path d="M0 3H6" />
        </svg>
      </button>
      <button
        className="window-control window-control-zoom"
        onClick={handleZoom}
        aria-label="Zoom"
      >
        <svg viewBox="0 0 6 6" fill="none">
          <path d="M0.5 0.5L5.5 5.5M0.5 5.5L5.5 0.5" />
        </svg>
      </button>
    </div>
  );
}
