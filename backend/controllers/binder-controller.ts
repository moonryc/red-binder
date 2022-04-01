import { Account, Binder } from '../models';
import { AccountBody } from '../types';
import { signJwtToken } from '../utils';


export const getAllBindersByAccountId = async (_:any, body:any, token :AccountBody) => {

  try {
    const newToken = signJwtToken(token);
    const binderDocuments = await Account.findById({ _id:token._id }).populate({ path: 'binders', select: '-__v' });
    if (!binderDocuments) {
      return;
    }
    return { binders:binderDocuments.binders, token:newToken };
  } catch (e) {
    console.log(e);
    return;
  }
};


export const getOneBinderByBinderId = async (_:any,{ id }:{id:string}) => {
  try {
    const binderDocuments = await Binder.findById({ _id: id });
    if (!binderDocuments) {
      return;
    }
    return binderDocuments;
  } catch (e) {
    return;
  }
};

interface CreateBinderBody {
  name:string,
  color:string,
  image:string,
  birthDate:string
}

export const createBinder = async (_:any,body:CreateBinderBody,token:AccountBody) => {
  try{
    const newToken = signJwtToken(token);
    const newBinderDocument = await Binder.create(body);
    if(!newBinderDocument){
      throw Error('error creating user');
    }
    const accountDocument = await Account.findByIdAndUpdate({_id:token._id},{$push:{binders:newBinderDocument._id}},{new:true,runValidators:true});
    if(!accountDocument){
      throw Error('error adding user to Account');
    }
    return {token:newToken};
  }catch (e) {
    console.log(e);
    // throw new UserInputError(JSON.stringify(e),{argumentName:'error'});
  }
};