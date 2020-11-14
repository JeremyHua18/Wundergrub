module.exports = (sequelize, Sequelize) => {
  const Reports = sequelize.define("reports", {
    recipient: {
      type: Sequelize.STRING,
      references: {
        model: 'users',
        key: 'username'
      }
    },
    file_name: {
      type: Sequelize.STRING
    }
  });

  return Reports;

};