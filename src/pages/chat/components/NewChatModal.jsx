import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PhoneInput, { formatPhoneNumberIntl, isPossiblePhoneNumber } from 'react-phone-number-input';
import { useTranslation } from 'react-i18next';

import { actions, selectors } from '../../../slices/index.js';

import 'react-phone-number-input/style.css';

const NewChatModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');

  const isOpened = useSelector(selectors.isModalOpened);
  const handleClose = () => dispatch(actions.closeModal());
  const handleSubmit = (e) => {
    e.preventDefault();
    const chat = {
      id: `${phone.slice(1)}@c.us`,
      name: formatPhoneNumberIntl(phone),
    };
    dispatch(actions.addChat(chat));
    dispatch(actions.setCurrentChat(chat.id));
    setPhone('');
    handleClose();
  };

  return (
    <Modal show={isOpened} onHide={handleClose} size="sm">
      <Modal.Header className="border-0" closeButton>
        <div className="fs-5">{t('modals.newChatTitle')}</div>
      </Modal.Header>

      <Modal.Body className="pt-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-5" controlId="phone">
            <PhoneInput
              international
              defaultCountry="RU"
              value={phone}
              onChange={setPhone}
              inputComponent={Form.Control}
              autoFocus
              type="text"
            />
            <Form.Label className="visually-hidden">{t('modals.phone')}</Form.Label>
          </Form.Group>
          <Form.Group className="d-flex flex-column align-items-stretch w-100 gap-3">
            <Button
              className="w-100"
              variant="primary"
              type="submit"
              disabled={!phone || !isPossiblePhoneNumber(phone)}
            >
              {t('modals.start')}
            </Button>
            <Button className="w-100" variant="outline-primary" onClick={handleClose}>
              {t('modals.cancel')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewChatModal;
