import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../authThunks';
import { clearError } from '../authSlice';
import {
    selectIsAuthenticated,
    selectAuthLoading,
    selectAuthError
} from '../authSelectors';
import { INPUT_STYLES, BUTTON_STYLES } from '../../../utils/styleConstants';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isLoading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/vote');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (error) {
            setFormErrors(prev => ({ ...prev, submit: error }));
        }
        return () => {
            dispatch(clearError());
        };
    }, [error, dispatch]);

    const validateForm = () => {
        const errors = {};
        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }
        if (formData.password && formData.password.length < 3) {
            errors.password = 'Password must be at least 3 characters';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        
        setFormErrors({});
        dispatch(loginUser(formData));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear field error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">🍽️</div>
                    <h1 className="text-3xl font-bold text-gray-800">DishPoll</h1>
                    <p className="text-gray-600 text-sm mt-2">Vote for your favorite dishes</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={isLoading}
                            className={`${INPUT_STYLES.DEFAULT} ${formErrors.username ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Enter username"
                            aria-label="Username"
                            aria-invalid={!!formErrors.username}
                        />
                        {formErrors.username && (
                            <p className="text-red-600 text-xs font-medium mt-1">{formErrors.username}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isLoading}
                            className={`${INPUT_STYLES.DEFAULT} ${formErrors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Enter password"
                            aria-label="Password"
                            aria-invalid={!!formErrors.password}
                        />
                        {formErrors.password && (
                            <p className="text-red-600 text-xs font-medium mt-1">{formErrors.password}</p>
                        )}
                    </div>

                    {formErrors.submit && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                            <span className="text-lg">⚠️</span>
                            <span>{formErrors.submit}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${BUTTON_STYLES.PRIMARY} w-full relative`}
                    >
                        {isLoading ? (
                            <>
                                <span className="opacity-0">Login</span>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                </div>
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-center text-xs text-gray-600 font-semibold mb-4 uppercase tracking-wider">Demo Credentials</p>
                    <div className="space-y-2 bg-blue-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">User 1:</span>
                            <span className="text-gray-600 text-xs font-mono">amar / amar123</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">User 2:</span>
                            <span className="text-gray-600 text-xs font-mono">akbar / akbar123</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
