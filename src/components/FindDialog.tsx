import React, { useState } from 'react';
import { FindIcon } from './Icons';
import type { SectionId } from '../types';
import './FindDialog.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
  onOpenSpecial?: (id: string) => void;
}

interface SearchableItem {
  name: string;
  inFolder: string;
  size: string;
  type: string;
  action: () => void;
}

const FindDialog: React.FC<Props> = ({ isOpen, onClose, onNavigate, onOpenSpecial }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const allItems: SearchableItem[] = [
    {
      name: 'About_Me.exe',
      inFolder: 'C:\\Documents and Settings\\Logesh',
      size: '142 KB',
      type: 'Application',
      action: () => { onNavigate('about'); onClose(); },
    },
    {
      name: 'TechStacks.exe',
      inFolder: 'C:\\Documents and Settings\\Logesh\\Technical Stacks',
      size: '256 KB',
      type: 'Application',
      action: () => { onNavigate('techstacks'); onClose(); },
    },
    {
      name: 'My_Projects.exe',
      inFolder: 'C:\\Documents and Settings\\Logesh\\My Projects',
      size: '512 KB',
      type: 'Application',
      action: () => { onNavigate('projects'); onClose(); },
    },
    {
      name: 'CogniFocus.prj',
      inFolder: 'C:\\Documents and Settings\\Logesh\\My Projects\\AI & Vision',
      size: '1,280 KB',
      type: 'Project File',
      action: () => { onNavigate('projects/cognifocus'); onClose(); },
    },
    {
      name: 'Startup_Valuation.prj',
      inFolder: 'C:\\Documents and Settings\\Logesh\\My Projects\\Financial Systems',
      size: '980 KB',
      type: 'Project File',
      action: () => { onNavigate('projects/startup-valuation'); onClose(); },
    },
    {
      name: 'Image_Authenticity.prj',
      inFolder: 'C:\\Documents and Settings\\Logesh\\My Projects\\Computer Vision',
      size: '1,024 KB',
      type: 'Project File',
      action: () => { onNavigate('projects/image-authenticity'); onClose(); },
    },
    {
      name: 'Email_Triage.prj',
      inFolder: 'C:\\Documents and Settings\\Logesh\\My Projects\\NLP & Automation',
      size: '860 KB',
      type: 'Project File',
      action: () => { onNavigate('projects/email-triage'); onClose(); },
    },
    {
      name: 'Contact.exe',
      inFolder: 'C:\\Program Files\\Address Book',
      size: '96 KB',
      type: 'Application',
      action: () => { onNavigate('contact'); onClose(); },
    },
    {
      name: 'Camera.exe',
      inFolder: 'C:\\Program Files\\Accessories',
      size: '340 KB',
      type: 'Application',
      action: () => { if (onOpenSpecial) onOpenSpecial('camera'); onClose(); },
    },
    {
      name: 'Snake.exe',
      inFolder: 'C:\\Program Files\\Games',
      size: '180 KB',
      type: 'Application',
      action: () => { if (onOpenSpecial) onOpenSpecial('snake'); onClose(); },
    },
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = query.trim().toLowerCase();
    setHasSearched(true);
    if (!q) {
      setResults(allItems);
    } else {
      setResults(allItems.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.inFolder.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      ));
    }
  };

  const handleReset = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="find-dialog-overlay" onClick={onClose}>
      <div
        className="find-dialog win-raised"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Find: All Files"
      >
        {/* Title Bar */}
        <div className="find-dialog__titlebar">
          <div className="find-dialog__titlebar-left">
            <FindIcon size={14} />
            <span className="find-dialog__title">Find: All Files</span>
          </div>
          <button
            className="find-dialog__close-btn win-raised"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Search Inputs & Buttons */}
        <form onSubmit={handleSearch} className="find-dialog__form">
          <div className="find-dialog__inputs">
            <div className="find-dialog__row">
              <label htmlFor="find-named-input" className="find-dialog__label"><u>N</u>amed:</label>
              <div className="find-dialog__input-wrap win-sunken">
                <input
                  id="find-named-input"
                  type="text"
                  className="find-dialog__input"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="e.g. CogniFocus, Camera, projects..."
                  autoFocus
                />
              </div>
            </div>
            <div className="find-dialog__row">
              <label className="find-dialog__label"><u>L</u>ook in:</label>
              <div className="find-dialog__input-wrap win-sunken">
                <input
                  type="text"
                  className="find-dialog__input"
                  value="C:\Documents and Settings\Logesh"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="find-dialog__buttons">
            <button type="submit" className="find-dialog__btn win-raised">
              <u>F</u>ind Now
            </button>
            <button type="button" className="find-dialog__btn win-raised" onClick={handleReset}>
              <u>N</u>ew Search
            </button>
            <button type="button" className="find-dialog__btn win-raised" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>

        {/* Results List View */}
        <div className="find-dialog__results-container win-sunken">
          <div className="find-dialog__header-row">
            <span style={{ width: '140px' }}>Name</span>
            <span style={{ flex: 1 }}>In Folder</span>
            <span style={{ width: '70px' }}>Size</span>
            <span style={{ width: '80px' }}>Type</span>
          </div>
          <div className="find-dialog__list">
            {hasSearched && results.length === 0 ? (
              <div className="find-dialog__empty">No files matching criteria found.</div>
            ) : results.length > 0 ? (
              results.map((item, idx) => (
                <div
                  key={idx}
                  className="find-dialog__item"
                  onDoubleClick={item.action}
                  onClick={item.action}
                  title={`Double click to open ${item.name}`}
                >
                  <span className="find-dialog__item-name">📄 {item.name}</span>
                  <span className="find-dialog__item-folder">{item.inFolder}</span>
                  <span className="find-dialog__item-size">{item.size}</span>
                  <span className="find-dialog__item-type">{item.type}</span>
                </div>
              ))
            ) : (
              <div className="find-dialog__hint">Type a search term and click Find Now.</div>
            )}
          </div>
        </div>

        {/* Statusbar */}
        <div className="find-dialog__statusbar win-sunken">
          <span>{hasSearched ? `${results.length} file(s) found` : 'Ready'}</span>
        </div>
      </div>
    </div>
  );
};

export default FindDialog;
