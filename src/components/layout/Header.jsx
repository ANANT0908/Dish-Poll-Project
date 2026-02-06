import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { selectCurrentUser } from '../../features/auth/authSelectors';
import { BUTTON_STYLES, LAYOUT } from '../../utils/styleConstants';
import logger from '../../utils/logger';

const Header = memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);

    const handleLogout = () => {
        logger.info('User logging out', { username: currentUser?.username });
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className={`${LAYOUT.CONTAINER} py-2 sm:py-3 lg:py-4`}>
                <div className="flex justify-between items-center gap-2">
                    {/* Logo section */}
                    <div 
                        className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 flex-1 sm:flex-none"
                        onClick={() => navigate('/vote')}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => e.key === 'Enter' && navigate('/vote')}
                        aria-label="DishPoll Home"
                    >
                        <div className="inline-flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg shadow-md group-hover:shadow-lg transition-shadow flex-shrink-0">
                            <span className="text-lg sm:text-xl">🍽️</span>
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-lg sm:text-xl font-bold font-display text-gray-900 truncate">DishPoll</h1>
                            <p className="text-xs text-gray-500 font-medium">Vote • Rank</p>
                        </div>
                    </div>

                    {/* User section */}
                    {currentUser && (
                        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                            <div className="hidden sm:block text-right">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Welcome</p>
                                <p className="font-semibold text-gray-900 flex items-center gap-1.5 text-sm line-clamp-1">
                                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                        {currentUser.username.charAt(0).toUpperCase()}
                                    </span>
                                    <span className="truncate">{currentUser.username}</span>
                                </p>
                            </div>
                            <div className="h-6 sm:h-8 w-px bg-gray-200 hidden sm:block"></div>
                            <button
                                onClick={handleLogout}
                                className={`${BUTTON_STYLES.DANGER} px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm flex-shrink-0 whitespace-nowrap`}
                                aria-label="Logout"
                                title="Sign out of your account"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
});

Header.displayName = 'Header';

export default Header;
