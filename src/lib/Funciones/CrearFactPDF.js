const ejs = require("ejs")
const path = require('path')
const pdf = require("html-pdf")
const base64 = require('base-64')
const utf8 = require('utf8')
const QRCode = require('qrcode')
const fs = require("fs")

const CrearFactPDF = async (myCss, factData, logo, logoAfip1, logoAfip2, fechaFactStr, clienteName, clienteNro, totalFact, caeNro, caeVto, pvStr, nroCbteStr, res, facturaData, notaCred, cbteRel, tCliente, descr, condIva) => {

    let condIvaStr
    if (condIva === 0) {
        condIvaStr = "Responsable Inscripto"
    } else if (condIva === 1) {
        condIvaStr = "Responsable Monotributo"
    } else {
        condIvaStr = "Responsable Exento"
    }

    let respuesta = []

    function base64_encode(file) {
        // read binary data
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer.from(bitmap).toString('base64');
    }

    const factDataStr = JSON.stringify(factData)
    var text = factDataStr
    var bytes = utf8.encode(text);
    var encoded = base64.encode(bytes);
    const paraAfip = "https://www.afip.gob.ar/fe/qr/?p=" + encoded
    let logo64 = base64_encode(path.join("Public", "Img", "logo.png"))
    let lAfip1 = base64_encode(path.join("Public", "Img", "AFIP1.png"))
    let lAfip2 = base64_encode(path.join("Public", "Img", "AFIP2.png"))
    let ubicacionHtml
    let letra

    if (notaCred) {
        ubicacionHtml = path.join("views", "Factura", "NotaCred.ejs")
        letra = "NC"
    } else {
        ubicacionHtml = path.join("views", "Factura", "Factura.ejs")
        letra = "C"
    }
    QRCode.toDataURL(paraAfip, function (err, url) {
        if (err) {
            respuesta = {
                status: 301,
                error: err
            }
            const resultado = {
                facturaData,
                respuesta,
                status: 301
            }
            res.send(resultado);
        } else {
            ejs.renderFile(ubicacionHtml, {
                myCss: myCss,
                logo: 'data:image/png;base64,' + logo64,
                logoAfip1: 'data:image/png;base64,' + lAfip1,
                logoAfip2: 'data:image/png;base64,' + lAfip2,
                codQR: url,
                factNro: pvStr + "-" + nroCbteStr,
                fechaFact: fechaFactStr,
                clienteName: clienteName,
                clienteNro: clienteNro,
                totalFact: totalFact,
                caeNro: caeNro,
                caeVto: caeVto,
                cbteAsoc: cbteRel,
                tCliente: tCliente,
                descr: descr,
                condIva: condIvaStr
            }, function (err, data) {
                if (err) {
                    respuesta = {
                        status: 301,
                        error: err
                    }
                    const resultado = {
                        facturaData,
                        respuesta,
                        status: 301
                    }
                    res.send(resultado);
                } else {
                    let options = {
                        "height": "16.5in",        // allowed units: mm, cm, in, px
                        "width": "12in",            // 
                        "border": {
                            "right": "0.5cm",
                            "left": "0.5cm"
                        }
                    };
                    const filePath = path.join(__dirname, "..", "..", "..", "Public", "Facturas", letra + pvStr + "-" + nroCbteStr + ".pdf")

                    pdf.create(data, options).toFile(filePath, async function (err, data) {
                        if (err) {

                            respuesta = {
                                status: 301,
                                error: err
                            }
                            const resultado = {
                                facturaData,
                                respuesta,
                                status: 301
                            }
                            res.send(resultado);
                        } else {
                            console.log(`filePath`, filePath)
                            var file = fs.createReadStream(filePath);
                            var stat = fs.statSync(filePath);
                            res.setHeader('Content-Length', stat.size);
                            res.setHeader('Content-Type', 'application/pdf');
                            res.setHeader('Content-Disposition', 'filename=Fact ' + letra + " " + pvStr + "-" + nroCbteStr + ".pdf");

                            file.pipe(res);
                        }
                    });
                }
            });
        }
    })
}

module.exports = CrearFactPDF