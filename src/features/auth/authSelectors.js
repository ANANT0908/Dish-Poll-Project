import { createSelector } from '@reduxjs/toolkit';

export const selectAuth = (state) => state.auth;

export const selectCurrentUser = createSelector(
    [selectAuth],
    (auth) => auth.currentUser
);

export const selectIsAuthenticated = createSelector(
    [selectCurrentUser],
    (user) => user !== null
);

export const selectAuthLoading = createSelector(
    [selectAuth],
    (auth) => auth.isLoading
);

export const selectAuthError = createSelector(
    [selectAuth],
    (auth) => auth.error
);
