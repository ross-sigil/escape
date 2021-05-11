class coin{
    id:string;
    symbol:string;
    price:string;
    hourChange:string;
    dailyChange:string;

    constructor(id:string, symbol:string, price:number, hourChange:number, dailyChange:number){
        this.id = id;
        this.symbol = symbol;
        this.price = `$${price}`;
        this.hourChange = `${hourChange}%`;
        this.dailyChange = `${dailyChange}%`;
    }


    coinDisplay(){
        return `ID: ${this.id}\nSYMBOL: ${this.symbol}\nPRICE: ${this.price}\nHOUR CHANGE: ${this.hourChange}\nDAILY CHANGE: ${this.dailyChange}`;
    }

}

var bitcoin = new coin('Bitcoin', 'BTC', 8100.14, -4.29, 0.20);
var litecoin = new coin('Litecoin', 'LTC', 241.00, -59.2, 0.50);
//console.log(bitcoin.coinDisplay());
//console.log(litecoin.coinDisplay());
//console.log(bitcoin.id)

console.log(JSON.stringify(bitcoin).split(":"));

//https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
let arr = JSON.stringify(bitcoin).split(":").join(",").split(",");
console.log(arr[1]);
//ahahah