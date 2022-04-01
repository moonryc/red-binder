import { model, Schema } from 'mongoose';


const imageSchema = new Schema({
  name:{type:String,required:true},
  type:{type:String,required:true},
  uri:{type:String,required:true}
});


const binderSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  image: { type:imageSchema,required:true },
  birthDate: { type:String,required:true },
  medications: [{ type: Schema.Types.ObjectId, ref: 'Medication' }],
  dosages: [{ type: Schema.Types.ObjectId, ref: 'Dosage' }],
  scheduled_dosages: [{ type: Schema.Types.ObjectId,ref: 'ScheduledDosages'}]
});


export const Binder = model('Binder', binderSchema);


