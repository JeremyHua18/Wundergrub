const db = require("../models");
const Harvests = db.harvests;
const Op = db.Sequelize.Op;

// Create and Save a new Harvest
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Harvest
  const harvest = {
    username: req.body.username,
    user_company: req.body.user_company,
    date: req.body.date,
    weight: req.body.weight,
    feed_type: req.body.feed_type,
    comments: req.body.comments,
    status: req.body.status,
    edited_by: req.body.edited_by
  };

  // Save Harvest in the database
  Harvests.create(harvest)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Harvest."
      });
    });
};

// Retrieve all Harvests from the database.
exports.findAll = (req, res) => {

  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  Harvests.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single Harvest with an id
exports.findOne = (req, res) => {

  const id = req.params.id;

  Harvests.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Harvest with id = " + id
      });
    });
};

// Update a Harvest by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;

  Harvests.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Harvest was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Harvest with id=${id}. Maybe Harvest was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Harvest with id = " + id
      });
    });
};

// Delete a Harvest with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  Harvests.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Harvest was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Harvest with id=${id}. Maybe Harvest was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Transaction with id=" + id
      });
    });
};

// Delete all Harvests from the database.
exports.deleteAll = (req, res) => {

  Harvests.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Harvests were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Harvests."
      });
    });
};

// Find all pending Harvests
exports.findAllPending = (req, res) => {

  Harvests.findAll({ where: { status: "Pending" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pending Harvests."
      });
    });
};
