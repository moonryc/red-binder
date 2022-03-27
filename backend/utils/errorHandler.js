"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const chalk_1 = __importDefault(require("chalk"));
const errorHandler = (errorTitleOrLocation, error, 
// eslint-disable-next-line no-empty-function
optionalCallback = () => { }) => {
    console.log(chalk_1.default.bgCyan('='.repeat(45 + errorTitleOrLocation.length)));
    console.log(`----------------------${errorTitleOrLocation}-----------------------`);
    console.log(chalk_1.default.red(error));
    console.log(chalk_1.default.bgCyan('='.repeat(45 + errorTitleOrLocation.length)));
    optionalCallback();
};
exports.errorHandler = errorHandler;
