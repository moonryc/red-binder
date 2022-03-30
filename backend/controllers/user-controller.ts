import { Account, User } from '../models';
import { AccountBody } from '../types';
import { signJwtToken } from '../utils';


export const getAllUsers = async (_:any, body:any, token :AccountBody) => {

  try {
    const newToken = signJwtToken(token);
    const usersDocuments = await Account.findById({ _id:token._id }).populate({ path: 'users', select: '-__v' });
    if (!usersDocuments) {
      return;
    }
    return { users:usersDocuments.users, token:newToken };
  } catch (e) {
    console.log(e);
    return;
  }
};


export const getOneUserByUserId = async (_:any,{ id }:{id:string}) => {
  try {
    const userDocuments = await User.findById({ _id: id });
    if (!userDocuments) {
      return;
    }
    return userDocuments;
  } catch (e) {
    return;
  }
};

interface CreateUserBody {
  name:string,
  color:string
}

export const createUser = async (_:any,{ name, color }:CreateUserBody,token:AccountBody) => {
  try{
    const newToken = signJwtToken(token);
    const newUserDocument = await User.create({name,color});
    if(!newUserDocument){
      throw Error('error creating user');
    }
    const accountDocument = await Account.findByIdAndUpdate({_id:token._id},{$push:{users:newUserDocument._id}},{new:true,runValidators:true});
    if(!accountDocument){
      throw Error('error adding user to Account');
    }
    return {token:newToken};
  }catch (e) {
    // throw new UserInputError(JSON.stringify(e),{argumentName:'error'});
  }
};