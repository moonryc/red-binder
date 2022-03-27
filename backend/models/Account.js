"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = require("mongoose");
const AccountSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }]
});
exports.Account = (0, mongoose_1.model)('Account', AccountSchema);
