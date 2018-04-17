module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  });

  User.associate = models => {
    //M:M
    User.belongsToMany(models.Team, {
      through: 'member',
      foriegnKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
    //M:M
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foriegnKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  };

  return User;
};
