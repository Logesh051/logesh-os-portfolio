import React, { useEffect, useRef } from 'react';
import { CameraIcon } from './Icons';
import './ComingSoonDialog.css';

interface Props {
  onClose: () => void;
}

const ComingSoonDialog: React.FC<Props> = ({ onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div
        className="coming-soon-dialog win-raised"
        ref={dialogRef}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Camera - Coming Soon"
        aria-modal="true"
      >
        <div className="coming-soon-dialog__titlebar">
          <div className="coming-soon-dialog__titlebar-left">
            <CameraIcon size={14} />
            <span className="coming-soon-dialog__title">Camera.exe</span>
          </div>
          <button
            className="coming-soon-dialog__close-btn win-raised"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 10 10" width="10" height="10">
              <line x1="1" y1="1" x2="9" y2="9" stroke="#000000" strokeWidth="1.5"/>
              <line x1="9" y1="1" x2="1" y2="9" stroke="#000000" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>

        <div className="coming-soon-dialog__content">
          <div className="coming-soon-dialog__icon">
            <CameraIcon size={48} />
          </div>
          <div className="coming-soon-dialog__text">
            <h3 className="coming-soon-dialog__heading">Coming Soon</h3>
            <p className="coming-soon-dialog__description">
              The interactive Camera feature is planned for a future update.
              Check back later for live preview, photo capture, and more.
            </p>
          </div>
        </div>

        <div className="coming-soon-dialog__footer">
          <button
            className="coming-soon-dialog__ok-btn win-raised"
            onClick={onClose}
            ref={closeButtonRef}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonDialog;
