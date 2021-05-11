export class coin {
    name: string;
    id: string;
    symbol: string;
    price: string;
    hourChange: string;
    dailyChange: string;


    constructor(name: string, id: string, symbol: string, price: number, hourChange: number, dailyChange: number) {
        this.name = name;
        this.id = id;
        this.symbol = symbol;
        if (price < 1) {
            this.price = `$${price.toFixed(4)}`;
        } else {
            this.price = `$${price.toFixed(2)}`;
        }
        this.hourChange = `${hourChange.toFixed(2)}%`;
        this.dailyChange = `${dailyChange.toFixed(2)}%`;
    }


    public coinDisplay() {
        return `\nID: ${this.id}\nSYMBOL: ${this.symbol}\nPRICE: ${this.price}\nHOUR CHANGE: ${this.hourChange}\nDAILY CHANGE: ${this.dailyChange}`;
    }
}
