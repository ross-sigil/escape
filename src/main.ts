import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import { store } from './store';
import Vuetify from 'vuetify';

const MarqueeText = require('vue-marquee-text-component');
Vue.component('marquee-text', MarqueeText);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
