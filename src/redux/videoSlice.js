import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    video: {},
    loading: false,
    error: false
};

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {
            state.loading = false
            state.error = false
            state.video = action.payload
        },
        fetchFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        likes:(state, action) => {
            if (!state.video.like.includes(action.payload)) {
                state.video.like.push(action.payload);
                state.video.dislike.splice(state.video.dislike.findIndex(userId =>  userId === action.payload),1)
            }
            else {
                state.video.like.splice(state.video.like.findIndex(userId => userId === action.payload))
            }
        },
        dislikes:(state, action) => {
            if (!state.video.dislike.includes(action.payload)) {
                state.video.dislike.push(action.payload);
                state.video.like.splice(state.video.like.findIndex(userId =>  userId === action.payload),1)
            }
            else {
                state.video.dislike.splice(state.video.dislike.findIndex(userId => userId === action.payload))
            }
        },
        views:(state, action) => {
            state.video.views = action.payload;
        }
    },
});

export const {fetchStart, fetchSuccess, fetchFail, likes, dislikes, views} = videoSlice.actions;

export default videoSlice.reducer;