const express = require('express')
const FacturaVista = express()
const ejs = require("ejs");
const path = require('path');
const Colors = require('../../Global/Colors.json')
const Links = require('../../Global/Links.json')
const Names = require('../../Global/Names.json')
const pdf = require("html-pdf")
const base64 = require('base-64')
const utf8 = require('utf8')
const QRCode = require('qrcode')
const DatosFact = require("../../Global/FactData.json")
const fs = require("fs")

FacturaVista.get('/emailV/FacturaVista', async (req, res) => {
    const myCss = {
        style: fs.readFileSync(path.join(__dirname, './style.css'), 'utf8')
    };
    const ubicacionHtml = path.join("views", "Factura", "Factura.ejs")
    const paraAfip = "https://www.afip.gob.ar/fe/qr/?p=asgvasdgadga"
    QRCode.toDataURL(paraAfip, function (err, url) {
        if (err) {
            respuesta = {
                status: 301,
                error: err
            }
            const resultado = {
                facturaData,
                respuesta,
                status: 301
            }
            res.send(resultado);
        } else {
            ejs.renderFile(ubicacionHtml, {
                myCss: myCss,
                logo: DatosFact[0].logo,
                logoAfip1: DatosFact[0].logoAfip1,
                logoAfip2: DatosFact[0].logoAfip2,
                codQR: url,
                factNro: "00003" + "-" + "12345678",
                fechaFact: "25/08/2021",
                clienteDireccion: "",
                clienteEmail: "",
                clienteName: "Algun cliente piola",
                clienteNro: "30550273558",
                subTotal: "22.852,12",
                costoEnvio: "0",
                totalFact: "22.852,12",
                caeNro: "35435431313131",
                caeVto: "20/08/2022",
                listaItems: [],
                cbteAsoc: "",
                cupon: "",
                descCupon: ""
            }, function (err, data) {
                res.render('Factura/ForFacturagotPass.ejs', {
                    myCss: myCss,
                    logo: DatosFact[0].logo,
                    logoAfip1: DatosFact[0].logoAfip1,
                    logoAfip2: DatosFact[0].logoAfip2,
                    codQR: url,
                    factNro: "00003" + "-" + "12345678",
                    fechaFact: "25/08/2021",
                    clienteDireccion: "",
                    clienteEmail: "",
                    clienteName: "Algun cliente piola",
                    clienteNro: "30550273558",
                    subTotal: "22.852,12",
                    costoEnvio: "0",
                    totalFact: "22.852,12",
                    caeNro: "35435431313131",
                    caeVto: "20/08/2022",
                    listaItems: [],
                    cbteAsoc: "",
                    cupon: "",
                    descCupon: ""
                });
            });
        }
    })

})

module.exports = FacturaVista