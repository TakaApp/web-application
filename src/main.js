// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import moment from 'moment'

import App from './App';
import router from './router';

import Duration from './atoms/duration';
import Distance from './atoms/distance';
import Hour from './atoms/hour';

Vue.config.productionTip = false;

moment.locale('fr');

Vue.prototype.moment = moment

Vue.component('Duration', Duration);
Vue.component('Distance', Distance);
Vue.component('Hour', Hour);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

