const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const PORT = 3000;

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
const ENDPOINT = '/graphql';

app.use(ENDPOINT, bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: ENDPOINT }));

app.listen(PORT);
