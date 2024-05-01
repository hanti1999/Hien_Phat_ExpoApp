import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './redux/CartReducer';

export const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});
