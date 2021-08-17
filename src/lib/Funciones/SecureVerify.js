const jwt = require("jsonwebtoken")
const Consultador = require("../../../database/Consultador")

const VerifySecure = async (token) => {
    const query = Consultador()
    const sql1 = ` SELECT * FROM administradores WHERE usuario = ? `
    let result1

    if (!token) {
        return false
    } else {
        let decoded
        try {
            decoded = await jwt.verify(token, process.env.SECRET)
        } catch (error) {
            decoded = false
        }

        const user = decoded.user

        if (!decoded) {
            return false
        } else {

            try {
                result1 = await query({
                    sql: sql1,
                    timeout: 2000,
                    values: [user]
                })
            } finally {
                let cant
                try {
                    cant = parseInt(result1.length)
                } catch (error) {
                    cant = 0
                }

                if (cant > 0) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
}

module.exports = VerifySecure