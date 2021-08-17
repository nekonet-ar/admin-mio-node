const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(process.env.GEN_SALT);

function VerificarPassHash(pass) {
    const hash = bcrypt.hashSync(pass, salt);
    return bcrypt.compareSync(pass, hash);
}

module.exports = VerificarPassHash