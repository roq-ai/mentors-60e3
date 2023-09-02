import axios from 'axios';
import queryString from 'query-string';
import { AvailableHoursInterface, AvailableHoursGetQueryInterface } from 'interfaces/available-hours';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAvailableHours = async (
  query?: AvailableHoursGetQueryInterface,
): Promise<PaginatedInterface<AvailableHoursInterface>> => {
  const response = await axios.get('/api/available-hours', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAvailableHours = async (availableHours: AvailableHoursInterface) => {
  const response = await axios.post('/api/available-hours', availableHours);
  return response.data;
};

export const updateAvailableHoursById = async (id: string, availableHours: AvailableHoursInterface) => {
  const response = await axios.put(`/api/available-hours/${id}`, availableHours);
  return response.data;
};

export const getAvailableHoursById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/available-hours/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAvailableHoursById = async (id: string) => {
  const response = await axios.delete(`/api/available-hours/${id}`);
  return response.data;
};
