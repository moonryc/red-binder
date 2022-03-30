import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        createAccount(username: $username, email: $email, password: $password) {
            token
        }
    }
`;