import axios from 'axios';
import queryString from 'query-string';
import { AppUserInterface, AppUserGetQueryInterface } from 'interfaces/app-user';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAppUsers = async (query?: AppUserGetQueryInterface): Promise<PaginatedInterface<AppUserInterface>> => {
  const response = await axios.get('/api/app-users', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAppUser = async (appUser: AppUserInterface) => {
  const response = await axios.post('/api/app-users', appUser);
  return response.data;
};

export const updateAppUserById = async (id: string, appUser: AppUserInterface) => {
  const response = await axios.put(`/api/app-users/${id}`, appUser);
  return response.data;
};

export const getAppUserById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/app-users/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAppUserById = async (id: string) => {
  const response = await axios.delete(`/api/app-users/${id}`);
  return response.data;
};
