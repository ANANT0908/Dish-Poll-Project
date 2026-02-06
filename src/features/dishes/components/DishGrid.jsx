import { useEffect } from 'react';
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
import { LAYOUT } from '../../../utils/styleConstants';
import logger from '../../../utils/logger';

const DishGrid = () => {
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
            <div className="text-center py-16">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-gray-500 text-lg font-medium">No dishes available right now</p>
                <p className="text-gray-400 text-sm mt-2">Check back later!</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Vote for Your Favorites</h2>
                <p className="text-gray-600 flex items-center gap-2">
                    <span>📋</span>
                    <span>Select up to 3 dishes and rank them by preference. Higher ranked dishes earn more points!</span>
                </p>
            </div>

            <div className={LAYOUT.GRID_4}>
                {dishes.map(dish => (
                    <DishCard key={dish.id} dish={dish} />
                ))}
            </div>
        </div>
    );
};

export default DishGrid;
