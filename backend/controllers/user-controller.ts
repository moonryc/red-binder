import { Account, User } from '../models';

//@ts-ignore
export const getAllUsersByAccountId = async ({ id }) => {
  try {
    const usersDocuments = await Account.findById({ _id: id }).populate({ path: 'users', select: '-__v' });
    if (!usersDocuments) {
      return;
    }
    return usersDocuments.users;
  } catch (e) {
    return;
  }
};


//@ts-ignore
export const getOneUserByUserId = async ({ id }) => {
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

//@ts-ignore
export const createUser = async ({ name, color }) => {

};