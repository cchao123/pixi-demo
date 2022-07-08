import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Mesh from '../components/meshExample.vue';
// import Video from '../components/pixiVideo.vue';
import ChromGame from '../components/chromGame.vue';
// import Graphics from '../components/graphicsApi.vue'
// import Particle from '../components/particleDemo.vue'
import SpinePage from '../spinePage.vue';
import Physics from '../components/physicsExample.vue';
import FilterPage from '../filterPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'default',
    component: Physics,
  },
  {
    path: '/physics',
    name: 'physics',
    component: Physics,
  },
  {
    path: '/filter',
    name: 'filter',
    component: FilterPage,
  },
  // {
  //   path: '/graphics',
  //   name: 'graphics',
  //   component: Graphics,
  // },
  {
    path: '/chrom',
    name: 'chrom',
    component: ChromGame,
  },
  {
    path: '/spine',
    name: 'spine',
    component: SpinePage,
  },
  {
    path: '/mesh',
    name: 'mesh',
    component: Mesh,
  },
  // {
  //   path: '/video',
  //   name: 'video',
  //   component: Video,
  // },
];

const ROUTER = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default ROUTER;
