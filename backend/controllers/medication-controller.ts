
//@ts-ignore
import { AccountBody } from '../types';
import { signJwtToken } from '../utils';
import { AuthenticationError } from 'apollo-server-express';
import { Account, Binder, Medication } from '../models';

interface CreateMedicationBody {
  binderId: string
  name:string
  bottle_dosage_amount: number,
  bottle_dosage_measurement: string,
  next_refill: string,
  notes?: string
}

export const createMedication = async (_:any,body:CreateMedicationBody,token:AccountBody) => {
  try{
    if(!token._id){
      throw new AuthenticationError('You are not logged in');
    }

    const {binderId, ...medication}= body;
    const documentMedication = await Medication.create(medication);

    const document = await Binder.findByIdAndUpdate({_id:binderId},{$push:{medications:documentMedication.id}});
    const newToken = signJwtToken(token);
    return {token:newToken};
  }catch (e) {
    console.log(e);
  }

};


interface IUpdateRefillDateBody {
  medicationId:string,
  next_refill:string,
}

export const updateRefillDate = async (_:any,{medicationId,next_refill}:IUpdateRefillDateBody,token:AccountBody) => {
  if(!token._id){
    throw new AuthenticationError('you are not logged in');
  }
  try {

    const document = await Medication.findByIdAndUpdate({_id:medicationId},{next_refill});
    if(!document){
      throw new AuthenticationError('you are not logged in');
    }
    const newToken = signJwtToken(token);
    return {token:newToken};
  }catch (e) {
    console.log(e);
  }


};