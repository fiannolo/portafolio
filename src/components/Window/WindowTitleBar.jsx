import { WindowControls } from './WindowControls';

export function WindowTitleBar({
  title,
  onClose,
  onMinimize,
  onZoom,
  onMouseDown,
  isDragging,
}) {
  return (
    <div
      className={`window-titlebar ${isDragging ? 'dragging' : ''}`}
      onMouseDown={onMouseDown}
    >
      <WindowControls
        onClose={onClose}
        onMinimize={onMinimize}
        onZoom={onZoom}
      />
      <span className="window-title">{title}</span>
    </div>
  );
}
