import { useLazyQuery } from '@apollo/client';
import { GET_ALL_BINDERS } from '../../utils/apis';
import { useApplicationContext } from '../../context/GlobalState';
import { useCallback, useEffect, useState } from 'react';
import { LoadingProcessStatus } from '../../types';
import UserDataServices from '../../utils/UserDataServices';
import { SET_THEME_PREFERENCE, TOGGLE_THEME } from '../../context/actions';
import { UserLoginContext } from './useCheckLogin';

export interface LoadDataContext {
  loadDataStatus:LoadingProcessStatus|string
  setLoadDataStatus:()=>Promise<void>;
}

export const useLoadData = ({loginStatus}:UserLoginContext):LoadDataContext => {

  const [getBinders,{error}] = useLazyQuery(GET_ALL_BINDERS);
  const {state:{isLoggedIn},dispatch}= useApplicationContext();



  const setTheme = useCallback(async () => {
    const preference = await UserDataServices.getThemePreference();
    switch (preference) {
    case 'light':
      dispatch({type:SET_THEME_PREFERENCE,value:'light'});
      break;
    case 'dark':
      dispatch({type:SET_THEME_PREFERENCE,value:'dark'});
      dispatch({type:TOGGLE_THEME});
      break;
    case 'default':
      dispatch({type:SET_THEME_PREFERENCE,value:'default'});
      break;
    default:
      dispatch({type:SET_THEME_PREFERENCE,value:'default'});
      break;
    }

  },[]);


  const setLoadDataStatus = useCallback(async()=>{
    if(loginStatus === LoadingProcessStatus.isReady){
      await setTheme();
      if(isLoggedIn){
        try{
          const {data} = await getBinders();

        }catch (e) {
          console.log(e);
        }
      }
    }
    // eslint-disable-next-line no-use-before-define
    setCheckLoadDataStatus(prevState => ({...prevState,loadDataStatus:LoadingProcessStatus.isReady}));
  },[]);

  const [checkLoadDataStatus, setCheckLoadDataStatus] = useState<LoadDataContext>({
    loadDataStatus:LoadingProcessStatus.Waiting,
    setLoadDataStatus
  });



  useEffect(() => {
    if(loginStatus === LoadingProcessStatus.isReady){
      setCheckLoadDataStatus(prevState => ({...prevState, loadDataStatus:LoadingProcessStatus.Loading}));
      setLoadDataStatus();
    }
  }, [loginStatus]);


  return checkLoadDataStatus;


};