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

    var mailOptions = {
        from: 'WUNDERGrubsAWS@gmail.com',
        to: req.params.email,
        subject: 'Reset your WUNDERGrubs\' account password.',
        text: "Hello, dear user \r\n" +
            "You are receiving this email because we have gotten a request for resetting your password of your account on WUNDERGrubs." +
            "If you were not making such request, you could simply ignore this email. If you made such request, then please copy the " +
            "following code and enter it to the corresponding text field on the web page you made the request. After that, you will able to" +
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
        hashCode:g hashedCode
    }

    res.send(data);
}