import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const chatsAdapter = createEntityAdapter();
const initialState = chatsAdapter.getInitialState({ currentChatId: null });

const slice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: chatsAdapter.setOne,
    setCurrentChat(state, { payload }) {
      state.currentChatId = payload;
    },
    clearState: () => initialState,
  },
});

const { actions } = slice;

const selectors = chatsAdapter.getSelectors((state) => state.chats);

const customSelectors = {
  getCurrentChat: (state) => {
    const { currentChatId } = state.chats;
    return selectors.selectById(state, currentChatId);
  },
  getChats: selectors.selectAll,
};

export { actions, customSelectors as selectors };
export default slice.reducer;
