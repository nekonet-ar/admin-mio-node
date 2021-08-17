const mysql = require('mysql');
const util = require('util');

let databaseName
if (process.env.NODE_ENV === "production") {
    databaseName = process.env.NAME_DB
} else {
    databaseName = process.env.NAME_DB_TEST
}

function Consultador() {
    console.log("conectado a " + databaseName)
    const conn = mysql.createConnection({
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASS_DB,
        database: databaseName
    });

    setTimeout(() => {
        conn.destroy()
        console.log("desconectado de " + databaseName)
    }, 5000);

    return util.promisify(conn.query).bind(conn);
}


module.exports = Consultador