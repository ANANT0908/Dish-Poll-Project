import { useState, memo } from 'react';
import logger from '../../../utils/logger';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/100x100?text=Dish';

const ResultsCard = memo(({ dish, position }) => {
    const [imageError, setImageError] = useState(false);

    const getMedalEmoji = (pos) => {
        if (pos === 1) return '🥇';
        if (pos === 2) return '🥈';
        if (pos === 3) return '🥉';
        return `#${pos}`;
    };

    const getPositionStyles = (pos) => {
        if (pos === 1) return 'bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 border-yellow-300 shadow-lg hover:shadow-xl';
        if (pos === 2) return 'bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-gray-300 shadow-md hover:shadow-lg';
        if (pos === 3) return 'bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-orange-300 shadow-md hover:shadow-lg';
        return 'bg-white border-gray-200 hover:shadow-md';
    };

    const handleImageError = () => {
        logger.warn('Failed to load result image', { dishId: dish.id });
        setImageError(true);
    };

    const imageUrl = imageError ? PLACEHOLDER_IMAGE : dish.image;
    const userRankColor = position === 1 ? 'bg-yellow-100 text-yellow-800' : position === 2 ? 'bg-gray-100 text-gray-800' : 'bg-orange-100 text-orange-800';

    return (
        <div className={`rounded-xl border-2 overflow-hidden transition-all duration-300 ${getPositionStyles(position)} ${dish.userRank ? 'ring-4 ring-primary-300' : ''}`}>
            {/* Mobile layout - stacked */}
            <div className="md:hidden flex flex-col gap-3 p-3 sm:p-4">
                <div className="flex gap-3">
                    {/* Medal Position */}
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl sm:text-2xl font-bold bg-white rounded-lg shadow-md border border-gray-100">
                        {getMedalEmoji(position)}
                    </div>

                    {/* Dish Image */}
                    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16">
                        <img
                            src={imageUrl}
                            alt={dish.dishName}
                            className="w-full h-full object-cover rounded-lg shadow-md"
                            onError={handleImageError}
                            loading="lazy"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2">
                            {dish.dishName}
                        </h3>
                        {dish.userRank && (
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${userRankColor} border border-opacity-30`}>
                                <span>•</span>
                                Rank #{dish.userRank}
                            </span>
                        )}
                    </div>
                </div>

                {/* Vote Breakdown Grid - Mobile */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-lg p-2 border border-yellow-200 text-center">
                        <div className="text-xs font-bold text-gray-800">{dish.votes.rank1}</div>
                        <div className="text-sm mt-0.5">🥇</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-300 text-center">
                        <div className="text-xs font-bold text-gray-800">{dish.votes.rank2}</div>
                        <div className="text-sm mt-0.5">🥈</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-orange-200 text-center">
                        <div className="text-xs font-bold text-gray-800">{dish.votes.rank3}</div>
                        <div className="text-sm mt-0.5">🥉</div>
                    </div>
                </div>

                {/* Points - Mobile Bottom */}
                <div className="flex justify-between items-center bg-white bg-opacity-50 rounded-lg p-3 border border-gray-200">
                    <span className="text-xs text-gray-600 font-semibold">Total Points</span>
                    <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        {dish.totalPoints}
                    </div>
                </div>
            </div>

            {/* Desktop layout - horizontal */}
            <div className="hidden md:flex flex-row items-center gap-4 lg:gap-6 p-4 lg:p-6">
                {/* Medal Position */}
                <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center text-3xl lg:text-4xl font-bold bg-white rounded-lg lg:rounded-xl shadow-md border border-gray-100">
                    {getMedalEmoji(position)}
                </div>

                {/* Dish Image */}
                <div className="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24">
                    <img
                        src={imageUrl}
                        alt={dish.dishName}
                        className="w-full h-full object-cover rounded-lg shadow-md hover:scale-110 transition-transform duration-300"
                        onError={handleImageError}
                        loading="lazy"
                    />
                </div>

                {/* Main Content - Flexible */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 line-clamp-2">
                        {dish.dishName}
                    </h3>
                    {dish.userRank && (
                        <span className={`inline-flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full mt-2 ${userRankColor} border border-opacity-30`}>
                            <span>•</span>
                            Your Rank: #{dish.userRank}
                        </span>
                    )}
                </div>

                {/* Vote Breakdown - Compact */}
                <div className="flex-shrink-0 flex gap-2">
                    <div className="bg-white rounded-lg p-2 border border-yellow-200 text-center min-w-12 lg:min-w-14">
                        <div className="text-xs font-bold text-gray-800">{dish.votes.rank1}</div>
                        <div className="text-lg lg:text-xl mt-1">🥇</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-300 text-center min-w-12 lg:min-w-14">
                        <div className="text-xs font-bold text-gray-800">{dish.votes.rank2}</div>
                        <div className="text-lg lg:text-xl mt-1">🥈</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-orange-200 text-center min-w-12 lg:min-w-14">
                        <div className="text-xs font-bold text-gray-800">{dish.votes.rank3}</div>
                        <div className="text-lg lg:text-xl mt-1">🥉</div>
                    </div>
                </div>

                {/* Points - Right side */}
                <div className="flex-shrink-0 text-right whitespace-nowrap">
                    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                        {dish.totalPoints}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600 font-medium mt-1">Points</div>
                </div>
            </div>

            {/* Progress Bar - Desktop */}
            {(dish.votes.rank1 > 0 || dish.votes.rank2 > 0 || dish.votes.rank3 > 0) && (
                <div className="hidden md:block px-6 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-gray-600">Distribution</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 transition-all duration-500"
                            style={{
                                width: `${Math.min(100, (dish.totalPoints / 120) * 100)}%`
                            }}
                        >
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}, (prev, next) => prev.dish.id === next.dish.id && prev.position === next.position);

ResultsCard.displayName = 'ResultsCard';

export default ResultsCard;
