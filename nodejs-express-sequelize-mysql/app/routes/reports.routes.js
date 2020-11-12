module.exports = app => {
  const reports = require("../controllers/reports.controller.js");

  var router = require("express").Router();

  // Create a new Report
  router.post("/", reports.create);

  // Retrieve all Reports
  router.get("/", reports.findAll);

  // Retrieve a single Report with id
  router.get("/:id", reports.findOne);

  // Update a Report with id
  router.put("/:id", reports.update);

  // Delete a Report with id
  router.delete("/:id", reports.delete);

  // Delete all Reports
  router.delete("/", reports.deleteAll);

  app.use('/api/reports', router);
};