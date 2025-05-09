import axios from 'axios';

const API_URL = 'http://localhost:5000/backend/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface Option {
  _id: string;
  optionName: string;
  optionPrice: number;
}

export interface GroupOption {
  _id: string;
  dishID: string;
  optionID: Option[];
  optionGroupName: string;
}

export const optionService = {
  // Get all group options with their options for a specific dish
  getGroupOptionsByDishId: async (dishId: string) => {
    const response = await api.get(`/option-group/dish/${dishId}`);
    return response.data;
  },

  // Get options by group option ID
  getOptionsByGroupId: async (groupId: string) => {
    const response = await api.get(`/option/${groupId}`);
    return response.data;
  }
}; 