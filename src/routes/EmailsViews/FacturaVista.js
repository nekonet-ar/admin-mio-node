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
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAABdCAYAAAD9qEDcAAAACXBIWXMAAAsSAAALEgHS3X78AAANDklEQVR4nO2dTXLbuBaFj596A8ywM2NWkJLnna6SlyAvQV6CNHvumbQEeQn2Eqyql8ytzgrM6kmm4QrYfAPcG9IQKPGfBH2+KpUjhgABQji8uAAur9I0BSGEjJ3/DF0AQggpA8WKEOIFFCtCiBdQrAghXkCxIoR4AcWKEOIFFCt...",
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
                descCupon: "",
                tCliente: 1
            }, function (err, data) {

                res.render('Factura/Factura.ejs', {
                    myCss: myCss,
                    logo: "data:image/png;base64,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",
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
                    descCupon: "",
                    tCliente: 1,
                    descr: "asgasgasg ae ege eg ew ew ew ewgewgewggaegesag egewg weg we ew ew ew ewewgewg ewg ew ew ew we ewggewgewgewgewg ewgewgewgew gewg ewew ewwegewg ew ewewgewgeggewgewg",
                    condIva: "Responsable Inscripto"
                });
            });
        }
    })

})

module.exports = FacturaVista