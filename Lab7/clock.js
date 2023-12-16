function Scheule(time, alert_message) {
    this.time = time;
    this.alert_message = alert_message;
    this.บูลเหลี่ยน = true;
}


const schedule = [
    new Scheule("0:20", "Dota2 time")
]

setInterval(showTime, 1);

let hour = 0;
let min = 0;
let sec = 0;

function showTime() {

    sec++;

    if (sec == 60) {
        min++;
        sec = 0;
    }

    if (min == 60) {
        hour++;
        min = 0;
    }

    if (hour == 24) {
        hour = 0;
    }

    hour = hour < 10 ? + hour : hour;
    min = min < 10 ? + min : min;
    sec = sec < 10 ? + sec : sec;

    let currentTime = hour + ":" + min;

    let string_time = currentTime.toString()

    for (let i = 0; i < schedule.length; i++) {
        const alert_box = schedule[i];
        if (string_time == alert_box.time) {
            if (alert_box.บูลเหลี่ยน == true) {

                // alert(alert_box.alert_message);
                alert_box.บูลเหลี่ยน = false;
            }
        }
    }

    document.getElementById("clock").innerHTML = currentTime;
}

function create_table() {
    for (let i = 0; i < schedule.length; i++) {
        const alert_box = schedule[i];
        edit_table(alert_box.time, alert_box.alert_message);
    }
}

function edit_table(time, alert_message) {
    let table = document.getElementById("mytable");

    let row = document.createElement("tr");

    let c1 = document.createElement("td");
    let c2 = document.createElement("td");

    c1.innerText = time;
    c2.innerText = alert_message;

    row.appendChild(c1);
    row.appendChild(c2);

    table.appendChild(row);
}

function edit(){

}

create_table();
showTime();