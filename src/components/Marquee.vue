<!--
https://evodiaaut.github.io/vue-marquee-text-component/?ref=madewithvuejs.com

https://afeld.github.io/emoji-css/ 

<link href='https://afeld.github.io/emoji-css/emoji.css' rel='stylesheet'>
<i class='em em-some-emoji'></i>
-->

<template>
<div id="beegee" v-bind:style='{ display : tickHider(), "background-color" : tickerBack()}'>
  <marquee-text
    :repeat='17'
    :duration='Math.abs(this.$store.state.marqueeDuration)'
    :paused='this.$store.state.isPaused'
  >
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
    <body>
      <ul>
        <li v-for='(theStuff) in this.$store.state.testCoins' :key='theStuff'>
          <span
            v-bind:class='{priceUp:upBool(theStuff), priceDown:downBool(theStuff),
    priceNeutral:neutBool(theStuff)}'
          >
            <span v-bind:style='{ display : showEmoji(theStuff)}'>
              <i
                style="margin-right:3px;margin-left:2px;position:relative"
                v-bind:class='randomEmoji(theStuff)'
              ></i>
            </span>
            {{numParser(theStuff)}}
          </span>
          {{textParser(theStuff)}}
        </li>
      </ul>
    </body>
  </marquee-text>
</div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { coin } from './coinObject';

export default Vue.extend({
  data: {
    tickHider: 'none',
  },

  computed: {
    simpleReturn(): boolean {
      return this.$store.state.simpleMode;
    },

    twentyFourReturn(): boolean {
      return this.$store.state.twentyFour;
    },
  },

  methods: {
    // rewrite this with defernce to a 24 hour mode as well

    numParser(coinGuy: coin): string {
      if (this.simpleReturn === false && this.twentyFourReturn === false) {
        return `${coinGuy.hourChange} | ${coinGuy.price}`;
      }
      if (this.simpleReturn === true && this.twentyFourReturn === false) {
        return `${coinGuy.hourChange}`;
      }
      if (this.simpleReturn === false && this.twentyFourReturn === true) {
        return `${coinGuy.dailyChange} | ${coinGuy.price}`;
      } else {
        return `${coinGuy.dailyChange}`;
      }
    },

    textParser(coinGuy: coin): string {
      return `${coinGuy.symbol}`;
    },

    tickHider(): string {
      if (this.$store.state.testCoins.length === 0) {
        return 'none';
      } else {
        return 'inline';
      }
    },

    // all of these will have to be changed to reflect twentyFour mode
    upBool(coinGuy: coin): boolean {
      if (this.twentyFourReturn === false) {
        if (coinGuy.hourChange.charAt(0) === '-') {
          return false;
        } else {
          return true;
        }
      } else {
        if (coinGuy.dailyChange.charAt(0) === '-') {
          return false;
        } else {
          return true;
        }
      }
    },

    downBool(coinGuy: coin): boolean {
      if (this.twentyFourReturn === false) {
        if (coinGuy.hourChange.charAt(0) === '-') {
          return true;
        } else {
          return false;
        }
      } else {
        if (coinGuy.dailyChange.charAt(0) === '-') {
          return true;
        } else {
          return false;
        }
      }
    },

    neutBool(coinGuy: coin): boolean {
      if (this.twentyFourReturn === false) {
        if (coinGuy.hourChange === '0.00%' || coinGuy.hourChange === '-0.00%') {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          coinGuy.dailyChange === '0.00%' ||
          coinGuy.dailyChange === '-0.00%'
        ) {
          return true;
        } else {
          return false;
        }
      }
    },

    tickerBack() {
      return this.$store.state.tickerBack.split(':')[1];
    },

    numStrip(coinGuy: coin): number {
      let num = 0;
      if (this.twentyFourReturn === false) {
        num = Number(
          coinGuy.hourChange.substring(0, coinGuy.hourChange.length - 1),
        );
      } else {
        num = Number(
          coinGuy.dailyChange.substring(0, coinGuy.dailyChange.length - 1),
        );
      }
      return num;
    },

    // Shows Emoji if past designated 1h/24h threshhold
    showEmoji(coinGuy: coin): string {
      if (this.twentyFourReturn === false) {
        if (this.numStrip(coinGuy) >= 5 || this.numStrip(coinGuy) <= -5) {
          return 'inline';
        } else {
          return 'none';
        }
      } else {
        if (this.numStrip(coinGuy) >= 20 || this.numStrip(coinGuy) <= -20) {
          return 'inline';
        } else {
          return 'none';
        }
      }
    },

    randomEmoji(coinGuy: coin): string {
      const positive = [
        'em-full_moon',
        'em-gem',
        'em-fire',
        'em-heart_eyes',
        'em-peach',
        'em-sweat_drops',
        'em-airplane',
        'em-checkered_flag',
        'em-trophy',
        'em-whale2',
        'em---1',
        'em-bar_chart',
        'em-alien',
        'em-candy',
        'em-cut_of_meat',
        'em-eagle',
        'em-eyes',
        'em-hibiscus',
        'em-hot_pepper',
        'em-moneybag',
        'em-zap',
        'em-whale2',
      ];

      const negative = [
        'em-dagger_knife',
        'em-confounded',
        'em-peanuts',
        'em-boom',
        'em-clown_face',
        'em-cold_sweat',
        'em-dizzy_face',
        'em-hear_no_evil',
        'em-hocho',
        'em-no_good',
        'em-scream_cat',
        'em-speak_no_evil',
        'em-triumph',
        'em-weary',
        'em-waving_white_flag',
        'em--1',
        'em-ambulance',
        'em-bear',
        'em-coffin',
        'em-derelict_house_building',
        'em-hankey',
        'em-put_litter_in_its_place',
        'em-tent',
      ];

      if (this.numStrip(coinGuy) > 0.5) {
        return 'em ' + positive[Math.floor(Math.random() * positive.length)];
      }
      if (this.numStrip(coinGuy) < -0.5) {
        return 'em ' + negative[Math.floor(Math.random() * negative.length)];
      } else {
        return 'em em-gem';
      }
    },
  },
});
</script>


<style>
li {
  margin-right: 10px;
  display: inline;
}

#beegee {
  display: inline;
  width: 100%;
  background-color: #424242;
  padding: 10px;
}

.emoji {
  display: none;
}

.priceUp {
  display: inline;
  position: relative;
  border-radius: 30%;
  background-color: #4caf50;
  padding: 7px;
  margin-right: 4px;
}

.priceDown {
  display: inline;
  position: relative;
  border-radius: 30%;
  background-color: #ff5252;
  padding: 7px;
  margin-right: 4px;
}

.priceNeutral {
  display: inline;
  position: relative;
  border-radius: 30%;
  background-color: #1976d2;
  padding: 7px;
  margin-right: 4px;
}

.coinName {
  display: inline;
  position: relative;
  margin-left: 3px;
  margin-right: 3px;
}

body {
  color: #ebedee;
  font-weight: bold;
  text-align: center;
}
</style>


