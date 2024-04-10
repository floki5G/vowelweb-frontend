import { createSlice } from '@reduxjs/toolkit';
import { CHECKOUT_SLICE_LABEL } from '../label';
interface IInitialCheckoutState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address_line: string;
    city: string;
    postal_code: string;
    state: string;
}


export const initialUserState: IInitialCheckoutState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address_line: '',
    city: '',
    postal_code: '',
    state: ''
};

export const CheckoutSlice = createSlice({
    name: CHECKOUT_SLICE_LABEL,
    initialState: initialUserState,
    reducers: {
        // ? update user details key value
        updateCheckoutDetails: (state: {
            [key: string]: string
        }, action) => {
            state[action.payload.key] = action.payload.value
        },

    },
});

export const {
    updateCheckoutDetails

} = CheckoutSlice.actions;

