var AT = {};

var yearInput = document.getElementsByClassName('year')[0];
var monthInput = document.getElementsByClassName('month')[0];
var dates = document.getElementsByClassName('date')

function setNowDate(date) {
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

function readFile(name) {
    fetch("src/common/data/user/2017.json").then(function(response) { 
	    // Convert to JSON
	    return response.json();
    }).then(function(result) {
	    console.log(result); 
    });
}

readFile();
setNowDate(new Date());
