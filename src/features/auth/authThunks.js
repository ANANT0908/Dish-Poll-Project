import { createAsyncThunk } from '@reduxjs/toolkit';
import users from '../../data/users.json';
import logger from '../../utils/logger';

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            if (!username || !password) {
                logger.warn('Login attempt with missing credentials');
                return rejectWithValue('Username and password are required');
            }

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const user = users.find(
                u => u.username === username && u.password === password
            );

            if (!user) {
                logger.warn('Login failed: invalid credentials', { username });
                return rejectWithValue('Invalid username or password');
            }

            const { password: _, ...userWithoutPassword } = user;
            logger.info('User logged in successfully', { username, userId: user.id });
            return userWithoutPassword;
        } catch (error) {
            logger.error('Login error:', error);
            return rejectWithValue('Login failed. Please try again.');
        }
    }
);
