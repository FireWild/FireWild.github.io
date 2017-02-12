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
    var data = readFile('user/' + year + '.json');
    for (var i = day; i < dayNum + day; i++) {
        dates[i].getElementsByClassName('num')[0].innerHTML = i - day + 1;
        if (data[month][i]) {
            var flag = document.createElement('p');
            flag.innerHTML = '50min';
            flag.className = 'flag';
            dates[i].appendChild(flag);
        }
    }
}

function readFile(name) {
    var data;
    fetch("src/common/data/" + name).then(function(response) {
        // Convert to JSON
        return response.json();
    }).then(function(result) {
        data = result;
    });
    return data;
}

setNowDate(new Date());
