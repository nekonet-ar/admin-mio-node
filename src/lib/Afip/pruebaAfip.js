const Afip = require('@afipsdk/afip.js')

const datosCuit = async (CUIT) => {
    console.log(`CUIT`, CUIT)
    const afip = new Afip({
        CUIT: 20350925148,
        res_folder: `${__dirname}/crt/`,
        cert: "203509251484.crt",
        key: "203509251484.key",
        ta_folder: `${__dirname}/token/`,
        production: true
    })
    let respuesta

    try {
        const taxpayerDetails = await afip.RegisterScopeFive.getTaxpayerDetails(CUIT)
        if (taxpayerDetails === null) {
            respuesta = {
                status: 500,
                error: error
            }
            return respuesta
        } else {
            respuesta = {
                status: 200,
                datosAfip: taxpayerDetails
            }
            return respuesta
        }
    } catch (error) {
        respuesta = {
            status: 500,
            error: error
        }
        return respuesta
    }
}

module.exports = datosCuit