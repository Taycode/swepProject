

var infoContainer = [];

function add(event)
{

    var courseCode = document.getElementById('courseCode').value;
    var courseUnit = document.getElementById('courseUnit').value;
    var grade = document.getElementById('grade').value;
    var gradeAlpha = '';

    if(courseCode === '' || courseUnit === '' || grade === '')
    {
        alert('You have to provide all information before clicking the "add" button');
    }else{
        if(grade > 100){
            alert("Max Score is 100");
        }else if(courseUnit > 9){
            alert("Your course unit cannot be more than 9");
        }else{
            if(grade >= 70){
                gradeAlpha = "A";
            }else if(grade >=60 && grade< 70){
                gradeAlpha = "B";
            }else if(grade >=50 && grade< 60){
                gradeAlpha = "C";
            }else if(grade >=45 && grade< 50){
                gradeAlpha = "D";
            }else if(grade >=40 && grade< 45){
                gradeAlpha = "E";
            }else{
                gradeAlpha = "F"
            }
            var info = {
                courseCode: courseCode,
                courseUnit: courseUnit,
                grade: grade,
                gradeAlpha: gradeAlpha
            };

            infoContainer.push(info);
            var listBody = document.getElementById("listBody");
            //create tr
            var bodyRow = document.createElement('tr');

            //create td's
            var firsTd = document.createElement('td');
            var secTd = document.createElement('td');
            var thrTd = document.createElement('td');

            //create td values
            var firsTdText = document.createTextNode(courseCode);
            var secTdText = document.createTextNode(courseUnit);
            var thrTdText = document.createTextNode(gradeAlpha);

            //append td values
            firsTd.appendChild(firsTdText);
            secTd.appendChild(secTdText);
            thrTd.appendChild(thrTdText);

            //append td's to tr
            bodyRow.appendChild(firsTd);
            bodyRow.appendChild(secTd);
            bodyRow.appendChild(thrTd);

            //append to listBody
            listBody.appendChild(bodyRow);


            document.getElementById("gpForm").reset();
        }

    }



}
function calculate()
{
    //Implement code to calculate GP
    var currentScore = 0;
    var totalUnit = 0;
    var totalGp = 0
    infoContainer.forEach(function(curr){

        switch (curr.gradeAlpha) {
            case "A":
                currentScore += 5 * curr.courseUnit;
                totalUnit += curr.courseUnit;
                break;
            case "B":
                currentScore += 4 * curr.courseUnit;
                totalUnit += curr.courseUnit;
                break;
            case "C":
                currentScore += 3 * curr.courseUnit;
                totalUnit += curr.courseUnit;
                break;
            case "D":
                currentScore += 2 * curr.courseUnit;
                totalUnit += curr.courseUnit;
                break;
            case "E":
                currentScore += 1 * curr.courseUnit;
                totalUnit += curr.courseUnit;
                break;
            default:
                currentScore += 0;
                totalUnit += curr.courseUnit;
        }


    });
    totalGp += currentScore/totalUnit;
    alert(totalGp);
}