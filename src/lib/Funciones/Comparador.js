const bcrypt = require('bcryptjs');

function Comparar(pass, hash) {
    return bcrypt.compareSync(pass, hash)
}

module.exports = Comparar
