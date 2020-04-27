import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/app.vue';
import { router } from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueRouter);

class Options {
  constructor() {
    this.options = new Vue({
      el: '#options',
      render: (h) => h(App),
      router: router,
    });
  }
}

window.options = new Options();
