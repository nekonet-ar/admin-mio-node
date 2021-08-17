const express = require('express')
const FacturacionWS = express()
const CrearFActura = require("../../lib/Funciones/CrearFactura")
const CrearFactPDF = require("../../lib/Funciones/CrearFactPDF")
const DatosFact = require("../../Global/FactData.json")
const FormatDate = require("../../lib/Funciones/FormatDate")
const zfill = require("../../lib/Funciones/CeroIzq")
const fs = require("fs")
const path = require("path")
const Consultador = require("../../../database/Consultador")
const formatMoney = require("../../lib/Funciones/NumberFormat")
const formatDate = require('../../lib/Funciones/FormatDate')
const VerifySecure = require('../../lib/Funciones/SecureVerify')

FacturacionWS.post('/Facturacion/CrearFactura', async (req, res) => {
    const query = Consultador()
    const token = req.headers['x-access-token']
    const isSecure = await VerifySecure(token)

    if (isSecure) {

        const datos = req.body
        const tCliente = parseInt(datos.tCliente)
        const cuit = datos.cuit
        const razSoc = datos.razSoc
        const condIva = datos.condIva
        const fecha = formatDate(new Date(datos.fecha), "yyyy-mm-dd")
        const descr = datos.descr
        const total = parseFloat(datos.total)

        const sql1 = ` INSERT INTO facturas_generadas(fecha, pv, numero, total, cae, vto_cae, raz_soc, cuit, cond_iva) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) `

        let result1

        const myCss = {
            style: fs.readFileSync(path.join(__dirname, './style.css'), 'utf8')
        };

        const totalFact = total
        const totalFactStr = formatMoney(totalFact)

        let facturar = totalFact

        const facturaData = await CrearFActura(tCliente, cuit, facturar, false, 0)

        if (!facturaData) {
            respuesta = {
                status: 501,
                error: "Error interno en el servidor!"
            }
            res.send(respuesta)
        } else {
            let tipoDoc
            if (tCliente === 0) {
                tipoDoc = 99
            } else {
                tipoDoc = 80
            }

            const factData = {
                "ver": 1,
                "fecha": facturaData.date,
                "cuit": 20350925148,
                "ptoVta": 3,
                "tipoCmp": 11,
                "nroCmp": facturaData.cbte,
                "importe": facturar,
                "moneda": "PES",
                "ctz": 0,
                "tipoDocRec": tipoDoc,
                "nroDocRec": cuit,
                "tipoCodAut": "E",
                "codAut": facturaData.nroCae
            }

            try {
                result1 = await query({
                    sql: sql1,
                    timeout: 5000,
                    values: [fecha, 3, facturaData.cbte, totalFact, facturaData.nroCae, facturaData.vtoCae, razSoc, cuit, condIva]
                })
            } finally {

                await CrearFactPDF(myCss, factData, DatosFact[0].logo, DatosFact[0].logoAfip1, DatosFact[0].logoAfip2, FormatDate(new Date(facturaData.date), "dd/mm/yyyy"), razSoc, cuit, totalFactStr, facturaData.nroCae, FormatDate(new Date(facturaData.vtoCae), "dd/mm/yyyy"), "00003", await zfill(facturaData.cbte, 8), res, facturaData, false, 0, tCliente, descr, condIva)
            }
        }
    } else {
        res.send({
            status: 403,
            error: "No tiene los permisos"
        })
    }
})

module.exports = FacturacionWS