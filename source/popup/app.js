/* eslint-disable max-len */
import Vue from 'vue';
import App from './components/app.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

class Popup {
  constructor() {
    this.popup = new Vue({
      el: '#popup',
      render: (h) => h(App),
    });
  }
}

window.popup = new Popup();
