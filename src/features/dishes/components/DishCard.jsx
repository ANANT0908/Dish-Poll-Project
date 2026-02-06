import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVote, clearVote } from '../../poll/pollSlice';
import { selectUserDishRank, selectTakenRanks } from '../../poll/pollSelectors';
import { selectCurrentUser } from '../../auth/authSelectors';
import RankSelector from './RankSelector';
import { CARD_STYLES } from '../../../utils/styleConstants';
import logger from '../../../utils/logger';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x300?text=Dish+Image';

const DishCard = ({ dish }) => {
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

    return (
        <div className={`${CARD_STYLES.DEFAULT} overflow-hidden flex flex-col h-full`}>
            {/* Image Container */}
            <div className="relative h-48 bg-gray-100 overflow-hidden group">
                {imageLoading && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <img
                    src={imageUrl}
                    alt={dish.dishName}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    onError={handleImageError}
                    onLoad={() => setImageLoading(false)}
                    loading="lazy"
                />
                {currentRank && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        #{currentRank}
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {dish.dishName}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {dish.description || 'A delicious dish worth voting for!'}
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
};

export default DishCard;
