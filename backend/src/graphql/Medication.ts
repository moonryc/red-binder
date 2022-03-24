import { objectType } from 'nexus';

export const Medication = objectType({
  name: "Medication", // <- Name of your type
  definition(t) {
    t.nonNull.int("medication_id");
    t.nonNull.string("medication_name");
    t.nonNull.float("bottle_dosage_number");
    t.nonNull.string("bottle_dosage_measurement");
    t.nonNull.string("next_refill");
    t.string("notes");
  },
});