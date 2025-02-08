import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import productsReducer from './productsSlice';
import ordersReducer from './ordersSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 