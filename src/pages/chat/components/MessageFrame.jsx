import Col from 'react-bootstrap/Col';

import MessageForm from './MessageForm.jsx';
import MessageList from './MessageList.jsx';

const MessageHeader = ({ chatName }) => (
  <div className="border-bottom bg-light p-3">
    <p className="m-0">
      <b>{chatName}</b>
    </p>
  </div>
);

const Messages = ({ chat, messages }) => (
  <Col className="p-0 d-flex flex-column h-100">
    <MessageHeader chatName={chat.name} />
    <MessageList chat={chat} messages={messages} />
    <MessageForm chatId={chat.id} />
  </Col>
);

export default Messages;
