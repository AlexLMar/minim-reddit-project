import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name: "header",
    initialState: {
        isMenuOpen: false,
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
    },
});

export const { toggleMenu } = headerSlice.actions;

export default headerSlice.reducer;

