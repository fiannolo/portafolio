import { useClock } from '../../hooks/useClock';

export function SystemTray({ onSpotlightClick, onDashboardClick }) {
  const { formattedTime, formattedDate } = useClock();

  return (
    <div className="flex items-center h-full gap-1 pr-4">
      {/* Bluetooth */}
      <button className="h-full px-2 flex items-center hover:bg-black/5">
        <svg className="w-[12px] h-[14px]" viewBox="0 0 16 16" fill="currentColor" opacity="0.7">
          <path d="M8.5 1v5.5L11 4l.5.5L8.5 8l3 3.5-.5.5-2.5-2.5V15h-.5l-4-4 .5-.5L7.5 13V8L4.5 4.5 5 4l2.5 2.5V1h1z"/>
        </svg>
      </button>

      {/* WiFi */}
      <button className="h-full px-2 flex items-center hover:bg-black/5">
        <svg className="w-[15px] h-[11px]" viewBox="0 0 20 14" fill="currentColor" opacity="0.7">
          <path d="M10 11a2 2 0 110 4 2 2 0 010-4z"/>
          <path d="M10 7c2.2 0 4.2.9 5.6 2.4l-1.4 1.4C13.1 9.7 11.6 9 10 9s-3.1.7-4.2 1.8L4.4 9.4C5.8 7.9 7.8 7 10 7z"/>
          <path d="M10 3c3.3 0 6.3 1.3 8.5 3.5l-1.4 1.4C15.3 6.1 12.8 5 10 5s-5.3 1.1-7.1 2.9L1.5 6.5C3.7 4.3 6.7 3 10 3z"/>
        </svg>
      </button>

      {/* Battery */}
      <button className="h-full px-2 flex items-center hover:bg-black/5">
        <svg className="w-[20px] h-[9px]" viewBox="0 0 25 11" fill="currentColor" opacity="0.7">
          <rect x="0.5" y="0.5" width="20" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
          <rect x="21" y="3" width="2.5" height="5" rx="1" fill="currentColor"/>
          <rect x="2" y="2" width="16" height="7" rx="1" fill="currentColor"/>
        </svg>
      </button>

      {/* Date and Time */}
      <div className="h-full px-2 flex items-center gap-3 text-[13px]">
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>

      {/* User */}
      <button className="h-full px-2 flex items-center hover:bg-black/5 text-[13px]">
        Guest
      </button>

      {/* Dashboard */}
      <button
        className="h-full px-2 flex items-center hover:bg-black/5"
        onClick={onDashboardClick}
        title="Dashboard (F4)"
      >
        <svg className="w-[14px] h-[14px]" viewBox="0 0 20 20" fill="currentColor" opacity="0.7">
          {/* Gauge/speedometer icon */}
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 1.5a6.5 6.5 0 110 13 6.5 6.5 0 010-13z"/>
          <path d="M10 5v5l3.5 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="10" r="1.5"/>
        </svg>
      </button>

      {/* Spotlight */}
      <button
        className="h-full px-2 flex items-center hover:bg-black/5"
        onClick={onSpotlightClick}
        title="Spotlight (⌘ Space)"
      >
        <svg className="w-[14px] h-[14px]" viewBox="0 0 20 20">
          <circle cx="8" cy="8" r="5" fill="none" stroke="#2970d0" strokeWidth="2.5"/>
          <path d="M12 12l5 5" stroke="#2970d0" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}
