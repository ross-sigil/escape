'use strict';
$_$wp(1);
class coin {
    constructor(id, symbol, price, hourChange, dailyChange) {
        $_$wf(1);
        $_$w(1, 0), this.id = id;
        $_$w(1, 1), this.symbol = symbol;
        $_$w(1, 2), this.price = `$${ price }`;
        $_$w(1, 3), this.hourChange = `${ hourChange }%`;
        $_$w(1, 4), this.dailyChange = `${ dailyChange }%`;
    }
    coinDisplay() {
        $_$wf(1);
        return $_$w(1, 5), `ID: ${ this.id }\nSYMBOL: ${ this.symbol }\nPRICE: ${ this.price }\nHOUR CHANGE: ${ this.hourChange }\nDAILY CHANGE: ${ this.dailyChange }`;
    }
}
var bitcoin = ($_$w(1, 6), new coin('Bitcoin', 'BTC', 8100.14, -4.29, 0.2));
var litecoin = ($_$w(1, 7), new coin('Litecoin', 'LTC', 241, -59.2, 0.5));
$_$w(1, 8), $_$tracer.log(JSON.stringify(bitcoin).split(':'), 'JSON.stringify(bitcoin).split(\':\')', 1, 8);
let arr = ($_$w(1, 9), JSON.stringify(bitcoin).split(':').join(',').split(','));
$_$w(1, 10), $_$tracer.log(arr[1], 'arr[1]', 1, 10);
$_$wpe(1);