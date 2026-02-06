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
        <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-primary-600 via-secondary-600 to-secondary-700 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-80 h-80 bg-secondary-400 opacity-3 rounded-full blur-3xl"></div>
            </div>

            {/* Main container */}
            <div className="w-full min-h-[100dvh] flex flex-col lg:flex-row relative z-20">

                {/* Left side - Branding (desktop only) */}
                <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center px-12 text-white py-8">
                    <div className="text-center max-w-sm">
                        <div className="inline-flex items-center justify-center w-28 h-28 bg-white bg-opacity-20 rounded-3xl mb-6 backdrop-blur-xl ring-2 ring-white ring-opacity-30 shadow-2xl">
                            <span className="text-7xl">🍽️</span>
                        </div>
                        <h1 className="text-5xl font-display font-bold mb-2">DishPoll</h1>
                        <p className="text-lg text-white text-opacity-90 mb-8">
                            Collaborative Voting Platform
                        </p>

                        <div className="space-y-3 text-left bg-white bg-opacity-[0.08] backdrop-blur-xl rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center">
                                    🗳️
                                </div>
                                <div>
                                    <h3 className="font-semibold">Cast Your Vote</h3>
                                    <p className="text-xs opacity-85">Select and rank dishes</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center">
                                    📊
                                </div>
                                <div>
                                    <h3 className="font-semibold">View Results</h3>
                                    <p className="text-xs opacity-85">Track live rankings</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center">
                                    🏆
                                </div>
                                <div>
                                    <h3 className="font-semibold">Earn Points</h3>
                                    <p className="text-xs opacity-85">30 • 20 • 10 points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Login */}
                <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-center px-4 sm:px-6 lg:px-12 py-6 lg:py-16">
                    <div className="w-full max-w-md">

                        {/* Mobile branding */}
                        <div className="lg:hidden text-center mb-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-2xl mb-2">
                                <span className="text-3xl">🍽️</span>
                            </div>
                            <h1 className="text-3xl font-bold text-white">DishPoll</h1>
                        </div>

                        {/* Card */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-6 sm:px-8 py-4 sm:py-8 border-b">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-3xl">🔐</span>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Welcome Back
                                    </h2>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Sign in to your account
                                </p>
                            </div>

                            {/* Form */}
                            <div className="px-5 sm:px-8 py-5 sm:py-8">
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    {/* Username */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-800">
                                            👤 Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            className="w-full mt-1 px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-200"
                                        />
                                        {formErrors.username && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {formErrors.username}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-800">
                                            🔑 Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            className="w-full mt-1 px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-200"
                                        />
                                        {formErrors.password && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {formErrors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold shadow-lg disabled:opacity-60"
                                    >
                                        {isLoading ? 'Signing In…' : 'Sign In'}
                                    </button>
                                </form>

                                <p className="text-center text-[10px] text-gray-600 mt-4">
                                    🔒 Demo app • Credentials are secure
                                </p>
                            </div>
                        </div>

                        <p className="text-center text-[10px] text-white opacity-70 mt-4">
                            © 2026 DishPoll
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
