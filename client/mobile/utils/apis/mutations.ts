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
    mutation CreateMedication($binderId:ID!,$name: String!, $bottle_dosage_amount: Float!, $bottle_dosage_measurement: String!, $next_refill: String!, $notes: String) {
        createMedication(binderId:$binderId,name: $name, bottle_dosage_amount: $bottle_dosage_amount, bottle_dosage_measurement: $bottle_dosage_measurement, next_refill: $next_refill, notes: $notes) {
            token
        }
    }
`;

export const CREATE_BINDER = gql`
    mutation CreateBinder($name: String!, $color: String!, $image: Upload!, $birthDate: String!) {
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

export const UPDATE_REFILL_DATE = gql`
    mutation UpdateRefillDate($medicationId: ID!, $nextRefill: String!) {
        updateRefillDate(medicationId: $medicationId, next_refill: $nextRefill) {
            token
        }
    }
`;

