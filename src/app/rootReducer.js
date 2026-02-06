import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dishesReducer from '../features/dishes/dishesSlice';
import pollReducer from '../features/poll/pollSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    dishes: dishesReducer,
    poll: pollReducer
});

export default rootReducer;
