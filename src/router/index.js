import Vue from 'vue';
import Router from 'vue-router';

import Search from '@/pages/Search';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search,
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
    },
  ],
});
