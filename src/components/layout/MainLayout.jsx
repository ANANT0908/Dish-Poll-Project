import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { LAYOUT } from '../../utils/styleConstants';

const MainLayout = memo(() => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
            <Header />
            <Navigation />
            <main className={`${LAYOUT.CONTAINER} py-6 sm:py-8 lg:py-10 flex-1 animate-fadeIn`}>
                <Outlet />
            </main>
            
            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white mt-12 sm:mt-16">
                <div className={`${LAYOUT.CONTAINER} py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-600`}>
                    <p>© 2026 DishPoll • All rights reserved</p>
                </div>
            </footer>
        </div>
    );
});

MainLayout.displayName = 'MainLayout';

export default MainLayout;
