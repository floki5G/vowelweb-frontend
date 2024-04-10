import { createSlice } from '@reduxjs/toolkit';
import { MENU_SLICE_LABEL } from '../label';
import { ICategories, IProducts } from '../types/common';
interface IInitialMenuState {
    categories: ICategories[],
    products: IProducts[],
}


export const initialUserState: IInitialMenuState = {
    categories: [],
    products: [],
};

export const MenuSlice = createSlice({
    name: MENU_SLICE_LABEL,
    initialState: initialUserState,
    reducers: {
        // ? Update user data
        updateMenuData:  (_, action) => {
            return action.payload;
          },
    },
});

export const {
    updateMenuData,
} = MenuSlice.actions;

