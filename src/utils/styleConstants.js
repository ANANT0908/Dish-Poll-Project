/**
 * Tailwind CSS class constants for consistent styling
 */

export const BUTTON_STYLES = {
    PRIMARY: 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-semibold',
    SECONDARY: 'bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold',
    DANGER: 'bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold',
    SMALL: 'px-3 py-1 rounded text-xs font-medium transition-colors duration-200',
};

export const INPUT_STYLES = {
    DEFAULT: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
    ERROR: 'w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-red-50',
};

export const CARD_STYLES = {
    DEFAULT: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
    ELEVATED: 'bg-white rounded-lg shadow-lg',
};

export const BADGE_STYLES = {
    SUCCESS: 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold',
    ERROR: 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold',
    INFO: 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold',
    WARNING: 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold',
};

export const LAYOUT = {
    CONTAINER: 'container mx-auto px-4',
    GRID_2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    GRID_3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    GRID_4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
};

export const SPACING = {
    SMALL: 'p-4',
    MEDIUM: 'p-6',
    LARGE: 'p-8',
};

export const ANIMATION = {
    FADE_IN: 'animate-fadeIn',
    SLIDE_IN: 'animate-slideIn',
    PULSE: 'animate-pulse',
};
