import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { LAYOUT } from '../../utils/styleConstants';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Navigation />
            <main className={`${LAYOUT.CONTAINER} py-10`}>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
