import axiosInstance from './axiosConfig';
import { DISHES_URL } from './endpoints';

export const fetchDishesAPI = async () => {
    try {
        const response = await axiosInstance.get(DISHES_URL);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            'Failed to fetch dishes. Please check your connection.'
        );
    }
};
