import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './slices/CartReducer';

export const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});
