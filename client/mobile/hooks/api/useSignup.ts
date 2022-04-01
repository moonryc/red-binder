import { gql, useMutation } from '@apollo/client';

const CREATE_ACCOUNT = gql`
    mutation CreateAccount($username: String!, $email: String!, $password: String!) {
        createAccount(username: $username, email: $email, password: $password) {
            token
        }
    }`;

export const useSignup = () => {
  const[signUpApi,{error,data,loading}]=useMutation(CREATE_ACCOUNT);

  return {signUpApi,error,data,loading};
};