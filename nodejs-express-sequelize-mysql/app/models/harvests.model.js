module.exports = (sequelize, Sequelize) => {
  const Harvests = sequelize.define("harvests", {
    username: {
      type: Sequelize.STRING,
      references: {
        model: 'users',
        key: 'username'
      }
    },
    user_company: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATEONLY
    },
    weight: {
      type: Sequelize.INTEGER
    },
    feed_type: {
      type: Sequelize.STRING
    },
    comments: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    edited_by: {
      type: Sequelize.STRING
    }
  });

  return Harvests;

};