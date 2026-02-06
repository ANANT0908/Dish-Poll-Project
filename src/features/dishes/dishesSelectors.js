import { createSelector } from '@reduxjs/toolkit';

export const selectDishes = (state) => state.dishes;

export const selectAllDishes = createSelector(
    [selectDishes],
    (dishes) => dishes.items
);

export const selectDishesLoading = createSelector(
    [selectDishes],
    (dishes) => dishes.isLoading
);

export const selectDishesError = createSelector(
    [selectDishes],
    (dishes) => dishes.error
);

export const selectDishById = (dishId) => createSelector(
    [selectAllDishes],
    (dishes) => dishes.find(dish => dish.id === dishId)
);
