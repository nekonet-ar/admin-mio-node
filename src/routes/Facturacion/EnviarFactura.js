const express = require('express')
const EnvioFActura = express()
const ejs = require("ejs");
const path = require('path');
const Colors = require('../../../Global/Colors.json')
const Links = require('../../../Global/Links.json')
const Names = require('../../../Global/Names.json')
const Consultador = require("../../../../database/Consultador")
const SendEmail = require('../../../lib/Emails/SendEmailAttachment')

EnvioFActura.post('/test/EnvioFactura', async (req, res) => {
    const query = Consultador()
    const request = req.body
    const dni = request.dni
    const nombreCompleto = request.nombreCompleto
    const aDomi = request.aDomi
    const codCorreo = request.codCorreo
    const domicilio = request.domicilio
    const provincia = request.provincia
    const ciudad = request.ciudad
    const email = request.email
    const telefono = request.telefono
    const facturaName = request.facturaName
    const notaCredito = request.notaCredito
    let asunto
    const attachment = {
        filename: facturaName,
        path: path.join('Public', 'Facturas', facturaName)
    }
    let sucursalCorreo
    let informationList
    let parrafosHead
    let datos2

    const sql1 = `SELECT * FROM correo_sucursales WHERE cod_suc = ?`
    let result1

    if (notaCredito) {
        asunto = "Compra anulada - Nota de Crédito"
        informationList = [
            {
                col1: 6,
                title1: "Nombre completo",
                content1: nombreCompleto,
                col2: 6,
                title2: "DNI",
                content2: dni
            },
            {
                col1: 6,
                title1: "Email",
                content1: email,
                col2: 6,
                title2: "Telefóno",
                content2: telefono
            },
            {
                col1: 12,
                title1: "Aclaraciones",
                content1: "El pedido fué cancelado y ya se informó a la pasarela de pagos. Dependiendo del método de pago, verá reflejado la devolución pronto."
            }
        ]
        parrafosHead = [
            "En el presente email le adjuntamos la nota de crédito de la cancelación de la compra."
        ]

        datos2 = {
            Colors,
            Links,
            Names,
            //Particular
            //Head
            titlePage: "Confirmar Email",
            titleHead: "Hola " + nombreCompleto,
            parrafosHead: parrafosHead,

            //InfoForm
            titleInfoForm: "Sus Datos",
            informationList: informationList
        }

    } else {
        asunto = "Factura de compra realizada"
        if (!aDomi) {
            try {
                result1 = await query({
                    sql: sql1,
                    timeout: 2000,
                    values: [codCorreo]
                })
            } finally {
                const provSuc = result1[0].provincia
                const localSuc = result1[0].localidad
                const cpSuc = result1[0].cp
                const calleSuc = result1[0].calle
                const altSuc = result1[0].alt

                sucursalCorreo = calleSuc + " " + altSuc + ", " + localSuc + ", " + provSuc + " (CP " + cpSuc + ")"

                informationList = [
                    {
                        col1: 12,
                        title1: "Nombre completo",
                        content1: nombreCompleto
                    },
                    {
                        col1: 6,
                        title1: "DNI",
                        content1: dni,
                        col2: 6,
                        title2: "Tipo de envío",
                        content2: "En sucursal de Correo Argentino"
                    },
                    {
                        col1: 6,
                        title1: "Localidad",
                        content1: ciudad,
                        col2: 6,
                        title2: "Provincia",
                        content2: provincia
                    }, {
                        col1: 12,
                        title1: "Dirección de la sucursal",
                        content1: sucursalCorreo
                    },
                    {
                        col1: 6,
                        title1: "Email",
                        content1: email,
                        col2: 6,
                        title2: "Telefóno",
                        content2: telefono
                    }
                ]
            }

        } else {
            informationList = [
                {
                    col1: 12,
                    title1: "Nombre completo",
                    content1: nombreCompleto
                },
                {
                    col1: 6,
                    title1: "DNI",
                    content1: dni,
                    col2: 6,
                    title2: "Tipo de envío",
                    content2: "A domicilio"
                },
                {
                    col1: 6,
                    title1: "Localidad",
                    content1: ciudad,
                    col2: 6,
                    title2: "Provincia",
                    content2: provincia
                }, {
                    col1: 12,
                    title1: "Dirección",
                    content1: domicilio
                },
                {
                    col1: 6,
                    title1: "Email",
                    content1: email,
                    col2: 6,
                    title2: "Telefóno",
                    content2: telefono
                }
            ]
        }

        parrafosHead = [
            "En el presente email le adjuntamos la factura de su compra. A continuación le pasamos los datos de envío:"
        ]

        datos2 = {
            Colors,
            Links,
            Names,
            //Particular
            //Head
            titlePage: "Confirmar Email",
            titleHead: "Hola " + nombreCompleto,
            parrafosHead: parrafosHead,

            //InfoForm
            titleInfoForm: "Sus Datos de envío",
            informationList: informationList
        }
    }

    await ejs.renderFile(path.join("views", "Emails", "Templates", "FactEmail.ejs"), datos2, async function (err, data) {
        if (err) {
            respuesta = {
                status: 401,
                error: "Email no envíado!"
            }
            res.send(respuesta);
        } else {
            await SendEmail("info@cordobabaitcast.com.ar", "Córdoba Baitcast <info@cordobabaitcast.com.ar>", email, asunto, data, attachment)
                .then((resp) => {
                    respuesta = {
                        status: 200,
                        error: "Email envíado con éxito!"
                    }
                    res.send(respuesta);
                })
                .catch((err) => {
                    respuesta = {
                        status: 500,
                        error: "Error al enviar email!"
                    }
                    res.send(respuesta);
                })
        }
    });
})

module.exports = EnvioFActura