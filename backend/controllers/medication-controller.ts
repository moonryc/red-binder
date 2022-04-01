
//@ts-ignore
import { AccountBody } from '../types';
import { signJwtToken } from '../utils';

interface CreateMedicationBody {
  name:string
  bottle_dosage_amount: number,
  bottle_dosage_measurement: string,
  next_refill: string,
  notes?: string
}

export const createMedication = async (_:any,body:CreateMedicationBody,token:AccountBody) => {
  try{
    console.log(body);
    const newToken = signJwtToken(token);
    return {token:newToken};
  }catch (e) {
    console.log(e);
  }

};