import { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDishes } from '../dishesThunks';
import {
    selectAllDishes,
    selectDishesLoading,
    selectDishesError
} from '../dishesSelectors';
import DishCard from './DishCard';
import Loading from '../../../components/common/Loading';
import ErrorMessage from '../../../components/common/ErrorMessage';
import logger from '../../../utils/logger';

const DishGrid = memo(() => {
    const dispatch = useDispatch();
    const dishes = useSelector(selectAllDishes);
    const isLoading = useSelector(selectDishesLoading);
    const error = useSelector(selectDishesError);

    useEffect(() => {
        logger.info('Fetching dishes...');
        dispatch(fetchDishes());
    }, [dispatch]);

    if (isLoading) {
        return <Loading message="Loading delicious dishes..." />;
    }

    if (error) {
        logger.error('Failed to fetch dishes', error);
        return (
            <ErrorMessage
                message={error}
                onRetry={() => dispatch(fetchDishes())}
            />
        );
    }

    if (dishes.length === 0) {
        return (
            <div className="text-center py-20 px-4">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-gray-600 text-lg font-semibold">No dishes available right now</p>
                <p className="text-gray-500 text-sm mt-2">Check back later!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Header section */}
            <div className="section-header">
                <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-gray-900 mb-1.5 sm:mb-2">
                        Cast Your Vote
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 flex items-center gap-2 font-medium">
                        <span>📋</span>
                        <span>Select up to 3 dishes and rank by preference</span>
                    </p>
                </div>
            </div>

            {/* Stats bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto shadow-sm">
                <div className="flex-shrink-0 text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-bold text-primary-600">{dishes.length}</div>
                    <div className="text-xs text-gray-600 font-medium mt-0.5 sm:mt-1">Dishes</div>
                </div>
                <div className="h-10 sm:h-12 w-px bg-gray-200 flex-shrink-0"></div>
                <div className="flex-shrink-0 text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-bold text-secondary-600">3</div>
                    <div className="text-xs text-gray-600 font-medium mt-0.5 sm:mt-1">Can Vote</div>
                </div>
                <div className="h-10 sm:h-12 w-px bg-gray-200 flex-shrink-0 hidden sm:block"></div>
                <div className="flex-shrink-0 text-center sm:text-left hidden sm:block">
                    <div className="text-xl sm:text-2xl font-bold text-accent-600">60</div>
                    <div className="text-xs text-gray-600 font-medium mt-0.5 sm:mt-1">Max Pts</div>
                </div>
            </div>

            {/* Dishes grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
                {dishes.map(dish => (
                    <DishCard key={dish.id} dish={dish} />
                ))}
            </div>
        </div>
    );
});

DishGrid.displayName = 'DishGrid';

export default DishGrid;
