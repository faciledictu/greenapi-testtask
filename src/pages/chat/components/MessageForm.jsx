// import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useApi } from '../../../providers/ApiProvider.jsx';
import { actions } from '../../../slices/index.js';
import { useAuth } from '../../../providers/AuthProvider.jsx';

const MessageForm = ({ chatId }) => {
  const { t } = useTranslation();
  const api = useApi();
  const messageInputRef = useRef();
  const dispatch = useDispatch();
  const { getSettings } = useAuth();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validateOnMount: true,
    onSubmit: async ({ message }) => {
      const messageData = {
        message: message.trim(),
        chatId,
      };
      try {
        const response = await api.sendMessage(messageData);
        dispatch(
          actions.addMessage({
            id: response.idMessage,
            chatId,
            senderId: getSettings().wid,
            messageData: {
              typeMessage: 'textMessage',
              textMessageData: {
                textMessage: message.trim(),
              },
            },
          }),
        );
        formik.resetForm();
      } catch (error) {
        if (error.isAxiosError) {
          console.log(error);
          switch (error.response?.status) {
            case 400:
              toast.error(t('errors.authError'));
            case 466:
              toast.error(t('errors.overTheLimit'));
              break;
            default:
              toast.error(t('errors.noConnection'));
          }
        }
      }
    },
  });

  useEffect(() => {
    if (!formik.isSubmitting) {
      messageInputRef.current.focus();
    }
  }, [formik.isSubmitting, chatId]);

  const isEmpty = !formik.values.message.trim();

  return (
    <Form className="p-3" onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          name="message"
          value={formik.values.message}
          placeholder={t('chat.writeMessage')}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          aria-label={t('chat.newMessage')}
          className="ps-3 pe-5 rounded-pill w-100"
          autoComplete="off"
          ref={messageInputRef}
        />
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className={`rounded-circle p-0 m-1 position-absolute end-0 ${
            isEmpty ? 'd-none' : 'd-block'
          }`}
          variant="primary"
          style={{ zIndex: 5 }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            fill="currentColor"
            width={28}
            height={28}
          >
            <path d="M7.16,6.59v6.83a.51.51,0,0,0,.48.51l11.17.78a.29.29,0,0,1,0,.58l-11.17.78a.51.51,0,0,0-.48.51v6.83a.5.5,0,0,0,.72.46l19-8.6a.3.3,0,0,0,0-.54l-19-8.6A.5.5,0,0,0,7.16,6.59Z" />
          </svg>
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
