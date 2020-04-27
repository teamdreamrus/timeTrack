import VueRouter from 'vue-router';
import Clicks from './components/Clicks.vue';
import Statistic from './components/Statistic.vue';
import Workmode from './components/Workmode.vue';
import Settings from './components/Settings.vue';

const routes = [
  { path: '/clicks', component: Clicks },
  { path: '/stats', component: Statistic },
  { path: '/work', component: Workmode },
  { path: '/settings', component: Settings },
  { path: '', redirect: '/stats' },
  { path: '*', component: Settings },
];
export const router = new VueRouter({
  routes,
});
