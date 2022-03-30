import { gql } from '@apollo/client';

export const GET_ALL_BINDERS = gql`
    query GetAllUsers {
        getAllUsers {
            users {
                name
                color
            }
            token
        }
    }
`;