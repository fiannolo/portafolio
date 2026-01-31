import { useState, useEffect, useCallback } from 'react';
import { useSound } from '../hooks/useSound';

// Easter Eggs Collection
export function useEasterEggs() {
  const [konamiCode, setKonamiCode] = useState([]);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const { play } = useSound();

  // Konami Code: ↑↑↓↓←→←→BA
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Handle Konami Code
  const handleKeyPress = useCallback((e) => {
    const newSequence = [...konamiCode, e.key].slice(-10);
    setKonamiCode(newSequence);

    if (newSequence.join(',') === konamiSequence.join(',')) {
      activateEasterEgg('konami');
      setKonamiCode([]);
    }
  }, [konamiCode]);

  // Triple-click Easter Egg
  const handleLogoClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTime < 500) {
      setClickCount(prev => prev + 1);
      if (clickCount >= 2) {
        activateEasterEgg('tripleclick');
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(now);
  }, [clickCount, lastClickTime]);

  // Activate Easter Egg
  const activateEasterEgg = useCallback((type) => {
    setEasterEggActive(type);
    play('pop');

    switch(type) {
      case 'konami':
        document.body.style.animation = 'rainbow 3s ease-in-out';
        setTimeout(() => {
          document.body.style.animation = '';
        }, 3000);
        break;
      case 'tripleclick':
        createFloatingHearts();
        break;
      case 'developer':
        revealDeveloperMode();
        break;
    }

    setTimeout(() => {
      setEasterEggActive(null);
    }, 5000);
  }, [play]);

  // Create floating hearts effect
  const createFloatingHearts = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
          position: fixed;
          font-size: ${20 + Math.random() * 20}px;
          left: ${Math.random() * 100}%;
          top: 100%;
          z-index: 9999;
          pointer-events: none;
          animation: floatUp ${3 + Math.random() * 2}s ease-out forwards;
        `;
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 5000);
      }, i * 200);
    }
  };

  // Developer mode reveal
  const revealDeveloperMode = () => {
    const devPanel = document.createElement('div');
    devPanel.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #000;
        color: #0f0;
        font-family: 'Courier New', monospace;
        padding: 20px;
        border: 2px solid #0f0;
        box-shadow: 0 0 20px #0f0;
        z-index: 10000;
      ">
        <h3>🚀 DEVELOPER MODE ACTIVATED</h3>
        <pre>
System: Mac OS X Tiger 10.4.11
Build: 8S2167
Kernel: Darwin 9.8.0
Memory: ${Math.round(Math.random() * 2048)}MB
Processes: ${Math.round(Math.random() * 100)}
        
Cheat codes enabled:
• God mode: ON
• Unlimited undo: ON
• Auto-save: ALWAYS
        
Welcome to the matrix! 🌐
        </pre>
      </div>
    `;
    document.body.appendChild(devPanel);
    
    setTimeout(() => devPanel.remove(), 5000);
  };

  // Add keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Add CSS for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
      
      @keyframes floatUp {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => style.remove();
  }, []);

  return {
    easterEggActive,
    handleLogoClick,
    activateEasterEgg,
  };
}

// Special date-based Easter eggs
export function useDateEasterEggs() {
  const [specialMessage, setSpecialMessage] = useState('');

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    // April 1st - April Fools
    if (month === 4 && day === 1) {
      setSpecialMessage('🃏 April Fools! System running on Windows 95... just kidding!');
    }
    // October 31st - Halloween
    else if (month === 10 && day === 31) {
      setSpecialMessage('🎃 Happy Halloween! The ghosts of Steve Jobs are watching...');
    }
    // December 25th - Christmas
    else if (month === 12 && day === 25) {
      setSpecialMessage('🎄 Merry Christmas! May your code compile on first try!');
    }
    // July 4th - Independence Day (if American user)
    else if (month === 7 && day === 4) {
      setSpecialMessage('🎆 Happy 4th of July! Launching fireworks in CSS...');
    }
  }, []);

  return { specialMessage };
}

// Hidden messages in the About dialog
export const aboutDialogSecrets = [
  "Made with ❤️ and ☕ in Caracas, Venezuela",
  "If you can read this, you're too close to the screen",
  "This portfolio contains 100% pure, uncut JavaScript",
  "No frameworks were harmed in the making of this portfolio",
  "Powered by imagination and way too much coffee",
  "Built like a tank, debugged with a magnifying glass",
  "If it works, don't touch it. If it doesn't work, reboot",
  "This code survived the great refactor of 2024",
  "Optimized for humans, compatible with robots",
  "Warning: May cause spontaneous job offers",
];

export default useEasterEggs;