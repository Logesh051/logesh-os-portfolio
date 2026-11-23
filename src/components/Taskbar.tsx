import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StartIcon,
  BrowserIcon,
  SpeakerIcon,
  SpeakerMutedIcon,
  NetworkIcon,
  CameraIcon,
  AboutIcon,
  TechStacksIcon,
  ProjectsIcon,
  ContactIcon,
  ShowDesktopIcon,
  SnakeIcon,
  InfoIcon,
} from './Icons';
import type { SectionId } from '../types';
import './Taskbar.css';

export interface TaskItem {
  id: string; // 'about' | 'techstacks' | 'projects' | 'contact' | 'camera' | 'snake'
  title: string;
  iconType: 'about' | 'techstacks' | 'projects' | 'contact' | 'camera' | 'snake';
  isActive: boolean;
}

interface Props {
  // Start menu
  startMenuOpen: boolean;
  onStartClick: () => void;

  // Quick Launch
  onQuickLaunch: (id: 'about' | 'techstacks' | 'projects' | 'contact' | 'camera') => void;
  onShowDesktop?: () => void;

  // Open tasks
  tasks: TaskItem[];
  onTaskClick: (taskId: string) => void;

  // Audio mute & volume
  soundMuted?: boolean;
  onToggleMute?: () => void;
  volume?: number;
  onVolumeChange?: (vol: number) => void;

  // Window Management Actions (Context Menu & Task Manager)
  onOpenTaskManager?: () => void;
  onCascadeWindows?: () => void;
  onTileHorizontally?: () => void;
  onTileVertically?: () => void;
  onOpenDisplayProperties?: () => void;

  // Legacy fallback props
  browserOpen?: boolean;
  browserMinimized?: boolean;
  activeSection?: SectionId;
  onBrowserClick?: () => void;
  cameraOpen?: boolean;
  onCameraClick?: () => void;
}

const iconComponents = {
  about: AboutIcon,
  techstacks: TechStacksIcon,
  projects: ProjectsIcon,
  contact: ContactIcon,
  camera: CameraIcon,
  snake: SnakeIcon,
};

const Taskbar: React.FC<Props> = ({
  startMenuOpen,
  onStartClick,
  onQuickLaunch,
  onShowDesktop,
  tasks = [],
  onTaskClick,
  soundMuted: soundMutedProp,
  onToggleMute,
  volume: volumeProp = 80,
  onVolumeChange,
  onOpenTaskManager,
  onCascadeWindows,
  onTileHorizontally,
  onTileVertically,
  onOpenDisplayProperties,
  browserOpen = false,
  browserMinimized = false,
  activeSection = 'about',
  onBrowserClick,
  cameraOpen = false,
  onCameraClick,
}) => {
  const [time, setTime] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [fullDate, setFullDate] = useState<string>('');
  const [localMuted, setLocalMuted] = useState<boolean>(false);
  const [localVolume, setLocalVolume] = useState<number>(80);

  // Popups state
  const [showVolumePopup, setShowVolumePopup] = useState<boolean>(false);
  const [showCalendarPopup, setShowCalendarPopup] = useState<boolean>(false);
  const [showNetworkPopup, setShowNetworkPopup] = useState<boolean>(false);
  const [showNotificationBalloon, setShowNotificationBalloon] = useState<boolean>(false);
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);

  // Calendar State
  const [calMonth, setCalMonth] = useState<number>(() => new Date().getMonth());
  const [calYear, setCalYear] = useState<number>(() => new Date().getFullYear());

  // Taskbar Right-Click Context Menu State
  const [taskbarContextMenu, setTaskbarContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  const isMuted = soundMutedProp !== undefined ? soundMutedProp : localMuted;
  const currentVolume = volumeProp !== undefined ? volumeProp : localVolume;

  const volumePopupRef = useRef<HTMLDivElement>(null);
  const calendarPopupRef = useRef<HTMLDivElement>(null);
  const networkPopupRef = useRef<HTMLDivElement>(null);
  const balloonRef = useRef<HTMLDivElement>(null);
  const taskbarMenuRef = useRef<HTMLDivElement>(null);

  // Update clock and date every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
      setDateStr(
        now.toLocaleDateString([], {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        })
      );
      setFullDate(
        now.toLocaleDateString([], {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
      setSessionSeconds(prev => prev + 1);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show balloon notification once on initial load (auto-dismisses after 7s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotificationBalloon(true);
    }, 1500);

    const autoHide = setTimeout(() => {
      setShowNotificationBalloon(false);
    }, 8500);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoHide);
    };
  }, []);

  // Play audio synthesizer feedback
  const playChime = useCallback((vol: number = 80, freq: number = 523.25) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      const normalizedVol = Math.max(0.01, (vol / 100) * 0.15);
      gain.gain.setValueAtTime(normalizedVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {
      // Audio autoplay policy
    }
  }, []);

  const handleMuteToggle = () => {
    if (onToggleMute) {
      onToggleMute();
    } else {
      setLocalMuted(prev => !prev);
    }
    if (isMuted) {
      playChime(currentVolume, 587.33); // D5
    }
  };

  const handleVolumeChange = (newVol: number) => {
    if (onVolumeChange) {
      onVolumeChange(newVol);
    } else {
      setLocalVolume(newVol);
    }
    if (isMuted && onToggleMute) {
      onToggleMute();
    }
    playChime(newVol, 523.25); // C5
  };

  // Click outside listener for all popups and context menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        volumePopupRef.current &&
        !volumePopupRef.current.contains(target) &&
        !target.closest('.taskbar__tray-btn--volume')
      ) {
        setShowVolumePopup(false);
      }

      if (
        calendarPopupRef.current &&
        !calendarPopupRef.current.contains(target) &&
        !target.closest('.taskbar__datetime')
      ) {
        setShowCalendarPopup(false);
      }

      if (
        networkPopupRef.current &&
        !networkPopupRef.current.contains(target) &&
        !target.closest('.taskbar__tray-btn--network')
      ) {
        setShowNetworkPopup(false);
      }

      if (
        taskbarMenuRef.current &&
        !taskbarMenuRef.current.contains(target)
      ) {
        setTaskbarContextMenu(prev => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle right-click on the Taskbar
  const handleTaskbarContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const menuWidth = 175;
    const menuHeight = 170;
    const x = Math.min(e.clientX, window.innerWidth - menuWidth - 4);
    const y = Math.max(4, window.innerHeight - 28 - menuHeight);

    setTaskbarContextMenu({
      visible: true,
      x,
      y,
    });
  };

  // Build tasks to display: use tasks array if provided, otherwise fallback to legacy props
  let displayTasks = tasks;
  if (!displayTasks || displayTasks.length === 0) {
    const fallbackList: TaskItem[] = [];
    if (browserOpen) {
      let title = 'LOGESH_OS - About Me';
      let iconType: 'about' | 'techstacks' | 'projects' | 'contact' | 'camera' = 'about';
      if (activeSection === 'techstacks') {
        title = 'LOGESH_OS - TechStacks';
        iconType = 'techstacks';
      } else if (activeSection === 'projects' || activeSection.startsWith('projects/')) {
        title = 'LOGESH_OS - My Projects';
        iconType = 'projects';
      } else if (activeSection === 'contact') {
        title = 'Contact - Address Book';
        iconType = 'contact';
      }
      fallbackList.push({
        id: activeSection,
        title,
        iconType,
        isActive: !browserMinimized,
      });
    }
    if (cameraOpen) {
      fallbackList.push({
        id: 'camera',
        title: 'Camera - Retro Photo Booth',
        iconType: 'camera',
        isActive: true,
      });
    }
    displayTasks = fallbackList;
  }

  const handleTaskBtnClick = (taskId: string) => {
    if (onTaskClick) {
      onTaskClick(taskId);
    } else if (taskId === 'camera' && onCameraClick) {
      onCameraClick();
    } else if (onBrowserClick) {
      onBrowserClick();
    }
  };

  // Format session elapsed time
  const formatSessionTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calendar calculations
  const now = new Date();
  const todayDate = now.getDate();
  const isCurrentMonthView = now.getMonth() === calMonth && now.getFullYear() === calYear;
  const daysInCalMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(calYear, calMonth, 1).getDay(); // 0 is Sunday
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div
      className="taskbar win-raised"
      role="toolbar"
      aria-label="Taskbar"
      onContextMenu={handleTaskbarContextMenu}
    >
      {/* 1. Start Button */}
      <button
        className={`taskbar__start-btn win-raised ${startMenuOpen ? 'taskbar__start-btn--active' : ''}`}
        onClick={onStartClick}
        aria-label="Start menu"
        aria-expanded={startMenuOpen}
        title="Click here to begin"
      >
        <StartIcon size={16} />
        <span className="taskbar__start-text">Start</span>
      </button>

      {/* 2. Quick Launch Toolbar */}
      <div className="taskbar__quicklaunch" role="toolbar" aria-label="Quick Launch">
        <div className="taskbar__quicklaunch-gripper" title="Quick Launch Toolbar" />
        <button
          className="taskbar__quicklaunch-btn taskbar__quicklaunch-btn--show-desktop"
          onClick={onShowDesktop}
          title="Show Desktop (Minimize/Restore All Windows)"
          aria-label="Show Desktop"
        >
          <ShowDesktopIcon size={16} />
        </button>
        <button
          className="taskbar__quicklaunch-btn"
          onClick={() => onQuickLaunch('about')}
          title="About_Me.exe"
          aria-label="Quick Launch About_Me.exe"
        >
          <AboutIcon size={16} />
        </button>
        <button
          className="taskbar__quicklaunch-btn"
          onClick={() => onQuickLaunch('techstacks')}
          title="TechStacks.exe"
          aria-label="Quick Launch TechStacks.exe"
        >
          <TechStacksIcon size={16} />
        </button>
        <button
          className="taskbar__quicklaunch-btn"
          onClick={() => onQuickLaunch('projects')}
          title="My_Projects.exe"
          aria-label="Quick Launch My_Projects.exe"
        >
          <ProjectsIcon size={16} />
        </button>
        <button
          className="taskbar__quicklaunch-btn"
          onClick={() => onQuickLaunch('contact')}
          title="Contact.exe"
          aria-label="Quick Launch Contact.exe"
        >
          <ContactIcon size={16} />
        </button>
        <button
          className="taskbar__quicklaunch-btn"
          onClick={() => onQuickLaunch('camera')}
          title="Camera.exe"
          aria-label="Quick Launch Camera.exe"
        >
          <CameraIcon size={16} />
        </button>
        <div className="taskbar__separator" />
      </div>

      {/* 3. Open Application Buttons */}
      <div className="taskbar__tasks" role="group" aria-label="Running Applications">
        {displayTasks.map(task => {
          const IconComp = iconComponents[task.iconType] || BrowserIcon;
          return (
            <button
              key={task.id}
              className={`taskbar__task-btn win-raised ${task.isActive ? 'taskbar__task-btn--active' : ''}`}
              onClick={() => handleTaskBtnClick(task.id)}
              aria-label={task.title}
              title={task.title}
            >
              <span className="taskbar__task-icon">
                <IconComp size={16} />
              </span>
              <span className="taskbar__task-text">{task.title}</span>
            </button>
          );
        })}
      </div>

      {/* 4. System Tray & Clock */}
      <div className="taskbar__tray win-sunken" role="region" aria-label="System Tray">
        {/* Notification Icon (Toggles Balloon) */}
        <button
          className="taskbar__tray-icon taskbar__tray-btn"
          onClick={() => setShowNotificationBalloon(prev => !prev)}
          title="LOGESH_OS System Notification (Click to toggle)"
          aria-label="System notification"
        >
          <InfoIcon size={14} />
        </button>

        {/* Network Status Icon */}
        <button
          className="taskbar__tray-icon taskbar__tray-btn taskbar__tray-btn--network"
          onClick={() => setShowNetworkPopup(prev => !prev)}
          title="Local Area Connection&#10;Speed: 100.0 Mbps&#10;Status: Connected (Click for details)"
          aria-label="Network status: Connected"
        >
          <NetworkIcon size={14} active={true} />
        </button>

        {/* Volume / Speaker Icon */}
        <button
          className="taskbar__tray-icon taskbar__tray-btn taskbar__tray-btn--volume"
          onClick={() => setShowVolumePopup(prev => !prev)}
          title={isMuted ? 'Volume: Muted (Click to open control)' : `Volume: ${currentVolume}% (Click to adjust)`}
          aria-label={isMuted ? 'Volume muted' : `Volume: ${currentVolume}%`}
        >
          {isMuted ? <SpeakerMutedIcon size={14} /> : <SpeakerIcon size={14} />}
        </button>

        {/* Date and Clock (Click opens Calendar popup) */}
        <div
          className="taskbar__datetime"
          onClick={() => setShowCalendarPopup(prev => !prev)}
          title={`${fullDate} (Click for Calendar)`}
          aria-label={`Current time ${time}, Date ${dateStr}`}
        >
          <span className="taskbar__date">{dateStr}</span>
          <time className="taskbar__clock">{time}</time>
        </div>
      </div>

      {/* POPUP 1: Retro Windows 98 Volume Control */}
      {showVolumePopup && (
        <div className="taskbar-popup taskbar-volume-popup win-raised" ref={volumePopupRef}>
          <div className="taskbar-popup__titlebar">
            <span>Volume</span>
            <button
              className="taskbar-popup__close-btn"
              onClick={() => setShowVolumePopup(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="taskbar-volume-popup__body">
            <span className="taskbar-volume-popup__label">Master</span>
            <div className="taskbar-volume-popup__slider-container">
              <span className="taskbar-volume-popup__tick-max">—</span>
              <input
                type="range"
                className="taskbar-volume-slider"
                min="0"
                max="100"
                value={isMuted ? 0 : currentVolume}
                onChange={e => handleVolumeChange(parseInt(e.target.value, 10))}
                aria-orientation="vertical"
              />
              <span className="taskbar-volume-popup__tick-min">—</span>
            </div>
            <span className="taskbar-volume-popup__val">
              {isMuted ? '0%' : `${currentVolume}%`}
            </span>
            <label className="taskbar-volume-popup__mute">
              <input
                type="checkbox"
                checked={isMuted}
                onChange={handleMuteToggle}
              />
              <span>Mute</span>
            </label>
          </div>
        </div>
      )}

      {/* POPUP 2: Retro Windows 98 Date & Calendar */}
      {showCalendarPopup && (
        <div className="taskbar-popup taskbar-calendar-popup win-raised" ref={calendarPopupRef}>
          <div className="taskbar-popup__titlebar">
            <span>Date / Time Properties</span>
            <button
              className="taskbar-popup__close-btn"
              onClick={() => setShowCalendarPopup(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="taskbar-calendar-popup__body">
            {/* Month & Year Navigation */}
            <div className="taskbar-calendar-nav">
              <button
                className="taskbar-cal-btn"
                onClick={() => {
                  if (calMonth === 0) {
                    setCalMonth(11);
                    setCalYear(y => y - 1);
                  } else {
                    setCalMonth(m => m - 1);
                  }
                }}
                aria-label="Previous Month"
              >
                ◀
              </button>
              <span className="taskbar-cal-title">
                {monthNames[calMonth]} {calYear}
              </span>
              <button
                className="taskbar-cal-btn"
                onClick={() => {
                  if (calMonth === 11) {
                    setCalMonth(0);
                    setCalYear(y => y + 1);
                  } else {
                    setCalMonth(m => m + 1);
                  }
                }}
                aria-label="Next Month"
              >
                ▶
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="taskbar-cal-grid win-sunken">
              <div className="taskbar-cal-header-row">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>
              <div className="taskbar-cal-days">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <span key={`empty-${i}`} className="taskbar-cal-day--empty" />
                ))}
                {Array.from({ length: daysInCalMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const isToday = isCurrentMonthView && dayNum === todayDate;
                  return (
                    <span
                      key={`day-${dayNum}`}
                      className={`taskbar-cal-day ${isToday ? 'taskbar-cal-day--today' : ''}`}
                    >
                      {dayNum}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Live Clock Readout */}
            <div className="taskbar-calendar-clock">
              <span className="taskbar-cal-time">{time}</span>
              <span className="taskbar-cal-date">{fullDate}</span>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 3: Retro Network Connection Status */}
      {showNetworkPopup && (
        <div className="taskbar-popup taskbar-network-popup win-raised" ref={networkPopupRef}>
          <div className="taskbar-popup__titlebar">
            <span>Local Area Connection Status</span>
            <button
              className="taskbar-popup__close-btn"
              onClick={() => setShowNetworkPopup(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="taskbar-network-popup__body">
            <div className="taskbar-net-header">
              <NetworkIcon size={24} active={true} />
              <div>
                <strong>Local Area Connection</strong>
                <p style={{ margin: 0, color: '#008000', fontSize: '10px' }}>● Connected</p>
              </div>
            </div>
            <div className="taskbar-net-stats win-sunken">
              <div className="taskbar-net-row">
                <span>Status:</span>
                <strong>Connected</strong>
              </div>
              <div className="taskbar-net-row">
                <span>Duration:</span>
                <span>{formatSessionTime(sessionSeconds)}</span>
              </div>
              <div className="taskbar-net-row">
                <span>Speed:</span>
                <span>100.0 Mbps</span>
              </div>
              <div className="taskbar-net-row">
                <span>Packets Sent:</span>
                <span>{142 + sessionSeconds * 3}</span>
              </div>
              <div className="taskbar-net-row">
                <span>Packets Rcvd:</span>
                <span>{289 + sessionSeconds * 5}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button
                className="taskbar-popup__btn win-raised"
                onClick={() => setShowNetworkPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 4: Retro Windows 2000 Speech Balloon Notification */}
      {showNotificationBalloon && (
        <div className="taskbar-balloon" ref={balloonRef} role="alert">
          <div className="taskbar-balloon__pointer" />
          <div className="taskbar-balloon__header">
            <div className="taskbar-balloon__title">
              <InfoIcon size={14} />
              <span>LOGESH_OS System</span>
            </div>
            <button
              className="taskbar-balloon__close"
              onClick={() => setShowNotificationBalloon(false)}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
          <div className="taskbar-balloon__message">
            Welcome to LOGESH_OS! All system components are operational. Click Start or use the Quick Launch toolbar to begin.
          </div>
        </div>
      )}

      {/* POPUP 5: Taskbar Right-Click Context Menu */}
      {taskbarContextMenu.visible && (
        <div
          className="taskbar-context-menu win-raised"
          ref={taskbarMenuRef}
          style={{
            left: `${taskbarContextMenu.x}px`,
            top: `${taskbarContextMenu.y}px`,
          }}
          role="menu"
        >
          <div className="taskbar-context-menu__item" role="menuitem">
            <span>✓ Toolbars</span>
          </div>
          <div className="taskbar-context-menu__separator" />
          <button
            className="taskbar-context-menu__item"
            onClick={() => {
              if (onCascadeWindows) onCascadeWindows();
              setTaskbarContextMenu(prev => ({ ...prev, visible: false }));
            }}
            role="menuitem"
          >
            <span>Cascade Windows</span>
          </button>
          <button
            className="taskbar-context-menu__item"
            onClick={() => {
              if (onTileHorizontally) onTileHorizontally();
              setTaskbarContextMenu(prev => ({ ...prev, visible: false }));
            }}
            role="menuitem"
          >
            <span>Tile Windows Horizontally</span>
          </button>
          <button
            className="taskbar-context-menu__item"
            onClick={() => {
              if (onTileVertically) onTileVertically();
              setTaskbarContextMenu(prev => ({ ...prev, visible: false }));
            }}
            role="menuitem"
          >
            <span>Tile Windows Vertically</span>
          </button>
          <button
            className="taskbar-context-menu__item"
            onClick={() => {
              if (onShowDesktop) onShowDesktop();
              setTaskbarContextMenu(prev => ({ ...prev, visible: false }));
            }}
            role="menuitem"
          >
            <span>Minimize All Windows</span>
          </button>
          <div className="taskbar-context-menu__separator" />
          <button
            className="taskbar-context-menu__item"
            onClick={() => {
              if (onOpenTaskManager) onOpenTaskManager();
              setTaskbarContextMenu(prev => ({ ...prev, visible: false }));
            }}
            role="menuitem"
          >
            <span>Task Manager...</span>
          </button>
          <div className="taskbar-context-menu__separator" />
          <button
            className="taskbar-context-menu__item"
            onClick={() => {
              if (onOpenDisplayProperties) onOpenDisplayProperties();
              setTaskbarContextMenu(prev => ({ ...prev, visible: false }));
            }}
            role="menuitem"
          >
            <span>Properties</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Taskbar;
