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
    readFile('user/' + year + '.json', function(data) {
        for (var i = 0; i < dates.length; i++) {
            var num = '';
            if (i >= day && i < dayNum + day) {
                num = i - day + 1;
                if (data[month][i - day + 1]) {
                    var flag = document.createElement('p');
                    flag.innerHTML = '50min';
                    flag.className = 'flag';
                    dates[i].appendChild(flag);
                }
            }
            dates[i].getElementsByClassName('num')[0].innerHTML = num;
        }
    });

}

function readFile(name, cb) {
    fetch("src/common/data/" + name).then(function(response) {
        // Convert to JSON
        return response.json();
    }).then(function(result) {
        cb(result);
    });
}

setNowDate(new Date());
