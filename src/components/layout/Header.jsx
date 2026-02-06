import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { selectCurrentUser } from '../../features/auth/authSelectors';
import { BUTTON_STYLES } from '../../utils/styleConstants';
import logger from '../../utils/logger';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);

    const handleLogout = () => {
        logger.info('User logging out', { username: currentUser?.username });
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-md border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div 
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate('/vote')}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && navigate('/vote')}
                    aria-label="DishPoll Home"
                >
                    <div className="text-4xl">🍽️</div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">DishPoll</h1>
                        <p className="text-xs text-gray-500">Vote · Track · Win</p>
                    </div>
                </div>

                {currentUser && (
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Logged in as</p>
                            <p className="font-bold text-gray-800 flex items-center gap-1">
                                <span>👤</span>
                                {currentUser.username}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className={`${BUTTON_STYLES.DANGER} px-6 py-2`}
                            aria-label="Logout"
                        >
                            <span className="hidden sm:inline">Logout</span>
                            <span className="sm:hidden">Sign Out</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
