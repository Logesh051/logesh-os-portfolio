import React, { useState, useEffect, useRef } from 'react';
import { RunIcon } from './Icons';
import './RunDialog.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onExecute: (command: string) => boolean;
}

const RunDialog: React.FC<Props> = ({ isOpen, onClose, onExecute }) => {
  const [command, setCommand] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setCommand('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const currentVal = inputRef.current ? inputRef.current.value : command;
    const trimmed = (currentVal || command).trim();
    if (!trimmed) return;

    const success = onExecute(trimmed);
    if (success) {
      onClose();
    } else {
      setErrorMessage(
        `Windows cannot find '${trimmed}'. Make sure you typed the name correctly, and then try again.`
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (errorMessage) {
        setErrorMessage(null);
      } else {
        onClose();
      }
    }
  };

  return (
    <div className="run-dialog-overlay" onClick={onClose} onKeyDown={handleKeyDown}>
      <div
        className="run-dialog win-raised"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Run"
      >
        {/* Title Bar */}
        <div className="run-dialog__titlebar">
          <div className="run-dialog__titlebar-left">
            <span className="run-dialog__title">Run</span>
          </div>
          <button
            className="run-dialog__close-btn win-raised"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Dialog Body */}
        <div className="run-dialog__body">
          <div className="run-dialog__header">
            <div className="run-dialog__icon">
              <RunIcon size={32} />
            </div>
            <p className="run-dialog__prompt">
              Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="run-dialog__form">
            <div className="run-dialog__input-row">
              <label htmlFor="run-command-input" className="run-dialog__label">
                <u>O</u>pen:
              </label>
              <div className="run-dialog__input-wrapper win-sunken">
                <input
                  id="run-command-input"
                  ref={inputRef}
                  type="text"
                  className="run-dialog__input"
                  value={command}
                  onChange={e => setCommand(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>

            <div className="run-dialog__button-row">
              <button
                type="submit"
                className="run-dialog__btn run-dialog__btn--default win-raised"
              >
                OK
              </button>
              <button
                type="button"
                className="run-dialog__btn win-raised"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="run-dialog__btn run-dialog__btn--browse win-raised"
                disabled
                title="Browse file system"
              >
                <u>B</u>rowse...
              </button>
            </div>
          </form>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="run-error-overlay" onClick={() => setErrorMessage(null)}>
            <div className="run-error-dialog win-raised" onClick={e => e.stopPropagation()}>
              <div className="run-error-titlebar">
                <span>Cannot find file</span>
                <button
                  className="run-dialog__close-btn win-raised"
                  onClick={() => setErrorMessage(null)}
                >
                  ✕
                </button>
              </div>
              <div className="run-error-body">
                <div className="run-error-icon">
                  <svg viewBox="0 0 32 32" width={32} height={32}>
                    <circle cx="16" cy="16" r="14" fill="#ff0000" stroke="#000000" strokeWidth="1" />
                    <line x1="10" y1="10" x2="22" y2="22" stroke="#ffffff" strokeWidth="3" strokeLinecap="square" />
                    <line x1="22" y1="10" x2="10" y2="22" stroke="#ffffff" strokeWidth="3" strokeLinecap="square" />
                  </svg>
                </div>
                <div className="run-error-text">
                  <p>{errorMessage}</p>
                </div>
              </div>
              <div className="run-error-footer">
                <button
                  className="run-dialog__btn win-raised"
                  onClick={() => {
                    setErrorMessage(null);
                    inputRef.current?.focus();
                  }}
                  autoFocus
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunDialog;
