import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVote, clearVote } from '../../poll/pollSlice';
import { selectUserDishRank, selectTakenRanks } from '../../poll/pollSelectors';
import { selectCurrentUser } from '../../auth/authSelectors';
import RankSelector from './RankSelector';
import { CARD_STYLES } from '../../../utils/styleConstants';
import logger from '../../../utils/logger';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x300?text=Dish+Image';

const DishCard = memo(({ dish }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const currentRank = useSelector(state =>
        selectUserDishRank(currentUser?.id, dish.id)(state)
    );
    const takenRanks = useSelector(state =>
        selectTakenRanks(currentUser?.id)(state)
    );

    const handleRankChange = (rank) => {
        if (rank === null) {
            dispatch(clearVote({
                userId: currentUser.id,
                dishId: dish.id
            }));
            logger.debug('Vote cleared', { dishId: dish.id });
        } else {
            dispatch(setVote({
                userId: currentUser.id,
                dishId: dish.id,
                rank
            }));
            logger.debug('Vote set', { dishId: dish.id, rank });
        }
    };

    const isRankTaken = (rank) => {
        return takenRanks.includes(rank) && currentRank !== rank;
    };

    const handleImageError = () => {
        logger.warn('Failed to load image', { dishId: dish.id, url: dish.image });
        setImageError(true);
    };

    const imageUrl = imageError ? PLACEHOLDER_IMAGE : dish.image;

    const getRankBadgeColor = (rank) => {
        if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
        if (rank === 2) return 'bg-gradient-to-r from-gray-400 to-gray-500';
        if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-500';
        return 'bg-primary-600';
    };

    const getRankMedal = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    return (
        <div className={`${CARD_STYLES.HOVER} overflow-hidden flex flex-col h-full group`}>
            {/* Image Container */}
            <div className="relative h-40 sm:h-48 lg:h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {imageLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" 
                         style={{ backgroundSize: '200% 100%' }} />
                )}
                <img
                    src={imageUrl}
                    alt={dish.dishName}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    onError={handleImageError}
                    onLoad={() => setImageLoading(false)}
                    loading="lazy"
                />
                
                {/* Rank Badge */}
                {currentRank && (
                    <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getRankBadgeColor(currentRank)} text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-bold shadow-lg text-xs sm:text-sm flex items-center gap-1 animate-scaleIn`}>
                        <span>{getRankMedal(currentRank)}</span>
                        <span className="hidden sm:inline">Rank {currentRank}</span>
                    </div>
                )}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content Container */}
            <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {dish.dishName}
                </h3>
                <p className="text-gray-600 text-sm mb-5 line-clamp-2 flex-1">
                    {dish.description || 'A delicious culinary creation'}
                </p>

                {/* Rank Selector */}
                <RankSelector
                    currentRank={currentRank}
                    onChange={handleRankChange}
                    isRankTaken={isRankTaken}
                    dishId={dish.id}
                />
            </div>
        </div>
    );
}, (prevProps, nextProps) => prevProps.dish.id === nextProps.dish.id);

DishCard.displayName = 'DishCard';

export default DishCard;
