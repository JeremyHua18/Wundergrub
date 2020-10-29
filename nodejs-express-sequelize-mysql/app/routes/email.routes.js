module.exports = app => {
    const emailing = require("../controllers/email.controller.js");

    var router = require("express").Router();

    // Send the code for resetting password
    router.get("/:email", emailing.sendResetPasswordCode);

    // Send email for editing transaction
    router.post("/transaction/edit", emailing.sendTransactionEdition)

    // Send email for editing transaction
    router.post("/transaction/denial", emailing.sendTransactionDenial)

    // Send email for decline a harvest
    router.post("/harvest/denial", emailing.sendHarvestDenial)

    app.use('/api/email', router);
};