import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectPollResultsWithUserRanks } from '../pollSelectors';
import { selectCurrentUser } from '../../auth/authSelectors';
import ResultsCard from './ResultsCard';

const PollResults = memo(() => {
    const currentUser = useSelector(selectCurrentUser);
    const results = useSelector(state =>
        selectPollResultsWithUserRanks(currentUser?.id)(state)
    );

    const rankedDishes = results.filter(dish => dish.totalPoints > 0);

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Header section */}
            <div className="section-header">
                <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-gray-900 mb-1.5 sm:mb-2">
                        Poll Results
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 flex items-center gap-2 font-medium">
                        <span>📊</span>
                        <span>Live rankings from all votes</span>
                    </p>
                </div>
            </div>

            {/* Stats section */}
            {rankedDishes.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    {/* Mobile stats - horizontal compact */}
                    <div className="md:hidden flex items-stretch">
                        <div className="flex-1 flex flex-col items-center justify-center gap-1.5 p-3 sm:p-4 border-r border-gray-200">
                            <span className="text-2xl sm:text-3xl">🏆</span>
                            <div className="text-xl sm:text-2xl font-bold text-primary-600">{rankedDishes.length}</div>
                            <div className="text-xs text-gray-600 font-medium">Top Dishes</div>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center gap-1.5 p-3 sm:p-4 border-r border-gray-200">
                            <span className="text-2xl sm:text-3xl">📈</span>
                            <div className="text-xl sm:text-2xl font-bold text-secondary-600">{rankedDishes.reduce((sum, d) => sum + (d.votes.rank1 + d.votes.rank2 + d.votes.rank3), 0)}</div>
                            <div className="text-xs text-gray-600 font-medium">Total Votes</div>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center gap-1.5 p-3 sm:p-4">
                            <span className="text-2xl sm:text-3xl">⭐</span>
                            <div className="text-xl sm:text-2xl font-bold text-accent-600">{rankedDishes[0]?.totalPoints}</div>
                            <div className="text-xs text-gray-600 font-medium">Top Points</div>
                        </div>
                    </div>

                    {/* Desktop stats - balanced horizontal */}
                    <div className="hidden md:flex items-stretch">
                        <div className="flex-1 flex items-center gap-4 p-6 border-r border-gray-200 hover:bg-primary-50 transition-colors">
                            <div className="text-4xl flex-shrink-0">🏆</div>
                            <div className="flex-1 min-w-0">
                                <div className="text-3xl font-bold text-primary-600">{rankedDishes.length}</div>
                                <div className="text-sm text-gray-600 font-medium mt-1">Top Dishes</div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center gap-4 p-6 border-r border-gray-200 hover:bg-secondary-50 transition-colors">
                            <div className="text-4xl flex-shrink-0">📈</div>
                            <div className="flex-1 min-w-0">
                                <div className="text-3xl font-bold text-secondary-600">{rankedDishes.reduce((sum, d) => sum + (d.votes.rank1 + d.votes.rank2 + d.votes.rank3), 0)}</div>
                                <div className="text-sm text-gray-600 font-medium mt-1">Total Votes</div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center gap-4 p-6 hover:bg-accent-50 transition-colors">
                            <div className="text-4xl flex-shrink-0">⭐</div>
                            <div className="flex-1 min-w-0">
                                <div className="text-3xl font-bold text-accent-600">{rankedDishes[0]?.totalPoints}</div>
                                <div className="text-sm text-gray-600 font-medium mt-1">Top Points</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {rankedDishes.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 lg:p-16 text-center border-2 border-dashed border-gray-300">
                    <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🗳️</div>
                    <p className="text-gray-600 text-base sm:text-lg font-semibold">No votes cast yet</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1.5 sm:mt-2">Be the first to vote!</p>
                </div>
            ) : (
                <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                    {rankedDishes.map((dish, index) => (
                        <ResultsCard
                            key={dish.id}
                            dish={dish}
                            position={index + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

PollResults.displayName = 'PollResults';

export default PollResults;
