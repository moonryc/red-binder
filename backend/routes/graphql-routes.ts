import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from '../src/schema';


const graphqlRouter = express.Router()

graphqlRouter.use('/graphql',graphqlHTTP({schema,graphiql:true}))

export default graphqlRouter