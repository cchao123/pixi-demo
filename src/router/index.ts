import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import test1 from './../components/test1.vue';
import test2 from './../components/test2.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/test1',
    name: 'test1',
    component: test1,
  },
  {
    path: '/test2',
    name: 'test2',
    component: test2,
  },
];

const ROUTER = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default ROUTER;
