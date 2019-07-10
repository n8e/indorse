const nodemailer = require('nodemailer');

const sendMail = (toAddress, token) => {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILER_ADDRESS,
                pass: process.env.MAILER_PASSWORD
            }
        });

        var url = `http://localhost:8080/users/confirmation/${token}`;

        var mailOptions = {
            from: 'mc-hariah@hotmail.com',
            to: toAddress,
            subject: 'Your email verification link from Indorse',
            html: `
                <p>Almost done! Please confirm your registration by clicking on the link below:</p>
                <p><a href=${url}>Verification Link</a></p>
                <p>Having trouble opening the link? Please copy and paste the link below into your browser's address bar:</p>
                <p><a href=${url}>${url}</a></p> 
                <p>If you have not signed-up on Indorse, kindly ignore this email.</p>
                <br />
                <p>Kind regards,</p>
                <p>Team Indorse</p>
            `
        };

        return transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(new Error(error));
            } else {
                resolve('Email sent: ' + info.response);
            }
        });
    });
};

module.exports = sendMail;
