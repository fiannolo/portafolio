import { useState, useRef } from 'react';
import { DockItem } from './DockItem';
import { dockItems } from '../../data/dockItems';

export function Dock() {
  const [mouseX, setMouseX] = useState(null);
  const dockRef = useRef(null);

  const handleMouseMove = (e) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[9998]" role="navigation" aria-label="Application dock">
      {/* Dock shelf container */}
      <div
        ref={dockRef}
        className="relative flex items-end px-1"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* 3D Shelf background */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-t-lg pointer-events-none"
          style={{
            height: '55px',
            background: `
              linear-gradient(180deg,
                rgba(255, 255, 255, 0.45) 0%,
                rgba(255, 255, 255, 0.25) 15%,
                rgba(200, 220, 240, 0.35) 40%,
                rgba(180, 200, 220, 0.4) 60%,
                rgba(140, 160, 180, 0.45) 80%,
                rgba(100, 120, 140, 0.5) 100%
              )
            `,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderBottom: 'none',
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.6),
              inset 0 -10px 20px rgba(0, 0, 0, 0.1),
              0 -2px 10px rgba(0, 0, 0, 0.15),
              0 -5px 30px rgba(0, 0, 0, 0.1)
            `,
          }}
        />

        {/* Reflection surface at bottom */}
        <div
          className="absolute bottom-0 left-2 right-2 pointer-events-none"
          style={{
            height: '20px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: '0 0 8px 8px',
          }}
        />

        {/* Icons container */}
        <div className="relative flex items-end pb-[6px]">
          {dockItems.map((item, index) => (
            item.type === 'separator' ? (
              <div
                key={`sep-${index}`}
                className="mx-1 self-end mb-[6px]"
                style={{
                  width: '1px',
                  height: '48px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.4), rgba(0,0,0,0.15))',
                }}
              />
            ) : (
              <DockItem
                key={item.id}
                item={item}
                index={index}
                mouseX={mouseX}
                dockRef={dockRef}
              />
            )
          ))}
        </div>
      </div>
    </nav>
  );
}
