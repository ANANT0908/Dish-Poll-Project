import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';

/**
 * Custom hook to use Toast notifications
 * @returns {Object} Toast utilities
 */
export const useToast = () => {
    const context = useContext(ToastContext);
    
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return {
        success: (message, duration = 3000) => context.addToast(message, 'success', duration),
        error: (message, duration = 5000) => context.addToast(message, 'error', duration),
        info: (message, duration = 3000) => context.addToast(message, 'info', duration),
        warning: (message, duration = 4000) => context.addToast(message, 'warning', duration),
    };
};
