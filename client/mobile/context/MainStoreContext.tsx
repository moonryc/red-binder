import React, { createContext, useState } from 'react';

export const MainStoreContext = createContext({
  isLoggedIn: false,
  // eslint-disable-next-line no-unused-vars,no-empty-function
  setIsLoggedIn: (value: boolean) => {},
});

//@ts-ignore
const MainStoreContextContainer = ({children}) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <MainStoreContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </MainStoreContext.Provider>
  );
};

export default MainStoreContextContainer;
