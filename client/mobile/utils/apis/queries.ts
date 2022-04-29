import { gql } from '@apollo/client';

export const GET_ALL_BINDERS = gql`
    query GetAllBindersByAccountId {
        getAllBindersByAccountId {
            binders {
                _id
                name
                color
                image
                medications {
                    _id
                    name
                    bottle_dosage_amount
                    bottle_dosage_measurement
                    next_refill
                    notes
                }
            }
        }
    }`;