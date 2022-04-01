import { useMutation } from '@apollo/client';
import { LOGIN, saveJWT } from '../../services';
import { useEffect } from 'react';
import { useMainStoreContext } from '../../context/AllContextProvider';

export const useLoginApi = () => {
  const {setIsLoggedIn} = useMainStoreContext();
  const [loginApi, { data, loading, error }] = useMutation(LOGIN);


  useEffect(() => {
    if (data && 'login' in data) {
      saveJWT(data.login.token).then(() => setIsLoggedIn(true));
    }
    console.log(error);
  }, [data,error]);

  return {loginApi, data,loading,error};

};