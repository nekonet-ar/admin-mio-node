const Consultador = require("../../../database/Consultador");

async function ConsultCorto2(sql, values, resolve) {
    const query = Consultador()
    let result = []
    try {
        result = await query({
            sql: sql,
            timeout: 2000,
            values: values
        })
    } finally {
        let cantidad
        try {
            cantidad = parseInt(result.length)
        } catch (error) {
            cantidad = 0
        }
        console.log(`cantidadEsp`, cantidad)
        resolve({
            cantidad,
            result
        })
    }
}

const ConsultCorto = (sql, values) => {
    return new Promise(resolve => {
        (ConsultCorto2(sql, values, resolve))
    })
}

module.exports = ConsultCorto