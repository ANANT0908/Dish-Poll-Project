import { NavLink } from 'react-router-dom';

const Navigation = () => {
    const navItems = [
        { path: '/vote', label: 'Vote', icon: '🗳️', description: 'Cast your votes' },
        { path: '/results', label: 'Results', icon: '📊', description: 'View rankings' }
    ];

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="flex gap-1">
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-200 relative
                                ${isActive
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }
                            `}
                            title={item.description}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="hidden sm:inline">{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
