import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    playlists: [],
    error: false,
}

export const playlistsSlice = createSlice({
    name:'playlists',
    initialState,
    reducers: {
        playlistsFetchSuccess: (state, action) => {
            state.error = false;
            state.playlists = action.payload;
        },
        updatePlaylist: (state, action) => {
            state.error = false;
            const playlist = state.playlists.findIndex(x => x._id === action.payload._id);
            state.playlists[playlist] = action.payload;
        }
    }
})

export const {playlistsFetchSuccess, updatePlaylist} = playlistsSlice.actions;

export default playlistsSlice.reducer;