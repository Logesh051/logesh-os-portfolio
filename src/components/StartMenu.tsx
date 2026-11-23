import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  AboutIcon,
  TechStacksIcon,
  ProjectsIcon,
  ContactIcon,
  CameraIcon,
  SnakeIcon,
  ProgramsIcon,
  DocumentsIcon,
  SettingsIcon,
  FindIcon,
  HelpIcon,
  RunIcon,
  DisplayPropertiesIcon,
  FileIcon,
} from './Icons';
import type { SectionId } from '../types';
import { getRecentDocs, clearRecentDocs, RecentDocItem } from '../utils/recentDocs';
import './StartMenu.css';

interface Props {
  onNavigate: (section: SectionId) => void;
  onClose: () => void;
  onShutDown: () => void;
  onCameraClick?: () => void;
  onSnakeClick?: () => void;
  onOpenRun?: () => void;
  onOpenHelp?: () => void;
  onOpenFind?: () => void;
  onOpenDisplayProperties?: () => void;
}

type SubmenuType = 'programs' | 'documents' | 'projects' | 'settings' | 'find' | null;

const StartMenu: React.FC<Props> = ({
  onNavigate,
  onClose,
  onShutDown,
  onCameraClick,
  onSnakeClick,
  onOpenRun,
  onOpenHelp,
  onOpenFind,
  onOpenDisplayProperties,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<SubmenuType>(null);
  const [recentDocs, setRecentDocs] = useState<RecentDocItem[]>([]);
  const [focusedRootIndex, setFocusedRootIndex] = useState<number>(0);
  const [focusedSubIndex, setFocusedSubIndex] = useState<number>(-1);

  // Load actual recent docs on mount
  useEffect(() => {
    setRecentDocs(getRecentDocs());
  }, []);

  const rootItems = [
    { id: 'programs', label: 'Programs', icon: <ProgramsIcon size={24} />, hasSubmenu: true },
    { id: 'projects', label: 'Projects', icon: <ProjectsIcon size={24} />, hasSubmenu: true },
    { id: 'documents', label: 'Documents', icon: <DocumentsIcon size={24} />, hasSubmenu: true },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={24} />, hasSubmenu: true },
    { id: 'find', label: 'Find', icon: <FindIcon size={24} />, hasSubmenu: true },
    { id: 'help', label: 'Help', icon: <HelpIcon size={24} />, hasSubmenu: false },
    { id: 'run', label: 'Run...', icon: <RunIcon size={24} />, hasSubmenu: false },
    { id: 'separator', isSeparator: true },
    { id: 'about', label: 'About Me', icon: <AboutIcon size={24} />, hasSubmenu: false },
    {
      id: 'shutdown',
      label: 'Shut Down...',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} style={{ imageRendering: 'pixelated' }}>
          <rect x="2" y="2" width="20" height="20" fill="#c0c0c0" stroke="#000000" strokeWidth="1" rx="2"/>
          <circle cx="12" cy="12" r="6" fill="none" stroke="#ff0000" strokeWidth="2"/>
          <rect x="11" y="4" width="2" height="8" fill="#ff0000"/>
        </svg>
      ),
      hasSubmenu: false,
    },
  ];

  const handleClearDocs = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    clearRecentDocs();
    setRecentDocs([]);
  }, []);

  const handleRootClick = (itemId: string) => {
    switch (itemId) {
      case 'programs':
        setActiveSubmenu(prev => (prev === 'programs' ? null : 'programs'));
        break;
      case 'projects':
        setActiveSubmenu(prev => (prev === 'projects' ? null : 'projects'));
        break;
      case 'documents':
        setActiveSubmenu(prev => (prev === 'documents' ? null : 'documents'));
        break;
      case 'settings':
        setActiveSubmenu(prev => (prev === 'settings' ? null : 'settings'));
        break;
      case 'find':
        if (onOpenFind) onOpenFind();
        onClose();
        break;
      case 'help':
        if (onOpenHelp) onOpenHelp();
        onClose();
        break;
      case 'run':
        if (onOpenRun) onOpenRun();
        onClose();
        break;
      case 'about':
        onNavigate('about');
        onClose();
        break;
      case 'shutdown':
        onShutDown();
        onClose();
        break;
    }
  };

  const handleRecentDocClick = (doc: RecentDocItem) => {
    if (doc.isSpecial && doc.id === 'camera') {
      if (onCameraClick) onCameraClick();
    } else if (doc.section) {
      onNavigate(doc.section);
    }
    onClose();
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.taskbar__start-btn')) return;
      if (menuRef.current && !menuRef.current.contains(target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Keyboard navigation inside Start Menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const selectableRootIndices = [0, 1, 2, 3, 4, 5, 6, 8, 9]; // indexes excluding separator (7)

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeSubmenu) {
          setFocusedSubIndex(prev => prev + 1);
        } else {
          setFocusedRootIndex(prev => {
            const currentPos = selectableRootIndices.indexOf(prev);
            const nextPos = (currentPos + 1) % selectableRootIndices.length;
            return selectableRootIndices[nextPos];
          });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeSubmenu) {
          setFocusedSubIndex(prev => Math.max(0, prev - 1));
        } else {
          setFocusedRootIndex(prev => {
            const currentPos = selectableRootIndices.indexOf(prev);
            const nextPos = (currentPos - 1 + selectableRootIndices.length) % selectableRootIndices.length;
            return selectableRootIndices[nextPos];
          });
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const currentItem = rootItems[focusedRootIndex];
        if (currentItem && currentItem.hasSubmenu) {
          setActiveSubmenu(currentItem.id as SubmenuType);
          setFocusedSubIndex(0);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (activeSubmenu) {
          setActiveSubmenu(null);
          setFocusedSubIndex(-1);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeSubmenu === 'programs') {
          const progs = ['about', 'techstacks', 'projects', 'contact', 'camera', 'snake'];
          const chosen = progs[Math.max(0, focusedSubIndex)];
          if (chosen === 'camera') {
            if (onCameraClick) onCameraClick();
          } else if (chosen === 'snake') {
            if (onSnakeClick) onSnakeClick();
          } else if (chosen) {
            onNavigate(chosen as SectionId);
          }
          onClose();
        } else if (activeSubmenu === 'projects') {
          const projectList: SectionId[] = [
            'projects',
            'projects/cognifocus',
            'projects/startup-valuation',
            'projects/image-authenticity',
            'projects/email-triage',
          ];
          const chosen = projectList[Math.max(0, focusedSubIndex)] || 'projects';
          onNavigate(chosen);
          onClose();
        } else if (activeSubmenu === 'settings') {
          if (onOpenDisplayProperties) onOpenDisplayProperties();
          onClose();
        } else if (activeSubmenu === 'find') {
          if (onOpenFind) onOpenFind();
          onClose();
        } else {
          const item = rootItems[focusedRootIndex];
          if (item && item.id) {
            handleRootClick(item.id);
          }
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (activeSubmenu) {
          setActiveSubmenu(null);
          setFocusedSubIndex(-1);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSubmenu, focusedRootIndex, focusedSubIndex, onClose, onCameraClick, onSnakeClick, onNavigate, onOpenDisplayProperties, onOpenFind, onOpenHelp, onOpenRun, onShutDown]);

  return (
    <div className="start-menu win-raised" ref={menuRef} role="menu" aria-label="Start menu">
      {/* Authentic Windows 98 / 2000 Blue Banner */}
      <div className="start-menu__sidebar">
        <span className="start-menu__sidebar-text">
          LOGESH<span className="start-menu__sidebar-os">_OS</span>
        </span>
      </div>

      {/* Main Start Menu Items */}
      <div className="start-menu__items">
        {rootItems.map((item, idx) => {
          if (item.isSeparator) {
            return <div key={`sep-${idx}`} className="start-menu__separator" />;
          }

          const isFocused = focusedRootIndex === idx;
          const isSubmenuOpen = activeSubmenu === item.id;

          return (
            <div
              key={item.id}
              className={`start-menu__item-wrapper ${isSubmenuOpen ? 'start-menu__item-wrapper--open' : ''}`}
              onMouseEnter={() => {
                setFocusedRootIndex(idx);
                if (item.hasSubmenu) {
                  setActiveSubmenu(item.id as SubmenuType);
                  setFocusedSubIndex(-1);
                } else {
                  setActiveSubmenu(null);
                }
              }}
              onMouseOver={() => {
                setFocusedRootIndex(idx);
                if (item.hasSubmenu) {
                  setActiveSubmenu(item.id as SubmenuType);
                }
              }}
            >
              <button
                className={`start-menu__item ${isFocused ? 'start-menu__item--active' : ''}`}
                onClick={() => handleRootClick(item.id!)}
                role="menuitem"
                aria-haspopup={item.hasSubmenu}
                aria-expanded={isSubmenuOpen}
              >
                <div className="start-menu__item-icon">{item.icon}</div>
                <span className="start-menu__item-label">{item.label}</span>
                {item.hasSubmenu && <span className="start-menu__arrow">▶</span>}
              </button>

              {/* 1. Cascading Programs Submenu */}
              {item.id === 'programs' && isSubmenuOpen && (
                <div className="start-submenu start-submenu--programs win-raised" role="menu">
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 0 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => { onNavigate('about'); onClose(); }}
                    role="menuitem"
                  >
                    <AboutIcon size={20} />
                    <span>About_Me.exe</span>
                  </button>
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 1 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => { onNavigate('techstacks'); onClose(); }}
                    role="menuitem"
                  >
                    <TechStacksIcon size={20} />
                    <span>TechStacks.exe</span>
                  </button>
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 2 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => { onNavigate('projects'); onClose(); }}
                    role="menuitem"
                  >
                    <ProjectsIcon size={20} />
                    <span>My_Projects.exe</span>
                  </button>
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 3 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => { onNavigate('contact'); onClose(); }}
                    role="menuitem"
                  >
                    <ContactIcon size={20} />
                    <span>Contact.exe</span>
                  </button>
                  <div className="start-menu__separator" />
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 4 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => { if (onCameraClick) onCameraClick(); onClose(); }}
                    role="menuitem"
                  >
                    <CameraIcon size={20} />
                    <span>Camera.exe</span>
                  </button>
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 5 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => { if (onSnakeClick) onSnakeClick(); onClose(); }}
                    role="menuitem"
                  >
                    <SnakeIcon size={20} />
                    <span>Snake.exe</span>
                  </button>
                </div>
              )}

              {/* 2. Cascading Projects Submenu */}
              {item.id === 'projects' && isSubmenuOpen && (
                <div className="start-submenu start-submenu--projects win-raised" role="menu">
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 0 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => { onNavigate('projects'); onClose(); }}
                    role="menuitem"
                  >
                    <ProjectsIcon size={20} />
                    <span>Browse All Projects...</span>
                  </button>
                  <div className="start-menu__separator" />
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 1 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => { onNavigate('projects/cognifocus'); onClose(); }}
                    role="menuitem"
                  >
                    <FileIcon size={16} />
                    <span>CogniFocus.prj</span>
                  </button>
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 2 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => { onNavigate('projects/startup-valuation'); onClose(); }}
                    role="menuitem"
                  >
                    <FileIcon size={16} />
                    <span>Startup_Valuation.prj</span>
                  </button>
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 3 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => { onNavigate('projects/image-authenticity'); onClose(); }}
                    role="menuitem"
                  >
                    <FileIcon size={16} />
                    <span>Image_Authenticity.prj</span>
                  </button>
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 4 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => { onNavigate('projects/email-triage'); onClose(); }}
                    role="menuitem"
                  >
                    <FileIcon size={16} />
                    <span>Email_Triage.prj</span>
                  </button>
                </div>
              )}

              {/* 3. Cascading Documents Submenu */}
              {item.id === 'documents' && isSubmenuOpen && (
                <div className="start-submenu start-submenu--documents win-raised" role="menu">
                  {recentDocs.length === 0 ? (
                    <div className="start-submenu__empty">(Empty)</div>
                  ) : (
                    <>
                      {recentDocs.map((doc, dIdx) => (
                        <button
                          key={`${doc.id}-${dIdx}`}
                          className={`start-submenu__item ${focusedSubIndex === dIdx ? 'start-submenu__item--focused' : ''}`}
                          onClick={() => handleRecentDocClick(doc)}
                          role="menuitem"
                        >
                          <FileIcon size={16} />
                          <span className="start-submenu__doc-title">{doc.title}</span>
                        </button>
                      ))}
                      <div className="start-menu__separator" />
                      <button
                        className="start-submenu__item start-submenu__clear"
                        onClick={handleClearDocs}
                        role="menuitem"
                      >
                        <span>🗑 Clear Documents</span>
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* 4. Cascading Settings Submenu */}
              {item.id === 'settings' && isSubmenuOpen && (
                <div className="start-submenu start-submenu--settings win-raised" role="menu">
                  <button
                    className={`start-submenu__item ${focusedSubIndex === 0 ? 'start-submenu__item--focused' : ''}`}
                    onClick={() => {
                      if (onOpenDisplayProperties) onOpenDisplayProperties();
                      onClose();
                    }}
                    role="menuitem"
                  >
                    <DisplayPropertiesIcon size={20} />
                    <span>Display Properties...</span>
                  </button>
                  <button
                    className="start-submenu__item"
                    onClick={() => {
                      if (onOpenDisplayProperties) onOpenDisplayProperties();
                      onClose();
                    }}
                    role="menuitem"
                  >
                    <SettingsIcon size={20} />
                    <span>Control Panel</span>
                  </button>
                </div>
              )}

              {/* 5. Cascading Find Submenu */}
              {item.id === 'find' && isSubmenuOpen && (
                <div className="start-submenu start-submenu--find win-raised" role="menu">
                  <button
                    className="start-submenu__item"
                    onClick={() => {
                      if (onOpenFind) onOpenFind();
                      onClose();
                    }}
                    role="menuitem"
                  >
                    <FindIcon size={20} />
                    <span>Files or Folders...</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StartMenu;
