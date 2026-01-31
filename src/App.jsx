import { useState, useEffect } from 'react';
import { WindowManagerProvider } from './contexts/WindowManagerContext';
import { DesktopProvider } from './contexts/DesktopContext';
import { SystemPreferencesProvider } from './contexts/SystemPreferencesContext';
import { useWindowManager } from './contexts/WindowManagerContext';
import { useSound } from './hooks/useSound';
import { MenuBar } from './components/MenuBar/MenuBar';
import { Desktop } from './components/Desktop/Desktop';
import { Dock } from './components/Dock/Dock';
import { BootScreen } from './components/BootScreen/BootScreen';
import { WelcomeDialog } from './components/WelcomeDialog/WelcomeDialog';
import { Spotlight } from './components/Spotlight/Spotlight';
import { Dashboard } from './components/Dashboard/Dashboard';
import { MobileView } from './components/MobileView';
import { useIsMobile } from './hooks/useIsMobile';

function AppContent() {
  const [phase, setPhase] = useState('boot'); // boot, ready
  const [showWelcome, setShowWelcome] = useState(true);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const { openWindow, getActiveWindow, closeWindow, minimizeWindow, windows } = useWindowManager();
  const { play } = useSound();

  // Global keyboard shortcuts - enhanced Mac OS Tiger experience
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + Space = Spotlight
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
        setDashboardOpen(false);
        play('pop');
      }

      // F4 or F12 = Dashboard
      if (e.key === 'F4' || e.key === 'F12') {
        e.preventDefault();
        setDashboardOpen(prev => !prev);
        setSpotlightOpen(false);
        play('pop');
      }

      // Cmd+Tab = Application Switcher
      if (e.metaKey && e.key === 'Tab') {
        e.preventDefault();
        const openApps = ['About', 'Resume', 'Projects', 'Contact', 'Notes', 'Calculator', 'SystemPreferences'];
        const runningApps = openApps.filter(app => windows.some(w => w.appType === app));
        
        if (runningApps.length > 0) {
          const activeWindow = getActiveWindow();
          const currentIndex = activeWindow ? runningApps.indexOf(activeWindow.appType) : -1;
          const nextIndex = (currentIndex + 1) % runningApps.length;
          const nextApp = runningApps[nextIndex];
          
          openWindow(nextApp);
          play('pop');
        }
      }

      // Cmd+W = Close Window
      if (e.metaKey && e.key === 'w') {
        e.preventDefault();
        const activeWindow = getActiveWindow();
        if (activeWindow) {
          closeWindow(activeWindow.id);
          play('windowClose');
        }
      }

      // Cmd+M = Minimize Window
      if (e.metaKey && e.key === 'm') {
        e.preventDefault();
        const activeWindow = getActiveWindow();
        if (activeWindow) {
          minimizeWindow(activeWindow.id);
          play('windowMinimize');
        }
      }

      // Cmd+Q = Quit (Close all apps)
      if (e.metaKey && e.key === 'q') {
        e.preventDefault();
        // Show confirmation dialog
        if (confirm('Are you sure you want to quit? This will close all applications.')) {
          windows.forEach(window => {
            closeWindow(window.id);
          });
          play('click');
        }
      }

      // Escape closes overlays
      if (e.key === 'Escape') {
        setSpotlightOpen(false);
        setDashboardOpen(false);
        play('click');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openWindow, getActiveWindow, closeWindow, minimizeWindow, windows, play]);

  // Phase progression
  const handleBootComplete = () => {
    setPhase('ready');
    play('pop');
  };

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-desktop"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Boot Screen */}
      {phase === 'boot' && (
        <BootScreen onBootComplete={handleBootComplete} />
      )}

      {/* Main Desktop */}
      <main
        id="main-desktop"
        className={`h-screen w-screen overflow-hidden bg-black transition-opacity duration-500 ${
          phase === 'ready' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="main"
        aria-label="Mac OS X Tiger Desktop"
      >
        <MenuBar
          onSpotlightClick={() => setSpotlightOpen(true)}
          onDashboardClick={() => setDashboardOpen(true)}
        />
        <Desktop />
        <Dock />

        {/* Spotlight */}
        <Spotlight
          isOpen={spotlightOpen}
          onClose={() => setSpotlightOpen(false)}
        />

        {/* Dashboard */}
        <Dashboard
          isOpen={dashboardOpen}
          onClose={() => setDashboardOpen(false)}
        />

        {/* Welcome Dialog */}
        {showWelcome && (
          <WelcomeDialog onClose={() => setShowWelcome(false)} />
        )}
      </main>
    </>
  );
}

function App() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileView />;
  }

  return (
    <SystemPreferencesProvider>
      <WindowManagerProvider>
        <DesktopProvider>
          <AppContent />
        </DesktopProvider>
      </WindowManagerProvider>
    </SystemPreferencesProvider>
  );
}

export default App;
