import type { HistoryItem } from '../App';

const KEY = 'nymfordge-history';

export function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHistory(item: HistoryItem): HistoryItem[] {
  const history = loadHistory();
  const updated = [item, ...history].slice(0, 20);
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}
