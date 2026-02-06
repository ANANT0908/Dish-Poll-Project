/**
 * Tailwind CSS class constants for consistent styling
 * Modern, professional design system
 */

export const BUTTON_STYLES = {
    PRIMARY: 'inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200',
    SECONDARY: 'inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    DANGER: 'inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200',
    GHOST: 'inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200',
    SMALL: 'inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold transition-colors duration-200',
};

export const INPUT_STYLES = {
    DEFAULT: 'w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200 text-base',
    ERROR: 'w-full px-4 py-2.5 rounded-lg border border-red-300 bg-red-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-200 focus:border-red-500 focus:outline-none transition-all duration-200 text-base',
};

export const CARD_STYLES = {
    DEFAULT: 'bg-white rounded-xl border border-gray-100 shadow-base transition-all duration-300',
    HOVER: 'bg-white rounded-xl border border-gray-100 shadow-base transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
    ELEVATED: 'bg-white rounded-xl shadow-lg border border-gray-200',
};

export const BADGE_STYLES = {
    SUCCESS: 'inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold',
    ERROR: 'inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold',
    INFO: 'inline-flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-semibold',
    WARNING: 'inline-flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold',
    PRIMARY: 'inline-flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-semibold',
};

export const LAYOUT = {
    CONTAINER: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    GRID_2: 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8',
    GRID_3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
    GRID_4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8',
    GRID_RESPONSIVE: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6',
};

export const SPACING = {
    SMALL: 'p-4 sm:p-5',
    MEDIUM: 'p-6 sm:p-7',
    LARGE: 'p-8 sm:p-10',
};

export const ANIMATION = {
    FADE_IN: 'animate-fadeIn',
    SLIDE_IN: 'animate-slideIn',
    SLIDE_DOWN: 'animate-slideDown',
    SCALE_IN: 'animate-scaleIn',
    PULSE: 'animate-pulse',
};

export const COLORS = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    ACCENT: 'accent',
    SUCCESS: 'green',
    ERROR: 'red',
    WARNING: 'amber',
    INFO: 'blue',
};
