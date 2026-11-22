import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './ContextMenu.css';

export interface ContextMenuItem {
  id?: string;
  label: string;
  action?: () => void;
  disabled?: boolean;
  separator?: boolean;
  hasSubmenu?: boolean;
  submenu?: {
    id: string;
    label: string;
    action: () => void;
  }[];
}

interface Props {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

const ContextMenu: React.FC<Props> = ({ x, y, items, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: x, top: y });
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  useLayoutEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const pad = 4;
      const taskbarHeight = 28;
      let left = x;
      let top = y;

      if (left + rect.width > window.innerWidth - pad) {
        left = Math.max(pad, window.innerWidth - rect.width - pad);
      }
      if (top + rect.height > window.innerHeight - taskbarHeight - pad) {
        top = Math.max(pad, window.innerHeight - taskbarHeight - rect.height - pad);
      }
      setPos({ left, top });
    }
  }, [x, y]);

  // Handle outside clicks and keyboard navigation
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const selectableIndices: number[] = [];
      items.forEach((item, idx) => {
        if (!item.separator && !item.disabled) selectableIndices.push(idx);
      });

      if (e.key === 'Escape') {
        if (activeSubmenuId) {
          setActiveSubmenuId(null);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(prev => {
          const curr = selectableIndices.indexOf(prev);
          const next = (curr + 1) % selectableIndices.length;
          return selectableIndices[next];
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prev => {
          const curr = selectableIndices.indexOf(prev);
          const next = (curr - 1 + selectableIndices.length) % selectableIndices.length;
          return selectableIndices[next];
        });
      } else if (e.key === 'ArrowRight') {
        const item = items[focusedIndex];
        if (item && item.hasSubmenu && item.id) {
          setActiveSubmenuId(item.id);
        }
      } else if (e.key === 'ArrowLeft') {
        if (activeSubmenuId) {
          setActiveSubmenuId(null);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = items[focusedIndex];
        if (item && !item.disabled && item.action) {
          item.action();
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [items, focusedIndex, activeSubmenuId, onClose]);

  return (
    <div
      className="context-menu win-raised"
      style={{
        position: 'fixed',
        left: pos.left,
        top: pos.top,
        zIndex: 10000,
      }}
      ref={menuRef}
      role="menu"
    >
      {items.map((item, i) => {
        if (item.separator) {
          return <div key={`sep-${i}`} className="context-menu__separator" />;
        }

        const isFocused = focusedIndex === i;
        const isSubmenuOpen = activeSubmenuId === item.id;

        return (
          <div
            key={item.id || `item-${i}`}
            className="context-menu__item-wrapper"
            onMouseEnter={() => {
              setFocusedIndex(i);
              if (item.hasSubmenu && item.id) {
                setActiveSubmenuId(item.id);
              } else {
                setActiveSubmenuId(null);
              }
            }}
            onMouseOver={() => {
              setFocusedIndex(i);
              if (item.hasSubmenu && item.id) {
                setActiveSubmenuId(item.id);
              }
            }}
          >
            <button
              className={`context-menu__item ${item.disabled ? 'context-menu__item--disabled' : ''} ${
                isFocused ? 'context-menu__item--focused' : ''
              }`}
              onClick={() => {
                if (item.hasSubmenu && item.id) {
                  const targetId = item.id;
                  setActiveSubmenuId(prev => (prev === targetId ? null : targetId));
                  return;
                }
                if (!item.disabled && item.action) {
                  item.action();
                  onClose();
                }
              }}
              role="menuitem"
              disabled={item.disabled}
            >
              <span className="context-menu__item-label">{item.label}</span>
              {item.hasSubmenu && <span className="context-menu__arrow">▶</span>}
            </button>

            {/* Submenu */}
            {item.hasSubmenu && item.submenu && isSubmenuOpen && (
              <div className="context-submenu win-raised" role="menu">
                {item.submenu.map(subItem => (
                  <button
                    key={subItem.id}
                    className="context-submenu__item"
                    onClick={() => {
                      subItem.action();
                      onClose();
                    }}
                    role="menuitem"
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContextMenu;
