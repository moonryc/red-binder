import { useMainStoreContext, useUserDataContext } from '../context/AllContextProvider';
import { Dispatch, SetStateAction, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { loadBinders } from '../services/userData';
import { useGetAllBindersByAccountId } from './api/useGetAllBindersByAccountId';

export const useLoadDataOnLaunch = () => {
  const {setBinders} = useUserDataContext();
  const { getAllBindersApi} = useGetAllBindersByAccountId();


  const loadThenFetchBinders = useCallback(
    async () => {
      try{
        const binders = await loadBinders();
        setBinders(binders);
        await getAllBindersApi();
      }catch (e) {
        console.log(e);
      }
    },
    [getAllBindersApi, setBinders]
  );


  useLayoutEffect(()=>{
    loadThenFetchBinders();
  },[loadThenFetchBinders, setBinders]);
};