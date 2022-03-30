import { gql } from '@apollo/client';

export const CREATE_BINDER = gql`
    mutation Mutation($name: String!, $color: String!) {
        createUser(name: $name, color: $color) {
            token
        }
    }
`;

