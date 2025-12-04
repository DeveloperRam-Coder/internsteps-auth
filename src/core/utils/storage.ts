import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Platform-aware storage helpers
export const save = async (key: string, value: string): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

export const get = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

export const remove = async (key: string): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

export const saveAuth = async (accessToken?: string, refreshToken?: string): Promise<void> => {
  if (accessToken) await save('access_token', accessToken);
  if (refreshToken) await save('refresh_token', refreshToken);
};

export const clearAuth = async (): Promise<void> => {
  await remove('access_token');
  await remove('refresh_token');
};
