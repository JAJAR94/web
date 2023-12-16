function convert_toJSON() {
    let table = document.getElementById("originalTable");
    var data = {};

    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
    }
    data["Header"] = headers;

    var row = [];
    for (var i = 1; i < table.rows.length - 1; i++) {

        var tableRow = table.rows[i];
        var rowData = {};

        for (var j = 0; j < tableRow.cells.length; j++) {
            var colnum = j + 1;
            rowData['col' + colnum] = tableRow.cells[j].innerHTML;

        }

        row.push(rowData);
    }

    data["Body"] = row;

    var footerRow = table.rows[table.rows.length - 1];
    var footer = [];
    for (var i = 0; i < footerRow.cells.length; i++) {
        var footdata = {};
        footdata['value'] = footerRow.cells[i].innerHTML;
        footdata['span'] = footerRow.cells[i].colSpan;
        footer.push(footdata);
    }
    data['Footer'] = footer;


    display = document.getElementById("displayTextarea");
    display.innerHTML = (JSON.stringify(data));
}

function convert() {

    var jsonDataText = document.getElementById('displayTextarea').value;
    var jsonData = JSON.parse(jsonDataText);

    var table = document.getElementById('newTable');
    table.innerHTML = '';

    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    jsonData.Header.forEach(function (headerText) {
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    jsonData.Body.forEach(function (rowData) {
        var row = document.createElement('tr');
        for (var key in rowData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(rowData[key]));
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    var tfoot = document.createElement('tfoot');
    var row = document.createElement('tr');
    jsonData.Footer.forEach(function (footerData) {
  
        var cell = document.createElement('td');
        cell.setAttribute('colspan', footerData.span);
        cell.appendChild(document.createTextNode(footerData.value));
        row.appendChild(cell);
        tfoot.appendChild(row);
    });
    
    table.appendChild(tfoot);

}




