import { useDesktop } from '../../contexts/DesktopContext';
import { useWindowManager } from '../../contexts/WindowManagerContext';
import { DesktopIconGrid } from './DesktopIconGrid';
import { Window } from '../Window/Window';

// Real Tiger wallpaper from 512pixels
const TIGER_WALLPAPER_URL = 'https://512pixels.net/downloads/macos-wallpapers/10-4.png';

export function Desktop() {
  const { clearSelection } = useDesktop();
  const { windows } = useWindowManager();

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      clearSelection();
    }
  };

  return (
    <div
      className="absolute overflow-hidden"
      style={{
        top: '22px',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${TIGER_WALLPAPER_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#3a6ea5', // Fallback while loading
      }}
      onClick={handleClick}
    >
      {/* Desktop icons */}
      <DesktopIconGrid />

      {/* Windows */}
      {windows.map((windowData) => (
        <Window key={windowData.id} windowData={windowData} />
      ))}
    </div>
  );
}
