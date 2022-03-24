import { extendType, intArg, nonNull, objectType } from 'nexus';
import { Medication, User as UserModel } from '../../models';

export const User = objectType({
  name:'User',
  definition(t) {
    t.nonNull.id('user_id')
    t.list.field('medications',{type:'Medication'})
    t.nonNull.string('name')
    t.nonNull.string('color')
  }
})

export const UserQuery = extendType({  // 2
  type: "Query",
  definition(t) {
    t.nonNull.field("user_query", {   // 3
      type: "User",
      args:{
        user_id:nonNull(intArg())
      },
      async resolve(parent, args, context, info) {    // 4
        const {user_id} = args
        const document = await UserModel.findOne({
          where: {
            user_id:user_id
          },
          include:[{
            model:Medication
          }]
        })


        // @ts-ignore
        return document.get({plain:true});
      },
    });
  },
});