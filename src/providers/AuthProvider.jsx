import { createContext, useMemo, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { actions } from '../slices/index.js';
import routes from '../routes.js';

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.isAuthError = true;
  }
}
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [instanceData, setInstanceData] = useState(null);
  const [settings, setSettings] = useState(null);
  const dispatch = useDispatch();
  const { clearState } = actions;

  const context = useMemo(() => {
    const logIn = async (loginData) => {
      const {
        data: { stateInstance },
      } = await axios.get(routes.getInstanceState(loginData));
      if (stateInstance !== 'authorized') {
        throw new AuthError(stateInstance);
      }

      const { data } = await axios.get(routes.getSettings(loginData));
      setSettings(data);

      const preparedInstanceData = JSON.stringify(loginData);
      setInstanceData(preparedInstanceData);
    };

    const logOut = () => {
      setInstanceData(null);
      setSettings(null);
      dispatch(clearState());
    };

    const getSettings = () => settings;

    const getInstanceData = () => JSON.parse(instanceData);

    const loggedIn = !!instanceData;

    return {
      logIn,
      logOut,
      loggedIn,
      getInstanceData,
      getSettings,
    };
  }, [instanceData, settings, clearState, dispatch]);
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
export default AuthProvider;
