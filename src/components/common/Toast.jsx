import { useContext } from 'react';
import { ToastContext } from '../../contexts/ToastContext';

const Toast = ({ toast, onClose }) => {
    const getStyles = (type) => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-800',
                    icon: '✓',
                    iconBg: 'bg-green-100',
                };
            case 'error':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-800',
                    icon: '✕',
                    iconBg: 'bg-red-100',
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    text: 'text-yellow-800',
                    icon: '!',
                    iconBg: 'bg-yellow-100',
                };
            case 'info':
            default:
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    text: 'text-blue-800',
                    icon: 'i',
                    iconBg: 'bg-blue-100',
                };
        }
    };

    const styles = getStyles(toast.type);

    return (
        <div className={`${styles.bg} border ${styles.border} rounded-lg p-4 flex items-start gap-3 shadow-lg animate-slideIn`}>
            <div className={`${styles.iconBg} rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
                {styles.icon}
            </div>
            <div className="flex-1">
                <p className={`${styles.text} text-sm font-medium`}>{toast.message}</p>
            </div>
            <button
                onClick={() => onClose(toast.id)}
                className={`${styles.text} hover:opacity-75 transition-opacity flex-shrink-0 text-lg leading-none`}
            >
                ×
            </button>
        </div>
    );
};

export const ToastContainer = () => {
    const { toasts, removeToast } = useContext(ToastContext);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onClose={removeToast}
                />
            ))}
        </div>
    );
};
