import React from 'react';

// Common icon wrapper
const IconSvg: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 32 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    {children}
  </svg>
);

// About Me icon - person/document
export const AboutIcon: React.FC<{ size?: number }> = ({ size }) => (
  <IconSvg size={size}>
    {/* Document body */}
    <rect x="6" y="2" width="20" height="28" fill="#ffffff" stroke="#000000" strokeWidth="1"/>
    <rect x="6" y="2" width="20" height="5" fill="#000080"/>
    {/* Lines of text */}
    <rect x="9" y="10" width="14" height="2" fill="#000080"/>
    <rect x="9" y="14" width="14" height="2" fill="#808080"/>
    <rect x="9" y="18" width="10" height="2" fill="#808080"/>
    <rect x="9" y="22" width="12" height="2" fill="#808080"/>
    {/* Person silhouette on header */}
    <circle cx="16" cy="4" r="1.5" fill="#ffffff"/>
    <rect x="14" y="5" width="4" height="2" fill="#ffffff"/>
  </IconSvg>
);

// Tech Stacks icon - gear/system
export const TechStacksIcon: React.FC<{ size?: number }> = ({ size }) => (
  <IconSvg size={size}>
    {/* Monitor */}
    <rect x="4" y="2" width="24" height="18" fill="#c0c0c0" stroke="#000000" strokeWidth="1"/>
    <rect x="6" y="4" width="20" height="14" fill="#000080"/>
    {/* Screen content - gear */}
    <rect x="13" y="7" width="6" height="6" fill="#00ff00" opacity="0.8"/>
    <rect x="11" y="9" width="10" height="2" fill="#00ff00" opacity="0.8"/>
    <rect x="15" y="5" width="2" height="10" fill="#00ff00" opacity="0.8"/>
    {/* Stand */}
    <rect x="12" y="20" width="8" height="2" fill="#808080"/>
    <rect x="10" y="22" width="12" height="2" fill="#808080" stroke="#000000" strokeWidth="0.5"/>
    {/* Text on screen */}
    <rect x="8" y="15" width="5" height="1" fill="#ffffff"/>
    <rect x="8" y="13" width="3" height="1" fill="#ffffff"/>
  </IconSvg>
);

// Projects icon - folder
export const ProjectsIcon: React.FC<{ size?: number }> = ({ size }) => (
  <IconSvg size={size}>
    {/* Folder tab */}
    <rect x="2" y="6" width="10" height="4" fill="#ffff00" stroke="#808080" strokeWidth="0.5"/>
    {/* Folder body */}
    <rect x="2" y="9" width="28" height="20" fill="#ffff00" stroke="#000000" strokeWidth="1"/>
    <rect x="2" y="9" width="28" height="4" fill="#e6d800"/>
    {/* Documents inside */}
    <rect x="8" y="15" width="8" height="10" fill="#ffffff" stroke="#808080" strokeWidth="0.5"/>
    <rect x="10" y="17" width="4" height="1" fill="#000080"/>
    <rect x="10" y="19" width="4" height="1" fill="#808080"/>
    <rect x="14" y="14" width="8" height="10" fill="#ffffff" stroke="#808080" strokeWidth="0.5"/>
    <rect x="16" y="16" width="4" height="1" fill="#000080"/>
    <rect x="16" y="18" width="4" height="1" fill="#808080"/>
  </IconSvg>
);

// Contact icon - mail/address book
export const ContactIcon: React.FC<{ size?: number }> = ({ size }) => (
  <IconSvg size={size}>
    {/* Envelope */}
    <rect x="2" y="6" width="28" height="20" fill="#ffffff" stroke="#000000" strokeWidth="1"/>
    {/* Envelope flap */}
    <polygon points="2,6 16,18 30,6" fill="none" stroke="#000080" strokeWidth="1.5"/>
    {/* Blue accent */}
    <rect x="2" y="6" width="28" height="3" fill="#000080" opacity="0.3"/>
    {/* Stamp */}
    <rect x="22" y="9" width="6" height="5" fill="#ff0000" stroke="#808080" strokeWidth="0.5"/>
  </IconSvg>
);

// Snake Game icon — Retro pixelated arcade snake
export const SnakeIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <IconSvg size={size}>
    {/* Dark CRT screen frame */}
    <rect x="2" y="2" width="28" height="28" fill="#182018" stroke="#000000" strokeWidth="1"/>
    <rect x="4" y="4" width="24" height="24" fill="#0a120a"/>
    {/* Retro green grid lines */}
    <line x1="4" y1="10" x2="28" y2="10" stroke="#122412" strokeWidth="1"/>
    <line x1="4" y1="16" x2="28" y2="16" stroke="#122412" strokeWidth="1"/>
    <line x1="4" y1="22" x2="28" y2="22" stroke="#122412" strokeWidth="1"/>
    {/* Snake body segments (green) */}
    <rect x="8" y="18" width="4" height="4" fill="#00bb00" stroke="#005500" strokeWidth="0.5"/>
    <rect x="12" y="18" width="4" height="4" fill="#00dd00" stroke="#005500" strokeWidth="0.5"/>
    <rect x="16" y="18" width="4" height="4" fill="#00dd00" stroke="#005500" strokeWidth="0.5"/>
    <rect x="16" y="14" width="4" height="4" fill="#00ff00" stroke="#005500" strokeWidth="0.5"/>
    <rect x="16" y="10" width="4" height="4" fill="#00ff00" stroke="#005500" strokeWidth="0.5"/>
    <rect x="20" y="10" width="4" height="4" fill="#33ff33" stroke="#005500" strokeWidth="0.5"/>
    {/* Snake eyes */}
    <rect x="22" y="11" width="1" height="1" fill="#000000"/>
    {/* Red Apple / Food */}
    <rect x="8" y="8" width="4" height="4" fill="#ff2222" stroke="#880000" strokeWidth="0.5"/>
    <rect x="10" y="6" width="1" height="2" fill="#00bb00"/>
  </IconSvg>
);

// Camera icon
export const CameraIcon: React.FC<{ size?: number }> = ({ size }) => (
  <IconSvg size={size}>
    {/* Camera body */}
    <rect x="3" y="10" width="26" height="18" fill="#404040" stroke="#000000" strokeWidth="1"/>
    {/* Top bump */}
    <rect x="10" y="6" width="12" height="6" fill="#404040" stroke="#000000" strokeWidth="1"/>
    {/* Lens outer */}
    <circle cx="16" cy="19" r="7" fill="#222222" stroke="#808080" strokeWidth="1"/>
    {/* Lens inner */}
    <circle cx="16" cy="19" r="4.5" fill="#000080" stroke="#000000" strokeWidth="0.5"/>
    {/* Lens reflection */}
    <circle cx="14" cy="17" r="1.5" fill="#4040ff" opacity="0.5"/>
    {/* Flash */}
    <rect x="22" y="8" width="3" height="2" fill="#ffff00"/>
    {/* Viewfinder */}
    <rect x="6" y="12" width="4" height="3" fill="#222222" stroke="#808080" strokeWidth="0.5"/>
  </IconSvg>
);

// Browser icon (for title bar and taskbar)
export const BrowserIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="1" y="1" width="14" height="14" fill="#ffffff" stroke="#000080" strokeWidth="1"/>
    <rect x="1" y="1" width="14" height="4" fill="#000080"/>
    <circle cx="8" cy="9" r="4" fill="none" stroke="#000080" strokeWidth="1.5"/>
    <line x1="5" y1="9" x2="11" y2="9" stroke="#000080" strokeWidth="0.5"/>
    <line x1="8" y1="5" x2="8" y2="13" stroke="#000080" strokeWidth="0.5"/>
  </svg>
);

// Start menu icon (Windows flag style)
export const StartIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="1" y="1" width="6" height="6" fill="#ff0000"/>
    <rect x="9" y="1" width="6" height="6" fill="#0000ff"/>
    <rect x="1" y="9" width="6" height="6" fill="#00aa00"/>
    <rect x="9" y="9" width="6" height="6" fill="#ffcc00"/>
  </svg>
);

// Folder icon for project explorer
export const FolderIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="1" y="3" width="5" height="3" fill="#ffff00" stroke="#808080" strokeWidth="0.3"/>
    <rect x="1" y="5" width="14" height="10" fill="#ffff00" stroke="#000000" strokeWidth="0.5"/>
    <rect x="1" y="5" width="14" height="2" fill="#e6d800"/>
  </svg>
);

// File icon for project items
export const FileIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="3" y="1" width="10" height="14" fill="#ffffff" stroke="#000000" strokeWidth="0.5"/>
    <polygon points="10,1 13,4 10,4" fill="#c0c0c0" stroke="#000000" strokeWidth="0.3"/>
    <rect x="5" y="6" width="6" height="1" fill="#000000"/>
    <rect x="5" y="8" width="6" height="1" fill="#808080"/>
    <rect x="5" y="10" width="4" height="1" fill="#808080"/>
  </svg>
);

// Speaker icon for system tray
export const SpeakerIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <polygon points="1,5 4,5 8,1 8,15 4,11 1,11" fill="#000000" />
    <path d="M10 5 C 11.5 6.5, 11.5 9.5, 10 11" stroke="#000000" strokeWidth="1.2" fill="none" />
    <path d="M12 3 C 14.5 5.5, 14.5 10.5, 12 13" stroke="#000000" strokeWidth="1.2" fill="none" />
  </svg>
);

// Speaker muted icon for system tray
export const SpeakerMutedIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <polygon points="1,5 4,5 8,1 8,15 4,11 1,11" fill="#808080" />
    <line x1="10" y1="5" x2="15" y2="10" stroke="#ff0000" strokeWidth="1.5" />
    <line x1="15" y1="5" x2="10" y2="10" stroke="#ff0000" strokeWidth="1.5" />
  </svg>
);

// Network connection icon for system tray (classic Win98 dual monitor)
export const NetworkIcon: React.FC<{ size?: number; active?: boolean }> = ({ size = 16, active = true }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    {/* Back monitor */}
    <rect x="5" y="1" width="9" height="7" fill="#c0c0c0" stroke="#000000" strokeWidth="0.5"/>
    <rect x="6" y="2" width="7" height="5" fill={active ? "#00aa00" : "#000080"}/>
    <rect x="8" y="8" width="3" height="1" fill="#808080"/>
    <rect x="7" y="9" width="5" height="1" fill="#000000"/>
    {/* Front monitor */}
    <rect x="2" y="5" width="9" height="7" fill="#c0c0c0" stroke="#000000" strokeWidth="0.5"/>
    <rect x="3" y="6" width="7" height="5" fill={active ? "#00ff00" : "#000080"}/>
    <rect x="5" y="12" width="3" height="1" fill="#808080"/>
    <rect x="4" y="13" width="5" height="1" fill="#000000"/>
  </svg>
);

// Show Desktop icon for Quick Launch
export const ShowDesktopIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="1" y="2" width="14" height="11" fill="#2c537d" stroke="#000000" strokeWidth="0.5"/>
    <rect x="2" y="3" width="12" height="9" fill="#008080"/>
    <rect x="3" y="4" width="7" height="6" fill="#c0c0c0" stroke="#000000" strokeWidth="0.5"/>
    <rect x="3" y="4" width="7" height="2" fill="#000080"/>
    <rect x="7" y="6" width="6" height="6" fill="#ffffff" stroke="#000000" strokeWidth="0.5"/>
    <line x1="12" y1="6" x2="8" y2="10" stroke="#ff0000" strokeWidth="1.2" strokeLinecap="square"/>
    <polygon points="7,11 8,10 9,11" fill="#000000"/>
  </svg>
);

// Programs cascading folder icon
export const ProgramsIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="4" width="8" height="4" fill="#ffff00" stroke="#808080" strokeWidth="0.5"/>
    <rect x="2" y="7" width="20" height="14" fill="#ffff00" stroke="#000000" strokeWidth="0.8"/>
    <rect x="2" y="7" width="20" height="3" fill="#e6d800"/>
    <rect x="7" y="11" width="10" height="7" fill="#ffffff" stroke="#000080" strokeWidth="0.8"/>
    <rect x="7" y="11" width="10" height="2" fill="#000080"/>
  </svg>
);

// Documents folder icon
export const DocumentsIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="5" width="8" height="3" fill="#ffff00" stroke="#808080" strokeWidth="0.5"/>
    <rect x="2" y="8" width="18" height="13" fill="#ffff00" stroke="#000000" strokeWidth="0.8"/>
    <rect x="7" y="4" width="9" height="11" fill="#ffffff" stroke="#000000" strokeWidth="0.5"/>
    <rect x="9" y="6" width="5" height="1" fill="#000080"/>
    <rect x="9" y="8" width="5" height="1" fill="#808080"/>
    <rect x="9" y="10" width="3" height="1" fill="#808080"/>
  </svg>
);

// Settings icon (gears)
export const SettingsIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="4" y="6" width="10" height="10" fill="#808080" stroke="#000000" strokeWidth="0.5"/>
    <circle cx="9" cy="11" r="3" fill="#c0c0c0"/>
    <rect x="8" y="4" width="2" height="14" fill="#808080"/>
    <rect x="2" y="10" width="14" height="2" fill="#808080"/>
    <rect x="12" y="12" width="8" height="8" fill="#a0a0a0" stroke="#000000" strokeWidth="0.5"/>
    <circle cx="16" cy="16" r="2.5" fill="#c0c0c0"/>
  </svg>
);

// Find icon (folder with magnifying glass)
export const FindIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="6" width="16" height="13" fill="#ffff00" stroke="#000000" strokeWidth="0.8"/>
    <circle cx="14" cy="11" r="5" fill="#e0f0ff" stroke="#000000" strokeWidth="1.2"/>
    <line x1="17.5" y1="14.5" x2="22" y2="19" stroke="#804000" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

// Help icon (yellow book with ?)
export const HelpIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="4" y="3" width="15" height="18" fill="#ffffcc" stroke="#000000" strokeWidth="1"/>
    <rect x="4" y="3" width="3" height="18" fill="#800080"/>
    <text x="9" y="16" fontFamily="Arial" fontSize="13" fontWeight="bold" fill="#000080">?</text>
  </svg>
);

// Run icon
export const RunIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="5" width="16" height="13" fill="#c0c0c0" stroke="#000000" strokeWidth="0.8"/>
    <rect x="4" y="7" width="12" height="9" fill="#000080"/>
    <rect x="6" y="9" width="3" height="1" fill="#00ff00"/>
    <rect x="6" y="11" width="5" height="1" fill="#00ff00"/>
    <rect x="13" y="11" width="9" height="10" fill="#ffffff" stroke="#000000" strokeWidth="0.6"/>
    <polygon points="12,18 16,14 16,17 19,17 19,19 16,19 16,22" fill="#00aa00"/>
  </svg>
);

// Display Properties monitor icon
export const DisplayPropertiesIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="3" y="3" width="18" height="14" fill="#c0c0c0" stroke="#000000" strokeWidth="1"/>
    <rect x="5" y="5" width="14" height="10" fill="#008080"/>
    <rect x="9" y="17" width="6" height="2" fill="#808080"/>
    <rect x="7" y="19" width="10" height="2" fill="#000000"/>
  </svg>
);

// Explorer Toolbar Icons
export const BackNavIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <polygon points="9,2 3,8 9,14" fill="#000000" />
    <rect x="8" y="6" width="6" height="4" fill="#000000" />
  </svg>
);

export const ForwardNavIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <polygon points="7,2 13,8 7,14" fill="#000000" />
    <rect x="2" y="6" width="6" height="4" fill="#000000" />
  </svg>
);

export const UpFolderIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <path d="M1 3h5l2 2h7v8H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="0.8" />
    <path d="M1 5h14v7H1V5z" fill="#ffeaa7" stroke="#000000" strokeWidth="0.8" />
    <polygon points="8,4 5,8 7,8 7,11 9,11 9,8 11,8" fill="#000080" />
  </svg>
);

export const PropertiesNavIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="2" width="12" height="12" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <rect x="4" y="4" width="8" height="2" fill="#000080" />
    <line x1="4" y1="8" x2="12" y2="8" stroke="#808080" strokeWidth="1" />
    <line x1="4" y1="10" x2="12" y2="10" stroke="#808080" strokeWidth="1" />
    <circle cx="12" cy="12" r="3" fill="#ffcc00" stroke="#000000" strokeWidth="0.8" />
    <text x="10.5" y="14" fontSize="6" fontFamily="Arial" fontWeight="bold" fill="#000000">i</text>
  </svg>
);

export const DetailsViewIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="2" width="3" height="2" fill="#000080" />
    <line x1="7" y1="3" x2="14" y2="3" stroke="#000000" strokeWidth="1.5" />
    <rect x="2" y="6" width="3" height="2" fill="#000080" />
    <line x1="7" y1="7" x2="14" y2="7" stroke="#000000" strokeWidth="1.5" />
    <rect x="2" y="10" width="3" height="2" fill="#000080" />
    <line x1="7" y1="11" x2="14" y2="11" stroke="#000000" strokeWidth="1.5" />
  </svg>
);

export const ListViewIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="2" width="4" height="4" fill="#000080" />
    <line x1="7" y1="4" x2="14" y2="4" stroke="#000000" strokeWidth="1.2" />
    <rect x="2" y="8" width="4" height="4" fill="#000080" />
    <line x1="7" y1="10" x2="14" y2="10" stroke="#000000" strokeWidth="1.2" />
  </svg>
);

export const LargeIconsViewIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="2" width="5" height="5" fill="#f6d04d" stroke="#000000" strokeWidth="0.8" />
    <rect x="9" y="2" width="5" height="5" fill="#f6d04d" stroke="#000000" strokeWidth="0.8" />
    <rect x="2" y="9" width="5" height="5" fill="#f6d04d" stroke="#000000" strokeWidth="0.8" />
    <rect x="9" y="9" width="5" height="5" fill="#f6d04d" stroke="#000000" strokeWidth="0.8" />
  </svg>
);
