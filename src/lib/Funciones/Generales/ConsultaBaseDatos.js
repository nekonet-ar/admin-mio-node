const Consultador = require("../../../../database/Consultador")

async function ConsultaGeneral2(sql, values, resolve) {
    const query = Consultador()
    let result = []

    try {
        result = await query({
            sql: sql,
            timeout: 2000,
            values: values
        })
    } finally {
        resolve(result)
    }
}

const ConsultaGeneral = (sql, values) => {
    return new Promise(resolve => {
        (ConsultaGeneral2(sql, values, resolve))
    })
}

module.exports = ConsultaGeneral