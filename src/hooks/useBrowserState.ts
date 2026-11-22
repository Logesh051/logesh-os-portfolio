import { useState, useCallback } from 'react';
import type { SectionId, BrowserState } from '../types';

const initialState: BrowserState = {
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  activeSection: 'about',
  history: [],
  historyIndex: -1,
};

export function useBrowserState() {
  const [state, setState] = useState<BrowserState>(initialState);

  const openSection = useCallback((section: SectionId) => {
    setState(prev => {
      // If the browser is already open and showing this section, just restore
      if (prev.isOpen && prev.activeSection === section && !prev.isMinimized) {
        return prev;
      }

      // If minimized and same section, just restore
      if (prev.isOpen && prev.isMinimized && prev.activeSection === section) {
        return { ...prev, isMinimized: false };
      }

      // Navigate to new section
      const newHistory = prev.isOpen
        ? [...prev.history.slice(0, prev.historyIndex + 1), section]
        : [section];
      const newIndex = newHistory.length - 1;

      return {
        ...prev,
        isOpen: true,
        isMinimized: false,
        activeSection: section,
        history: newHistory,
        historyIndex: newIndex,
      };
    });
  }, []);

  const goBack = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex <= 0) return prev;
      const newIndex = prev.historyIndex - 1;
      return {
        ...prev,
        activeSection: prev.history[newIndex],
        historyIndex: newIndex,
      };
    });
  }, []);

  const goForward = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex >= prev.history.length - 1) return prev;
      const newIndex = prev.historyIndex + 1;
      return {
        ...prev,
        activeSection: prev.history[newIndex],
        historyIndex: newIndex,
      };
    });
  }, []);

  const closeBrowser = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      isMinimized: false,
    }));
  }, []);

  const minimizeBrowser = useCallback(() => {
    setState(prev => ({ ...prev, isMinimized: true }));
  }, []);

  const restoreBrowser = useCallback(() => {
    setState(prev => ({ ...prev, isMinimized: false }));
  }, []);

  const toggleMaximize = useCallback(() => {
    setState(prev => ({ ...prev, isMaximized: !prev.isMaximized }));
  }, []);

  const canGoBack = state.historyIndex > 0;
  const canGoForward = state.historyIndex < state.history.length - 1;

  return {
    state,
    openSection,
    goBack,
    goForward,
    closeBrowser,
    minimizeBrowser,
    restoreBrowser,
    toggleMaximize,
    canGoBack,
    canGoForward,
  };
}
