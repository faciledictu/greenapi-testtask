// import whatsAppClient from '@green-api/whatsapp-api-client';
import { createContext, useContext, useMemo } from 'react';
import axios from 'axios';

import { useAuth } from './AuthProvider.jsx';

import routes from '../routes.js';

class Api {
  #instanceData;

  #handler;

  #timerId;

  #isRecievingNotificationsStarted = false;

  constructor(instanceData) {
    this.#instanceData = instanceData;

    this.sendMessage = async (message) => {
      const response = await axios.post(routes.sendMessage(this.#instanceData), message);
      return response.data;
    };

    this.recieveNotification = async () => {
      const response = await axios.get(routes.recieveNotification(this.#instanceData));
      return response.data;
    };

    this.deleteNotification = async (id) => {
      await axios.delete(`${routes.deleteNotification(this.#instanceData)}/${id}`);
    };
  }

  onNotification(handler) {
    this.#handler = handler;
  }

  startRecievingNotifications = (interval = 1000) => {
    if (!this.#handler) {
      throw new Error('Notification handler not defined');
    }

    this.#isRecievingNotificationsStarted = true;

    const recieve = async () => {
      let notification;
      while ((notification = await this.recieveNotification())) {
        this.#handler(notification.body);
        this.deleteNotification(notification.receiptId);
      }
      if (this.#isRecievingNotificationsStarted) {
        this.#timerId = setTimeout(recieve, interval);
      }
    };

    recieve();
  };

  stopRecievingNotifications = () => {
    this.#isRecievingNotificationsStarted = false;
    clearTimeout(this.#timerId);
  };
}

const ApiContext = createContext({});

const ApiProvider = ({ children }) => {
  const { getInstanceData } = useAuth();

  const instanceData = getInstanceData();

  const context = useMemo(() => new Api(instanceData), [instanceData]);

  return <ApiContext.Provider value={context}>{children}</ApiContext.Provider>;
};

const useApi = () => useContext(ApiContext);

export { useApi };
export default ApiProvider;
