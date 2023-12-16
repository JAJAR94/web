function draw() {
    document.writeln("<table>");
    document.writeln("<tr>");
    document.writeln("<td colspan = \"7\">August 2023</td>");
    document.writeln("</tr>");

    let day = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    document.writeln("<tr>");
    for (let i = 0; i < 7; i++) {
        document.writeln("<td>" + day[i] + "</td>");
    }
    document.writeln("</tr>");

    let date = 0;
    for (let i = 0; i < 5; i++) {
        document.writeln("<tr>");

        for (let j = 0; j < 7; j++) {
            if (date == 0 || date > 31) {
                document.writeln("<td></td>");
            } else {
                document.writeln("<td>" + date + "</td>");
            }
            date++;
        }

        document.writeln("</tr>");
    }

    document.writeln("</table>");

    // Highlight row 2 (index 1)
    const rows = document.querySelectorAll("table tr");
    rows[1].style.backgroundColor = "yellow"; // Highlight row 2
}
window.onload = draw();