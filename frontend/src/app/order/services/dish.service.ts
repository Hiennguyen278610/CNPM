import axios from 'axios';

const API_URL = `http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api`;  
console.log('API_URL:', API_URL);
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
    dishType: string;
}

export const dishService = {
    getAllDishes: async (): Promise<Dish[]> => {
        const response = await api.get<Dish[]>('/dish'); // Chỉ định kiểu trả về là Dish[]
        console.log('Dishes fetched from API:', response.data);
        return response.data.map(dish => ({
            _id: dish._id || '',
            dishName: dish.dishName || 'Unknown Dish',
            dishPrice: dish.dishPrice || 0,
            dishImg: dish.dishImg || 'placeholder.png',
            dishType: dish.dishType || 'Unknown Type',
        }));
    },

    getDishById: async (id: string): Promise<Dish> => {
        const response = await api.get<Dish>(`/dish/${id}`); // Chỉ định kiểu trả về là Dish
        console.log('Dish fetched by ID:', response.data);
        return {
            _id: response.data._id || '',
            dishName: response.data.dishName || 'Unknown Dish',
            dishPrice: response.data.dishPrice || 0,
            dishImg: response.data.dishImg || 'placeholder.png',
            dishType: response.data.dishType || 'Unknown Type',
        };
    },
};