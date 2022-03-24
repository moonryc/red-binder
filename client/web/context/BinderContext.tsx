import React, { createContext, useState } from 'react';


export const BinderContext = createContext({
  users:null,
})

const BinderContextProvider:React.FC = ({children}) => {

  const [users, setUsers] = useState(null);

  return (
    <BinderContext.Provider value={{users}}>
      {children}
    </BinderContext.Provider>
  );
};

export default BinderContextProvider;
