import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import { actions } from '../../../slices/index.js';

const ChatButton = ({ id, name, onSelect }) => (
  <Nav.Item onSelect={onSelect} as="li">
    <Nav.Link eventKey={id} className="text-truncate rounded-0">
      {name}
    </Nav.Link>
  </Nav.Item>
);

const Channels = ({ chats, currentChatId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSelect = (id) => {
    dispatch(actions.setCurrentChat(id));
  };

  const handleAdd = () => {
    dispatch(actions.openModal());
  };

  return (
    <Col xs={4} md={3} className="border-end p-0 bg-light d-flex flex-column">
      <div className="p-3 d-flex justify-content-between align-items-center">
        <div className="text-truncate">
          <b>{t('chat.chats')}</b>
        </div>
        <Button
          variant="outline-primary"
          className="rounded-circle p-0 d-flex align-items-center"
          onClick={handleAdd}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width={20}
            height={20}
          >
            <rect x="9.5" y="5" width="1" height="10" />
            <rect x="5" y="9.5" width="10" height="1" />
          </svg>
          <span className="visually-hidden">{t('chat.newChat')}</span>
        </Button>
      </div>
      <Nav
        variant="pills"
        activeKey={currentChatId}
        onSelect={handleSelect}
        className="flex-column overflow-auto flex-nowrap"
        as="ul"
      >
        {chats.map(({ id, name }) => (
          <ChatButton key={id} id={id} name={name} />
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
