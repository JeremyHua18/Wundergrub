module.exports = (sequelize, Sequelize) => {
  const Announcements = sequelize.define("announcements", {
    author: {
      type: Sequelize.STRING,
      references: {
        model: 'users',
        key: 'username'
      }
    },
    title: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATEONLY
    },
    content: {
      type: Sequelize.TEXT
    }
  });

  return Announcements;

};