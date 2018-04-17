// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import moment from 'moment';

import App from './App';
import router from './router';

// atoms
import Duration from './atoms/duration';
import Distance from './atoms/distance';
import Hour from './atoms/hour';
import Place from './atoms/place';
import Direction from './atoms/direction';

Vue.config.productionTip = false;

moment.locale('fr');

Vue.prototype.moment = moment;

Vue.component('Duration', Duration);
Vue.component('Distance', Distance);
Vue.component('Hour', Hour);
Vue.component('Place', Place);
Vue.component('Direction', Direction);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

