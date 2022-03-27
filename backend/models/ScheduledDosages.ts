import { model, Schema } from 'mongoose';


const ScheduledDosageSchema = new Schema({
  medication_name:{type:String, require:true},
  dosage_amount:{type:Number, require: true},
  dosage_measurement:{type:String, require:true},
  time_to_take: { type:Date,require:true },
  taken:{ type:Boolean,require:true },
  missed:{ type:Boolean,require:true },
  timeTaken:{ type:Date,require:true },
});

export const ScheduledDosage = model('ScheduledDosage',ScheduledDosageSchema);


