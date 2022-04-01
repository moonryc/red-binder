import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { saveJWT } from '../../services';
import { apolloErrorHandler } from '../../services/apolloErrorHandler';

const CREATE_MEDICATION = gql`
    mutation Mutation($name: String!, $bottleDosageAmount: Float!, $bottleDosageMeasurement: String!, $nextRefill: String!, $notes: String) {
        createMedication(name: $name, bottle_dosage_amount: $bottleDosageAmount, bottle_dosage_measurement: $bottleDosageMeasurement, next_refill: $nextRefill, notes: $notes) {
            token
        }
    }
`;

interface ICreateMedicationBody {
  name: string,
  bottleDosageAmount: number,
  bottleDosageMeasurement: string,
  nextRefill: string,
  notes: string
}

export const useCreateMedication = () => {

  const [createMedicationApi, { error, loading, data }] = useMutation(CREATE_MEDICATION);


  useEffect(() => {
    if ( data && !error && 'createMedication' in data) {
      saveJWT(data.createMedication.token).catch(e=>console.log(e));
    } else {
      apolloErrorHandler(error);
    }
  }, [data, error]);



  return { createMedicationApi, error, loading, data };
};