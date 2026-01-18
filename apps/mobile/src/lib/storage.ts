import * as SecureStore from 'expo-secure-store';
import type { SessionStorage } from '@my/lib-auth';

// Mobile storage implementation using Expo SecureStore
export const mobileStorage: SessionStorage = {
  async getItem(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  },
  async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  },
};
