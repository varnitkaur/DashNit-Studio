/**
 * Storage Utility for DashNit Studio
 * Provides persistent local state synchronization across browser reloads
 */

const STORAGE_PREFIX = 'dashnit_studio_';

export function getStoredState<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[DashNit Storage] Error reading key "${key}":`, error);
    return fallback;
  }
}

export function saveStoredState<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {
    console.warn(`[DashNit Storage] Error saving key "${key}":`, error);
  }
}

export function clearStoredState(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.warn(`[DashNit Storage] Error clearing key "${key}":`, error);
  }
}

export function resetAllStudioData(): void {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (error) {
    console.warn('[DashNit Storage] Error resetting all studio data:', error);
  }
}
