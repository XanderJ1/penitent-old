import { browser } from '$app/env';
import { AppError } from './errors';
export function readStorage<T>(key: string, fallback: T): T {
  if (!browser) return structuredClone(fallback);
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : structuredClone(fallback);
  } catch {
    throw new AppError(
      'Browser demo data could not be read. Reset the demo data or enable browser storage.',
    );
  }
}
export function writeStorage(key: string, value: unknown): void {
  if (!browser)
    throw new AppError('Demo changes are available in the browser only.');
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    throw new AppError(
      'Your browser could not save this change. Check available browser storage.',
    );
  }
}
