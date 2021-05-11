<template>
  <v-layout row justify-center>
    <v-dialog v-model="$store.state.coinMenu" persistent max-width="600px">
      <v-form ref="form" @submit.prevent v-model="valid">
        <v-card dark>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    :label="headerNamer(textCode)"
                    color="#EDC3C5"
                    @click="resetMessage"
                    v-model="inputMessage"
                    :rules="inputRules"
                    required
                    v-on:keyup.enter="multiAct"
                    v-on:keyup.esc="closeClear"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>Enter a coin name or symbol (ie: Bitcoin, BTC)</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#EDC3C5" flat @click="multiAct" :disabled="!valid" required>Add Coin</v-btn>
            <v-btn color="#EDC3C5" flat @click="listDialogFlip" :disabled="listDisable()" >List Coins</v-btn>
            <v-btn color="#EDC3C5" flat @click="optionsDialogFlip">Options</v-btn>
            <v-btn color="#EDC3C5" flat @click="closeClear">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="listDialog" persistent max-width="600px">
      <v-card dark>
        <v-container>
          <v-list>
            <template v-for="(item) in $store.state.testCoins">
              <v-list-tile :key="item.id" ripple @click="coinDelete(item)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ `${item.name} | ${item.symbol}` }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-container>
        <v-container grid-list-md>
          <v-card-actions>
            <small>Click Coin to Delete</small>
            <v-spacer></v-spacer>
            <v-btn color="#EDC3C5" flat @click="addFlip">Add Coin</v-btn>
            <v-btn color="#EDC3C5" flat @click="optionsDialogFlip">Options</v-btn>
            <v-btn color="#EDC3C5" flat @click="listDialog = false">Close</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="optionsDialog" persistent max-height="400px" max-width="600px">
      <v-card dark>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch v-model="simpleReturn" color="#EDC3C5"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Simple Mode</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-switch v-model="twentyFourReturn" color="#EDC3C5"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>24 Hour Mode</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <v-flex shrink style="width: 90%">
              <v-slider
                label="Ticker Speed"
                color="#c1b492"
                v-model="marqueeReturn"
                :max="-1"
                :min="-15"
                :step="1"
              ></v-slider>
            </v-flex>
          </v-list-tile>

          <v-list-tile>
            <v-icon v-if="!isPaused" @click="pause" color="#c1b492" v-ripple>mdi-pause</v-icon>
            <v-icon v-if="isPaused" @click="unpause" color="#c1b492" v-ripple>mdi-play</v-icon>
            <v-icon @click="defaultSwap" color="#c1b492" v-ripple>mdi-nuke</v-icon>
          </v-list-tile>
        </v-list>

    <v-dialog v-model="defaultDialog" persistent max-width="600px">
      <v-card dark>
        <v-container grid-list-md>
          <v-layout justify-center>
          <v-card-actions>
            Reset all values to Default?
            <v-spacer></v-spacer>
            <v-btn color="#EDC3C5" flat @click="defaulter">Yes</v-btn>
            <v-btn color="#EDC3C5" flat @click="closeClear">No</v-btn>
          </v-card-actions>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#EDC3C5" flat @click="addFlip">Add Coin</v-btn>
          <v-btn color="#EDC3C5" flat :disabled="listDisable()" @click="listDialogFlip">List Coins</v-btn>
          <v-btn color="#EDC3C5" flat @click="closeClear">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import { coin } from './coinObject';
export default Vue.extend({
  data: () => ({
    // Valid is for TextField Rules
    valid: true,

    // Handler for Error Messages
    textCode: 0,

    listDialog: false,
    optionsDialog: false,
    defaultDialog: false,
    inputMessage: '',
    isPaused: false,

    durationHolder: -8,

    inputRules: [
      (v: any) =>
        (v && v.length >= 3) || 'Name must be greater than 3 characters',
    ],
  }),

  computed: {
    simpleReturn: {
      set(inp: boolean) {
        this.$store.commit('simpleModeSetter', inp);
      },
      get(): boolean {
        return this.$store.state.simpleMode;
      },
    },

    marqueeReturn: {
      set(inp: number) {
        this.$store.commit('durationSet', inp);
      },
      get(): number {
        return this.$store.state.marqueeDuration;
      },
    },

    twentyFourReturn: {
      set(inp: boolean) {
        this.$store.commit('setTwentyFour', inp);
      },
      get(): boolean {
        return this.$store.state.twentyFour;
      },
    },
  },

  methods: {
    // Asynchronously Check API for given coin
    coinSearch: async function(myCoin: any) {
      const CoinGecko = require('coingecko-api');
      const CoinGeckoClient = new CoinGecko();
      const coinDat = await CoinGeckoClient.coins.fetch(myCoin.toLowerCase());
      if (coinDat.success === false) {
        this.coinVert(myCoin);
        this.inputMessage = '';
        this.resetValidation();
      } else {
        const coinyBoi = this.coinMint(coinDat);
        this.dupeCheck(coinyBoi);
      }
    },

    coinVert: async function(mySymbol: string) {
      mySymbol = mySymbol.toLowerCase();
      const CoinGecko = require('coingecko-api');
      const CoinGeckoClient = new CoinGecko();
      const coinDat = await CoinGeckoClient.coins.list();

      if (!coinDat.data.find((x: any) => x.symbol === mySymbol)) {
        this.textCode = 1;
      } else {
        const thing = coinDat.data.find((x: any) => x.symbol === mySymbol);
        this.coinSearch(thing.id);
      }
      this.inputMessage = '';
    },

    // only coinDat should be passed in
    coinMint(coinData: any): coin {
      const coinyBoi = new coin(
        coinData.data.name,
        coinData.data.id,
        coinData.data.symbol.toUpperCase(),
        coinData.data.market_data.current_price.usd,
        coinData.data.market_data.price_change_percentage_1h_in_currency.usd,
        coinData.data.market_data.price_change_percentage_24h,
      );
      return coinyBoi;
    },

    // Final test before putting a coin into store.
    dupeCheck(myCoin: coin) {
      if (
        !this.$store.state.testCoins.some((item: any) => item.id === myCoin.id)
      ) {
        this.$store.commit('pushCoin', myCoin);
        this.interval();
      } else {
        this.textCode = 2;
      }
      this.inputMessage = '';
      this.resetValidation();
    },

    updateWrapper: async function() {
      this.$store.state.testCoins.forEach((element: coin) => {
        this.coinUpdate(element);
      });
    },

    coinUpdate: async function(myCoin: coin) {
      const CoinGecko = require('coingecko-api');
      const CoinGeckoClient = new CoinGecko();
      const coinDat = await CoinGeckoClient.coins.fetch(
        myCoin.id.toLowerCase().toString(),
      );
      const index = this.$store.state.testCoins.findIndex(
        (x: coin) => x.id === myCoin.id,
      );

      const coinyBoi = new coin(
        coinDat.data.name,
        coinDat.data.id,
        coinDat.data.symbol.toUpperCase(),
        coinDat.data.market_data.current_price.usd,
        coinDat.data.market_data.price_change_percentage_1h_in_currency.usd,
        coinDat.data.market_data.price_change_percentage_24h,
      );

      this.$store.commit('updateStats', coinyBoi);
    },

    // Note the as any, little hack to get around the TS BS
    resetValidation() {
      (this.$refs.form as any).resetValidation();
    },

    resetMessage() {
      this.textCode = 0;
    },

    closeClear() {
      this.resetMessage();
      this.$store.commit('menuSet', false);
      this.listDialog = false;
      this.optionsDialog = false;
      this.defaultDialog = false;
      this.inputMessage = '';
      this.resetValidation();
    },

    multiAct() {
      this.coinSearch(this.inputMessage);
      this.resetValidation();
    },

    listDialogFlip() {
      this.resetMessage();
      this.$store.commit('menuSet', false);
      this.listDialog = true;
      this.optionsDialog = false;
      this.resetValidation();
    },

    optionsDialogFlip() {
      this.resetMessage();
      this.inputMessage = '';
      this.resetValidation();
      this.$store.commit('menuSet', false);
      this.listDialog = false;
      this.optionsDialog = true;
    },

    addFlip() {
      this.resetMessage();
      this.inputMessage = '';
      this.resetValidation();
      this.$store.commit('menuSet', true);
      this.listDialog = false;
      this.optionsDialog = false;
    },

    interval() {
      let intr;
      switch (this.$store.state.testCoins.length) {
        case 0: {
          clearInterval(intr);
          break;
        }
        case 1: {
          intr = setInterval(() => this.updateWrapper(), this.optimizeTime());
          break;
        }
        default: {
          clearInterval(intr);
          intr = setInterval(() => this.updateWrapper(), this.optimizeTime());
          break;
        }
      }
    },

    // Calculates an update time for setInterval that doesn't break API rate limiting rules.
    optimizeTime(): number {
      let time = 1;
      let callsPerMinute = (60 / time) * this.$store.state.testCoins.length;

      while (callsPerMinute > 90) {
        callsPerMinute = (60 / time) * this.$store.state.testCoins.length;
        time++;
      }
      return time * 1000;
    },
    
    headerNamer(textCode: number): string {
      const msg = ['Coin Name', 'Invalid Coin', 'Duplicate Coin'];
      return msg[textCode];
    },

    coinDelete(item: string) {
      this.$store.commit('popCoin', item);
      this.interval();
    },

    pause() {
      this.isPaused = true;
      this.$store.commit('pauser', true);
    },

    unpause() {
      this.isPaused = false;
      this.$store.commit('pauser', false);
    },

    listDisable(): boolean {
      if (this.$store.state.testCoins.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    hideButton() {
      this.pause();
      this.isPaused = false;
    },

    durationSet() {
      this.$store.commit('durationSet', Math.abs(this.durationHolder));
    },

    defaulter() {
      this.$store.commit('setDefault');
      this.closeClear();
    },
    
    defaultSwap() {
      this.closeClear();
      this.defaultDialog = true;
    },
  },
});
</script>