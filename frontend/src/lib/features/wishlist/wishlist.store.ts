import { writable } from 'svelte/store';
import { readStorage, writeStorage } from '../../utils/browser-storage';
const KEY = 'penitent-wishlist';
function read(): string[] {
  try {
    const saved = readStorage<unknown>(KEY, []);
    return Array.isArray(saved)
      ? saved.filter((slug): slug is string => typeof slug === 'string')
      : [];
  } catch {
    return [];
  }
}
export const wishlist = writable<string[]>(read());
function update(transform: (slugs: string[]) => string[]) {
  wishlist.update((values) => {
    const next = transform(values);
    writeStorage(KEY, next);
    return next;
  });
}
export const toggleWish = (slug: string) =>
  update((values) =>
    values.includes(slug)
      ? values.filter((value) => value !== slug)
      : [...values, slug],
  );
export const removeWish = (slug: string) =>
  update((values) => values.filter((value) => value !== slug));
