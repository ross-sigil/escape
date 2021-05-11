<template>
  <v-app v-bind:style='appBack'>
    <v-content>
      <v-layout align-start justify-center>
        <Eyes/>
      </v-layout>
    </v-content>
    <v-layout justify-center>
      <LinkBox v-bind:style='linkBack'/>
    </v-layout>
    <Marquee/>
    <v-layout align-end justify-start>
      <CoinGetter/>
    </v-layout>
    <v-layout justify-center>
      <Slider/>
    </v-layout>
  </v-app>
</template>

<script>
import Eyes from './components/Eyes';
import LinkBox from './components/LinkBox';
import Slider from './components/Slider';
import CoinGetter from './components/CoinGetter';
import Marquee from './components/Marquee';
import { dupeCheck } from './components/coinFunctions';

export default {
  name: 'App',
  components: {
    Eyes,
    LinkBox,
    Slider,
    CoinGetter,
    Marquee,
  },
  data() {
    return {};
  },
  computed: {
    appBack() {
      return this.$store.state.appBack;
    },
    linkBack() {
      return this.$store.state.linkBack;
    },
  },
  created() {
    const prevState = JSON.parse(localStorage.getItem('Store'));
    this.$store.commit('setState', prevState);
    prevState.testCoins.forEach((element) => {
      dupeCheck(element);
    });
  },
};
</script>
