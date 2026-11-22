import React, { useRef } from 'react';
import { AboutIcon, TechStacksIcon, ProjectsIcon, ContactIcon, CameraIcon, SnakeIcon } from './Icons';
import type { DesktopIcon as DesktopIconType } from '../types';
import './DesktopIcon.css';

interface Props {
  icon: DesktopIconType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (icon: DesktopIconType) => void;
}

const iconComponents = {
  about: AboutIcon,
  techstacks: TechStacksIcon,
  projects: ProjectsIcon,
  contact: ContactIcon,
  camera: CameraIcon,
  snake: SnakeIcon,
};

const DesktopIcon: React.FC<Props> = ({ icon, isSelected, onSelect, onOpen }) => {
  const IconComponent = iconComponents[icon.iconType];
  const lastClickRef = useRef<number>(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    const isDoubleClick = now - lastClickRef.current < 450;
    const isTouch = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

    onSelect(icon.id);

    // In classic Windows, double click or clicking an already selected icon opens it; on touch, tap opens
    if (isSelected || isDoubleClick || isTouch) {
      onOpen(icon);
    }
    lastClickRef.current = now;
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(icon.id);
    onOpen(icon);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(icon.id);
      onOpen(icon);
    }
  };

  return (
    <button
      className={`desktop-icon ${isSelected ? 'desktop-icon--selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${icon.label}`}
      tabIndex={0}
      title={`Click to open ${icon.label}`}
    >
      <div className="desktop-icon__image">
        <IconComponent size={32} />
      </div>
      <span className="desktop-icon__label">{icon.label}</span>
    </button>
  );
};

export default DesktopIcon;
