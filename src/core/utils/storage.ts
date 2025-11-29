import * as SecureStore from 'expo-secure-store';

export const save = async (key: string, value: string): Promise<void> =>
  SecureStore.setItemAsync(key, value);

export const get = async (key: string): Promise<string | null> =>
  SecureStore.getItemAsync(key);

export const remove = async (key: string): Promise<void> =>
  SecureStore.deleteItemAsync(key);

export const saveAuth = async (accessToken?: string, refreshToken?: string): Promise<void> => {
  if (accessToken) await save('access_token', accessToken);
  if (refreshToken) await save('refresh_token', refreshToken);
};

export const clearAuth = async (): Promise<void> => {
  await remove('access_token');
  await remove('refresh_token');
};
