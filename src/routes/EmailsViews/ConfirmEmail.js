const express = require('express')
const EmailPrueba = express()
const ejs = require("ejs");
const path = require('path');
const Colors = require('../../Global/Colors.json')
const Links = require('../../Global/Links.json')
const Names = require('../../Global/Names.json')

EmailPrueba.get('/emailV/confirmEmail', async (req, res) => {

    const informationList = [{
        col1: 6,
        title1: "CUIT",
        content1: "20350925148",
        col2: 6,
        title2: "Persona",
        content2: "Fisica"
    }, {
        col1: 12,
        title1: "Razón Social",
        content1: "Retondo Javier Edgardo"
    }, {
        col1: 12,
        title1: "Dirección",
        content1: "Av. Emilio Olmos 324, Córdoba"
    }]

    const parrafosHead = [
        "ContaNET le da la bienvenida a la plataforma herramienta para contadores."
    ]

    const datos2 = {
        Colors,
        Links,
        Names,
        //Particular
        //Head
        titlePage: "Confirmar Email",
        titleHead: "Hola Retondo Javier",
        parrafosHead: parrafosHead,

        //ActionBtn
        titleButton: "Haga click en el siguiente botón para confirmar su correo electrónico",
        textCall: "Confirmar Correo",
        redirectCall: "https://nekonet.com.ar",

        //InfoForm
        titleInfoForm: "Sus Datos",
        informationList: informationList,
    }

    ejs.renderFile(path.join(__dirname, '..', '..', '..', "views", "registrado.ejs"), function (err, data) {

        res.render('Emails/Templates/ConfirmEmail.ejs', datos2);

    });

})

module.exports = EmailPrueba