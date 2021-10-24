import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Settings from '@/views/Settings.vue';
import Game from '@/views/Game.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/game',
    name: 'game',
    component: Game,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
