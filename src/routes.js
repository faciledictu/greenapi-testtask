const apiPath = 'https://api.green-api.com';

const routes = {
  chatPage: () => '/',

  loginPage: () => '/login',

  getInstanceState: ({ idInstance, apiTokenInstance }) =>
    `${apiPath}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,

  getSettings: ({ idInstance, apiTokenInstance }) =>
    `${apiPath}/waInstance${idInstance}/getSettings/${apiTokenInstance}`,

  setSettings: ({ idInstance, apiTokenInstance }) =>
    `${apiPath}/waInstance${idInstance}/setSettings/${apiTokenInstance}`,

  sendMessage: ({ idInstance, apiTokenInstance }) =>
    `${apiPath}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,

  recieveNotification: ({ idInstance, apiTokenInstance }) =>
    `${apiPath}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,

  deleteNotification: ({ idInstance, apiTokenInstance }) =>
    `${apiPath}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}`,
};

export default routes;
