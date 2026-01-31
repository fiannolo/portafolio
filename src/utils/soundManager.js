// Mac OS Tiger Sound Manager
class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.audioContext = null;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Preload all essential Mac OS Tiger sounds
      const soundFiles = {
        startup: '/assets/sounds/mac-startup.mp3',
        dockBounce: '/assets/sounds/dock-bounce.mp3',
        windowOpen: '/assets/sounds/window-open.mp3',
        windowClose: '/assets/sounds/window-close.mp3',
        windowMinimize: '/assets/sounds/window-minimize.mp3',
        click: '/assets/sounds/click.mp3',
        error: '/assets/sounds/error.mp3',
        trash: '/assets/sounds/trash.mp3',
        screenshot: '/assets/sounds/screenshot.mp3',
        burn: '/assets/sounds/burn.mp3',
        pop: '/assets/sounds/pop.mp3',
        whoosh: '/assets/sounds/whoosh.mp3'
      };

      // Create placeholder audio buffers for now (will be replaced with actual files)
      for (const [name, path] of Object.entries(soundFiles)) {
        try {
          const audio = new Audio(path);
          audio.volume = 0.3;
          this.sounds.set(name, audio);
        } catch (error) {
          console.log(`Sound ${name} not found, will use fallback`);
        }
      }

      this.initialized = true;
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }

  async play(soundName, volume = 0.3) {
    if (!this.initialized) await this.init();
    
    const sound = this.sounds.get(soundName);
    if (sound) {
      try {
        sound.currentTime = 0;
        sound.volume = volume;
        await sound.play();
      } catch (error) {
        console.warn(`Failed to play ${soundName}:`, error);
        this.fallbackSound(soundName);
      }
    } else {
      this.fallbackSound(soundName);
    }
  }

  fallbackSound(soundName) {
    // Create simple Web Audio API sounds as fallbacks
    if (!this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    switch(soundName) {
      case 'click':
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
        break;
      case 'pop':
        oscillator.frequency.value = 600;
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
        break;
      case 'error':
        oscillator.frequency.value = 300;
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
        break;
      default:
        oscillator.frequency.value = 440;
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
  }
}

export const soundManager = new SoundManager();