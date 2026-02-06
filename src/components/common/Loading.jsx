const Loading = ({ message = 'Loading...', fullScreen = false }) => {
    const content = (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="relative w-20 h-20 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600 animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-600 font-semibold text-lg">{message}</p>
            <div className="mt-2 flex gap-1">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
                {content}
            </div>
        );
    }

    return content;
};

export default Loading;
