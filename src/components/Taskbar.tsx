import React, { useState, useEffect, useCallback } from 'react';
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

  // Audio mute
  soundMuted?: boolean;
  onToggleMute?: () => void;

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

  const isMuted = soundMutedProp !== undefined ? soundMutedProp : localMuted;

  // Update clock and date every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
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
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Play audio feedback when unmuting
  const playUnmuteChime = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
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
      playUnmuteChime();
    }
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

  return (
    <div className="taskbar win-raised" role="toolbar" aria-label="Taskbar">
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
        <div className="taskbar__quicklaunch-gripper" title="Quick Launch" />
        <button
          className="taskbar__quicklaunch-btn taskbar__quicklaunch-btn--show-desktop"
          onClick={onShowDesktop}
          title="Show Desktop"
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
        {/* Network Status Icon */}
        <span
          className="taskbar__tray-icon"
          title="Local Area Connection&#10;Speed: 100.0 Mbps&#10;Status: Connected"
          aria-label="Network status: Connected"
          tabIndex={0}
        >
          <NetworkIcon size={14} active={true} />
        </span>

        {/* Volume / Speaker Icon */}
        <button
          className="taskbar__tray-icon taskbar__tray-btn"
          onClick={handleMuteToggle}
          title={isMuted ? 'Volume: Muted (Click to enable audio)' : 'Volume: Sound FX On (Click to mute)'}
          aria-label={isMuted ? 'Volume muted' : 'Volume active'}
        >
          {isMuted ? <SpeakerMutedIcon size={14} /> : <SpeakerIcon size={14} />}
        </button>

        {/* Date and Clock */}
        <div
          className="taskbar__datetime"
          title={fullDate}
          aria-label={`Current time ${time}, Date ${dateStr}`}
        >
          <span className="taskbar__date">{dateStr}</span>
          <time className="taskbar__clock">{time}</time>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
