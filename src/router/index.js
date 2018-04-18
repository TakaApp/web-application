import Vue from 'vue';
import Router from 'vue-router';
import Search from '@/pages/Search';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search,
    },
  ],
});
