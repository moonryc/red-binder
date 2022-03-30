import { gql } from 'apollo-server-express';


export const typeDefs = gql`

    type jwtToken{
        token:String!
    }
    
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
    
    type getAllUsersResult{
        users:[User]!,
        token:String
    }
    
    
    type Query{
        getAllUsers:getAllUsersResult,
        getOneUserByUserId(id:ID!):User
    }
    
    type Mutation{
        login(username:String!,password:String!):jwtToken!,
        createAccount(username:String!,email:String!,password:String!):jwtToken!,
        createUser(name:String!,color:String!): jwtToken!, 
#        createMedication(name:String!, bottle_dosage_amount:Float!, bottle_dosage_measurement:String!, next_refill:String!, notes:String):Medication 
#        createDosage(medication_name:String!, dosage_amount:Float!, dosage_measurement:String!, time_to_take:String!, daily:Boolean!, weekly:Boolean!, monthly:Boolean!, monday:Boolean!, tuesday:Boolean!, wednesday:Boolean!, thursday:Boolean!, friday:Boolean!, saturday:Boolean!, sunday:Boolean!):Dosage
    }

    type Subscriptions{
        accountData:[User]!
    }
`;

