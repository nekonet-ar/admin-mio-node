const Consultador = require("../../../database/Consultador");

async function ConsultCorto2(sql, values, resolve) {
    const query = Consultador()
    let result = []
    result.length
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
            if (!cantidad) {
                cantidad = 0
            }
        } catch (error) {
            cantidad = 0
        }

        if (cantidad === 0) {
            try {
                cantidad = parseInt(result[0].length)
                if (!cantidad) {
                    cantidad = 0
                }
            } catch (error) {
                cantidad = 0
            }
        }

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