module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: DataTypes.STRING
  });

  Message.associate = models => {
    //1:M
    Message.belongsTo(models.Channel, {
      foriegnKey: 'channelId'
    });
    //1:M
    Message.belongsTo(models.User, {
      foriegnKey: 'userId'
    });
  };

  return Message;
};
