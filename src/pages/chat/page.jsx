import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { actions, selectors } from '../../slices/index.js';
import { useApi } from '../../providers/ApiProvider.jsx';
import ChatsPanel from './components/ChatsPanel.jsx';
import MessageFrame from './components/MessageFrame.jsx';
import NewChatModal from './components/NewChatModal.jsx';
import dispatchNotification from '../../slices/dispatchNotification.js';

const Placeholder = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="m-auto w-auto text-center">
      <Button onClick={() => dispatch(actions.openModal())}>{t('chat.newChat')}</Button>
    </div>
  );
};

const ChatPage = () => {
  const api = useApi();

  useEffect(() => {
    api.onNotification((notification) => dispatchNotification(notification));
    api.startRecievingNotifications();
    return api.stopRecievingNotifications;
  }, [api]);

  const currentChat = useSelector(selectors.getCurrentChat);
  const chats = useSelector(selectors.getChats);
  const currentChatMessages = useSelector(selectors.getMessagesForCurrentChat);

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded border">
        <Row className="h-100 bg-white flex-nowrap">
          <ChatsPanel chats={chats} currentChatId={currentChat?.id} />
          {currentChat ? (
            <MessageFrame chat={currentChat} messages={currentChatMessages} />
          ) : (
            <Placeholder />
          )}
        </Row>
      </Container>
      <NewChatModal />
    </>
  );
};

export default ChatPage;
