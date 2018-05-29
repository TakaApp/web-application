// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import moment from 'moment';
import L from 'leaflet';

import { Autocomplete, TimeSelect, Select, DatePicker, Option } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/fr';
import locale from 'element-ui/lib/locale';

import 'leaflet/dist/leaflet.css';

import App from './App';
import router from './router';

// atoms
import Duration from './atoms/duration';
import Distance from './atoms/distance';
import Hour from './atoms/hour';
import Place from './atoms/place';
import Direction from './atoms/direction';


locale.use(lang);

// eslint-disable-next-line
console.log(`%cVersion ${process.env.VERSION}`, 'background: #222; color: #bada55');

/* eslint-disable*/
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
/* eslint-enable */

Vue.config.productionTip = false;

moment.locale('fr');

Vue.prototype.moment = moment;

Vue.component('Duration', Duration);
Vue.component('Distance', Distance);
Vue.component('Hour', Hour);
Vue.component('Place', Place);
Vue.component('Direction', Direction);

Vue.use(Autocomplete);
Vue.use(TimeSelect);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Option);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

