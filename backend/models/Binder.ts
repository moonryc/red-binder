import { model, Schema } from 'mongoose';

const binderSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  image: { type:String,required:false},
  birthDate: { type:String,required:true },
  medications: [{ type: Schema.Types.ObjectId, ref: 'Medication' }],
  dosages: [{ type: Schema.Types.ObjectId, ref: 'Dosage' }],
  scheduled_dosages: [{ type: Schema.Types.ObjectId,ref: 'ScheduledDosages'}]
});


export const Binder = model('Binder', binderSchema);



