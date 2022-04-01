import { gql, useMutation } from '@apollo/client';
import { saveJWT } from '../../services';
import { useEffect } from 'react';
import { useMainStoreContext } from '../../context/AllContextProvider';

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }`;


export const useLoginApi = () => {
  const { setIsLoggedIn } = useMainStoreContext();
  const [loginApi, { data, loading, error }] = useMutation(LOGIN);


  useEffect(() => {
    if (data && 'login' in data) {
      saveJWT(data.login.token).then(() => setIsLoggedIn(true));
    }
    console.log(error);
  }, [data, error]);

  return { loginApi, data, loading, error };

};