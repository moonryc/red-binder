import { accountData, createAccount, createUser, getAllUsers, getOneUserByUserId, loginAccount } from '../controllers';

export const resolvers = {
  Query: {
    getAllUsers:getAllUsers,
    getOneUserByUserId:getOneUserByUserId,
  },
  Mutation: {
    login:loginAccount,
    createAccount:createAccount,
    createUser:createUser,
    // createMedication: (_: any, body:any)=>createMedication(body),
    // createDosage: (_: any, body:any) => createDosage(body),
  },

  Subscriptions:{
    accountData:accountData
  }
};