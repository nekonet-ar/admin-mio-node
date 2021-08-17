const nodemailer = require("nodemailer")

const SendEmail = async (senderConf, sender, recepter, subject, msg) => {
    const tranporter = nodemailer.createTransport({
        host: process.env.HOST_EMAIL,
        post: process.env.PORT_EMAIL,
        secure: true,
        auth: {
            user: senderConf,
            pass: process.env.PASS_EMAIL
        }
    })

    return await tranporter.sendMail({
        from: sender,
        to: recepter,
        subject: subject,
        html: msg
    })
}

module.exports = SendEmail
