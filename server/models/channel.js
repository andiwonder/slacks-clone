module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    'channel',
    {
      text: DataTypes.STRING,
      public: DataTypes.BOOLEAN
    },
    { underscored: true }
  );

  Channel.associate = models => {
    //1:M
    Channel.belongsTo(models.Team, {
      foriegnKey: {
        name: 'teamId',
        filed: 'team_id'
      }
    });
    Channel.belongsToMany(models.User, {
      through: 'channel_member',
      foriegnKey: {
        name: 'channelId',
        field: 'channel_id'
      }
    });
  };

  return Channel;
};
