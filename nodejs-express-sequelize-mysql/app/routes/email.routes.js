module.exports = app => {
    const emailing = require("../controllers/email.controller.js");

    var router = require("express").Router();

    // Send the code for resetting password
    router.get("/:email", emailing.sendResetPasswordCode);

    app.use('/api/email', router);
};