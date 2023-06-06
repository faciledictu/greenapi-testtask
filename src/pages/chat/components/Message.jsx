import { useTranslation } from 'react-i18next';

const TextMessage = ({ messageData }) => <div>{messageData.textMessageData.textMessage}</div>;

const ExtendedTextMessage = ({ messageData }) => (
  <div>{messageData.extendedTextMessageData.text}</div>
);

const UnsupportedMessage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-muted small">
      {t('chat.unsupportedMessage.title')}
      <br />
      <i>{t('chat.unsupportedMessage.description')}</i>
    </div>
  );
};

const contentMap = (type) => {
  switch (type) {
    case 'textMessage':
      return TextMessage;

    case 'extendedTextMessage':
      return ExtendedTextMessage;

    default:
      return UnsupportedMessage;
  }
};

const Message = ({ timestamp, isOwnMessage, messageData }) => {
  const color = isOwnMessage ? 'primary' : 'light';
  const authorColor = isOwnMessage ? 'primary' : 'dark';
  const justify = isOwnMessage ? 'end' : 'start';
  const time = timestamp
    ? new Date(timestamp).toLocaleTimeString(undefined, { timeStyle: 'short' })
    : '';
  const Content = contentMap(messageData.typeMessage);
  return (
    <div className={`d-flex mb-3 justify-content-${justify}`}>
      <div>
        <div className={`d-flex justify-content-${justify}`}>
          <div className={`px-3 py-2 text-break text-bg-${color} message-corners-${justify}`}>
            <Content messageData={messageData} />
          </div>
        </div>
        <div className={`small text-${authorColor} text-${justify}`}>{time}</div>
      </div>
    </div>
  );
};

export default Message;
