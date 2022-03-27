import { model, Schema } from 'mongoose';


const userSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  medications: [{ type: Schema.Types.ObjectId, ref: 'Medication' }],
  dosages: [{ type: Schema.Types.ObjectId, ref: 'Dosage' }],
  scheduled_dosages: [{ type: Schema.Types.ObjectId,ref: 'ScheduledDosages'}]
});


export const User = model('User', userSchema);


