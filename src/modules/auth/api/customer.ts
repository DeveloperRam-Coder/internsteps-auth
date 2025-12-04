import api from '../../../core/api/client';
import { AxiosResponse } from 'axios';

export type CreateCustomerPayload = {
  clientId: number | string;
  firstName: string;
  lastName?: string;
  mobile: string;
  email?: string;
  address?: string;
};

export const createCustomerApi = (payload: CreateCustomerPayload): Promise<AxiosResponse<any>> =>
  api.post('/customers', payload);

export const getCustomersByClientIdApi = (clientId: string | number): Promise<AxiosResponse<any>> =>
  api.get(`/customers/by-client/${clientId}`);
