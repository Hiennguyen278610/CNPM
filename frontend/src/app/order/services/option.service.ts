import axios from 'axios';

const API_URL = 'http://localhost:3001/backend/api';

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
    getGroupOptionsByDishId: async (dishId: string): Promise<GroupOption[]> => {
        const response = await api.get<GroupOption[]>(`/option-group/dish/${dishId}`); // Chỉ định kiểu trả về là GroupOption[]
        console.log('Group options fetched:', response.data); // Log để debug
        return response.data.map(group => ({
            _id: group._id || '',
            dishID: group.dishID || dishId,
            optionID: (group.optionID || []).map((opt: Option) => ({
                _id: opt._id || '',
                optionName: opt.optionName || 'Unknown Option',
                optionPrice: opt.optionPrice || 0,
            })),
            optionGroupName: group.optionGroupName || 'Unknown Group',
        }));
    },

    getOptionsByGroupId: async (groupId: string): Promise<Option[]> => {
        const response = await api.get<Option[]>(`/option/${groupId}`); // Chỉ định kiểu trả về là Option[]
        console.log('Options fetched:', response.data); // Log để debug
        return response.data.map(opt => ({
            _id: opt._id || '',
            optionName: opt.optionName || 'Unknown Option',
            optionPrice: opt.optionPrice || 0,
        }));
    },
};