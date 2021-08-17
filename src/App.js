const express = require('express')
const bodyParser = require('body-parser')
var morgan = require('morgan')
require('dotenv').config()
let PORT
if (process.env.NODE_ENV === 'production') {
    PORT = process.env.PORTJS || 3100
} else {
    PORT = process.env.TESTPORTJS || 3101
}

const app = express()
var cors = require('cors')
const path = require('path')
var fs = require('fs'),
    https = require('https')

const ENTORNO = process.env.ENTORNO
app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyParser.json())
app.use(express.json())

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

morgan('dev')
app.use(cors({
    exposedHeaders: ['Content-Disposition']
}))

if (ENTORNO === "WINDOWS") {
    app.listen(PORT, () => {
        console.log("conectado en el puerto " + PORT)
    })
} else {
    var options = {
        key: fs.readFileSync(__dirname + '/private.key', 'utf8'),
        cert: fs.readFileSync(__dirname + '/certificate.crt', 'utf8')
    };
    https.createServer(options, app).listen(PORT, function () {
        console.log("Express server listening on port " + PORT)
    });
}
//Pruebas
app.use(require("./routes/Index"))
app.use(require("./routes/EmailsViews/ConfirmEmail"))
app.use(require("./routes/EmailsViews/ForgotPass"))
app.use(require("./routes/EmailsViews/Marketing"))
app.use(require("./routes/EmailsViews/NewsPlatform"))
app.use(require("./routes/EmailsViews/FacturaVista"))

//Admin
app.use(require("./routes/Admin/Ingresar"))
app.use(require("./routes/Admin/NvaPass"))
app.use(require("./routes/Admin/VerifLog"))

//AFIP
app.use(require("./routes/Afip/DatosCuit"))

//FACTURACION
app.use(require("./routes/Facturacion/FacturacionWS"))


