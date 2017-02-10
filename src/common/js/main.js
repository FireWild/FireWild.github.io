var AT = {};

var yearInput = document.getElementsByClassName('year')[0];
var monthInput = document.getElementsByClassName('month')[0];
var dates = document.getElementsByClassName('date')

function setNowDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    yearInput.value = year;
    monthInput.value = month;
    date.setDate(1);
    var day = date.getDay();

    setNowDay(year, month, day);
}

function getMonthDayNum(year, month) {
    var date = new Date(year, month, 0);
    return date.getDate();
}

function setNowDay(year, month, day) {
    var dayNum = getMonthDayNum(year, month);
    for (var i = day; i < dayNum + day; i++) {
        dates[i].getElementsByClassName('num')[0].innerHTML = i - day + 1;
    }
}

setNowDate();
