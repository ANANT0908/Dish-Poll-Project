import { useState } from 'react';
import logger from '../../../utils/logger';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/100x100?text=Dish';

const ResultsCard = ({ dish, position }) => {
    const [imageError, setImageError] = useState(false);

    const getMedalEmoji = (pos) => {
        if (pos === 1) return '🥇';
        if (pos === 2) return '🥈';
        if (pos === 3) return '🥉';
        return `#${pos}`;
    };

    const getPositionColor = (pos) => {
        if (pos === 1) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300 shadow-lg';
        if (pos === 2) return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
        if (pos === 3) return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300';
        return 'bg-white border-gray-200';
    };

    const handleImageError = () => {
        logger.warn('Failed to load result image', { dishId: dish.id });
        setImageError(true);
    };

    const imageUrl = imageError ? PLACEHOLDER_IMAGE : dish.image;

    return (
        <div className={`rounded-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-lg ${getPositionColor(position)} ${dish.userRank ? 'ring-4 ring-blue-300' : ''}`}>
            <div className="flex items-center p-6 gap-6">
                {/* Medal Position */}
                <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center text-4xl font-bold bg-white rounded-lg shadow-md">
                    {getMedalEmoji(position)}
                </div>

                {/* Dish Image */}
                <div className="flex-shrink-0 w-24 h-24">
                    <img
                        src={imageUrl}
                        alt={dish.dishName}
                        className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        onError={handleImageError}
                        loading="lazy"
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                                {dish.dishName}
                            </h3>
                            {dish.userRank && (
                                <div className="mt-2 inline-flex items-center gap-2">
                                    <span className="inline-block text-xs bg-blue-600 text-white px-2.5 py-1 rounded-full font-semibold">
                                        Your Vote #{dish.userRank}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Points */}
                        <div className="text-right">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {dish.totalPoints}
                            </div>
                            <div className="text-xs text-gray-500 font-medium">total points</div>
                        </div>
                    </div>

                    {/* Vote Breakdown */}
                    <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                        <div className="bg-white rounded-lg p-3 border border-yellow-200">
                            <div className="text-lg mb-1">🥇</div>
                            <div className="text-xs text-gray-500 font-medium">Rank 1</div>
                            <div className="font-bold text-gray-800 text-lg">{dish.votes.rank1}</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-300">
                            <div className="text-lg mb-1">🥈</div>
                            <div className="text-xs text-gray-500 font-medium">Rank 2</div>
                            <div className="font-bold text-gray-800 text-lg">{dish.votes.rank2}</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-orange-200">
                            <div className="text-lg mb-1">🥉</div>
                            <div className="text-xs text-gray-500 font-medium">Rank 3</div>
                            <div className="font-bold text-gray-800 text-lg">{dish.votes.rank3}</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-gray-600">Vote Distribution</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 transition-all duration-500"
                                style={{ width: `${(dish.totalPoints / 300) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsCard;
