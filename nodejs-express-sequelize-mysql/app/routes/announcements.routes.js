module.exports = app => {
  const announcements = require("../controllers/announcements.controller.js");

  var router = require("express").Router();

  // Create a new Announcement
  router.post("/", announcements.create);

  // Retrieve all Announcements
  router.get("/", announcements.findAll);

  // Retrieve a single Announcement with id
  router.get("/:id", announcements.findOne);

  // Update a Announcement with id
  router.put("/:id", announcements.update);

  // Delete a Announcement with id
  router.delete("/:id", announcements.delete);

  // Delete all Announcements
  router.delete("/", announcements.deleteAll);

  app.use('/api/announcements', router);
};