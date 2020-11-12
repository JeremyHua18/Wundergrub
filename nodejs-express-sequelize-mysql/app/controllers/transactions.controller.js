const db = require("../models");
const Transactions = db.transactions;
const Op = db.Sequelize.Op;

// Create and Save a new Transaction
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Transaction
  const transaction = {
    username: req.body.username,
    date: req.body.date,
    delivery_type: req.body.delivery_type,
    donor_type: req.body.donor_type,
    frequency: req.body.frequency,
    weight: req.body.weight,
    waste_type: req.body.waste_type,
    comments: req.body.comments,
    status: req.body.status,
    edited_by: req.body.edited_by
  };

  // Save Transaction in the database
  Transactions.create(transaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction."
      });
    });
};

// Retrieve all Transaction from the database.
exports.findAll = (req, res) => {

  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  Transactions.findAll({ where: condition })
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

// Find a single Transaction with an id
exports.findOne = (req, res) => {

  const id = req.params.id;

  Transactions.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Transaction with id = " + id
      });
    });
};

// Update a Transaction by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;

  Transactions.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Transaction was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Transaction with id=${id}. Maybe Transaction was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Transaction with id = " + id
      });
    });
};

// Delete a Transaction with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  Transactions.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Transaction was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Transaction with id=" + id
      });
    });
};

// Delete all Transactions from the database.
exports.deleteAll = (req, res) => {

  Transactions.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Transactions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Transactions."
      });
    });
};

// Find all pending Transactions
exports.findAllPending = (req, res) => {

  Transactions.findAll({ where: { status: "Pending" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pending Transactions."
      });
    });
};

// Find a user's transaction history
exports.findHistory = (req, res) => {

  const username = req.params.username;

  Transactions.findAll({ where: { username: username } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pending Transactions."
      });
    });
};

