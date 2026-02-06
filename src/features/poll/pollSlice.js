import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    votes: {}
};

const pollSlice = createSlice({
    name: 'poll',
    initialState,
    reducers: {
        setVote: (state, action) => {
            const { userId, dishId, rank } = action.payload;

            if (!state.votes[userId]) {
                state.votes[userId] = {};
            }

            const userVotes = state.votes[userId];
            const dishWithSameRank = Object.keys(userVotes).find(
                id => userVotes[id] === rank && Number(id) !== dishId
            );

            if (dishWithSameRank) {
                delete state.votes[userId][dishWithSameRank];
            }

            state.votes[userId][dishId] = rank;
        },

        clearVote: (state, action) => {
            const { userId, dishId } = action.payload;

            if (state.votes[userId]) {
                delete state.votes[userId][dishId];
            }
        },

        clearAllUserVotes: (state, action) => {
            const { userId } = action.payload;
            delete state.votes[userId];
        }
    }
});

export const { setVote, clearVote, clearAllUserVotes } = pollSlice.actions;
export default pollSlice.reducer;
