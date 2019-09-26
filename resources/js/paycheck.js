 /*
 NOTES:

    hoursWorked = week1 + week2;
   untaxedMoney = hoursWorked * payrate;
   contribution = (${num}--> percentage converted to a decimal)
   retire = contribution * untaxedMoney;
   untaxedMoney - retire = taxableIncome;

   taxes = .15 * taxableIncome;
   disability = .007 * taxableIncome;
   healthIns = 39.23;

   paycheck = taxableIncome - (healthIns + disability + taxes);

 */

/**************/
/* FIRST STEP*/
/************/
"use strict";

//declare all variables
var hours1, hours2, minutes1, minutes2, payRate, contribution;

// Hard numbers and percentages
const taxes = .15;
const disability = .007;

var breakdown = document.getElementById("breakdown");

function init(){
  breakdown.style.visibility = "hidden";
  document.getElementById("predictPay").innerHTML = "...";
}


function getPaid()
{
  breakdown.style.visibility = "visible";
  // Retrieve values from weeks 1 and 2 (hours1, hous2, minutes1, minutes2)
  hours1 = Number(document.getElementById("hours1").value);
  hours2 = Number(document.getElementById("hours2").value);

  minutes1 = Number(document.getElementById("minutes1").value);
  minutes2 = Number(document.getElementById("minutes2").value);

  //Retrieve payRate
  payRate = Number(document.getElementById("payRate").value);

  // Retrieve retirement contribution percentage and turn into decimal
  contribution = (Number(document.getElementById("contribution").value)) / 100;

 

  var healthIns = parseFloat(document.querySelector('input[name = "insurance"]:checked').value);

 //Add up all the hours into one number which will be rounded to 2 decimal places
  function hoursWorked() {
    let totalHours = hours1 + hours2;
    let totalMinutes = minutes1 + minutes2;

    return (totalHours + (totalMinutes/ 60));
  }

  var hoursWorked = (hoursWorked(hours1, hours2, minutes1, minutes2)).toFixed(2);

  // Play with all the pre-tax money
  function taxableIncome(){
    let untaxedMoney = (payRate * hoursWorked).toFixed(2);
    let retire = (untaxedMoney * contribution).toFixed(2);
    document.getElementById("retire").innerHTML  = ` $${retire} `;
    return untaxedMoney - retire;
  }

  // And then play with all the taxable money
  var taxableIncome = taxableIncome(payRate, hoursWorked, contribution);

  var hurtYerself = disability * taxableIncome;
  document.getElementById("disability").innerHTML  = ` $${hurtYerself.toFixed(2)} `;

  var uncleSam = taxes * taxableIncome;
  var paycheck = taxableIncome - (healthIns + hurtYerself + uncleSam); 

    document.getElementById("predictPay").innerHTML = ` $${paycheck.toFixed(2)} `;
    document.getElementById("hrsWorked").innerHTML = ` ${hoursWorked}`;
   
    document.getElementById("uncleSam").innerHTML = ` $${uncleSam.toFixed(2)} `;
}

init();
