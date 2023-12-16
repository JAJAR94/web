let day = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
let month = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"]
let month_num = 1;
let month_space = [6,2,5,1,4,0,3,6,2,5,1,4]

function draw() {

    document.body.innerHTML = '';
    document.writeln("<table border=\"1\">"); 
    document.writeln("<tr>");
    document.writeln("<td> <button onclick=previous_month()><</button> </td>");
    document.writeln("<td colspan = \"5\">" + month[month_num - 1] + "2023</td>");
    document.writeln("<td> <button onclick=next_month()>></button> </td>");
    document.writeln("</tr>");


    document.writeln("<tr>");
    for (let i = 0; i < 7; i++) {
        document.writeln("<td>" + day[i] + "</td>");
    }
    document.writeln("</tr>");

    let date = 1;
    let space = 1;
    let rows = 5;
    if (month_space[month_num-1]>=5){ rows = 6; }

    for (let i = 0; i < rows; i++) {
        document.writeln("<tr>");

        for (let j = 0; j < 7; j++) {
            if (date == 0 || date > 31 || space <= month_space[month_num-1]) {
                document.writeln("<td></td>");
                space++;
                
            } else {
                document.writeln("<td>" + date + "</td>");
                date++;
            }
            
        }

        document.writeln("</tr>");
    }

    document.writeln("</table>");


}

function previous_month() {
    if (month_num == 1) {
        draw();
    } else {
        month_num -= 1;
        draw();
    }
    
}

function next_month() {
    if (month_num == 12) {
        draw();
    } else {
        month_num += 1;
        draw();
    }
    
}


window.onload = draw();