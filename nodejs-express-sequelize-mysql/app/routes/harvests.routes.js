module.exports = app => {
  const harvests = require("../controllers/harvests.controller.js");

  var router = require("express").Router();

  // Create a new Harvest
  router.post("/", harvests.create);

  // Retrieve all Harvests
  router.get("/", harvests.findAll);

  // Retrieve all pending Harvests
  router.get("/pending", harvests.findAllPending);

  // Retrieve a single Harvest with id
  router.get("/:id", harvests.findOne);

  // Update a Harvest with id
  router.put("/:id", harvests.update);

  // Delete a Harvest with id
  router.delete("/:id", harvests.delete);

  // Delete all Harvests
  router.delete("/", harvests.deleteAll);

  app.use('/api/harvests', router);
};