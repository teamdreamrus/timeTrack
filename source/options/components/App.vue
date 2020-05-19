<template>
  <div v-if="content && navigateLocal">
    <div class="container">
      <navigation-component :navigateLocal="navigateLocal"></navigation-component>
    </div>
    <div class="container mt-3">
      <router-view :content="content"></router-view>
    </div>
  </div>
</template>

<script>
import NavigationComponent from './NavigationComponent.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import * as Utils from '../../utils';

export default {
  name: 'App',
  data() {
    return {
      text: '',
      content: false,
      navigateLocal: false,
    };
  },
  components: {
    NavigationComponent,
  },
  beforeCreate() {
    Utils.getLocales('options').then((res) => {
      this.content = res.content;
      this.navigateLocal = res.navigateLocal;
      console.log(res);
    });
  },
};
</script>

<style scoped></style>
