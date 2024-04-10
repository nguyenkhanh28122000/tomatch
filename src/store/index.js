import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './api';
import apiSlice from './apiSlice';

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        user: apiSlice,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
export default store;
