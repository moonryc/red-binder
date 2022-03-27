"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    medications: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Medication' }],
    dosages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Dosage' }],
    scheduled_dosages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'ScheduledDosages' }]
});
exports.User = (0, mongoose_1.model)('User', userSchema);
