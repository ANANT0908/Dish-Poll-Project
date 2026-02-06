import { createSlice } from '@reduxjs/toolkit';
import { fetchDishes } from './dishesThunks';

const initialState = {
    items: [],
    isLoading: false,
    error: null,
    lastFetched: null
};

const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        clearDishes: (state) => {
            state.items = [];
            state.lastFetched = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDishes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDishes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.lastFetched = Date.now();
                state.error = null;
            })
            .addCase(fetchDishes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearDishes } = dishesSlice.actions;
export default dishesSlice.reducer;
