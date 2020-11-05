const Service = 'gmail';
const EmailAddress = 'WUNDERGrubsAWS@gmail.com';
const PassWord = 'Drmv+8yJ';

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
        service: Service,
        auth: {
            user: EmailAddress,
            pass: PassWord
        }
    });

    var code = randomstring.generate({
        length: 6,
        charset: 'alphanumeric'
    });


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
    var address = req.body.old_data.username;
    var id = req.body.old_data.id;
    var edited_by = req.body.new_data.edited_by;
    var old = {
        delivery_type: req.body.old_data.delivery_type,
        donor_type: req.body.old_data.donor_type,
        frequency: req.body.old_data.frequency,
        weight: req.body.old_data.weight,
        waste_type: req.body.old_data.waste_type,
    }
    var neo = {
        delivery_type: req.body.new_data.delivery_type,
        donor_type: req.body.new_data.donor_type,
        frequency: req.body.new_data.frequency,
        weight: req.body.new_data.weight,
        waste_type: req.body.new_data.waste_type,
    }

    if (!address) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: Service,
        auth: {
            user: EmailAddress,
            pass: PassWord
        }
    });

    var dif_list = "";

    if (old.delivery_type !== neo.delivery_type) {
        dif_list += "\tThe delivery type is changed FROM " + old.delivery_type + " TO " + neo.delivery_type + "\r\n";
    }

    if (old.donor_type !== neo.donor_type) {
        dif_list += "\tThe donor Type is changed FROM " + old.donor_type + " TO " + neo.donor_type + "\r\n";
    }

    if (old.frequency !==  neo.frequency) {
        dif_list += "\tThe frequency is changed FROM " + old.frequency + " TO " + neo.frequency + "\r\n";
    }

    if (old.waste_type !==  neo.waste_type) {
        dif_list += "\tThe waste type is changed FROM " + old.waste_type + " TO " + neo.waste_type + "\r\n";
    }

    if (old.weight !==  neo.weight) {
        dif_list += "\tThe weight is changed FROM " + old.weight + " TO " + neo.weight + "\r\n";
    }

    var mailOptions = {
        from: 'WUNDERGrubsAWS@gmail.com',
        to: address,
        subject: 'Your Transaction on WUNDERGrubs has been Edited.',
        text: "Hello, \r\n" +
            "You are receiving this email because one of your transactions on WUNDERGrubs has been approved with some edits. " +
            "The following are the edits on your transaction: \r\n" + dif_list +
            "The ID of this transaction is " + id + ". You can query detailed information about this transaction on our " +
            "website or app by searching this ID.\r\n" +
            "If you have any questions about this edit, you can go to our Help Center to ask questions or send an email to: " +
            "WUNDERGrubsAWS@gmail.com or " + edited_by + ".\r\n"
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

exports.sendHarvestEdition = (req, res) => {
    var address = req.body.old_data.username;
    var id = req.body.old_data.id;
    var edited_by = req.body.new_data.edited_by;
    var old = {
        weight: req.body.old_data.weight,
        feed_type: req.body.old_data.feed_type
    }
    var neo = {
        weight: req.body.new_data.weight,
        feed_type: req.body.new_data.feed_type
    }

    if (!address) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: Service,
        auth: {
            user: EmailAddress,
            pass: PassWord
        }
    });

    var dif_list = "";

    if (old.feed_type !== neo.feed_type) {
        dif_list += "\tThe feed type is changed FROM " + old.feed_type + " TO " + neo.feed_type + "\r\n";
    }

    if (old.weight !== neo.weight) {
        dif_list += "\tThe weight is changed FROM " + old.weight + " TO " + neo.weight + "\r\n";
    }

    var mailOptions = {
        from: 'WUNDERGrubsAWS@gmail.com',
        to: address,
        subject: 'Your Harvest on WUNDERGrubs has been Edited.',
        text: "Hello, \r\n" +
            "You are receiving this email because one of your harvests on WUNDERGrubs has been approved with some edits. " +
            "The following are the edits on your harvest: \r\n" + dif_list +
            "The ID of this harvest is " + id + ". You can query detailed information about this harvest on our " +
            "website or app by searching this ID.\r\n" +
            "If you have any questions about this edit, you can go to our Help Center to ask questions or send an email to: " +
            "WUNDERGrubsAWS@gmail.com or " + edited_by + ".\r\n"
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
        service: Service,
        auth: {
            user: EmailAddress,
            pass: PassWord
        }
    });

    var mailOptions = {
        from: 'WUNDERGrubsAWS@gmail.com',
        to: address,
        subject: 'Your Transaction on WUNDERGrubs has been Denied.',
        text: "Hello, \r\n" +
            "You are receiving this email because one of your transactions on WUNDERGrubs has been DECLINED by an administrator." +
            "The ID of the declined transaction is " + transaction_id + ", and you can query detailed information about this" +
            "transaction on our website or app by searching this ID.\r\n" +
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
        service: Service,
        auth: {
            user: EmailAddress,
            pass: PassWord
        }
    });

    var mailOptions = {
        from: 'WUNDERGrubsAWS@gmail.com',
        to: address,
        subject: 'Your Harvest on WUNDERGrubs has been Denied.',
        text: "Hello, \r\n" +
            "You are receiving this email because one of your harvests on WUNDERGrubs is DECLINED by an administrator." +
            "The ID of the declined harvest is " + transaction_id + ", and you can query detail information about this" +
            "harvest on our website or app by searching this ID.\r\n" +
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

exports.sendApproveAccount = (req, res) => {
    if (!req.params.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: Service,
        auth: {
            user: EmailAddress,
            pass: PassWord
        }
    });

    var mailOptions = {
        from: 'WUNDERGrubsAWS@gmail.com',
        to: req.params.username,
        subject: 'Your Account on WUNDERGrubs is Approved!',
        text: "Hello, dear user \r\n" +
            "Congratulation, dear user. Your account on WUNDERGrubs is approved. Now, you can log into WUNDERGRubs with" +
            "this E-mail address: " + req.params.username + " ."
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.sendDenialAccount = (req, res) => {
    if (!req.params.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: Service,
        auth: {
            user: EmailAddress,
            pass: PassWord
        }
    });

    var mailOptions = {
        from: 'WUNDERGrubsAWS@gmail.com',
        to: req.params.username,
        subject: 'Your Account on WUNDERGrubs is Declined!',
        text: "Hello, dear user \r\n" +
            "We are sorry to inform you that your account application on WUNDERGrubs"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}