const express = require('express')
const EmailPrueba = express()
const ejs = require("ejs");
const path = require('path');
const Colors = require('../../Global/Colors.json')
const Links = require('../../Global/Links.json')
const Names = require('../../Global/Names.json')

EmailPrueba.get('/emailV/ForgotPass', async (req, res) => {

    const parrafosHead = [
        "Por cuestiones de seguridad le pasamos la contraseña por este medio."
    ]

    const datos2 = {
        Colors,
        Links,
        Names,
        //Particular
        //Head
        titlePage: "Recuperar Contraseña",
        titleHead: "Hola Retondo Javier",
        parrafosHead: parrafosHead,

        //ActionBtn
        titleButton: "A continuación tiene su contraseña provisoria",
        textCall: "asdgagaegagwag",
        textFoother: "Una vez que ingrese va a poder cambiar la contraseña por una que recuerde."
    }

    ejs.renderFile(path.join(__dirname, '..', '..', '..', "views", "registrado.ejs"), function (err, data) {

        res.render('Emails/Templates/ForgotPass.ejs', datos2);

    });

})

module.exports = EmailPrueba