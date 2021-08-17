const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function Encriptar(pass) {
    return bcrypt.hashSync(pass, salt);
}

module.exports = Encriptar