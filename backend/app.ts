import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './schemas';
import { decodeJwtToken } from './utils';
const cors = require('cors');


const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
const server = new ApolloServer({
  //@ts-ignore
  cors: {
    'origin': 'https://studio.apollographql.com',
    'credentials': true
  },
  typeDefs,
  resolvers,
  context: ({ req }) => {

    const jwtToken = req.headers.authorization || false;
    if (!jwtToken) {
      return { _id: '', username: '', email: '' };
    }
    const accountData = decodeJwtToken(jwtToken);
    if (!accountData) {
      return { _id: '', username: '', email: '' };
    }
    const { data } = accountData;
    return { ...data };
  }
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }
//
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// Create a new instance of an Apollo server with the GraphQL schema

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/red-binder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//@ts-ignore
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the async function to start the server
(async () => await startApolloServer(typeDefs, resolvers))();