const bcrypt = require('bcrypt');

module.exports = {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll()
  },
  Mutation: {
    register: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword);
        await models.User.create({ ...otherArgs, password: hashedPassword });
        return true;
      } catch (err) {
        return false;
      }
    }
  }
};
