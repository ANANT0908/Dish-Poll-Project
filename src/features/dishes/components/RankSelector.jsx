const RankSelector = ({ currentRank, onChange, isRankTaken, dishId }) => {
    const ranks = [
        { value: 1, label: 'Rank 1', points: '30 pts', emoji: '🥇' },
        { value: 2, label: 'Rank 2', points: '20 pts', emoji: '🥈' },
        { value: 3, label: 'Rank 3', points: '10 pts', emoji: '🥉' }
    ];

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                    Select Rank
                </label>
                {currentRank && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                        Selected: #{currentRank}
                    </span>
                )}
            </div>
            
            <div className="grid grid-cols-3 gap-2">
                {ranks.map(rank => {
                    const isSelected = currentRank === rank.value;
                    const isTaken = isRankTaken(rank.value);
                    
                    return (
                        <button
                            key={rank.value}
                            type="button"
                            onClick={() => onChange(rank.value)}
                            disabled={isTaken}
                            aria-label={`Select ${rank.label} (${rank.points}) for ${dishId}`}
                            aria-pressed={isSelected}
                            className={`
                                px-2 py-2 rounded-lg text-xs font-semibold transition-all duration-200 relative group
                                ${isSelected
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                                    : isTaken
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                                }
                            `}
                        >
                            <div className="flex flex-col items-center justify-center gap-0.5">
                                <span className="text-lg">{rank.emoji}</span>
                                <span>{rank.value}</span>
                            </div>
                            {isTaken && !isSelected && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-lg">✓</span>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {currentRank && (
                <button
                    type="button"
                    onClick={() => onChange(null)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200 border border-red-300"
                    aria-label={`Clear rank selection for dish ${dishId}`}
                >
                    ✕ Clear Selection
                </button>
            )}
        </div>
    );
};

export default RankSelector;
