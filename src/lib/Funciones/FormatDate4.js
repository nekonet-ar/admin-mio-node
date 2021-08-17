async function formatDate4(d) {
    //get the month
    var month = d.getMonth();
    //get the day
    //convert day to string
    var day = d.getDate().toString();
    //get the year
    var year = d.getFullYear();

    //pull the last two digits of the year
    year = year.toString();

    //increment month by 1 since it is 0 indexed
    //converts month to a string
    month = (month + 1).toString();

    //if month is 1-9 pad right with a 0 for two digits
    if (parseInt(month.length) === 1) {
        month = "0" + month;
    }

    //if day is between 1-9 pad right with a 0 for two digits
    if (parseInt(day.length) === 1) {
        day = "0" + day;
    }

    //return the string "MMddyy"
    return year + "-" + month + "-" + day;
}

module.exports = formatDate4
