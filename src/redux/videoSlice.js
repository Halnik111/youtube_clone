import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    video: null,
    loading: false,
    error: false
};

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        loginFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.user = null
            state.loading = false
            state.error = false
        },
    },
});

export const {loginStart, loginSuccess, loginFail, logout} = videoSlice.actions;

export default videoSlice.reducer;