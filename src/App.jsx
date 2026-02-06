import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './components/common/Toast';

function App() {
    return (
        <ErrorBoundary>
            <ToastProvider>
                <div className="min-h-screen bg-gray-50">
                    <AppRoutes />
                </div>
                <ToastContainer />
            </ToastProvider>
        </ErrorBoundary>
    );
}

export default App;
