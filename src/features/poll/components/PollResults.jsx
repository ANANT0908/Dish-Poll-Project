import { useSelector } from 'react-redux';
import { selectPollResultsWithUserRanks } from '../pollSelectors';
import { selectCurrentUser } from '../../auth/authSelectors';
import ResultsCard from './ResultsCard';

const PollResults = () => {
    const currentUser = useSelector(selectCurrentUser);
    const results = useSelector(state =>
        selectPollResultsWithUserRanks(currentUser?.id)(state)
    );

    const rankedDishes = results.filter(dish => dish.totalPoints > 0);

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Poll Results</h2>
                <p className="text-gray-600 flex items-center gap-2">
                    <span>📊</span>
                    <span>Dishes ranked by total points from all votes</span>
                </p>
            </div>

            {rankedDishes.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-16 text-center border-2 border-dashed border-gray-300">
                    <div className="text-6xl mb-4">🗳️</div>
                    <p className="text-gray-500 text-lg font-medium">No votes yet</p>
                    <p className="text-gray-400 text-sm mt-2">Be the first to vote for your favorite dishes!</p>
                </div>
            ) : (
                <div className="space-y-4">
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
};

export default PollResults;
