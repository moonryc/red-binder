import React, { createContext, useEffect, useState } from 'react';
import { loadBinders, saveBinders } from '../services/userData';
import { gql, useQuery } from '@apollo/client';
import { GET_ALL_BINDERS, saveJWT } from '../services';


export const UserDataContext = createContext({
  binders:[],
  setBinders:(value:[object]|[])=>{}
});

const UserDataContextContainer = ({children}) => {

  const [hasLoadedData, setHasLoadedData] = useState(false);
  const [binders, setBinders] = useState<[object]|[]>([]);



  const { loading, error, data } = useQuery(GET_ALL_BINDERS);

  console.log(data);

  useEffect(()=>{
    if(data && 'users' in data.getAllUsers){
      setBinders(data.getAllUsers.users);
      saveJWT(data.getAllUsers.token);
    }
  },[data]);

  useEffect(()=>{
    loadBinders().then(data=>setBinders(data));
    setHasLoadedData(true);
  },[]);

  useEffect(()=>{
    if(hasLoadedData){
      saveBinders(binders).catch(e=>console.log(e));
    }
  },[binders, hasLoadedData]);





  return (
    <UserDataContext.Provider value={{ binders,setBinders}}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextContainer;
