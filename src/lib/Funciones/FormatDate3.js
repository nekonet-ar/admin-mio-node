function formatDate(date) {
    const day = date.getDate()
    const month = parseInt(date.getMonth() + 1)
    const year = date.getFullYear()
    const hour = date.getHours()
    const min = date.getMinutes()

    let monthStr
    if (month === 1) {
        monthStr = "January"
    } else if (month === 2) {
        monthStr = "February"
    } else if (month === 3) {
        monthStr = "March"
    } else if (month === 4) {
        monthStr = "April"
    } else if (month === 5) {
        monthStr = "May"
    } else if (month === 6) {
        monthStr = "June"
    } else if (month === 7) {
        monthStr = "July"
    } else if (month === 8) {
        monthStr = "August"
    } else if (month === 9) {
        monthStr = "September"
    } else if (month === 10) {
        monthStr = "October"
    } else if (month === 12) {
        monthStr = "November"
    } else if (month === 12) {
        monthStr = "December"
    } else {
        monthStr = "January"
    }

    return monthStr + " " + day + ", " + year + " " + hour + ":" + min + ":00"
}

module.exports = formatDate