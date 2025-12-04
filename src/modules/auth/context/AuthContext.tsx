import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { loginApi, registerApi, meApi, logoutApi } from '../api/auth';
import { checkClientExistsApi, createClientApi, CreateClientPayload } from '../api/client';
import { get, saveAuth, clearAuth } from '../../../core/utils/storage';
import { User } from '../../../types';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  businessDetails: any | null;
  hasBusinessDetails: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { email: string; password: string; name?: string; mobile: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkBusinessDetails: () => Promise<void>;
  createBusinessDetails: (payload: CreateClientPayload) => Promise<any>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [businessDetails, setBusinessDetails] = useState<any | null>(null);
  const [hasBusinessDetails, setHasBusinessDetails] = useState<boolean>(false);

  useEffect(() => {
    bootstrap();
  }, []);

  const bootstrap = async () => {
    try {
      const token = await get('access_token');
      if (token) {
        const res = await meApi();
        setUser(res.data);
        // Check for business details
        await checkBusinessDetailsInternal();
      }
    } catch (e) {
      console.log('Bootstrap error:', e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const checkBusinessDetailsInternal = async () => {
    try {
      const res = await checkClientExistsApi();
      if (res.data?.exists && res.data?.client) {
        setBusinessDetails(res.data.client);
        setHasBusinessDetails(true);
      } else {
        setBusinessDetails(null);
        setHasBusinessDetails(false);
      }
    } catch (e) {
      console.log('Error checking business details:', e);
      setBusinessDetails(null);
      setHasBusinessDetails(false);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await loginApi({ email, password });
    const data = res.data;
    await saveAuth(data.access_token, data.refresh_token);
    setUser(data.user ?? null);
    // Check business details after login
    await checkBusinessDetailsInternal();
  };

  const register = async (payload: { email: string; password: string; name?: string; mobile: string }) => {
    const res = await registerApi(payload);
    const data = res.data;
    await saveAuth(data.access_token, data.refresh_token);
    setUser(data.user ?? null);
    // Reset business details on new registration
    setBusinessDetails(null);
    setHasBusinessDetails(false);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.log('Logout API error:', e);
    }
    await clearAuth();
    setUser(null);
    setBusinessDetails(null);
    setHasBusinessDetails(false);
  };

  const checkBusinessDetails = async () => {
    await checkBusinessDetailsInternal();
  };

  const createBusinessDetails = async (payload: CreateClientPayload) => {
    const res = await createClientApi(payload);
    const client = res.data;
    setBusinessDetails(client);
    setHasBusinessDetails(true);
    return client;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      businessDetails,
      hasBusinessDetails,
      login,
      register,
      logout,
      checkBusinessDetails,
      createBusinessDetails,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
