import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CameraIcon } from './Icons';
import './CameraApp.css';

export type FilterType = 'original' | 'webcam2000' | 'vintage' | 'monochrome' | 'vhs' | 'sepia';

interface FilterOption {
  id: FilterType;
  label: string;
  tagline: string;
  css: string;
}

export const FILTERS: FilterOption[] = [
  {
    id: 'original',
    label: 'Original Webcam',
    tagline: 'Natural camera feed',
    css: 'none',
  },
  {
    id: 'webcam2000',
    label: '2000s Webcam',
    tagline: 'Soft focus and pixel grain',
    css: 'contrast(1.18) brightness(1.08) saturate(0.85) blur(0.4px)',
  },
  {
    id: 'vintage',
    label: 'Vintage 1990s',
    tagline: 'Warm faded colours',
    css: 'sepia(0.35) saturate(1.25) contrast(0.95) hue-rotate(-15deg)',
  },
  {
    id: 'monochrome',
    label: 'Monochrome',
    tagline: 'Classic black and white',
    css: 'grayscale(1) contrast(1.3) brightness(0.95)',
  },
  {
    id: 'vhs',
    label: 'VHS Tape',
    tagline: 'Scanlines and colour shift',
    css: 'contrast(1.25) saturate(1.4) hue-rotate(5deg)',
  },
  {
    id: 'sepia',
    label: 'Sepia Tone',
    tagline: 'Warm brown photograph',
    css: 'sepia(0.85) contrast(1.1) brightness(0.92)',
  },
];

interface Props {
  onClose: () => void;
  isActive?: boolean;
  onFocus?: () => void;
  onMinimize?: () => void;
}

const CameraApp: React.FC<Props> = ({ onClose, isActive = true, onFocus, onMinimize }) => {
  const [cameraState, setCameraState] = useState<'starting' | 'active' | 'captured' | 'error' | 'demo'>('starting');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('webcam2000');
  const [countdownEnabled, setCountdownEnabled] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [flashActive, setFlashActive] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('Initializing video capture device...');
  const [activeMenu, setActiveMenu] = useState<'file' | 'camera' | 'filters' | 'help' | null>(null);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // Window geometry state for restored/floating mode
  const [isMaximized, setIsMaximized] = useState(false);
  const [systemMenuOpen, setSystemMenuOpen] = useState(false);
  const lastIconClickRef = useRef<number>(0);

  const [bounds, setBounds] = useState(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
    const isSmall = typeof window !== 'undefined' && window.innerWidth < 900;
    const taskbarH = 28;
    const defaultW = isMobile
      ? Math.max(280, window.innerWidth - 8)
      : isSmall
      ? Math.max(340, window.innerWidth - 30)
      : Math.min(760, window.innerWidth - 60);
    const defaultH = isMobile
      ? Math.max(320, window.innerHeight - taskbarH - 12)
      : isSmall
      ? Math.max(320, window.innerHeight - 80)
      : Math.min(560, window.innerHeight - 80);
    const defaultX = isMobile ? 4 : Math.max(20, Math.floor((window.innerWidth - defaultW) / 2));
    const defaultY = isMobile ? 4 : Math.max(20, Math.floor((window.innerHeight - taskbarH - defaultH) / 2));
    return {
      x: defaultX,
      y: defaultY,
      width: defaultW,
      height: defaultH,
    };
  });

  const prevBoundsRef = useRef(bounds);

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

  // Handle Title Bar Dragging
  const handleTitlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, .win-system-menu, .camera-dropdown')) return;
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
      const maxY = window.innerHeight - taskbarHeight - 24;

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

  // Handle Resizing from 8 directions
  const handleResizeStart = (e: React.PointerEvent, dir: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw') => {
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
      const minH = Math.min(260, window.innerHeight - taskbarHeight - 12);

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

  const handleToggleMaximize = useCallback(() => {
    setIsMaximized(prev => !prev);
  }, []);

  const handleTitleDoubleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, .win-system-menu, .camera-dropdown')) return;
    handleToggleMaximize();
  };

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

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Play retro mechanical shutter sound
  const playShutterSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Click 1: mirror up noise burst
      const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.035), ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 850;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.035);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);

      // Click 2: shutter curtain close (50ms later)
      const noise2 = ctx.createBufferSource();
      noise2.buffer = noiseBuffer;
      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.45, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.085);
      noise2.connect(filter);
      filter.connect(gain2);
      gain2.connect(ctx.destination);
      noise2.start(now + 0.05);
    } catch {
      // Audio autoplay policy catch
    }
  }, []);

  // Play countdown beep
  const playBeep = useCallback((freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio catch
    }
  }, []);

  // Stop all camera tracks
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Draw retro color bars demo pattern
  const drawDemoPattern = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = ['#ffffff', '#ffff00', '#00ffff', '#00ff00', '#ff00ff', '#ff0000', '#0000ff'];
    const barWidth = width / colors.length;
    colors.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(i * barWidth, 0, barWidth, height * 0.72);
    });
    // Bottom alignment bars
    ctx.fillStyle = '#000080';
    ctx.fillRect(0, height * 0.72, width * 0.25, height * 0.28);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(width * 0.25, height * 0.72, width * 0.25, height * 0.28);
    ctx.fillStyle = '#404040';
    ctx.fillRect(width * 0.5, height * 0.72, width * 0.25, height * 0.28);
    ctx.fillStyle = '#101010';
    ctx.fillRect(width * 0.75, height * 0.72, width * 0.25, height * 0.28);

    // Center title box
    const boxW = Math.min(width * 0.82, 380);
    const boxH = 46;
    const boxX = (width - boxW) / 2;
    const boxY = height * 0.32;
    ctx.fillStyle = '#000000';
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    ctx.font = 'bold 13px Tahoma, "MS Sans Serif", sans-serif';
    ctx.fillStyle = '#ffff00';
    ctx.textAlign = 'center';
    ctx.fillText('CAMERA.EXE — TEST PATTERN DEMO', width / 2, boxY + 28);
    ctx.textAlign = 'left';
  }, []);

  // Start live webcam stream
  const startCamera = useCallback(async () => {
    stopCamera();
    setCameraState('starting');
    setStatusText('Requesting camera access...');
    setErrorMessage('');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraState('error');
      setErrorMessage('Your web browser does not support the MediaDevices webcam API.');
      setStatusText('Device Error: getUserMedia unsupported');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
          setCameraState('active');
          setStatusText('Camera Active: 640x480 (Live Feed)');
        };
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.warn('Webcam access error:', error);
      let msg = 'Camera device not accessible.';
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        msg = 'Camera permission was denied. Please allow camera access in browser settings.';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        msg = 'No physical webcam detected on this device.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        msg = 'Camera is already in use by another application.';
      }
      setErrorMessage(msg);
      setCameraState('error');
      setStatusText(`Error: ${error.name || 'Access failed'}`);
    }
  }, [stopCamera]);

  // Activate demo mode
  const activateDemoMode = useCallback(() => {
    stopCamera();
    setCameraState('demo');
    setStatusText('Demo Mode: SMPTE Color Bars (No camera required)');
  }, [stopCamera]);

  // Capture current frame
  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = video && video.videoWidth > 0 ? video.videoWidth : 640;
    const height = video && video.videoHeight > 0 ? video.videoHeight : 480;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentFilter = FILTERS.find(f => f.id === selectedFilter) || FILTERS[0];

    ctx.save();
    if (currentFilter.css !== 'none') {
      ctx.filter = currentFilter.css;
    }

    if (cameraState === 'demo' || !video || video.readyState < 2) {
      drawDemoPattern(ctx, width, height);
    } else {
      // Mirror horizontally for natural selfie booth perspective
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, width, height);
    }
    ctx.restore();

    // VHS scanlines layer
    if (selectedFilter === 'vhs') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 2);
      }
    }

    // Classic nostalgic bottom-right yellow timestamp
    ctx.font = 'bold 13px "Courier New", Courier, monospace';
    ctx.fillStyle = '#ffea00';
    ctx.shadowColor = '#000000';
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    ctx.fillText(dateStr, width - 170, height - 14);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
    setCameraState('captured');
    setStatusText(`Captured Photograph (${width}x${height})`);

    // Flash screen effect
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 140);

    if (soundEnabled) {
      playShutterSound();
    }
  }, [cameraState, drawDemoPattern, playShutterSound, selectedFilter, soundEnabled]);

  // Handle Take Photo button click (with countdown)
  const handleTakePhotoClick = useCallback(() => {
    if (countdownEnabled) {
      setCountdown(3);
      if (soundEnabled) playBeep(880);

      let currentSec = 3;
      const interval = setInterval(() => {
        currentSec -= 1;
        if (currentSec > 0) {
          setCountdown(currentSec);
          if (soundEnabled) playBeep(880);
        } else {
          clearInterval(interval);
          setCountdown(null);
          if (soundEnabled) playBeep(1760);
          captureFrame();
        }
      }, 1000);
    } else {
      captureFrame();
    }
  }, [captureFrame, countdownEnabled, playBeep, soundEnabled]);

  // Handle Save Photo download
  const handleSavePhoto = useCallback(() => {
    if (!capturedImage) return;
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const filename = `LOGESH_OS_Photo_${year}-${month}-${day}.jpg`;

    const link = document.createElement('a');
    link.download = filename;
    link.href = capturedImage;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setStatusText(`Saved photograph to disk: ${filename}`);
  }, [capturedImage]);

  // Handle Retake action
  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    if (streamRef.current) {
      setCameraState('active');
      setStatusText('Camera Active: 640x480 (Live Feed)');
    } else {
      startCamera();
    }
  }, [startCamera]);

  // On mount: start camera; on unmount: stop camera tracks
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;
      if (e.key === 'Escape') {
        if (showHelpModal) {
          setShowHelpModal(false);
        } else if (activeMenu) {
          setActiveMenu(null);
        } else if (systemMenuOpen) {
          setSystemMenuOpen(false);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, showHelpModal, activeMenu, systemMenuOpen]);

  const currentFilterObj = FILTERS.find(f => f.id === selectedFilter) || FILTERS[0];

  const windowStyle: React.CSSProperties = isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 28px)',
        zIndex: isActive ? 5020 : 5005,
      }
    : {
        position: 'fixed',
        left: `${bounds.x}px`,
        top: `${bounds.y}px`,
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
        zIndex: isActive ? 5020 : 5005,
      };

  return (
    <div
      className={`camera-window win-raised ${isMaximized ? 'camera-window--maximized' : 'camera-window--normal'} ${
        isActive ? 'camera-window--active' : 'camera-window--inactive'
      }`}
      style={windowStyle}
      ref={windowRef}
      onPointerDown={onFocus}
      role="dialog"
      aria-label="Camera — Retro Photo Booth"
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

      {/* Title Bar */}
      <div
        className="camera-titlebar"
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={handleTitleDoubleClick}
      >
        <div className="camera-titlebar-left">
          <div
            className="camera-titlebar-icon-btn"
            onClick={handleIconClick}
            title="Window Menu (Alt+Space) · Double-click to close"
          >
            <CameraIcon size={14} />
          </div>
          <span className="camera-title">Camera — Retro Photo Booth</span>
        </div>

        {/* System Menu Dropdown */}
        {systemMenuOpen && (
          <div className="win-system-menu win-raised" onClick={e => e.stopPropagation()}>
            <div
              className={`win-system-menu-item ${!isMaximized ? 'win-system-menu-item--disabled' : ''}`}
              onClick={() => {
                if (isMaximized) handleToggleMaximize();
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
                onMinimize?.();
                setSystemMenuOpen(false);
              }}
            >
              <span>Mi<u>n</u>imize</span>
            </div>
            <div
              className={`win-system-menu-item ${isMaximized ? 'win-system-menu-item--disabled' : ''}`}
              onClick={() => {
                if (!isMaximized) handleToggleMaximize();
                setSystemMenuOpen(false);
              }}
            >
              <span>Ma<u>x</u>imize</span>
            </div>
            <div className="win-system-menu-separator" />
            <div
              className="win-system-menu-item"
              onClick={() => {
                setSystemMenuOpen(false);
                onClose();
              }}
            >
              <span><u>C</u>lose</span>
              <span className="win-system-menu-shortcut">Alt+F4</span>
            </div>
          </div>
        )}

        {/* Window Titlebar Controls: Minimize, Maximize / Restore, Close */}
        <div className="camera-titlebar-controls">
          <button
            className="camera-control-btn win-raised"
            onClick={onMinimize}
            aria-label="Minimize"
            title="Minimize"
          >
            <svg viewBox="0 0 10 10" width="10" height="10">
              <rect x="1" y="7" width="8" height="2" fill="#000000" />
            </svg>
          </button>
          <button
            className="camera-control-btn win-raised"
            onClick={handleToggleMaximize}
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
            className="camera-control-btn camera-control-btn--close win-raised"
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

        {/* Menu Bar */}
        <div className="camera-menubar" onClick={() => activeMenu && setActiveMenu(null)}>
          <div className="camera-menu-item">
            <button
              className={`camera-menu-btn ${activeMenu === 'file' ? 'camera-menu-btn--active' : ''}`}
              onClick={() => setActiveMenu(prev => prev === 'file' ? null : 'file')}
            >
              <u>F</u>ile
            </button>
            {activeMenu === 'file' && (
              <div className="camera-dropdown win-raised">
                <div
                  className={`camera-dropdown-item ${!capturedImage ? 'camera-dropdown-item--disabled' : ''}`}
                  onClick={() => {
                    if (capturedImage) {
                      handleSavePhoto();
                      setActiveMenu(null);
                    }
                  }}
                >
                  <span>Save Photo...</span>
                  <span className="camera-dropdown-shortcut">Ctrl+S</span>
                </div>
                <div className="camera-dropdown-separator" />
                <div
                  className="camera-dropdown-item"
                  onClick={() => {
                    setActiveMenu(null);
                    onClose();
                  }}
                >
                  <span>Exit</span>
                  <span className="camera-dropdown-shortcut">Esc</span>
                </div>
              </div>
            )}
          </div>

          <div className="camera-menu-item">
            <button
              className={`camera-menu-btn ${activeMenu === 'camera' ? 'camera-menu-btn--active' : ''}`}
              onClick={() => setActiveMenu(prev => prev === 'camera' ? null : 'camera')}
            >
              <u>C</u>amera
            </button>
            {activeMenu === 'camera' && (
              <div className="camera-dropdown win-raised">
                <div
                  className={`camera-dropdown-item ${cameraState === 'captured' ? 'camera-dropdown-item--disabled' : ''}`}
                  onClick={() => {
                    if (cameraState !== 'captured') {
                      handleTakePhotoClick();
                      setActiveMenu(null);
                    }
                  }}
                >
                  <span>Take Photo</span>
                  <span className="camera-dropdown-shortcut">Space</span>
                </div>
                <div
                  className={`camera-dropdown-item ${!capturedImage ? 'camera-dropdown-item--disabled' : ''}`}
                  onClick={() => {
                    if (capturedImage) {
                      handleRetake();
                      setActiveMenu(null);
                    }
                  }}
                >
                  <span>Retake Photo</span>
                </div>
                <div className="camera-dropdown-separator" />
                <div
                  className="camera-dropdown-item"
                  onClick={() => {
                    startCamera();
                    setActiveMenu(null);
                  }}
                >
                  <span>Restart Camera</span>
                </div>
                <div
                  className="camera-dropdown-item"
                  onClick={() => {
                    activateDemoMode();
                    setActiveMenu(null);
                  }}
                >
                  <span>Test Pattern Demo Mode</span>
                </div>
              </div>
            )}
          </div>

          <div className="camera-menu-item">
            <button
              className={`camera-menu-btn ${activeMenu === 'filters' ? 'camera-menu-btn--active' : ''}`}
              onClick={() => setActiveMenu(prev => prev === 'filters' ? null : 'filters')}
            >
              <u>F</u>ilters
            </button>
            {activeMenu === 'filters' && (
              <div className="camera-dropdown win-raised">
                {FILTERS.map(f => (
                  <div
                    key={f.id}
                    className={`camera-dropdown-item ${selectedFilter === f.id ? 'camera-dropdown-item--checked' : ''}`}
                    onClick={() => {
                      setSelectedFilter(f.id);
                      setActiveMenu(null);
                    }}
                  >
                    <span className="camera-dropdown-check">{selectedFilter === f.id ? '✓' : ''}</span>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="camera-menu-item">
            <button
              className={`camera-menu-btn ${activeMenu === 'help' ? 'camera-menu-btn--active' : ''}`}
              onClick={() => setActiveMenu(prev => prev === 'help' ? null : 'help')}
            >
              <u>H</u>elp
            </button>
            {activeMenu === 'help' && (
              <div className="camera-dropdown win-raised">
                <div
                  className="camera-dropdown-item"
                  onClick={() => {
                    setShowHelpModal(true);
                    setActiveMenu(null);
                  }}
                >
                  <span>About Retro Photo Booth...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Application Body */}
        <div className="camera-body">
          {/* Left Column: Viewfinder & Preview */}
          <div className="camera-viewfinder-pane">
            <div className="camera-screen win-sunken">
              {/* Live Video Feed */}
              <video
                ref={videoRef}
                className={`camera-video ${cameraState === 'captured' ? 'camera-video--hidden' : ''} ${selectedFilter === 'vhs' ? 'camera-video--vhs' : ''}`}
                style={{ filter: currentFilterObj.css }}
                playsInline
                muted
              />

              {/* VHS Scanlines Overlay */}
              {selectedFilter === 'vhs' && cameraState !== 'error' && (
                <div className="camera-scanlines" />
              )}

              {/* REC Indicator for Live Webcam Feed */}
              {cameraState === 'active' && !capturedImage && (
                <div className="camera-rec-badge" aria-label="Recording live feed">
                  <span className="camera-rec-dot" />
                  <span className="camera-rec-text">REC</span>
                </div>
              )}

              {/* Demo Test Pattern Display */}
              {cameraState === 'demo' && !capturedImage && (
                <div className="camera-demo-screen">
                  <div className="camera-demo-bars">
                    {['#ffffff', '#ffff00', '#00ffff', '#00ff00', '#ff00ff', '#ff0000', '#0000ff'].map(c => (
                      <div key={c} style={{ background: c }} />
                    ))}
                  </div>
                  <div className="camera-demo-badge win-raised">
                    <span>TEST PATTERN (DEMO ACTIVE)</span>
                  </div>
                </div>
              )}

              {/* Captured Photo Display */}
              {capturedImage && (
                <img
                  src={capturedImage}
                  alt="Captured retro selfie"
                  className="camera-captured-img"
                />
              )}

              {/* Flash Overlay */}
              {flashActive && <div className="camera-flash" />}

              {/* Countdown Numbers */}
              {countdown !== null && (
                <div className="camera-countdown" key={countdown}>
                  <span>{countdown}</span>
                </div>
              )}

              {/* Error & Permission Denied State */}
              {cameraState === 'error' && !capturedImage && (
                <div className="camera-error-view">
                  <div className="camera-error-box win-raised">
                    <div className="camera-error-icon">⚠️</div>
                    <div className="camera-error-text">
                      <strong>Video Device Unavailable</strong>
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                  <div className="camera-error-actions">
                    <button className="camera-btn win-raised" onClick={startCamera}>
                      Retry Camera
                    </button>
                    <button className="camera-btn win-raised" onClick={activateDemoMode}>
                      Use Demo Pattern
                    </button>
                  </div>
                </div>
              )}

              {/* Hidden Canvas for Frame Capture */}
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>

            {/* Viewfinder Caption Banner */}
            <div className="camera-viewfinder-caption">
              <span className="camera-viewfinder-status-text">
                {capturedImage ? `Photo Captured: ${currentFilterObj.label}` : `Live Feed: ${currentFilterObj.label}`}
              </span>
              <span className="camera-format-tag">640×480 · 4:3</span>
            </div>
          </div>

          {/* Right Column: Controls & Filters */}
          <div className="camera-controls-pane">
            {/* Status Panel */}
            <fieldset className="camera-groupbox">
              <legend className="camera-legend">Device Status</legend>
              <div className="camera-status-row">
                <span
                  className={`camera-led ${
                    cameraState === 'active'
                      ? 'camera-led--active'
                      : cameraState === 'captured'
                      ? 'camera-led--captured'
                      : cameraState === 'demo'
                      ? 'camera-led--demo'
                      : 'camera-led--error'
                  }`}
                />
                <span className="camera-status-label">
                  {cameraState === 'active' && 'Webcam Online (Live)'}
                  {cameraState === 'captured' && 'Photo Captured'}
                  {cameraState === 'demo' && 'Demo Generator'}
                  {cameraState === 'starting' && 'Connecting...'}
                  {cameraState === 'error' && 'Device Offline'}
                </span>
              </div>
            </fieldset>

            {/* Filter Selection Panel */}
            <fieldset className="camera-groupbox">
              <legend className="camera-legend">Retro Camera Filters</legend>
              <div className="camera-filter-list" role="radiogroup" aria-label="Camera Filters">
                {FILTERS.map(f => (
                  <label
                    key={f.id}
                    className={`camera-filter-option ${selectedFilter === f.id ? 'camera-filter-option--selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="camera-filter"
                      value={f.id}
                      checked={selectedFilter === f.id}
                      onChange={() => setSelectedFilter(f.id)}
                    />
                    <div className="camera-filter-text">
                      <span className="camera-filter-name">{f.label}</span>
                      <span className="camera-filter-tagline">{f.tagline}</span>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Capture Options Panel */}
            <fieldset className="camera-groupbox">
              <legend className="camera-legend">Options</legend>
              <div className="camera-options-list">
                <label className="camera-checkbox-row">
                  <input
                    type="checkbox"
                    checked={countdownEnabled}
                    onChange={e => setCountdownEnabled(e.target.checked)}
                  />
                  <span>3-second countdown timer</span>
                </label>
                <label className="camera-checkbox-row">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={e => setSoundEnabled(e.target.checked)}
                  />
                  <span>Shutter sound effect</span>
                </label>
              </div>
            </fieldset>

            {/* Primary Action Buttons */}
            <div className="camera-actions">
              {!capturedImage ? (
                <button
                  className="camera-primary-btn win-raised"
                  onClick={handleTakePhotoClick}
                  disabled={cameraState === 'starting' || countdown !== null}
                  title="Capture current webcam frame"
                >
                  <span className="camera-btn-icon">📷</span>
                  <span className="camera-btn-text">
                    {countdown !== null ? `Snapping in ${countdown}...` : 'Take Photo'}
                  </span>
                </button>
              ) : (
                <div className="camera-action-split">
                  <button
                    className="camera-btn camera-btn--retake win-raised"
                    onClick={handleRetake}
                    title="Discard photograph and return to live video"
                  >
                    ↺ Retake
                  </button>
                  <button
                    className="camera-btn camera-btn--save camera-btn--primary-save win-raised"
                    onClick={handleSavePhoto}
                    title="Download photograph to disk"
                  >
                    💾 Save Photo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="camera-statusbar">
          <div className="camera-status-pane camera-status-pane--msg win-sunken">
            <span>{statusText}</span>
          </div>
          <div className="camera-status-pane camera-status-pane--privacy win-sunken">
            <span className="camera-privacy-lock">🔒</span>
            <span>100% Local (Zero Uploads)</span>
          </div>
        </div>

        {/* Help / About Modal Dialog */}
        {showHelpModal && (
          <div className="camera-modal-overlay" onClick={() => setShowHelpModal(false)}>
            <div className="camera-help-dialog win-raised" onClick={e => e.stopPropagation()}>
              <div className="camera-help-titlebar">
                <span>About Camera.exe</span>
                <button className="camera-close-btn win-raised" onClick={() => setShowHelpModal(false)}>
                  ✕
                </button>
              </div>
              <div className="camera-help-body">
                <div className="camera-help-header">
                  <CameraIcon size={32} />
                  <div>
                    <strong>Camera — Retro Photo Booth</strong>
                    <div className="camera-help-version">Version 1.0 (Build 2026.11)</div>
                  </div>
                </div>
                <p>
                  A nostalgic early-2000s desktop photo booth simulating classic low-resolution PC webcams.
                </p>
                <fieldset className="camera-groupbox">
                  <legend className="camera-legend">Privacy Guarantee</legend>
                  <p className="camera-privacy-note">
                    All video processing occurs entirely within your local browser sandbox using the HTML5 Canvas API. Photographs are never uploaded to any remote server or persistent storage.
                  </p>
                </fieldset>
                <div className="camera-help-footer">
                  <button className="camera-btn win-raised" onClick={() => setShowHelpModal(false)}>
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default CameraApp;
