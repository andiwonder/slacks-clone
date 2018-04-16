const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const sequelize = require('sequelize');
const models = require('./models/index');

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

models.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT);
});
