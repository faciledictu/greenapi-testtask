import { createSlice } from '@reduxjs/toolkit';
import { actions as chatsActions } from './chats.js';

const initialState = { isOpened: false };

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpened = true;
    },
    closeModal: (state) => {
      state.isOpened = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chatsActions.clearState, () => initialState);
  },
});

export const selectors = {
  isModalOpened: (state) => state.modal.isOpened,
};

export const { actions } = slice;

export default slice.reducer;
