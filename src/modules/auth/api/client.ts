import api from '../../../core/api/client';
import { AxiosResponse } from 'axios';

export type CreateClientPayload = {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  paymentProviderAccountId?: string;
};

export const createClientApi = (payload: CreateClientPayload): Promise<AxiosResponse<any>> =>
  api.post('/clients', payload);

export const checkClientExistsApi = (): Promise<AxiosResponse<any>> =>
  api.get('/clients/by-user/check');

export const getClientByIdApi = (clientId: string | number): Promise<AxiosResponse<any>> =>
  api.get(`/clients/${clientId}`);
