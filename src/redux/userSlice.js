import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {},
    loading: false,
    error: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = false
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
        subscribeChannel: (state, action) => {
            state.user.subscribedUsers = action.payload
        },
    },
});

export const {loginStart, loginSuccess, loginFail, logout, subscribeChannel} = userSlice.actions;

export default userSlice.reducer;