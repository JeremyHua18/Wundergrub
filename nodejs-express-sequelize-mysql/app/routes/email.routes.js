module.exports = app => {
    const emailing = require("../controllers/email.controller.js");

    var router = require("express").Router();

    // Send the code for resetting password
    router.get("/:email", emailing.sendResetPasswordCode);

    // Send email for editing transaction
    router.post("/transaction/edit", emailing.sendTransactionEdition)

    // Send email for editing harvest
    router.post("/harvest/edit", emailing.sendHarvestEdition)

    // Send email for editing transaction
    router.post("/transaction/denial", emailing.sendTransactionDenial)

    // Send email for decline a harvest
    router.post("/harvest/denial", emailing.sendHarvestDenial)

    // Send email for approve account
    router.post("/account/approve", emailing.sendApproveAccountEmail)

    // Send email for decline account
    router.post("/account/denial", emailing.sendDenialAccountEamil)

    router.post("/share", emailing.sendShareEmail)

    app.use('/api/email', router);
};