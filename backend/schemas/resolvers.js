"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const controllers_1 = require("../controllers");
exports.resolvers = {
    Query: {
        getAllUsersByAccountId: (_, body) => (0, controllers_1.getAllUsersByAccountId)(body),
        getOneUserByUserId: (_, body) => (0, controllers_1.getOneUserByUserId)(body),
    },
    Mutation: {
        login: (_, body) => (0, controllers_1.loginAccount)(body),
        createAccount: (_, body) => (0, controllers_1.createAccount)(body),
        createUser: (_, body) => (0, controllers_1.createUser)(body),
        createMedication: (_, body) => (0, controllers_1.creatMedication)(body),
        createDosage: (_, body) => (0, controllers_1.createDosage)(body),
    },
};
