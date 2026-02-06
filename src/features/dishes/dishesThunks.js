import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDishesAPI } from '../../services/api/dishApi';
import logger from '../../utils/logger';

export const fetchDishes = createAsyncThunk(
    'dishes/fetchDishes',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { dishes } = getState();
            const oneHour = 60 * 60 * 1000;

            // Check if we have cached data that's still fresh
            if (dishes.lastFetched &&
                Date.now() - dishes.lastFetched < oneHour &&
                dishes.items.length > 0) {
                logger.debug('Using cached dishes data', { 
                    lastFetched: new Date(dishes.lastFetched).toISOString(),
                    itemCount: dishes.items.length 
                });
                return dishes.items;
            }

            logger.info('Fetching dishes from API');
            const data = await fetchDishesAPI();
            logger.info('Successfully fetched dishes', { count: data.length });
            return data;
        } catch (error) {
            logger.error('Failed to fetch dishes', error);
            return rejectWithValue(
                error.message || 'Failed to fetch dishes. Please try again.'
            );
        }
    }
);
