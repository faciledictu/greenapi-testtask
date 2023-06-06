import { configureStore } from '@reduxjs/toolkit';

import chats, { actions as chatsActions, selectors as chatSelectors } from './chats.js';
import messages, {
  actions as messagesActions,
  selectors as messagesSelectors,
} from './messages.js';
import modal, { actions as modalActions, selectors as modalSelectors } from './modal.js';

const store = configureStore({
  reducer: {
    chats,
    messages,
    modal,
  },
});

export const actions = {
  ...chatsActions,
  ...messagesActions,
  ...modalActions,
};

export const selectors = {
  ...chatSelectors,
  ...messagesSelectors,
  ...modalSelectors,
};

export default store;
