import { memo } from 'react';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './components/common/Toast';

const App = memo(() => {
    return (
        <ErrorBoundary>
            <ToastProvider>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
                    <AppRoutes />
                </div>
                <ToastContainer />
            </ToastProvider>
        </ErrorBoundary>
    );
});

App.displayName = 'App';

export default App;
