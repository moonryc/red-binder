"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medication = void 0;
const mongoose_1 = require("mongoose");
const MedicationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    bottle_dosage_amount: { type: Number, required: true },
    bottle_dosage_measurement: { type: String, require: true },
    next_refill: { type: Date, required: false },
    notes: { type: String, require: false }
});
exports.Medication = (0, mongoose_1.model)('Medication', MedicationSchema);
