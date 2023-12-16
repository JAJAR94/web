
function calculatePoints(grade) {

    switch (grade) {
        case "A":
            return 4.0;
        case "B":
            return 3.0;
        case "C":
            return 2.0;
        case "D":
            return 1.0;
        default:
            return 0.0;
    }
}


function calculateGPS(semesterData) {
    var totalPoints = 0;
    var totalCredits = 0;

    for (var i = 0; i < semesterData.length; i++) {
        var course = semesterData[i];
        var points = calculatePoints(course.grade);
        totalPoints += points * parseInt(course.credit, 10); 
        totalCredits += parseInt(course.credit, 10);
    }

    if (totalCredits === 0) {
        return 0;
    }

    return (totalPoints / totalCredits).toFixed(2); 
}

function findAverage(arr) {
    if (arr.length === 0) {
        return 0; 
    }

    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    var average = sum / arr.length;
    return average;
}


function populateTable() {
    var upload = document.getElementById('fileInput');

    if (upload) {
        upload.addEventListener('change', function () {
            if (upload.files.length > 0) {
                var reader = new FileReader();

                reader.addEventListener('load', function () {
                    jsonData = JSON.parse(reader.result); 

                  
                    document.getElementById("student_name").value = jsonData.student_name;
                    document.getElementById("date_of_birth").value = jsonData.date_of_birth;
                    document.getElementById("student_id").value = jsonData.student_id;
                    document.getElementById("date_of_admission").value = jsonData.date_of_admission;
                    document.getElementById("date_of_graduation").value = jsonData.date_of_graduation;
                    document.getElementById("degree").value = jsonData.degree;
                    document.getElementById("major").value = jsonData.major;

                
                    var tableBody = document.getElementById("content_body");
                    tableBody.innerHTML = ""; 
                    var gps_array = [];

                    for (var year in jsonData.credit) {
                        for (var semester in jsonData.credit[year]) {
                            var semesterData = jsonData.credit[year][semester];

                          
                            var semesterYearRow = tableBody.insertRow(tableBody.rows.length);
                            semesterYearRow.classList.add("centered-row"); 
                            semesterYearRow.insertCell(0).innerHTML = semester + " " + year;

                           
                            var gps = calculateGPS(semesterData);
                            gps_array.push(gps);

                            
                            for (var i = 0; i < semesterData.length; i++) {
                                var course = semesterData[i];
                                var courseRow = tableBody.insertRow(tableBody.rows.length);
                                courseRow.insertCell(0).innerHTML = course.subject_id + " " + course.name;
                                courseRow.insertCell(1).innerHTML = course.credit;
                                courseRow.insertCell(2).innerHTML = course.grade;
                            }

                            var gpaRow = tableBody.insertRow(tableBody.rows.length);
                            gpaRow.classList.add("centered-row"); 
                            gpaRow.insertCell(0).innerHTML = "GPS: " + gps + " GPA: " + findAverage(gps_array);
                        }
                    }
                });

                reader.readAsText(upload.files[0]);
            }
        });
    }
}

window.onload = populateTable;