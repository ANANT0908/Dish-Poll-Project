import { memo } from 'react';

const RankSelector = memo(({ currentRank, onChange, isRankTaken, dishId }) => {
    const ranks = [
        { value: 1, label: 'Rank 1', points: '30 pts', emoji: '🥇', color: 'from-yellow-400 to-yellow-500' },
        { value: 2, label: 'Rank 2', points: '20 pts', emoji: '🥈', color: 'from-gray-400 to-gray-500' },
        { value: 3, label: 'Rank 3', points: '10 pts', emoji: '🥉', color: 'from-orange-400 to-orange-500' }
    ];

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Your Rank
                </label>
                {currentRank && (
                    <span className="inline-flex items-center gap-1 text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-semibold border border-primary-200">
                        <span>•</span>
                        Rank #{currentRank}
                    </span>
                )}
            </div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {ranks.map(rank => {
                    const isSelected = currentRank === rank.value;
                    const isTaken = isRankTaken(rank.value);
                    
                    return (
                        <button
                            key={rank.value}
                            type="button"
                            onClick={() => onChange(rank.value)}
                            disabled={isTaken && !isSelected}
                            aria-label={`Select ${rank.label} ${isTaken ? '(Already taken)' : ''}`}
                            aria-pressed={isSelected}
                            className={`
                                relative px-2 sm:px-3 py-2 sm:py-3 rounded-lg transition-all duration-200 font-semibold
                                ${isSelected
                                    ? `bg-gradient-to-br ${rank.color} text-white shadow-lg scale-105 ring-2 ring-offset-1 sm:ring-offset-2 ${rank.color.includes('yellow') ? 'ring-yellow-300' : rank.color.includes('gray') ? 'ring-gray-300' : 'ring-orange-300'}`
                                    : isTaken
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50 active:scale-95'
                                }
                            `}
                        >
                            <div className="flex flex-col items-center justify-center gap-0.5 sm:gap-1">
                                <span className="text-lg sm:text-2xl">{rank.emoji}</span>
                                <span className="text-xs sm:text-sm">{rank.value}</span>
                                <span className="text-xs opacity-75 hidden sm:block">{rank.points}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {currentRank && (
                <button
                    type="button"
                    onClick={() => onChange(null)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 active:scale-95 transition-all duration-200 border border-red-200 shadow-sm"
                    aria-label="Clear rank selection"
                >
                    ✕ Clear
                </button>
            )}
        </div>
    );
}, (prev, next) => prev.currentRank === next.currentRank);

RankSelector.displayName = 'RankSelector';

export default RankSelector;
