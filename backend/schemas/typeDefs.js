"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
    
    type Account{
        _id:ID,
        username:String,
        password:String,
        email:String,
        users:[User]
    }
    
    type User{
        _id:ID,
        name:String,
        color:String,
        medications:[Medication],
        dosages:[Dosage],
        scheduled_dosages:[ScheduledDosages]
    }

    type Medication{
        _id:ID,
        name:String,
        bottle_dosage_amount:Float,
        bottle_dosage_measurement:String,
        next_refill:String,
        notes:String,
    }
    
    type Dosage{
        _id:ID,
        medication_name:String,
        dosage_amount:Float,
        dosage_measurement:String,
        time_to_take: String,
        daily     : Boolean,
        weekly    : Boolean,
        monthly   : Boolean,
        monday    : Boolean,
        tuesday   : Boolean,
        wednesday : Boolean,
        thursday  : Boolean,
        friday    : Boolean,
        saturday  : Boolean,
        sunday    : Boolean,
        
    }

    type ScheduledDosages{
        _id:ID,
        medication_name:String,
        dosage_amount:Float,
        dosage_measurement: String,
        time_to_take: String,
        taken: Boolean,
        missed:Boolean,
        timeTaken:String,
    }

    
    type Query{
        getAllUsersByAccountId(id:ID!):[User]!
        getOneUserByUserId(id:ID!):User
    }
    
    type Mutation{
        login(username:String!,password:String!):Account,
        createAccount(username:String!,email:String!,password:String!):Account,
        createUser(name:String!,color:String!): User, 
        createMedication(name:String!, bottle_dosage_amount:Float!, bottle_dosage_measurement:String!, next_refill:String!, notes:String):Medication 
        createDosage(medication_name:String!, dosage_amount:Float!, dosage_measurement:String!, time_to_take:String!, daily:Boolean!, weekly:Boolean!, monthly:Boolean!, monday:Boolean!, tuesday:Boolean!, wednesday:Boolean!, thursday:Boolean!, friday:Boolean!, saturday:Boolean!, sunday:Boolean!):Dosage
    }
    
`;
