import React, { useState } from 'react';
import { HelpIcon } from './Icons';
import './HelpDialog.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const topics = [
  {
    id: 'welcome',
    title: 'Welcome to LOGESH_OS',
    content: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: 13 }}>Welcome to LOGESH_OS</h3>
        <p>
          LOGESH_OS is an interactive Windows 98 / 2000 retro web desktop portfolio created to showcase engineering projects, technical skills, and software background in an authentic operating system environment.
        </p>
        <p>
          You can drag and resize windows, switch tasks via the taskbar, capture retro webcam selfies with Camera.exe, or navigate portfolio files using My Projects Explorer.
        </p>
      </div>
    ),
  },
  {
    id: 'windows',
    title: 'Managing Application Windows',
    content: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: 13 }}>Window Management</h3>
        <ul style={{ paddingLeft: 18, margin: '6px 0' }}>
          <li><strong>Moving:</strong> Drag the title bar of any restored window.</li>
          <li><strong>Resizing:</strong> Drag any of the 8 borders or corners.</li>
          <li><strong>Maximize / Restore:</strong> Click the square button or double-click the title bar.</li>
          <li><strong>Minimize:</strong> Click the underscore (_) button to minimize to the taskbar.</li>
          <li><strong>Keyboard Shortcuts:</strong> Press <code>Alt + Space</code> for window system menu, <code>Alt + F4</code> to close.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'start-run',
    title: 'Start Menu & Run Commands',
    content: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: 13 }}>Start Menu & Run Commands</h3>
        <p>
          Press <code>Ctrl + Esc</code> or click the <strong>Start</strong> button to browse Programs, access Recent Documents, or execute direct commands:
        </p>
        <ul style={{ paddingLeft: 18, margin: '6px 0' }}>
          <li><code>about</code> — Opens About_Me.exe</li>
          <li><code>skills</code> — Opens TechStacks.exe</li>
          <li><code>projects</code> — Opens My_Projects.exe</li>
          <li><code>contact</code> — Opens Contact.exe Address Book</li>
          <li><code>camera</code> — Opens Camera.exe Retro Photo Booth</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'quicklaunch',
    title: 'Quick Launch & Show Desktop',
    content: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: 13 }}>Quick Launch Toolbar</h3>
        <p>
          The Quick Launch bar beside the Start button provides one-click shortcuts to key applications. Click the <strong>Show Desktop</strong> icon to instantly minimize all open windows; click it again to restore them.
        </p>
      </div>
    ),
  },
];

const HelpDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('welcome');

  if (!isOpen) return null;

  const currentTopic = topics.find(t => t.id === selectedTopic) || topics[0];

  return (
    <div className="help-dialog-overlay" onClick={onClose}>
      <div
        className="help-dialog win-raised"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="LOGESH_OS Help Topics"
      >
        {/* Title Bar */}
        <div className="help-dialog__titlebar">
          <div className="help-dialog__titlebar-left">
            <HelpIcon size={14} />
            <span className="help-dialog__title">LOGESH_OS Help Topics</span>
          </div>
          <button
            className="help-dialog__close-btn win-raised"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Toolbar */}
        <div className="help-dialog__toolbar">
          <button className="help-dialog__toolbtn win-raised" onClick={() => setSelectedTopic('welcome')}>
            Contents
          </button>
          <button className="help-dialog__toolbtn win-raised" onClick={onClose}>
            Exit
          </button>
        </div>

        {/* Main Body: Left sidebar topics + Right content pane */}
        <div className="help-dialog__body">
          <div className="help-dialog__nav win-sunken">
            <div className="help-dialog__nav-title">Help Topics:</div>
            {topics.map(t => (
              <div
                key={t.id}
                className={`help-dialog__topic-item ${selectedTopic === t.id ? 'help-dialog__topic-item--selected' : ''}`}
                onClick={() => setSelectedTopic(t.id)}
              >
                <span>📘 {t.title}</span>
              </div>
            ))}
          </div>

          <div className="help-dialog__viewer win-sunken">
            {currentTopic.content}
          </div>
        </div>

        <div className="help-dialog__footer">
          <button className="help-dialog__btn win-raised" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpDialog;
