import api from '../../../core/api/client';
import { AxiosResponse } from 'axios';

type LoginPayload = { email: string; password: string };
type RegisterPayload = { email: string; password: string; name?: string };

export const loginApi = (payload: LoginPayload): Promise<AxiosResponse<any>> =>
  api.post('/auth/login', payload);

export const registerApi = (payload: RegisterPayload): Promise<AxiosResponse<any>> =>
  api.post('/auth/register', payload);

export const refreshApi = (refresh_token: string): Promise<AxiosResponse<any>> =>
  api.post('/auth/refresh', { refresh_token });

export const meApi = (): Promise<AxiosResponse<any>> => api.get('/auth/me');
