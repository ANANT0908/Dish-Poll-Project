import axios from 'axios';
import logger from '../../utils/logger';

const axiosInstance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        logger.debug('API Request', { url: config.url, method: config.method });
        return config;
    },
    (error) => {
        logger.error('Request Error', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        logger.debug('API Response', { url: response.config.url, status: response.status });
        return response;
    },
    (error) => {
        const errorMessage = {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
        };

        if (error.response) {
            logger.error(`API Error: ${error.response.status}`, {
                ...errorMessage,
                data: error.response.data,
            });
        } else if (error.request) {
            logger.error('Network Error: No response received', {
                ...errorMessage,
                message: error.message,
            });
        } else {
            logger.error('Request Setup Error', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;
