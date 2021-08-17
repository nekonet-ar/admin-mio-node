const express = require('express')
const index = express()

index.get('/', (req, res) => {

    res.send("Bienvenido al entorno de pruebas de Punto Aroma!!")
})

module.exports = index