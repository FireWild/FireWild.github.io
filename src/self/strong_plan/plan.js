var AT = {};
var yearInput = document.getElementsByClassName('year')[0];
var monthInput = document.getElementsByClassName('month')[0];
var dayNode = document.getElementsByClassName('day')[0]
var dates = document.getElementsByClassName('date');
var search = document.getElementsByClassName('search')[0];

function replaceClass(old, now, node) {
    var nodeReplace = document.getElementsByClassName(node)[0];
    nodeReplace.className = nodeReplace.className.replace(old, now);
}

function addClassForNode(name, node) {
    var nodeAdd = document.getElementsByClassName(node)[0];
    nodeAdd.className += ' ' + name;
}

function removeClassForNode(name, node) {
    replaceClass(name, '', node);
}

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
        if (dates.length < dayNum + day) {
            for (var i = 0; i < 7; i++) {
                var newNode = dates[0].cloneNode(true);
                dayNode.appendChild(newNode);
            }
        } else if (dates.length > 35) {
            for (var i = 0; i < 7; i++) {
                dayNode.removeChild(dates[dates.length - 1]);
            }
        }

        for (var i = 0; i < dates.length; i++) {
            var num = '';
            if (i >= day && i < dayNum + day) {
                num = i - day + 1;

                var flag = dates[i].getElementsByClassName('flag')[0] || document.createElement('p');

                if (data[month] && data[month][i - day + 1] && data[month][i - day + 1]['time']) {
                    flag.innerHTML = data[month][i - day + 1]['time'];
                    flag.className = 'flag';
                    dates[i].appendChild(flag);
                } else {
                    flag.innerHTML = '';
                }
            }
            dates[i].getElementsByClassName('num')[0].innerHTML = num;
        }
    });

}

function readFile(name, cb) {
    var host = location.host;
    fetch(host + "/src/common/data/" + name).then(function(response) {
        // Convert to JSON
        return response.json();
    }).then(function(result) {
        cb(result);
    }).catch(function(eror) {
        cb({});
    });
}

setNowDate(new Date());

//添加事件
search.addEventListener('click', function() {
    var year = yearInput.value;
    var month = monthInput.value;

    if (!year || year < 1970) {
        swal("oh no!", "input right year", "error");
        return;
    }

    if (!month || month < 1 || month > 12) {
        swal("oh no!", "input right month", "error");
        return;
    }
    addClassForNode('animated slideOutLeft', 'day');
    setTimeout(function() {
        setNowDate(new Date(year, month - 1, 1));
        removeClassForNode('animated slideOutLeft', 'day');
        addClassForNode('animated slideInRight', 'day');
    }, 1100);
    setTimeout(function() {
        removeClassForNode('animated slideInRight', 'day');
    }, 2200);
}, !1);
