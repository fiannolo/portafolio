import { useState, useEffect } from 'react';
import { WindowManagerProvider } from './contexts/WindowManagerContext';
import { DesktopProvider } from './contexts/DesktopContext';
import { SystemPreferencesProvider } from './contexts/SystemPreferencesContext';
import { MenuBar } from './components/MenuBar/MenuBar';
import { Desktop } from './components/Desktop/Desktop';
import { Dock } from './components/Dock/Dock';
import { SetupAssistant } from './components/SetupAssistant/SetupAssistant';
import { BootScreen } from './components/BootScreen/BootScreen';
import { Spotlight } from './components/Spotlight/Spotlight';
import { Dashboard } from './components/Dashboard/Dashboard';
import { MobileView } from './components/MobileView';
import { useIsMobile } from './hooks/useIsMobile';

function AppContent() {
  const [phase, setPhase] = useState('setup'); // setup, boot, ready
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + Space = Spotlight
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
        setDashboardOpen(false);
      }

      // F4 or F12 = Dashboard
      if (e.key === 'F4' || e.key === 'F12') {
        e.preventDefault();
        setDashboardOpen(prev => !prev);
        setSpotlightOpen(false);
      }

      // Escape closes overlays
      if (e.key === 'Escape') {
        setSpotlightOpen(false);
        setDashboardOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Phase progression
  const handleSetupComplete = () => setPhase('boot');
  const handleBootComplete = () => setPhase('ready');

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-desktop"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Setup Assistant - First-time welcome */}
      {phase === 'setup' && (
        <SetupAssistant onComplete={handleSetupComplete} />
      )}

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
