<template>
  <v-flex shrink style="width: 40%">
    <v-slider v-model="percentReturn" color="#c1b492" :max="1" :min="-1" :step="0.01" @input="newLog"></v-slider>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue';
import { colorizer } from './colorizer';
export default Vue.extend({

  computed: {

    percentReturn: {
      set(inp: number) {
        this.$store.commit('sliderSet', inp);
      },
      get(): number {
        return this.$store.state.sliderPercent;
      },
    },
  },



  methods: {

      newLog() {
          this.$store.commit('appBack', colorizer(this.$store.state.defaultApp, this.$store.state.sliderPercent));
          this.$store.commit('linkBack', colorizer(this.$store.state.defaultLink, this.$store.state.sliderPercent));
          this.$store.commit('tickerBack', colorizer(this.$store.state.defaultTicker, this.$store.state.sliderPercent));
      },
      },
});
</script>

