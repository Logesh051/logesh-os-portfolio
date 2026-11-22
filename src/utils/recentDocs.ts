import type { SectionId } from '../types';

export interface RecentDocItem {
  id: string;
  title: string;
  section?: SectionId;
  isSpecial?: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'logesh_os_recent_docs';

export function getRecentDocs(): RecentDocItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

export function addRecentDoc(item: Omit<RecentDocItem, 'timestamp'>): RecentDocItem[] {
  try {
    const current = getRecentDocs();
    const filtered = current.filter(d => d.id !== item.id);
    const updated: RecentDocItem[] = [
      {
        ...item,
        timestamp: Date.now(),
      },
      ...filtered,
    ].slice(0, 10); // keep at most 10 recent documents
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearRecentDocs(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}
