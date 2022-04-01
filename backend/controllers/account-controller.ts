import { Account } from '../models';
import { signJwtToken } from '../utils';
import { compare } from 'bcrypt';
import { UserInputError } from 'apollo-server-express';
import { AccountBody } from '../types';

interface LoginBody {
  username:string,
  password:string
}


export const loginAccount = async (_:any,{username,password}:LoginBody) => {

  try{
    const accountDocument = await Account.findOne({username});
    console.log('accountDocument: ' + accountDocument);
    if(!accountDocument){
      return;
    }
    const isPasswordValid = await compare(password,accountDocument.password);
    console.log('isPasswordValid: ' + isPasswordValid);
    if(!isPasswordValid){
      return;
    }
    const token = signJwtToken(accountDocument);
    return {token};
  }catch (e) {
    console.log(e);
    return;
  }
};

interface CreateAccountBody extends LoginBody{
  password:string
  email:string
}

export const createAccount = async (_:any,{ username, email, password }:CreateAccountBody) => {
  try{
    const accountDocument = await Account.create({username,email,password});
    if(!accountDocument){
      console.log('error creating account');
      return;
    }
    const token = signJwtToken(accountDocument);
    return {token};
  }catch (e) {
    // const error = graphqlErrorHandler(e);
    // @ts-ignore
    throw new UserInputError(e);
  }
};
