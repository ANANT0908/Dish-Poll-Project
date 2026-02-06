import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from '../features/auth/components/ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';
import Loading from '../components/common/Loading';
import * as ROUTES from './routePaths';

// Lazy load heavy components
const LoginForm = lazy(() => import('../features/auth/components/LoginForm'));
const DishGrid = lazy(() => import('../features/dishes/components/DishGrid'));
const PollResults = lazy(() => import('../features/poll/components/PollResults'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={
                <Suspense fallback={<Loading message="Loading..." />}>
                    <LoginForm />
                </Suspense>
            } />

            <Route path={ROUTES.HOME} element={
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            }>
                <Route index element={<Navigate to={ROUTES.VOTE} replace />} />
                <Route path={ROUTES.VOTE} element={
                    <Suspense fallback={<Loading message="Loading delicious dishes..." />}>
                        <DishGrid />
                    </Suspense>
                } />
                <Route path={ROUTES.RESULTS} element={
                    <Suspense fallback={<Loading message="Loading results..." />}>
                        <PollResults />
                    </Suspense>
                } />
            </Route>

            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
};

export default AppRoutes;
