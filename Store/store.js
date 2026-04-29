import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Store/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
