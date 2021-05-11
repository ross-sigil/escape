//let totalCallsPerMinute = ((60/updateTimes)*numOfCoins);
//console.log(totalCallsPerMinute)


let coins = ['chainlink', 'req', 'btc', 'litecoin', 'coinye', 'antshares']


console.log("test");
//We need to find the most time one can get per coins and update based on that.
function updateInsurance(coins :number):number{
    var time = 1;
    let callsPerMinute = ((60/time)*coins);
    console.log(callsPerMinute);

    while(callsPerMinute > 100){
    callsPerMinute = ((60/time)*coins);
    time++;
    }
    console.log(callsPerMinute);
    return (time*1000);
}




console.log(updateInsurance(coins.length));