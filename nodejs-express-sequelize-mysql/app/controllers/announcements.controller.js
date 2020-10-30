const db = require("../models");
const Announcements = db.Announcements;
const Op = db.Sequelize.Op;

// Create and Save a new Announcement
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Announcement
  const announcement = {
    author: req.body.author,
    title: req.body.title,
    date: req.body.date,
    content: req.body.content
  };

  // Save Announcement in the database
  Announcements.create(announcement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Announcement."
      });
    });
};

// Retrieve all Announcements from the database.
exports.findAll = (req, res) => {

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Announcements.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving announcements."
      });
    });
};

// Find a single Announcement with an id
exports.findOne = (req, res) => {

  const id = req.params.id;

  Announcements.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Announcement with id = " + id
      });
    });
};

// Update a Announcement by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;

  Announcements.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Announcement was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Announcement with id=${id}. Maybe Announcement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Announcement with id = " + id
      });
    });
};

// Delete a Announcement with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  Announcements.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Announcement was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Announcement with id=${id}. Maybe Announcement was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Announcement with id=" + id
      });
    });
};

// Delete all Announcements from the database.
exports.deleteAll = (req, res) => {

  Announcements.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Announcements were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Announcements."
      });
    });
};
