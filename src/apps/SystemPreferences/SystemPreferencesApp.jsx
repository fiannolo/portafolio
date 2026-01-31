import { useState } from 'react';
import { useSystemPreferences } from '../../contexts/SystemPreferencesContext';
import { useSound } from '../../hooks/useSound';

export function SystemPreferencesApp() {
  const {
    soundEnabled,
    soundVolume,
    animationsEnabled,
    dockMagnification,
    dockSize,
    appearance,
    updatePreference,
    resetPreferences,
  } = useSystemPreferences();

  const { play } = useSound();
  const [activePane, setActivePane] = useState('sound');

  const panes = [
    { id: 'sound', label: 'Sound', icon: '🔊' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'dock', label: 'Dock', icon: '📱' },
  ];

  const handleToggle = (key, value) => {
    updatePreference(key, value);
    play('click');
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#f6f6f6] to-[#ebebeb]">
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{
          background: 'linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)',
          borderColor: '#b8b8b8',
        }}
      >
        <button
          onClick={resetPreferences}
          className="px-3 py-1 text-[11px] rounded"
          style={{
            background: 'linear-gradient(180deg, #fff 0%, #e8e8e8 100%)',
            border: '1px solid #a8a8a8',
          }}
        >
          Reset All
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className="w-[160px] p-3 border-r overflow-y-auto"
          style={{
            background: 'linear-gradient(180deg, #d0dce8 0%, #b8c8d8 100%)',
            borderColor: '#98a8b8',
          }}
        >
          {panes.map((pane) => (
            <button
              key={pane.id}
              onClick={() => {
                setActivePane(pane.id);
                play('click');
              }}
              className={`w-full px-3 py-2 rounded text-left text-[12px] flex items-center gap-2 mb-1 ${
                activePane === pane.id ? 'text-white' : 'text-[#1a2a3a] hover:bg-white/30'
              }`}
              style={{
                background: activePane === pane.id
                  ? 'linear-gradient(180deg, #5890c8 0%, #3870a8 100%)'
                  : 'transparent',
              }}
            >
              <span className="text-lg">{pane.icon}</span>
              {pane.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activePane === 'sound' && (
            <div>
              <h2 className="text-[15px] font-bold text-[#333] mb-6">Sound Settings</h2>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-white border border-[#d0d0d0]">
                <div>
                  <div className="font-medium text-[13px]">System Sounds</div>
                  <div className="text-[11px] text-[#666]">Play sounds for system events</div>
                </div>
                <button
                  onClick={() => handleToggle('soundEnabled', !soundEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    soundEnabled ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="p-4 rounded-lg bg-white border border-[#d0d0d0]">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-[13px]">Alert Volume</div>
                  <span className="text-[12px] text-[#666]">{Math.round(soundVolume * 100)}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">🔈</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={soundVolume}
                    onChange={(e) => updatePreference('soundVolume', parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  />
                  <span className="text-lg">🔊</span>
                </div>

                {/* Test Sound */}
                <button
                  onClick={() => play('alert')}
                  className="mt-4 px-4 py-2 text-[12px] rounded"
                  style={{
                    background: 'linear-gradient(180deg, #fff 0%, #e8e8e8 100%)',
                    border: '1px solid #a8a8a8',
                  }}
                >
                  Test Alert Sound
                </button>
              </div>
            </div>
          )}

          {activePane === 'appearance' && (
            <div>
              <h2 className="text-[15px] font-bold text-[#333] mb-6">Appearance Settings</h2>

              {/* Animations Toggle */}
              <div className="flex items-center justify-between mb-4 p-4 rounded-lg bg-white border border-[#d0d0d0]">
                <div>
                  <div className="font-medium text-[13px]">Animations</div>
                  <div className="text-[11px] text-[#666]">Enable window and menu animations</div>
                </div>
                <button
                  onClick={() => handleToggle('animationsEnabled', !animationsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    animationsEnabled ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      animationsEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Appearance Mode */}
              <div className="p-4 rounded-lg bg-white border border-[#d0d0d0]">
                <div className="font-medium text-[13px] mb-3">Appearance</div>
                <div className="flex gap-4">
                  {['aqua', 'graphite'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => handleToggle('appearance', mode)}
                      className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                        appearance === mode ? 'border-blue-500' : 'border-transparent'
                      }`}
                      style={{
                        background: mode === 'aqua'
                          ? 'linear-gradient(180deg, #7db8ff 0%, #2f7ce8 100%)'
                          : 'linear-gradient(180deg, #a8a8a8 0%, #707070 100%)',
                      }}
                    >
                      <div className="text-white text-[12px] capitalize">{mode}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activePane === 'dock' && (
            <div>
              <h2 className="text-[15px] font-bold text-[#333] mb-6">Dock Settings</h2>

              {/* Magnification Toggle */}
              <div className="flex items-center justify-between mb-4 p-4 rounded-lg bg-white border border-[#d0d0d0]">
                <div>
                  <div className="font-medium text-[13px]">Magnification</div>
                  <div className="text-[11px] text-[#666]">Magnify icons on hover</div>
                </div>
                <button
                  onClick={() => handleToggle('dockMagnification', !dockMagnification)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    dockMagnification ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      dockMagnification ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Dock Size */}
              <div className="p-4 rounded-lg bg-white border border-[#d0d0d0]">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-[13px]">Dock Size</div>
                  <span className="text-[12px] text-[#666]">{dockSize}px</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm">Small</span>
                  <input
                    type="range"
                    min="32"
                    max="80"
                    step="8"
                    value={dockSize}
                    onChange={(e) => updatePreference('dockSize', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  />
                  <span className="text-sm">Large</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
