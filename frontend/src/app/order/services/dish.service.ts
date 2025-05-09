import axios from 'axios';

const API_URL = 'http://localhost:5000/backend/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface Dish {
  _id: string;
  dishName: string;
  dishPrice: number;
  dishImg: string;
}

export const dishService = {
  // Get all dishes
  getAllDishes: async () => {
    const response = await api.get('/dish');
    return response.data;
  },

  // Get dish by ID
  getDishById: async (id: string) => {
    const response = await api.get(`/dish/${id}`);
    return response.data;
  }
}; 