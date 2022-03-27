import { model, Schema } from 'mongoose';

const MedicationSchema = new Schema({
  name:{type:String,required:true},
  bottle_dosage_amount:{type:Number,required:true},
  bottle_dosage_measurement:{type:String,require:true},
  next_refill:{type:Date,required:false},
  notes:{type:String,require: false}
});


export const Medication = model('Medication',MedicationSchema);


