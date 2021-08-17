const express = require('express')
const datosCuit = require('../../lib/Afip/pruebaAfip')
const VerifySecure = require('../../lib/Funciones/SecureVerify')
const DatosCuitR = express()

DatosCuitR.post('/Afip/DatosCuit', async (req, res) => {
    const token = req.headers['x-access-token']
    const isSecure = await VerifySecure(token)

    if (isSecure) {
        const request = req.body
        const cuit = request.cuit
        const Datos = await datosCuit(cuit)
        const status = parseInt(Datos.status)

        if (status === 200) {
            try {

                const datosGenerales = Datos.datosAfip.datosGenerales
                const tipoPersona = datosGenerales.tipoPersona
                const impuestosArray = Datos.datosAfip.datosRegimenGeneral.impuesto
                let impuestoId = 1

                Promise.all(
                    impuestosArray.map(item => {
                        const idImp = parseInt(item.idImpuesto)
                        if (idImp === 20) {
                            impuestoId = 1
                        } else if (idImp === 30) {
                            impuestoId = 0
                        } else if (idImp === 32) {
                            impuestoId = 2
                        }
                    })
                )

                let razSocial

                if (tipoPersona === "FISICA") {
                    razSocial = datosGenerales.nombre + " " + datosGenerales.apellido
                } else if (tipoPersona === "JURIDICA") {
                    razSocial = datosGenerales.razonSocial
                }

                res.send({
                    status: 200,
                    result: {
                        impuestoId,
                        razSocial
                    }
                })
            } catch (error) {
                res.send({
                    status: 501,
                    error: "No es válido el CUIT"
                })
            }
        } else {
            res.send({
                status: 501,
                error: "No es válido el CUIT"
            })
        }

    } else {
        res.send({
            status: 403,
            result: "No tiene los permisos para hacer esta operación"
        })
    }
})

module.exports = DatosCuitR
