exports.sendResetPasswordCode = (req, res) => {
    if (!req.params.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var nodemailer = require('nodemailer');
    var randomstring = require("randomstring");
    var passwordHash = require('password-hash');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'WUNDERGrubsAWS@gmail.com',
            pass: 'Drmv+8yJ'
        }
    });

    var code = randomstring.generate({
        length: 6,
        charset: 'alphanumeric'
    });

    console.log(code)

    var mailOptions = {
        from: 'WUNDERGrubsAWS@gmail.com',
        to: req.params.email,
        subject: 'Reset your WUNDERGrubs\' account password.',
        text: "Hello, dear user \r\n" +
            "You are receiving this email because we have gotten a request for resetting your password of your account on WUNDERGrubs." +
            "If you were not making such request, you could simply ignore this email. If you made such request, then please copy the " +
            "following code and enter it to the corresponding text field on the web page you made the request. After that, you will able to " +
            "reset your password.\r\n" +
            "Your code is: " + code
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    var hashedCode = passwordHash.generate(code);
    var data = {
        hashCode: hashedCode
    }

    res.send(data);
}

exports.sendTransactionEdition = (req, res) => {

}

exports.sendTransactionDenial = (req, res) => {
    var address = req.body.address;
    var edited_by = req.body.edited_by;
    var transaction_id = req.body.transaction_id;

    if (!address) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'WUNDERGrubsAWS@gmail.com',
            pass: 'Drmv+8yJ'
        }
    });

    var mailOptions = {
        from: 'WUNDERGrubsAWS@gmail.com',
        to: address,
        subject: 'Your Transaction on WUNDERGrubs is Denied.',
        text: "Hello, dear user \r\n" +
            "You are receiving this email because one of your transaction on WUNDERGrubs is DECLINED by an administrator." +
            "The ID of the declined transaction is " + transaction_id + ", and you can query detail information about this" +
            "transaction on our website or app by searching this is.\r\n" +
            "If you have any questions of this declination, you can go to our Help Center to ask questions or send an email to: " +
            "WUNDERGrubsAWS@gmail.com or " + edited_by + ".\r\n" +
            "We are sorry for the inconvenience."
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send("Email sent");
}

exports.sendHarvestDenial = (req, res) => {
    var address = req.body.address;
    var edited_by = req.body.edited_by;
    var transaction_id = req.body.transaction_id;

    if (!address) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'WUNDERGrubsAWS@gmail.com',
            pass: 'Drmv+8yJ'
        }
    });

    var mailOptions = {
        from: 'WUNDERGrubsAWS@gmail.com',
        to: address,
        subject: 'Your Harvest on WUNDERGrubs is Denied.',
        text: "Hello, dear user \r\n" +
            "You are receiving this email because one of your harvest on WUNDERGrubs is DECLINED by an administrator." +
            "The ID of the declined harvest is " + transaction_id + ", and you can query detail information about this" +
            "harvest on our website or app by searching this is.\r\n" +
            "If you have any questions of this declination, you can go to our Help Center to ask questions or send an email to: " +
            "WUNDERGrubsAWS@gmail.com or " + edited_by + ".\r\n" +
            "We are sorry for the inconvenience."
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send("Email sent");
}