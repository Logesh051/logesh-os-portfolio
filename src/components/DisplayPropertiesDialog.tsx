import React, { useState } from 'react';
import { DisplayPropertiesIcon } from './Icons';
import './DisplayPropertiesDialog.css';

type WallpaperTheme = 'bliss' | 'teal' | 'blue' | 'navy';
type TitlebarTheme = 'grey' | 'navy';

interface Props {
  isOpen: boolean;
  currentWallpaper: WallpaperTheme;
  currentTitlebarTheme: TitlebarTheme;
  onClose: () => void;
  onApply: (wallpaper: WallpaperTheme, titlebarTheme: TitlebarTheme) => void;
}

const wallpapers: { id: WallpaperTheme; label: string; desc: string }[] = [
  { id: 'bliss', label: 'Windows XP Bliss', desc: 'Default rolling green hills and blue sky' },
  { id: 'teal', label: 'Classic Windows Teal', desc: 'Authentic Windows 95/98 solid teal (#008080)' },
  { id: 'blue', label: 'Retro Patterned Blue', desc: 'Windows 2000 textured blue desktop' },
  { id: 'navy', label: 'Dark Navy Workspace', desc: 'Professional solid dark blue (#1a3350)' },
];

const schemes: { id: TitlebarTheme; label: string }[] = [
  { id: 'navy', label: 'Windows Standard (Navy Gradient)' },
  { id: 'grey', label: 'Windows Classic (Retro Grey)' },
];

const DisplayPropertiesDialog: React.FC<Props> = ({
  isOpen,
  currentWallpaper,
  currentTitlebarTheme,
  onClose,
  onApply,
}) => {
  const [activeTab, setActiveTab] = useState<'background' | 'appearance' | 'settings'>('background');
  const [selectedWallpaper, setSelectedWallpaper] = useState<WallpaperTheme>(currentWallpaper);
  const [selectedTheme, setSelectedTheme] = useState<TitlebarTheme>(currentTitlebarTheme);

  const selectedWallpaperRef = React.useRef<WallpaperTheme>(currentWallpaper);
  const selectedThemeRef = React.useRef<TitlebarTheme>(currentTitlebarTheme);

  React.useEffect(() => {
    setSelectedWallpaper(currentWallpaper);
    selectedWallpaperRef.current = currentWallpaper;
    setSelectedTheme(currentTitlebarTheme);
    selectedThemeRef.current = currentTitlebarTheme;
  }, [currentWallpaper, currentTitlebarTheme, isOpen]);

  if (!isOpen) return null;

  const handleSelectWallpaper = (wpId: WallpaperTheme) => {
    selectedWallpaperRef.current = wpId;
    setSelectedWallpaper(wpId);
  };

  const handleSelectTheme = (themeId: TitlebarTheme) => {
    selectedThemeRef.current = themeId;
    setSelectedTheme(themeId);
  };

  const handleOk = () => {
    onApply(selectedWallpaperRef.current, selectedThemeRef.current);
    onClose();
  };

  const handleApply = () => {
    onApply(selectedWallpaperRef.current, selectedThemeRef.current);
  };

  return (
    <div className="disp-prop-overlay" onClick={onClose}>
      <div
        className="disp-prop-dialog win-raised"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Display Properties"
      >
        {/* Title Bar */}
        <div className="disp-prop-titlebar">
          <div className="disp-prop-titlebar-left">
            <DisplayPropertiesIcon size={14} />
            <span className="disp-prop-title">Display Properties</span>
          </div>
          <button
            className="disp-prop-close-btn win-raised"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Tab Row */}
        <div className="disp-prop-tabs" role="tablist">
          <button
            className={`disp-prop-tab ${activeTab === 'background' ? 'disp-prop-tab--active' : ''}`}
            onClick={() => setActiveTab('background')}
            role="tab"
            aria-selected={activeTab === 'background'}
          >
            <u>B</u>ackground
          </button>
          <button
            className={`disp-prop-tab ${activeTab === 'appearance' ? 'disp-prop-tab--active' : ''}`}
            onClick={() => setActiveTab('appearance')}
            role="tab"
            aria-selected={activeTab === 'appearance'}
          >
            <u>A</u>ppearance
          </button>
          <button
            className={`disp-prop-tab ${activeTab === 'settings' ? 'disp-prop-tab--active' : ''}`}
            onClick={() => setActiveTab('settings')}
            role="tab"
            aria-selected={activeTab === 'settings'}
          >
            <u>S</u>ettings
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="disp-prop-content win-raised">
          {activeTab === 'background' && (
            <div className="disp-prop-panel">
              {/* CRT Monitor Preview */}
              <div className="disp-prop-monitor-frame">
                <div className="disp-prop-crt">
                  <div className={`disp-prop-crt-screen disp-prop-crt-screen--${selectedWallpaper}`}>
                    <div className="disp-prop-crt-miniwindows">
                      <div className="disp-prop-crt-miniwin win-raised">
                        <div className={`disp-prop-crt-minititle ${selectedTheme === 'navy' ? 'disp-prop-crt-minititle--navy' : 'disp-prop-crt-minititle--grey'}`} />
                        <div className="disp-prop-crt-minibody" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="disp-prop-crt-stand" />
                <div className="disp-prop-crt-base" />
              </div>

              {/* Wallpaper Selector List */}
              <div className="disp-prop-section">
                <label className="disp-prop-label">Select a background wallpaper:</label>
                <div className="disp-prop-listbox win-sunken">
                  {wallpapers.map(wp => (
                    <div
                      key={wp.id}
                      className={`disp-prop-list-item ${selectedWallpaper === wp.id ? 'disp-prop-list-item--selected' : ''}`}
                      onClick={() => handleSelectWallpaper(wp.id)}
                    >
                      <span className="disp-prop-list-item-title">{wp.label}</span>
                      <span className="disp-prop-list-item-desc">{wp.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="disp-prop-panel">
              {/* Appearance Preview Box */}
              <div className="disp-prop-appearance-preview win-sunken">
                <div className="disp-prop-app-win disp-prop-app-win--inactive win-raised">
                  <div className="disp-prop-app-titlebar disp-prop-app-titlebar--inactive">
                    <span>Inactive Window</span>
                  </div>
                  <div className="disp-prop-app-body" />
                </div>
                <div className="disp-prop-app-win disp-prop-app-win--active win-raised">
                  <div className={`disp-prop-app-titlebar ${selectedTheme === 'navy' ? 'disp-prop-app-titlebar--navy' : 'disp-prop-app-titlebar--grey'}`}>
                    <span>Active Window</span>
                  </div>
                  <div className="disp-prop-app-body">
                    <p style={{ margin: 0, fontSize: 10 }}>Window Text</p>
                  </div>
                </div>
              </div>

              {/* Scheme Dropdown */}
              <div className="disp-prop-section" style={{ marginTop: 12 }}>
                <label className="disp-prop-label">Color Scheme:</label>
                <div className="disp-prop-scheme-list">
                  {schemes.map(sc => (
                    <label key={sc.id} className="disp-prop-radio-row">
                      <input
                        type="radio"
                        name="titlebar-theme"
                        checked={selectedTheme === sc.id}
                        onChange={() => handleSelectTheme(sc.id)}
                      />
                      <span>{sc.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="disp-prop-panel">
              <fieldset className="disp-prop-groupbox">
                <legend>Display Adapter</legend>
                <p style={{ margin: '4px 0', fontSize: 11 }}>Logesh_OS High Color Graphics Adapter (100% Canvas Accelerated)</p>
              </fieldset>

              <fieldset className="disp-prop-groupbox" style={{ marginTop: 10 }}>
                <legend>Colors</legend>
                <p style={{ margin: '4px 0', fontSize: 11 }}>True Color (32 bit)</p>
              </fieldset>

              <fieldset className="disp-prop-groupbox" style={{ marginTop: 10 }}>
                <legend>Screen Area</legend>
                <p style={{ margin: '4px 0', fontSize: 11 }}>
                  {typeof window !== 'undefined' ? `${window.innerWidth} by ${window.innerHeight} pixels` : '1920 by 1080 pixels'}
                </p>
              </fieldset>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="disp-prop-buttons">
          <button className="disp-prop-btn win-raised" onClick={handleOk}>
            OK
          </button>
          <button className="disp-prop-btn win-raised" onClick={onClose}>
            Cancel
          </button>
          <button
            className="disp-prop-btn win-raised"
            onClick={handleApply}
            disabled={selectedWallpaper === currentWallpaper && selectedTheme === currentTitlebarTheme}
          >
            <u>A</u>pply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayPropertiesDialog;
