import { extendType, intArg, nonNull, objectType } from 'nexus';
import { Dosage as DosageModel } from '../../models';

export const Dosage = objectType({
  name: 'Dosage', // <- Name of your type
  definition(t) {
    t.nonNull.int('dosage_id');
    t.nonNull.int('user_id');
    t.nonNull.int('medication_id');
    t.nonNull.int('dosage_amount');
    t.nonNull.string('dosage_measurement');
    t.nonNull.string('time_to_take');
    t.nonNull.boolean('daily');
    t.nonNull.boolean('weekly');
    t.nonNull.boolean('monthly');
    t.nonNull.boolean('monday');
    t.nonNull.boolean('tuesday');
    t.nonNull.boolean('wednesday');
    t.nonNull.boolean('thursday');
    t.nonNull.boolean('friday');
    t.nonNull.boolean('saturday');
    t.nonNull.boolean('sunday');

  }
});

export const DosageQuery = extendType({  // 2
  type: "Query",
  definition(t) {
    t.nonNull.list.field("dosage_query", {   // 3
      type: "Dosage",
      args:{
        user_id:nonNull(intArg())
      },
      async resolve(parent, args, context, info) {    // 4
        const {user_id} = args
        const document = await DosageModel.findAll({
          where: {
            user_id:user_id
          }
        })

        console.log(document.map(dosage=>dosage.get({plain:true})))

        // @ts-ignore
        return document.map(dosage=>dosage.get({plain:true}));
      },
    });
  },
});