const VerifyAffected = (result) => {
    let cantRes
    try {
        cantRes = parseInt(result.affectedRows)
    } catch (error) {
        cantRes = 0
    }
    if (cantRes > 0) {
        return true
    } else {
        return false
    }
}

module.exports = VerifyAffected