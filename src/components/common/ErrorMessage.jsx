const ErrorMessage = ({ message, onRetry, title = 'Oops! Something went wrong' }) => {
    return (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center max-w-md mx-auto">
            <div className="text-6xl mb-4 animate-bounce">⚠️</div>
            <h3 className="text-2xl font-bold text-red-800 mb-3">{title}</h3>
            <p className="text-red-700 mb-6 text-sm leading-relaxed">{message}</p>
            <div className="flex gap-3 flex-col sm:flex-row">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold active:scale-95"
                    >
                        🔄 Try Again
                    </button>
                )}
                <button
                    onClick={() => window.location.href = '/'}
                    className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-200 font-semibold active:scale-95"
                >
                    🏠 Go Home
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;
