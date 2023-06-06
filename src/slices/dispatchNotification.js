import { formatPhoneNumberIntl } from 'react-phone-number-input';

import store, { actions } from './index.js';

export default (notification) => {
  switch (notification.typeWebhook) {
    case 'incomingMessageReceived':
    case 'outgoingAPIMessageReceived':
    case 'outgoingMessageReceived':
      store.dispatch(
        actions.addMessage({
          id: notification.idMessage,
          chatId: notification.senderData.chatId,
          senderId: notification.senderData.sender,
          timestamp: Number(notification.timestamp) * 1000,
          messageData: notification.messageData,
        }),
      );
      store.dispatch(
        actions.addChat({
          id: notification.senderData.chatId,
          name: formatPhoneNumberIntl(`+${notification.senderData.chatId.split('@')[0]}`),
        }),
      );
      break;

    default:
      console.log('Unsupported notification', notification.typeWebhook, notification);
  }
};
