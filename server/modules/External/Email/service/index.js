const nodemailer = require("nodemailer");

exports.sendEmail = ({ subject, text, receivers }) => {
    const SENDER_EMAIL = process.env.SENDER_EMAIL;

    var transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD,
        },
    });

    return transport.sendMail({
        from: {
            address: SENDER_EMAIL,
            name: "Mailtrap Test",
        },
        to: receivers,
        subject,
        text,
    });
};
