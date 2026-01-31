import { useDesktop } from '../../contexts/DesktopContext';
import { useWindowManager } from '../../contexts/WindowManagerContext';

export function DesktopIcon({ icon }) {
  const { isIconSelected, selectIcon } = useDesktop();
  const { openWindow } = useWindowManager();

  const selected = isIconSelected(icon.id);

  const handleClick = (e) => {
    e.stopPropagation();
    selectIcon(icon.id, e.metaKey || e.ctrlKey);
  };

  const handleDoubleClick = () => {
    openWindow(icon.appType, {
      title: icon.title,
      size: icon.windowSize,
    });
  };

  return (
    <div
      className="flex flex-col items-center gap-1 p-1.5 rounded cursor-pointer transition-colors"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        background: selected ? 'var(--desktop-selection)' : 'transparent',
        borderRadius: '4px',
      }}
    >
      {/* Icon with shadow */}
      <div
        className="w-12 h-12 flex items-center justify-center"
        style={{
          filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.5))',
        }}
      >
        <img
          src={icon.icon}
          alt={icon.label}
          className="max-w-full max-h-full"
          draggable={false}
        />
      </div>

      {/* Label with text shadow */}
      <span
        className="text-[11px] text-center text-white leading-tight px-1 py-0.5 rounded max-w-[75px]"
        style={{
          background: selected ? 'rgba(47, 124, 232, 0.9)' : 'transparent',
          textShadow: selected ? 'none' : 'var(--desktop-icon-text-shadow)',
          wordBreak: 'break-word',
          fontWeight: selected ? '500' : '400',
        }}
      >
        {icon.label}
      </span>
    </div>
  );
}
