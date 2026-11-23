import React, { useState, useCallback, useEffect } from 'react';
import type { DesktopIcon as DesktopIconType, SectionId } from './types';
import { useBrowserState } from './hooks/useBrowserState';
import DesktopIcon from './components/DesktopIcon';
import BrowserWindow from './components/BrowserWindow';
import Taskbar, { TaskItem } from './components/Taskbar';
import StartMenu from './components/StartMenu';
import ContextMenu, { ContextMenuItem } from './components/ContextMenu';
import CameraApp from './components/CameraApp';
import SnakeApp from './components/SnakeApp';
import SnakeHallOfFame from './components/SnakeHallOfFame';
import RunDialog from './components/RunDialog';
import DisplayPropertiesDialog from './components/DisplayPropertiesDialog';
import HelpDialog from './components/HelpDialog';
import FindDialog from './components/FindDialog';
import TaskManagerDialog from './components/TaskManagerDialog';
import { addRecentDoc } from './utils/recentDocs';
import './App.css';

const defaultDesktopIcons: DesktopIconType[] = [
  { id: 'about', label: 'About_Me.exe', section: 'about', iconType: 'about' },
  { id: 'techstacks', label: 'TechStacks.exe', section: 'techstacks', iconType: 'techstacks' },
  { id: 'projects', label: 'My_Projects.exe', section: 'projects', iconType: 'projects' },
  { id: 'contact', label: 'Contact.exe', section: 'contact', iconType: 'contact' },
  { id: 'camera', label: 'Camera.exe', isSpecial: true, iconType: 'camera' },
  { id: 'snake', label: 'Snake.exe', isSpecial: true, iconType: 'snake' },
];

type WallpaperTheme = 'bliss' | 'teal' | 'blue' | 'navy';

const App: React.FC = () => {
  const {
    state: browserState,
    openSection,
    goBack,
    goForward,
    closeBrowser,
    minimizeBrowser,
    restoreBrowser,
    toggleMaximize,
    canGoBack,
    canGoForward,
  } = useBrowserState();

  const [desktopIconList, setDesktopIconList] = useState<DesktopIconType[]>(defaultDesktopIcons);
  const [openSections, setOpenSections] = useState<SectionId[]>([]);
  const [activeWindow, setActiveWindow] = useState<'browser' | 'camera' | 'snake' | null>(null);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);

  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [cameraDialogOpen, setCameraDialogOpen] = useState(false);
  const [cameraMinimized, setCameraMinimized] = useState(false);
  const [snakeDialogOpen, setSnakeDialogOpen] = useState(false);
  const [snakeMinimized, setSnakeMinimized] = useState(false);
  const [snakeMaximized, setSnakeMaximized] = useState(false);
  const [refreshHofKey, setRefreshHofKey] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [wallpaper, setWallpaper] = useState<WallpaperTheme>('bliss');
  const [titlebarTheme, setTitlebarTheme] = useState<'grey' | 'navy'>('navy');
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);
  const [shutdownAction, setShutdownAction] = useState<'shutdown' | 'restart'>('shutdown');
  const [isShutDown, setIsShutDown] = useState(false);

  // New Dialog States
  const [runDialogOpen, setRunDialogOpen] = useState(false);
  const [displayPropertiesOpen, setDisplayPropertiesOpen] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [findDialogOpen, setFindDialogOpen] = useState(false);
  const [taskManagerOpen, setTaskManagerOpen] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(80);

  // Show Desktop state
  const [minimizedByShowDesktop, setMinimizedByShowDesktop] = useState<{
    browser: boolean;
    camera: boolean;
    snake: boolean;
  } | null>(null);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  const handleOpenSectionApp = useCallback((section: SectionId) => {
    const baseSection = section.startsWith('projects/') ? 'projects' : section;
    setOpenSections(prev => (prev.includes(baseSection) ? prev : [...prev, baseSection]));
    openSection(section);
    restoreBrowser();
    setActiveWindow('browser');

    // Add to actual Recent Documents
    let title = 'About_Me.exe';
    if (section === 'techstacks') title = 'TechStacks.exe';
    else if (section === 'projects') title = 'My_Projects.exe';
    else if (section === 'contact') title = 'Contact.exe';
    else if (section.startsWith('projects/')) {
      const sub = section.replace('projects/', '');
      if (sub === 'cognifocus') title = 'CogniFocus.prj';
      else if (sub === 'startup-valuation') title = 'Startup_Valuation.prj';
      else if (sub === 'image-authenticity') title = 'Image_Authenticity.prj';
      else if (sub === 'email-triage') title = 'Email_Triage.prj';
    }
    addRecentDoc({ id: section, title, section });
  }, [openSection, restoreBrowser]);

  const handleOpenSpecialApp = useCallback((id: string) => {
    if (id === 'camera') {
      setCameraDialogOpen(true);
      setCameraMinimized(false);
      setActiveWindow('camera');
      addRecentDoc({ id: 'camera', title: 'Camera.exe', isSpecial: true });
    } else if (id === 'snake') {
      setSnakeDialogOpen(true);
      setSnakeMinimized(false);
      setActiveWindow('snake');
      addRecentDoc({ id: 'snake', title: 'Snake.exe', isSpecial: true });
    }
  }, []);

  const handleShowDesktop = useCallback(() => {
    const isBrowserVisible = browserState.isOpen && !browserState.isMinimized;
    const isCameraVisible = cameraDialogOpen && !cameraMinimized;
    const isSnakeVisible = snakeDialogOpen && !snakeMinimized;

    if (isBrowserVisible || isCameraVisible || isSnakeVisible) {
      // Save visible state and minimize all
      setMinimizedByShowDesktop({
        browser: isBrowserVisible,
        camera: isCameraVisible,
        snake: isSnakeVisible,
      });
      if (isBrowserVisible) minimizeBrowser();
      if (isCameraVisible) setCameraMinimized(true);
      if (isSnakeVisible) setSnakeMinimized(true);
      setActiveWindow(null);
    } else if (minimizedByShowDesktop) {
      // Restore previously open windows
      if (minimizedByShowDesktop.browser) restoreBrowser();
      if (minimizedByShowDesktop.camera) setCameraMinimized(false);
      if (minimizedByShowDesktop.snake) setSnakeMinimized(false);
      if (minimizedByShowDesktop.browser) setActiveWindow('browser');
      else if (minimizedByShowDesktop.camera) setActiveWindow('camera');
      else if (minimizedByShowDesktop.snake) setActiveWindow('snake');
      setMinimizedByShowDesktop(null);
    }
  }, [browserState.isMinimized, browserState.isOpen, cameraDialogOpen, cameraMinimized, snakeDialogOpen, snakeMinimized, minimizeBrowser, minimizedByShowDesktop, restoreBrowser]);

  const handleExecuteRunCommand = useCallback((cmd: string): boolean => {
    const normalized = cmd.trim().toLowerCase();
    if (['about', 'about me', 'about_me', 'about_me.exe', 'aboutme.exe'].includes(normalized)) {
      handleOpenSectionApp('about');
      return true;
    }
    if (['skills', 'tech', 'techstacks', 'techstacks.exe', 'tech_stacks.exe'].includes(normalized)) {
      handleOpenSectionApp('techstacks');
      return true;
    }
    if (['projects', 'my_projects', 'my_projects.exe', 'projects.exe'].includes(normalized)) {
      handleOpenSectionApp('projects');
      return true;
    }
    if (['contact', 'contact.exe', 'addressbook', 'wab.exe', 'mail'].includes(normalized)) {
      handleOpenSectionApp('contact');
      return true;
    }
    if (['camera', 'camera.exe', 'webcam', 'photobooth'].includes(normalized)) {
      handleOpenSpecialApp('camera');
      return true;
    }
    if (['snake', 'snake.exe', 'game', 'arcade'].includes(normalized)) {
      handleOpenSpecialApp('snake');
      return true;
    }
    if (['desk.cpl', 'display', 'properties'].includes(normalized)) {
      setDisplayPropertiesOpen(true);
      return true;
    }
    if (['help'].includes(normalized)) {
      setHelpDialogOpen(true);
      return true;
    }
    if (['find', 'search'].includes(normalized)) {
      setFindDialogOpen(true);
      return true;
    }
    return false;
  }, [handleOpenSectionApp, handleOpenSpecialApp]);

  const handleOpenIcon = useCallback((icon: DesktopIconType) => {
    if (icon.isSpecial) {
      handleOpenSpecialApp(icon.id);
    } else if (icon.section) {
      handleOpenSectionApp(icon.section);
    }
  }, [handleOpenSectionApp, handleOpenSpecialApp]);

  const handleQuickLaunch = useCallback((id: 'about' | 'techstacks' | 'projects' | 'contact' | 'camera') => {
    if (id === 'camera') {
      handleOpenSpecialApp('camera');
    } else {
      handleOpenSectionApp(id);
    }
  }, [handleOpenSectionApp, handleOpenSpecialApp]);

  const handleCloseBrowser = useCallback(() => {
    setOpenSections([]);
    closeBrowser();
    setActiveWindow(cameraDialogOpen && !cameraMinimized ? 'camera' : null);
  }, [cameraDialogOpen, cameraMinimized, closeBrowser]);

  const handleCloseCamera = useCallback(() => {
    setCameraDialogOpen(false);
    setCameraMinimized(false);
    setActiveWindow(
      snakeDialogOpen && !snakeMinimized
        ? 'snake'
        : browserState.isOpen && !browserState.isMinimized
        ? 'browser'
        : null
    );
  }, [browserState.isMinimized, browserState.isOpen, snakeDialogOpen, snakeMinimized]);

  const handleMinimizeCamera = useCallback(() => {
    setCameraMinimized(true);
    setActiveWindow(
      snakeDialogOpen && !snakeMinimized
        ? 'snake'
        : browserState.isOpen && !browserState.isMinimized
        ? 'browser'
        : null
    );
  }, [browserState.isMinimized, browserState.isOpen, snakeDialogOpen, snakeMinimized]);

  const handleCloseSnake = useCallback(() => {
    setSnakeDialogOpen(false);
    setSnakeMinimized(false);
    setActiveWindow(
      cameraDialogOpen && !cameraMinimized
        ? 'camera'
        : browserState.isOpen && !browserState.isMinimized
        ? 'browser'
        : null
    );
  }, [browserState.isMinimized, browserState.isOpen, cameraDialogOpen, cameraMinimized]);

  const handleMinimizeSnake = useCallback(() => {
    setSnakeMinimized(true);
    setActiveWindow(
      cameraDialogOpen && !cameraMinimized
        ? 'camera'
        : browserState.isOpen && !browserState.isMinimized
        ? 'browser'
        : null
    );
  }, [browserState.isMinimized, browserState.isOpen, cameraDialogOpen, cameraMinimized]);

  const handleTaskClick = useCallback((taskId: string) => {
    if (taskId === 'camera') {
      if (!cameraDialogOpen) {
        setCameraDialogOpen(true);
        setCameraMinimized(false);
        setActiveWindow('camera');
      } else if (cameraMinimized) {
        setCameraMinimized(false);
        setActiveWindow('camera');
      } else if (activeWindow === 'camera') {
        // Clicking active camera taskbar button minimizes it
        setCameraMinimized(true);
        setActiveWindow(
          snakeDialogOpen && !snakeMinimized
            ? 'snake'
            : browserState.isOpen && !browserState.isMinimized
            ? 'browser'
            : null
        );
      } else {
        setActiveWindow('camera');
      }
    } else if (taskId === 'snake') {
      if (!snakeDialogOpen) {
        setSnakeDialogOpen(true);
        setSnakeMinimized(false);
        setActiveWindow('snake');
      } else if (snakeMinimized) {
        setSnakeMinimized(false);
        setActiveWindow('snake');
      } else if (activeWindow === 'snake') {
        // Clicking active snake taskbar button minimizes it
        setSnakeMinimized(true);
        setActiveWindow(
          cameraDialogOpen && !cameraMinimized
            ? 'camera'
            : browserState.isOpen && !browserState.isMinimized
            ? 'browser'
            : null
        );
      } else {
        setActiveWindow('snake');
      }
    } else {
      const section = taskId as SectionId;
      const isCurrentlyActive =
        browserState.isOpen &&
        !browserState.isMinimized &&
        activeWindow === 'browser' &&
        (browserState.activeSection === section ||
          (section === 'projects' && browserState.activeSection.startsWith('projects')));

      if (isCurrentlyActive) {
        // Clicking active taskbar button minimizes the window
        minimizeBrowser();
        setActiveWindow(cameraDialogOpen && !cameraMinimized ? 'camera' : null);
      } else {
        openSection(section);
        restoreBrowser();
        setActiveWindow('browser');
      }
    }
  }, [activeWindow, browserState.activeSection, browserState.isMinimized, browserState.isOpen, cameraDialogOpen, cameraMinimized, minimizeBrowser, openSection, restoreBrowser]);

  const handleCascadeWindows = useCallback(() => {
    if (browserState.isOpen && browserState.isMinimized) {
      restoreBrowser();
    }
    if (cameraDialogOpen && cameraMinimized) {
      setCameraMinimized(false);
    }
    if (snakeDialogOpen && snakeMinimized) {
      setSnakeMinimized(false);
    }
    if (browserState.isOpen) {
      setActiveWindow('browser');
    } else if (cameraDialogOpen) {
      setActiveWindow('camera');
    } else if (snakeDialogOpen) {
      setActiveWindow('snake');
    }
  }, [browserState.isOpen, browserState.isMinimized, cameraDialogOpen, cameraMinimized, restoreBrowser, snakeDialogOpen, snakeMinimized]);

  const handleTileWindows = useCallback(() => {
    if (browserState.isOpen && browserState.isMinimized) {
      restoreBrowser();
    }
    if (cameraDialogOpen && cameraMinimized) {
      setCameraMinimized(false);
    }
    if (snakeDialogOpen && snakeMinimized) {
      setSnakeMinimized(false);
    }
    if (browserState.isOpen) {
      setActiveWindow('browser');
    } else if (cameraDialogOpen) {
      setActiveWindow('camera');
    } else if (snakeDialogOpen) {
      setActiveWindow('snake');
    }
  }, [browserState.isOpen, browserState.isMinimized, cameraDialogOpen, cameraMinimized, restoreBrowser, snakeDialogOpen, snakeMinimized]);

  const handleSwitchToTask = useCallback((taskId: string) => {
    if (taskId === 'camera') {
      setCameraDialogOpen(true);
      setCameraMinimized(false);
      setActiveWindow('camera');
    } else if (taskId === 'snake') {
      setSnakeDialogOpen(true);
      setSnakeMinimized(false);
      setActiveWindow('snake');
    } else {
      openSection(taskId as SectionId);
      restoreBrowser();
      setActiveWindow('browser');
    }
    setTaskManagerOpen(false);
  }, [openSection, restoreBrowser]);

  const handleEndTask = useCallback((taskId: string) => {
    if (taskId === 'camera') {
      handleCloseCamera();
    } else if (taskId === 'snake') {
      handleCloseSnake();
    } else {
      handleCloseBrowser();
    }
  }, [handleCloseBrowser, handleCloseCamera, handleCloseSnake]);

  // Global Keyboard Shortcuts (Alt+F4, Escape, Windows Key, ContextMenu)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Windows Key (Meta) or Ctrl + Esc toggles Start Menu
      if (e.key === 'Meta' || (e.ctrlKey && (e.key === 'Escape' || e.code === 'Escape'))) {
        e.preventDefault();
        setStartMenuOpen(prev => !prev);
        setContextMenu(prev => ({ ...prev, visible: false }));
        return;
      }

      // ContextMenu key or Shift + F10 triggers Desktop Context Menu
      if (e.key === 'ContextMenu' || (e.shiftKey && (e.key === 'F10' || e.code === 'F10'))) {
        e.preventDefault();
        setContextMenu({
          visible: true,
          x: 140,
          y: 120,
        });
        setStartMenuOpen(false);
        return;
      }

      // Alt + F4
      if (e.altKey && (e.key === 'F4' || e.code === 'F4')) {
        e.preventDefault();
        if (taskManagerOpen) {
          setTaskManagerOpen(false);
        } else if (runDialogOpen) {
          setRunDialogOpen(false);
        } else if (displayPropertiesOpen) {
          setDisplayPropertiesOpen(false);
        } else if (helpDialogOpen) {
          setHelpDialogOpen(false);
        } else if (findDialogOpen) {
          setFindDialogOpen(false);
        } else if (showShutdownDialog) {
          setShowShutdownDialog(false);
        } else if (activeWindow === 'camera' && cameraDialogOpen && !cameraMinimized) {
          handleCloseCamera();
        } else if (activeWindow === 'snake' && snakeDialogOpen && !snakeMinimized) {
          handleCloseSnake();
        } else if (activeWindow === 'browser' && browserState.isOpen && !browserState.isMinimized) {
          handleCloseBrowser();
        } else if (startMenuOpen) {
          setStartMenuOpen(false);
        } else if (contextMenu.visible) {
          setContextMenu(prev => ({ ...prev, visible: false }));
        } else {
          // Classic Windows behavior: Alt+F4 on desktop opens Shut Down dialog
          setShowShutdownDialog(true);
        }
      }

      // Escape key closes menus, dialogs, or selection
      if (e.key === 'Escape') {
        if (taskManagerOpen) {
          setTaskManagerOpen(false);
        } else if (runDialogOpen) {
          setRunDialogOpen(false);
        } else if (displayPropertiesOpen) {
          setDisplayPropertiesOpen(false);
        } else if (helpDialogOpen) {
          setHelpDialogOpen(false);
        } else if (findDialogOpen) {
          setFindDialogOpen(false);
        } else if (showShutdownDialog) {
          setShowShutdownDialog(false);
        } else if (activeWindow === 'camera' && cameraDialogOpen && !cameraMinimized) {
          handleCloseCamera();
        } else if (activeWindow === 'snake' && snakeDialogOpen && !snakeMinimized) {
          handleCloseSnake();
        } else if (activeWindow === 'browser' && browserState.isOpen && !browserState.isMinimized) {
          handleCloseBrowser();
        } else if (startMenuOpen) {
          setStartMenuOpen(false);
        } else if (contextMenu.visible) {
          setContextMenu(prev => ({ ...prev, visible: false }));
        } else {
          // Classic Windows behavior: Alt+F4 on desktop opens Shut Down dialog
          setShowShutdownDialog(true);
        }
      }

      // Escape key closes menus, dialogs, or selection
      if (e.key === 'Escape') {
        if (runDialogOpen) {
          setRunDialogOpen(false);
        } else if (displayPropertiesOpen) {
          setDisplayPropertiesOpen(false);
        } else if (helpDialogOpen) {
          setHelpDialogOpen(false);
        } else if (findDialogOpen) {
          setFindDialogOpen(false);
        } else if (contextMenu.visible) {
          setContextMenu(prev => ({ ...prev, visible: false }));
        } else if (startMenuOpen) {
          setStartMenuOpen(false);
        } else if (showShutdownDialog) {
          setShowShutdownDialog(false);
        } else if (selectedIconId) {
          setSelectedIconId(null);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [
    activeWindow,
    cameraDialogOpen,
    cameraMinimized,
    handleCloseCamera,
    handleCloseBrowser,
    browserState.isOpen,
    browserState.isMinimized,
    showShutdownDialog,
    startMenuOpen,
    contextMenu.visible,
    selectedIconId,
    runDialogOpen,
    displayPropertiesOpen,
    helpDialogOpen,
    findDialogOpen,
    taskManagerOpen,
  ]);

  const handleDesktopClick = (e: React.MouseEvent) => {
    // Only deselect if clicking on wallpaper directly
    if ((e.target as HTMLElement).classList.contains('desktop')) {
      setSelectedIconId(null);
      setStartMenuOpen(false);
      setContextMenu(prev => ({ ...prev, visible: false }));
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: Math.min(e.clientX, window.innerWidth - 180),
      y: Math.min(e.clientY, window.innerHeight - 200),
    });
    setStartMenuOpen(false);
  };

  const handleRefresh = useCallback(() => {
    setSelectedIconId(null);
    setRefreshKey(k => k + 1);
  }, []);

  const handleTaskbarBrowserClick = () => {
    if (browserState.isMinimized) {
      restoreBrowser();
      setActiveWindow('browser');
    } else if (activeWindow === 'browser') {
      minimizeBrowser();
      setActiveWindow(null);
    } else {
      setActiveWindow('browser');
    }
  };

  const handleShutDownExecute = () => {
    setShowShutdownDialog(false);
    if (shutdownAction === 'shutdown') {
      setIsShutDown(true);
    } else {
      // Restart
      handleCloseBrowser();
      handleCloseCamera();
      setSelectedIconId(null);
      setStartMenuOpen(false);
      setRefreshKey(k => k + 1);
    }
  };

  const contextMenuItems: ContextMenuItem[] = [
    {
      id: 'arrange',
      label: 'Arrange Icons',
      hasSubmenu: true,
      submenu: [
        {
          id: 'by-name',
          label: 'by Name',
          action: () => {
            setDesktopIconList(prev => [...prev].sort((a, b) => a.label.localeCompare(b.label)));
            setSelectedIconId(null);
          },
        },
        {
          id: 'by-type',
          label: 'by Type',
          action: () => {
            setDesktopIconList(prev => [...prev].sort((a, b) => a.iconType.localeCompare(b.iconType)));
            setSelectedIconId(null);
          },
        },
        {
          id: 'auto-arrange',
          label: 'Auto Arrange',
          action: () => {
            setDesktopIconList(defaultDesktopIcons);
            setSelectedIconId(null);
          },
        },
      ],
    },
    {
      id: 'line-up',
      label: 'Line Up Icons',
      action: () => {
        setDesktopIconList(defaultDesktopIcons);
        setSelectedIconId(null);
      },
    },
    {
      id: 'refresh',
      label: 'Refresh',
      action: handleRefresh,
    },
    {
      separator: true,
      label: '',
    },
    {
      id: 'paste',
      label: 'Paste',
      disabled: true,
    },
    {
      separator: true,
      label: '',
    },
    {
      id: 'properties',
      label: 'Properties',
      action: () => setDisplayPropertiesOpen(true),
    },
  ];

  if (isShutDown) {
    return (
      <div className="safe-screen" role="alert">
        <p className="safe-screen__text">It's now safe to turn off your computer.</p>
        <button
          className="safe-screen__restart-btn"
          onClick={() => {
            setIsShutDown(false);
            closeBrowser();
            setSelectedIconId(null);
          }}
        >
          [ Restart LOGESH_OS ]
        </button>
      </div>
    );
  }

  return (
    <div
      className={`desktop desktop--${wallpaper} titlebar-${titlebarTheme}`}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons */}
      <div className="desktop__icons" role="list" aria-label="Desktop icons">
        {desktopIconList.map(icon => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            isSelected={selectedIconId === icon.id}
            onSelect={setSelectedIconId}
            onOpen={handleOpenIcon}
          />
        ))}
      </div>

      {/* Desktop Hall of Fame Widget */}
      <SnakeHallOfFame
        onOpenSnake={() => handleOpenSpecialApp('snake')}
        refreshTrigger={refreshHofKey}
      />

      {/* Single Browser Window */}
      {browserState.isOpen && !browserState.isMinimized && (
        <BrowserWindow
          key={refreshKey}
          activeSection={browserState.activeSection}
          isMaximized={browserState.isMaximized}
          isActive={activeWindow === 'browser'}
          onFocus={() => setActiveWindow('browser')}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onGoBack={goBack}
          onGoForward={goForward}
          onRefresh={handleRefresh}
          onClose={handleCloseBrowser}
          onMinimize={() => {
            minimizeBrowser();
            setActiveWindow(cameraDialogOpen && !cameraMinimized ? 'camera' : null);
          }}
          onToggleMaximize={toggleMaximize}
          onNavigate={handleOpenSectionApp}
        />
      )}

      {/* Camera.exe Retro Photo Booth */}
      {cameraDialogOpen && (
        <div style={{ display: cameraMinimized ? 'none' : 'contents' }}>
          <CameraApp
            onClose={handleCloseCamera}
            onMinimize={handleMinimizeCamera}
            isActive={activeWindow === 'camera' && !cameraMinimized}
            onFocus={() => {
              setActiveWindow('camera');
              if (cameraMinimized) setCameraMinimized(false);
            }}
          />
        </div>
      )}

      {/* Snake.exe Retro Arcade */}
      {snakeDialogOpen && (
        <div style={{ display: snakeMinimized ? 'none' : 'contents' }}>
          <SnakeApp
            isOpen={snakeDialogOpen}
            isMinimized={snakeMinimized}
            isMaximized={snakeMaximized}
            isActive={activeWindow === 'snake' && !snakeMinimized}
            onClose={handleCloseSnake}
            onMinimize={handleMinimizeSnake}
            onToggleMaximize={() => setSnakeMaximized(prev => !prev)}
            onFocus={() => {
              setActiveWindow('snake');
              if (snakeMinimized) setSnakeMinimized(false);
            }}
            onScoreSubmitted={() => {
              setRefreshHofKey(prev => prev + 1);
            }}
          />
        </div>
      )}

      {/* Start Menu */}
      {startMenuOpen && (
        <StartMenu
          onNavigate={section => {
            handleOpenSectionApp(section);
            setStartMenuOpen(false);
          }}
          onClose={() => setStartMenuOpen(false)}
          onShutDown={() => setShowShutdownDialog(true)}
          onCameraClick={() => {
            handleOpenSpecialApp('camera');
            setStartMenuOpen(false);
          }}
          onSnakeClick={() => {
            handleOpenSpecialApp('snake');
            setStartMenuOpen(false);
          }}
          onOpenRun={() => {
            setRunDialogOpen(true);
            setStartMenuOpen(false);
          }}
          onOpenHelp={() => {
            setHelpDialogOpen(true);
            setStartMenuOpen(false);
          }}
          onOpenFind={() => {
            setFindDialogOpen(true);
            setStartMenuOpen(false);
          }}
          onOpenDisplayProperties={() => {
            setDisplayPropertiesOpen(true);
            setStartMenuOpen(false);
          }}
        />
      )}

      {/* Run Dialog */}
      <RunDialog
        isOpen={runDialogOpen}
        onClose={() => setRunDialogOpen(false)}
        onExecute={handleExecuteRunCommand}
      />

      {/* Display Properties Dialog */}
      <DisplayPropertiesDialog
        isOpen={displayPropertiesOpen}
        currentWallpaper={wallpaper}
        currentTitlebarTheme={titlebarTheme}
        onClose={() => setDisplayPropertiesOpen(false)}
        onApply={(newWp, newTheme) => {
          setWallpaper(newWp);
          setTitlebarTheme(newTheme);
        }}
      />

      {/* Help Dialog */}
      <HelpDialog
        isOpen={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
      />

      {/* Find Dialog */}
      <FindDialog
        isOpen={findDialogOpen}
        onClose={() => setFindDialogOpen(false)}
        onNavigate={handleOpenSectionApp}
        onOpenSpecial={handleOpenSpecialApp}
      />

      {/* Desktop Right-Click Context Menu */}
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={() => setContextMenu(prev => ({ ...prev, visible: false }))}
        />
      )}

      {/* Shutdown Dialog */}
      {showShutdownDialog && (
        <div className="shutdown-overlay" onClick={() => setShowShutdownDialog(false)}>
          <div
            className="shutdown-dialog win-raised"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-label="Shut Down Windows"
          >
            <div className="shutdown-dialog__titlebar">
              <span className="shutdown-dialog__title">Shut Down LOGESH_OS</span>
              <button
                className="browser-window__control-btn win-raised"
                onClick={() => setShowShutdownDialog(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="shutdown-dialog__content">
              <div className="shutdown-dialog__icon">
                <svg viewBox="0 0 32 32" width={32} height={32}>
                  <rect x="2" y="2" width="28" height="28" fill="#c0c0c0" stroke="#000000" strokeWidth="1"/>
                  <circle cx="16" cy="16" r="8" fill="none" stroke="#ff0000" strokeWidth="2.5"/>
                  <rect x="15" y="6" width="2" height="11" fill="#ff0000"/>
                </svg>
              </div>
              <div className="shutdown-dialog__body">
                <p className="shutdown-dialog__question">What do you want the computer to do?</p>
                <div className="shutdown-dialog__options">
                  <label className="shutdown-dialog__option">
                    <input
                      type="radio"
                      name="shutdown-action"
                      checked={shutdownAction === 'shutdown'}
                      onChange={() => setShutdownAction('shutdown')}
                    />
                    <span>Shut down</span>
                  </label>
                  <label className="shutdown-dialog__option">
                    <input
                      type="radio"
                      name="shutdown-action"
                      checked={shutdownAction === 'restart'}
                      onChange={() => setShutdownAction('restart')}
                    />
                    <span>Restart</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="shutdown-dialog__buttons">
              <button
                className="shutdown-dialog__btn win-raised"
                onClick={handleShutDownExecute}
              >
                OK
              </button>
              <button
                className="shutdown-dialog__btn win-raised"
                onClick={() => setShowShutdownDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Taskbar */}
      {(() => {
        const taskbarTasks: TaskItem[] = [];

        const sectionsToInclude =
          openSections.length > 0
            ? openSections
            : browserState.isOpen
            ? [browserState.activeSection]
            : [];

        sectionsToInclude.forEach(sec => {
          let title = 'LOGESH_OS - About Me';
          let iconType: 'about' | 'techstacks' | 'projects' | 'contact' | 'camera' | 'snake' = 'about';

          if (sec === 'about') {
            title = 'LOGESH_OS - About Me';
            iconType = 'about';
          } else if (sec === 'techstacks') {
            title = 'LOGESH_OS - TechStacks';
            iconType = 'techstacks';
          } else if (sec === 'projects' || sec.startsWith('projects/')) {
            title = 'LOGESH_OS - My Projects';
            iconType = 'projects';
          } else if (sec === 'contact') {
            title = 'Contact - Address Book';
            iconType = 'contact';
          }

          const isActive =
            browserState.isOpen &&
            !browserState.isMinimized &&
            activeWindow === 'browser' &&
            (browserState.activeSection === sec ||
              (sec === 'projects' && browserState.activeSection.startsWith('projects')));

          taskbarTasks.push({
            id: sec,
            title,
            iconType,
            isActive,
          });
        });

        if (cameraDialogOpen) {
          taskbarTasks.push({
            id: 'camera',
            title: 'Camera - Retro Photo Booth',
            iconType: 'camera',
            isActive: activeWindow === 'camera' && !cameraMinimized,
          });
        }

        if (snakeDialogOpen) {
          taskbarTasks.push({
            id: 'snake',
            title: 'Snake — Retro Arcade',
            iconType: 'snake',
            isActive: activeWindow === 'snake' && !snakeMinimized,
          });
        }

        return (
          <>
            <TaskManagerDialog
              isOpen={taskManagerOpen}
              onClose={() => setTaskManagerOpen(false)}
              tasks={taskbarTasks}
              onSwitchTo={handleSwitchToTask}
              onEndTask={handleEndTask}
              onNewTask={() => {
                setTaskManagerOpen(false);
                setRunDialogOpen(true);
              }}
            />

            <Taskbar
              startMenuOpen={startMenuOpen}
              onStartClick={() => setStartMenuOpen(prev => !prev)}
              onQuickLaunch={handleQuickLaunch}
              onShowDesktop={handleShowDesktop}
              tasks={taskbarTasks}
              onTaskClick={handleTaskClick}
              soundMuted={isSoundMuted}
              onToggleMute={() => setIsSoundMuted(prev => !prev)}
              volume={volumeLevel}
              onVolumeChange={setVolumeLevel}
              onOpenTaskManager={() => setTaskManagerOpen(true)}
              onCascadeWindows={handleCascadeWindows}
              onTileHorizontally={handleTileWindows}
              onTileVertically={handleTileWindows}
              onOpenDisplayProperties={() => setDisplayPropertiesOpen(true)}
              browserOpen={browserState.isOpen}
              browserMinimized={browserState.isMinimized}
              activeSection={browserState.activeSection}
              onBrowserClick={handleTaskbarBrowserClick}
              cameraOpen={cameraDialogOpen}
              onCameraClick={() => {
                if (!cameraDialogOpen) {
                  setCameraDialogOpen(true);
                  setCameraMinimized(false);
                  setActiveWindow('camera');
                } else if (cameraMinimized) {
                  setCameraMinimized(false);
                  setActiveWindow('camera');
                } else if (activeWindow === 'camera') {
                  setCameraMinimized(true);
                  setActiveWindow(browserState.isOpen && !browserState.isMinimized ? 'browser' : null);
                } else {
                  setActiveWindow('camera');
                }
              }}
            />
          </>
        );
      })()}
    </div>
  );
};

export default App;
