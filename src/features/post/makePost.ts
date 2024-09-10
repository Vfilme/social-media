import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  count: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { getUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
