const express = require('express')
const CambioEmail = express()
const ejs = require("ejs");
const path = require('path');
const Encriptador = require("../../lib/Funciones/Encriptador")
const Consultador = require("../../../database/Consultador")
const FormatFecha = require('../../lib/Funciones/FormatDate2')
const SendEmail = require('../../lib/Emails/SendEmail')
const Colors = require('../../Global/Colors.json')
const Links = require('../../Global/Links.json')
const Names = require('../../Global/Names.json')
const Emails = require('../../Global/Emails.json')

CambioEmail.post("/Admin/recpass", async (req, res) => {
    const query = Consultador()
    const request = req.body
    const email = request.email
    const cadenaLarga = "QWERTYUIOPASDFGHJKLZXCVBNM12345678909876543210mnbvcxzlkjhgfdsapoiuytrewq"
    let nvaPass = ""
    let rndm = 0
    const fecha = new Date()
    const hour = parseInt(FormatFecha(fecha, "hor"))
    let saludo
    if (hour > 6 && hour < 13) {
        saludo = "Buenos días"
    } else if (hour > 13 && hour < 20) {
        saludo = "Buenas tardes"
    } else {
        saludo = "Buenas noches"
    }
    while (nvaPass.length < 10) {
        rndm = Math.round(Math.random() * 72)
        nvaPass = nvaPass + cadenaLarga.substring(rndm, (rndm + 1))
    }

    const passToken = await Encriptador(nvaPass)
    const sql1 = ` UPDATE administradores SET pass = ?, provisoria = '1' WHERE usuario = ? `
    let result1
    let respuesta

    try {
        result1 = await query({
            sql: sql1,
            timeout: 2000,
            values: [passToken, email]
        })
    } finally {
        const rowsAff = parseInt(result1.affectedRows)
        if (rowsAff > 0) {

            const parrafosHead = [
                "Por cuestiones de seguridad le pasamos la contraseña por este medio."
            ]

            const datos = {
                Colors,
                Links,
                Names,
                //Particular
                //Head
                titlePage: "Recuperar Contraseña",
                titleHead: saludo,
                parrafosHead: parrafosHead,

                //ActionBtn
                titleButton: "A continuación tiene su contraseña provisoria",
                textCall: nvaPass,
                textFoother: "Una vez que ingrese va a poder cambiar la contraseña por una que recuerde."
            }
            console.log('Emails.sender', Emails[0].sender)
            await ejs.renderFile(path.join(__dirname, "..", "..", "..", "views", "Emails", "Templates", "ForgotPass.ejs"), datos, async function (err, data) {
                if (err) {
                    respuesta = {
                        status: 401,
                        error: "Email no envíado!"
                    }
                    res.send(respuesta);
                } else {
                    await SendEmail(Emails[0].sender, Emails[0].senderView, 'jretondo90@gmail.com', "Recuperar Contraseña", data)
                    respuesta = {
                        status: 200,
                        result: result1
                    }
                    res.send(respuesta);
                }
            });
        } else {
            respuesta = {
                status: 500,
                result: "No se encontró el email colocado!"
            }
            res.send(respuesta)
        }
    }
})

module.exports = CambioEmail