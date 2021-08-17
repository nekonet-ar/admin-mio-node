const express = require('express')
const Ingresar = express()
const jwt = require("jsonwebtoken")
const Comparar = require("../../lib/Funciones/Comparador")
const Consultador = require("../../../database/Consultador")

Ingresar.post("/Admin/adminloguin", async (req, res) => {
    const request = req.body
    const user = request.user
    const pass = request.pass
    let cant
    let passSql
    let adminSql
    const query = Consultador()
    const sql1 = `SELECT pass, provisoria FROM administradores WHERE usuario = ?`
    let result1
    let respuesta
    try {
        result1 = await query({
            sql: sql1,
            timeout: 2000,
            values: [user]
        })
    } finally {
        try {
            cant = result1.length
        } catch (error) {
            cant = 0
        }
        if (cant > 0) {
            passSql = result1[0].pass

            const comprobar = await Comparar(pass, passSql)

            if (comprobar) {
                const cookie = jwt.sign({ user: user, pass: pass, admin: adminSql }, process.env.SECRET, {
                    expiresIn: 60 * 60 * 24
                })

                const respuesta1 = {
                    cookie: cookie,
                    provisoria: result1[0].provisoria
                }

                respuesta = {
                    status: 200,
                    result: respuesta1
                }
                res.send(respuesta)
            } else {
                respuesta = {
                    status: 500,
                    error: "Contraseña incorrecta"
                }
                res.send(respuesta)
            }
        } else {
            respuesta = {
                status: 500,
                error: "Usuario incorrecto"
            }
            res.send(respuesta)
        }
    }
})

module.exports = Ingresar