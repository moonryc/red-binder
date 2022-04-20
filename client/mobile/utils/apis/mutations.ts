import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
    mutation CreateAccount($username: String!, $email: String!, $password: String!) {
        createAccount(username: $username, email: $email, password: $password) {
            token
        }
    }`;

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }`;

export const CREATE_MEDICATION = gql`
    mutation CreateMedication($binderId:ID!,$name: String!, $bottleDosageAmount: Float!, $bottleDosageMeasurement: String!, $nextRefill: String!, $notes: String) {
        createMedication(binderId:$binderId,name: $name, bottle_dosage_amount: $bottleDosageAmount, bottle_dosage_measurement: $bottleDosageMeasurement, next_refill: $nextRefill, notes: $notes) {
            token
        }
    }
`;

export const CREATE_BINDER = gql`
    mutation CreateBinder($name: String!, $color: String!, $image: imageInput!, $birthDate: String!) {
        createBinder(name: $name, color: $color, image: $image, birthDate: $birthDate) {
            token
        }
    }`;

export const DELETE_BINDER = gql`
    mutation DeleteBinder($binderId: ID!) {
        destroyBinder(binderId: $binderId) {
            token
        }
    }
`;