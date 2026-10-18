// Svelte state proxies are not structured-cloneable. Provider inputs are plain DTOs.
export const plainInput = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value)) as T;
