import {
  createAccount,
  createBinder,
  createMedication,
  destroyBinder,
  getAllBindersByAccountId,
  loginAccount
} from '../controllers';

export const resolvers = {
  Query: {
    getAllBindersByAccountId:getAllBindersByAccountId,
  },
  Mutation: {
    login:loginAccount,
    createAccount:createAccount,
    createBinder:createBinder,
    createMedication:createMedication,
    destroyBinder:destroyBinder
  },
};