import { AppleMenu } from './AppleMenu';
import { AppMenu } from './AppMenu';
import { SystemTray } from './SystemTray';

export function MenuBar({ onSpotlightClick, onDashboardClick }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-[22px] flex items-center justify-between z-[9999]"
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.16)',
        color: '#000',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "SF Pro Text", sans-serif',
        fontSize: '14px',
      }}
    >
      <div className="flex items-center h-full">
        <AppleMenu />
        <AppMenu />
      </div>
      <SystemTray onSpotlightClick={onSpotlightClick} onDashboardClick={onDashboardClick} />
    </div>
  );
}
