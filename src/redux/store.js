import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import headerReducer from '../features/Header/headerSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    header: headerReducer,
  },
});