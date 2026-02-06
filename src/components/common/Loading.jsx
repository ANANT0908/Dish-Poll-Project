import { memo } from 'react';

const Loading = memo(({ message = 'Loading...', fullScreen = false }) => {
    const content = (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="relative w-20 h-20 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-primary-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 border-r-secondary-600 animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-700 font-semibold text-lg text-center px-4">{message}</p>
            <div className="mt-4 flex gap-2">
                <span className="w-2.5 h-2.5 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-2.5 h-2.5 bg-secondary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2.5 h-2.5 bg-accent-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md z-50">
                {content}
            </div>
        );
    }

    return content;
});

Loading.displayName = 'Loading';

export default Loading;
