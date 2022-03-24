import React, { createContext, useState } from 'react';
import BreakpointsContext from './BreakpointsContext';


export const MasterContext = createContext({
  jwtToken:null,
  setJwtToken:(value:any)=>{},
})

const MasterContextProvider:React.FC = ({children}) => {

  const [jwtToken, setJwtToken] = useState(null);

  return (
    <MasterContext.Provider value={{jwtToken,setJwtToken}}>
    <BreakpointsContext>
      {children}
    </BreakpointsContext>
    </MasterContext.Provider>


  );
};

export default MasterContextProvider;
