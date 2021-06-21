
/* main.js */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')
    const delay = 3000
	document.querySelector('aside').hidden = false
	window.setTimeout( () => {
	document.querySelector('aside').hidden = true
	}, delay)
})
var calculate = function (amount,years){
    var interest_value = 3 ;
    var monthlyRate = interest_value / 100 / 12;
    var monthly_payment = amount * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    return monthly_payment ; 
} ;
document.getElementById('calculatebutton').addEventListener('click' , function () {
    var amount = document.getElementById("calamount").value ;
    var years = document.getElementById("calyears").value ;
    var monthlyPayment = calculate(amount, years);
    console.log(monthlyPayment)
    document.getElementById("res").innerHTML = monthlyPayment.toFixed(3);
});