import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserIcon, UpFolderIcon } from './Icons';
import type { SectionId } from '../types';
import { SECTION_PATHS, SECTION_TITLES } from '../types';
import AboutPage from '../pages/AboutPage';
import TechStacksPage from '../pages/TechStacksPage';
import ProjectsPage from '../pages/ProjectsPage';
import ContactPage from '../pages/ContactPage';
import './BrowserWindow.css';

interface Props {
  activeSection: SectionId;
  isMaximized: boolean;
  isActive?: boolean;
  onFocus?: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onNavigate: (section: SectionId) => void;
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const BrowserWindow: React.FC<Props> = ({
  activeSection,
  isMaximized,
  isActive = true,
  onFocus,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onRefresh,
  onClose,
  onMinimize,
  onToggleMaximize,
  onNavigate,
}) => {
  // Window geometry state for restored/floating mode
  const [bounds, setBounds] = useState(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
    const isSmall = typeof window !== 'undefined' && window.innerWidth < 1100;
    const taskbarH = 28;
    const defaultW = isMobile
      ? Math.max(280, window.innerWidth - 8)
      : isSmall
      ? Math.max(360, Math.min(680, window.innerWidth - 40))
      : Math.min(1060, window.innerWidth - 60);
    const defaultH = isMobile
      ? Math.max(320, window.innerHeight - taskbarH - 12)
      : isSmall
      ? Math.max(280, window.innerHeight - 80)
      : Math.min(680, window.innerHeight - 90);
    const defaultX = isMobile
      ? 4
      : Math.max(10, Math.floor((window.innerWidth - defaultW) / 2));
    const defaultY = isMobile
      ? 4
      : Math.max(10, Math.floor((window.innerHeight - taskbarH - defaultH) / 2));
    return {
      x: defaultX,
      y: defaultY,
      width: defaultW,
      height: defaultH,
    };
  });

  const prevBoundsRef = useRef(bounds);
  const [systemMenuOpen, setSystemMenuOpen] = useState(false);
  const lastIconClickRef = useRef<number>(0);

  // Address Bar & Error state
  const [addressInput, setAddressInput] = useState<string>(SECTION_PATHS[activeSection] || '');
  const [addressDropdownOpen, setAddressDropdownOpen] = useState(false);
  const [errorModal, setErrorModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const addressDropdownRef = useRef<HTMLDivElement>(null);

  // Sync address input when activeSection changes
  useEffect(() => {
    setAddressInput(SECTION_PATHS[activeSection] || '');
  }, [activeSection]);

  // Close address dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (addressDropdownRef.current && !addressDropdownRef.current.contains(e.target as Node)) {
        setAddressDropdownOpen(false);
      }
    };
    if (addressDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [addressDropdownOpen]);

  const canGoUp = activeSection.startsWith('projects/');
  const handleGoUp = () => {
    if (canGoUp) {
      onNavigate('projects');
    }
  };

  const handleAddressSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = addressInput.trim().replace(/[\\/]+$/, '').toLowerCase();

    if (['c:\\logesh_os\\about.html', 'about', 'about me', 'about_me.html'].includes(raw)) {
      onNavigate('about');
      return;
    }
    if (['c:\\logesh_os\\techstacks.html', 'c:\\technical skills', 'skills', 'tech', 'techstacks'].includes(raw)) {
      onNavigate('techstacks');
      return;
    }
    if (['c:\\documents and settings\\logesh\\my documents\\my projects', 'projects', 'my projects', 'c:\\logesh_os\\projects.html'].includes(raw)) {
      onNavigate('projects');
      return;
    }
    if (['c:\\logesh_os\\contact.html', 'contact', 'mail'].includes(raw)) {
      onNavigate('contact');
      return;
    }
    if (raw.includes('cognifocus')) {
      onNavigate('projects/cognifocus');
      return;
    }
    if (raw.includes('startup') || raw.includes('valuation')) {
      onNavigate('projects/startup-valuation');
      return;
    }
    if (raw.includes('authenticity') || raw.includes('image')) {
      onNavigate('projects/image-authenticity');
      return;
    }
    if (raw.includes('triage') || raw.includes('email')) {
      onNavigate('projects/email-triage');
      return;
    }

    setErrorModal({
      open: true,
      message: `Cannot find '${addressInput}'. Make sure the path or Internet address is correct.`,
    });
    setAddressInput(SECTION_PATHS[activeSection] || '');
  };

  // Keep prevBounds updated when unmaximized
  useEffect(() => {
    if (!isMaximized) {
      prevBoundsRef.current = bounds;
    }
  }, [bounds, isMaximized]);

  // Handle Alt + Space for System Menu
  useEffect(() => {
    const handleWindowKeyDown = (e: KeyboardEvent) => {
      if (isActive && e.altKey && e.code === 'Space') {
        e.preventDefault();
        setSystemMenuOpen(prev => !prev);
      } else if (e.key === 'Escape' && systemMenuOpen) {
        setSystemMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleWindowKeyDown);
    return () => window.removeEventListener('keydown', handleWindowKeyDown);
  }, [isActive, systemMenuOpen]);

  // Handle Dragging
  const handleTitlePointerDown = (e: React.PointerEvent) => {
    // Ignore clicks on control buttons or system menu
    if ((e.target as HTMLElement).closest('button, .win-system-menu')) return;
    if (isMaximized) return;

    onFocus?.();

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = bounds.x;
    const initialY = bounds.y;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      const taskbarHeight = 28;
      const isMobile = window.innerWidth <= 600;
      const minX = isMobile ? 0 : -bounds.width + 80;
      const maxX = isMobile ? Math.max(0, window.innerWidth - bounds.width) : window.innerWidth - 80;
      const minY = 0;
      const maxY = window.innerHeight - taskbarHeight - 24; // Title bar stays visible above taskbar

      const clampedX = Math.max(minX, Math.min(initialX + deltaX, maxX));
      const clampedY = Math.max(minY, Math.min(initialY + deltaY, maxY));

      setBounds(prev => ({
        ...prev,
        x: clampedX,
        y: clampedY,
      }));
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Handle Resizing
  const handleResizeStart = (e: React.PointerEvent, dir: ResizeDirection) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMaximized) return;

    onFocus?.();

    const startX = e.clientX;
    const startY = e.clientY;
    const initBounds = { ...bounds };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const taskbarHeight = 28;

      const minW = Math.min(300, window.innerWidth - 8);
      const minH = Math.min(220, window.innerHeight - taskbarHeight - 12);

      let { x, y, width, height } = initBounds;

      if (dir.includes('e')) {
        width = Math.max(minW, Math.min(initBounds.width + deltaX, window.innerWidth - x));
      }
      if (dir.includes('s')) {
        height = Math.max(minH, Math.min(initBounds.height + deltaY, window.innerHeight - taskbarHeight - y));
      }
      if (dir.includes('w')) {
        const newWidth = Math.max(minW, initBounds.width - deltaX);
        const newX = initBounds.x + (initBounds.width - newWidth);
        if (newX >= 0) {
          x = newX;
          width = newWidth;
        }
      }
      if (dir.includes('n')) {
        const newHeight = Math.max(minH, initBounds.height - deltaY);
        const newY = initBounds.y + (initBounds.height - newHeight);
        if (newY >= 0) {
          y = newY;
          height = newHeight;
        }
      }

      setBounds({ x, y, width, height });
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Double click title bar to toggle maximize / restore
  const handleTitleDoubleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, .win-system-menu')) return;
    onToggleMaximize();
  };

  // Icon single click: system menu; double click: close window
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastIconClickRef.current < 400) {
      onClose();
    } else {
      setSystemMenuOpen(prev => !prev);
    }
    lastIconClickRef.current = now;
  };

  const renderPage = () => {
    if (activeSection.startsWith('projects')) {
      return <ProjectsPage activeSection={activeSection} onNavigate={onNavigate} />;
    }
    switch (activeSection) {
      case 'about':
        return <AboutPage />;
      case 'techstacks':
        return <TechStacksPage onNavigate={onNavigate} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <AboutPage />;
    }
  };

  const windowStyle: React.CSSProperties = isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 28px)',
        zIndex: isActive ? 5010 : 5000,
      }
    : {
        position: 'fixed',
        left: `${bounds.x}px`,
        top: `${bounds.y}px`,
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
        zIndex: isActive ? 5010 : 5000,
      };

  return (
    <div
      className={`browser-window ${isMaximized ? 'browser-window--maximized' : 'browser-window--normal'} ${
        isActive ? 'browser-window--active' : 'browser-window--inactive'
      }`}
      style={windowStyle}
      onPointerDown={onFocus}
      role="dialog"
      aria-label={`LOGESH_OS Browser - ${SECTION_TITLES[activeSection]}`}
    >
      {/* 8 Resize Handles (only active when not maximized) */}
      {!isMaximized && (
        <>
          <div className="win-resize-handle win-resize-handle--n" onPointerDown={e => handleResizeStart(e, 'n')} />
          <div className="win-resize-handle win-resize-handle--s" onPointerDown={e => handleResizeStart(e, 's')} />
          <div className="win-resize-handle win-resize-handle--w" onPointerDown={e => handleResizeStart(e, 'w')} />
          <div className="win-resize-handle win-resize-handle--e" onPointerDown={e => handleResizeStart(e, 'e')} />
          <div className="win-resize-handle win-resize-handle--nw" onPointerDown={e => handleResizeStart(e, 'nw')} />
          <div className="win-resize-handle win-resize-handle--ne" onPointerDown={e => handleResizeStart(e, 'ne')} />
          <div className="win-resize-handle win-resize-handle--sw" onPointerDown={e => handleResizeStart(e, 'sw')} />
          <div className="win-resize-handle win-resize-handle--se" onPointerDown={e => handleResizeStart(e, 'se')} />
        </>
      )}

      {/* Classic Windows Title Bar */}
      <div
        className="browser-window__titlebar"
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={handleTitleDoubleClick}
      >
        <div className="browser-window__titlebar-left">
          <div
            className="browser-window__icon-btn"
            onClick={handleIconClick}
            title="Window Menu (Alt+Space) · Double-click to close"
          >
            <BrowserIcon size={14} />
          </div>
          <span className="browser-window__title">
            LOGESH_OS - {SECTION_TITLES[activeSection]}
          </span>
        </div>

        {/* System Menu Dropdown */}
        {systemMenuOpen && (
          <div className="win-system-menu win-raised" onClick={e => e.stopPropagation()}>
            <div
              className={`win-system-menu-item ${!isMaximized ? 'win-system-menu-item--disabled' : ''}`}
              onClick={() => {
                if (isMaximized) onToggleMaximize();
                setSystemMenuOpen(false);
              }}
            >
              <span><u>R</u>estore</span>
            </div>
            <div
              className={`win-system-menu-item ${isMaximized ? 'win-system-menu-item--disabled' : ''}`}
              onClick={() => setSystemMenuOpen(false)}
            >
              <span><u>M</u>ove</span>
            </div>
            <div
              className={`win-system-menu-item ${isMaximized ? 'win-system-menu-item--disabled' : ''}`}
              onClick={() => setSystemMenuOpen(false)}
            >
              <span><u>S</u>ize</span>
            </div>
            <div
              className="win-system-menu-item"
              onClick={() => {
                onMinimize();
                setSystemMenuOpen(false);
              }}
            >
              <span>Mi<u>n</u>imize</span>
            </div>
            <div
              className={`win-system-menu-item ${isMaximized ? 'win-system-menu-item--disabled' : ''}`}
              onClick={() => {
                if (!isMaximized) onToggleMaximize();
                setSystemMenuOpen(false);
              }}
            >
              <span>Ma<u>x</u>imize</span>
            </div>
            <div className="win-system-menu-separator" />
            <div
              className="win-system-menu-item"
              onClick={() => {
                onClose();
                setSystemMenuOpen(false);
              }}
            >
              <span><u>C</u>lose</span>
              <span className="win-system-menu-shortcut">Alt+F4</span>
            </div>
          </div>
        )}

        {/* Title Bar Window Controls */}
        <div className="browser-window__titlebar-controls">
          <button
            className="browser-window__control-btn win-raised"
            onClick={onMinimize}
            aria-label="Minimize"
            title="Minimize"
          >
            <svg viewBox="0 0 10 10" width="10" height="10">
              <rect x="1" y="7" width="8" height="2" fill="#000000" />
            </svg>
          </button>
          <button
            className="browser-window__control-btn win-raised"
            onClick={onToggleMaximize}
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? (
              <svg viewBox="0 0 10 10" width="10" height="10">
                <rect x="2" y="0" width="7" height="7" fill="none" stroke="#000000" strokeWidth="1" />
                <rect x="2" y="0" width="7" height="2" fill="#000000" />
                <rect x="0" y="3" width="7" height="7" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                <rect x="0" y="3" width="7" height="2" fill="#000000" />
              </svg>
            ) : (
              <svg viewBox="0 0 10 10" width="10" height="10">
                <rect x="1" y="1" width="8" height="8" fill="none" stroke="#000000" strokeWidth="1" />
                <rect x="1" y="1" width="8" height="2" fill="#000000" />
              </svg>
            )}
          </button>
          <button
            className="browser-window__control-btn browser-window__close-btn win-raised"
            onClick={onClose}
            aria-label="Close"
            title="Close (Alt+F4)"
          >
            <svg viewBox="0 0 10 10" width="10" height="10">
              <line x1="1" y1="1" x2="9" y2="9" stroke="#000000" strokeWidth="1.5" />
              <line x1="9" y1="1" x2="1" y2="9" stroke="#000000" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Browser Navigation Toolbar */}
      <div className="browser-window__toolbar">
        <div className="browser-window__nav-buttons">
          <button
            className="browser-window__nav-btn win-raised"
            onClick={onGoBack}
            disabled={!canGoBack}
            aria-label="Back"
            title="Back (Alt+Left)"
          >
            ◀
          </button>
          <button
            className="browser-window__nav-btn win-raised"
            onClick={onGoForward}
            disabled={!canGoForward}
            aria-label="Forward"
            title="Forward (Alt+Right)"
          >
            ▶
          </button>
          <button
            className="browser-window__nav-btn win-raised"
            onClick={handleGoUp}
            disabled={!canGoUp}
            aria-label="Up"
            title="Up to Parent (Backspace)"
          >
            <UpFolderIcon size={12} />
          </button>
          <button
            className="browser-window__nav-btn win-raised"
            onClick={onRefresh}
            aria-label="Refresh"
            title="Refresh"
          >
            ↻
          </button>
        </div>

        {/* Address Bar */}
        <div className="browser-window__address-bar" ref={addressDropdownRef}>
          <span className="browser-window__address-label">Address:</span>
          <div className="browser-window__address-field">
            <input
              type="text"
              className="browser-window__address-input"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddressSubmit();
              }}
              spellCheck={false}
              aria-label="Browser Address"
            />
            <button
              className="browser-window__address-dropdown-btn"
              onClick={() => setAddressDropdownOpen((prev) => !prev)}
              title="Show Address History"
              type="button"
            >
              ▼
            </button>
          </div>
          <button
            className="browser-window__address-go-btn win-raised"
            onClick={() => handleAddressSubmit()}
            title="Go to Address"
            type="button"
          >
            <span>Go</span>
          </button>

          {/* Address Dropdown Menu */}
          {addressDropdownOpen && (
            <div className="browser-window__address-menu">
              <div
                className="browser-window__address-option"
                onClick={() => {
                  onNavigate('about');
                  setAddressDropdownOpen(false);
                }}
              >
                <span>{SECTION_PATHS.about} (About Me)</span>
              </div>
              <div
                className="browser-window__address-option"
                onClick={() => {
                  onNavigate('techstacks');
                  setAddressDropdownOpen(false);
                }}
              >
                <span>{SECTION_PATHS.techstacks} (Tech Stacks)</span>
              </div>
              <div
                className="browser-window__address-option"
                onClick={() => {
                  onNavigate('projects');
                  setAddressDropdownOpen(false);
                }}
              >
                <span>{SECTION_PATHS.projects} (My Projects)</span>
              </div>
              <div
                className="browser-window__address-option"
                onClick={() => {
                  onNavigate('contact');
                  setAddressDropdownOpen(false);
                }}
              >
                <span>{SECTION_PATHS.contact} (Contact)</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="browser-window__content win-sunken">
        <div className="browser-window__content-inner">
          {renderPage()}
        </div>
      </div>

      {/* Error Alert Dialog */}
      {errorModal.open && (
        <div
          className="browser-window__error-overlay"
          onClick={() => setErrorModal({ open: false, message: '' })}
        >
          <div
            className="browser-window__error-box win-raised"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-label="Windows Explorer"
          >
            <div className="browser-window__error-titlebar">
              <span>Windows Explorer</span>
              <button
                className="browser-window__control-btn win-raised"
                onClick={() => setErrorModal({ open: false, message: '' })}
              >
                ✕
              </button>
            </div>
            <div className="browser-window__error-content">
              <svg className="browser-window__error-icon" width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="#cc0000" />
                <line x1="10" y1="10" x2="22" y2="22" stroke="#ffffff" strokeWidth="3" />
                <line x1="22" y1="10" x2="10" y2="22" stroke="#ffffff" strokeWidth="3" />
              </svg>
              <span>{errorModal.message}</span>
            </div>
            <div className="browser-window__error-actions">
              <button
                className="browser-window__control-btn win-raised"
                style={{ width: '60px', height: '22px' }}
                onClick={() => setErrorModal({ open: false, message: '' })}
                autoFocus
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowserWindow;
