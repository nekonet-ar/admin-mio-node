function formatDate(date) {
    const day = date.getDate()
    const month = parseInt(date.getMonth() + 1)
    const year = date.getFullYear()
    let monthStr
    if (month === 1) {
        monthStr = "Enero"
    } else if (month === 2) {
        monthStr = "Febrero"
    } else if (month === 3) {
        monthStr = "Marzo"
    } else if (month === 4) {
        monthStr = "Abril"
    } else if (month === 5) {
        monthStr = "Mayo"
    } else if (month === 6) {
        monthStr = "junio"
    } else if (month === 7) {
        monthStr = "Julio"
    } else if (month === 8) {
        monthStr = "Agosto"
    } else if (month === 9) {
        monthStr = "Septiembre"
    } else if (month === 10) {
        monthStr = "Octubre"
    } else if (month === 12) {
        monthStr = "Noviembre"
    } else if (month === 12) {
        monthStr = "Diciembre"
    } else {
        monthStr = "Enero"
    }

    return day + " de " + monthStr + ", " + year
}

module.exports = formatDate