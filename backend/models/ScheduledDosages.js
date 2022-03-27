"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledDosage = void 0;
const mongoose_1 = require("mongoose");
const ScheduledDosageSchema = new mongoose_1.Schema({
    medication_name: { type: String, require: true },
    dosage_amount: { type: Number, require: true },
    dosage_measurement: { type: String, require: true },
    time_to_take: { type: Date, require: true },
    taken: { type: Boolean, require: true },
    missed: { type: Boolean, require: true },
    timeTaken: { type: Date, require: true },
});
exports.ScheduledDosage = (0, mongoose_1.model)('ScheduledDosage', ScheduledDosageSchema);
