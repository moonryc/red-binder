import React, { useContext } from 'react';
import MainStoreContextContainer, { MainStoreContext } from './MainStoreContext';
import UserDataContextContainer, { UserDataContext } from './UserDataContext';


export const useMainStoreContext =() => useContext(MainStoreContext);
export const useUserDataContext =()=> useContext(UserDataContext);

//@ts-ignore
const AllContextProvider = ({children}) => {
  return (
    <MainStoreContextContainer>
      <UserDataContextContainer>
        {children}
      </UserDataContextContainer>
    </MainStoreContextContainer>
  );
};

export default AllContextProvider;
