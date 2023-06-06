import { useEffect, useRef } from 'react';
import Message from './Message.jsx';
import { useAuth } from '../../../providers/AuthProvider.jsx';

const scrollToMarker = (marker, behavior = 'auto') => {
  marker.scrollIntoView({
    behavior,
    block: 'start',
  });
};

const MessagesList = ({ chat, messages }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollToMarker(scrollRef.current);
  }, [chat.id]);

  useEffect(() => {
    scrollToMarker(scrollRef.current, 'smooth');
  }, [messages.length]);

  const { getSettings } = useAuth();
  const { wid } = getSettings();

  return (
    <div className="overflow-auto px-3 pt-3 mb-auto">
      {messages.map(({ id, timestamp, senderId, messageData }) => {
        const isOwnMessage = wid === senderId;
        return (
          <Message
            key={id}
            timestamp={timestamp}
            isOwnMessage={isOwnMessage}
            messageData={messageData}
          />
        );
      })}
      <div className="scroll-marker" ref={scrollRef} />
    </div>
  );
};

export default MessagesList;
