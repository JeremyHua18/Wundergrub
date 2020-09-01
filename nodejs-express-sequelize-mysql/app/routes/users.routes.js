module.exports = app => {
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single User with username
  router.get("/:username", users.findOne);

  // Update a User with username
  router.put("/:username", users.update);

  // Delete a User with username
  router.delete("/:username", users.delete);

  // Delete all Users
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};