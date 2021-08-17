const express = require('express')
const EstadoAfip = express()
const Afip = require('@afipsdk/afip.js')
const path = require("path")

EstadoAfip.get('/estadoAfip', async (req, res) => {
    const resFolder = path.join("src", "lib", "Afip", "crt")
    //const crtFile = "201859993363test.crt"
    const crtFile = "201859993363.crt"
    const keyFile = "201859993363.key"
    const ticketFolder = path.join("src", "lib", "Afip", "token")
    const afip = new Afip({
        CUIT: 20185999336,
        res_folder: resFolder,
        cert: crtFile,
        key: keyFile,
        ta_folder: ticketFolder,
        production: true
    })

    const statusAfip = await afip.ElectronicBilling.getServerStatus()
    const appStatus = statusAfip.AppServer
    const bdServer = statusAfip.DbServer
    const authServer = statusAfip.AuthServer

    console.log(`appStatus`, appStatus)
    console.log(`bdServer`, bdServer)
    console.log(`authServer`, authServer)

    res.send(statusAfip)
})

module.exports = EstadoAfip