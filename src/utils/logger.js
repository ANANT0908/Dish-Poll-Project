/**
 * Logger utility for consistent logging across the application
 */

const LogLevel = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG',
};

const isDevelopment = process.env.NODE_ENV === 'development';

const formatMessage = (level, message, data) => {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}${data ? ': ' + JSON.stringify(data) : ''}`;
};

const logger = {
    info: (message, data) => {
        const formatted = formatMessage(LogLevel.INFO, message, data);
        console.log(`%c${formatted}`, 'color: #0066cc');
    },

    warn: (message, data) => {
        const formatted = formatMessage(LogLevel.WARN, message, data);
        console.warn(`%c${formatted}`, 'color: #ff9900');
    },

    error: (message, error) => {
        const formatted = formatMessage(LogLevel.ERROR, message);
        console.error(`%c${formatted}`, 'color: #cc0000');
        if (error) {
            console.error('Error Details:', error);
        }
    },

    debug: (message, data) => {
        if (isDevelopment) {
            const formatted = formatMessage(LogLevel.DEBUG, message, data);
            console.log(`%c${formatted}`, 'color: #666666');
        }
    },
};

export default logger;
