import Vue from 'vue';
import Vuex from 'vuex';
import { coin } from './components/coinObject';

Vue.use(Vuex);

const myPlugin = (stor: any) => {
    stor.subscribe((mutation: any, state: any) => {
        localStorage.setItem('Store', JSON.stringify(state));
    });
};

export const store = new Vuex.Store({
    state: {
        // Slider Dependancies
        appBack: 'background:#EDC3C5',
        linkBack: 'background:#acbdba',
        tickerBack: 'background:#424242',
        defaultApp: 'background:#EDC3C5',
        defaultLink: 'background:#acbdba',
        defaultTicker: 'background:#424242',
        sliderPercent: 0,

        // Marquee Settings
        marqueeDuration: -9,
        isPaused: false,
        simpleMode: false,
        twentyFour: false,

        // Coin Objects Storage
        testCoins: [] as coin[],

        // Storage for links and names
        linkStuff: [] as string[][],

        // Raiser for bitcoin dialog
        coinMenu: false,
    },

    mutations: {
        appBack: (state, payload: string) => state.appBack = payload,

        linkBack: (state, payload: string) => state.linkBack = payload,

        tickerBack: (state, payload: string) => state.tickerBack = payload,

        menuSet: (state, payload: boolean) => state.coinMenu = payload,

        popCoin: (state, pc: coin) => {
            const index = state.testCoins.findIndex((x) => x === pc);
            if (index > -1) {
                state.testCoins.splice(index, 1);
            }
        },

        popLink: (state, arr: any) => {
            const index = state.linkStuff.findIndex((x) => x === arr);
            if (index > -1) {
                state.linkStuff.splice(index, 1);
            }
        },

        pushCoin: (state, newCoin: coin) => {
            state.testCoins.push(newCoin);
        },


        pushLink: (state, arr: any) => {
            if (!state.linkStuff) {
                state.linkStuff = [];
            }
            state.linkStuff.push(arr);
        },

        updateStats: (state, statCoin: coin) => {
            const index = state.testCoins.findIndex((x) => x.id === statCoin.id);
            state.testCoins[index].price = statCoin.price;
            state.testCoins[index].hourChange = statCoin.hourChange;
            state.testCoins[index].dailyChange = statCoin.dailyChange;
        },

        pauser: (state, inp: boolean) => state.isPaused = inp,

        durationSet: (state, fast: number) => state.marqueeDuration = fast,

        sliderSet: (state, per: number) => state.sliderPercent = per,

        simpleModeGetter: (state) => {
            return state.simpleMode;
        },

        simpleModeSetter: (state, payload: boolean) => {
            state.simpleMode = payload;
        },

        setTwentyFour: (state, payload: boolean) => {
            state.twentyFour = payload;
        },

        setState: (state, payload: any) => {
            state.simpleMode = payload.simpleMode;
            state.twentyFour = payload.twentyFour;
            state.marqueeDuration = payload.marqueeDuration;
            state.isPaused = payload.isPaused;
            state.sliderPercent = payload.sliderPercent;
            payload.testCoins.forEach( (element: coin) => {
                store.commit('pushCoin', element);
            });
            state.appBack = payload.appBack;
            state.tickerBack = payload.tickerBack;
            state.linkBack = payload.linkBack;
            payload.linkStuff.forEach( (element: any) => {
                store.commit('pushLink', element);
            });
        },

        // The way that this should be handled is
        setDefault: (state) => {
            state.simpleMode = false;
            state.twentyFour = false;
            state.marqueeDuration = -9;
            state.isPaused = false;
            state.sliderPercent = 0;
            state.tickerBack = state.defaultTicker;
            state.linkBack = state.defaultLink;
            state.appBack = state.defaultApp;
            state.testCoins.splice(0, state.testCoins.length);
            state.linkStuff.splice(0, state.linkStuff.length);
        },

    },
    plugins: [myPlugin],
});


