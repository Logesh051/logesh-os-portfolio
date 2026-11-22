import React, { useEffect, useState, useCallback } from 'react';
import { getLeaderboard, subscribeToLeaderboard, SnakeScore } from '../utils/supabase';
import './SnakeHallOfFame.css';

interface Props {
  onOpenSnake: () => void;
  refreshTrigger?: number;
}

export const SnakeHallOfFame: React.FC<Props> = ({ onOpenSnake, refreshTrigger = 0 }) => {
  const [scores, setScores] = useState<SnakeScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isConfigured, setIsConfigured] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchScores = useCallback(async () => {
    setLoading(true);
    const res = await getLeaderboard(5);
    setIsConfigured(res.configured);
    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setErrorMessage(null);
      setScores(res.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchScores();

    // Subscribe to realtime updates from Supabase
    const unsubscribe = subscribeToLeaderboard(() => {
      fetchScores();
    });

    return () => {
      unsubscribe();
    };
  }, [fetchScores, refreshTrigger]);

  return (
    <div
      className="snake-hof-widget"
      onClick={onOpenSnake}
      onDoubleClick={onOpenSnake}
      title="Click or double-click to play Snake.exe"
      role="region"
      aria-label="Snake Hall of Fame Leaderboard"
    >
      <div className="snake-hof-titlebar">
        <div className="snake-hof-titlebar-left">
          <span>🏆 HALL OF FAME</span>
        </div>
        <div className="snake-hof-live-badge">
          <span className="snake-hof-live-dot" />
          <span>LIVE</span>
        </div>
      </div>

      <div className="snake-hof-body">
        {loading ? (
          <div className="snake-hof-loading">Loading top scores...</div>
        ) : !isConfigured ? (
          <div className="snake-hof-error">
            <div>Database Offline</div>
            <div style={{ fontSize: '9px', marginTop: '2px', color: '#888' }}>
              Set Supabase keys
            </div>
          </div>
        ) : errorMessage ? (
          <div className="snake-hof-error">Error loading scores</div>
        ) : scores.length === 0 ? (
          <div className="snake-hof-empty">No high scores yet!</div>
        ) : (
          <table className="snake-hof-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th className="score-col">Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s, idx) => (
                <tr key={s.id || idx}>
                  <td className={`snake-hof-rank snake-hof-rank--${idx + 1}`}>
                    #{idx + 1}
                  </td>
                  <td className="snake-hof-name" title={s.player_name}>
                    {s.player_name}
                  </td>
                  <td className="snake-hof-score">{s.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="snake-hof-footer">
        <span className="snake-hof-prompt">Can you beat the high score?</span>
        <span className="snake-hof-play-hint">Click to launch Snake.exe</span>
      </div>
    </div>
  );
};

export default SnakeHallOfFame;
