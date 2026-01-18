import type { SessionStorage } from "@my/lib-auth";

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";

// Web storage implementation using localStorage
export const webStorage: SessionStorage = {
  getItem(key: string): Promise<string | null> {
    if (!isBrowser) return Promise.resolve(null);
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem(key: string, value: string): Promise<void> {
    if (!isBrowser) return Promise.resolve();
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem(key: string): Promise<void> {
    if (!isBrowser) return Promise.resolve();
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};
