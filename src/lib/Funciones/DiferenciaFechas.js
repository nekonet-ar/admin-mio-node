function DiferenciaFechas(fechaIni) {
    const fecha = new Date(fechaIni)
    const hoy = new Date()
    const year1 = fecha.getFullYear()
    const month1 = fecha.getMonth() + 1
    const days1 = fecha.getDate()
    const year2 = hoy.getFullYear()
    const month2 = hoy.getMonth() + 1
    const days2 = hoy.getDate()

    const diasTotal1 = (year1 * 365) + (month1 * 30) + days1
    const diasTotal2 = (year2 * 365) + (month2 * 30) + days2

    return (diasTotal2 - diasTotal1)
}

module.exports = DiferenciaFechas