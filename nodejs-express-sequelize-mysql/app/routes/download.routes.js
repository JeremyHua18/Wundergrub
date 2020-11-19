module.exports = app => {
  const download = require("../controllers/download.controller.js");

  var router = require("express").Router();

  // Retrieve presigned URL
  router.post("/", download.getURL);

  // get file
  router.post("/file/", download.getURL);

  app.use('/api/download', router);
};