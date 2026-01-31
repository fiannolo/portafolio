import { createContext, useContext, useState, useEffect } from 'react';

const SystemPreferencesContext = createContext(null);

const DEFAULT_PREFERENCES = {
  soundEnabled: true,
  soundVolume: 0.7,
  animationsEnabled: true,
  dockMagnification: true,
  dockSize: 48,
  showDesktopIcons: true,
  wallpaper: 'tiger',
  appearance: 'aqua', // 'aqua' | 'graphite'
};

export function SystemPreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(() => {
    // Load from localStorage
    try {
      const saved = localStorage.getItem('tiger-preferences');
      return saved ? { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('tiger-preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  const value = {
    ...preferences,
    updatePreference,
    resetPreferences,
  };

  return (
    <SystemPreferencesContext.Provider value={value}>
      {children}
    </SystemPreferencesContext.Provider>
  );
}

export function useSystemPreferences() {
  const context = useContext(SystemPreferencesContext);
  if (!context) {
    throw new Error('useSystemPreferences must be used within SystemPreferencesProvider');
  }
  return context;
}
