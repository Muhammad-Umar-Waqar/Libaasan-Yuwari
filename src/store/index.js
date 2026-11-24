import { configureStore } from '@reduxjs/toolkit';
import bagReducer from './bagSlice';
import appReducer from './appSlice';

export const store = configureStore({
  reducer: {
    bag: bagReducer,
    app: appReducer,
  },
});

export default store;
