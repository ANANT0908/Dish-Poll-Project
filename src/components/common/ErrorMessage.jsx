import { memo } from 'react';
import { BUTTON_STYLES } from '../../utils/styleConstants';

const ErrorMessage = memo(({ message, onRetry, title = 'Something went wrong' }) => {
    return (
        <div className="max-w-md mx-auto py-12 px-4">
            <div className="bg-white rounded-2xl border-2 border-red-200 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-2xl font-bold text-red-900 mb-2">{title}</h3>
                    <p className="text-red-700 text-sm leading-relaxed">{message}</p>
                </div>
                
                <div className="p-6 space-y-3">
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className={`${BUTTON_STYLES.PRIMARY} w-full justify-center`}
                        >
                            🔄 Try Again
                        </button>
                    )}
                    <button
                        onClick={() => window.location.href = '/'}
                        className={`${BUTTON_STYLES.SECONDARY} w-full justify-center`}
                    >
                        🏠 Go Home
                    </button>
                </div>
            </div>
        </div>
    );
});

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
