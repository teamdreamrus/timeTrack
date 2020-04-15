import Vue from 'vue';
import App from './components/app.vue';

class Popup {
    constructor() {
        this.options = new Vue({
            el: '#options',
            render: h => h(App),
        });
    }
}


window.popup = new Popup();
