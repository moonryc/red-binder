import React, { createContext, useState } from 'react';


export const UserDataContext = createContext({
  binders: [],
  setBinders: (value: [object] | []) => {
  }
});

interface UserDataContextContainerProps {
  children:JSX.Element
}

const UserDataContextContainer:React.FC<UserDataContextContainerProps> = ({ children }) => {
  const [binders, setBinders] = useState<[object] | []|never[]| object>([]);


  return (
    <UserDataContext.Provider value={{ binders, setBinders }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextContainer;
