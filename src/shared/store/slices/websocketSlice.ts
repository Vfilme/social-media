import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socket: null,
  message: null,
};

export const webSocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setSocket, setMessage } = webSocketSlice.actions;
export const webSocketReducer = webSocketSlice.reducer;
