import { createSelector } from '@reduxjs/toolkit';
import { selectAllDishes } from '../dishes/dishesSelectors';

const RANK_POINTS = {
    1: 30,
    2: 20,
    3: 10
};

export const selectAllVotes = (state) => state.poll.votes;

export const selectUserVotes = (userId) => createSelector(
    [selectAllVotes],
    (votes) => votes[userId] || {}
);

export const selectUserDishRank = (userId, dishId) => createSelector(
    [selectUserVotes(userId)],
    (userVotes) => userVotes[dishId] || null
);

export const selectTakenRanks = (userId) => createSelector(
    [selectUserVotes(userId)],
    (userVotes) => Object.values(userVotes)
);

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

export const selectPollResultsWithUserRanks = (userId) => createSelector(
    [selectPollResults, selectUserVotes(userId)],
    (results, userVotes) => {
        return results.map(dish => ({
            ...dish,
            userRank: userVotes[dish.id] || null
        }));
    }
);

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
