module.exports = (sequelize, Sequelize) => {
  const Transactions = sequelize.define("transactions", {
    username: {
      type: Sequelize.STRING,
      references: {
        model: 'users',
        key: 'username'
      }
    },
    date: {
      type: Sequelize.DATEONLY
    },
    delivery_type: {
      type: Sequelize.STRING
    },
    donor_type: {
      type: Sequelize.STRING
    },
    frequency: {
      type: Sequelize.STRING
    },
    weight: {
      type: Sequelize.INTEGER
    },
    waste_type: {
      type: Sequelize.STRING
    },
    comments: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return Transactions;

};