import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { actions as chatsActions } from './chats.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.setOne,
  },
  extraReducers: (builder) => {
    builder.addCase(chatsActions.clearState, () => initialState);
  },
});

const { actions } = slice;

const selectors = messagesAdapter.getSelectors((state) => state.messages);

const customSelectors = {
  getMessagesForCurrentChat: (state) => {
    const { currentChatId } = state.chats;
    const messages = selectors.selectAll(state);
    const currentChatMessages = messages.filter((m) => m.chatId === currentChatId);
    return currentChatMessages;
  },
};

export { actions, customSelectors as selectors };
export default slice.reducer;
