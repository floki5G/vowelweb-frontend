import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { USER_SLICE_LABEL } from '../label';
import { IInitialUserState } from '../types/common';

export const initialUserState: IInitialUserState = {
  data: {
    id: '',
    name: '',
    email: '',
    phone: '',
    token: '',
  },
};

export const UserSlice = createSlice({
  name: USER_SLICE_LABEL,
  initialState: initialUserState,
  reducers: {
    // ? Update user data
    updateUserData: (state, action) => {
      console.log('action.payload.name', action.payload.name);
      state.data = {
        ...state.data,
        ...action.payload,
        name: `${action.payload.name}`,
      };
    },

    // ? Update user logout
    updateUserLogout: () => {
      return initialUserState;
    },


    // ? Update user data phone
    updateUserPhone: (state, action: PayloadAction<string>) => {
      state.data.phone = action.payload;
    },

    // ? Update user data email
    updateUserEmail: (state, action: PayloadAction<string>) => {
      state.data.email = action.payload;
    },

    // ? Update user data name
    updateUserName: (state, action: PayloadAction<string>) => {
      state.data.name = action.payload;
    },


  },
});

export const {
  updateUserData,
  updateUserLogout,
  updateUserEmail,
  updateUserName,
  updateUserPhone,
} = UserSlice.actions;

