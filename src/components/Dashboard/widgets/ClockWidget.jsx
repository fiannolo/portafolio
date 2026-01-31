import { useState, useEffect } from 'react';

export function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate hand rotations
  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div
      className="p-4 rounded-xl flex flex-col items-center"
      style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Analog Clock */}
      <div
        className="relative w-32 h-32 rounded-full mb-4"
        style={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-2 bg-gray-800"
            style={{
              top: '8px',
              left: '50%',
              transformOrigin: 'bottom center',
              transform: `translateX(-50%) rotate(${i * 30}deg) translateY(0)`,
              height: i % 3 === 0 ? '8px' : '4px',
              width: i % 3 === 0 ? '2px' : '1px',
            }}
          />
        ))}

        {/* Hour hand */}
        <div
          className="absolute bg-gray-900 rounded-full"
          style={{
            width: '4px',
            height: '30px',
            top: '50%',
            left: '50%',
            transformOrigin: 'bottom center',
            transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`,
          }}
        />

        {/* Minute hand */}
        <div
          className="absolute bg-gray-700 rounded-full"
          style={{
            width: '2px',
            height: '42px',
            top: '50%',
            left: '50%',
            transformOrigin: 'bottom center',
            transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)`,
          }}
        />

        {/* Second hand */}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            width: '1px',
            height: '48px',
            top: '50%',
            left: '50%',
            transformOrigin: 'bottom center',
            transform: `translate(-50%, -100%) rotate(${secondDeg}deg)`,
          }}
        />

        {/* Center dot */}
        <div
          className="absolute w-3 h-3 bg-gray-900 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Digital Time */}
      <div className="text-white font-mono text-2xl font-light">
        {time.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </div>

      {/* Date */}
      <div className="text-white/50 text-sm mt-1">
        {time.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </div>
  );
}
