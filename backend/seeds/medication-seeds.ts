import { Medication } from '../models';


const medicationData = [
  {
    user_id: 1,
    medication_name: 'advil',
    bottle_dosage_number:25,
    bottle_dosage_measurement:'mg',
    next_refill: new Date(),
    notes: 'example note',
  },
  {
    user_id: 1,
    medication_name: 'tylenol',
    bottle_dosage_number:75,
    bottle_dosage_measurement:'mg',
    next_refill: new Date(),
    notes: 'sample',
  },
  {
    user_id: 2,
    medication_name: 'advil',
    bottle_dosage_number:75,
    bottle_dosage_measurement:'mg',
    next_refill: new Date(),
    notes: 'sample',
  },
  {
    user_id: 2,
    medication_name: 'tylenol',
    bottle_dosage_number:50,
    bottle_dosage_measurement:'mg',
    next_refill: new Date(),
    notes: '',
  },
  {
    user_id: 1,
    medication_name: 'advil',
    bottle_dosage_number:100,
    bottle_dosage_measurement:'mg',
    next_refill: new Date(),
    notes: '',
  },
];

const seedMedication = () => Medication.bulkCreate(medicationData);

export default seedMedication;
