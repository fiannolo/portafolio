import { useState, useRef, useEffect } from 'react';
import { useWindowManager } from '../../contexts/WindowManagerContext';

export function AppMenu() {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);
  const { getActiveWindow } = useWindowManager();
  const activeWindow = getActiveWindow();

  const appName = activeWindow?.title || 'Finder';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menus = [
    { name: appName, bold: true },
    { name: 'File' },
    { name: 'Edit' },
    { name: 'View' },
    { name: 'Go' },
    { name: 'Window' },
    { name: 'Help' },
  ];

  const handleMenuClick = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleMenuHover = (menuName) => {
    if (openMenu !== null) {
      setOpenMenu(menuName);
    }
  };

  return (
    <div className="flex items-center h-full" ref={menuRef}>
      {menus.map((menu) => (
        <button
          key={menu.name}
          className={`h-full flex items-center ${
            openMenu === menu.name
              ? 'bg-[#3478f6] text-white'
              : ''
          } ${menu.bold ? 'font-bold' : ''}`}
          style={{
            padding: '0 11px',
            fontSize: '14px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "SF Pro Text", sans-serif',
          }}
          onClick={() => handleMenuClick(menu.name)}
          onMouseEnter={() => handleMenuHover(menu.name)}
        >
          {menu.name}
        </button>
      ))}
    </div>
  );
}
