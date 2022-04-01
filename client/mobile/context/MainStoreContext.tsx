import React, { createContext, useState } from 'react';

export const MainStoreContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  isLightTheme: true,
  setIsLightTheme: (value: boolean) => {},
});

//@ts-ignore
const MainStoreContextContainer = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);

  return (
    <MainStoreContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLightTheme, setIsLightTheme }}>
      {children}
    </MainStoreContext.Provider>
  );
};

export default MainStoreContextContainer;
