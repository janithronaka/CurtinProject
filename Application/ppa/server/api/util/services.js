var nodemailer = require('nodemailer');

function Controller() {
    this.sendMail = (subject, body, to, from) => {
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sbv.ppa.mail.service@gmail.com',
                    pass: 'SBV.ppa_2'
                }
            });
            var fromUser;
            if (from == null) {
                fromUser = 'sbv.ppa.mail.service@gmail.com';
            }
            else {
                fromUser = from;
            }

            var mailOptions = {
                from: fromUser,
                to: to,
                subject: subject,
                html: body
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject({
                        status: 500,
                        message: 'An error occured when sending the mail : ' + error
                    })
                } 
                else {
                    resolve({
                        status: 200,
                        message: 'Email sent to ' + to
                    });
                }
            });
        })

    }
}

module.exports = new Controller();