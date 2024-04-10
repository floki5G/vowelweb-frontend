import { createSlice } from '@reduxjs/toolkit';
import { CART_SLICE_LABEL } from '../label';
interface IInitialCartState {
    items: Record<string, ICartItem>;
    cartCost: number

}
export interface ICartItem {
    quantity: number;
    product_id: number;
    category_id: number;
    cart_id: string
    name: string;
    price: number
}

export const initialUserState: IInitialCartState = {
    items: {},
    cartCost: 0
};

export const CartSlice = createSlice({
    name: CART_SLICE_LABEL,
    initialState: initialUserState,
    reducers: {
        // ? add product to cart
        updateAddProductToCart: (state, action) => {
            if (state.items[action.payload.cart_id]) {
                state.items[action.payload.cart_id].quantity += 1
                // ? update total cost
                state.cartCost = +(
                    Number(state.cartCost) + Number(state.items[action.payload.cart_id].price)
                )
            } else {
                state.items[action.payload.cart_id] = {
                    quantity: 1,
                    product_id: action.payload.product_id,
                    category_id: action.payload.category_id,
                    cart_id: action.payload.cart_id,
                    name: action.payload.name,
                    price: action.payload.price
                }
                state.cartCost = +(Number(state.cartCost) + Number(action.payload.price))
            }

        },
        // ? reduce product from cart
        updateReduceProductFromCart: (state, action) => {
            if (state.items[action.payload.cart_id]) {
                if (state.items[action.payload.cart_id].quantity === 1) {
                    state.cartCost = +(
                        Number(state.cartCost) - Number(state.items[action.payload.cart_id].price)
                      );
                    delete state.items[action.payload.cart_id]
                } else {
                    state.cartCost = +(
                        Number(state.cartCost) - Number(state.items[action.payload.cart_id].price))
                    state.items[action.payload.cart_id].quantity -= 1
                    // ?  reduce price        // ? update total cost



                }
            }
        },
        // ? remove product from cart
        updateRemoveProductFromCart: (state, action) => {
            state.cartCost = +(
                Number(state.cartCost) - Number(state.items[action.payload.cart_id].price)
              );
            delete state.items[action.payload.cart_id]
        },
        // ? clear cart
        updateClearCart: (state) => {
            state.items = {}
        },
    },
});

export const {
    updateAddProductToCart,
    updateReduceProductFromCart,
    updateRemoveProductFromCart,
    updateClearCart
} = CartSlice.actions;

