import { useCallback, useEffect, useState } from 'react';
import { useApplicationContext } from '../../context/GlobalState';
import AuthServices from '../../utils/AuthServices';
import { TOGGLE_LOGIN } from '../../context/actions';
import { LoadingProcessStatus } from '../../types';

export interface UserLoginContext {
  loginStatus: string | LoadingProcessStatus;
  setLoginStatus: () => Promise<void>;
}


export function useCheckLogin(): UserLoginContext {

  const {dispatch}=useApplicationContext();
  const setLoginStatus = useCallback(async ()=>{
    const isLoggedIn = await AuthServices.isLoggedIn();
    if(isLoggedIn){
      dispatch({type:TOGGLE_LOGIN});
    }
    // eslint-disable-next-line no-use-before-define
    setCheckLoginStatus(prevState => ({...prevState, loginStatus:LoadingProcessStatus.isReady}));
  },[dispatch]);

  const [checkLoginStatus, setCheckLoginStatus] = useState<UserLoginContext>({
    loginStatus:LoadingProcessStatus.Waiting,
    setLoginStatus
  });

  // Read in memory data on load.
  useEffect(() => {
    setCheckLoginStatus(prevState => ({...prevState, loginStatus:LoadingProcessStatus.Loading}));
    setLoginStatus();
  }, []);

  return checkLoginStatus;
}