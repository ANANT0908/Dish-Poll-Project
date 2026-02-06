import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../features/auth/components/LoginForm';
import ProtectedRoute from '../features/auth/components/ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';
import DishGrid from '../features/dishes/components/DishGrid';
import PollResults from '../features/poll/components/PollResults';
import * as ROUTES from './routePaths';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginForm />} />

            <Route path={ROUTES.HOME} element={
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            }>
                <Route index element={<Navigate to={ROUTES.VOTE} replace />} />
                <Route path={ROUTES.VOTE} element={<DishGrid />} />
                <Route path={ROUTES.RESULTS} element={<PollResults />} />
            </Route>

            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
};

export default AppRoutes;
