import { createSelector } from '@reduxjs/toolkit';
import { selectAllDishes } from '../dishes/dishesSelectors';

const RANK_POINTS = {
    1: 30,
    2: 20,
    3: 10
};

// Memoize selector factories to ensure same selector instance for same userId
const userVotesCache = new Map();
const takenRanksCache = new Map();

export const selectAllVotes = (state) => state.poll.votes;

export const selectUserVotes = (userId) => {
    if (!userVotesCache.has(userId)) {
        userVotesCache.set(userId, createSelector(
            [selectAllVotes],
            (votes) => votes[userId] || {}
        ));
    }
    return userVotesCache.get(userId);
};

export const selectUserDishRank = (userId, dishId) => createSelector(
    [selectUserVotes(userId)],
    (userVotes) => userVotes[dishId] || null
);

export const selectTakenRanks = (userId) => {
    if (!takenRanksCache.has(userId)) {
        takenRanksCache.set(userId, createSelector(
            [selectUserVotes(userId)],
            (userVotes) => Object.values(userVotes)
        ));
    }
    return takenRanksCache.get(userId);
};

export const selectPollResults = createSelector(
    [selectAllVotes, selectAllDishes],
    (votes, dishes) => {
        const results = {};

        dishes.forEach(dish => {
            results[dish.id] = {
                ...dish,
                totalPoints: 0,
                votes: {
                    rank1: 0,
                    rank2: 0,
                    rank3: 0
                }
            };
        });

        Object.values(votes).forEach(userVotes => {
            Object.entries(userVotes).forEach(([dishId, rank]) => {
                const id = Number(dishId);
                if (results[id]) {
                    results[id].totalPoints += RANK_POINTS[rank];
                    results[id].votes[`rank${rank}`]++;
                }
            });
        });

        return Object.values(results)
            .sort((a, b) => b.totalPoints - a.totalPoints);
    }
);

// Memoize factory function for poll results with user ranks
const pollResultsWithUserRanksCache = new Map();

export const selectPollResultsWithUserRanks = (userId) => {
    if (!pollResultsWithUserRanksCache.has(userId)) {
        pollResultsWithUserRanksCache.set(userId, createSelector(
            [selectPollResults, selectUserVotes(userId)],
            (results, userVotes) => {
                return results.map(dish => ({
                    ...dish,
                    userRank: userVotes[dish.id] || null
                }));
            }
        ));
    }
    return pollResultsWithUserRanksCache.get(userId);
};

export const selectUserRankedDishes = (userId) => createSelector(
    [selectUserVotes(userId), selectAllDishes],
    (userVotes, dishes) => {
        return Object.entries(userVotes)
            .map(([dishId, rank]) => {
                const dish = dishes.find(d => d.id === Number(dishId));
                return dish ? { ...dish, rank } : null;
            })
            .filter(Boolean)
            .sort((a, b) => a.rank - b.rank);
    }
);
