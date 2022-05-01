import {
  createAccount,
  createBinder,
  createMedication, deleteMedication,
  destroyBinder,
  getAllBindersByAccountId,
  loginAccount, updateMedication, updateRefillDate
} from '../controllers';
import { GraphQLUpload } from 'graphql-upload';

export const resolvers = {
  Upload:GraphQLUpload,
  Query: {
    getAllBindersByAccountId:getAllBindersByAccountId,
  },
  Mutation: {
    login:loginAccount,
    createAccount:createAccount,
    createBinder:createBinder,
    createMedication:createMedication,
    destroyBinder:destroyBinder,
    updateRefillDate:updateRefillDate,
    updateMedication:updateMedication,
    deleteMedication:deleteMedication
  },
};