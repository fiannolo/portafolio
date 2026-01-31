import { useCallback, useRef, useEffect } from 'react';
import { useSystemPreferences } from '../contexts/SystemPreferencesContext';

// Audio file paths for real sounds
const AUDIO_FILES = {
  startup: '/assets/sounds/mac-startup.mp3',
};

// Tiger-era sounds (using Web Audio API for generation)
const SOUNDS = {
  // System sounds (startup uses real audio file)
  click: { frequency: 1000, type: 'sine', duration: 0.05, volume: 0.1 },
  pop: { frequency: 600, type: 'sine', duration: 0.08, volume: 0.15 },

  // Dock sounds
  dockBounce: { frequency: 300, type: 'triangle', duration: 0.15, volume: 0.2 },
  dockPop: { frequency: 800, type: 'sine', duration: 0.06, volume: 0.15 },

  // Window sounds
  windowOpen: { frequency: 500, type: 'sine', duration: 0.12, volume: 0.12 },
  windowClose: { frequency: 400, type: 'sine', duration: 0.1, volume: 0.1 },
  windowMinimize: { frequency: [600, 400, 200], type: 'sine', duration: 0.3, volume: 0.1 },

  // Alert sounds
  alert: { frequency: [523, 659, 784], type: 'sine', duration: 0.4, volume: 0.2 },
  error: { frequency: [200, 150], type: 'square', duration: 0.2, volume: 0.15 },

  // Trash
  trash: { frequency: [400, 300, 200, 150], type: 'sawtooth', duration: 0.5, volume: 0.15 },

  // Typing
  keystroke: { frequency: 2000, type: 'sine', duration: 0.02, volume: 0.05 },
};

// Create AudioContext lazily (browsers require user interaction first)
let audioContext = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

// Generate a sound using Web Audio API
const playTone = (config) => {
  try {
    const ctx = getAudioContext();
    const frequencies = Array.isArray(config.frequency) ? config.frequency : [config.frequency];
    const stepDuration = config.duration / frequencies.length;

    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = config.type || 'sine';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + (i * stepDuration));

      gainNode.gain.setValueAtTime(config.volume, ctx.currentTime + (i * stepDuration));
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ((i + 1) * stepDuration));

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime + (i * stepDuration));
      oscillator.stop(ctx.currentTime + ((i + 1) * stepDuration));
    });
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
};

// Play an audio file
const playAudioFile = (src, volume = 1) => {
  try {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(e => console.warn('Audio playback failed:', e));
  } catch (e) {
    console.warn('Audio creation failed:', e);
  }
};

export function useSound() {
  const { soundEnabled, soundVolume } = useSystemPreferences();
  const lastPlayTime = useRef({});

  const play = useCallback((soundName, options = {}) => {
    if (!soundEnabled) return;

    // Check if this sound has an audio file
    if (AUDIO_FILES[soundName]) {
      playAudioFile(AUDIO_FILES[soundName], soundVolume * (options.volume || 1));
      return;
    }

    const sound = SOUNDS[soundName];
    if (!sound) {
      console.warn(`Sound "${soundName}" not found`);
      return;
    }

    // Debounce rapid sounds
    const now = Date.now();
    const minInterval = options.debounce || 50;
    if (lastPlayTime.current[soundName] && now - lastPlayTime.current[soundName] < minInterval) {
      return;
    }
    lastPlayTime.current[soundName] = now;

    playTone({
      ...sound,
      volume: (sound.volume || 0.1) * soundVolume * (options.volume || 1),
    });
  }, [soundEnabled, soundVolume]);

  // Startup sound helper (uses actual Mac chime audio file)
  const playStartup = useCallback(() => {
    play('startup');
  }, [play]);

  return {
    play,
    playStartup,
    sounds: Object.keys(SOUNDS),
  };
}

// Export sound names for convenience
export const SoundNames = Object.keys(SOUNDS);
