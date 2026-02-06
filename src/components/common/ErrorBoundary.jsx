import { Component } from 'react';
import logger from '../../utils/logger';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        logger.error('Critical application error', error);
        logger.error('Error Info', errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
                    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
                        <div className="text-center">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h1 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h1>
                            <p className="text-gray-700 mb-6">
                                The application encountered an unexpected error. Our team has been notified.
                            </p>
                            {process.env.NODE_ENV === 'development' && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-left">
                                    <p className="text-xs font-mono text-red-800 break-all">
                                        {this.state.error?.message}
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-3">
                                <button
                                    onClick={this.handleReset}
                                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                                >
                                    Try Again
                                </button>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 font-semibold transition-colors"
                                >
                                    Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
