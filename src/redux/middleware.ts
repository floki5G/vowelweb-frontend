import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { updateAddProductToCart, updateClearCart, updateReduceProductFromCart, updateRemoveProductFromCart } from "./slices/cart";
import { RootState } from "./store";
import { CART_SLICE_LABEL } from "./label";

export const listenerMiddleware = createListenerMiddleware();

// ? 

if (typeof localStorage !== 'undefined') {
    // ? for cart Related actions
    listenerMiddleware.startListening({
        matcher: isAnyOf(
            updateAddProductToCart,
            updateClearCart,
            updateReduceProductFromCart,
            updateRemoveProductFromCart

        ),
        effect: (action, listenerApi) => {
            localStorage.setItem(
                CART_SLICE_LABEL,
                JSON.stringify((listenerApi.getState() as RootState).cart)
            );
        }
    })
}
