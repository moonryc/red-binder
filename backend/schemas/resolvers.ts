import {
  createAccount,
  createDosage,
  createUser,
  getAllUsersByAccountId,
  getOneUserByUserId,
  loginAccount
} from '../controllers';

export const resolvers = {
  Query: {
    getAllUsersByAccountId:(_:any,body:any)=>getAllUsersByAccountId(body),
    getOneUserByUserId: (_: any, body: any) => getOneUserByUserId(body),
  },
  Mutation: {
    login:(_:any,body:any)=>loginAccount(body),
    createAccount: (_: any, body: any) => createAccount(body),
    createUser: (_: any, body: any) => createUser(body),
    createMedication: (_: any, { name, bottle_dosage_amount, bottle_dosage_measurement, next_refill, notes}) => {
      console.log(name);
      // await createMedication(body);
    },
    createDosage: (_: any, body:any) => createDosage(body),
  },
};