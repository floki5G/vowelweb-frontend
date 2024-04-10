import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { UserSlice } from "./slices/user";
import { configureStore } from '@reduxjs/toolkit';
import { MenuSlice } from "./slices/menu";
import { listenerMiddleware } from "./middleware";
import { CartSlice } from "./slices/cart";
import { CART_SLICE_LABEL } from "./label";
import { CheckoutSlice } from "./slices/checkout";

export const makeStore = () =>
  configureStore({
    reducer: {
      // ? add reducers here
      user: UserSlice.reducer,
      menu: MenuSlice.reducer,
      cart: CartSlice.reducer,
      checkout: CheckoutSlice.reducer
    },
    preloadedState: {
      cart:
        typeof window !== "undefined" &&
          JSON.parse(localStorage.getItem(CART_SLICE_LABEL) as string)
          ? JSON.parse(localStorage.getItem(CART_SLICE_LABEL) as string)
          : {
            items: {},
            cartCost: 0,
          },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(listenerMiddleware.middleware)

  });

const store = makeStore();

export default store;

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
