import { gql } from 'apollo-server-express';


export const typeDefs = gql`

    type jwtToken{
        token:String!
    }
    
    input imageInput{
        name:String!
        type:String!
        uri:String!
    }
    type image{
        name:String
        type:String!
        uri:String!
    }
    
    type Account{
        _id:ID,
        username:String,
        password:String,
        email:String,
        binders:[Binder]
    }
    
    type Binder{
        _id:ID,
        name:String,
        color:String,
        image:image
    },
    
    type getAllBindersByAccountIdResult{
        binders:[Binder]!,
        token:String
    }
    
    type Query{
        getAllBindersByAccountId:getAllBindersByAccountIdResult,
    }
    
    type Mutation{
        login(username:String!,password:String!):jwtToken!,
        createAccount(username:String!,email:String!,password:String!):jwtToken!,
        createBinder(name:String!,color:String!, image:imageInput!, birthDate:String!): jwtToken!,
        createMedication(name:String!, bottle_dosage_amount:Float!, bottle_dosage_measurement:String!, next_refill:String!, notes:String):jwtToken!
    }
`;

