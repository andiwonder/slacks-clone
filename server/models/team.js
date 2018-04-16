module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  Team.associate = models => {
    Team.belongsToMany(models.User, {
      through: 'member',
      foriegnKey: 'teamId'
    });
    Team.belongsTo(models.User, {
      foriegnKey: 'owner'
    });
  };

  return Team;
};
