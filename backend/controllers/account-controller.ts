import { Account } from '../models';
import signToken from '../utils/signToken';

//@ts-ignore
export const loginAccount = ({username,password}) => {

};


//@ts-ignore
export const createAccount = async ({ username, email, password }) => {
  console.log(username,email,password);
  try{
    const accountDocument = await Account.create({username,email,password});
    if(!accountDocument){
      return;
    }
    const token = signToken(accountDocument);
    return accountDocument;
  }catch (e) {
    return;
  }
};