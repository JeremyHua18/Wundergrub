const db = require("../models");
const Reports = db.reports;
const Op = db.Sequelize.Op;

// Create and Save a new Report
exports.create = (req, res) => {
  // Validate request
  if (!req.body.file_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Report
  const report = {
    recipient: req.body.recipient,
    file_name: req.body.file_name
  };

  // Save Report in the database
  Reports.create(report)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Report."
      });
    });
};

// Retrieve all Reports from the database.
exports.findAll = (req, res) => {

  const recipient = req.query.recipient;
  var condition = recipient ? { recipient: { [Op.like]: `%${recipient}%` } } : null;

  Reports.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reports."
      });
    });
};

// Find a single Report with an id
exports.findOne = (req, res) => {

  const id = req.params.id;

  Reports.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Report with id = " + id
      });
    });
};

// Update a Report by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;

  Reports.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Report was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Report with id=${id}. Maybe Report was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Report with id = " + id
      });
    });
};

// Delete a Report with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  Reports.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Report was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Report with id=${id}. Maybe Report was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Report with id=" + id
      });
    });
};

// Delete all Reports from the database.
exports.deleteAll = (req, res) => {

  Reports.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Reports were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Reports."
      });
    });
};