import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userSlice";
import { cartReducer } from "./reducer/cartSlice";
import { orderAPI } from "./api/orderAPI";
import { dashboardAPI } from "./api/dashboardAPI";
import miscSlice from "./reducer/miscSlice"
import { paymentAPI } from "./api/paymentAPI";

export const server = import.meta.env.VITE_SERVER;

console.log(`server : ${server}`)

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderAPI.reducerPath]:orderAPI.reducer,
    [paymentAPI.reducerPath]:paymentAPI.reducer,
    [dashboardAPI.reducerPath]:dashboardAPI.reducer,
    [userReducer.reducerPath]: userReducer.reducer,
    [cartReducer.reducerPath]:cartReducer.reducer,
    misc: miscSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userAPI.middleware)
      .concat(productAPI.middleware)
      .concat(orderAPI.middleware)
      .concat(dashboardAPI.middleware)
      .concat(paymentAPI.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
 