import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { LAYOUT } from '../../utils/styleConstants';

const Navigation = memo(() => {
    const navItems = [
        { path: '/vote', label: 'Voting', icon: '🗳️', description: 'Cast your votes for dishes' },
        { path: '/results', label: 'Results', icon: '📊', description: 'View rankings and statistics' }
    ];

    return (
        <nav className="sticky top-14 sm:top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
            <div className={`${LAYOUT.CONTAINER}`}>
                <div className="flex gap-0 -mb-px">
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 lg:px-6 py-3 sm:py-4 font-semibold 
                                transition-all duration-200 relative text-xs sm:text-sm lg:text-base
                                ${isActive
                                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent'
                                }
                            `}
                            title={item.description}
                        >
                            <span className="text-base sm:text-lg" aria-hidden="true">{item.icon}</span>
                            <span className="hidden sm:inline font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
});

Navigation.displayName = 'Navigation';

export default Navigation;
