import { Dosage } from '../models';



const dosageData = [
  {
    user_id:1,
    medication_id: 1,
    dosage_amount: 15.5,
    dosage_measurement:'mg',
    time_to_take:new Date(),
    daily:true,
    weekly:false,
    monthly:false,
    monday:false,
    tuesday:false,
    wednesday:false,
    thursday:false,
    friday:false,
    saturday:false,
    sunday:false,
  },
];

const seedDosages = () => Dosage.bulkCreate(dosageData);

export default seedDosages;
