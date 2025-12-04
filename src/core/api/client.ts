import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Base URL depending on platform
const API_BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000/api' // web runs on localhost
    : 'http://192.168.31.156:3000/api'; // Android/iOS device/emulator

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Helper to get token from secure storage (platform-aware)
async function getToken() {
  try {
    if (Platform.OS === 'web') {
      // On web, use localStorage
      return localStorage.getItem('access_token');
    } else {
      // On native platforms, use SecureStore
      return await SecureStore.getItemAsync('access_token');
    }
  } catch (e) {
    console.error('Error retrieving token:', e);
    return null;
  }
}

// Helper to set token in secure storage (platform-aware)
async function setToken(token: string) {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem('access_token', token);
    } else {
      await SecureStore.setItemAsync('access_token', token);
    }
  } catch (e) {
    console.error('Error storing token:', e);
  }
}

// Helper to remove token from secure storage (platform-aware)
async function removeToken() {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem('access_token');
    } else {
      await SecureStore.deleteItemAsync('access_token');
    }
  } catch (e) {
    console.error('Error removing token:', e);
  }
}

// Attach token to all requests
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
export { getToken, setToken, removeToken };
