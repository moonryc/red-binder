"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    next();
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(token);
        //@ts-ignore
        req.body.variables.accountQueryAccountId = decodedToken.account_id;
    }
    catch (err) {
        console.log('made it here');
        // @ts-ignore
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    }
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    }
    else {
        next();
    }
};
exports.default = isAuth;
