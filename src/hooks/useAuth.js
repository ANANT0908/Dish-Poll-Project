import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import {
    selectCurrentUser,
    selectIsAuthenticated,
    selectAuthLoading,
    selectAuthError
} from '../features/auth/authSelectors';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isLoading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return {
        currentUser,
        isAuthenticated,
        isLoading,
        error,
        logout: handleLogout
    };
};
