import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SnakeIcon } from './Icons';
import {
  getLeaderboard,
  submitScore,
  subscribeToLeaderboard,
  SnakeScore,
  isSupabaseConfigured,
} from '../utils/supabase';
import './SnakeApp.css';

interface Props {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onFocus?: () => void;
  onScoreSubmitted?: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type GameState = 'NAME_PROMPT' | 'READY' | 'PLAYING' | 'PAUSED' | 'GAMEOVER';

interface Point {
  x: number;
  y: number;
}

const GRID_SIZE = 20; // 20x20 grid
const CELL_SIZE = 15; // 300x300 canvas
const TICK_MS = 120; // Tick interval

const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

export const SnakeApp: React.FC<Props> = ({
  isOpen,
  isMinimized,
  isMaximized,
  isActive,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  onScoreSubmitted,
}) => {
  // Window geometry state
  const [bounds, setBounds] = useState(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
    const taskbarH = 28;
    const defaultW = isMobile
      ? Math.max(280, window.innerWidth - 8)
      : Math.min(460, window.innerWidth - 20);
    const defaultH = isMobile
      ? Math.max(320, window.innerHeight - taskbarH - 12)
      : Math.min(560, window.innerHeight - taskbarH - 40);
    const defaultX = isMobile
      ? 4
      : Math.max(20, Math.floor((window.innerWidth - defaultW) / 2));
    const defaultY = isMobile
      ? 4
      : Math.max(20, Math.floor((window.innerHeight - taskbarH - defaultH) / 2));
    return { x: defaultX, y: defaultY, width: defaultW, height: defaultH };
  });

  // Game state
  const [gameState, setGameState] = useState<GameState>('READY');
  const [activeTab, setActiveTab] = useState<'game' | 'leaderboard'>('game');
  const [playerName, setPlayerName] = useState<string>(() => {
    return (
      (typeof window !== 'undefined' &&
        sessionStorage.getItem('logesh_os_snake_player')) ||
      ''
    );
  });
  const [nameInput, setNameInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('logesh_os_snake_best');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  // Leaderboard data
  const [leaderboard, setLeaderboard] = useState<SnakeScore[]>([]);
  const [lbLoading, setLbLoading] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Snake internal ref state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snakeRef = useRef<Point[]>(INITIAL_SNAKE);
  const dirRef = useRef<Direction>('UP');
  const nextDirRef = useRef<Direction>('UP');
  const foodRef = useRef<Point>({ x: 5, y: 5 });
  const gameLoopTimerRef = useRef<number | null>(null);

  // Check if player name prompt is needed on launch
  useEffect(() => {
    if (isOpen) {
      if (!playerName) {
        setGameState('NAME_PROMPT');
      } else {
        setGameState('READY');
      }
    }
  }, [isOpen, playerName]);

  // Load in-game leaderboard
  const loadLeaderboard = useCallback(async () => {
    setLbLoading(true);
    const res = await getLeaderboard(10);
    setLeaderboard(res.data);
    setLbLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen && activeTab === 'leaderboard') {
      loadLeaderboard();
    }
  }, [isOpen, activeTab, loadLeaderboard]);

  // Subscribe to leaderboard changes
  useEffect(() => {
    if (isOpen) {
      const unsub = subscribeToLeaderboard(() => {
        loadLeaderboard();
      });
      return () => unsub();
    }
  }, [isOpen, loadLeaderboard]);

  // Spawn food at random unoccupied position
  const spawnFood = useCallback((): Point => {
    const occupied = new Set(snakeRef.current.map(p => `${p.x},${p.y}`));
    const emptyCells: Point[] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        if (!occupied.has(`${x},${y}`)) {
          emptyCells.push({ x, y });
        }
      }
    }
    if (emptyCells.length === 0) return { x: 0, y: 0 };
    const randIdx = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randIdx];
  }, []);

  // Render game frame to canvas
  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0a140a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid lines
    ctx.strokeStyle = '#122412';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Food (Retro Red Apple)
    const food = foodRef.current;
    ctx.fillStyle = '#ff2222';
    ctx.fillRect(
      food.x * CELL_SIZE + 1,
      food.y * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    );
    // Apple stem
    ctx.fillStyle = '#00dd00';
    ctx.fillRect(
      food.x * CELL_SIZE + Math.floor(CELL_SIZE / 2),
      food.y * CELL_SIZE - 1,
      2,
      3
    );

    // Snake Body & Head
    const snake = snakeRef.current;
    snake.forEach((segment, idx) => {
      if (idx === 0) {
        // Head
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(
          segment.x * CELL_SIZE + 1,
          segment.y * CELL_SIZE + 1,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
        // Eyes
        ctx.fillStyle = '#000000';
        const eyeOffset = 3;
        ctx.fillRect(
          segment.x * CELL_SIZE + eyeOffset,
          segment.y * CELL_SIZE + eyeOffset,
          2,
          2
        );
        ctx.fillRect(
          segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - 2,
          segment.y * CELL_SIZE + eyeOffset,
          2,
          2
        );
      } else {
        // Body
        ctx.fillStyle = idx % 2 === 0 ? '#00dd00' : '#00bb00';
        ctx.fillRect(
          segment.x * CELL_SIZE + 1,
          segment.y * CELL_SIZE + 1,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
      }
    });
  }, []);

  // Main game tick
  const gameTick = useCallback(() => {
    dirRef.current = nextDirRef.current;
    const dir = dirRef.current;
    const head = snakeRef.current[0];

    const newHead: Point = { ...head };
    if (dir === 'UP') newHead.y -= 1;
    else if (dir === 'DOWN') newHead.y += 1;
    else if (dir === 'LEFT') newHead.x -= 1;
    else if (dir === 'RIGHT') newHead.x += 1;

    // Check Wall Collision
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE
    ) {
      handleGameOver();
      return;
    }

    // Check Self Collision
    const selfHit = snakeRef.current.some(
      seg => seg.x === newHead.x && seg.y === newHead.y
    );
    if (selfHit) {
      handleGameOver();
      return;
    }

    const newSnake = [newHead, ...snakeRef.current];

    // Check Food Collision
    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      // Eat Food
      setScore(prev => {
        const nextScore = prev + 10;
        setBestScore(currBest => {
          if (nextScore > currBest) {
            localStorage.setItem('logesh_os_snake_best', String(nextScore));
            return nextScore;
          }
          return currBest;
        });
        return nextScore;
      });
      foodRef.current = spawnFood();
    } else {
      // Move snake (remove tail)
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    drawGame();
  }, [drawGame, spawnFood]);

  const handleGameOver = () => {
    if (gameLoopTimerRef.current) {
      window.clearInterval(gameLoopTimerRef.current);
      gameLoopTimerRef.current = null;
    }
    setGameState('GAMEOVER');
    setHasSubmitted(false);
    setSubmitStatus(null);
  };

  // Start / Restart game
  const startGame = useCallback(() => {
    if (gameLoopTimerRef.current) {
      window.clearInterval(gameLoopTimerRef.current);
      gameLoopTimerRef.current = null;
    }
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    dirRef.current = 'UP';
    nextDirRef.current = 'UP';
    foodRef.current = spawnFood();
    setScore(0);
    setGameState('PLAYING');
    setHasSubmitted(false);
    setSubmitStatus(null);
    drawGame();

    gameLoopTimerRef.current = window.setInterval(gameTick, TICK_MS);
  }, [drawGame, gameTick, spawnFood]);

  // Pause / Resume
  const togglePause = useCallback(() => {
    if (gameState === 'PLAYING') {
      if (gameLoopTimerRef.current) {
        window.clearInterval(gameLoopTimerRef.current);
        gameLoopTimerRef.current = null;
      }
      setGameState('PAUSED');
    } else if (gameState === 'PAUSED') {
      setGameState('PLAYING');
      gameLoopTimerRef.current = window.setInterval(gameTick, TICK_MS);
    }
  }, [gameState, gameTick]);

  // Handle Player Name Submission
  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed.length >= 3 && trimmed.length <= 16) {
      setPlayerName(trimmed);
      sessionStorage.setItem('logesh_os_snake_player', trimmed);
      setGameState('READY');
    }
  };

  // Handle Score Submission
  const handleSubmitScore = async () => {
    if (hasSubmitted || !playerName) return;
    setSubmitStatus('Submitting score to Leaderboard...');
    const res = await submitScore(playerName, score);
    if (res.success) {
      setHasSubmitted(true);
      setSubmitStatus('Score posted to Hall of Fame!');
      onScoreSubmitted?.();
      loadLeaderboard();
    } else {
      setSubmitStatus(res.error || 'Failed to submit score.');
    }
  };

  // Direction Change Handler (prevents 180° reverse)
  const changeDirection = useCallback((newDir: Direction) => {
    const cur = dirRef.current;
    if (newDir === 'UP' && cur !== 'DOWN') nextDirRef.current = 'UP';
    else if (newDir === 'DOWN' && cur !== 'UP') nextDirRef.current = 'DOWN';
    else if (newDir === 'LEFT' && cur !== 'RIGHT') nextDirRef.current = 'LEFT';
    else if (newDir === 'RIGHT' && cur !== 'LEFT') nextDirRef.current = 'RIGHT';
  }, []);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || isMinimized || !isActive) return;

      if (e.key === 'F2') {
        e.preventDefault();
        startGame();
        return;
      }
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        togglePause();
        return;
      }

      if (gameState !== 'PLAYING') return;

      if (['ArrowUp', 'KeyW', 'w', 'W'].includes(e.code) || e.key === 'ArrowUp') {
        e.preventDefault();
        changeDirection('UP');
      } else if (['ArrowDown', 'KeyS', 's', 'S'].includes(e.code) || e.key === 'ArrowDown') {
        e.preventDefault();
        changeDirection('DOWN');
      } else if (['ArrowLeft', 'KeyA', 'a', 'A'].includes(e.code) || e.key === 'ArrowLeft') {
        e.preventDefault();
        changeDirection('LEFT');
      } else if (['ArrowRight', 'KeyD', 'd', 'D'].includes(e.code) || e.key === 'ArrowRight') {
        e.preventDefault();
        changeDirection('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMinimized, isActive, gameState, startGame, togglePause, changeDirection]);

  // Initial render when game becomes ready
  useEffect(() => {
    if (isOpen && activeTab === 'game') {
      drawGame();
    }
  }, [isOpen, activeTab, drawGame]);

  // Cleanup on unmount or close
  useEffect(() => {
    return () => {
      if (gameLoopTimerRef.current) {
        window.clearInterval(gameLoopTimerRef.current);
        gameLoopTimerRef.current = null;
      }
    };
  }, []);

  // Handle Dragging
  const handleTitlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
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
      const maxX = isMobile
        ? Math.max(0, window.innerWidth - bounds.width)
        : window.innerWidth - 80;
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

  if (!isOpen) return null;

  return (
    <div className="snake-overlay">
      <div
        className={`snake-window ${isMaximized ? 'snake-window--maximized' : ''} ${
          isMinimized ? 'snake-window--minimized' : ''
        }`}
        style={
          isMaximized
            ? {}
            : {
                left: `${bounds.x}px`,
                top: `${bounds.y}px`,
                width: `${bounds.width}px`,
                height: `${bounds.height}px`,
                zIndex: isActive ? 8600 : 8500,
              }
        }
        onPointerDown={onFocus}
      >
        {/* Title Bar */}
        <div className="snake-titlebar" onPointerDown={handleTitlePointerDown}>
          <div className="snake-titlebar-left">
            <SnakeIcon size={16} />
            <span className="snake-title">Snake — Retro Arcade</span>
          </div>
          <div className="snake-titlebar-controls">
            <button
              className="snake-control-btn"
              onClick={e => {
                e.stopPropagation();
                onMinimize();
              }}
              title="Minimize"
              aria-label="Minimize"
            >
              _
            </button>
            <button
              className="snake-control-btn"
              onClick={e => {
                e.stopPropagation();
                onToggleMaximize();
              }}
              title={isMaximized ? 'Restore' : 'Maximize'}
              aria-label="Maximize"
            >
              □
            </button>
            <button
              className="snake-control-btn"
              onClick={e => {
                e.stopPropagation();
                onClose();
              }}
              title="Close"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="snake-menubar">
          <button className="snake-menu-btn" onClick={startGame}>
            New Game (F2)
          </button>
          <button
            className="snake-menu-btn"
            onClick={togglePause}
            disabled={gameState !== 'PLAYING' && gameState !== 'PAUSED'}
          >
            {gameState === 'PAUSED' ? 'Resume (P)' : 'Pause (P)'}
          </button>
          <button
            className="snake-menu-btn"
            onClick={() => setActiveTab(prev => (prev === 'game' ? 'leaderboard' : 'game'))}
          >
            {activeTab === 'game' ? 'Leaderboard' : 'Back to Game'}
          </button>
          <button
            className="snake-menu-btn"
            onClick={() => {
              setNameInput(playerName);
              setGameState('NAME_PROMPT');
            }}
          >
            Change Player
          </button>
        </div>

        {/* Score Header */}
        <div className="snake-score-header">
          <div className="snake-lcd-panel">
            <span>SCORE:</span>
            <span className="snake-lcd-display">
              {String(score).padStart(4, '0')}
            </span>
          </div>

          <button
            className="snake-btn-action"
            onClick={startGame}
          >
            {gameState === 'PLAYING' ? 'Restart' : 'Play (F2)'}
          </button>

          <div className="snake-lcd-panel">
            <span>BEST:</span>
            <span className="snake-lcd-display">
              {String(bestScore).padStart(4, '0')}
            </span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div style={{ padding: '0 8px', marginTop: '6px' }}>
          <div className="snake-tab-bar">
            <button
              className={`snake-tab ${activeTab === 'game' ? 'snake-tab--active' : ''}`}
              onClick={() => setActiveTab('game')}
            >
              Game Board
            </button>
            <button
              className={`snake-tab ${activeTab === 'leaderboard' ? 'snake-tab--active' : ''}`}
              onClick={() => setActiveTab('leaderboard')}
            >
              Global Leaderboard (Top 10)
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="snake-main-body">
          {activeTab === 'game' ? (
            <>
              {/* Canvas Frame */}
              <div className="snake-board-frame">
                <canvas
                  ref={canvasRef}
                  width={GRID_SIZE * CELL_SIZE}
                  height={GRID_SIZE * CELL_SIZE}
                  className="snake-canvas"
                />

                {/* Overlays */}
                {gameState === 'NAME_PROMPT' && (
                  <div className="snake-board-overlay">
                    <h3 className="snake-overlay-title">SNAKE ARCADE</h3>
                    <p style={{ color: '#dfdfdf', fontSize: '11px', margin: 0 }}>
                      Enter your arcade handle (3-16 chars):
                    </p>
                    <form onSubmit={handleSaveName} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        className="snake-name-input"
                        maxLength={16}
                        placeholder="PLAYER 1"
                        value={nameInput}
                        onChange={e => setNameInput(e.target.value)}
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="snake-btn-action"
                        disabled={nameInput.trim().length < 3}
                      >
                        Start Game
                      </button>
                    </form>
                  </div>
                )}

                {gameState === 'PAUSED' && (
                  <div className="snake-board-overlay">
                    <h3 className="snake-overlay-title">GAME PAUSED</h3>
                    <p style={{ color: '#ffffff', fontSize: '11px' }}>Press 'P' or Resume to continue</p>
                    <button className="snake-btn-action" onClick={togglePause}>
                      Resume Game
                    </button>
                  </div>
                )}

                {gameState === 'GAMEOVER' && (
                  <div className="snake-board-overlay">
                    <h3 className="snake-overlay-title" style={{ color: '#ff3333' }}>
                      GAME OVER
                    </h3>
                    <p className="snake-overlay-score">
                      Final Score: <strong>{score}</strong>
                    </p>

                    {submitStatus ? (
                      <div className="snake-submit-status">{submitStatus}</div>
                    ) : (
                      <button
                        className="snake-btn-action"
                        onClick={handleSubmitScore}
                        disabled={hasSubmitted || !playerName}
                      >
                        Submit Score
                      </button>
                    )}

                    <button
                      className="snake-btn-action"
                      style={{ marginTop: '6px' }}
                      onClick={startGame}
                    >
                      Play Again (F2)
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Touch D-Pad */}
              <div
                className="snake-touch-controls"
                onTouchStart={e => e.stopPropagation()}
              >
                <div className="snake-dpad-row">
                  <button
                    className="snake-dpad-btn"
                    onPointerDown={e => {
                      e.preventDefault();
                      changeDirection('UP');
                    }}
                    aria-label="Up"
                  >
                    ▲
                  </button>
                </div>
                <div className="snake-dpad-row">
                  <button
                    className="snake-dpad-btn"
                    onPointerDown={e => {
                      e.preventDefault();
                      changeDirection('LEFT');
                    }}
                    aria-label="Left"
                  >
                    ◀
                  </button>
                  <button
                    className="snake-dpad-btn"
                    onPointerDown={e => {
                      e.preventDefault();
                      changeDirection('DOWN');
                    }}
                    aria-label="Down"
                  >
                    ▼
                  </button>
                  <button
                    className="snake-dpad-btn"
                    onPointerDown={e => {
                      e.preventDefault();
                      changeDirection('RIGHT');
                    }}
                    aria-label="Right"
                  >
                    ▶
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Leaderboard Panel */
            <div className="snake-leaderboard-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Global Top 10</span>
                <button className="snake-btn-action" onClick={loadLeaderboard} style={{ fontSize: '10px' }}>
                  Refresh
                </button>
              </div>

              {lbLoading ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading scores...</div>
              ) : !isSupabaseConfigured() ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                  Leaderboard offline (Supabase credentials not configured).
                </div>
              ) : leaderboard.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No scores submitted yet.</div>
              ) : (
                <table className="snake-lb-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Player</th>
                      <th style={{ textAlign: 'right' }}>Score</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td className="snake-lb-rank">#{idx + 1}</td>
                        <td style={{ fontWeight: item.player_name === playerName ? 'bold' : 'normal' }}>
                          {item.player_name}
                        </td>
                        <td className="snake-lb-score">{item.score}</td>
                        <td style={{ color: '#666', fontSize: '10px' }}>
                          {item.created_at ? new Date(item.created_at).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="snake-statusbar">
          <div className="snake-status-cell snake-status-cell--player">
            Player: {playerName || '(None)'}
          </div>
          <div className="snake-status-cell snake-status-cell--main">
            {gameState === 'PLAYING'
              ? 'Playing — Use Arrow keys or WASD'
              : gameState === 'PAUSED'
              ? 'Paused'
              : gameState === 'GAMEOVER'
              ? 'Game Over — Click Submit or Play Again'
              : 'Press F2 or Play to begin'}
          </div>
          <div className="snake-status-cell">
            Grid: 20x20
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeApp;
