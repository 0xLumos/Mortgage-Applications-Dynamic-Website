
/* main.js */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')
    const delay = 3000
	document.querySelector('aside').hidden = false
	window.setTimeout( () => {
	document.querySelector('aside').hidden = true
	}, delay)
})
var calculate = function (amount,years,deposit){
    var depositprcnt = (deposit / amount) * 100
    console.log(depositprcnt)
    if ( depositprcnt >= 5 && depositprcnt <= 9 ){
        var interest_rate = 6 
    }
    else if (depositprcnt >= 10 && depositprcnt <= 20){
        interest_rate = 4 
    }
    else if (depositprcnt >= 21 && depositprcnt <= 30){
        interest_rate = 3 
    } 
    else {
        interest_rate = 2.3 
    } 
    var monthlyRate = interest_rate / 100 / 12;
    var monthly_payment = amount * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    return monthly_payment ; 
} ;
document.getElementById('calculatebutton').addEventListener('click' , function () {
    var amount = document.getElementById("calamount").value ;
    var deposit = document.getElementById("caldeposit").value ;
    var years = document.getElementById("calyears").value ;
    var monthlyPayment = calculate(amount, years,deposit);
    document.getElementById("res").innerHTML = monthlyPayment.toFixed(3);
});