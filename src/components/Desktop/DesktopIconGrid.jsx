import { DesktopIcon } from './DesktopIcon';
import { desktopIcons } from '../../data/desktopIcons';

export function DesktopIconGrid() {
  return (
    <div
      className="absolute flex flex-col gap-1 items-end"
      style={{
        top: '12px',
        right: '12px',
        paddingBottom: '70px', // Space for dock
      }}
    >
      {desktopIcons.map((icon) => (
        <DesktopIcon key={icon.id} icon={icon} />
      ))}
    </div>
  );
}
