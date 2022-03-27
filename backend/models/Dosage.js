"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dosage = void 0;
const mongoose_1 = require("mongoose");
const DosageSchema = new mongoose_1.Schema({
    medication_name: { type: String, require: true },
    dosage_amount: { type: Number, require: true },
    dosage_measurement: { type: String, require: true },
    time_to_take: { type: Date, require: true },
    daily: { type: Boolean, require: true },
    weekly: { type: Boolean, require: true },
    monthly: { type: Boolean, require: true },
    monday: { type: Boolean, require: true },
    tuesday: { type: Boolean, require: true },
    wednesday: { type: Boolean, require: true },
    thursday: { type: Boolean, require: true },
    friday: { type: Boolean, require: true },
    saturday: { type: Boolean, require: true },
    sunday: { type: Boolean, require: true },
});
exports.Dosage = (0, mongoose_1.model)('Dosage', DosageSchema);
