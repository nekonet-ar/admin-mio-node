const nodemailer = require("nodemailer")

const SendEmail = async (senderConf, sender, recepter, subject, msg, attachment, email) => {
    const tranporter = nodemailer.createTransport({
        host: "vps-1732318-x.dattaweb.com",
        post: 465,
        secure: true,
        auth: {
            user: senderConf,
            pass: "@genioIQ140"
        }
    })

    return await tranporter.sendMail({
        from: sender,
        to: recepter,
        cc: email,
        subject: subject,
        attachments: attachment,
        html: msg
    })
}

module.exports = SendEmail
