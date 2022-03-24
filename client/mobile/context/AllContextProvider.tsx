import React from 'react';
import MainStoreContextContainer from './MainStoreContext';

//@ts-ignore
const AllContextProvider = ({children}) => {
  return (
    <MainStoreContextContainer>
      {children}
    </MainStoreContextContainer>
  );
};

export default AllContextProvider;
