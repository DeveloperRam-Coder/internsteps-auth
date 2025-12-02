import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { loginApi, registerApi, meApi, logoutApi } from '../api/auth';
import { get, saveAuth, clearAuth } from '../../../core/utils/storage';
import { User } from '../../../types';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { email: string; password: string; name?: string; mobile: string }) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    bootstrap();
  }, []);

  const bootstrap = async () => {
    try {
      const token = await get('access_token');
      if (token) {
        const res = await meApi();
        setUser(res.data);
      }
    } catch (e) {
      console.log('Bootstrap error:', e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await loginApi({ email, password });
    const data = res.data;
    await saveAuth(data.access_token, data.refresh_token);
    setUser(data.user ?? null);
  };

  const register = async (payload: { email: string; password: string; name?: string; mobile: string }) => {
    const res = await registerApi(payload);
    const data = res.data;
    await saveAuth(data.access_token, data.refresh_token);
    setUser(data.user ?? null);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.log('Logout API error:', e);
    }
    await clearAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
