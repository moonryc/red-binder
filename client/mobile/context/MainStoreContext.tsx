import React, { createContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../services';
import { saveJWT } from '../services';


export const MainStoreContext = createContext({
  isLoggedIn: false,
  // eslint-disable-next-line no-unused-vars,no-empty-function
  setIsLoggedIn: (value: boolean) => {
  },
  isLightTheme: true,
  // eslint-disable-next-line no-unused-vars
  setIsLightTheme: (value: boolean) => {
  },
  // eslint-disable-next-line no-unused-vars
  loginApi: ({ variables: { loginBody } }) => {
  }
});

//@ts-ignore
const MainStoreContextContainer = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);

  const [loginApi, { data, loading, error }] = useMutation(LOGIN);

  useEffect(() => {
    if (data && 'login' in data) {
      saveJWT(data.login.token).then(()=>setIsLoggedIn(true));
    }
  }, [data]);


  return (
    <MainStoreContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLightTheme, setIsLightTheme, loginApi }}>
      {children}
    </MainStoreContext.Provider>
  );
};

export default MainStoreContextContainer;
