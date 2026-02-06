import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../authThunks';
import { clearError } from '../authSlice';
import {
    selectIsAuthenticated,
    selectAuthLoading,
    selectAuthError
} from '../authSelectors';

const LoginForm = memo(() => {
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
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-secondary-600 to-secondary-700 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-80 h-80 bg-secondary-400 opacity-3 rounded-full blur-3xl"></div>
            </div>

            {/* Main container */}
            <div className="w-full h-screen flex flex-col lg:flex-row relative z-20">

                {/* Left side - Branding (hidden on mobile) */}
                <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center px-12 text-white py-8">
                    <div className="text-center max-w-sm">
                        <div className="inline-flex items-center justify-center w-28 h-28 bg-white bg-opacity-20 rounded-3xl mb-6 backdrop-blur-xl ring-2 ring-white ring-opacity-30 shadow-2xl transform hover:scale-105 transition-transform duration-300 mt-4">
                            <span className="text-7xl drop-shadow-lg">🍽️</span>
                        </div>
                        <h1 className="text-5xl font-display font-bold mb-2 drop-shadow-lg tracking-tight">DishPoll</h1>
                        <p className="text-lg text-white text-opacity-90 mb-8 font-light tracking-wide leading-relaxed">
                            Collaborative Voting Platform
                        </p>

                        <div className="space-y-3 text-left bg-white bg-opacity-[0.08] backdrop-blur-xl rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center">
                                    <span className="text-xl">🗳️</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-0.5">Cast Your Vote</h3>
                                    <p className="text-xs text-white text-opacity-85 leading-relaxed">Select and rank your top 3 dishes</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center">
                                    <span className="text-xl">📊</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-0.5">View Results</h3>
                                    <p className="text-xs text-white text-opacity-85 leading-relaxed">Track real-time rankings</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center">
                                    <span className="text-xl">🏆</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-0.5">Earn Points</h3>
                                    <p className="text-xs text-white text-opacity-85 leading-relaxed">Score 30, 20, or 10 points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Login form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-4 lg:py-16">
                    <div className="w-full max-w-md">
                        {/* Mobile branding */}
                        <div className="lg:hidden text-center mb-4 pt-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-2xl mb-2 backdrop-blur-lg ring-2 ring-white ring-opacity-30">
                                <span className="text-3xl">🍽️</span>
                            </div>
                            <h1 className="text-3xl font-display font-bold text-white mb-1">DishPoll</h1>
                        </div>

                        {/* Form card - Enhanced design */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform transition-all">
                            {/* Header with gradient */}
                            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-6 sm:px-8 py-5 sm:py-8 border-b border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl">🔐</span>
                                    <h2 className="text-2xl font-display font-bold text-gray-900">Welcome Back</h2>
                                </div>
                                <p className="text-gray-600 text-sm font-medium">Sign in to your account</p>
                            </div>

                            {/* Form section */}
                            <div className="px-6 sm:px-8 py-6 sm:py-8">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Username field */}
                                    <div className="space-y-2.5">
                                        <label htmlFor="username" className="block text-sm font-semibold text-gray-800 flex items-center gap-2">
                                            <span>👤</span>
                                            Username
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                disabled={isLoading}
                                                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 font-medium text-gray-900 placeholder-gray-400 focus:outline-none ${formErrors.username
                                                    ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                                    : 'border-gray-300 bg-gray-50 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200'
                                                    }`}
                                                placeholder="Enter your username"
                                                aria-label="Username"
                                                aria-invalid={!!formErrors.username}
                                                autoComplete="username"
                                            />
                                        </div>
                                        {formErrors.username && (
                                            <p className="text-red-600 text-xs font-semibold flex items-center gap-1.5 animate-slideDown">
                                                <span>✕</span>
                                                {formErrors.username}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password field */}
                                    <div className="space-y-2.5">
                                        <label htmlFor="password" className="block text-sm font-semibold text-gray-800 flex items-center gap-2">
                                            <span>🔑</span>
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                disabled={isLoading}
                                                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 font-medium text-gray-900 placeholder-gray-400 focus:outline-none ${formErrors.password
                                                    ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                                    : 'border-gray-300 bg-gray-50 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200'
                                                    }`}
                                                placeholder="Enter your password"
                                                aria-label="Password"
                                                aria-invalid={!!formErrors.password}
                                                autoComplete="current-password"
                                            />
                                        </div>
                                        {formErrors.password && (
                                            <p className="text-red-600 text-xs font-semibold flex items-center gap-1.5 animate-slideDown">
                                                <span>✕</span>
                                                {formErrors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Error message - Enhanced */}
                                    {formErrors.submit && (
                                        <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-4 text-red-800 text-sm font-semibold flex items-start gap-3 animate-slideDown shadow-sm">
                                            <span className="text-lg flex-shrink-0 mt-0.5">⚠️</span>
                                            <div>
                                                <p className="font-bold">Authentication Failed</p>
                                                <p className="text-xs text-red-700 mt-0.5">{formErrors.submit}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Submit button - Premium style */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-base font-display`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Signing In...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>🚀</span>
                                                <span>Sign In</span>
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Info note */}
                                <div className="mt-4 pt-3 border-t border-gray-200">
                                    <p className="text-center text-[10px] text-gray-600 font-medium leading-relaxed">
                                        🔒 Your credentials are secure. This is a demo.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <p className="text-center text-[10px] text-white text-opacity-70 mt-4 font-medium">
                            © 2026 DishPoll • All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
