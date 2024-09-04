import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subreddit: '',
  searchTerm: '',
  isSidebarOpen: false,
  isMobile: window.innerWidth <= 768,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSubreddit: (state, action) => {
      state.subreddit = action.payload;
      state.searchTerm = '';
      if (state.isMobile) {
        state.isSidebarOpen = false;
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleSidebar: (state) => {
      if (state.isMobile) {
        state.isSidebarOpen = !state.isSidebarOpen;
      }
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setSubreddit, setSearchTerm, toggleSidebar, setIsMobile } = appSlice.actions;
export default appSlice.reducer;