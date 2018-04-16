const Sequelize = require('sequelize');

//use /du in psql to get username
const sequelize = new Sequelize({
  database: 'slack',
  username: 'iamwetalldid',
  password: null,
  dialect: 'postgres'
});

const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
  Team: sequelize.import('./team')
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
