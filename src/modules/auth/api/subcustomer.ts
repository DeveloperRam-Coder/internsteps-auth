import api from '../../../core/api/client';
import { AxiosResponse } from 'axios';

export type CreateSubCustomerPayload = {
  clientId: number | string;
  customerId: number | string;
  firstName: string;
  lastName?: string;
  mobile: string;
  email?: string;
  address?: string;
};

export const createSubCustomerApi = (payload: CreateSubCustomerPayload): Promise<AxiosResponse<any>> =>
  api.post('/subcustomers', payload);

export const getSubCustomersByCustomerIdApi = (customerId: string | number): Promise<AxiosResponse<any>> =>
  api.get(`/subcustomers/by-customer/${customerId}`);
