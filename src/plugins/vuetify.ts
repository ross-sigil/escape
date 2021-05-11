import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/src/stylus/app.styl';


Vue.use(Vuetify, {
  theme: {
    accent: '#c1b492',
    info: '#EDC3C5',
    error: '#ff5252',
  },
});


Vue.use(Vuetify, {
  iconfont: 'md',
});
