module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING
    },
    account_type: {
      type: Sequelize.STRING
    }
  });

  return Users;
};