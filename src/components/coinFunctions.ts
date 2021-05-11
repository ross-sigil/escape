import {store} from '../store';
import {coin} from './coinObject';

export function dupeCheck(myCoin: coin) {
    if (!store.state.testCoins.some((item: any) => item.id === myCoin.id)) {
      store.commit('pushCoin', myCoin);
      interval();
      }
      }


export async function updateWrapper() {
    store.state.testCoins.forEach((element: coin) => {
        coinUpdate(element);
    });
}

export async function coinUpdate(myCoin: coin) {
    const CoinGecko = require('coingecko-api');
    const CoinGeckoClient = new CoinGecko();
    const coinDat = await CoinGeckoClient.coins.fetch(myCoin.id.toLowerCase().toString());
    const index = store.state.testCoins.findIndex((x: coin) => x.id === myCoin.id);

    const coinyBoi = new coin(
        coinDat.data.name,
        coinDat.data.id,
        coinDat.data.symbol.toUpperCase(),
        coinDat.data.market_data.current_price.usd,
        coinDat.data.market_data.price_change_percentage_1h_in_currency.usd,
        coinDat.data.market_data.price_change_percentage_24h,
    );

    store.commit('updateStats', coinyBoi);
}


export function interval() {
    let intr;
    switch (store.state.testCoins.length) {
        case 0: {
            clearInterval(intr);
            break;
        }
        case 1: {
            intr = setInterval(() => updateWrapper(), optimizeTime());
            break;
        }
        default: {
            clearInterval(intr);
            intr = setInterval(() => updateWrapper(), optimizeTime());
            break;
        }
    }
}

// update to return number
// We may want to drop to a max calls per minute to 90 to allow calls for update/translation without user noticing
export function optimizeTime(): number {
    let time = 1;
    let callsPerMinute = ((60 / time) * (store.state.testCoins.length));

    while (callsPerMinute > 90) {
        callsPerMinute = ((60 / time) * (store.state.testCoins.length));
        time++;
    }
    return (time * 1000);
}
