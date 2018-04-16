module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    text: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  });

  Channel.associate = models => {
    //1:M
    Channel.belongsTo(models.Team, {
      foriegnKey: 'teamId'
    });
  };

  return Channel;
};
