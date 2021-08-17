const Consultador = require("../../../database/Consultador");

async function TotalStock2(idProd, resolve) {
    const query = Consultador()
    const sql = ` SELECT SUM(cant) as cantidad FROM stock WHERE id_prod = ? `
    let result = []

    try {
        result = await query({
            sql: sql,
            tiemout: 2000,
            values: [idProd]
        })
    } finally {
        let cantidad

        try {
            cantidad = parseInt(result[0].cantidad)
            if (!cantidad) {
                cantidad = 0
            }
        } catch (error) {
            cantidad = 0
        }

        resolve(cantidad)
    }
}

const TotalStock = (idProd) => {
    return new Promise(resolve => {
        (TotalStock2(idProd, resolve))
    })
}
module.exports = TotalStock