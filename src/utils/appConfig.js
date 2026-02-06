/**
 * Application-wide constants
 */

export const APP_CONSTANTS = {
    APP_NAME: 'DishPoll',
    MAX_DISHES_SELECTABLE: 3,
    VOTE_POINTS: {
        RANK_1: 30,
        RANK_2: 20,
        RANK_3: 10,
    },
    CACHE_DURATION: {
        DISHES: 60 * 60 * 1000, // 1 hour
    },
    API: {
        TIMEOUT: 10000, // 10 seconds
    },
    TOAST_DURATION: {
        SHORT: 3000,
        MEDIUM: 4000,
        LONG: 5000,
    }
};

export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    GENERIC: 'Something went wrong. Please try again.',
};
