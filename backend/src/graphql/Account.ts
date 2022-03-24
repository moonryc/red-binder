import { extendType, intArg, nonNull, objectType } from 'nexus';
import { Account as AccountModel, Medication, User } from '../../models';

export const Account = objectType({
  name: 'Account',
  definition(t) {
    t.nonNull.id('account_id');
    t.nonNull.string('username');
    t.nonNull.string('email');
    t.nonNull.list.nonNull.field('users', { type: 'User' });
  }
});


export const AccountQuery = extendType({  // 2
  type: 'Query',
  definition(t) {
    t.nonNull.field('account_query', {   // 3
      type: 'Account',
      args: {
        account_id: nonNull(intArg()),
      },
      async resolve(parent, args, context, info) {    // 4
        const { account_id } = args;
        const document = await AccountModel.findOne({
          where: {
            account_id: account_id
          },
          include: [{
            model: User,
            include:[{ model:Medication }]
          }]
        });

        if(!document){
          return false
        }
        return document.get({ plain: true });
      }
    });
  }
});