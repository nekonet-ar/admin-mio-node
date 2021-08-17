function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yyyy: date.getFullYear(),
        hor: date.getHours(),
        min: date.getMinutes(),
        seg: date.getSeconds()
    }

    return format.replace(/mm|dd|yyyy|hor|min|seg/gi, matched => map[matched])
}

module.exports = formatDate