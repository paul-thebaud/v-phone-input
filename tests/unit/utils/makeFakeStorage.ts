import { vi } from 'vitest';

export default function makeFakeStorage() {
  const storage = {} as Record<string, unknown>;
  return {
    getItem: vi.fn((k) => storage[k]),
    setItem: vi.fn((k, v) => {
      storage[k] = v;
    }),
  };
}
