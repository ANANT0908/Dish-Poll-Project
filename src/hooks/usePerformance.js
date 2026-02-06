import React, { useMemo, useEffect, useState } from 'react';

/**
 * Custom hook to memoize values safely
 * @param {Function} factory - Function to create the value
 * @param {Array} deps - Dependencies
 * @returns {Any} Memoized value
 */
export const useMemoWithFallback = (factory, deps) => {
    return useMemo(() => {
        try {
            return factory();
        } catch (error) {
            console.error('Error in useMemoWithFallback:', error);
            return null;
        }
    }, deps);
};

/**
 * Custom hook for debounced value
 * @param {Any} value - Value to debounce
 * @param {Number} delay - Debounce delay in ms
 * @returns {Any} Debounced value
 */
export const useDebouncedValue = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

/**
 * Custom hook for tracking component mount/unmount
 * @param {String} componentName - Name of the component
 */
export const useComponentLifecycle = (componentName) => {
    useEffect(() => {
        console.log(`${componentName} mounted`);
        return () => {
            console.log(`${componentName} unmounted`);
        };
    }, [componentName]);
};
