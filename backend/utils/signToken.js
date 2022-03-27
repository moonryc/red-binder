"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (account_id, username) => {
    return jsonwebtoken_1.default.sign({ account_id: account_id, username: username }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
exports.default = signToken;
