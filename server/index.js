const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const sequelize = require('sequelize');
const models = require('./models/index');
const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const PORT = 3000;

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
const ENDPOINT = '/graphql';

app.use(
  ENDPOINT,
  bodyParser.json(),
  graphqlExpress({
    schema: myGraphQLSchema,
    context: {
      models,
      user: {
        id: 1
      }
    }
  })
);

app.use('/graphiql', graphiqlExpress({ endpointURL: ENDPOINT }));

models.sequelize.sync({}).then(() => {
  app.listen(PORT);
});
